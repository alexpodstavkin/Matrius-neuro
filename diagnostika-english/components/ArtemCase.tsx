'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

export default function ArtemCase({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="dark-inner relative rounded-[26px] bg-navy text-white p-5 md:p-12 lg:p-16">
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

              <div className="relative max-w-3xl mb-6 md:mb-14">
                <div className="inline-flex items-center gap-2 rounded-full bg-orange/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-orange mb-4 ring-1 ring-orange/30">
                  Реальный кейс
                </div>
                <h2
                  className="font-bold text-white leading-[1.05] tracking-[-0.018em]"
                  style={{ fontSize: 'clamp(1.625rem, 3vw, 2.5rem)' }}
                >
                  Маша, 9&nbsp;лет, 3&nbsp;класс&nbsp;— как прошла её&nbsp;<span className="text-orange">бесплатная диагностика</span>
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
                      src="cases/masha.jpg"
                      alt="Маша, 3 класс, ученица Matrius"
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
                        Маша честно ходила на&nbsp;все уроки английского в&nbsp;школе, учила правила, делала домашку. Но&nbsp;как только надо было сказать вслух больше одного слова подряд&nbsp;— наступал ступор. Слово «yes»&nbsp;— пожалуйста. А&nbsp;«My name is Masha and I have a hamster»&nbsp;— уже нет, замирала. Учителя в&nbsp;школе разводили руками: правила знает, домашки сдаёт, а&nbsp;заговорить не&nbsp;может. Разбираться индивидуально на&nbsp;уроке времени нет&nbsp;— 25&nbsp;человек в&nbsp;классе.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <div className="rounded-[18px] bg-white p-5 md:p-6 ring-1 ring-black/[0.05] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-muted text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Что было на диагностике
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-ink/85">
                        Педагог за&nbsp;20&nbsp;минут спокойного разговора нашла, что у&nbsp;Маши проблема не&nbsp;со&nbsp;словами и&nbsp;не&nbsp;со&nbsp;страхом&nbsp;— она просто не&nbsp;понимает, как устроено английское предложение. В&nbsp;каком порядке идут слова, что куда вставлять. Знает «name», знает «my», знает «is»&nbsp;— а&nbsp;как их&nbsp;соединить в&nbsp;правильную фразу, ей&nbsp;никто на&nbsp;пальцах не&nbsp;показал. Педагог объяснила схему на&nbsp;двух примерах&nbsp;— Маша сама за&nbsp;минуту построила третью фразу.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.22}>
                    <div className="rounded-[18px] bg-[#FFE8D8] p-5 md:p-6 ring-1 ring-[#FBD3B6] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-orange text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Первый результат
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-navy/90 font-medium">
                        В&nbsp;тот&nbsp;же вечер Маша сама позвала маму: «Смотри, я&nbsp;расскажу про себя по-английски». Получилось 4&nbsp;фразы&nbsp;— были небольшие ошибки, но&nbsp;девочка сама исправляла себя. Мама написала нам через неделю и&nbsp;поделилась своими впечатлениями: «Спасибо педагогам за&nbsp;занятие, Маша стала понимать, как говорить на&nbsp;английском».
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.28}>
                    <div className="rounded-[18px] border border-dashed border-navy/25 bg-white p-5 md:p-6 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.25)]">
                      <div className="text-navy text-[11px] font-bold uppercase tracking-[0.18em] mb-2">
                        Главное
                      </div>
                      <p className="text-[15px] md:text-[16px] leading-relaxed text-ink/85">
                        Одна диагностика не&nbsp;делает ребёнка носителем английского&nbsp;— она показывает, в&nbsp;чём настоящая причина, почему ребёнок молчит. У&nbsp;Маши это оказалась не&nbsp;«лень» и&nbsp;не&nbsp;«нет способностей», а&nbsp;отсутствие базовой схемы построения фразы. На&nbsp;её&nbsp;закрепление ушло 2&nbsp;месяца регулярных занятий&nbsp;— сейчас в&nbsp;школе она поднимает руку сама и&nbsp;идёт в&nbsp;4&nbsp;класс с&nbsp;твёрдой «5».
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
