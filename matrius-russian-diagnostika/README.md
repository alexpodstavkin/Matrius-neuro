# matrius-russian-diagnostika

Лендинг **«Бесплатная диагностика по русскому языку для 1–4 класса»** — Matrius.

- **Прод**: https://web.matrius.online/matrius-russian-diagnostika/
- **GC-оффер**: `8408464` (передаётся в payload, см. ниже).
- **UTM-source по умолчанию**: `matrius-russian-diagnostika`
  (если рекламная кампания не передала свой `utm_source` в URL).

## Архитектура (как у matrius-summer-school)

```
Браузер (форма)
   │ POST { name, phone, email, age, offer_code, utm_source, ... }
   ▼
/skorochtenie-neuro/php/submit.php   ← общий обработчик для всех лендингов
   │  (хранит GC_ACCOUNT / GC_SECRET_KEY в общем .env)
   ▼ POST /pl/api/deals
GetCourse → сделка в оффере 8408464 (override от payload), Источник = utm_source
```

Лендинги различаются:
- **`offer_code` в payload** — у нас `8408464`, у summer-school пусто (берётся
  общий из `.env`).
- **`utm_source` в payload** — у нас `matrius-russian-diagnostika`,
  у summer-school `matrius-summer-school`.

Это полная аналогия со схемой `matrius-summer-school` — мы не плодим
отдельный обработчик, не настраиваем nginx для своей папки, не деплоим
свои PHP-файлы.

## Структура папки

```
matrius-russian-diagnostika/
├── index.html, 404.html       ─┐
├── _next/                      │
├── cases/, why-matrius/        ├─ ГОТОВАЯ СТАТИКА (раздаётся nginx-ом из этой папки)
├── *.jpg, *.png               ─┘
│
└── _src/                      ─── ИСХОДНИКИ (nginx должен это блокировать)
    ├── app/, components/          ↳ компоненты React + Next.js
    ├── public/                    ↳ копируется в корень при билде
    ├── worker/                    ↳ Cloudflare Worker — РЕЗЕРВ
    │                                 (не задействован сейчас, на случай миграции
    │                                  с общего PHP на собственную инфраструктуру)
    └── package.json, ...
```

## Workflow правки лендинга

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

## Что нужно на сервере

Только `git pull` — никакого `.env`, никакого nginx-конфига специально под нашу
папку, никаких PHP-обработчиков своих не нужно. Лиды идут через рабочий PHP
скорочтения.

```bash
ssh server
cd /var/www/web.matrius.online
git pull origin main
```

Если у nginx ещё нет deny для исходников Next.js — однократно дописать в
server-блок `web.matrius.online`:

```nginx
location ~ ^/matrius-russian-diagnostika/_src/ {
    deny all;
    return 404;
}
```

## Резервный путь — Cloudflare Worker

В `_src/worker/` лежит готовый `getcourse-proxy.js` + `wrangler.toml`. Это
запасной маршрут на случай, если когда-нибудь PHP скорочтения станет
бутылочным горлышком или захочется отдельную инфраструктуру.
См. `_src/worker/README.md` для деплоя через `wrangler`.

Сейчас он **не задействован**.
