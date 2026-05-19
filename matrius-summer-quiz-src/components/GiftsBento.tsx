'use client';

import Reveal from './Reveal';

type Gift = {
  title: string;
  desc: string;
};

const GIFTS: Gift[] = [
  {
    title: '5 упражнений для красивого почерка',
    desc: 'Простые техники: ребёнок снизит количество глупых ошибок и сделает почерк аккуратным за 3 недели.',
  },
  {
    title: '5 нейроигр для развития мышления',
    desc: 'Игровой комплекс на каждый день: задачи на логику, скорость и пространственное мышление дома.',
  },
  {
    title: 'Как поддерживать фокус и мотивацию',
    desc: 'Авторская инструкция родителям: что говорить и не говорить, чтобы ребёнок не выгорел летом.',
  },
  {
    title: 'Простой метод увеличения скорости чтения за 5 дней',
    desc: 'Короткие ежедневные тренировки и техника, которая ускоряет чтение в 2 раза без потери понимания.',
  },
  {
    title: '7 упражнений на скорость чтения',
    desc: 'Готовый 30-дневный план: каждое упражнение занимает 10–15 минут в день, без давления.',
  },
  {
    title: '5 упражнений на концентрацию',
    desc: 'Игры на внимание и фокус — чтобы ребёнок не сидел 6–8 часов в телефоне, а спокойно учился.',
  },
];

const HIDDEN_GIFTS: Gift[] = [
  {
    title: 'Список книг для летнего чтения по возрасту',
    desc: 'Подборка из 30 книг 7–15 лет — для удовольствия, размышлений и расширения кругозора.',
  },
  {
    title: 'Карточки английских слов на каждое утро',
    desc: 'Авторские карточки с произношением — ребёнок учит по 5 слов за завтраком.',
  },
  {
    title: 'Тест на профориентацию для подростков',
    desc: 'Простой тест 12–15 лет: помогает понять сильные стороны и интересы ребёнка.',
  },
];

type Props = { onCTA: () => void };

function GiftCard({ gift }: { gift: Gift }) {
  return (
    <div
      className="group rounded-[20px] bg-[#FFE8D8] p-5 md:p-6 flex flex-col gap-2.5 ring-1 ring-[#FBD3B6] transition-transform duration-500 hover:-translate-y-1"
      style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
    >
      <h3 className="text-navy font-bold text-[17px] md:text-[18px] leading-snug tracking-[-0.012em]">
        {gift.title}
      </h3>
      <p className="text-[14px] md:text-[15px] leading-relaxed text-ink/75">
        {gift.desc}
      </p>
    </div>
  );
}

export default function GiftsBento({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-6 md:p-10 lg:p-14">
              <div className="max-w-3xl mb-8 md:mb-12">
                <h2 className="h2 mb-3">Что вы получите:</h2>
                <p className="lead">База постоянно пополняется новыми материалами, которые будут актуальны летом и&nbsp;весь учебный год</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {GIFTS.map((g, i) => (
                  <Reveal key={g.title} delay={0.06 * i}>
                    <GiftCard gift={g} />
                  </Reveal>
                ))}
              </div>

              {/* 3 скрытых */}
              <div className="relative mt-4 md:mt-5">
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 select-none pointer-events-none"
                  style={{ filter: 'blur(7px)' }}
                  aria-hidden
                >
                  {HIDDEN_GIFTS.map((g) => (
                    <GiftCard key={g.title} gift={g} />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="rounded-full bg-white/90 backdrop-blur px-5 py-2.5 text-sm font-bold text-navy shadow-[0_18px_36px_-18px_rgba(31,42,68,0.30)] ring-1 ring-black/5">
                    Откроются после регистрации
                  </div>
                </div>
              </div>

              <Reveal delay={0.1}>
                <div className="mt-10 md:mt-12 flex justify-center">
                  <button type="button" onClick={onCTA} className="btn-primary-wide">
                    Забрать бесплатно
                  </button>
                </div>
              </Reveal>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
