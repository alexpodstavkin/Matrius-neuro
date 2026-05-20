'use client';

import Reveal from './Reveal';

const BEFORE = [
  'Забыл важные правила к 1 сентября — необходимо заново учить',
  'Не прочитал ни одной книги — список из школы остался нетронутым',
  'Скорость чтения упала на 20–30%, читает медленнее одноклассников',
  'Тяжело сесть за домашку — привычка учиться пропала за 3 месяца',
  'В сентябре оценки ниже на 1–1,5 балла — наверстать получится только к ноябрю',
];

const AFTER = [
  'Начал учебный год с прибавкой +0,7 балла в среднем по всем предметам',
  'Прочитал 20 книг самостоятельно — без давления и принуждения',
  'Прокачал концентрацию — удерживает внимание на уроке весь академический час',
  'Привык заниматься 15 минут в день — учебный год начался без стресса',
  'Восстановил почерк — учителя отмечают аккуратность тетради',
  'Уверенно отвечает у доски — больше не теряется перед классом',
  'Запомнил таблицу умножения и формулы — счёт в уме стал быстрее',
  'Освоил приёмы запоминания — учит стихи за 20 минут вместо часа',
  'Сократил время на домашку в 2 раза — освободилось время на хобби',
  'Вернул интерес к учёбе — сам предлагает «давай позанимаемся ещё»',
];

type Props = { onCTA: () => void };

export default function BeforeAfter({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-6 md:p-10 lg:p-14">
              <div className="max-w-3xl mb-10 md:mb-12">
                <h2 className="h2">
                  <span className="text-orange">Лето с&nbsp;базой знаний и&nbsp;без неё</span> — разный старт нового учебного года для&nbsp;ребёнка
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                {/* БЫЛО */}
                <div className="rounded-[22px] bg-[#F4F5F8] p-6 md:p-8 ring-1 ring-black/[0.05]">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted mb-6 ring-1 ring-black/[0.05]">
                    Без материалов базы
                  </div>
                  <ul className="space-y-3.5">
                    {BEFORE.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                        <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E0E2E8] text-muted text-[12px] font-bold">
                          −
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* СТАЛО */}
                <div className="rounded-[22px] bg-orange/10 p-6 md:p-8 ring-1 ring-orange/35">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange mb-6">
                    С базой знаний
                  </div>
                  <ul className="space-y-3.5">
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

              <div className="mt-10 md:mt-12 flex justify-center">
                <button type="button" onClick={onCTA} className="btn-primary-wide">
                  Забрать бесплатно
                </button>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
