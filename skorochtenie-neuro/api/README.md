# Matrius GC API (FastAPI)

Тонкий Python-прокси формы лендинга → GetCourse API.

Один эндпоинт:
- `POST /api/booking` — принимает JSON `{name, phone, email, age, ...utm}`,
  делает серверный POST в GC `/pl/api/deals`, возвращает `{ok: true|false, gc: {...}}`.
- `GET /health` — статус.

## Структура

```
api/
├── main.py              FastAPI app
├── requirements.txt     fastapi, uvicorn, httpx, pydantic
├── render.yaml          Blueprint для Render.com
└── README.md            эта инструкция
```

## Локальный запуск

```bash
cd api
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

GC_ACCOUNT=school-genius.club \
GC_SECRET_KEY=ВАШ_КЛЮЧ \
GC_OFFER_CODE=8331347 \
uvicorn main:app --reload --port 8000
```

Тест:
```bash
curl -X POST http://localhost:8000/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Тест","phone":"+79991234567","email":"test@example.com","age":"10 лет"}'
```

## Деплой на Render.com (бесплатно)

1. Зайди на https://render.com → войди через GitHub.
2. **New +** → **Blueprint** → выбери репо `alexpodstavkin/Matrius-neuro`.
3. Render найдёт `skorochtenie-neuro-react/api/render.yaml` (либо нужно будет указать путь).
   Если он не подхватится автоматически — создай вручную:
   - **New +** → **Web Service** → выбери репо → продолжи
   - **Root Directory**: `skorochtenie-neuro-react/api` (или `skorochtenie-neuro/worker` если ты залил его в готовый деплой-репо)
   - **Runtime**: Python 3
   - **Build command**: `pip install -r requirements.txt`
   - **Start command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Region**: Frankfurt (ближе к РФ-юзерам и серверам GC)
4. **Environment Variables** → добавь:
   - `GC_ACCOUNT` = `school-genius.club`
   - `GC_SECRET_KEY` = ключ из админки GC: Настройки → Общее → API
   - `GC_OFFER_CODE` = `8331347`
   - `ALLOWED_ORIGINS` = `https://web.matrius.online,https://alexpodstavkin.github.io`
5. **Create Web Service** → ждём сборки 1–2 мин → получаем URL вида
   `https://matrius-gc-api.onrender.com`.

После этого:
- Проверка: `curl https://matrius-gc-api.onrender.com/health`
- Тест отправки: `curl -X POST https://matrius-gc-api.onrender.com/api/booking ...`
- Если `{"ok": true}` — заявка ушла в GC. Дальше пропишем URL в
  `.env.production` лендинга и пересоберём фронт.

## Альтернативные хостинги

- **Railway.app** — `railway up`, тот же стек
- **Fly.io** — `fly launch` (бесплатный план уже не free, но дёшево)
- **Vercel** — нужен `vercel.json` для FastAPI, чуть сложнее

## Логи и отладка

Render Dashboard → твой сервис → **Logs** покажет каждый запрос.
В коде стоит:
- `INFO` при успешной отправке (логируется `result.user_id`/`deal_id`)
- `WARNING` при ошибке от GC (логируется `error_message`)
- `ERROR` при таймауте/недоступности GC

Это всё попадает в Render Logs.

## Безопасность

- `GC_SECRET_KEY` живёт только в env Render. На фронт **не утекает**.
- `ALLOWED_ORIGINS` блокирует preflight CORS со всех доменов кроме лендинга.
  Браузер не даст другому сайту сделать `fetch` к нашему API.
- Прямой `curl` (без браузера) этим не блокируется — API не претендует на
  защиту от спам-ботов. Если потребуется — добавим Cloudflare Turnstile
  или rate-limit (slowapi) поверх.
