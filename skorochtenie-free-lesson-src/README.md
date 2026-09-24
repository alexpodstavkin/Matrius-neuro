# skorochtenie-free-lesson — исходники

Мини-лендинг Матриуса «Бесплатный урок-диагностика по скорочтению» для детей 6–12 лет.
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
ЗАГЛУШКА: валидирует поля и показывает экран успеха, заявку никуда не отправляет (решение владельца 24.09.2026).
Подключение: POST на `/skorochtenie-neuro/php/submit.php` (FastAPI, успех 202), payload как у skorochtenie-urok + `role`.
Счётчики Метрики/VK не подключены — добавить вместе с формой.

## Таймер
Отсчёт до конца дня дедлайна: пн–чт → четверг, пт–вс → понедельник. Считается в браузере (`components/deadline-date.ts`).
