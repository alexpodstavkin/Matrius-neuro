'use client';

import Reveal from './Reveal';

type Props = { onCTA: () => void };

type Review = {
  name: string;
  meta: string;
  quote: string;
};

const REVIEWS: Review[] = [
  {
    name: 'Ольга К.',
    meta: 'Мама Маши, 9 лет (3 класс)',
    quote:
      '«Я&nbsp;уже не&nbsp;знала, что делать&nbsp;— дочь рыдала перед каждым уроком в&nbsp;школе. На&nbsp;диагностике педагог за&nbsp;час нашла подход: оказывается, у&nbsp;Маши не&nbsp;«нет способностей», а&nbsp;просто страх ошибиться. Сейчас занимается у&nbsp;них&nbsp;же&nbsp;— впервые за&nbsp;год вижу, что ей&nbsp;нравится английский. Огромное спасибо».',
  },
  {
    name: 'Андрей П.',
    meta: 'Папа Тимофея, 8 лет (2 класс)',
    quote:
      '«Сын все слова знает на&nbsp;карточках в&nbsp;Дуолинго, а&nbsp;в&nbsp;школе&nbsp;— двойка за&nbsp;устный ответ. Думал, ленится. Педагог на&nbsp;диагностике показала: у&nbsp;него каша между am/is/are&nbsp;— он&nbsp;просто не&nbsp;успевает выбрать в&nbsp;голове и&nbsp;молчит. Дала простой приём, как этого не&nbsp;путать. Сын после урока сказал «пап, я&nbsp;понял»&nbsp;— это для меня уже результат».',
  },
  {
    name: 'Светлана Р.',
    meta: 'Мама Кати, 10 лет (4 класс)',
    quote:
      '«Мы&nbsp;год отзанимались с&nbsp;репетитором офлайн&nbsp;— два раза в&nbsp;неделю, по&nbsp;часу. Денег ушло прилично, а&nbsp;толку чуть: правила вызубрили, а&nbsp;говорить как не&nbsp;могла, так и&nbsp;не&nbsp;может. От&nbsp;онлайн-формата я&nbsp;честно не&nbsp;ждала ничего, согласилась только потому, что бесплатно. И&nbsp;именно за&nbsp;этот час педагог сделала больше, чем репетитор за&nbsp;полгода&nbsp;— увидела причину молчания и&nbsp;показала её&nbsp;мне на&nbsp;конкретных примерах. Спасибо преподавателям Matrius!».',
  },
];

export default function ReviewsBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-5 md:p-12 lg:p-16">
              <div className="max-w-3xl mb-6 md:mb-14">
                <h2 className="h2">Что говорят родители после диагностики</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mb-6 md:mb-14">
                {REVIEWS.map((r, i) => (
                  <Reveal key={r.name} delay={0.06 * i}>
                    <div className="rounded-[22px] bg-[#F4F5F8] p-6 md:p-7 ring-1 ring-black/[0.04] h-full flex flex-col">
                      <div className="text-orange text-[18px] tracking-[2px] mb-4" aria-label="5 из 5">
                        ★★★★★
                      </div>
                      <p
                        className="text-[15px] md:text-[15.5px] leading-relaxed text-ink/85 mb-6 flex-1"
                        dangerouslySetInnerHTML={{ __html: r.quote }}
                      />
                      <div className="leading-tight mt-auto">
                        <div className="text-navy font-bold text-[14px]">{r.name}</div>
                        <div className="text-muted text-[12px]">{r.meta}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <div className="flex justify-center">
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
