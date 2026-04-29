import { useRef } from 'react';
import { utpCards } from '../../data/content';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { useAutoCarousel } from '../../hooks/useAutoCarousel';
import { nbsp } from '../../lib/typography';

export function WhySpeedReading() {
  const gridRef = useRef<HTMLDivElement>(null);
  useAutoCarousel(gridRef);

  return (
    <section id="why">
      <div className="container">
        <SectionHead
          kicker="Зачем это нужно"
          title={<>На что влияет <em>навык скорочтения</em></>}
        />

        <div className="utp-grid carousel" ref={gridRef}>
          {utpCards.map((c, i) => (
            <Reveal key={c.title} className="utp-card" delay={i * 0.04}>
              <div className="utp-emoji" aria-hidden="true">{c.emoji}</div>
              <h3>{nbsp(c.title)}</h3>
              <p>{nbsp(c.text)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
