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
    meta: 'Мама Артёма, 8 лет (2 класс)',
    quote:
      '«Сын зубрит правила&nbsp;— наизусть рассказывает. А&nbsp;в&nbsp;диктанте опять три ошибки в&nbsp;первом же&nbsp;абзаце. Я&nbsp;уже не&nbsp;знала, что делать. На&nbsp;диагностике педагог за&nbsp;минут 15&nbsp;разобрался: оказывается, он&nbsp;вообще не&nbsp;понимает, что такое «проверочное слово». Показала на&nbsp;трёх примерах&nbsp;— и&nbsp;Артём аж&nbsp;рот открыл, говорит «а&nbsp;что, так можно было?». Спасибо огромное».',
  },
  {
    name: 'Марина Д.',
    meta: 'Мама Софии, 10 лет (4 класс)',
    quote:
      '«Честно, шла на&nbsp;диагностику с&nbsp;мыслью «сейчас будут впаривать курс». Получилось наоборот&nbsp;— час с&nbsp;дочкой плотно занимались, потом 15&nbsp;минут со&nbsp;мной: что подтянуть, что вообще не&nbsp;трогать. По&nbsp;русскому за&nbsp;лето собираемся сами по&nbsp;их&nbsp;рекомендациям заниматься. И&nbsp;уже видно&nbsp;— Софа меньше путается в&nbsp;падежах».',
  },
  {
    name: 'Дмитрий В.',
    meta: 'Папа Кирилла, 9 лет (3 класс)',
    quote:
      '«Сын русский ненавидел&nbsp;— тетрадь на&nbsp;стол кладёшь, и&nbsp;сразу слёзы. Думали, не&nbsp;пойдёт на&nbsp;диагностику вообще. А&nbsp;педагог как-то его раскрутила&nbsp;— узнала, что любит футбол, и&nbsp;правила объясняла на&nbsp;названиях команд. Кирилл вышел и&nbsp;говорит: «мам, а&nbsp;можно ещё раз». Теперь думаем, на&nbsp;какую программу записаться. Низкий поклон».',
  },
];

export default function ReviewsBlock({ onCTA }: Props) {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mb-10 md:mb-14">
                <h2 className="h2">Что говорят родители после диагностики</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mb-10 md:mb-14">
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
