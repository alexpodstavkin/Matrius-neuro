import { nb } from '../lib/typography'

type Item = {
  icon: string
  title: string
  subtitle?: string
  text: string
  result: string
  span: string
  tone:
    | 'plan-card--cta'
    | 'plan-card--navy'
    | 'plan-card--emerald'
    | 'plan-card--amber'
    | 'plan-card--violet'
    | 'plan-card--sky'
    | 'plan-card--accent'
  pill?: string
  badge?: string
  badgeTone?: 'cta' | 'navy'
  withPhoto?: boolean
  photoSrc?: string
  photoAlt?: string
  photoObjectPosition?: string
  photoBlend?: boolean
  horizontal?: boolean
}

const items: Item[] = [
  {
    icon: '📖',
    title: 'Скорость чтения',
    text: 'Ребёнок осваивает чтение глазами без проговаривания про себя. Это база, на которой держится вся учёба: чем быстрее он читает, тем легче понимает учебники и тем меньше устаёт от любых текстов.',
    result: 'Читает в 2 раза быстрее — до 200+ слов в минуту',
    span: 'md:col-span-6 lg:col-span-5 lg:row-span-2',
    tone: 'plan-card--cta',
    pill: '📈 За 30 дней',
    badge: '🔥 Хит лета',
    badgeTone: 'cta',
    withPhoto: true,
    photoSrc: 'plan-speed.png',
    photoAlt: 'Дети, которые научились быстро читать вместе',
  },
  {
    icon: '🧠',
    title: 'Понимание текста',
    text: 'Работа со смыслом: пересказ, обсуждение, поиск ключевых идей в больших текстах. Без этого навыка скорость превращается в «пробежал глазами» — а нам важно, чтобы ребёнок реально понимал, что читает.',
    result: 'Понимает с первого раза, легко пересказывает',
    span: 'md:col-span-3 lg:col-span-4',
    tone: 'plan-card--navy',
    pill: '✨ Эффект — уже на бесплатном уроке',
  },
  {
    icon: '🎯',
    title: 'Концентрация',
    text: 'Тренировки удержания внимания и фокуса. В мире, где ребёнок переключается между видео каждые 30 секунд, концентрация становится главным преимуществом в школе и жизни.',
    result: 'Внимание 30+ минут на одной задаче',
    span: 'md:col-span-3 lg:col-span-3',
    tone: 'plan-card--emerald',
  },
  {
    icon: '💭',
    title: 'Память',
    text: 'Техники запоминания стихов, дат и фактов через образное мышление и ассоциации. Хорошая память — это не врождённое: её можно прокачать так же, как мышцу. Пригодится не только летом — на всю жизнь.',
    result: 'Выучит стих за 5 минут, помнит прочитанное надолго',
    span: 'md:col-span-6 lg:col-span-7',
    tone: 'plan-card--amber',
    pill: '🎓 Лучше школьной программы',
    withPhoto: true,
    photoSrc: 'plan-memory.jpg',
    photoAlt: '',
    photoBlend: true,
  },
  {
    icon: '🗣',
    title: 'Словарный запас и речь',
    text: 'Расширение лексики через художественные тексты, синонимы и обсуждения с педагогом. Богатый словарь = ребёнок понимает учителя с полуслова, не путается в учебниках и уверенно отвечает у доски.',
    result: 'Словарь в 3 раза богаче, говорит свободно и интересно',
    span: 'md:col-span-3 lg:col-span-5',
    tone: 'plan-card--violet',
  },
  {
    icon: '📚',
    title: 'Книжный клуб с единомышленниками',
    text: 'Ребёнок проходит школьный летний список вместе с педагогом и другими детьми. Это не «надо прочитать» — это живые обсуждения с теми, кто читает то же самое. Так из обязанности рождается удовольствие.',
    result: 'Прочитает весь список — и полюбит читать',
    span: 'md:col-span-3 lg:col-span-4',
    tone: 'plan-card--sky',
    badge: '⭐ Только в Matrius',
    badgeTone: 'navy',
  },
  {
    icon: '👫',
    title: 'Найдёт новых друзей',
    text: 'Внутри книжного клуба ребёнок знакомится со сверстниками с похожими интересами. Дружба на почве общих книг и обсуждений — самая крепкая. Уйдёт стеснение, появится круг общения по-настоящему «своих».',
    result: 'Найдёт друзей по интересам и преодолеет стеснение',
    span: 'md:col-span-6 lg:col-span-3',
    tone: 'plan-card--emerald',
  },
  {
    icon: '🧭',
    title: 'Самостоятельность в учёбе',
    subtitle: 'Главный навык, который останется с ребёнком на всю жизнь',
    text: 'Это вершина всей программы и её главный результат. Учим ребёнка работать с информацией без постоянных подсказок: искать ключевое, выделять главное, выстраивать ответ своими словами. Тренируем привычку дочитывать до конца, задавать вопросы и не сдаваться на сложном — то, чего не успевают научить за партой со звонком. К концу лета у ребёнка появляется главное качество успешного человека: он умеет учиться сам и не ждёт, пока ему всё разжуют.',
    result: 'Меньше нужны репетиторы — ребёнок справляется сам',
    span: 'md:col-span-6 lg:col-span-12',
    tone: 'plan-card--accent',
    pill: '🎒 Готов к сентябрю',
    withPhoto: true,
    photoSrc: 'plan-autonomy.png',
    photoAlt: 'Школьница уверенно тянет руку, готовая отвечать',
    photoObjectPosition: '50% 0%',
    horizontal: true,
  },
]

export default function WhySummer() {
  return (
    <section className="section">
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[920px] mx-auto text-center flex flex-col gap-4">
          <h2>
            {nb('План')}{' '}
            <span style={{ color: 'var(--cta)' }}>{nb('полезных каникул')}</span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            {nb(
              '7 направлений работы за лето: что мы будем тренировать с ребёнком — и какой результат вы увидите.'
            )}
          </p>
        </div>

        <div className="plan-grid">
          {items.map((it, i) => (
            <article
              key={it.title}
              className={`plan-card ${it.tone} ${it.span} reveal reveal-delay-${Math.min(i + 1, 6)}`}
            >
              {it.badge && (
                <span
                  className={`plan-card__topBadge${it.badgeTone === 'navy' ? ' plan-card__topBadge--navy' : ''}`}
                >
                  {nb(it.badge)}
                </span>
              )}

              {it.horizontal ? (
                <div className="plan-card__horizontal">
                  <div className="flex flex-col gap-4">
                    <div className="plan-card__head">
                      <span className="plan-card__icon" aria-hidden>{it.icon}</span>
                      <div className="plan-card__head-text">
                        <h3 className="plan-card__title">{nb(it.title)}</h3>
                        {it.subtitle && (
                          <p className="plan-card__subtitle">{nb(it.subtitle)}</p>
                        )}
                      </div>
                    </div>
                    <p className="plan-card__text">{nb(it.text)}</p>
                    <div className="plan-card__result">
                      <span className="plan-card__result-label">Главный результат:</span>
                      <span className="plan-card__result-text">{nb(it.result)}</span>
                    </div>
                    {it.pill && <span className="plan-card__pill">{nb(it.pill)}</span>}
                  </div>
                  {it.withPhoto && (
                    <div
                      className={[
                        'plan-card__photo',
                        it.photoSrc ? 'plan-card__photo--filled' : '',
                        it.photoBlend ? 'plan-card__photo--blend' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {it.photoSrc && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={it.photoSrc}
                          alt={it.photoAlt ?? ''}
                          loading="lazy"
                          decoding="async"
                          className="plan-card__photo-img"
                          style={it.photoObjectPosition ? { objectPosition: it.photoObjectPosition } : undefined}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="plan-card__head">
                    <span className="plan-card__icon" aria-hidden>{it.icon}</span>
                    <h3 className="plan-card__title">{nb(it.title)}</h3>
                  </div>
                  <p className="plan-card__text">{nb(it.text)}</p>
                  {it.withPhoto && (
                    <div
                      className={[
                        'plan-card__photo',
                        it.photoSrc ? 'plan-card__photo--filled' : '',
                        it.photoBlend ? 'plan-card__photo--blend' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      {it.photoSrc && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={it.photoSrc}
                          alt={it.photoAlt ?? ''}
                          loading="lazy"
                          decoding="async"
                          className="plan-card__photo-img"
                          style={it.photoObjectPosition ? { objectPosition: it.photoObjectPosition } : undefined}
                        />
                      )}
                    </div>
                  )}
                  <div className="plan-card__result">
                    <span className="plan-card__result-label">Результат:</span>
                    <span className="plan-card__result-text">{nb(it.result)}</span>
                  </div>
                  {it.pill && <span className="plan-card__pill">{nb(it.pill)}</span>}
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
