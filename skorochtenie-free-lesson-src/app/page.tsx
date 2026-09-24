import { Countdown } from '@/components/Countdown'
import { RegisterForm } from '@/components/RegisterForm'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || ''

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10" aria-hidden>
      <path d="M12 6.5C10.2 5.2 7.6 4.5 4 4.5v13c3.6 0 6.2.7 8 2 1.8-1.3 4.4-2 8-2v-13c-3.6 0-6.2.7-8 2Z" />
      <path d="M12 6.5v13" />
      <path d="m15.5 2.5.6 1.3 1.4.2-1 1 .2 1.4-1.2-.7-1.3.7.3-1.4-1-1 1.4-.2.6-1.3Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Page() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-column bg-column px-4 pb-10 pt-5 md:px-10">
      {/* Логотип */}
      <div className="flex h-[60px] items-center justify-center gap-3">
        <img src={`${BASE}/matrius-logo.png`} alt="" className="h-11 w-11 rounded-full" />
        <span className="text-[24px] font-semibold tracking-[-0.3px] text-navy">Матриус</span>
      </div>

      {/* Фото + таймер + пилюля */}
      <div className="relative mt-[10px]">
        <img
          src={`${BASE}/hero-deti.jpg`}
          alt="Ребёнок на онлайн-уроке по скорочтению"
          className="aspect-[4/3] w-full sm:aspect-[760/430] rounded-[20px] object-cover"
        />
        {/* Мобильная: карточка наезжает на фото, пилюля под ней. От sm — как на референсе:
            карточка слева на нижнем крае фото, пилюля справа сразу под фото. */}
        <div className="relative z-10 -mt-[56px] flex flex-col gap-3 sm:absolute sm:inset-x-0 sm:top-full sm:mt-0 sm:block">
          <div className="mx-3 rounded-[20px] bg-white px-4 pb-4 pt-5 text-center sm:absolute sm:flex sm:h-[150px] sm:flex-col sm:justify-center sm:py-0 sm:left-5 sm:top-[-76px] sm:mx-0 sm:w-[280px]">
            <div className="mb-3 text-[22px] font-bold leading-none tracking-[-0.5px] text-[#0e0e0e] max-[300px]:text-[19px] md:text-[23px]">
              Запись открыта ещё:
            </div>
            <Countdown />
          </div>
          <div className="flex h-[52px] items-center justify-center rounded-full bg-orange px-6 text-center text-[15px] font-bold max-[300px]:px-3 max-[300px]:text-[14px] text-white sm:absolute sm:right-0 sm:top-2 sm:h-[60px] sm:w-[320px] sm:text-[16px]">
            Количество мест ограничено
          </div>
        </div>
      </div>

      {/* H1 */}
      <h1 className="mt-10 sm:mt-[128px] text-[30px] font-bold leading-[1.02] tracking-[-0.8px] text-[#0d0d0d] sm:text-[38px] md:mt-[130px] md:text-[44px] md:leading-[46px] md:tracking-[-1px]">
        <span className="hl">Бесплатный урок-диагностика по скорочтению</span> для ребёнка <span className="whitespace-nowrap">6–12&nbsp;лет.</span> Покажем ребёнку, что читать можно{' '}
        <span className="hl sm:whitespace-nowrap">быстро и с удовольствием</span>
      </h1>

      {/* Navy-карточка */}
      <div className="mt-7 flex items-start gap-4 rounded-[20px] bg-navy px-5 py-5 text-white md:mt-9 md:gap-5 md:px-5 md:py-5">
        <div className="shrink-0 pt-0.5"><BookIcon /></div>
        <p className="text-[16px] font-semibold leading-[23px] md:text-[18px] md:leading-[25px]">
          За 45–60 минут педагог один на один с ребёнком замерит скорость чтения и понимание текста, сравнит с ориентиром
          его возраста и даст план на месяц. Урок проходит онлайн в удобное для вас время.
        </p>
      </div>

      {/* Текст-письмо */}
      <div className="mt-7 space-y-[22px] text-[16px] leading-[22px] text-black">
        <p>
          Многие дети читают медленно и перечитывают условие задачи по три раза. Домашка растягивается на весь вечер, на
          контрольной не хватает времени, а книга кажется наказанием. Дело не в лени: ребёнку просто тяжело даётся сам текст.
        </p>
        <p>
          Скорочтение — не про то, чтобы просто быстро читать. Сначала мы проверим, понимает ли ребёнок прочитанное и может
          ли пересказать текст, и только потом работаем над тем, чтобы улучшить навыки чтения. По внутреннему исследованию
          Matrius за месяц занятий дети читают в среднем в 2 раза быстрее, а средняя школьная оценка вырастает на 0,7 балла.
        </p>
        <p>
          В конце урока расскажем о нашей обучающей программе, но покупать ничего не нужно. Нам важно, чтобы вы с ребёнком
          просто увидели, что чтение может быть в удовольствие.
        </p>
        <p className="italic">
          Оставьте заявку ниже — позвоним и подберём время.
        </p>
      </div>

      {/* Форма */}
      <section id="form" className="mt-8">
        <RegisterForm />
      </section>

      {/* Узкий подвал */}
      <footer className="mt-12 border-t border-ink/10 pt-6 text-center text-[12px] leading-[18px] text-muted">
        <p>
          ООО «МАТРИУС ГРУПП» · ИНН 1840120295 · ОГРН 1231800007670
          <br />
          Образовательная лицензия № Л035-01265-18/00652138 от 19.05.2023
        </p>
        <p className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1">
          <a href="https://matrius.online/privacypolicy" target="_blank" rel="noopener" className="underline hover:text-navy">Политика конфиденциальности</a>
          <a href="https://matrius.online/personaldata" target="_blank" rel="noopener" className="underline hover:text-navy">Согласие на обработку ПД</a>
          <a href="https://matrius.online/publicofertamatrius" target="_blank" rel="noopener" className="underline hover:text-navy">Договор оферты</a>
        </p>
      </footer>
    </main>
  )
}
