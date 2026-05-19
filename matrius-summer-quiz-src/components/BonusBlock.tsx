'use client';

type Props = { onCTA: () => void };

const DIRECTIONS = ['Математика', 'Русский язык', 'Английский язык', 'Скорочтение'];

export default function BonusBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <article className="relative overflow-hidden rounded-xl bg-navy text-white p-6 md:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-navy-light/30 blur-3xl"
            aria-hidden
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-md bg-orange px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide mb-5">
                Бонус
              </div>
              <h2 className="font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.625rem, 3vw, 2.5rem)', letterSpacing: '-0.005em' }}>
                Бесплатный урок по&nbsp;любому направлению онлайн-школы Matrius
              </h2>
              <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                Всем, кто получит доступ к&nbsp;базе знаний — бесплатный диагностический урок 60 минут онлайн. Ребёнок раскроет свои сильные стороны, а&nbsp;вы получите пошаговый план развития от&nbsp;преподавателя.
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {DIRECTIONS.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center rounded-md bg-white/10 backdrop-blur px-3 py-1.5 text-sm font-semibold"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7 max-w-xl">
                {[
                  'Индивидуально, онлайн',
                  '60 минут с преподавателем',
                  'Диагностика уровня ребёнка',
                  'Пошаговый план развития',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-white/90">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-white text-xs font-bold">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-white/10 backdrop-blur border border-white/15 p-4 md:p-5 max-w-xl mb-7">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange text-xl">
                    🎁
                  </span>
                  <div>
                    <div className="font-bold text-white text-[15px] md:text-[16px] mb-1">
                      Плюс читательский дневник в&nbsp;подарок
                    </div>
                    <p className="text-[13px] md:text-[14px] text-white/75 leading-relaxed">
                      Всем, кто посетит урок — подарим читательский дневник, в&nbsp;который ребёнок будет фиксировать эмоции и&nbsp;выводы о&nbsp;книгах.
                    </p>
                  </div>
                </div>
              </div>

              <button type="button" onClick={onCTA} className="btn-primary">
                Забрать бесплатно
              </button>
            </div>

            <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-white/10 blur-2xl" aria-hidden />
                <div className="relative rounded-2xl bg-white/10 backdrop-blur p-7 border border-white/15 w-72 text-center">
                  <div className="text-6xl mb-3">🎓</div>
                  <div className="font-bold text-2xl mb-2">+0,7 балла</div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    Средний прирост оценки после диагностического урока с&nbsp;преподавателем Matrius
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
