'use client';

import { useState } from 'react';

function formatPhoneFromDigits(rawDigits: string): string {
  let d = rawDigits.slice(0, 11);
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (d.length && !d.startsWith('7')) d = '7' + d.slice(0, 10);
  if (!d) return '';
  const a = d.slice(1, 4);
  const b = d.slice(4, 7);
  const c = d.slice(7, 9);
  const e = d.slice(9, 11);
  let out = '+7';
  if (a) out += ` (${a}`;
  if (a.length === 3) out += ')';
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (e) out += `-${e}`;
  return out;
}

type Props = {
  variant?: 'light' | 'dark';
  submitLabel?: string;
  onSuccess?: () => void;
};

// PHP-обработчик скорочтения обслуживает все лендинги (как у matrius-summer-school).
// Лендинг отличаем через offer_code в payload + utm_source.
const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT || '/skorochtenie-neuro/php/submit.php';

// Оффер этого лендинга (диагностика русского 1-4 класса).
const OFFER_CODE = '8408464';

// Источник по умолчанию — используется, если в URL не пришёл utm_source с рекламы.
const DEFAULT_UTM_SOURCE = 'matrius-russian-diagnostika';

export default function LeadForm({ variant = 'light', submitLabel = 'Записаться', onSuccess }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [childAge, setChildAge] = useState('');
  const [company, setCompany] = useState(''); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onPhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const newDigits = raw.replace(/\D/g, '');
    const prevDigits = phone.replace(/\D/g, '');
    // Если юзер удалил форматный символ (длина строки уменьшилась,
    // но цифр осталось столько же) — снимаем последнюю цифру.
    const digits =
      raw.length < phone.length && newDigits.length === prevDigits.length
        ? newDigits.slice(0, -1)
        : newDigits;
    setPhone(formatPhoneFromDigits(digits));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const p = phone.trim();
    const em = email.trim();
    const age = childAge ? Number(childAge) : NaN;
    if (!n) return setError('Укажите ваше имя');
    if (p.replace(/\D/g, '').length < 11) return setError('Укажите корректный номер');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setError('Укажите корректный email');
    if (!Number.isInteger(age) || age < 5 || age > 17) return setError('Укажите возраст ребёнка (5–17)');

    setSubmitting(true);
    try {
      // utm-метки и referer из браузера, передаём PHP-обработчику
      const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
      const utm: Record<string, string> = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
        const v = params.get(k);
        if (v) utm[k] = v;
      });
      if (typeof document !== 'undefined' && document.referrer) {
        utm['referer'] = document.referrer;
      }
      // Если рекламная кампания не передала utm_source — маркируем сами,
      // чтобы в GC лиды этого лендинга можно было отделить от других.
      if (!utm['utm_source']) utm['utm_source'] = DEFAULT_UTM_SOURCE;

      const res = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: n,
          phone: p,
          email: em,
          age: String(age),
          offer_code: OFFER_CODE,  // override общего GC_OFFER_CODE в submit.php
          company,                 // honeypot — на бэке если не пустой → 202 silent
          ...utm,
        }),
      });
      const data = await res.json().catch(() => ({ ok: false }));
      if (!res.ok || !data.ok) {
        setError(data.error === 'validation_failed'
          ? 'Проверьте поля и попробуйте ещё раз.'
          : 'Не удалось отправить. Попробуйте ещё раз.');
        return;
      }
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch {
      setError('Сеть недоступна. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  const labelClass =
    variant === 'dark'
      ? 'block text-sm font-semibold text-white/90 mb-1.5'
      : 'block text-sm font-semibold text-navy mb-1.5';
  const captionClass =
    variant === 'dark' ? 'text-xs text-white/60' : 'text-xs text-caption';
  const captionLinkClass =
    variant === 'dark'
      ? 'text-orange font-semibold underline underline-offset-2 hover:text-white transition-colors'
      : 'text-navy font-semibold underline underline-offset-2 hover:text-orange transition-colors';

  if (success) {
    return (
      <div className="text-center py-2">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange text-2xl font-bold mb-4">
          ✓
        </div>
        <h3 className={variant === 'dark' ? 'h3 text-white mb-3' : 'h3 text-navy mb-3'}>Спасибо!</h3>
        <p className={variant === 'dark' ? 'text-white/80 text-[15px] leading-relaxed' : 'lead'}>
          Скоро свяжемся, чтобы согласовать удобное время диагностики.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      {/* Honeypot — невидимое для людей поле, ловит ботов */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        aria-hidden="true"
      />
      <label className="block">
        <span className={labelClass}>Имя родителя</span>
        <input
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="Анна"
        />
      </label>
      <label className="block">
        <span className={labelClass}>Телефон</span>
        <input
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          value={phone}
          onChange={onPhoneChange}
          className="input"
          placeholder="+7 (___) ___-__-__"
        />
      </label>
      <label className="block">
        <span className={labelClass}>Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="you@email.ru"
        />
      </label>
      <label className="block">
        <span className={labelClass}>Возраст ребёнка</span>
        <input
          type="number"
          required
          min={5}
          max={17}
          value={childAge}
          onChange={(e) => setChildAge(e.target.value)}
          className="input"
          placeholder="например, 8"
        />
      </label>
      {error && <p className="text-sm text-orange font-semibold">{error}</p>}
      <p className={captionClass}>
        С&nbsp;вами свяжется специалист и&nbsp;согласует удобное время диагностики. Нажимая «{submitLabel}», вы&nbsp;соглашаетесь с&nbsp;
        <a
          href="https://matrius.online/privacypolicy"
          target="_blank"
          rel="noreferrer noopener"
          className={captionLinkClass}
        >
          политикой конфиденциальности
        </a>.
      </p>
      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full disabled:opacity-60"
      >
        {submitting ? 'Отправляем…' : submitLabel}
      </button>
    </form>
  );
}
