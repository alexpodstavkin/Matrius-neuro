import { RegisterForm } from './RegisterForm'
import { Deadline } from './Deadline'
import { PhotoSlot } from './PhotoSlot'

const CTA_TEXT =
  'Для участия в федеральном проекте родителю учеников 2–8 классов необходимо заполнить форму. Доступ к мини-курсу откроется сразу же'

/* ─────────── 7. CTA-ПЛАШКА + ФОРМА + КАЛЕНДАРЬ ───────────
   Десктоп (эталон): широкая плашка с акцентным текстом, ниже слева форма, справа календарь и карточка с датой.
   Мобильный (правка владельца 04.09.2026, по мобильной версии эталона): сначала календарь, под ним ОДНА карточка —
   дата закрытия записи и красный CTA-текст внутри неё, и только потом форма. Отдельной плашки сверху на мобиле нет. */
export function FormSection() {
  return (
    <section id="form" className="scroll-mt-6 bg-white py-10 md:py-[46px]">
      <div className="container-x">
        <div className="card-soft mx-auto hidden max-w-[1086px] px-6 py-6 md:block md:px-[60px] md:py-[26px]">
          <p className="text-center font-medium uppercase text-cta text-[16px] leading-[24px] md:text-[22px] md:leading-[32px]">
            {CTA_TEXT}
          </p>
        </div>

        <div className="mt-6 grid gap-8 md:mt-[30px] md:grid-cols-2 md:gap-10">
          {/* на мобиле карточка с датой идёт первой, на десктопе — справа от формы */}
          <div className="relative order-first md:order-last md:pt-[80px]">
            <PhotoSlot
              src="/photos/calendar.png"
              alt="Календарь"
              label="Календарь"
              className="mx-auto h-[130px] w-[130px] object-contain md:absolute md:left-[30px] md:top-0 md:mx-0 md:h-[152px] md:w-[152px]"
            />
            <div className="card-soft mt-4 px-6 py-8 md:mt-0 md:px-[30px] md:py-[36px] md:pt-[100px]">
              <p className="text-center font-bold uppercase text-ink text-[20px] leading-[30px] md:text-left md:text-[24px] md:leading-[36px]">
                Запись открыта
                <br className="hidden md:block" /> до <Deadline />
              </p>
              <p className="mt-3 text-center text-[15px] leading-[23px] text-muted md:text-left md:text-[16px]">
                Первый урок приходит сразу после подтверждения заявки, дальше — по одному уроку в день.
              </p>
              <p className="mt-5 text-center font-medium uppercase text-cta text-[16px] leading-[24px] md:hidden">
                {CTA_TEXT}
              </p>
            </div>
          </div>

          <div className="order-last md:order-first">
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  )
}
