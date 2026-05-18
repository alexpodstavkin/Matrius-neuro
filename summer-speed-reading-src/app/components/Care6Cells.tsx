import { nb } from '../lib/typography'

type Cell = {
  icon: string
  title: string
  text: string
  tint:
    | 'card--tint-navy'
    | 'card--tint-cta'
    | 'card--tint-emerald'
    | 'card--tint-violet'
    | 'card--tint-amber'
    | 'card--tint-rose'
  span: string
}

const cells: Cell[] = [
  {
    icon: '🎲',
    title: 'Учим через игру',
    text: 'Каждое занятие построено как квест: квизы, обсуждения любимых героев, поиск ответов на вопросы, как у настоящих детективов. Ребёнок учится незаметно — потому что ему интересно.',
    tint: 'card--tint-cta',
    span: 'lg:col-span-5',
  },
  {
    icon: '✨',
    title: 'Тому, чему не учат в школе',
    text: 'Никакой зубрёжки — только актуальные навыки для современных детей: скорочтение, концентрация, работа с информацией.',
    tint: 'card--tint-violet',
    span: 'lg:col-span-4',
  },
  {
    icon: '👩‍🏫',
    title: 'С опытными преподавателями',
    text: 'Они знают, как увлечь детей и объяснить сложное простыми словами. Каждый педагог проходит трёхступенчатый отбор и работает только по нашей методике.',
    tint: 'card--tint-navy',
    span: 'lg:col-span-3',
  },
  {
    icon: '🛡',
    title: 'В безопасной среде',
    text: 'Можно не волноваться, где ребёнок находится во время каникул — занятия идут онлайн, под присмотром педагога.',
    tint: 'card--tint-emerald',
    span: 'lg:col-span-4',
  },
  {
    icon: '🛋',
    title: 'Так, чтобы не устать',
    text: 'Не нагружаем ребёнка после учебного года, а помогаем развиваться в интересной форме.',
    tint: 'card--tint-amber',
    span: 'lg:col-span-4',
  },
  {
    icon: '📚',
    title: 'Без откатов в знаниях',
    text: 'За лето мозг не «обнуляется» — мышление, чтение и словарь остаются в работе. К сентябрю ребёнок не теряет, а прибавляет.',
    tint: 'card--tint-rose',
    span: 'lg:col-span-4',
  },
]

export default function Care6Cells() {
  return (
    <section className="section" style={{ background: 'var(--surface-soft)' }}>
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[920px] mx-auto text-center">
          <h2>
            {nb('Снимем нагрузку с родителя, а ребёнку')}{' '}
            <span style={{ color: 'var(--cta)' }}>{nb('не дадим заскучать')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
          {cells.map((c, i) => (
            <article
              key={c.title}
              className={`card ${c.tint} ${c.span} flex flex-col gap-3 reveal reveal-delay-${Math.min(i + 1, 6)}`}
            >
              <span className="card-icon" aria-hidden>{c.icon}</span>
              <h3 style={{ fontSize: 20 }}>{nb(c.title)}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.55 }}>{nb(c.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
