import { useRef } from 'react';
import { skillCards } from '../../data/content';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { ArrowCta } from '../ui/ArrowCta';
import { useAutoCarousel } from '../../hooks/useAutoCarousel';
import { nbsp } from '../../lib/typography';
import * as Icons from '../icons/icons';

const NBSP = ' ';

export function Skills() {
  const gridRef = useRef<HTMLDivElement>(null);
  useAutoCarousel(gridRef);

  return (
    <section className="skills-dark">
      <div className="container">
        <SectionHead
          kicker="Что тренируем"
          title={<>Тренируем 6 навыков, которые работают <em>за партой и в жизни</em></>}
        />

        <div className="bento-skills carousel" ref={gridRef}>
          {skillCards.map((c, i) => {
            const Icon = Icons[c.icon as keyof typeof Icons];
            const isFeatured = c.cls === 'bento-2';
            return (
              <Reveal key={c.cls} className={`bento-card ${c.cls}`} delay={i * 0.04}>
                <div className="bento-head">
                  <div className="bento-icon"><Icon /></div>
                  {isFeatured && <span className="bento-badge">Главный навык</span>}
                </div>
                <h3>{nbsp(c.title)}</h3>
                <p>{nbsp(c.text)}</p>
              </Reveal>
            );
          })}
        </div>

        <div className="section-cta">
          <ArrowCta size="large">{`Записаться на${NBSP}бесплатный урок`}</ArrowCta>
        </div>
      </div>
    </section>
  );
}
