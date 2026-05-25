'use client';

import Reveal from './Reveal';
import LeadForm from './LeadForm';

export default function CTAFinal() {
  return (
    <section className="relative w-full">
      <div className="container-x section">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
          {/* Левый navy slot — повтор Hero */}
          <Reveal className="col-span-1 md:col-span-7 lg:col-span-7" delay={0.05}>
            <div className="shell h-full">
              <div className="dark-inner h-full rounded-[26px] bg-navy text-white p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Pattern background */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    backgroundImage: 'url(matrius-pattern.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    opacity: 0.04,
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange/20 blur-3xl"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-navy-light/30 blur-3xl"
                  aria-hidden
                />

                <div className="relative flex items-center gap-3 mb-6 md:mb-8">
                  <img
                    src="matrius-logo.png"
                    alt="Matrius"
                    className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full"
                  />
                  <div className="leading-snug text-white/70 text-sm font-medium">
                    Онлайн-школа развития детей<br />5–17&nbsp;лет
                  </div>
                </div>

                <h2
                  className="relative font-bold text-white leading-[1.06] tracking-[-0.02em] mb-6 md:mb-7"
                  style={{ fontSize: 'clamp(1.875rem, 3.4vw, 2.875rem)' }}
                >
                  <span className="text-orange">Ребёнок учит правила по&nbsp;русскому языку, но&nbsp;всё равно пишет с&nbsp;ошибками?</span> Найдём причину низких оценок
                </h2>
                <p className="relative text-white/85 text-base md:text-lg leading-relaxed max-w-2xl">
                  За&nbsp;60&nbsp;минут педагог Matrius найдёт, где именно «теряется» ребёнок, и&nbsp;расскажет вам, как решить проблему до&nbsp;нового учебного года.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Правая колонка — форма регистрации */}
          <Reveal className="col-span-1 md:col-span-5 lg:col-span-5" delay={0.15}>
            <div className="shell h-full">
              <div className="card-flush h-full p-6 md:p-8 lg:p-10 flex flex-col">
                <h3 className="text-navy font-bold text-[18px] md:text-[20px] tracking-[-0.012em] mb-1.5">
                  Запишитесь на&nbsp;бесплатную диагностику
                </h3>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-muted mb-5 md:mb-6">
                  Оставьте контакты&nbsp;— подберём удобное время
                </p>
                <LeadForm variant="light" submitLabel="Записаться на диагностику" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
