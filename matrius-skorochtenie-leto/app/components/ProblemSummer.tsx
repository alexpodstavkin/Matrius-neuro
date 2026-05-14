import { nb } from '../lib/typography'

const stats = [
  {
    num: '60 %',
    caption: 'школьников получают в сентябре оценки ниже, чем были в мае — без летней нагрузки на чтение и концентрацию',
    tint: 'stat-card--cta',
  },
  {
    num: '−40 %',
    caption: 'темпа чтения, набранного за учебный год, откатывается за лето',
    tint: 'stat-card--navy',
  },
  {
    num: '6–8 часов',
    caption: 'в день школьник 7–14 лет проводит за экраном летом — вместо книг и развивающих занятий',
    tint: 'stat-card--cta',
  },
  {
    num: '2 месяца',
    caption: 'уходит у ребёнка на восстановление пройденного материала в прошлом году',
    tint: 'stat-card--navy',
  },
]

export default function ProblemSummer() {
  return (
    <section className="section" style={{ background: 'var(--surface-soft)' }}>
      <div className="container flex flex-col gap-10 lg:gap-14">
        <div className="max-w-[860px] flex flex-col gap-4">
          <h2>{nb('За лето ребёнок может потерять от 30 % школьных знаний')}</h2>
          <p className="text-[16px] sm:text-[17px]">
            {nb('Это цифры, подтверждённые исследованиями. Каждое лето мозг ребёнка незаметно делает шаг назад — а в сентябре это превращается в стресс для всей семьи.')}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <article key={s.num} className={`stat-card ${s.tint}`}>
              <div className="stat-card__num">{nb(s.num)}</div>
              <div className="stat-card__caption">{nb(s.caption)}</div>
            </article>
          ))}
        </div>

        <article className="solution-card grid grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-[1.2fr_1fr] items-center">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="solution-icon"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.12)',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 28,
                  flexShrink: 0,
                }}
              >
                ✅
              </span>
              <h3 style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}>
                {nb('Онлайн-школа Matrius помогает это исправить — и за лето сделать шаг вперёд с помощью уникальной методологии скорочтения')}
              </h3>
            </div>
            <p style={{ fontSize: 16 }}>
              {nb('Ваш ребёнок не просто сохранит школьные навыки — он придёт в сентябрь с более подготовленным, лучшей концентрацией и средним приростом +0,7 балла к оценкам. Программа на лето построена так, чтобы ребёнок учился в комфортном темпе и у него оставалось время на прогулки с друзьями.')}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="#form" className="btn btn--primary btn--lg" style={{ width: '100%' }}>
              Записаться на бесплатный урок
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}
