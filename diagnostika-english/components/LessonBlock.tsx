'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

const LESSON_IMAGE = 'lesson-boy-en.jpg';

const STEPS = [
  {
    num: '01',
    title: 'Знакомимся с&nbsp;ребёнком',
    desc: 'Педагог 5&nbsp;минут общается с&nbsp;ребёнком по-русски&nbsp;— находит то, что ему интересно, чтобы он&nbsp;расслабился и&nbsp;не&nbsp;зажимался.',
  },
  {
    num: '02',
    title: 'Проверяем уровень',
    desc: 'Ребёнок проходит увлекательный квест, во&nbsp;время которого отвечает на&nbsp;вопросы на&nbsp;английском через игру. Этого хватает, чтобы увидеть, где именно блок.',
  },
  {
    num: '03',
    title: 'Снимаем страх говорить',
    desc: 'Берём то, что больше всего пугает, и&nbsp;показываем ребёнку: как легко говорить на&nbsp;английском. Уже на&nbsp;диагностике ребёнок отвечает полными фразами.',
  },
  {
    num: '04',
    title: 'Говорим с&nbsp;родителем',
    desc: 'В&nbsp;конце 10&nbsp;минут с&nbsp;вами: что нашли, какой реальный уровень, как заниматься летом, чтобы в&nbsp;школу ребёнок вышел уверенным в&nbsp;своих способностях.',
  },
];

export default function LessonBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* Левый navy slot — заголовок + 4 шага + CTA */}
          <Reveal className="col-span-1 md:col-span-12 xl:col-span-6" delay={0.05}>
            <div className="shell h-full">
              <div className="dark-inner h-full rounded-[26px] bg-navy text-white p-5 md:p-10 lg:p-12 flex flex-col relative overflow-hidden">
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
                    className="font-bold text-white leading-[1.1] tracking-[-0.02em]"
                    style={{ fontSize: 'clamp(1.5rem, 0.5rem + 1.8vw, 2.75rem)' }}
                  >
                    На&nbsp;<span className="text-orange">бесплатной диагностике</span> вы&nbsp;увидите, как ваш ребёнок начинает говорить по-английски
                  </h2>
                </div>

                <div className="relative flex flex-col gap-3 md:gap-4 mb-8 md:mb-10">
                  {STEPS.map((s, i) => (
                    <Reveal key={s.num} delay={0.08 * i}>
                      <div className="rounded-[18px] bg-white ring-1 ring-black/[0.05] p-4 md:p-5 flex items-start gap-4 md:gap-5 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                        <div className="flex flex-col items-center justify-center gap-0.5 shrink-0 w-[56px] md:w-[64px] pt-1">
                          <span
                            className="font-bold text-orange leading-none tracking-tight"
                            style={{ fontSize: 'clamp(1.5rem, 2vw, 1.875rem)' }}
                          >
                            {s.num}
                          </span>
                          <span className="text-muted text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em]">
                            Шаг
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-bold text-navy leading-snug tracking-[-0.012em] mb-1"
                            style={{ fontSize: 'clamp(0.9375rem, 0.5rem + 0.625vw, 1.25rem)' }}
                            dangerouslySetInnerHTML={{ __html: s.title }}
                          />
                          <p
                            className="leading-relaxed text-ink/80"
                            style={{ fontSize: 'clamp(0.8125rem, 0.625rem + 0.42vw, 1rem)' }}
                            dangerouslySetInnerHTML={{ __html: s.desc }}
                          />
                        </div>
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
          <Reveal className="hidden xl:block xl:col-span-6" delay={0.15}>
            <div className="shell h-full">
              <div className="relative h-full overflow-hidden rounded-[26px] bg-navy">
                <img
                  src={LESSON_IMAGE}
                  alt="Бесплатная диагностика по английскому с педагогом Matrius"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
