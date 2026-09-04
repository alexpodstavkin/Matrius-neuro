'use client'
import { useRef, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GRADES = ['2', '3', '4', '5', '6', '7', '8']

const PHONE_HUMAN = '+7 (985) 219-74-00'
const PHONE_TEL = '+79852197400'

// Форма записи. Поля повторяют эталон (имя, почта, телефон, выпадающий список),
// но список — класс ребёнка: мини-курс адресован 2–8 классам.
export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [grade, setGrade] = useState('')
  const [agree, setAgree] = useState(false)
  const [news, setNews] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sendError, setSendError] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function formatPhone(raw: string) {
    let digits = raw.replace(/\D/g, '')
    if (!digits) return ''
    if (digits.startsWith('8')) digits = '7' + digits.slice(1)
    if (!digits.startsWith('7')) digits = '7' + digits
    digits = digits.slice(0, 11)
    const rest = digits.slice(1)
    let out = '+7'
    if (rest.length > 0) out += ' (' + rest.slice(0, 3)
    if (rest.length >= 3) out += ') ' + rest.slice(3, 6)
    if (rest.length >= 6) out += '-' + rest.slice(6, 8)
    if (rest.length >= 8) out += '-' + rest.slice(8, 10)
    return out
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return

    const digits = phone.replace(/\D/g, '')
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Напишите, как к вам обращаться'
    if (!EMAIL_RE.test(email.trim())) next.email = 'Укажите корректную почту'
    if (digits.length !== 11) next.phone = 'Введите номер полностью — 11 цифр'
    if (!grade) next.grade = 'Выберите класс ребёнка'
    if (!agree) next.agree = 'Без согласия мы не сможем принять заявку'
    setErrors(next)
    if (Object.keys(next).length) {
      // без этого при отправке пустой формы кажется, что кнопка не работает
      formRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.scrollIntoView({ block: 'center' })
      return
    }

    setSendError('')
    setBusy(true)

    // Общий приёмщик лидов Матриуса на web.matrius.online. По этому URL nginx проксирует
    // на FastAPI (skorochtenie-neuro/api/main.py, POST /api/booking) — ключи GetCourse у него
    // в env на сервере. Тот же эндпоинт используют skorochtenie-urok и matrius-summer-school.
    // Успех = 202 {"ok":true,"queued":true}. Переопределяется NEXT_PUBLIC_LEAD_ENDPOINT.
    const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '/skorochtenie-neuro/php/submit.php'

    let utms: Record<string, string> = {}
    try {
      utms = JSON.parse(sessionStorage.getItem('mx_utm') || '{}')
    } catch {}

    const payload: Record<string, string> = {
      name: name.trim(),
      email: email.trim(),
      phone: `+${digits}`,
      // Бэкенд ждёт поле `age` (уходит в GetCourse как «Возраст ребёнка»).
      // Здесь спрашиваем класс, поэтому кладём его же — «5 класс».
      age: `${grade} класс`,
      news: news ? 'yes' : 'no',
      ...utms,
    }
    // слаг во все пустые utm-поля — иначе разбор по БД GetCourse по слагу не сходится
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      if (!payload[k]) payload[k] = 'chitayushchee-pokolenie'
    }
    if (typeof document !== 'undefined' && document.referrer) payload.referer = document.referrer

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok || res.status === 202) {
        // цели для Метрики и VK-пикселя — без них VK Ads не оптимизируется по конверсиям
        try {
          ;(window as unknown as { ym?: (id: number, a: string, g: string) => void }).ym?.(98858030, 'reachGoal', 'lead')
        } catch {}
        try {
          ;(window as unknown as { _tmr?: { push: (o: object) => void } })._tmr?.push({
            id: '3743427',
            type: 'reachGoal',
            goal: 'lead',
          })
        } catch {}
        setSent(true)
        return
      }
      const data = await res.json().catch(() => ({}))
      if (res.status === 422) setSendError('Проверьте правильность почты и телефона.')
      else if (res.status === 429) setSendError('Слишком много заявок. Попробуйте через минуту.')
      else setSendError(data.error || 'Не удалось отправить заявку. Попробуйте ещё раз.')
    } catch {
      setSendError('Сеть недоступна. Попробуйте ещё раз.')
    } finally {
      setBusy(false)
    }
  }

  const field = (bad?: string) =>
    `w-full rounded-[8px] bg-white px-5 py-[18px] text-[16px] text-ink outline-none transition-colors placeholder:text-muted-weak focus:ring-2 focus:ring-blue-hover/60 ${
      bad ? 'border-2 border-coral' : 'border border-ink/10 focus:border-blue-hover'
    }`

  if (sent) {
    return (
      <div className="card-soft flex min-h-[430px] flex-col justify-center px-6 py-10 text-center md:px-[30px]">
        <div className="text-[24px] font-bold text-ink">Заявка принята</div>
        <p className="mx-auto mt-3 max-w-[380px] text-[16px] leading-[24px] text-muted">
          Отправим доступ к первому уроку и согласуем даты по указанным контактам.
        </p>
        <p className="mx-auto mt-3 max-w-[380px] text-[15px] leading-[23px] text-muted">
          Позвоним с номера{' '}
          <a href={`tel:${PHONE_TEL}`} className="whitespace-nowrap font-semibold text-blue-hover underline">
            {PHONE_HUMAN}
          </a>{' '}
          — сохраните, чтобы не пропустить.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card-soft px-6 py-8 md:px-[30px] md:py-[30px]">
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            name="name"
            data-invalid={errors.name ? 'true' : undefined}
            aria-invalid={errors.name ? true : undefined}
            autoComplete="name"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field(errors.name)}
          />
          {errors.name && <span className="mt-1.5 block text-[13px] font-medium text-ink">{errors.name}</span>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            data-invalid={errors.email ? 'true' : undefined}
            aria-invalid={errors.email ? true : undefined}
            autoComplete="email"
            placeholder="Электронная почта"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field(errors.email)}
          />
          {errors.email && <span className="mt-1.5 block text-[13px] font-medium text-ink">{errors.email}</span>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            data-invalid={errors.phone ? 'true' : undefined}
            aria-invalid={errors.phone ? true : undefined}
            autoComplete="tel"
            inputMode="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className={field(errors.phone)}
          />
          {errors.phone && <span className="mt-1.5 block text-[13px] font-medium text-ink">{errors.phone}</span>}
        </div>

        <div>
          <select
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            data-invalid={errors.grade ? 'true' : undefined}
            aria-invalid={errors.grade ? true : undefined}
            className={`${field(errors.grade)} appearance-none bg-[right_1.25rem_center] bg-no-repeat pr-12 ${
              grade ? 'text-ink' : 'text-muted-weak'
            }`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'><path d='M1 1l6 6 6-6' stroke='%23545454' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
            }}
          >
            <option value="">Класс ребёнка</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g} класс
              </option>
            ))}
          </select>
          {errors.grade && <span className="mt-1.5 block text-[13px] font-medium text-ink">{errors.grade}</span>}
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[19px] text-muted">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="mt-[2px] h-4 w-4 shrink-0 accent-[#5F9FFF]"
          />
          <span>
            Подтверждаю, что ознакомлен(а) и принимаю условия{' '}
            <a href="https://matrius.online/publicofertamatrius" target="_blank" rel="noreferrer" className="text-blue-hover underline">
              Оферты
            </a>{' '}
            и{' '}
            <a href="https://matrius.online/privacypolicy" target="_blank" rel="noreferrer" className="text-blue-hover underline">
              Политики обработки персональных данных
            </a>
            , а также даю своё{' '}
            <a href="https://matrius.online/personaldata" target="_blank" rel="noreferrer" className="text-blue-hover underline">
              согласие на обработку персональных данных
            </a>{' '}
            в целях исполнения Оферты
          </span>
        </label>
        {errors.agree && <span className="-mt-2 block text-[13px] font-medium text-ink">{errors.agree}</span>}

        <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-[19px] text-muted">
          <input
            type="checkbox"
            checked={news}
            onChange={(e) => setNews(e.target.checked)}
            className="mt-[2px] h-4 w-4 shrink-0 accent-[#5F9FFF]"
          />
          <span>
            Хочу получать новости сервиса, полезные материалы и{' '}
            <a href="https://matrius.online/agreementmailing" target="_blank" rel="noreferrer" className="text-blue-hover underline">
              специальные предложения по указанным контактным данным
            </a>
          </span>
        </label>

        <p className="text-[13px] leading-[19px] text-muted">
          Доступ к первому уроку придёт на почту. Позвоним один раз — подтвердить заявку и класс ребёнка.
        </p>

        <button
          type="submit"
          disabled={busy}
          className="mt-2 w-full rounded-[8px] bg-cta py-[18px] text-[18px] font-medium text-white transition-colors hover:bg-cta-hover disabled:opacity-60"
          style={{ boxShadow: '0 10px 24px rgba(233,69,70,.28), 0 2px 6px rgba(233,69,70,.16)' }}
        >
          {busy ? 'Отправляем…' : 'Получить доступ'}
        </button>

        {sendError && <span className="block text-center text-[13px] font-medium text-ink">{sendError}</span>}
      </div>
    </form>
  )
}
