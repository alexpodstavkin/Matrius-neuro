import { trialSteps } from '../../data/content';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { ArrowCta } from '../ui/ArrowCta';
import { nbsp } from '../../lib/typography';

const NBSP = ' ';

export function HowItWorks() {
  return (
    <section id="what">
      <div className="container">
        <SectionHead
          kicker="Бесплатный урок"
          title={<>Что будет на <em>бесплатном уроке</em></>}
        />

        <div className="trial-grid">
          {trialSteps.map((s, i) => (
            <Reveal key={s.num} className="trial-step" delay={i * 0.05}>
              <span className="trial-num">{s.num}</span>
              <span className="trial-text">{nbsp(s.text)}</span>
            </Reveal>
          ))}
        </div>

        <div className="section-cta">
          <ArrowCta size="large">{`Записаться на${NBSP}бесплатный урок`}</ArrowCta>
        </div>
      </div>
    </section>
  );
}
