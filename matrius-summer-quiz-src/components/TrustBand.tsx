'use client';

import Reveal from './Reveal';

const STATS = [
  { value: '7+', label: 'лет на&nbsp;рынке онлайн-образования' },
  { value: '50 000+', label: 'учеников прошли наши программы' },
  { value: '4,9', label: 'средний рейтинг родителей в&nbsp;отзывах' },
];

const FEATURES = [
  {
    title: 'Игровая платформа',
    desc: 'Дети учатся в&nbsp;интерактивной среде, где задания подаются как уровни и&nbsp;квесты.',
  },
  {
    title: 'Индивидуальный подбор преподавателей',
    desc: 'Подбираем педагога под характер ребёнка — учиться легче, когда есть контакт.',
  },
  {
    title: 'Образовательная лицензия',
    desc: 'Официальный резидент «Сколково», лицензия №Л035-1265-18/652138.',
  },
];

export default function TrustBand() {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-6 md:p-10 lg:p-14">
              <div className="max-w-3xl mb-10 md:mb-12">
                <span className="eyebrow mb-4">Доверие</span>
                <h2 className="h2 mt-4">Почему родители выбирают онлайн-школу Matrius</h2>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
                {STATS.map((s, i) => (
                  <Reveal key={s.value} delay={0.05 * i}>
                    <div className="rounded-[22px] bg-[#F4F5F8] p-6 md:p-8 ring-1 ring-black/[0.04] h-full">
                      <div
                        className="text-orange font-bold leading-none mb-3 tracking-[-0.02em]"
                        style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
                      >
                        {s.value}
                      </div>
                      <div
                        className="text-navy font-semibold text-[14px] md:text-[15px] leading-snug"
                        dangerouslySetInnerHTML={{ __html: s.label }}
                      />
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {FEATURES.map((f, i) => (
                  <Reveal key={f.title} delay={0.05 * i}>
                    <div className="rounded-[22px] bg-[#F4F5F8] p-5 md:p-7 ring-1 ring-black/[0.04] h-full flex flex-col gap-2.5">
                      <h3 className="text-navy font-bold text-[17px] md:text-[18px] leading-snug tracking-[-0.012em]">
                        {f.title}
                      </h3>
                      <p
                        className="text-[14px] md:text-[15px] leading-relaxed text-muted"
                        dangerouslySetInnerHTML={{ __html: f.desc }}
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
