import { nb } from '../lib/typography'

const steps = [
  {
    n: '01',
    title: 'Знакомство',
    text:
      'Педагог встречается с ребёнком онлайн, узнаёт его интересы и любимые книги — и строит урок на основе интересов.',
  },
  {
    n: '02',
    title: 'Диагностика',
    text:
      'Замер стартовой скорости чтения, понимания текста и концентрации. Родитель видит точку, с которой стартуем.',
  },
  {
    n: '03',
    title: 'Авторские упражнения',
    text:
      'Ребёнок пробует методику Matrius прямо на уроке и видит первый результат уже через 30 минут.',
  },
  {
    n: '04',
    title: 'План на лето',
    text:
      'Педагог объясняет, что и как делать летом, чтобы к сентябрю выйти с +0,7 балла к оценкам.',
  },
]

export default function FreeLesson() {
  return (
    <section className="section section--dark">
      <div className="container relative z-10 flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[920px] flex flex-col gap-4">
          <h2>
            {nb('Чтобы познакомиться с нашей методологией приглашаем вас пройти бесплатный урок по скорочтению')}
          </h2>
        </div>
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
          {steps.map((s) => (
            <li
              key={s.n}
              className="step-card--dark flex flex-col gap-3"
              style={{ borderRadius: 12, padding: 'clamp(20px, 2.2vw, 28px)' }}
            >
              <span
                className="step-num"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 15,
                  letterSpacing: '0.04em',
                }}
              >
                {s.n}
              </span>
              <h3 style={{ fontSize: 19 }}>{nb(s.title)}</h3>
              <p style={{ fontSize: 15 }}>{nb(s.text)}</p>
            </li>
          ))}
        </ol>
        <a
          href="#form"
          className="btn btn--primary btn--lg w-full lg:w-auto lg:self-start"
          style={{ minWidth: 0 }}
        >
          Записаться на бесплатный урок →
        </a>
      </div>
    </section>
  )
}
