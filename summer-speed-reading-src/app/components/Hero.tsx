import { nb } from '../lib/typography'
import CtaButton from './CtaButton'

export default function Hero() {
  return (
    <section
      className="section hero-bg"
      style={{ paddingTop: 'clamp(96px, 9vw, 160px)', paddingBottom: 'clamp(80px, 8vw, 140px)' }}
    >
      <div className="container relative z-10 grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-[1.1fr_1fr] items-stretch">
        <div className="flex flex-col gap-7 reveal">
          <div className="flex items-center flex-wrap gap-3">
            <a
              href="https://matrius.online/"
              target="_blank"
              rel="noopener"
              className="hero-logo"
              aria-label="Перейти на сайт Matrius"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="matrius-logo.png"
                alt=""
                width={30}
                height={30}
                decoding="async"
                className="hero-logo__img"
              />
              <span>Matrius</span>
            </a>
            <span className="bento-pill bento-pill--on-sky">
              <span className="bento-pill__icon" aria-hidden>👧</span>
              {nb('Подходит детям 7–14 лет')}
            </span>
            <span className="bento-pill bento-pill--on-sky">
              <span className="bento-pill__icon" aria-hidden>💻</span>
              {nb('Онлайн с педагогом')}
            </span>
          </div>

          <h1>
            {nb('Поможем ребёнку провести')}{' '}
            <span style={{ color: 'var(--cta)' }}>{nb('летние каникулы с пользой')}</span>
          </h1>

          <p
            className="leading-relaxed"
            style={{
              fontSize: 'clamp(17px, 1.1vw + 8px, 22px)',
              maxWidth: 640,
              lineHeight: 1.5,
              color: 'rgba(26, 26, 31, 0.72)',
            }}
          >
            {nb(
              'Отвлечём ребёнка от соцсетей, поможем раскрыть таланты и полюбить книги с помощью уникальной методологии онлайн-школы Matrius по скорочтению.'
            )}
          </p>

          <div className="flex flex-col gap-4">
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--cta)',
              }}
            >
              {nb('Регистрируйтесь сейчас и заберите 3 подарка')}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="hero-gift-card">
                <span className="hero-gift-card__icon" aria-hidden>📖</span>
                <span className="hero-gift-card__title">
                  {nb('Гайд: 7 упражнений, которые увеличат скорость чтения в 2 раза за 30 дней')}
                </span>
              </div>
              <div className="hero-gift-card">
                <span className="hero-gift-card__icon" aria-hidden>🎯</span>
                <span className="hero-gift-card__title">
                  {nb('Гайд: 5 упражнений на концентрацию — для лета без телефона')}
                </span>
              </div>
              <div className="hero-gift-card">
                <span className="hero-gift-card__icon" aria-hidden>📔</span>
                <span className="hero-gift-card__title">
                  {nb('Читательский дневник лета: 90 дней эмоций и выводов о книгах')}
                </span>
              </div>
            </div>
            <CtaButton href="#form" variant="primary" size="lg" fullWidth>
              Записаться на бесплатный урок
            </CtaButton>
          </div>
        </div>

        {/* Right: photo */}
        <div className="hero-photo-cell reveal reveal-delay-2">
          <div className="hero-photo-cell--filled">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="hero.png"
              alt="Двое улыбающихся учеников онлайн-школы Matrius"
              width={720}
              height={900}
              decoding="async"
              fetchPriority="high"
              className="hero-photo-img"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
