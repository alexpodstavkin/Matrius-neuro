'use client';

import Reveal from './Reveal';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=70';

type Props = { onCTA: () => void };

export default function CTASection({ onCTA }: Props) {
  return (
    <section className="relative w-full">
      <div className="container-x section">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          <Reveal className="md:col-span-7 lg:col-span-7" delay={0.05}>
            <div className="shell h-full">
              <div className="dark-inner h-full rounded-[26px] bg-navy text-white p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                <div
                  className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange/20 blur-3xl"
                  aria-hidden
                />
                <h2
                  className="relative font-bold text-white leading-[1.05] tracking-[-0.018em] mb-5"
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
              </div>
            </div>
          </Reveal>

          <Reveal className="md:col-span-5 lg:col-span-5" delay={0.15}>
            <div className="shell h-full">
              <div className="relative h-full min-h-[260px] md:min-h-0 overflow-hidden rounded-[26px]">
                <img
                  src={HERO_IMAGE}
                  alt="Ребёнок за учёбой летом"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </article>
      </div>
    </section>
  );
}
