import { Reveal } from '../ui/Reveal';

const NBSP = ' ';

export function PromiseBand() {
  return (
    <section className="promise-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <Reveal className="promise-band">
          <div className="promise-num">
            +0,7
            <small>{`балла к${NBSP}средней оценке`}</small>
          </div>
          <div className="promise-text">
            <h2>{`Главный результат — оценки в${NBSP}дневнике`}</h2>
            <p>
              {`За${NBSP}месяц регулярных занятий средняя оценка ребёнка вырастает на${NBSP}0,7 балла. Тройка превращается в${NBSP}четвёрку, четвёрка — в${NBSP}уверенную пятёрку. Это${NBSP}не${NBSP}маркетинг — это${NBSP}диагностика успеваемости 10${NBSP}000+ учеников Matrius.`}
            </p>
            <p className="source">{`Внутреннее исследование онлайн-школы Matrius, 2024–2025${NBSP}годов.`}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
