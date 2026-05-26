# Обработчик формы лендинга `matrius-russian-diagnostika`

Слой между формой на лендинге и **GetCourse API**. Принимает JSON от React-формы,
валидирует, создаёт сделку в GC через `gcCreateDeal()` из `getcourse.php`
(snippet из скилла `getcourse-api`).

- **Endpoint**: `POST https://web.matrius.online/matrius-russian-diagnostika/php/submit.php`
- **Оффер**: `8408464` — захардкожен как fallback в `submit.php`. Можно переопределить
  через `GC_OFFER_CODE` в `.env`.
- **Источник лида** (в админке GC, поле «Источник» у пользователя):
  `Matrius — Диагностика русского 1-4 класса`.

## Что лежит в этой папке

```
php/
├── submit.php       # обработчик POST с JSON {name, phone, email, age, …}
├── getcourse.php    # клиент GC API (gcCreateDeal/gcUpdateUser/gcAddUserToGroups)
├── .env.example     # шаблон — скопируйте в .env и заполните GC_*
├── .htaccess        # запрет прямого доступа к .env / getcourse.php / logs/
└── README.md
```

## Установка на сервере (один раз)

> **`.env` копировать не нужно** — на сервере единый файл `.env` для всех лендингов.
> `submit.php` автоматически ищет его по нескольким путям:
> 1. `GC_DOTENV_PATH` (если переменная окружения задана)
> 2. `php/.env` в этой же папке
> 3. **`../../skorochtenie-neuro/php/.env`** — стандартное место единого .env
> 4. `../../.env` (корень `web.matrius.online`)
> 5. `../.env` (корень лендинга)

```bash
cd /var/www/web.matrius.online/matrius-russian-diagnostika/php

# Папка для логов (если её нет — submit.php создаст автоматически,
# но лучше задать права заранее, чтобы php-fpm не упёрся в permission denied).
mkdir -p logs
chown www-data:www-data logs
chmod 755 logs
```

Если единый `.env` у вас лежит в нестандартном месте — задайте полный путь через
переменную окружения в server-блоке nginx:

```nginx
fastcgi_param GC_DOTENV_PATH /var/www/web.matrius.online/.env;
```

Оффер `8408464` захардкожен fallback'ом в `submit.php`, в `.env` его дублировать не обязательно.

## ⚠️ nginx — критично

PHP в этой папке **не работает «из коробки»**, потому что nginx
на `web.matrius.online` пробрасывает `.php` в `php-fpm` только в
`/skorochtenie-neuro/`. POST к нашему `submit.php` возвращает
`HTTP 405 Not Allowed` (nginx отдаёт `.php` как статический файл).

Решение — добавить наш location в server-блок (рядом с тем, что уже
есть для `/skorochtenie-neuro/`):

```nginx
# /etc/nginx/sites-available/web.matrius.online
server {
    server_name web.matrius.online;
    root /var/www/web.matrius.online;

    # ... уже существующий блок для /skorochtenie-neuro/ ...

    # Новый блок: PHP для лендинга диагностики русского
    location ~ ^/matrius-russian-diagnostika/php/.*\.php$ {
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;   # подставьте свой сокет
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # Запретить раздачу исходников, .env, логов (на случай если .htaccess не читается)
    location ~ ^/matrius-russian-diagnostika/(_src/|php/(\.env|logs/)) {
        deny all;
        return 404;
    }
}
```

Применить:

```bash
nginx -t && systemctl reload nginx
```

## Проверка после деплоя

```bash
# Валидный лид → 202 + deal_number формата "web-xxxxxxxxxx"
curl -i -X POST https://web.matrius.online/matrius-russian-diagnostika/php/submit.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест Тестов","phone":"+79991234567","email":"qa+ru@example.com","age":"8","utm_source":"qa"}'

# Невалидный → 422 с error: validation_failed
curl -i -X POST https://web.matrius.online/matrius-russian-diagnostika/php/submit.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"","phone":"","email":"bad","age":""}'

# Лог
tail -f logs/leads.log
```

В админке GC: *Заказы → ищем `deal_number`* — появится сделка по офферу 8408464
с полем «Источник» = «Matrius — Диагностика русского 1-4 класса».

## Поведение

- `name`/`phone`/`email`/`age` — обязательные. Невалидный email → `422`.
- `child` (имя ребёнка), `utm_*`, `referer` — опциональные.
- `company` — honeypot. Если заполнено → `202`, в GC ничего не шлём (лог `WARN honeypot`).
- `deal_number = web-{sha1(email|offer|UTC-минута)[:10]}` —
  повторный submit того же email в течение минуты НЕ создаёт дубль.
- Возраст и имя ребёнка → `addfields` пользователя GC и `deal_comment`.
- Лог `leads.log` — без ротации, добавьте `logrotate` в продакшене.

## Что отслеживать в логах

| Событие | Что значит |
|---|---|
| `INFO lead.accepted` | форма принята, идём в GC |
| `INFO gc.ok` | GC подтвердил создание сделки (есть `deal_id`, `user_id`) |
| `WARN honeypot` | бот заполнил скрытое поле — отбили без обращения в GC |
| `ERROR gc.fail` | GC ответил ошибкой — смотрите `err` (часто: неверный offer_code, протухший SECRET_KEY) |
