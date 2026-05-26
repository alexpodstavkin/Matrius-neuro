'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

export default function ArtemCase({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="dark-inner relative rounded-[26px] bg-navy text-white p-8 md:p-12 lg:p-16">
              {/* Декор в отдельном wrapper с overflow-hidden,
                  чтобы position:sticky внутри grid работал */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]" aria-hidden>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'url(matrius-pattern.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    opacity: 0.04,
                  }}
                />
                <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-orange/20 blur-3xl" />
                <div className="absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-navy-light/30 blur-3xl" />
              </div>

              <div className="relative max-w-3xl mb-10 md:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange mb-4 ring-1 ring-orange/30">
                  Реальный кейс
                </div>
                <h2
                  className="font-bold text-white leading-[1.05] tracking-[-0.018em]"
                  style={{ fontSize: 'clamp(1.625rem, 3vw, 2.5rem)' }}
                >
                  Артём, 8&nbsp;лет, 2&nbsp;класс&nbsp;— как прошла его <span className="text-orange">бесплатная диагностика</span>
                </h2>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
                {/* Фото — слева, прилипает к верху viewport на скролле (md+) */}
                <Reveal
                  className="md:col-span-5 lg:col-span-4 md:sticky md:top-8 md:self-start"
                  delay={0.08}
                >
                  <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-navy-light ring-1 ring-white/10">
                    <img
                      src="cases/artem.jpg"
                      alt="Артём, 2 класс, ученик Matrius"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                </Reveal>

                {/* История — справа */}
                <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 md:gap-7">
                  <Reveal delay={0.1}>
                    <div className="rounded-[18px] bg-white p-5 md:p-6 ring-1 ring-black/[0.05] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-muted text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Проблема
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-ink/85">
                        В&nbsp;конце слов постоянно путал звонкие и&nbsp;глухие согласные: писал «гриб» как «грип», «сапог» как «сапок», «дуб» как «дуп». Правило про парные согласные учил наизусть, но&nbsp;на&nbsp;диктантах толку никакого. Мама думала, что мальчик ленится&nbsp;— и&nbsp;злилась.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="rounded-[18px] bg-white p-5 md:p-6 ring-1 ring-black/[0.05] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-muted text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Что было на диагностике
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-ink/85">
                        Педагог дала Артёму короткий диктант на&nbsp;5&nbsp;строк. Уже после третьей стало видно: мальчик не&nbsp;понимает саму идею проверки&nbsp;— зачем «изменять слово, чтобы после согласной стояла гласная». Объяснили на&nbsp;трёх примерах («гриб&nbsp;— грибы», «сапог&nbsp;— сапоги»), показали простой алгоритм. В&nbsp;конце урока Артём сам поймал свою ошибку в&nbsp;слове «зуб» и&nbsp;поправил&nbsp;— впервые в&nbsp;жизни.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="rounded-[18px] bg-[#FFE8D8] p-5 md:p-6 ring-1 ring-[#FBD3B6] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-orange text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Первый результат
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-navy/90 font-medium">
                        На&nbsp;следующий день мама сама провела с&nbsp;ним мини-диктант из&nbsp;8&nbsp;слов на&nbsp;парные согласные. Раньше ошибался в&nbsp;5&nbsp;из&nbsp;8&nbsp;— теперь только в&nbsp;1. И&nbsp;главное&nbsp;— Артём впервые сказал: «А&nbsp;я&nbsp;понял, как проверять».
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.28}>
                    <div className="rounded-[18px] border border-dashed border-navy/25 bg-white p-5 md:p-6 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-navy text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Главное
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-ink/85">
                        Одна диагностика не&nbsp;закрывает проблему целиком&nbsp;— она показывает, в&nbsp;чём корень и&nbsp;как двигаться дальше. Артёму понадобилось ещё 6&nbsp;недель регулярных занятий, чтобы навык закрепился и&nbsp;ошибки ушли из&nbsp;контрольных. Мама записала его на&nbsp;летний интенсив по&nbsp;нашим рекомендациям.
                      </p>
                    </div>
                  </Reveal>
                </div>
              </div>

              <div className="relative mt-10 md:mt-14 flex justify-center">
                <button type="button" onClick={onCTA} className="btn-primary-wide">
                  Записаться на бесплатную диагностику
                </button>
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
