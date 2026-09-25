# skorochtenie-free-lesson — исходники

Мини-лендинг Матриуса «Бесплатный урок-диагностика по скорочтению» для детей 6–10 лет.
Вёрстка — клон zerocoder.ru/free-lesson-on-neural-networks-for-children в палитре Матриуса (navy #385681 + оранжевый #EF6432, Onest).
Боевой адрес: **https://web.matrius.online/skorochtenie-free-lesson/**

## Пересборка и выкладка
```bash
cd skorochtenie-free-lesson-src
npm install
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/skorochtenie-free-lesson npx next build
rsync -a --delete out/ ../skorochtenie-free-lesson/
git add skorochtenie-free-lesson skorochtenie-free-lesson-src && git commit && git push
```
Без `NEXT_PUBLIC_BASE_PATH` пути к ассетам ломаются. Локально: `npm run dev` → порт 5243.

## Форма
Боевая с 25.09.2026, 1-в-1 с skorochtenie-urok: POST на `/skorochtenie-neuro/php/submit.php` (FastAPI → GetCourse, успех 202),
payload `name, phone, email, age («8 лет», 6–10), utm_*, referer`; без utm → `utm_source=skorochtenie-free-lesson`.
offer_code не шлём — общий оффер 8331347.
Счётчики: Яндекс.Метрика 98858030 + VK Пиксель (Top.Mail.Ru) 3743427 в `app/layout.tsx`.

## Таймер
Отсчёт до конца дня дедлайна: пн–чт → четверг, пт–вс → понедельник. Считается в браузере (`components/deadline-date.ts`).
