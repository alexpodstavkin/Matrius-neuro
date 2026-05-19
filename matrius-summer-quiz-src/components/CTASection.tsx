'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

export default function CTASection({ onCTA }: Props) {
  return (
    <section className="relative w-full">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="dark-inner relative overflow-hidden rounded-[26px] bg-navy text-white p-8 md:p-14 lg:p-20 text-center flex flex-col items-center">
              {/* Pattern background — almost invisible */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: 'url(matrius-pattern.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  opacity: 0.04,
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange/20 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-navy-light/30 blur-3xl"
                aria-hidden
              />
              <h2
                className="relative font-bold text-white leading-[1.05] tracking-[-0.018em] mb-5 max-w-4xl"
                style={{ fontSize: 'clamp(1.875rem, 3.6vw, 3rem)' }}
              >
                Доступ к&nbsp;<span className="text-orange">закрытой базе знаний</span>, которая поможет вашему ребёнку не&nbsp;потерять от&nbsp;30% школьных знаний за&nbsp;лето
              </h2>
              <p className="relative text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                Чек-листы, авторские материалы и&nbsp;пошаговые образовательные инструкции общей ценностью более 150&nbsp;000&nbsp;₽. Материал, который поможет вашему ребёнку быть готовым к&nbsp;новому учебному году на&nbsp;5+
              </p>
              <div className="relative">
                <button type="button" onClick={onCTA} className="btn-primary-wide">
                  Забрать бесплатно
                </button>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
