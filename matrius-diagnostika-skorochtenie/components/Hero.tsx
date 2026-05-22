'use client'

import Reveal from './Reveal'

const GIFTS: string[] = [
  '5 нейроигр для развития мышления',
  'Простой метод увеличения скорости чтения за 5 дней',
  'Гайд полезных привычек и как их ввести',
]

function GiftRow({ title }: { title: string }) {
  return (
    <div
      className="group rounded-[16px] bg-[#FFE8D8] px-5 py-4 md:py-5 ring-1 ring-[#FBD3B6] transition-transform duration-500 hover:-translate-y-1 flex items-center gap-3.5"
      style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
    >
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-white text-[14px] font-bold">
        ✓
      </span>
      <span className="text-navy font-semibold leading-snug tracking-[-0.012em]" style={{ fontSize: 'clamp(0.9375rem, 1vw, 1.0625rem)' }}>
        {title}
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative w-full">
      <div className="container-x py-10 md:py-14 lg:py-20">
        <Reveal delay={0.05}>
          <div className="shell">
            <div className="dark-inner rounded-[26px] bg-navy text-white relative overflow-hidden">
              {/* Декоративные слои — только на md+ */}
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                  backgroundImage: 'url(/matrius-pattern.png)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  opacity: 0.06,
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 hidden md:block"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(244,144,96,0.10), transparent 45%)',
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange/15 blur-3xl hidden md:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-navy-light/20 blur-3xl hidden md:block"
                aria-hidden
              />

              <div className="relative grid grid-cols-1 md:grid-cols-12 items-stretch">
                {/* LEFT — текст, подарки, CTA */}
                <div className="col-span-1 md:col-span-7 p-6 md:p-10 lg:p-12 flex flex-col">
                  {/* Лого + подпись */}
                  <div className="flex items-center gap-3 mb-6 md:mb-7">
                    <img
                      src="/matrius-logo.png"
                      alt="Matrius"
                      className="h-12 w-12 md:h-14 md:w-14 shrink-0 rounded-full bg-white"
                    />
                    <div className="leading-snug text-white/75 text-sm font-medium">
                      Онлайн-школа развития детей<br />
                      5–17&nbsp;лет
                    </div>
                  </div>

                  <h1
                    className="font-bold text-white leading-[1.05] tracking-[-0.02em] mb-6"
                    style={{ fontSize: 'clamp(2.25rem, 4.6vw, 4rem)' }}
                  >
                    <span className="text-orange">
                      Как провести лето с&nbsp;пользой и&nbsp;при этом отдохнуть?
                    </span>{' '}
                    Легко!
                    <br />
                    Покажем, как увлечь ребёнка книгой, а&nbsp;не телефоном
                  </h1>
                  <p
                    className="text-white/85 leading-relaxed mb-8"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.375rem)' }}
                  >
                    Всем родителям учеников 7–14&nbsp;лет Matrius выдаёт доступ к&nbsp;закрытой
                    базе знаний по&nbsp;скорочтению.
                  </p>

                  {/* Подарки 2x2 grid (3 видимых + 1 заблюренная) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
                    {GIFTS.map((g) => (
                      <GiftRow key={g} title={g} />
                    ))}
                    <div className="relative">
                      <div
                        className="rounded-[16px] bg-[#FFE8D8] ring-1 ring-[#FBD3B6] px-5 py-4 md:py-5 select-none pointer-events-none flex items-center gap-3 h-full"
                        style={{ filter: 'blur(7px)' }}
                        aria-hidden
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-white text-[14px] font-bold">
                          ✓
                        </span>
                        <span className="text-navy font-semibold text-[15px] leading-snug">
                          Карточки английских слов и план чтения
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-3">
                        <div className="rounded-full bg-white/95 backdrop-blur px-3.5 py-1.5 text-[12px] font-bold text-navy text-center shadow-[0_18px_36px_-18px_rgba(31,42,68,0.30)] ring-1 ring-black/5 max-w-[95%] leading-tight">
                          + 14 материалов после регистрации
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA — растянут на всю ширину блока подарков */}
                  <div className="mt-auto">
                    <a
                      href="#form"
                      className="btn-primary w-full"
                      onClick={(e) => {
                        e.preventDefault()
                        const target = document.getElementById('form')
                        if (target) {
                          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          history.replaceState(null, '', '#form')
                        }
                      }}
                    >
                      Получить доступ
                    </a>
                  </div>
                </div>

                {/* RIGHT — фото без фона, вписанное в navy ячейку */}
                <div className="hidden md:block md:col-span-5 relative">
                  <img
                    src="/hero-online-lesson.png"
                    alt="Ребёнок за чтением"
                    className="absolute inset-0 h-full w-full object-contain object-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
