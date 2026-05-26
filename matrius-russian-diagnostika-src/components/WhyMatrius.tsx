'use client';

import Reveal from './Reveal';

type Feature = {
  image: string;
  alt: string;
  /** bento span на lg-сетке (по умолчанию 1×1) */
  span?: string;
  /** aspect-ratio для собственного бокса карточки */
  ratio: string;
  /** скрыть на мобиле (sm и ниже) */
  hideOnMobile?: boolean;
};

const FEATURES: Feature[] = [
  {
    image: 'why-matrius/platform.png',
    alt: 'Собственная игровая платформа Matrius',
    span: 'lg:col-span-2',
    ratio: 'aspect-[1814/532]',
    hideOnMobile: true,
  },
  {
    image: 'why-matrius/stats.png',
    alt: '7+ лет на рынке, 50 000+ учеников',
    ratio: 'aspect-[922/532]',
  },
  {
    image: 'why-matrius/license.png',
    alt: 'Образовательная лицензия и резидентство в Сколково',
    span: 'lg:row-span-2',
    ratio: 'aspect-[922/1100]',
  },
  {
    image: 'why-matrius/motivation.png',
    alt: 'Поддержка интереса и мотивации',
    ratio: 'aspect-[922/560]',
  },
  {
    image: 'why-matrius/teachers.png',
    alt: 'Индивидуальный подбор преподавателей',
    ratio: 'aspect-[844/560]',
  },
  {
    image: 'why-matrius/series.png',
    alt: 'Собственный мультсериал Matrius',
    span: 'lg:col-span-2',
    ratio: 'aspect-[1814/494]',
    hideOnMobile: true,
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-[22px] overflow-hidden md:aspect-[4/3] lg:aspect-auto md:h-full shadow-[0_8px_28px_-18px_rgba(31,42,68,0.18)] ring-1 ring-black/[0.05] bg-white flex items-center justify-center">
      <img
        src={feature.image}
        alt={feature.alt}
        loading="lazy"
        className="block w-full h-auto md:h-full md:w-full md:object-contain"
      />
    </div>
  );
}

export default function WhyMatrius() {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl mb-10 md:mb-14">
                <h2 className="h2">
                  Почему родители выбирают <span className="text-orange">онлайн-школу Matrius</span>
                </h2>
              </div>

              {/* Bento — на lg 3 кол + auto-rows fixed, чтобы row-span/col-span работали */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 lg:grid-flow-dense lg:[grid-auto-rows:17rem] xl:[grid-auto-rows:19rem]">
                {FEATURES.map((f, i) => (
                  <Reveal
                    key={f.image}
                    delay={0.05 * i}
                    className={`${f.hideOnMobile ? 'hidden sm:block' : ''} ${f.span ?? ''}`.trim()}
                  >
                    <FeatureCard feature={f} />
                  </Reveal>
                ))}
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
