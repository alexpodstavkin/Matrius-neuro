'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

const LESSON_IMAGE = 'lesson-boy.jpg';

const STEPS = [
  {
    num: '01',
    title: 'Знакомимся с&nbsp;ребёнком',
    desc: 'Педагог 5&nbsp;минут общается с&nbsp;ребёнком&nbsp;— находит то, что ему интересно, чтобы он&nbsp;не&nbsp;стеснялся и&nbsp;расслабился.',
  },
  {
    num: '02',
    title: 'Проводит диагностику',
    desc: 'Несколько коротких заданий: правила, диктант на&nbsp;пару строк, разбор слов. Этого достаточно, чтобы увидеть слабое место.',
  },
  {
    num: '03',
    title: 'Объясняем одно правило',
    desc: 'Берём то, что хуже всего даётся, и&nbsp;объясняем по&nbsp;методике Matrius. Ребёнок понимает прямо на&nbsp;диагностике.',
  },
  {
    num: '04',
    title: 'Говорим с&nbsp;родителем',
    desc: 'В&nbsp;конце 10&nbsp;минут с&nbsp;вами: что нашли, на&nbsp;что обратить внимание, как заниматься летом, чтобы выйти в&nbsp;школу подготовленным.',
  },
];

export default function LessonBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* Левый navy slot — заголовок + 4 шага + CTA */}
          <Reveal className="col-span-1 md:col-span-8 lg:col-span-8" delay={0.05}>
            <div className="shell h-full">
              <div className="dark-inner h-full rounded-[26px] bg-navy text-white p-6 md:p-10 lg:p-12 flex flex-col relative overflow-hidden">
                {/* Pattern background */}
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
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/15 blur-3xl"
                  aria-hidden
                />

                <div className="relative max-w-2xl mb-8 md:mb-10">
                  <h2
                    className="font-bold text-white leading-[1.06] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.625rem, 2.8vw, 2.5rem)' }}
                  >
                    На&nbsp;<span className="text-orange">бесплатной диагностике</span> вы&nbsp;увидите, как ваш ребёнок начинает понимать правила по&nbsp;русскому языку
                  </h2>
                </div>

                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8 md:mb-10">
                  {STEPS.map((s, i) => (
                    <Reveal key={s.num} delay={0.08 * i}>
                      <div className="rounded-[18px] bg-white ring-1 ring-black/[0.05] p-5 md:p-6 h-full flex flex-col gap-2.5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-bold text-orange leading-none tracking-tight"
                            style={{ fontSize: 'clamp(1.5rem, 2vw, 1.875rem)' }}
                          >
                            {s.num}
                          </span>
                          <span className="text-muted text-[11px] font-bold uppercase tracking-[0.18em]">
                            Шаг
                          </span>
                        </div>
                        <h3
                          className="font-bold text-navy text-[16px] md:text-[17px] leading-snug tracking-[-0.012em]"
                          dangerouslySetInnerHTML={{ __html: s.title }}
                        />
                        <p
                          className="text-[14px] md:text-[15px] leading-relaxed text-ink/80"
                          dangerouslySetInnerHTML={{ __html: s.desc }}
                        />
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="relative mt-auto">
                  <button type="button" onClick={onCTA} className="btn-primary-wide">
                    Записаться на бесплатную диагностику
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Правая колонка — фото, скрыта на мобайле */}
          <Reveal className="hidden md:block md:col-span-4 lg:col-span-4" delay={0.15}>
            <div className="shell h-full">
              <div className="relative h-full overflow-hidden rounded-[26px] bg-navy">
                <img
                  src={LESSON_IMAGE}
                  alt="Бесплатная диагностика по русскому с педагогом Matrius"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
