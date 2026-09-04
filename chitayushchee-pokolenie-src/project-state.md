# project-state — matrius-chitayushchee-pokolenie

- **Бренд:** Матриус
- **Тип продукта:** бесплатный мини-курс (5 записанных уроков, выдача по 1 в день, 2–8 классы)
- **Флаг проекта:** ЭКСПЕРИМЕНТ — вёрстка копирует mosobrfuture.ru 1-в-1, от Матриуса только фирменные цвета (канон NEURO) и шрифт Onest. Каноничные блоки Матриуса (hero-двухколонник, коралловый блок, тёмная секция) СОЗНАТЕЛЬНО не применяются.
- **Маршрут:** R0 (полный пайплайн)
- **Стек:** Next.js 14 + Tailwind, `npm run dev -p 5242`
- **Путь:** ~/Desktop/Афина/projects/matrius-chitayushchee-pokolenie

## Утверждённые блоки → компоненты
| Блок | Компонент |
|---|---|
| Hero (фото фоном) | `components/blocks.tsx` → `Hero` |
| Плашка + CTA | `blocks.tsx` → `Notice` |
| А зачем это надо уже сегодня | `blocks.tsx` → `WhyToday` |
| Основные этапы погружения в чтение + 5 уроков | `blocks.tsx` → `Stages` |
| Плашка дедлайна | `blocks.tsx` → `DeadlineBanner` |
| Что получит ребёнок | `blocks.tsx` → `Gains` |
| CTA + форма + календарь | `components/FormSection.tsx`, `RegisterForm.tsx` |
| Подвал | `components/Footer.tsx` |

## Открытые вопросы
- Фото — заглушки (`public/photos/`): hero.jpg, why-today.jpg, deadline.jpg, calendar.png. Заменить на реальные с теми же именами.
- Эндпоинт лида: `/chitayushchee-pokolenie/php/submit.php` (переопределяется `NEXT_PUBLIC_LEAD_ENDPOINT`) — на сервере обработчик под этим путём ещё не заведён.
- Домен/деплой не выбран.

## Экспертиза 04.09.2026
Отчёты: `critic-report.md` (4/10, 5×P0), `designer-report.md` (токены ~93 % совпали с эталоном, 5 поломок),
`user-verdict.md` (персона: НЕ ЗАПИШУСЬ).
Тихая доводка супервайзера выполнена — список в `supervisor/truth.md`.

## Открыто на решение владельца
1. Подача «Федеральный проект РФ» без организатора — риск ФЗ «О рекламе» и отказа модерации VK Ads.
2. Плашка над формой «будут согласованы даты проведения» — противоречит «без расписания / первый урок сразу».
3. Дедлайн «сегодня + 2» — разоблачается при повторном визите, не сказано, что будет после даты.
4. Нет блока доверия (педагог, лицензия, отзывы, число учеников) и нет списка пяти навыков из h1.
5. Телефон обязателен, хотя уроки уходят на почту.
6. Боевой обработчик `/chitayushchee-pokolenie/php/submit.php` не заведён — без него заявки теряются.

## Деплой
https://alexpodstavkin.github.io/test/chitayushchee-pokolenie/ — репо alexpodstavkin/test (main, Pages).
`chitayushchee-pokolenie/` — статика, `chitayushchee-pokolenie-next/` — исходники.
Пересборка: STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/test/chitayushchee-pokolenie npm run build → копировать out/.
