'use client';

export default function FreeLesson() {
  function startQuiz() {
    window.dispatchEvent(new Event('matrius:start-quiz'));
  }

  return (
    <section className="bg-white">
      <div className="container-x section">
        <div className="relative overflow-hidden rounded-xl bg-navy text-white p-6 md:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange/25 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-navy-light/40 blur-3xl"
            aria-hidden
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 rounded-lg bg-white/15 backdrop-blur px-3 py-1.5 text-sm font-semibold mb-5">
                🎓 Главный подарок
              </span>
              <h2
                className="font-bold mb-4"
                style={{
                  fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: '#FFFFFF',
                }}
              >
                Бесплатный урок по выбранному направлению
              </h2>
              <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                На уроке ребёнок пройдёт диагностику, сможет раскрыть свои таланты и полюбить учиться, а вы получите пошаговый план по дальнейшему развитию от преподавателя.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 max-w-xl">
                {[
                  'Индивидуально, онлайн',
                  '60 минут с преподавателем',
                  'Диагностика уровня ребёнка',
                  'План развития по итогам',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-white/90">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-orange text-white text-xs font-bold">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={startQuiz} className="btn-primary">
                Записаться на урок
              </button>
            </div>
            <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-white/10 blur-2xl" aria-hidden />
                <div className="relative rounded-xl bg-white/10 backdrop-blur p-6 border border-white/15 w-64 text-center">
                  <div className="text-5xl mb-2">🎯</div>
                  <div className="font-bold text-lg mb-1">+0,7 балла</div>
                  <div className="text-sm text-white/80">средний прирост оценки после диагностического урока</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
