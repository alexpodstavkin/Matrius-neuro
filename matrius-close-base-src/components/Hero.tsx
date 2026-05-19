'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1400&q=70';

export default function Hero({ onCTA }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
      <Reveal className="col-span-1 md:col-span-7 lg:col-span-7" delay={0.05}>
        <div className="shell h-full">
          <div className="dark-inner h-full rounded-[26px] bg-navy text-white p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
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

            <div className="relative flex items-center gap-3 mb-6 md:mb-8">
              <img
                src="matrius-logo.png"
                alt="Matrius"
                className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full"
              />
              <div className="leading-tight">
                <div className="text-white font-bold text-lg">Matrius</div>
                <div className="text-white/65 text-sm">Онлайн-школа развития детей 5–17&nbsp;лет.</div>
              </div>
            </div>

            <h1
              className="relative font-bold text-white leading-[1.04] tracking-[-0.02em] mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Доступ к&nbsp;<span className="text-orange">закрытой базе знаний</span>, которая поможет вашему ребёнку не&nbsp;потерять от&nbsp;30% школьных знаний за&nbsp;лето
            </h1>
            <p className="relative text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
              Чек-листы, авторские материалы и&nbsp;пошаговые образовательные инструкции общей ценностью более 150&nbsp;000&nbsp;₽. Материалы, которые помогут вашему ребёнку быть готовым к&nbsp;новому учебному году на&nbsp;5+
            </p>
            <div className="relative">
              <button type="button" onClick={onCTA} className="btn-primary-wide">
                Забрать бесплатно
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Фото — скрыто на мобайле, видно от md */}
      <Reveal className="hidden md:block md:col-span-5 lg:col-span-5" delay={0.15}>
        <div className="shell h-full">
          <div className="relative h-full overflow-hidden rounded-[26px]">
            <img
              src={HERO_IMAGE}
              alt="Ребёнок за учёбой летом"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
