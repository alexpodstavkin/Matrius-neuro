'use client';

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
        <article className="card p-6 md:p-10 lg:p-12">
          <div className="max-w-3xl mb-8 md:mb-10">
            <h2 className="h2">Почему родители выбирают онлайн-школу Matrius</h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
            {STATS.map((s) => (
              <div key={s.value} className="rounded-xl bg-surface-soft border border-[#EBEBEB] p-6 md:p-7">
                <div
                  className="text-orange font-bold leading-none mb-3"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
                >
                  {s.value}
                </div>
                <div
                  className="text-navy font-semibold text-[14px] md:text-[15px] leading-snug"
                  dangerouslySetInnerHTML={{ __html: s.label }}
                />
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl bg-surface-soft border border-[#EBEBEB] p-5 md:p-6 flex flex-col gap-2.5">
                <h3 className="text-navy font-bold text-[17px] md:text-[18px] leading-snug">
                  {f.title}
                </h3>
                <p
                  className="text-[14px] md:text-[15px] leading-relaxed text-muted"
                  dangerouslySetInnerHTML={{ __html: f.desc }}
                />
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
