# matrius-russian-diagnostika

Лендинг **«Бесплатная диагностика по русскому языку для 1–4 класса»** — Matrius.

- **Прод**: https://web.matrius.online/matrius-russian-diagnostika/
- **GC-оффер**: `8408464`
- **Источник лида в GC** (поле `Источник` у пользователя): `Matrius — Диагностика русского 1-4 класса`

## Архитектура

```
Браузер (форма на лендинге)
   │
   ▼ POST {name, phone, email, age, utm_*}
Cloudflare Worker  matrius-russian-gc-proxy.<account>.workers.dev
   │  (хранит GC_ACCOUNT / GC_SECRET_KEY)
   ▼ POST /pl/api/deals
GetCourse → создаёт сделку в оффере 8408464
```

PHP на сервере **не задействован** — лиды идут полностью через Cloudflare,
никакой `nginx + php-fpm` настройки не требуется.

## Структура папки

```
matrius-russian-diagnostika/
├── index.html, 404.html         ─┐
├── _next/                        │
├── cases/, why-matrius/          ├─ ГОТОВАЯ СТАТИКА (раздаётся nginx-ом из этой папки)
├── *.jpg, *.png                 ─┘
│
└── _src/                        ─── ИСХОДНИКИ (nginx это блокирует)
    ├── app/, components/
    ├── public/                      → копируется в корень при билде
    ├── worker/                      ── Cloudflare Worker (см. worker/README.md)
    │   ├── getcourse-proxy.js       Принимает форму → POST в GC
    │   ├── wrangler.toml            Имя сервиса + ALLOWED_ORIGIN
    │   └── README.md                Деплой через wrangler / Dashboard
    ├── .env.production              NEXT_PUBLIC_LEAD_ENDPOINT=<URL Worker'а>
    ├── package.json, next.config.mjs
    └── ...
```

## Workflow правки

### 1. Текст / стиль / блок на лендинге

```bash
cd matrius-russian-diagnostika/_src
# редактируем components/*.tsx, app/*
npm install              # один раз
npm run build            # → _src/out/
rsync -a --delete \
  --exclude='/_src' --exclude='/README.md' \
  out/ ../
rm -rf out
git add -A && git commit -m "..." && git push
```

### 2. Логика отправки лида в GC (поля, источник, оффер)

Правим `_src/worker/getcourse-proxy.js`, затем:

```bash
cd matrius-russian-diagnostika/_src/worker
wrangler deploy          # сразу же на продакшене
git add -A && git commit -m "..." && git push
```

Сборка фронта при правке Worker'а **не нужна** — Worker живёт отдельно.

## Деплой с нуля (один раз)

1. **Развернуть Worker** — см. `_src/worker/README.md`.
   После `wrangler deploy` получишь URL вида `https://matrius-russian-gc-proxy.<account>.workers.dev`.
2. **Прописать URL во фронте**: открой `_src/.env.production`,
   поставь `NEXT_PUBLIC_LEAD_ENDPOINT=https://...workers.dev`.
3. **Пересобрать и запушить** (см. workflow выше).
4. На сервере `git pull` — статика раздаётся nginx-ом из этой папки.

## nginx — что нужно один раз

Раздача статики из этой папки. PHP/fastcgi не нужен:

```nginx
location /matrius-russian-diagnostika/ {
    alias /var/www/web.matrius.online/matrius-russian-diagnostika/;
    try_files $uri $uri/ /matrius-russian-diagnostika/index.html;
}

# Запретить раздачу исходников Next.js наружу
location ~ ^/matrius-russian-diagnostika/_src/ {
    deny all;
    return 404;
}
```

Если у тебя уже работает `https://web.matrius.online/matrius-russian-diagnostika/`
со страницей лендинга — первый блок уже стоит. Достаточно добавить `deny` для `_src/`.
