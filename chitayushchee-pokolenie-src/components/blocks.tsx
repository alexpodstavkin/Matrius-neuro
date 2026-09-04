import { Deadline } from './Deadline'
import { PhotoSlot } from './PhotoSlot'
import { IconBook, IconMap, IconSearch, IconFlag, IconCheck } from './Icons'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

/* ─────────── 1. HERO ───────────
   Эталон: блок 600px, фото на всю ширину, синий градиент поверх,
   заголовок 45/65, uppercase, вес 700, по центру. */
export function Hero() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden md:h-[600px]">
      <div
        className="absolute inset-0 bg-blue-tint bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE}/photos/hero.jpg)` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(20,24,40,.42) 0%, rgba(20,24,40,0) 70%), linear-gradient(180deg, rgba(41,42,50,.60) 0%, rgba(69,137,240,.64) 100%)',
        }}
        aria-hidden
      />
      <div className="container-x relative py-16 md:py-0">
        <h1 className="mx-auto max-w-[1371px] text-center font-bold uppercase text-white text-[22px] leading-[30px] sm:text-[28px] sm:leading-[38px] md:text-[45px] md:leading-[65px]">
          Федеральный проект РФ
          <br />
          «Читающее поколение: 5&nbsp;навыков сильного читателя»
        </h1>
      </div>
    </section>
  )
}

/* ─────────── 2. ПЛАШКА + CTA ───────────
   Эталон: серая карточка r20 с иконкой слева и текстом 22/32, ниже кнопка. */
export function Notice() {
  return (
    <section className="bg-white pt-10 md:pt-[38px]">
      <div className="container-x">
        <div className="card-soft mx-auto flex max-w-[1086px] items-center justify-center gap-6 px-6 py-8 md:gap-10 md:px-[60px] md:py-[26px]">
          <IconBook className="hidden h-[60px] w-[60px] shrink-0 text-ink md:block" />
          <div className="text-left text-[16px] leading-[25px] text-ink md:max-w-[760px] md:text-[22px] md:leading-[32px]">
            <p>
              В связи со снижением интереса детей к чтению выдаётся бесплатный мини-курс по скорочтению{' '}
              <span className="whitespace-nowrap">для 2–8 классов.</span>
            </p>
            <p className="mt-2">
              Цель: научить детей понимать текст, находить главное, запоминать и рассуждать о прочитанном
            </p>
          </div>
        </div>
        <div className="flex justify-center py-10 md:py-[38px]">
          <a href="#form" className="btn-cta">Получить доступ</a>
        </div>
      </div>
    </section>
  )
}

/* ─────────── 3. ЧТО ЗНАЧИТ ЗАНИМАТЬСЯ СКОРОЧТЕНИЕМ СЕГОДНЯ ───────────
   Слева фото, справа карточка с текстом — равные по размеру (требование владельца). */
export function WhyToday() {
  return (
    <section className="bg-white py-10 md:py-[46px]">
      <div className="container-x">
        <h2 className="h-section">Что значит заниматься скорочтением сегодня?</h2>
        <div className="mt-8 grid items-stretch gap-5 md:mt-[42px] lg:grid-cols-2">
          <PhotoSlot
            src="/photos/why-today.jpg"
            alt="Ребёнок читает книгу"
            label="Место для фото — ребёнок с книгой"
            className="h-[240px] w-full rounded-card object-cover lg:h-full lg:min-h-[340px]"
          />
          <div className="card-soft flex flex-col justify-center px-6 py-6 md:px-[30px] lg:min-h-[340px]">
            <p className="text-[16px] leading-[25px] text-ink md:text-[18px] md:leading-[25px]">
              Скорочтение — это не только про скорость. Это про понимание текста, память и внимание.
            </p>
            <p className="mt-4 text-[16px] leading-[25px] text-ink md:mt-[18px] md:text-[18px] md:leading-[25px]">
              Чтение занимает лишь восьмое место в досуге детей, а больше 15&nbsp;% подростков не дотягивают до
              базового уровня понимания текста.
            </p>
            <p className="mt-4 text-[16px] leading-[25px] text-ink md:mt-[18px] md:text-[18px] md:leading-[25px]">
              С каждым классом текста становится больше. Ребёнок, который читает глазами, но не удерживает смысл,
              тратит на домашнюю работу вдвое больше времени.
            </p>
            <p className="mt-4 text-[16px] leading-[25px] text-ink md:mt-[18px] md:text-[18px] md:leading-[25px]">
              Дальше только сложнее: впереди ВПР, ОГЭ и ЕГЭ.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────── 4. ОСНОВНЫЕ ЭТАПЫ ПОГРУЖЕНИЯ В ПРОЕКТ ───────────
   3 карточки эталона. Карточки с разбором пяти уроков сняты по правке владельца 04.09.2026. */
const STAGE_CARDS = [
  {
    Icon: IconMap,
    title: 'Формат',
    text: '5 записанных уроков по 20–25 минут. По одному уроку в день — ребёнок смотрит и в игровой форме проходит их сам, без расписания.',
  },
  {
    Icon: IconSearch,
    title: 'Что тренируем',
    text: 'Ориентироваться в тексте, замечать подсказки между строк, находить главное и отличать факт от выдумки. Каждый урок — один навык и практика на нём.',
  },
  {
    Icon: IconFlag,
    title: 'Чем заканчивается',
    text: 'Бесплатная диагностика специалиста и понятная рекомендация: какие есть проблемы с чтением и что стоит прокачать дальше.',
  },
]

export function Stages() {
  return (
    <section className="bg-white py-10 md:py-[46px]">
      <div className="container-x">
        <h2 className="h-section">Основные этапы погружения в проект «Читающее поколение»</h2>

        <div className="mt-8 grid gap-5 md:mt-[42px] md:grid-cols-2 lg:grid-cols-3">
          {STAGE_CARDS.map(({ Icon, title, text }) => (
            <div key={title} className="card-soft flex flex-col px-6 py-7 md:min-h-[274px] md:px-[30px] md:py-[30px]">
              <Icon className="h-10 w-10 text-ink" />
              <p className="mt-5 text-[17px] font-semibold leading-[24px] text-ink md:text-[18px]">{title}</p>
              <p className="mt-2 text-[16px] leading-[24px] text-ink md:text-[18px] md:leading-[25px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────── 5. ПЛАШКА С ДЕДЛАЙНОМ ───────────
   Эталон: полоса от края до края, фото фоном, синий градиент, заголовок 36/56 + кнопка. */
export function DeadlineBanner() {
  return (
    <section className="relative overflow-hidden py-14 md:h-[280px] md:py-0">
      <div
        className="absolute inset-0 bg-blue-tint bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE}/photos/deadline.jpg)` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(41,42,50,.58) 0%, rgba(69,137,240,.66) 100%)' }}
        aria-hidden
      />
      <div className="container-x relative flex h-full flex-col items-center justify-center">
        <h2 className="text-center font-semibold uppercase text-white text-[22px] leading-[32px] md:text-[36px] md:leading-[56px]">
          Запись открыта до <Deadline />
        </h2>
        <a href="#form" className="btn-cta mt-5 md:mt-[10px]">Получить доступ</a>
      </div>
    </section>
  )
}

/* ─────────── 6. ЧТО ПОЛУЧИТ РЕБЁНОК ─────────── */
const GAINS = [
  'Умение с первого прочтения понимать, о чём текст: кто действует, где и что произошло',
  'Навык находить главное — делить длинный текст на части и коротко пересказывать смысл',
  'Критическое мышление: отличать факт от мнения и выдумки, замечать противоречия и объяснять свою позицию текстом',
]

export function Gains() {
  return (
    <section className="bg-white py-10 md:py-[46px]">
      <div className="container-x">
        <h2 className="h-section">Во время погружения в федеральный проект «Читающее поколение» ваш ребенок получит</h2>
        <div className="mt-8 grid gap-5 md:mt-[42px] md:grid-cols-2 lg:grid-cols-3">
          {GAINS.map((g) => (
            <div key={g} className="card-soft flex flex-col px-6 py-7 md:min-h-[170px] md:px-[30px] md:py-[30px]">
              <IconCheck className="h-8 w-8 text-ink" />
              <p className="mt-4 text-[16px] leading-[24px] text-ink md:text-[18px] md:leading-[25px]">{g}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
