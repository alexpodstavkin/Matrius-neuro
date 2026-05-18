'use client'

import { useState } from 'react'
import { nb } from '../lib/typography'

const qa = [
  {
    q: 'Как проходит бесплатный урок?',
    a: '60 минут онлайн один на один с педагогом. Ребёнок проходит диагностику, пробует упражнения, получает первый результат. Родитель в конце получает план на лето.',
  },
  {
    q: 'С какого возраста подходит программа?',
    a: 'Программа адаптируется для детей от 7 до 14 лет. Для каждого возраста — свои упражнения, тексты и темп.',
  },
  {
    q: 'Что нужно для урока?',
    a: 'Только компьютер или планшет, наушники и стабильный интернет. Все материалы — у нас на платформе.',
  },
  {
    q: 'Если ребёнок «не любит читать» — поможет ли?',
    a: 'Именно в таких случаях скорочтение работает лучше всего. Часто причина нелюбви в том, что чтение даётся тяжело и медленно. Когда оно становится лёгким, интерес просыпается сам.',
  },
  {
    q: 'Что если не понравится после бесплатного урока?',
    a: 'Ничего не теряете — урок бесплатный, подарки остаются у вас в любом случае.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="section">
      <div className="container flex flex-col gap-12 lg:gap-16">
        <div className="max-w-[820px] mx-auto text-center flex flex-col gap-5">
          <h2>{nb('Родители часто у нас спрашивают')}</h2>
        </div>

        <div className="flex flex-col gap-3 max-w-[960px] w-full mx-auto">
          {qa.map((item, idx) => {
            const isOpen = open === idx
            const panelId = `faq-panel-${idx}`
            const btnId = `faq-trigger-${idx}`
            return (
              <article
                key={item.q}
                className={`faq-item ${isOpen ? 'faq-item--open' : ''} reveal reveal-delay-${Math.min(idx + 1, 6)}`}
              >
                <button
                  type="button"
                  id={btnId}
                  onClick={() => setOpen(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="faq-item__btn"
                >
                  <span>{nb(item.q)}</span>
                  <span className="faq-item__plus" aria-hidden>+</span>
                </button>
                {/* Тело всегда в DOM — высота анимируется через grid-template-rows */}
                <div
                  className="faq-item__body-wrap"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-item__body-inner">
                    <div className="faq-item__body">{nb(item.a)}</div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
