# GetCourse proxy для `matrius-russian-diagnostika`

Cloudflare Worker — тонкий серверный прокси между формой на лендинге
и **GetCourse API**. Секретный ключ GC хранится в Worker'е, в браузер не утекает.

- **Оффер**: `8408464` (захардкожен в `getcourse-proxy.js`).
- **Источник в GC** (поле `Источник` у пользователя): `Matrius — Диагностика русского 1-4 класса`.
- **Идемпотентность**: `deal_number = ru-<sha1(email|offer|UTC-минута)[:10]>` —
  повторный submit того же email в течение минуты не создаёт дубль.
- Бесплатный лимит CF — 100 000 запросов/день. Этого хватит на любой
  разумный трафик лендинга.

## Что делает

```
Браузер → POST https://matrius-russian-gc-proxy.<account>.workers.dev/
        → Worker валидирует поля, отбивает honeypot, ловит UTM
        → POST https://<GC_ACCOUNT>.getcourse.ru/pl/api/deals
        → отвечает фронту JSON { ok, deal_number, gc: {...} }
```

## Деплой через Wrangler (рекомендуется)

```bash
npm i -g wrangler                     # один раз
cd matrius-russian-diagnostika/_src/worker
wrangler login                        # один раз: вход в Cloudflare

# Секреты GC (значения те же, что для соседнего Worker'а скорочтения):
wrangler secret put GC_ACCOUNT        # → matrius (поддомен) или полный домен GC
wrangler secret put GC_SECRET_KEY     # → ключ из админки GC: Настройки → Общее → API

wrangler deploy
```

После `deploy` Wrangler выдаст URL вида:

```
https://matrius-russian-gc-proxy.<ваш-аккаунт>.workers.dev
```

Этот URL нужно подставить во фронт — см. ниже.

## Деплой через Cloudflare Dashboard (без CLI)

1. Cloudflare → Workers & Pages → Create → "Hello World".
2. Скопировать содержимое `getcourse-proxy.js` в редактор → Deploy.
3. В настройках Worker → Variables and Secrets:
   - `GC_ACCOUNT` (Secret) — поддомен GC.
   - `GC_SECRET_KEY` (Secret) — ключ GC API.
   - `ALLOWED_ORIGIN` (plaintext) — `https://web.matrius.online`.
4. Скопировать `*.workers.dev` URL → положить во фронт.

## Привязка фронта

В `_src/.env.production` укажи:

```
NEXT_PUBLIC_LEAD_ENDPOINT=https://matrius-russian-gc-proxy.<ваш-аккаунт>.workers.dev
```

Затем пересобери и синхронизируй статику:

```bash
cd matrius-russian-diagnostika/_src
npm run build
rsync -a --delete --exclude='/_src' --exclude='/README.md' out/ ../
```

## Проверка

```bash
curl -i -X POST https://matrius-russian-gc-proxy.<ваш-аккаунт>.workers.dev \
  -H 'Content-Type: application/json' \
  -d '{"name":"Тест","phone":"+79991234567","email":"qa+ru@example.com","age":"8","utm_source":"qa"}'
```

Ответ должен быть `HTTP 202` + `{"ok":true, "deal_number":"ru-xxxxxxxxxx", "gc":{...}}`.

В админке GC: *Заказы* — должна появиться сделка по офферу **8408464** с
полем «Источник = Matrius — Диагностика русского 1-4 класса».

Логи Worker'а: `wrangler tail` (в реальном времени) или
Cloudflare Dashboard → Workers → matrius-russian-gc-proxy → Logs.

## Что отслеживать в логах

| Лог | Что значит |
|---|---|
| `event: gc.ok` | сделка создана, есть `deal_id` и `user_id` |
| `event: gc.fail` | GC вернул `success:false` — смотри `error_message` |
| `worker_error` | exception в самом Worker'е — обычно `GC_ACCOUNT/GC_SECRET_KEY` не заданы |
