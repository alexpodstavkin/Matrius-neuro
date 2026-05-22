'use client'

import Reveal from './Reveal'

const STEPS = [
  'Проводим бесплатную диагностику',
  'Занимаемся 30–40 минут в зависимости от ученика',
  'Урок проходит в игровой форме',
  'Озвучиваем результат диагностики ребёнка',
]

export default function Diagnostic() {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <div className="dark-inner rounded-[26px] bg-navy text-white relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(244,144,96,0.10), transparent 45%)',
                }}
                aria-hidden
              />

              <div className="relative grid grid-cols-1 md:grid-cols-12 items-stretch">
                {/* LEFT — заголовок, цитата, 4 ячейки */}
                <div className="col-span-1 md:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col">
                  <h2
                    className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-5"
                    style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)' }}
                  >
                    Диагностика чтения для&nbsp;вашего ребёнка —{' '}
                    <span className="text-orange">в&nbsp;подарок</span>
                  </h2>
                  <p
                    className="italic text-white/85 border-l-2 border-orange pl-4 mb-8"
                    style={{ fontSize: 'clamp(1rem, 1.3vw, 1.25rem)' }}
                  >
                    «60 минут занимаемся вами, а&nbsp;не продажей»
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
                    {STEPS.map((s, i) => (
                      <div
                        key={s}
                        className="rounded-[18px] bg-white px-4 py-4 md:px-5 md:py-5 flex items-center gap-3.5"
                      >
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange text-white font-bold text-lg">
                          {i + 1}
                        </span>
                        <span
                          className="text-navy font-semibold leading-snug tracking-[-0.012em]"
                          style={{ fontSize: 'clamp(0.875rem, 0.95vw, 1rem)' }}
                        >
                          {s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — фото с отступами и плавным переходом к navy */}
                <div className="hidden md:flex md:col-span-5 items-stretch p-4 md:p-6 lg:p-7">
                  <div className="relative w-full overflow-hidden rounded-[20px]">
                    <img
                      src="/diagnostic-photo.jpg"
                      alt="Ребёнок занимается на бесплатной диагностике чтения Matrius"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    {/* плавный переход слева к navy */}
                    <div
                      className="absolute inset-y-0 left-0 w-24 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to right, rgba(56,86,129,0.85) 0%, rgba(56,86,129,0.35) 55%, rgba(56,86,129,0) 100%)',
                      }}
                      aria-hidden
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
