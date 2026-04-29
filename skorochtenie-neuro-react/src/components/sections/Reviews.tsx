import { useRef } from 'react';
import { chatReviews } from '../../data/content';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { useAutoCarousel } from '../../hooks/useAutoCarousel';
import { nbsp } from '../../lib/typography';

export function Reviews() {
  const gridRef = useRef<HTMLDivElement>(null);
  useAutoCarousel(gridRef);

  return (
    <section id="reviews" className="section-tinted">
      <div className="container">
        <SectionHead
          kicker="Отзывы родителей"
          title={<>Им уже не нужно <em>уговаривать ребёнка читать</em></>}
        />

        <div className="chat-grid carousel" ref={gridRef}>
          {chatReviews.map((r, i) => (
            <Reveal
              key={r.author + i}
              className={`chat-bubble tone-${r.tone}`}
              delay={(i % 4) * 0.05}
            >
              <p>{nbsp(r.text)}</p>
              <span className="chat-author">— {r.author}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
