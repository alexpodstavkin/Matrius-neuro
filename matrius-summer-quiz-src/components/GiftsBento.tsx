'use client';

type Gift = {
  emoji: string;
  title: string;
  desc: string;
};

const GIFTS: Gift[] = [
  {
    emoji: '📚',
    title: '5 упражнений для красивого почерка',
    desc: 'Простые техники: ребёнок снизит количество глупых ошибок и сделает почерк аккуратным за 3 недели.',
  },
  {
    emoji: '🧠',
    title: '5 нейроигр для развития мышления',
    desc: 'Игровой комплекс на каждый день: задачи на логику, скорость и пространственное мышление дома.',
  },
  {
    emoji: '🔥',
    title: 'Как поддерживать фокус и мотивацию',
    desc: 'Авторская инструкция родителям: что говорить и не говорить, чтобы ребёнок не выгорел летом.',
  },
  {
    emoji: '⚡',
    title: 'Простой метод увеличения скорости чтения за 5 дней',
    desc: 'Короткие ежедневные тренировки и техника, которая ускоряет чтение в 2 раза без потери понимания.',
  },
  {
    emoji: '📖',
    title: '7 упражнений на скорость чтения',
    desc: 'Готовый 30-дневный план: каждое упражнение занимает 10–15 минут в день, без давления.',
  },
  {
    emoji: '🎯',
    title: '5 упражнений на концентрацию',
    desc: 'Игры на внимание и фокус — чтобы ребёнок не залипал в телефоне, а спокойно учился.',
  },
];

export default function GiftsBento() {
  return (
    <section className="relative">
      <div className="container-x section">
        <div className="max-w-3xl mb-8 md:mb-12">
          <h2 className="h2 mb-3">Что вы получите:</h2>
          <p className="lead">
            Содержание базы знаний — материалы, которые помогут ребёнку провести лето с&nbsp;пользой и&nbsp;начать учебный год с&nbsp;уверенностью.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {GIFTS.map((g) => (
            <article
              key={g.title}
              className="card p-5 md:p-6 flex flex-col gap-3"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange/10 text-2xl">
                {g.emoji}
              </span>
              <h3 className="text-navy font-bold text-[17px] md:text-[18px] leading-snug">
                {g.title}
              </h3>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-muted">
                {g.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
