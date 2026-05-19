'use client';

const BEFORE = [
  'Забыл важные правила к 1 сентября — пришлось заново учить',
  'Не прочитал ни одной книги — список из школы остался нетронутым',
  'Скорость чтения упала на 20–30%, читает медленнее одноклассников',
  'Тяжело сесть за домашку — привычка учиться пропала за 3 месяца',
  'В сентябре оценки ниже на 1–1,5 балла — наверстать получится только к ноябрю',
];

const AFTER = [
  'Начал учебный год с прибавкой +0,7 балла в среднем по всем предметам',
  'Прочитал 20 книг самостоятельно — без давления и принуждения',
  'Увеличил скорость чтения с 70 до 200 слов в минуту',
  'Закрепил все правила — пишет диктанты без ошибок с первой недели',
  'Привык заниматься 15 минут в день — учебный год начался без стресса',
];

type Props = { onCTA: () => void };

export default function BeforeAfter({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <div className="max-w-3xl mb-8 md:mb-12">
          <h2 className="h2 mb-3">Лето с базой и&nbsp;без неё — это разные осени</h2>
          <p className="lead">
            Что происходит, когда ребёнок проводит лето с&nbsp;материалами Matrius, и&nbsp;что происходит, когда нет.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* БЫЛО */}
          <article className="card p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#F2F2F2] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-muted mb-5">
              Без материалов базы
            </div>
            <h3 className="text-navy font-bold text-[20px] md:text-[24px] leading-tight mb-5">
              Сентябрь как удар по&nbsp;голове
            </h3>
            <ul className="space-y-3">
              {BEFORE.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F2F2F2] text-muted text-[12px] font-bold">
                    −
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* СТАЛО */}
          <article className="card p-6 md:p-8 ring-2 ring-orange/30">
            <div className="inline-flex items-center gap-2 rounded-md bg-orange/15 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-orange mb-5">
              С базой Matrius
            </div>
            <h3 className="text-navy font-bold text-[20px] md:text-[24px] leading-tight mb-5">
              Сентябрь как уверенный старт
            </h3>
            <ul className="space-y-3">
              {AFTER.map((a) => (
                <li key={a} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                  <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-white text-[12px] font-bold">
                    ✓
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button type="button" onClick={onCTA} className="btn-primary-wide">
            Забрать бесплатно
          </button>
          <span className="text-sm text-muted">
            Материалы придут на&nbsp;почту сразу после регистрации
          </span>
        </div>
      </div>
    </section>
  );
}
