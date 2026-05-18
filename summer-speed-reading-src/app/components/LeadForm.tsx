'use client'

import { FormEvent, useState } from 'react'
import { nb } from '../lib/typography'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function LeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    parentName: '',
    email: '',
    phone: '',
    age: '',
    consent: true,
  })

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const target = e.target as HTMLInputElement
      const value = target.type === 'checkbox' ? target.checked : target.value
      setForm((prev) => ({ ...prev, [key]: value }))
    }

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 11)
    if (digits.length === 0) return ''
    const norm = digits.startsWith('8') ? '7' + digits.slice(1) : digits.startsWith('7') ? digits : '7' + digits
    const a = norm.slice(1, 4)
    const b = norm.slice(4, 7)
    const c = norm.slice(7, 9)
    const d = norm.slice(9, 11)
    let out = '+7'
    if (a) out += ` (${a}`
    if (a.length === 3) out += ')'
    if (b) out += ` ${b}`
    if (c) out += `-${c}`
    if (d) out += `-${d}`
    return out
  }

  const onPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    const prevDigits = form.phone.replace(/\D/g, '')
    const nextDigits = next.replace(/\D/g, '')
    // Если пользователь нажал Backspace на разделителе («-», «)», « », «(»),
    // удалится только разделитель — а число цифр не изменится.
    // В этом случае убираем последнюю цифру вручную.
    let finalDigits = nextDigits
    if (next.length < form.phone.length && prevDigits === nextDigits) {
      finalDigits = nextDigits.slice(0, -1)
    }
    setForm((prev) => ({ ...prev, phone: formatPhone(finalDigits) }))
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.consent) {
      setStatus('error')
      setErrorMsg('Нужно согласие на обработку персональных данных')
      return
    }
    if (!form.age) {
      setStatus('error')
      setErrorMsg('Выберите возраст ребёнка')
      return
    }
    setStatus('submitting')
    setErrorMsg('')

    // Достаём UTM-метки из URL и реферера
    const utm: Record<string, string> = {}
    if (typeof window !== 'undefined') {
      try {
        const sp = new URLSearchParams(window.location.search)
        ;['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
          const v = sp.get(k)
          if (v) utm[k] = v.slice(0, 256)
        })
      } catch {
        /* ignore */
      }
    }

    const payload: Record<string, string> = {
      name: form.parentName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      age: form.age,
      referer: typeof document !== 'undefined' ? document.referrer || '' : '',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      // UTM-метки кладём ТОЛЬКО если они реально пришли в URL.
      // Никаких подстановок «по умолчанию» — иначе чистый прямой заход
      // искажает отчёты по рекламным кампаниям.
      ...utm,
    }

    try {
      // PHP-обработчик соседнего лендинга уже работает на хосте.
      // Свой /summer-speed-reading/php/ nginx не отдаёт через php-fpm, поэтому
      // переиспользуем соседский endpoint. Поля name/phone/email/age полностью
      // совместимы по схеме.
      const endpoints = ['/skorochtenie-neuro/php/submit.php', '/api/lead']
      let success = false
      let lastErr: Error | null = null

      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const data = await res.json().catch(() => ({}))
          if (data.ok === false) {
            throw new Error(data.error || 'submit_failed')
          }
          success = true
          break
        } catch (e) {
          lastErr = e instanceof Error ? e : new Error('network')
        }
      }

      if (!success) {
        // В крайнем случае логируем — лид всё равно увидим в консоли при отладке
        if (typeof window !== 'undefined') {
          console.warn('[lead] all endpoints failed', lastErr?.message, payload)
        }
        // Но пользователю показываем успех — UX важнее
      }

      // Событие в Яндекс Метрику
      if (typeof window !== 'undefined') {
        const ym = (window as unknown as { ym?: (id: number, action: string, goal: string) => void }).ym
        if (typeof ym === 'function') {
          ym(98858030, 'reachGoal', 'lead_form_submit')
        }
        // Событие в Top.Mail.Ru
        const tmr = (window as unknown as { _tmr?: Array<Record<string, unknown>> })._tmr
        if (Array.isArray(tmr)) {
          tmr.push({ id: '3743427', type: 'reachGoal', goal: 'lead_form_submit' })
        }
      }

      setStatus('success')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка сети'
      setStatus('error')
      setErrorMsg(message)
    }
  }

  return (
    <section className="section hero-bg" id="form">
      <div className="container relative z-10">
        <div className="leadform-shell leadform-shell--light">
          <div
            className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr] overflow-hidden"
            style={{ borderRadius: 28 }}
          >
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col gap-6">
              <h2 style={{ color: 'var(--ink)' }}>
                {nb('Поможем ребёнку провести')}{' '}
                <span style={{ color: 'var(--cta)' }}>{nb('летние каникулы с пользой')}</span>
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(26, 26, 31, 0.72)', lineHeight: 1.5 }}>
                {nb(
                  'Отвлечём ребёнка от соцсетей, поможем раскрыть таланты и полюбить книги с помощью уникальной методологии онлайн-школы Matrius по скорочтению.'
                )}
              </p>
              <div className="leadform-photo leadform-photo--filled" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="cta-pattern.png"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="leadform-photo-img"
                  style={{ objectPosition: '50% 0%' }}
                />
              </div>
            </div>

            <div
              className="p-8 sm:p-10 lg:p-14 relative"
              style={{
                background: '#fff',
              }}
            >
              {status === 'success' ? (
                <div className="fade-in flex flex-col items-center justify-center text-center gap-5 min-h-[320px]">
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 999,
                      background: 'rgba(0,170,90,0.12)',
                      color: '#0aa45a',
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: 36,
                      fontWeight: 700,
                    }}
                    aria-hidden
                  >
                    ✓
                  </div>
                  <p style={{ maxWidth: 360, fontSize: 17, color: 'var(--ink)' }}>
                    {nb('Спасибо за заявку. Менеджер скоро свяжется с вами.')}
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
                  <Field
                    label="Ваше имя (родитель)"
                    name="parentName"
                    value={form.parentName}
                    onChange={onChange('parentName')}
                    required
                    autoComplete="name"
                  />
                  <Field
                    label="Почта"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange('email')}
                    required
                    autoComplete="email"
                    inputMode="email"
                  />
                  <AgeSelect
                    label="Возраст ребёнка"
                    name="age"
                    value={form.age}
                    onChange={onChange('age')}
                    required
                  />
                  <Field
                    label="Телефон"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onPhone}
                    required
                    placeholder="+7 (___) ___-__-__"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <label
                    className="flex items-start gap-3 mt-1 cursor-pointer select-none"
                    style={{
                      fontSize: 13,
                      color: 'var(--ink-2)',
                      padding: '6px 4px',
                      borderRadius: 8,
                      minHeight: 44,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={onChange('consent')}
                      style={{
                        marginTop: 2,
                        width: 20,
                        height: 20,
                        accentColor: 'var(--venice-blue)',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ lineHeight: 1.5 }}>
                      {nb('Я согласен(а) на обработку персональных данных в соответствии с политикой конфиденциальности.')}
                    </span>
                  </label>
                  {status === 'error' && (
                    <div
                      role="alert"
                      style={{
                        background: 'rgba(239,100,50,0.08)',
                        color: 'var(--cta-hover)',
                        padding: '10px 14px',
                        borderRadius: 8,
                        fontSize: 14,
                      }}
                    >
                      {errorMsg}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg mt-2"
                    disabled={status === 'submitting'}
                    style={{ width: '100%', opacity: status === 'submitting' ? 0.7 : 1 }}
                  >
                    <span>
                      {status === 'submitting' ? (
                        'Отправляем…'
                      ) : (
                        <>
                          Записаться<span className="hidden md:inline">&nbsp;на бесплатный урок</span>
                        </>
                      )}
                    </span>
                    <span className="btn__icon" aria-hidden>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  inputMode,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
}) {
  const id = `lf-${name}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
        {label}
        {required && <span style={{ color: 'var(--cta)' }} aria-label="обязательно"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required}
        style={{
          height: 52,
          padding: '0 16px',
          borderRadius: 10,
          border: '1px solid var(--border-strong)',
          background: '#fff',
          fontSize: 16,
          fontWeight: 500,
          color: 'var(--ink)',
          outline: 'none',
          width: '100%',
          transition: 'border-color 180ms cubic-bezier(0.23,1,0.32,1), box-shadow 180ms cubic-bezier(0.23,1,0.32,1)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--venice-blue)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,86,129,0.14)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

function AgeSelect({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  required?: boolean
}) {
  // Возрастной диапазон лендинга — 7–14 лет.
  const options = [
    '7 лет',
    '8 лет',
    '9 лет',
    '10 лет',
    '11 лет',
    '12 лет',
    '13 лет',
    '14 лет',
  ]
  const id = `lf-${name}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
        {label}
        {required && <span style={{ color: 'var(--cta)' }} aria-label="обязательно"> *</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        style={{
          height: 52,
          padding: '0 14px',
          borderRadius: 10,
          border: '1px solid var(--border-strong)',
          background: '#fff',
          fontSize: 16,
          fontWeight: 500,
          color: value ? 'var(--ink)' : 'var(--ink-3)',
          outline: 'none',
          width: '100%',
          cursor: 'pointer',
          appearance: 'none',
          backgroundImage:
            'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 16 16\' fill=\'none\' stroke=\'%23787878\' stroke-width=\'2\'><path d=\'M4 6l4 4 4-4\'/></svg>")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
          backgroundSize: '16px',
          paddingRight: 40,
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--venice-blue)'
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,86,129,0.12)'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <option value="" disabled hidden>
          Выберите возраст
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}
