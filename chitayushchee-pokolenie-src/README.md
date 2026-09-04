# chitayushchee-pokolenie — исходники

Лендинг Матриуса «Читающее поколение»: бесплатный мини-курс по скорочтению для 2–8 классов.
Боевой адрес: **https://web.matrius.online/chitayushchee-pokolenie/**

## Пересборка и выкладка

```bash
cd chitayushchee-pokolenie-src
npm ci
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/chitayushchee-pokolenie npx next build
rsync -a --delete --exclude '.nojekyll' out/ ../chitayushchee-pokolenie/
git add chitayushchee-pokolenie chitayushchee-pokolenie-src && git commit && git push
```

Без `NEXT_PUBLIC_BASE_PATH` пути к ассетам ломаются на вложенном URL.
Локальная разработка: `npm run dev` → порт 5242 (переменные не нужны).

## Форма

POST на `/skorochtenie-neuro/php/submit.php` — общий приёмщик лидов Матриуса.
Несмотря на имя, это НЕ PHP: nginx проксирует на FastAPI (`skorochtenie-neuro/api/main.py`,
`POST /api/booking`), ключи GetCourse лежат у него в env на сервере.
Успешный ответ — **202** `{"ok":true,"queued":true}`, лид уходит в GC фоновой задачей.

Payload: `name`, `email`, `phone` (+7XXXXXXXXXX), `age` (здесь — «5 класс», в GC попадает
в поле «Возраст ребёнка»), `utm_*`, `referer`. Слаг `chitayushchee-pokolenie` проставляется
во все пустые utm-поля — иначе разбор по БД GetCourse не сходится.

⚠️ `offer_code` форма НЕ шлёт → лиды падают в общий оффер `8331347` (тот же, что
у skorochtenie-urok и summer-school) и различаются только по `utm_source`.
Нужен отдельный оффер — добавить `offer_code` в payload.

Счётчики: Яндекс.Метрика `98858030`, VK-пиксель `3743427`, цель `lead` шлётся после 202.
