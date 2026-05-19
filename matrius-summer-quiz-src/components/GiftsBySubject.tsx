type Gift = {
  emoji: string;
  subject: string;
  teach: string;
  giftKicker: string;
  giftTitle: string;
};

const GIFTS: Gift[] = [
  {
    emoji: '📚',
    subject: 'Русский язык',
    teach: 'Научим писать без глупых ошибок, понимать правила и тратить на домашку в 2 раза меньше времени.',
    giftKicker: 'Авторский материал Matrius',
    giftTitle:
      '«5 упражнений, чтобы улучшить почерк и снизить количество глупых ошибок за 3 недели»',
  },
  {
    emoji: '🔢',
    subject: 'Математика',
    teach:
      'Научим решать задачи через понимание, а не зубрёжку, и подтянем оценки уже в первом полугодии.',
    giftKicker: 'Полезный гайд',
    giftTitle:
      '«5 нейроигр для развития математического мышления дома»',
  },
  {
    emoji: '🇬🇧',
    subject: 'Английский язык',
    teach:
      'Научим расширять словарный запас, не бояться говорить и удерживать интерес к языку всё лето.',
    giftKicker: 'Авторский материал Matrius',
    giftTitle: '«Как поддерживать фокус и мотивацию»',
  },
  {
    emoji: '⚡',
    subject: 'Скорочтение',
    teach:
      'Научим читать быстрее в 2 раза без потери понимания, увереннее отвечать у доски и полюбить книги.',
    giftKicker: 'Полезный чек-лист',
    giftTitle:
      '«Простой метод увеличения скорости чтения всего за 5 дней»',
  },
  {
    emoji: '🗣️',
    subject: 'Логопедия',
    teach:
      'Научим выговаривать сложные звуки, уберём заикание и поможем говорить чётко и уверенно.',
    giftKicker: 'Полезный гайд',
    giftTitle:
      '«5 упражнений, чтобы улучшить почерк и снизить количество ошибок за 3 недели»',
  },
];

export default function GiftsBySubject() {
  return (
    <section id="gifts" className="bg-white">
      <div className="container-x section">
        <div className="max-w-3xl mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 rounded-lg bg-navy/5 px-3 py-1.5 text-navy text-sm font-semibold mb-4">
            Подарки к каникулам
          </span>
          <h2 className="h2 mb-3">
            5 направлений Matrius — и подарок к каждому
          </h2>
          <p className="lead">
            Заберите материалы по направлению, которое выбрали в опросе, а остальные используйте для общего развития ребёнка летом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {GIFTS.map((g, i) => (
            <article
              key={g.subject}
              className={`card p-5 md:p-6 flex flex-col gap-4 ${
                i === GIFTS.length - 1 ? 'lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-surface-soft text-2xl">
                  {g.emoji}
                </span>
                <h3 className="h3">{g.subject}</h3>
              </div>
              <p className="text-[15px] leading-relaxed text-ink">
                <span className="font-semibold text-navy">Научим: </span>
                {g.teach}
              </p>
              <details className="group rounded-lg bg-surface-soft p-4 mt-auto transition-all duration-200 ease-in-out hover:bg-surface-tint">
                <summary className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-navy text-[15px]">
                    🎁 Открыть подарок
                  </span>
                  <span className="text-navy transition-transform duration-200 group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <div className="mt-3 text-sm">
                  <div className="text-caption text-xs uppercase tracking-wide font-semibold mb-1">
                    {g.giftKicker}
                  </div>
                  <div className="text-ink leading-relaxed">{g.giftTitle}</div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
