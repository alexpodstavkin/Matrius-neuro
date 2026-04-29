import { Reveal } from '../ui/Reveal';
import { ArrowCta } from '../ui/ArrowCta';

const NBSP = ' ';

export function FinalCta() {
  return (
    <section style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <Reveal className="final-cta">
          <h2>{`Запишите вашего ребёнка на${NBSP}бесплатный урок по${NBSP}скорочтению уже сегодня`}</h2>
          <ArrowCta size="large">Записаться</ArrowCta>
        </Reveal>
      </div>
    </section>
  );
}
