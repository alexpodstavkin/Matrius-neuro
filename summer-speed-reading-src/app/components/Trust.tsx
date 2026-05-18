import { nb } from '../lib/typography'

const metrics = [
  { num: '7+ лет', caption: 'на рынке онлайн-образования', tint: 'stat-card--navy' },
  { num: '50 000+', caption: 'учеников прошли наши программы', tint: 'stat-card--cta' },
]

const features = [
  {
    icon: '🎮',
    title: 'Игровая платформа',
    text: 'Образовательная платформа с тренажёрами и персонажами, которые помогают ребёнку включиться в обучение через игру.',
    tint: 'card--tint-violet',
  },
  {
    icon: '👩‍🏫',
    title: 'Индивидуальный подбор преподавателей',
    text: 'Мы знаем, что все дети отличаются — и понимаем, как важно подобрать преподавателя, с которым ребёнку захочется учиться.',
    tint: 'card--tint-cta',
  },
  {
    icon: '📜',
    title: 'Образовательная лицензия',
    text: 'Наша школа — официальный резидент «Сколково». Это подтверждает уровень нашей экспертизы и качества методики.',
    tint: 'card--tint-navy',
  },
]

export default function Trust() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[820px] mx-auto text-center flex flex-col gap-5">
          <h2>
            {nb('Почему родители выбирают')}{' '}
            <span style={{ color: 'var(--venice-blue)' }}>{nb('онлайн-школу Matrius')}</span>
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {nb(
              'Недавно нашей школе исполнилось 7 лет — и за это время мы довели нашу систему обучения до идеала.'
            )}
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          {metrics.map((m, i) => (
            <article key={m.num} className={`stat-card ${m.tint} reveal reveal-delay-${i + 1}`}>
              <div className="stat-card__num">{nb(m.num)}</div>
              <div className="stat-card__caption" style={{ fontSize: 16 }}>{nb(m.caption)}</div>
            </article>
          ))}
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className={`card ${f.tint} flex flex-col gap-4 reveal reveal-delay-${i + 1}`}
            >
              <span className="card-icon" aria-hidden>{f.icon}</span>
              <h3 style={{ fontSize: 20 }}>{nb(f.title)}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55 }}>{nb(f.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
