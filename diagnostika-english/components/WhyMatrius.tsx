'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Reveal from './Reveal';

// masonic использует ResizeObserver и должен рендериться только на клиенте
const Masonry = dynamic(() => import('masonic').then((m) => m.Masonry), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-[22px] bg-[#F4F5F8] aspect-[3/2] animate-pulse" />
      ))}
    </div>
  ),
}) as unknown as typeof import('masonic').Masonry;

type Feature = {
  id: number;
  image: string;
  alt: string;
  /** width / height — для CSS aspect-ratio, чтобы masonic знал высоту до загрузки */
  ratio: string;
};

const FEATURES: Feature[] = [
  { id: 1, image: 'why-matrius/platform.png',   alt: 'Собственная игровая платформа Matrius',          ratio: '1814 / 532'  },
  { id: 2, image: 'why-matrius/stats.png',      alt: '7+ лет на рынке, 50 000+ учеников',              ratio: '922 / 532'   },
  { id: 3, image: 'why-matrius/license.png',    alt: 'Образовательная лицензия и резидентство в Сколково', ratio: '922 / 1100' },
  { id: 4, image: 'why-matrius/motivation.png', alt: 'Поддержка интереса и мотивации',                 ratio: '922 / 560'   },
  { id: 5, image: 'why-matrius/teachers.png',   alt: 'Индивидуальный подбор преподавателей',           ratio: '844 / 560'   },
  { id: 6, image: 'why-matrius/series.png',     alt: 'Собственный мультсериал Matrius',                ratio: '1814 / 494'  },
];

// На мобилке (< md) скрываем широкие карточки platform и series — они
// плохо смотрятся одной колонкой
const MOBILE_HIDDEN_IDS = new Set([1, 6]);

function MasonryCard({ data }: { data: Feature }) {
  return (
    <div
      className="rounded-[22px] overflow-hidden shadow-[0_8px_28px_-18px_rgba(31,42,68,0.18)] ring-1 ring-black/[0.05] bg-white"
      style={{ aspectRatio: data.ratio }}
    >
      <img
        src={data.image}
        alt={data.alt}
        loading="lazy"
        className="block w-full h-full object-cover"
      />
    </div>
  );
}

export default function WhyMatrius() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const items = isMobile ? FEATURES.filter((f) => !MOBILE_HIDDEN_IDS.has(f.id)) : FEATURES;

  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-5 md:p-12 lg:p-16">
              <div className="max-w-3xl mb-6 md:mb-14">
                <h2 className="h2">
                  Почему родители выбирают <span className="text-orange">онлайн-школу Matrius</span>
                </h2>
              </div>

              {/* masonic — настоящий JS-masonry. Сам считает кол-во колонок из ширины
                  контейнера / columnWidth, измеряет высоту каждой карточки и кладёт
                  следующую в самую короткую колонку → колонки сбалансированы по высоте,
                  скрины в родных пропорциях без обрезки и без полей. */}
              <Masonry
                key={isMobile ? 'mobile' : 'desktop'}
                items={items}
                columnWidth={320}
                maxColumnCount={3}
                columnGutter={20}
                rowGutter={20}
                render={MasonryCard}
              />
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
