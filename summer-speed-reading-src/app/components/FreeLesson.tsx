import { nb } from '../lib/typography'
import CtaButton from './CtaButton'

const steps = [
  {
    n: '01',
    title: 'Знакомство',
    text:
      'Педагог встречается с ребёнком онлайн, узнаёт его интересы и любимые книги — и строит урок именно под него.',
  },
  {
    n: '02',
    title: 'Диагностика',
    text:
      'Замер стартовой скорости чтения, понимания текста и концентрации. У логопеда такое обследование стоит от 1500 ₽.',
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
      'Педагог объясняет родителю, что и как делать летом, чтобы ребёнок и отдохнул, и не потерял школьные знания.',
  },
]

export default function FreeLesson() {
  return (
    <section className="section hero-bg">
      <div className="container relative z-10 flex flex-col gap-12 lg:gap-16">
        <div className="max-w-[920px] mx-auto text-center flex flex-col gap-5">
          <h2>{nb('Что будет на бесплатном уроке')}</h2>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 list-none p-0 m-0">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`step-card reveal reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <span className="step-num step-num--light">{s.n}</span>
              <h3 style={{ fontSize: 20 }}>{nb(s.title)}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55 }}>{nb(s.text)}</p>
            </li>
          ))}
        </ol>

        <div className="flex justify-center">
          <CtaButton href="#form" variant="primary" size="lg">
            Записаться на бесплатный урок
          </CtaButton>
        </div>
      </div>
    </section>
  )
}
