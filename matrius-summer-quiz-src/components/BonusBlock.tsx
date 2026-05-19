'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

const BONUS_PHOTO =
  'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=70';

export default function BonusBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="relative overflow-hidden rounded-[26px] bg-navy text-white dark-inner">
              {/* Pattern background — almost invisible */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: 'url(matrius-pattern.png)',
                  backgroundSize: '720px auto',
                  backgroundRepeat: 'repeat',
                  opacity: 0.07,
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-orange/25 blur-3xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-40 -bottom-40 h-96 w-96 rounded-full bg-navy-light/30 blur-3xl"
                aria-hidden
              />

              <div className="relative grid grid-cols-1 md:grid-cols-2 items-stretch">
                {/* Текст */}
                <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center">
                  <div className="inline-flex self-start items-center gap-2 rounded-full bg-orange px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] mb-6">
                    Бонус
                  </div>
                  <h2
                    className="font-bold text-white leading-[1.05] tracking-[-0.018em] mb-5"
                    style={{ fontSize: 'clamp(1.625rem, 3vw, 2.5rem)' }}
                  >
                    <span className="text-orange">Бесплатный урок</span> по&nbsp;любому направлению онлайн-школы Matrius
                  </h2>
                  <p className="text-white/85 text-base md:text-lg leading-relaxed mb-6">
                    Всем, кто получит доступ к&nbsp;базе знаний — дарим бесплатный диагностический урок 60&nbsp;минут онлайн. Ребёнок раскроет свои сильные стороны, а&nbsp;вы получите пошаговый план развития от&nbsp;преподавателя.
                  </p>

                  <div className="rounded-[18px] bg-white/[0.08] backdrop-blur border border-white/15 p-4 md:p-5 mb-7">
                    <div className="font-bold text-white text-[15px] md:text-[16px] mb-1">
                      Читательский дневник в&nbsp;подарок
                    </div>
                    <p className="text-[13px] md:text-[14px] text-white/75 leading-relaxed">
                      Всем, кто посетит урок — подарим читательский дневник, в&nbsp;который ребёнок будет фиксировать эмоции и&nbsp;выводы о&nbsp;книгах.
                    </p>
                  </div>

                  <div className="flex justify-center md:justify-start">
                    <button type="button" onClick={onCTA} className="btn-primary-wide">
                      Забрать бесплатно
                    </button>
                  </div>
                </div>

                {/* Фото */}
                <div className="relative min-h-[280px] md:min-h-0">
                  <img
                    src={BONUS_PHOTO}
                    alt="Бесплатный урок с преподавателем Matrius"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-navy/30 md:to-navy/20" />
                </div>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
