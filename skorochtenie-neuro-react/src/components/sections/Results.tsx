import { beforeItems, afterItems, beforeStats, afterStats } from '../../data/content';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { ArrowCta } from '../ui/ArrowCta';
import { Check, Cross, ArrowRight } from '../icons/icons';

const NBSP = ' ';

export function Results() {
  return (
    <section id="results">
      <div className="container">
        <SectionHead
          kicker="Результаты"
          title={<>Что меняется <em>за месяц занятий скорочтением</em></>}
        />

        <Reveal className="ba-grid">
          <div className="ba-col before">
            <span className="ba-label">До занятий</span>
            <h3 className="ba-headline">
              Чтение даётся через силу
              <br />
              {`и${NBSP}не приносит результата`}
            </h3>
            <div className="ba-list">
              {beforeItems.map((item) => (
                <div key={item} className="ba-item">
                  <span className="mark"><Cross /></span>
                  <span className="ba-item-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="ba-stat-row">
              {beforeStats.map((s) => (
                <div key={s.label} className="ba-stat">
                  <span className="num stat-num">{s.num}</span>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="ba-divider">
            <span className="arrow"><ArrowRight /></span>
          </div>

          <div className="ba-col after">
            <span className="ba-label">После месяца</span>
            <h3 className="ba-headline">
              {`Читает быстро и${NBSP}`}
              <em>понимает с первого раза</em>
            </h3>
            <div className="ba-list">
              {afterItems.map((item) => (
                <div key={item} className="ba-item">
                  <span className="mark"><Check /></span>
                  <span className="ba-item-text">{item}</span>
                </div>
              ))}
            </div>
            <div className="ba-stat-row">
              {afterStats.map((s) => (
                <div key={s.label} className="ba-stat">
                  <span className="num stat-num">{s.num}</span>
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="section-cta">
          <ArrowCta size="large">{`Записать ребёнка на${NBSP}бесплатный урок`}</ArrowCta>
        </div>
      </div>
    </section>
  );
}
