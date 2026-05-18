import { nb } from '../lib/typography'

const gifts = [
  {
    icon: '📖',
    title: 'Авторский гайд: 7 упражнений, которые увеличивают скорость чтения в 2 раза за 30 дней',
    body:
      'Регулярные тренировки по 10 минут в день дают результат уже через месяц — без скучных длинных занятий.',
    priceOld: '1 490 ₽',
    priceNew: 'Бесплатно',
    bullets: ['подходит детям 7–14 лет', 'можно делать утром или перед сном'],
    featured: false,
  },
  {
    icon: '🎯',
    title: 'Авторский гайд: 5 упражнений на концентрацию',
    body:
      'Ребёнок научится удерживать внимание 30+ минут на одной задаче — даже когда рядом лежит телефон.',
    priceOld: '1 290 ₽',
    priceNew: 'Бесплатно',
    bullets: ['тренируют внимание', 'снижают рассеянность'],
    featured: true,
  },
  {
    icon: '📔',
    title: 'Читательский дневник лета',
    body:
      '90 дней структурированной привычки читать. Место для эмоций, выводов, любимых цитат. Ребёнок видит, как растёт его «личная библиотека лета».',
    priceOld: '990 ₽',
    priceNew: 'Бесплатно',
    bullets: ['трекер на 90 дней', 'место для эмоций и выводов'],
    featured: false,
  },
]

export default function Gifts() {
  return (
    <section className="section" id="gifts">
      <div className="container flex flex-col gap-12 lg:gap-16">
        <div className="max-w-[920px] mx-auto text-center flex flex-col gap-5">
          <h2>
            {nb('После урока дарим 3 подарка — чтобы лето точно')}{' '}
            <span style={{ color: 'var(--cta)' }}>{nb('прошло с пользой')}</span>
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 lg:auto-rows-fr">
          {gifts.map((g, i) => (
            <div
              key={g.title}
              className={`gift-card-shell ${g.featured ? 'gift-card-shell--featured' : ''} reveal reveal-delay-${i + 1}`}
            >
              <article className={`gift-card ${g.featured ? 'gift-card--featured' : ''}`}>
                {g.featured && <span className="gift-card__badge">Хит лета</span>}
                <span className="gift-card__icon" aria-hidden>{g.icon}</span>
                <h3 style={{ fontSize: 20, lineHeight: 1.3 }}>{nb(g.title)}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55 }}>{nb(g.body)}</p>
                <ul className="flex flex-col gap-1.5" style={{ fontSize: 14, color: 'var(--ink-2)' }}>
                  {g.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span aria-hidden style={{ color: 'var(--venice-blue)' }}>•</span>
                      <span>{nb(b)}</span>
                    </li>
                  ))}
                </ul>
                <div className="gift-card__price" style={{ fontSize: 18, marginTop: 'auto', paddingTop: 8 }}>
                  <s>{g.priceOld}</s>
                  <strong>{g.priceNew}</strong>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
