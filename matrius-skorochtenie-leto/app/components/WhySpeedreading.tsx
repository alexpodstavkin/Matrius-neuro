import { nb } from '../lib/typography'

const benefits = [
  {
    icon: '📚',
    title: 'Учёба в школе',
    text: 'Домашка делается в 2 раза быстрее, остаётся время на отдых.',
    tint: 'card--tint-navy',
  },
  {
    icon: '🧠',
    title: 'Память и концентрация',
    text: 'Ребёнок дольше удерживает внимание и лучше запоминает прочитанное.',
    tint: 'card--tint-cta',
  },
  {
    icon: '🗣',
    title: 'Речь и мышление',
    text: 'Богаче словарный запас, проще формулировать мысли — в том числе на устных ответах у доски.',
    tint: 'card--tint-navy',
  },
  {
    icon: '🎯',
    title: 'Уверенность в себе',
    text: 'Оценки растут, учителя хвалят — ребёнок чувствует себя успешным и охотно берётся за новое.',
    tint: 'card--tint-cta',
  },
  {
    icon: '📝',
    title: 'Уверенность на ВПР и контрольных',
    text: 'Большие тексты заданий перестают пугать — ребёнок успевает прочитать, понять и ответить.',
    tint: 'card--tint-navy',
  },
  {
    icon: '💸',
    title: 'Меньше расходов на репетиторов',
    text: 'Когда ребёнок быстро схватывает материал сам, дополнительные занятия нужны реже.',
    tint: 'card--tint-cta',
  },
]

export default function WhySpeedreading() {
  return (
    <section
      className="section"
      style={{
        background:
          'linear-gradient(180deg, rgba(56, 86, 129, 0.10) 0%, rgba(56, 86, 129, 0.04) 100%)',
      }}
    >
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[820px] flex flex-col gap-4">
          <h2>{nb('Скорочтение — навык, который влияет на всю учёбу')}</h2>
          <p className="text-[16px] sm:text-[17px]">
            {nb('Когда ребёнок читает быстро и с пониманием, у него остаются силы и время на всё остальное — от математики до творчества. Один навык, который улучшает всю успеваемость и помогает спокойнее встретить начало учебного года.')}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <article key={b.title} className={`card ${b.tint} flex flex-col gap-3`}>
              <span aria-hidden style={{ fontSize: 32, lineHeight: 1 }}>{b.icon}</span>
              <h3 style={{ fontSize: 18 }}>{nb(b.title)}</h3>
              <p style={{ fontSize: 15 }}>{nb(b.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
