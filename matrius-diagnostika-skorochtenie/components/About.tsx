'use client'

import Reveal from './Reveal'

type CardId = 'game-platform' | 'years' | 'support' | 'teachers' | 'license' | 'cartoon'

/* aspect-ratio каждой ячейки соответствует оригиналу matrius.online —
   так картинки не обрезаются и грид сохраняет пропорции */
const ASPECT: Record<CardId, string> = {
  'game-platform': '907 / 266',
  years: '461 / 266',
  support: '461 / 280',
  teachers: '422 / 280',
  license: '461 / 550',
  cartoon: '907 / 247',
}

function Cell({
  id,
  alt,
  className = '',
}: {
  id: CardId
  alt: string
  className?: string
}) {
  return (
    <Reveal className={className}>
      <img
        src={`/why-cell-${id}.png`}
        alt={alt}
        className="block w-full h-full object-contain rounded-[22px]"
        style={{ aspectRatio: ASPECT[id] }}
      />
    </Reveal>
  )
}

export default function About() {
  return (
    <section className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="shell">
            <article className="card-flush p-6 md:p-10 lg:p-14">
              <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
                <h2 className="h2">
                  Почему родители выбирают <span className="text-orange">Matrius</span>
                </h2>
              </div>

              {/* Сетка как на matrius.online/sckorochtenie — 8+4, license rowSpan 2, cartoon широкая */}
              <div className="grid grid-cols-1 md:grid-cols-12 md:grid-flow-row-dense gap-4 md:gap-5">
                <Cell
                  id="game-platform"
                  alt="Собственная игровая платформа — тренажёры и персонажи"
                  className="hidden md:block md:col-span-8"
                />
                <Cell
                  id="years"
                  alt="7+ лет на рынке, 50 000+ учеников"
                  className="md:col-span-4"
                />
                <Cell
                  id="support"
                  alt="Поддержка интереса и мотивации"
                  className="md:col-span-4"
                />
                <Cell
                  id="teachers"
                  alt="Индивидуальный подбор преподавателей"
                  className="md:col-span-4"
                />
                <Cell
                  id="license"
                  alt="Образовательная лицензия и резидентство в «Сколково»"
                  className="md:col-span-4 md:row-span-2"
                />
                <Cell
                  id="cartoon"
                  alt="Собственный мультсериал"
                  className="hidden md:block md:col-span-8"
                />
              </div>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
