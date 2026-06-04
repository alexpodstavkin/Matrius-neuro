'use client'

import { useState, FormEvent } from 'react'
import Reveal from './Reveal'

function formatPhoneFromDigits(rawDigits: string) {
  let d = rawDigits.slice(0, 11)
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (d.length && !d.startsWith('7')) d = '7' + d.slice(0, 10)
  const a = d.slice(1, 4)
  const b = d.slice(4, 7)
  const c = d.slice(7, 9)
  const e = d.slice(9, 11)
  if (!d) return ''
  let out = '+7'
  if (a) out += ` (${a}`
  if (a.length === 3) out += ')'
  if (b) out += ` ${b}`
  if (c) out += `-${c}`
  if (e) out += `-${e}`
  return out
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function CTAForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [childAge, setChildAge] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const digits = phone.replace(/\D/g, '')
    if (!name.trim()) {
      setStatus('error')
      setErrorMsg('Укажите имя')
      return
    }
    if (digits.length < 11) {
      setStatus('error')
      setErrorMsg('Укажите корректный телефон')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setErrorMsg('Укажите корректную почту')
      return
    }
    if (!childAge || Number(childAge) < 5 || Number(childAge) > 17) {
      setStatus('error')
      setErrorMsg('Укажите возраст ребёнка (5–17)')
      return
    }

    // UTM-метки из sessionStorage (сохранены при первой загрузке)
    let utms: Record<string, string> = {}
    try {
      utms = JSON.parse(sessionStorage.getItem('mx_utm') || '{}')
    } catch {}

    // По умолчанию — рабочий PHP-обработчик соседнего проекта на том же домене
    // (web.matrius.online/skorochtenie-neuro/php/submit.php), у него уже настроены
    // GC_ACCOUNT / GC_SECRET_KEY / GC_OFFER_CODE в .env на сервере.
    // Можно переопределить через NEXT_PUBLIC_LEAD_ENDPOINT.
    const endpoint =
      process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '/skorochtenie-neuro/php/submit.php'

    const payload: Record<string, string> = {
      name: name.trim(),
      phone: `+${digits}`,
      email: email.trim(),
      age: `${childAge} лет`,
      ...utms,
    }
    // Помечаем источник, если utm_source не пришёл — чтобы отличать в GC от skorochtenie-neuro
    if (!payload.utm_source) payload.utm_source = 'matrius-summer-school'
    if (typeof document !== 'undefined' && document.referrer) {
      payload.referer = document.referrer
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok || res.status === 202) {
        setStatus('success')
        return
      }
      const data = await res.json().catch(() => ({}))
      setStatus('error')
      if (res.status === 422) setErrorMsg('Проверьте правильность email и телефона.')
      else if (res.status === 429) setErrorMsg('Слишком много заявок. Попробуйте через минуту.')
      else setErrorMsg(data.error || 'Не удалось отправить заявку. Попробуйте ещё раз.')
    } catch {
      setStatus('error')
      setErrorMsg('Сеть недоступна. Попробуйте ещё раз.')
    }
  }

  return (
    <section id="form" className="relative">
      <div className="container-x section">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-stretch">
            {/* LEFT — navy bento с текстом */}
            <div className="col-span-1 md:col-span-6">
              <div className="shell h-full">
                <div className="dark-inner h-full rounded-[26px] bg-navy text-white p-6 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                  {/* Декоративные слои — только на md+ (на мобиле тяжело и не нужно) */}
                  <div
                    className="pointer-events-none absolute inset-0 hidden md:block"
                    style={{
                      backgroundImage: 'url(matrius-pattern.png)',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      opacity: 0.06,
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 hidden md:block"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 40%), radial-gradient(circle at 80% 80%, rgba(244,144,96,0.10), transparent 45%)',
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange/15 blur-3xl hidden md:block"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-navy-light/20 blur-3xl hidden md:block"
                    aria-hidden
                  />
                  <div className="relative">
                    <h2
                      className="font-bold text-orange leading-[1.05] tracking-[-0.02em] mb-6"
                      style={{ fontSize: 'clamp(2.5rem, 4.4vw, 4rem)' }}
                    >
                      Получить доступ к&nbsp;базе и&nbsp;диагностике
                    </h2>
                    <p
                      className="text-white/85 leading-relaxed"
                      style={{ fontSize: 'clamp(1.125rem, 1.6vw, 1.625rem)' }}
                    >
                      Заполните форму — мы&nbsp;предоставим доступ к&nbsp;материалам
                      и&nbsp;согласуем удобное время диагностики.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — белая bento с формой */}
            <div className="col-span-1 md:col-span-6">
              <div className="shell h-full">
                <div className="card-flush h-full p-6 md:p-8 lg:p-10">
                  {status === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange text-white text-2xl font-bold mb-4">
                        ✓
                      </div>
                      <h3 className="h3 text-navy">Спасибо за&nbsp;регистрацию!</h3>
                      <p className="text-ink/75 text-[15px] mt-3 leading-relaxed max-w-sm">
                        Доступ к&nbsp;закрытой базе знаний уже на&nbsp;вашей почте.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="grid gap-4 h-full" noValidate>
                      <div>
                        <label className="label" htmlFor="name">Имя</label>
                        <input
                          id="name"
                          className="input"
                          type="text"
                          required
                          placeholder="Как к вам обращаться"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="phone">Телефон</label>
                        <input
                          id="phone"
                          className="input"
                          type="tel"
                          required
                          placeholder="+7 (___) ___-__-__"
                          value={phone}
                          onChange={(e) => {
                            const raw = e.target.value
                            const newDigits = raw.replace(/\D/g, '')
                            const prevDigits = phone.replace(/\D/g, '')
                            // Если юзер удалил форматный символ (длина строки уменьшилась,
                            // но цифр столько же) — стираем последнюю цифру.
                            const digits =
                              raw.length < phone.length && newDigits.length === prevDigits.length
                                ? newDigits.slice(0, -1)
                                : newDigits
                            setPhone(formatPhoneFromDigits(digits))
                          }}
                          inputMode="tel"
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input
                          id="email"
                          className="input"
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="label" htmlFor="childAge">Возраст ребёнка</label>
                        <input
                          id="childAge"
                          className="input"
                          type="number"
                          min={5}
                          max={17}
                          required
                          placeholder="например, 9"
                          value={childAge}
                          onChange={(e) => setChildAge(e.target.value)}
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-orange text-sm">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        className="btn-primary w-full mt-1"
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? 'Отправляем…' : 'Получить доступ'}
                      </button>

                      <p className="text-center text-[12px] text-muted leading-relaxed">
                        Нажимая «Получить доступ», вы соглашаетесь с{' '}
                        <a
                          href="https://matrius.online/privacypolicy"
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-navy font-semibold underline underline-offset-2 hover:text-orange transition-colors"
                        >
                          политикой конфиденциальности
                        </a>{' '}
                        и&nbsp;обработкой персональных данных.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
