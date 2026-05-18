import { nb } from '../lib/typography'
import CtaButton from './CtaButton'

const points = [
  {
    icon: '🧬',
    title: 'Нейро-подход',
    text: 'Упражнения работают с обоими полушариями — скорость растёт вместе с пониманием, а не вместо него.',
    tint: 'card--tint-navy',
  },
  {
    icon: '🎚',
    title: 'Индивидуальный темп',
    text: 'Программа адаптируется под ребёнка: возраст, стартовый уровень, любимые жанры.',
    tint: 'card--tint-cta',
  },
  {
    icon: '🎲',
    title: 'Обучение через игру',
    text: 'Каждое занятие — квест по тексту и обсуждение любимых героев. Ребёнок не «отбывает» урок.',
    tint: 'card--tint-emerald',
  },
  {
    icon: '🤝',
    title: 'Педагог — партнёр',
    text: 'Никаких «двоек за ошибки». Ребёнок не боится пробовать — и потому быстрее учится.',
    tint: 'card--tint-amber',
  },
]

export default function Methodology() {
  return (
    <section className="section" style={{ background: 'var(--surface-soft)' }}>
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[860px] mx-auto text-center flex flex-col gap-5">
          <h2>
            {nb('И всё это возможно с помощью')}{' '}
            <span style={{ color: 'var(--venice-blue)' }}>
              {nb('уникальной методологии Matrius')}
            </span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {nb(
              'Программа построена через игру: квесты, обсуждения любимых героев, соревнования с собой. Ребёнок учится незаметно — и у него остаётся время на лето.'
            )}
          </p>
        </div>

        {/* Большая основная сетка: 4 карточки слева + фото справа на десктопе */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {points.map((p, i) => (
              <article
                key={p.title}
                className={`card ${p.tint} flex flex-col gap-3 reveal reveal-delay-${i + 1}`}
              >
                <span className="card-icon" aria-hidden>{p.icon}</span>
                <h3 style={{ fontSize: 19 }}>{nb(p.title)}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.55 }}>{nb(p.text)}</p>
              </article>
            ))}
          </div>

          <aside className="methodology-photo-wrap reveal reveal-delay-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="methodology.png"
              alt="Ребёнок занимается на онлайн-уроке скорочтения Matrius"
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="methodology-photo"
            />
          </aside>
        </div>

        <div className="flex justify-center">
          <CtaButton href="#form" variant="primary" size="lg">
            Попробовать на бесплатном уроке
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
