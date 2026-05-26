'use client';

import Reveal from './Reveal';

const PRINCIPLES = [
  {
    title: 'Объясняем простыми словами',
    desc: 'Сложные правила из&nbsp;учебника заменяем на&nbsp;язык, который ребёнок понимает. «Безударная гласная» становится «гласной, которую плохо слышно»&nbsp;— и&nbsp;ошибки уходят.',
  },
  {
    title: 'Один на&nbsp;один с&nbsp;педагогом',
    desc: 'Никаких групп. Педагог видит, где именно ребёнок «теряется», и&nbsp;идёт в&nbsp;его темпе&nbsp;— не&nbsp;быстрее и&nbsp;не&nbsp;медленнее.',
  },
  {
    title: 'Через интерес ребёнка',
    desc: 'Привязываем правила к&nbsp;темам, которые ребёнку нравятся. Любит футбол&nbsp;— правила учим на&nbsp;названиях команд. Любит лошадей&nbsp;— на&nbsp;породах. Так запоминается с&nbsp;первого раза.',
  },
  {
    title: 'По&nbsp;одному правилу за&nbsp;раз',
    desc: 'Не&nbsp;сваливаем 5&nbsp;тем в&nbsp;час. Ребёнок не&nbsp;путается и&nbsp;видит результат после каждого занятия&nbsp;— а&nbsp;это главное, чтобы он&nbsp;не&nbsp;бросил.',
  },
];

export default function Methodology() {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-8 md:p-12 lg:p-16">
              <div className="max-w-4xl mb-10 md:mb-14">
                <h2 className="h2">
                  Обучаем с&nbsp;помощью уникального подхода Matrius. <span className="text-orange">Результат виден уже на&nbsp;первом занятии</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7">
                {PRINCIPLES.map((p, i) => (
                  <Reveal key={p.title} delay={0.06 * i}>
                    <div className="rounded-[22px] bg-[#F4F5F8] p-6 md:p-8 ring-1 ring-black/[0.04] h-full flex flex-col gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-orange/15 text-orange font-bold text-[15px] tracking-tight">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h3
                        className="text-navy font-bold text-[18px] md:text-[20px] leading-snug tracking-[-0.012em]"
                        dangerouslySetInnerHTML={{ __html: p.title }}
                      />
                      <p
                        className="text-[15px] md:text-[16px] leading-relaxed text-ink/80"
                        dangerouslySetInnerHTML={{ __html: p.desc }}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
