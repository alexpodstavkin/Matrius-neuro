'use client';

type Cell = {
  photo: string;
  title?: string;
  desc: string;
  kicker?: string;
  centerText?: boolean;
};

// Висячие предлоги/союзы/частицы — короткие слова, после которых нужен nbsp
const SHORT_WORDS = new Set([
  'в','во','с','со','к','ко','о','об','обо','у','и','а','но','или','на','по','за','из',
  'до','от','без','над','под','при','для','не','же','бы','ли','то','что','как','ещё','уж',
  'уже','ведь','лишь','пока','чтобы','тоже','также','либо','будто','если','хотя','чем',
  'между','перед','через','около','против','среди','около','рядом','около',
]);

function nbsp(text: string): string {
  return text.replace(/(^|\s)([\wа-яёА-ЯЁ-]+)(\s+)(?=\S)/g, (m, pre, word, sp) => {
    const isShort = SHORT_WORDS.has(word.toLowerCase());
    return pre + word + (isShort ? ' ' : sp);
  });
}

const SCHOOL_CELLS: Cell[] = [
  {
    photo: '/matrius-pattern.png',
    kicker: 'Авторский материал Matrius',
    title: 'Русский язык',
    desc: 'Ребёнок улучшит почерк и снизит количество глупых ошибок за 3 недели через 5 простых упражнений. Поймёт, как видеть свои ошибки и закреплять правила без зубрёжки.',
  },
  {
    photo: '/matrius-pattern.png',
    kicker: 'Полезный гайд',
    title: 'Математика',
    desc: 'Ребёнок прокачает математическое мышление дома через 5 нейроигр — без зубрёжки и нервов. Научится решать задачи через понимание, а не через перебор формул.',
  },
  {
    photo: '/matrius-pattern.png',
    kicker: 'Авторский материал Matrius',
    title: 'Английский язык',
    desc: 'Ребёнок научится поддерживать фокус и мотивацию, чтобы заниматься языком регулярно и с интересом. Узнает, как легко учить новые слова.',
  },
];

const SPEEDREAD_CELLS: Cell[] = [
  {
    photo: '/matrius-pattern.png',
    kicker: 'Полезный гайд',
    desc: 'Ребёнок увеличит скорость чтения в 2 раза за 5 дней, научится удерживать внимание, лучше понимать смысл текста, увереннее отвечать у доски и полюбит книги. Простые инструкции, которые можно встроить в распорядок дня.',
  },
];

const PARENT_CELLS: Cell[] = [
  {
    photo: '/matrius-pattern.png',
    kicker: 'Бонус',
    title: 'Бесплатный урок по любому направлению',
    desc: 'На уроке ребёнок пройдёт диагностику, раскроет свои сильные стороны, а вы получите пошаговый план развития от преподавателя. Урок индивидуальный, 60 минут, онлайн.',
  },
  {
    photo: '/matrius-pattern.png',
    kicker: 'Авторский материал Matrius',
    title: '7 упражнений для скорости чтения',
    desc: 'Ребёнок увеличит скорость чтения в 2 раза за 30 дней через простые ежедневные упражнения. Все занятия — по 10–15 минут в день, без отрыва от отдыха и прогулок с друзьями.',
  },
  {
    photo: '/matrius-pattern.png',
    kicker: 'Авторский материал Matrius',
    title: '5 упражнений на концентрацию',
    desc: 'Ребёнок научится удерживать внимание и фокус — для лета без телефона и постоянных отвлечений. Подойдёт даже для самых активных и непоседливых детей.',
  },
  {
    photo: '/matrius-pattern.png',
    kicker: 'Бонус',
    title: 'Читательский дневник',
    desc: 'Ребёнок будет фиксировать эмоции и выводы о книгах 90 дней — а вы увидите, как растёт его любовь к чтению.',
  },
];

function HCell({ cell, photoSide }: { cell: Cell; photoSide: 'left' | 'right' }) {
  const photoMaskClass =
    photoSide === 'left' ? 'hcell-photo-left' : 'hcell-photo-right';

  const photo = (
    <div
      className={`relative w-full h-[220px] md:h-[280px] rounded-xl overflow-hidden ${photoMaskClass}`}
    >
      <img
        src={cell.photo}
        alt={cell.title ?? ''}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );

  const text = (
    <div
      className={`flex flex-col gap-3 md:gap-4 px-2 md:px-5 self-center py-6 md:py-8 ${
        cell.centerText ? 'items-center text-center' : ''
      }`}
    >
      {cell.kicker && (
        <span className="inline-flex items-center rounded-md bg-white text-orange text-[12px] md:text-[13px] font-bold uppercase tracking-wide px-3 py-1.5 self-start">
          {nbsp(cell.kicker)}
        </span>
      )}
      {cell.title && (
        <h4 className="text-white font-bold leading-tight text-[22px] md:text-[28px]">
          {nbsp(cell.title)}
        </h4>
      )}
      <p className="text-white/90 leading-relaxed text-[15px] md:text-[17px]">
        {nbsp(cell.desc)}
      </p>
    </div>
  );

  return (
    <div className="rounded-2xl bg-orange p-3 md:p-5 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 overflow-hidden">
      {photoSide === 'left' ? (
        <>
          {photo}
          {text}
        </>
      ) : (
        <>
          <div className="md:order-2">{photo}</div>
          <div className="md:order-1">{text}</div>
        </>
      )}
    </div>
  );
}

function BigBento({
  title,
  cells,
}: {
  title: string;
  cells: Cell[];
}) {
  return (
    <article className="rounded-3xl bg-[#1A2540] p-5 md:p-8 lg:p-10">
      <h3
        className="text-white font-bold mb-6 md:mb-8 leading-tight text-[28px] md:text-[40px]"
        style={{ letterSpacing: '-0.015em' }}
      >
        {nbsp(title)}
      </h3>
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {cells.map((c, i) => (
          <HCell
            key={(c.title ?? '') + i}
            cell={c}
            photoSide={i % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>
    </article>
  );
}

export default function ProgramsBento() {
  return (
    <section className="relative">
      <div className="w-full px-4 md:px-[216px] lg:px-[288px] py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-5 md:gap-6">
          <BigBento title="Школьная программа" cells={SCHOOL_CELLS} />
          <BigBento title="Скорочтение" cells={SPEEDREAD_CELLS} />
          <BigBento title="Бонус для родителей" cells={PARENT_CELLS} />
        </div>
      </div>
    </section>
  );
}
