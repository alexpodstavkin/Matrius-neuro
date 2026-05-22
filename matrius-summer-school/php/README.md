# PHP-обработчик формы → GetCourse

Тонкая прокладка для лендинга `/skorochtenie-neuro/`. Принимает JSON от React-формы и создаёт сделку в GC через snippet [`getcourse.php`](getcourse.php) (взят из anthropic-skill `getcourse-api`).

## Файлы

```
php/
├── getcourse.php   # snippet из скилла: gcCreateDeal/gcUpdateUser/gcAddUserToGroups
├── submit.php      # обработчик формы (POST /skorochtenie-neuro/php/submit.php)
├── .env.example    # шаблон с GC_ACCOUNT/GC_SECRET_KEY/GC_OFFER_CODE
├── .htaccess       # запрет доступа к .env и логам
└── README.md
```

## Требования

- PHP 8.0+ (используются `str_starts_with`/`str_contains`).
- Расширения: `curl`, `json`, `mbstring`.
- nginx настроен на отдачу `*.php` через `php-fpm` (или Apache `mod_php`).

## Установка

1. На сервере перейти в каталог лендинга и клонировать/спулить репо так, чтобы папка `php/` лежала рядом с `index.html` лендинга:
   ```
   /var/www/web.matrius.online/skorochtenie-neuro/
   ├── index.html
   ├── assets/
   └── php/
       ├── submit.php
       └── ...
   ```

2. Скопировать `.env.example` → `.env` и заполнить:
   ```bash
   cd php
   cp .env.example .env
   nano .env
   ```
   - `GC_ACCOUNT` = `school-genius.club` (или ваш поддомен).
   - `GC_SECRET_KEY` = ключ из админки GC: *Настройки → Общее → API*.
   - `GC_OFFER_CODE` = `8331347`.
   - `ALLOWED_ORIGINS` оставьте по умолчанию или поправьте при необходимости.

3. Защитить `.env` от чтения:
   ```bash
   chmod 600 php/.env
   chown www-data:www-data php/.env   # или ваш юзер php-fpm
   ```

4. Создать каталог логов:
   ```bash
   mkdir -p php/logs && chown www-data:www-data php/logs
   ```

5. Если nginx не использует `.htaccess`, дополните server-блок:
   ```nginx
   location ~ /skorochtenie-neuro/php/(\.env|logs/) {
       deny all;
       return 404;
   }
   location ~ \.php$ {
       fastcgi_pass unix:/run/php/php8.1-fpm.sock;
       include fastcgi_params;
       fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
   }
   ```
   `nginx -t && systemctl reload nginx`.

## Проверка

```bash
# Валидный лид
curl -i -X POST https://web.matrius.online/skorochtenie-neuro/php/submit.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест Тестов","phone":"+79991234567","email":"qa@example.com","age":"10 лет","child":"Маша","utm_source":"qa"}'

# Невалидный (422)
curl -i -X POST https://web.matrius.online/skorochtenie-neuro/php/submit.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"","phone":"","email":"bad","age":""}'

# Логи
tail -f /var/www/web.matrius.online/skorochtenie-neuro/php/logs/leads.log
```

В админке GC: *Заказы → ищем `deal_number` из ответа* — должна появиться сделка по офферу 8331347.

## Поведение

- `name`/`phone`/`email`/`age` — обязательные. Невалидный email — `422`.
- `child` (имя ребёнка), `utm_*`, `referer` — опциональные.
- `company` — honeypot. Если бот его заполнил, отвечаем `202`, но в GC ничего не шлём (логируем как `WARN honeypot`).
- `deal_number = web-{sha1(email|offer|UTC-минуты)[:10]}` — повторный submit от одного email в течение минуты НЕ создаёт дубль (GC по одному `deal_number` отдаёт ту же сделку).
- Возраст и имя ребёнка кладутся в `addfields` пользователя GC и в `deal_comment`.
- Логи с ротацией нет — добавьте `logrotate` для `php/logs/leads.log`.
