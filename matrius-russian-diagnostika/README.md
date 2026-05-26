# matrius-russian-diagnostika

Лендинг **«Бесплатная диагностика по русскому языку для 1–4 класса»** — Matrius.

- **Прод**: https://web.matrius.online/matrius-russian-diagnostika/
- **GC-оффер**: `8408464`
- **Источник лида в GC** (поле `Источник` у пользователя): `Matrius — Диагностика русского 1-4 класса`

## Структура папки

```
matrius-russian-diagnostika/
├── index.html, 404.html, 404/   ─┐
├── _next/                        │
├── cases/, why-matrius/          ├─ ГОТОВАЯ СТАТИКА (раздаётся nginx-ом)
├── hero-lesson.jpg               │
├── lesson-boy.jpg                │
├── matrius-logo.png              │
├── matrius-pattern.png          ─┘
│
├── php/                         ─── PHP-обработчик формы → GetCourse
│   ├── submit.php                   (см. php/README.md)
│   ├── getcourse.php
│   ├── .env.example
│   ├── .htaccess
│   └── README.md
│
└── _src/                        ─── ИСХОДНИКИ Next.js (не раздаётся nginx-ом)
    ├── app/, components/
    ├── public/                      → копируется в корень при билде
    ├── package.json, next.config.mjs
    └── ...
```

## Как внести правку (текст / стиль / новый блок)

1. Открываешь `_src/components/<нужный_файл>.tsx`, правишь.
2. Билд + копирование в корень:
   ```bash
   cd matrius-russian-diagnostika/_src
   npm install              # один раз
   npm run build            # пересобрать → создастся _src/out/
   rsync -a --delete \
     --exclude='/_src' \
     --exclude='/php' \
     --exclude='/README.md' \
     out/ ../               # перекинуть собранную статику в корневую папку
   rm -rf out               # подчистить
   ```
3. Коммит + пуш в `main` → на сервере `git pull`.

## nginx — критично

В `server`-блоке `web.matrius.online` должны быть три location'а
для нашей папки:

```nginx
# PHP для обработчика формы
location ~ ^/matrius-russian-diagnostika/php/.*\.php$ {
    fastcgi_pass unix:/run/php/php8.1-fpm.sock;   # подставить свой
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}

# Запретить наружу исходники, .env, логи
location ~ ^/matrius-russian-diagnostika/(_src/|php/(\.env|logs/)) {
    deny all;
    return 404;
}
```

После правки конфига: `sudo nginx -t && sudo systemctl reload nginx`.

## Подробнее

- `php/README.md` — установка обработчика формы, поиск `.env`, проверка лида в GC.
