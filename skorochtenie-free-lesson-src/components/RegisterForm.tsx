'use client'
import { useRef, useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const AGES = ['6–8 лет', '9–10 лет', '11–12 лет']
const ROLES = ['Родитель', 'Бабушка или дедушка', 'Другой родственник']

// ЗАГЛУШКА: форма валидирует поля и показывает экран успеха, но заявку никуда не отправляет.
// Когда будем подключать — POST на общий приёмщик Матриуса /skorochtenie-neuro/php/submit.php
// (FastAPI, успех = 202), payload как у skorochtenie-urok: name, email, phone, age, utm_* из sessionStorage 'mx_utm'.
export function RegisterForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [age, setAge] = useState(AGES[0])
  const [role, setRole] = useState(ROLES[0])
  const [agree, setAgree] = useState(false)
  const [news, setNews] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)
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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!name.trim()) next.name = 'Напишите, как к вам обращаться'
    if (!EMAIL_RE.test(email.trim())) next.email = 'Укажите корректную почту'
    if (phone.replace(/\D/g, '').length !== 11) next.phone = 'Введите номер полностью — 11 цифр'
    if (!agree) next.agree = 'Без согласия мы не сможем принять заявку'
    setErrors(next)
    if (Object.keys(next).length) {
      formRef.current?.querySelector<HTMLElement>('[data-invalid="true"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      return
    }
    console.info('[stub] заявка не отправлена — форма-заглушка', { name, email, phone, age, role, news })
    setSent(true)
    // на мобильном иначе человек остаётся у подвала и не видит экран успеха
    requestAnimationFrame(() => document.getElementById('form')?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
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
        <p className="mt-4 text-[13px] text-muted">Тестовый режим: форма пока никуда не отправляет данные.</p>
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
        <select value={age} onChange={(e) => setAge(e.target.value)} className={`field ${border()} ${select}`}>
          {AGES.map((a) => <option key={a}>{a}</option>)}
        </select>
      </label>
      <label className="mt-2 block">
        <span className="mb-2.5 block text-[18px] font-medium text-ink">Кто вы для ребёнка?</span>
        <select value={role} onChange={(e) => setRole(e.target.value)} className={`field ${border()} ${select}`}>
          {ROLES.map((r) => <option key={r}>{r}</option>)}
        </select>
      </label>

      <button type="submit"
        className="mx-auto mt-5 h-[64px] w-full rounded-full bg-orange px-9 text-[19px] font-bold text-white max-[300px]:px-4 max-[300px]:text-[17px] shadow-[0_8px_24px_-8px_rgba(239,100,50,.45)] transition-colors hover:bg-orange-hover sm:w-auto">
        Записаться на бесплатный урок
      </button>

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
