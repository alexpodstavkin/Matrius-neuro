'use client';

import Reveal from './Reveal';

type Feature = {
  image: string;
  alt: string;
  /** скрыть на мобиле (sm и ниже) */
  hideOnMobile?: boolean;
};

const FEATURES: Feature[] = [
  {
    image: 'why-matrius/platform.png',
    alt: 'Собственная игровая платформа Matrius',
    hideOnMobile: true,
  },
  {
    image: 'why-matrius/stats.png',
    alt: '7+ лет на рынке, 50 000+ учеников',
  },
  {
    image: 'why-matrius/license.png',
    alt: 'Образовательная лицензия и резидентство в Сколково',
  },
  {
    image: 'why-matrius/motivation.png',
    alt: 'Поддержка интереса и мотивации',
  },
  {
    image: 'why-matrius/teachers.png',
    alt: 'Индивидуальный подбор преподавателей',
  },
  {
    image: 'why-matrius/series.png',
    alt: 'Собственный мультсериал Matrius',
    hideOnMobile: true,
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-[22px] overflow-hidden shadow-[0_8px_28px_-18px_rgba(31,42,68,0.18)] ring-1 ring-black/[0.05]">
      <img
        src={feature.image}
        alt={feature.alt}
        loading="lazy"
        className="block w-full h-auto"
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

              {/* Masonry через CSS columns — каждый скрин в родном размере, без обрезки и без полей */}
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 md:gap-7 [column-fill:_balance]">
                {FEATURES.map((f, i) => (
                  <div
                    key={f.image}
                    className={`mb-5 md:mb-7 break-inside-avoid ${f.hideOnMobile ? 'hidden sm:block' : ''}`.trim()}
                  >
                    <Reveal delay={0.05 * i}>
                      <FeatureCard feature={f} />
                    </Reveal>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
