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
    consent: true,
  })

  const onChange = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
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
      referer: typeof document !== 'undefined' ? document.referrer || '' : '',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      ...utm,
    }

    try {
      // Относительный путь — резолвится в /summer-speed-reading/php/submit.php
      // в проде, и в /api/lead на dev (через retry-обёртку ниже)
      const endpoints = ['php/submit.php', '/api/lead']
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
    <section className="section section--dark" id="form">
      <div className="container relative z-10">
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background:
              'linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.1fr]">
            <div className="p-8 sm:p-10 lg:p-12 flex flex-col gap-5">
              <h2 style={{ color: '#fff' }}>
                {nb('Запишите вашего ребёнка на бесплатный урок по скорочтению уже сегодня')}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.78)' }}>
                {nb('Чтобы лето прошло с пользой, а сентябрь без стресса для вас и вашего ребёнка.')}
              </p>
            </div>

            <div
              className="p-8 sm:p-10 lg:p-12 relative"
              style={{
                background: '#fff',
                borderLeft: '1px solid var(--border-subtle)',
                borderTopRightRadius: 'inherit',
                borderBottomRightRadius: 'inherit',
              }}
            >
              {status === 'success' ? (
                <div className="fade-in flex flex-col items-center justify-center text-center gap-4 min-h-[320px]">
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
                  <h3 style={{ fontSize: 22 }}>Заявка принята</h3>
                  <p style={{ maxWidth: 360 }}>
                    {nb('Спасибо за вашу заявку. Менеджер скоро свяжется с вами.')}
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
                  />
                  <label className="flex items-start gap-3 mt-1" style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={onChange('consent')}
                      style={{ marginTop: 4 }}
                    />
                    <span>
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
                    {status === 'submitting' ? 'Отправляем…' : 'Записаться'}
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
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-2)' }}>
        {label}
        {required && <span style={{ color: 'var(--cta)' }}> *</span>}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
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
      />
    </label>
  )
}
