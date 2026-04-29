import { heroPills, heroFeatures } from '../../data/content';
import { ArrowCta } from '../ui/ArrowCta';
import * as Icons from '../icons/icons';

const NBSP = ' ';

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-decor" aria-hidden="true">
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-dots" />
      </div>

      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-pills">
              <a href="#" aria-label="Matrius — главная" className="hero-logo-pill">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Matrius" />
              </a>
              {heroPills.map((p) => (
                <span key={p} className="hero-pill">{p}</span>
              ))}
            </div>

            <h1>
              {`Повысим успеваемость ребёнка на${NBSP}`}
              <span className="mark-orange">+0,7 балла</span>
              {` за${NBSP}месяц`}
            </h1>

            <p className="lead">
              {`С${NBSP}помощью уникальной методологии скорочтения онлайн-школы Matrius.`}
            </p>

            <div className="hero-features">
              {heroFeatures.map((f) => {
                const Icon = Icons[f.icon as keyof typeof Icons];
                return (
                  <div key={f.text} className="feature-pill">
                    <span className="ic"><Icon /></span>
                    <span className="text">{f.text}</span>
                  </div>
                );
              })}
            </div>

            <div className="hero-cta-block">
              <ArrowCta size="large">{`Записаться на${NBSP}бесплатный урок`}</ArrowCta>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-photo-frame">
              <div className="hero-photo-backdrop" aria-hidden="true" />
              <div className="hero-photo">
                <img
                  src={`${import.meta.env.BASE_URL}hero.png`}
                  alt="Ученик Matrius"
                  width={1122}
                  height={1402}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
