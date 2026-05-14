import { nb } from '../lib/typography'

export default function Hero() {
  return (
    <section className="section hero-bg" style={{ paddingTop: 'clamp(96px, 10vw, 180px)' }}>
      <div className="container relative z-10 grid grid-cols-1 gap-5 lg:gap-7 lg:grid-cols-[1.05fr_1fr] items-stretch">
        <div className="hero-cell flex flex-col gap-7">
          <div className="flex items-center flex-wrap gap-3">
            <a href="https://matrius.online/" target="_blank" rel="noopener" className="hero-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="matrius-logo.png" alt="Matrius" className="hero-logo__img" />
              <span className="hero-logo__text">Matrius</span>
            </a>
            <span className="bento-pill bento-pill--on-dark">
              <span className="bento-pill__icon" aria-hidden>👧</span>
              {nb('Подходит детям 6–11 лет')}
            </span>
            <span className="bento-pill bento-pill--on-dark">
              <span className="bento-pill__icon" aria-hidden>💻</span>
              {nb('Онлайн с педагогом')}
            </span>
          </div>
          <h1>
            {nb('Поможем ребёнку')}{' '}
            <span style={{ color: '#9fb6d9' }}>{nb('не потерять')}</span>{' '}
            {nb('школьные знания за лето и прийти 1 сентября')}{' '}
            <span style={{ color: '#ff8a5b' }}>
              {nb('более подготовленным к учёбе')}
            </span>
          </h1>
          <p
            className="leading-relaxed"
            style={{ fontSize: 'clamp(18px, 1.4vw + 8px, 24px)', maxWidth: 600 }}
          >
            {nb('С помощью уникальной методологии скорочтения онлайн-школы Matrius.')}
          </p>
          <div className="flex flex-col gap-4 mt-auto">
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#ff8a5b',
              }}
            >
              {nb('Регистрируйтесь сейчас и заберите 3 подарка')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="hero-gift-card">
                <span className="hero-gift-card__icon" aria-hidden>📖</span>
                <span className="hero-gift-card__title">
                  {nb('Авторский гайд: 7 упражнений, которые увеличивают скорость чтения ребёнка в 2 раза за 30 дней')}
                </span>
              </div>
              <div className="hero-gift-card">
                <span className="hero-gift-card__icon" aria-hidden>🎯</span>
                <span className="hero-gift-card__title">
                  {nb('Авторский гайд: 5 упражнений на концентрацию')}
                </span>
              </div>
              <div className="hero-gift-card">
                <span className="hero-gift-card__icon" aria-hidden>📔</span>
                <span className="hero-gift-card__title">
                  {nb('Читательский дневник для записей эмоций и выводов о прочитанном')}
                </span>
              </div>
            </div>
            <a
              href="#form"
              className="btn btn--primary btn--lg"
              style={{ width: '100%' }}
            >
              Записаться
            </a>
          </div>
        </div>

        <div className="hero-photo-cell hero-cell hero-photo-cell--filled">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="hero.png" alt="Ученики Matrius" className="hero-photo-img" />
        </div>
      </div>
    </section>
  )
}
