'use client';

const BEFORE = [
  'Забыл важные правила к 1 сентября — необходимо заново учить',
  'Не прочитал ни одной книги — список из школы остался нетронутым',
  'Скорость чтения упала на 20–30%, читает медленнее одноклассников',
  'Тяжело сесть за домашку — привычка учиться пропала за 3 месяца',
  'В сентябре оценки ниже на 1–1,5 балла — наверстать получится только к ноябрю',
];

const AFTER = [
  'Начал учебный год с прибавкой +0,7 балла в среднем по всем предметам',
  'Разобрался в математических правилах — решает задачи быстрее одноклассников',
  'Улучшил знание английского — словарный запас вырос на 200+ слов за лето',
  'Подтянул русский язык: пишет диктанты без ошибок с первой недели сентября',
  'Прочитал 20 книг самостоятельно — без давления и принуждения',
  'Увеличил скорость чтения с 70 до 200 слов в минуту',
  'Прокачал концентрацию — удерживает внимание на уроке весь академический час',
  'Привык заниматься 15 минут в день — учебный год начался без стресса',
];

type Props = { onCTA: () => void };

export default function BeforeAfter({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <article className="card p-6 md:p-10 lg:p-12">
          <div className="max-w-3xl mb-8 md:mb-10">
            <h2 className="h2">
              Лето с&nbsp;базой знаний и&nbsp;без неё — разный старт нового учебного года для&nbsp;ребёнка
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* БЫЛО */}
            <div className="rounded-xl bg-[#F7F7F7] border border-[#EBEBEB] p-6 md:p-7">
              <div className="inline-flex items-center gap-2 rounded-md bg-[#EAEAEA] px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-muted mb-6">
                Без материалов базы
              </div>
              <ul className="space-y-3">
                {BEFORE.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E3E3E3] text-muted text-[12px] font-bold">
                      −
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* СТАЛО */}
            <div className="rounded-xl bg-orange/10 border border-orange/30 p-6 md:p-7">
              <div className="inline-flex items-center gap-2 rounded-md bg-orange/20 px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-orange mb-6">
                С базой Matrius
              </div>
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
            </div>
          </div>

          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button type="button" onClick={onCTA} className="btn-primary-wide">
              Забрать бесплатно
            </button>
            <span className="text-sm text-muted">
              Материалы придут на&nbsp;почту сразу после регистрации
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
