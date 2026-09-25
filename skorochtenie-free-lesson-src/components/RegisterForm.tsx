'use client'
import { useRef, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AGES = Array.from({ length: 5 }, (_, i) => String(i + 6)) // 6..10 — возрастная рамка лендинга

const PHONE_HUMAN = '+7 (985) 219-74-00'
const PHONE_TEL = '+79852197400'

// Отправка 1-в-1 с /skorochtenie-urok/: POST на общий приёмщик Матриуса
// /skorochtenie-neuro/php/submit.php (на деле FastAPI → GetCourse, успех = 202),
// payload: name, phone (+7…), email, age («9 лет»), utm_* из sessionStorage 'mx_utm', referer.
// Переопределяется через NEXT_PUBLIC_LEAD_ENDPOINT.
export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState('')
  const [agree, setAgree] = useState(false)
  const [news, setNews] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [sendError, setSendError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  // ошибка поля гаснет, как только его начали исправлять
  function clear(key: string) {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const { [key]: _, ...rest } = prev
      return rest
    })
  }

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
    if (busy) return // защита от двойного клика
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Напишите, как к вам обращаться'
    if (!EMAIL_RE.test(email.trim())) next.email = 'Укажите корректную почту'
    if (phone.replace(/\D/g, '').length !== 11) next.phone = 'Введите номер полностью — 11 цифр'
    if (!age) next.age = 'Укажите возраст ребёнка'
    if (!agree) next.agree = 'Без согласия мы не сможем принять заявку'
    setErrors(next)
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }

    setSendError('')
    setBusy(true)
    const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '/skorochtenie-neuro/php/submit.php'

    let utms: Record<string, string> = {}
    try {
      utms = JSON.parse(sessionStorage.getItem('mx_utm') || '{}')
    } catch {}

    const payload: Record<string, string> = {
      name: name.trim(),
      phone: `+${phone.replace(/\D/g, '')}`,
      email: email.trim(),
      age: `${age} лет`,
      ...utms,
    }
    // Помечаем источник, если utm_source не пришёл — чтобы отличать лендинг в GetCourse
    if (!payload.utm_source) payload.utm_source = 'skorochtenie-free-lesson'
    if (document.referrer) payload.referer = document.referrer

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok || res.status === 202) {
        setSent(true)
        // на мобильном иначе человек остаётся у подвала и не видит экран успеха
        requestAnimationFrame(() => document.getElementById('form')?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
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

  const border = (bad?: string) => (bad ? 'border-orange border-2' : 'border-ink/60')
  const err = (m?: string) => m && <span className="mt-1.5 block px-5 text-[14px] font-medium text-orange-deep">{m}</span>
  const select = 'field-select'

  if (sent) {
    return (
      <div className="rounded-[20px] bg-white px-6 py-10 text-center">
        <div className="text-[24px] font-bold text-navy">Заявка принята</div>
        <p className="mx-auto mt-3 max-w-[420px] text-[16px] leading-[24px] text-ink">
          Позвоним в рабочее время в течение 2 часов, чтобы выбрать удобное время урока.
        </p>
        <p className="mx-auto mt-3 max-w-[420px] text-[15px] leading-[22px] text-muted">
          Позвоним с номера{' '}
          <a href={`tel:${PHONE_TEL}`} className="whitespace-nowrap font-semibold text-navy underline">{PHONE_HUMAN}</a>
          {' '}&mdash; сохраните, чтобы не пропустить.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-3">
      <div>
        <input type="text" name="name" autoComplete="name" placeholder="Введите ваше имя" value={name}
          onChange={(e) => { setName(e.target.value); clear('name') }} data-invalid={errors.name ? 'true' : undefined}
          aria-invalid={!!errors.name} className={`field ${border(errors.name)}`} />
        {err(errors.name)}
      </div>
      <div>
        <input type="email" name="email" autoComplete="email" placeholder="Введите ваш эл. адрес" value={email}
          onChange={(e) => { setEmail(e.target.value); clear('email') }} data-invalid={errors.email ? 'true' : undefined}
          aria-invalid={!!errors.email} className={`field ${border(errors.email)}`} />
        {err(errors.email)}
      </div>
      <div>
        <input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="Введите ваш телефон" value={phone}
          onChange={(e) => { setPhone(formatPhone(e.target.value)); clear('phone') }} data-invalid={errors.phone ? 'true' : undefined}
          aria-invalid={!!errors.phone} className={`field ${border(errors.phone)}`} />
        {err(errors.phone)}
      </div>

      <label className="mt-3 block">
        <span className="mb-2.5 block text-[18px] font-medium text-ink">Сколько лет вашему ребёнку?</span>
        <select value={age} onChange={(e) => { setAge(e.target.value); clear('age') }}
          data-invalid={errors.age ? 'true' : undefined} aria-invalid={!!errors.age}
          className={`field ${border(errors.age)} ${select} ${age ? '' : 'text-muted'}`}>
          <option value="" disabled>Выберите возраст</option>
          {AGES.map((a) => <option key={a} value={a} className="text-ink">{a} лет</option>)}
        </select>
        {err(errors.age)}
      </label>

      <button type="submit" disabled={busy}
        className="mx-auto mt-5 h-[64px] w-full rounded-full bg-orange px-9 text-[19px] font-bold text-white max-[300px]:px-4 max-[300px]:text-[17px] shadow-[0_8px_24px_-8px_rgba(239,100,50,.45)] transition-colors hover:bg-orange-hover disabled:opacity-70 sm:w-auto">
        {busy ? 'Отправляем…' : 'Записаться на бесплатный урок'}
      </button>

      {sendError && (
        <p className="text-center text-[14px] font-medium leading-snug text-orange-deep">
          {sendError} Или позвоните нам:{' '}
          <a href={`tel:${PHONE_TEL}`} className="whitespace-nowrap underline">{PHONE_HUMAN}</a>
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 text-[14px] leading-[20px] text-ink">
        <label className="flex items-start gap-2.5" data-invalid={errors.agree ? 'true' : undefined}>
          <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); clear('agree') }}
            className="mt-[3px] h-4 w-4 shrink-0 accent-navy" />
          <span>
            Подтверждаю, что ознакомлен(а) и принимаю условия{' '}
            <a href="https://matrius.online/publicofertamatrius" target="_blank" rel="noopener" className="text-navy underline">Оферты</a>{' '}и{' '}
            <a href="https://matrius.online/personaldata" target="_blank" rel="noopener" className="text-navy underline">согласие на обработку персональных данных</a>
          </span>
        </label>
        {errors.agree && <span className="-mt-1 pl-[26px] text-[14px] font-medium text-orange-deep">{errors.agree}</span>}
        <label className="flex items-start gap-2.5">
          <input type="checkbox" checked={news} onChange={(e) => setNews(e.target.checked)}
            className="mt-[3px] h-4 w-4 shrink-0 accent-navy" />
          <span>
            Хочу получать полезные материалы и новости по{' '}
            <a href="https://matrius.online/agreementmailing" target="_blank" rel="noopener" className="text-navy underline">согласию на рассылку</a>
          </span>
        </label>
      </div>
    </form>
  )
}
