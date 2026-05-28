'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

const HERO_IMAGE = 'hero-lesson.jpg';

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

            <div className="relative flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <img
                src="matrius-logo.png"
                alt="Matrius"
                className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full"
              />
              <div className="leading-snug text-white/70 text-sm font-medium">
                Онлайн-школа развития детей<br />5–17&nbsp;лет
              </div>
              <span className="inline-flex items-center rounded-full bg-white text-navy ring-1 ring-white/40 px-3 py-1.5 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] whitespace-nowrap shadow-[0_6px_18px_-10px_rgba(0,0,0,0.35)]">
                Для учеников начальной школы
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white text-navy ring-1 ring-white/40 px-3 py-1.5 text-[11px] md:text-[12px] font-bold uppercase tracking-[0.14em] whitespace-nowrap shadow-[0_6px_18px_-10px_rgba(0,0,0,0.35)]">
                <span className="inline-block h-2 w-2 rounded-full bg-orange animate-pulse" aria-hidden />
                Онлайн
              </span>
            </div>

            <h1
              className="relative font-bold text-white leading-[1.06] tracking-[-0.02em] mb-6 md:mb-7"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Найдём проблему низких оценок по&nbsp;русскому языку и&nbsp;<span className="text-orange">решим её&nbsp;за&nbsp;60&nbsp;минут</span> на&nbsp;бесплатной диагностике
            </h1>
            <div className="relative">
              <button type="button" onClick={onCTA} className="btn-primary-wide">
                Записаться на бесплатную диагностику
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Фото — ребёнок на онлайн-уроке с педагогом */}
      <Reveal className="hidden md:block md:col-span-5 lg:col-span-5" delay={0.15}>
        <div className="shell h-full">
          <div className="relative h-full overflow-hidden rounded-[26px] bg-navy-light">
            <img
              src={HERO_IMAGE}
              alt="Ребёнок 7–10 лет на онлайн-занятии с педагогом Matrius"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
