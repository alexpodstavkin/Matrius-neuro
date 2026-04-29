import { methodPoints } from '../../data/content';
import { SectionHead } from '../ui/SectionHead';
import { Reveal } from '../ui/Reveal';
import { Check } from '../icons/icons';
import { nbsp } from '../../lib/typography';

const NBSP = ' ';

export function Methodology() {
  return (
    <section id="method">
      <div className="container">
        <SectionHead
          kicker="Методология"
          title={
            <>
              {`В${NBSP}основе — уникальная методика, по${NBSP}которой `}
              <em>{`из${NBSP}любого ребёнка можно вырастить гения`}</em>
            </>
          }
        />

        <Reveal className="method-wrap method-wrap-aligned">
          <div className="method-content">
            <h2 className="method-anchor-top">{`Программа построена на${NBSP}четырёх принципах детской психологии`}</h2>
            <p className="lead">
              {`Мы тренируем не${NBSP}просто скорость. Мы${NBSP}также развиваем мышление, память и${NBSP}речь — через игру, в${NBSP}которую ребёнок включается сам.`}
            </p>

            <div className="method-points">
              {methodPoints.map((p) => (
                <div key={p.title} className="method-point">
                  <div className="check"><Check /></div>
                  <div>
                    <strong>{nbsp(p.title)}</strong>
                    <span>{nbsp(p.text)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="method-photo photo">
            <img
              src={`${import.meta.env.BASE_URL}methodology.png`}
              alt="Педагог и ребёнок на занятии в Matrius"
              width={1254}
              height={1254}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
