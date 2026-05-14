import { nb } from '../lib/typography'

const gifts = [
  {
    icon: '📖',
    title: 'Авторский гайд: 7 упражнений, которые увеличивают скорость чтения ребёнка в 2 раза за 30 дней',
    body:
      'Регулярные тренировки по 10 минут в день дают результат уже через месяц — без скучных длинных занятий.',
    priceOld: '1 490 ₽',
    priceNew: 'Бесплатно',
    bullets: ['подходит детям 6–15 лет', 'можно делать утром или перед сном'],
    featured: false,
  },
  {
    icon: '🎯',
    title: 'Авторский гайд: 5 упражнений на концентрацию',
    body:
      'Ребёнок научится удерживать внимание 30+ минут на одной задаче — даже когда рядом телефон.',
    priceOld: '1 290 ₽',
    priceNew: 'Бесплатно',
    bullets: ['тренируют внимание', 'снижают рассеянность'],
    featured: true,
  },
  {
    icon: '📔',
    title: 'Читательский дневник',
    body:
      'Привычка читать каждый день — главный навык, который останется с ребёнком на всю учёбу и жизнь.',
    priceOld: '990 ₽',
    priceNew: 'Бесплатно',
    bullets: ['трекер на 90 дней лета', 'место для эмоций и выводов о прочитанном'],
    featured: false,
  },
]

export default function Gifts() {
  return (
    <section className="section" id="gifts">
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[920px] flex flex-col gap-4">
          <h2>
            {nb('После прохождения бесплатного урока дарим 3 подарка, которые помогут ребёнку закрепить новые знания во время летних каникул')}
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {gifts.map((g) => (
            <article key={g.title} className={`gift-card ${g.featured ? 'gift-card--featured' : ''}`}>
              {g.featured && (
                <span
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'var(--cta)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '6px 10px',
                    borderRadius: 999,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                  }}
                >
                  Хит лета
                </span>
              )}
              <span aria-hidden style={{ fontSize: 36, lineHeight: 1 }}>{g.icon}</span>
              <h3
                style={{
                  fontSize: 19,
                  lineHeight: 1.3,
                  // выравниваем body на одну линию — высота под самый длинный заголовок (4 строки)
                  minHeight: 'calc(1.3em * 4)',
                }}
              >
                {nb(g.title)}
              </h3>
              <p style={{ fontSize: 15 }}>{nb(g.body)}</p>
              <ul className="flex flex-col gap-1.5" style={{ fontSize: 14, color: 'var(--ink-2)' }}>
                {g.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span aria-hidden style={{ color: 'var(--venice-blue)' }}>•</span>
                    <span>{nb(b)}</span>
                  </li>
                ))}
              </ul>
              <div className="gift-card__price" style={{ fontSize: 17, marginTop: 'auto' }}>
                <s>{g.priceOld}</s>
                <strong>{g.priceNew}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
