# PHP-обработчик формы → GetCourse (лендинг «Лето без отупения»)

Тонкая прокладка для лендинга `/summer-speed-reading/`. Принимает JSON от React-формы и создаёт сделку в GC через snippet [`getcourse.php`](getcourse.php).

Идентично соседу `/skorochtenie-neuro/php/`, но **поле `age` НЕ требуется** — на этом лендинге нет селекта возраста.

## Файлы

```
php/
├── getcourse.php   # snippet из скилла: gcCreateDeal/gcUpdateUser/gcAddUserToGroups
├── submit.php      # обработчик (POST /summer-speed-reading/php/submit.php)
├── .env.example    # шаблон с GC_ACCOUNT/GC_SECRET_KEY/GC_OFFER_CODE
├── .htaccess       # запрет доступа к .env и логам
├── .gitignore      # исключает .env и logs/ из git
└── README.md
```

## Установка

> **Важно.** Если на сервере уже работает сосед `/skorochtenie-neuro/php/` с настроенным `.env` — **ничего делать не нужно**. `submit.php` автоматически подхватит секреты `GC_ACCOUNT` и `GC_SECRET_KEY` из `../../skorochtenie-neuro/php/.env` (тот же аккаунт GC Matrius). `GC_OFFER_CODE` тоже подхватится оттуда, либо упадёт на дефолт `8331347` встроенный в код.
>
> Шаги ниже нужны только если хотите **изолированный** `.env` для этого лендинга (например, чтобы переопределить `GC_OFFER_CODE` или `ALLOWED_ORIGINS`).

1. На сервере перейти в каталог лендинга `/var/www/web.matrius.online/summer-speed-reading/`. Папка `php/` уже лежит рядом с `index.html`.

2. Скопировать `.env.example` → `.env` и заполнить:
   ```bash
   cd /var/www/web.matrius.online/summer-speed-reading/php
   cp .env.example .env
   nano .env
   ```
   - `GC_ACCOUNT` = `school-genius.club` (или поддомен — как у соседа)
   - `GC_SECRET_KEY` = ключ из админки GC: *Настройки → Общее → API*
   - `GC_OFFER_CODE` = код оффера для летней программы (по умолчанию `8331347`, как в `.env.example`)
   - `ALLOWED_ORIGINS=https://web.matrius.online`

3. Защитить:
   ```bash
   chmod 600 .env
   chown www-data:www-data .env
   mkdir -p logs && chown www-data:www-data logs
   ```

## Проверка

```bash
# Валидный лид (без age — лендинг его не требует)
curl -i -X POST https://web.matrius.online/summer-speed-reading/php/submit.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест Тестов","phone":"+79991234567","email":"qa@example.com","utm_source":"qa"}'

# Невалидный (422)
curl -i -X POST https://web.matrius.online/summer-speed-reading/php/submit.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"","phone":"","email":"bad"}'

# Логи
tail -f /var/www/web.matrius.online/summer-speed-reading/php/logs/leads.log
```

## Поведение

- `name`/`phone`/`email` — обязательные. Невалидный email — `422`.
- `utm_*`, `referer`, `page_url` — опциональные, кладутся в сессию GC и комментарий сделки.
- `company` — honeypot. Если бот его заполнил, отвечаем `202`, но в GC ничего не шлём.
- `deal_number = sumr-{sha1(email|offer|UTC-минуты)[:10]}` — повторный submit одного email за минуту не создаёт дубль.
- В сделке выставляется `addfields["Источник"]="summer-speed-reading"` — удобно фильтровать в GC.
