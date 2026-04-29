# GetCourse proxy (Cloudflare Worker)

Тонкий прокси между формой на сайте и GC API. Хранит секретный ключ GC,
не утекая на фронт. Бесплатный лимит CF — 100 000 запросов/день.

## Что делает

`POST` на Worker → Worker валидирует поля → Worker делает серверный
`POST https://<account>.getcourse.ru/pl/api/deals` с `key=GC_SECRET_KEY`
→ возвращает на фронт JSON `{ ok: true | false }`.

## Деплой через Wrangler (рекомендуется)

```bash
npm i -g wrangler
cd worker
wrangler login                    # один раз: вход в Cloudflare
wrangler secret put GC_ACCOUNT    # → matrius (или ваш поддомен)
wrangler secret put GC_SECRET_KEY # → ключ из админки GC: Настройки → Общее → API
wrangler secret put GC_OFFER_CODE # → 8331347 (или текстовый offer code)
wrangler deploy
```

После `deploy` Wrangler выдаст URL вида:
`https://matrius-gc-proxy.<ваш-аккаунт>.workers.dev`

Этот URL нужно положить в env-переменную фронтенда `VITE_GC_PROXY_URL`
(см. `.env.production` корня проекта) и пересобрать сайт.

## Деплой через Dashboard (без CLI)

1. Cloudflare → Workers & Pages → Create → "Hello World"
2. Скопировать содержимое `getcourse-proxy.js` в редактор → Deploy
3. В настройках Worker → Variables and Secrets:
   - `GC_ACCOUNT` (Secret) — поддомен GC
   - `GC_SECRET_KEY` (Secret) — ключ GC API
   - `GC_OFFER_CODE` (Secret) — `8331347` или код оффера
   - `ALLOWED_ORIGIN` (plaintext) — `https://web.matrius.online`
4. Скопировать `*.workers.dev` URL → положить в `VITE_GC_PROXY_URL` фронтенда

## Тест

```bash
curl -X POST https://matrius-gc-proxy.<account>.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79991234567","email":"test@example.com","age":"10 лет"}'
```

В ответе `{ "ok": true, "gc": { ... } }` — заказ создан в GC.
В админке GC: Заказы → последний должен появиться через несколько секунд.

## Поля GC

Worker мапит поля формы в payload `pl/api/deals`:

| Поле формы | GC field |
|---|---|
| `name` (полное) | `user.first_name` + `user.last_name` (split по пробелу) |
| `phone` | `user.phone` |
| `email` | `user.email` |
| `age` | `user.addfields["Возраст ребёнка"]` + `deal.deal_comment` |

Доп. поле `Возраст ребёнка` в админке GC должно существовать (Настройки →
Доп. поля пользователя). Если назовёшь по-другому — поправь ключ в
`getcourse-proxy.js` (`addfields: { 'Возраст ребёнка': ... }`).
