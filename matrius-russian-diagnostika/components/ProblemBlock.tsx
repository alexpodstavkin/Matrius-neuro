'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

const PROBLEMS = [
  'Правила учит, а в&nbsp;диктанте пишет с&nbsp;ошибками',
  'Боится контрольных и&nbsp;диктантов',
  'Путает падежи и&nbsp;не&nbsp;может задать к&nbsp;слову вопрос',
  'Почерк такой, что учитель снижает балл «за&nbsp;оформление»',
  'Списывает из&nbsp;учебника&nbsp;— и&nbsp;всё равно с&nbsp;ошибками',
  'Сочинение&nbsp;— две строчки и&nbsp;«не&nbsp;знаю, что писать»',
];

export default function ProblemBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mb-10 md:mb-14">
                <h2 className="h2">
                  <span className="text-orange">Лето</span>&nbsp;— лучшее время подтянуть русский язык, пока ребёнок помнит школьный материал
                </h2>
                <p className="lead mt-4 md:mt-5">
                  Если вы&nbsp;узнаёте своего ребёнка хотя&nbsp;бы в&nbsp;паре пунктов ниже&nbsp;— значит, есть конкретный пробел в&nbsp;знаниях. Летом его реально закрыть без&nbsp;стресса для&nbsp;ребёнка.
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mb-10 md:mb-14">
                {PROBLEMS.map((p, i) => (
                  <Reveal key={p} delay={0.05 * i}>
                    <li
                      className="flex items-start gap-4 rounded-[20px] bg-[#FFE8D8] p-5 md:p-6 ring-1 ring-[#FBD3B6] h-full transition-transform duration-500 hover:-translate-y-1"
                      style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
                    >
                      <span
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-orange text-[14px] font-bold ring-1 ring-orange/20"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className="text-[15px] md:text-[16px] leading-relaxed text-navy/90 font-medium"
                        dangerouslySetInnerHTML={{ __html: p }}
                      />
                    </li>
                  </Reveal>
                ))}

                {/* 7-я ячейка — вывод на всю ширину, навы */}
                <Reveal delay={0.05 * 6} className="md:col-span-2 lg:col-span-3">
                  <li className="dark-inner relative overflow-hidden rounded-[22px] bg-navy text-white p-5 md:p-8 lg:p-10 h-full">
                    {/* Pattern background — almost invisible */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        backgroundImage: 'url(matrius-pattern.png)',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        opacity: 0.05,
                      }}
                      aria-hidden
                    />
                    <div className="relative flex flex-col md:flex-row items-start gap-3 md:gap-5">
                      <div className="flex items-center gap-2.5 md:block">
                        <span
                          className="inline-flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white text-[14px] md:text-[15px] font-bold"
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span className="inline-flex md:hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange ring-1 ring-white/15">
                          Вывод
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange mb-4 ring-1 ring-white/15">
                          Вывод
                        </div>
                        <p className="text-[15px] md:text-[17px] leading-relaxed text-white/90">
                          Это не&nbsp;лень и&nbsp;не&nbsp;невнимательность. Чаще всего ребёнок просто не&nbsp;понимает, как применять правило на&nbsp;практике. На&nbsp;бесплатной диагностике мы&nbsp;найдём причину этих проблем и&nbsp;расскажем, как их&nbsp;решить за&nbsp;лето так, чтобы у&nbsp;ребёнка оставалось время на&nbsp;отдых и&nbsp;общение с&nbsp;друзьями.
                        </p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              </ul>

              <div className="flex justify-center">
                <button type="button" onClick={onCTA} className="btn-primary-wide">
                  Записаться на бесплатную диагностику
                </button>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
