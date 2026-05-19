type Bonus = {
  emoji: string;
  title: string;
  description: string;
};

const BONUSES: Bonus[] = [
  {
    emoji: '📖',
    title: '7 упражнений для скорости чтения',
    description: 'Гайд: упражнения, которые увеличат скорость чтения в 2 раза за 30 дней.',
  },
  {
    emoji: '🎯',
    title: '5 упражнений на концентрацию',
    description: 'Гайд для лета без телефона — простые игры на внимание и фокус.',
  },
  {
    emoji: '✍️',
    title: 'Читательский дневник лета',
    description: '90 дней эмоций и выводов о книгах — ребёнок ведёт сам, а вы наблюдаете рост.',
  },
];

export default function BonusesForParents() {
  return (
    <section className="bg-surface-soft">
      <div className="container-x section">
        <div className="max-w-3xl mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-lg bg-orange/10 px-3 py-1.5 text-orange text-sm font-semibold mb-4">
            Бонусы для родителей
          </span>
          <h2 className="h2 mb-3">
            Три материала, чтобы лето прошло с пользой
          </h2>
          <p className="lead">
            Дополнительно к 5 подаркам по направлениям — забирайте бонусные гайды, которые помогут организовать каникулы дома.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {BONUSES.map((b) => (
            <article
              key={b.title}
              className="card p-5 md:p-6 flex flex-col gap-3"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface-soft text-2xl">
                {b.emoji}
              </span>
              <h3 className="h3">{b.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{b.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
