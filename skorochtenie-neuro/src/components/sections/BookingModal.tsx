import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { ages } from '../../data/content';
import { formatRussianPhone } from '../../lib/phoneMask';
import { submitLead } from '../../lib/leads';
import { Check, ArrowRight, Cross } from '../icons/icons';
import { useBooking } from '../ui/BookingContext';

const NBSP = ' ';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRIVACY_URL = 'https://matrius.online/privacypolicy';

type Field = 'parent' | 'phone' | 'email' | 'age';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, boolean>> & { consent?: boolean };

const REQUIRED: Field[] = ['parent', 'phone', 'email', 'age'];

const initialValues: Values = { parent: '', phone: '', email: '', age: '' };

export function BookingModal() {
  const { isOpen, close } = useBooking();
  const [values, setValues] = useState<Values>(initialValues);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && !ok) {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [isOpen, ok]);

  if (!isOpen) return null;

  const update = (field: Field, raw: string) => {
    const value = field === 'phone' ? formatRussianPhone(raw) : raw;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (value.trim() && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
    if (submitError) setSubmitError(null);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setSubmitError(null);

    const next: Errors = {};
    let firstInvalid: Field | null = null;
    for (const f of REQUIRED) {
      const v = values[f].trim();
      const invalid = f === 'email' ? !EMAIL_RE.test(v) : !v;
      next[f] = invalid;
      if (invalid && !firstInvalid) firstInvalid = f;
    }
    if (!consent) next.consent = true;
    setErrors(next);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    if (!consent) {
      document.getElementById('consent')?.focus();
      return;
    }

    setBusy(true);
    const result = await submitLead({
      name: values.parent,
      phone: values.phone,
      email: values.email,
      age: values.age,
    });
    setBusy(false);

    if (result.ok) {
      setOk(true);
      if (typeof window !== 'undefined') {
        const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
        if (Array.isArray(dl)) {
          dl.push({ event: 'lead_submitted', source: 'skorochtenie-neuro' });
        }
      }
    } else {
      setSubmitError(result.error || 'Не удалось отправить заявку.');
    }
  };

  const onChange = (field: Field) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => update(field, e.target.value);

  const onConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConsent(e.target.checked);
    if (e.target.checked && errors.consent) {
      setErrors((prev) => ({ ...prev, consent: false }));
    }
  };

  const reset = () => {
    setValues(initialValues);
    setConsent(false);
    setErrors({});
    setOk(false);
    setSubmitError(null);
  };

  const handleClose = () => {
    close();
    setTimeout(reset, 250);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={handleClose} aria-label="Закрыть">
          <Cross />
        </button>

        {!ok ? (
          <form onSubmit={onSubmit} noValidate>
            <h3 id="modal-title">{`Запишитесь на${NBSP}бесплатный урок по${NBSP}скорочтению`}</h3>
            <p className="muted">
              {`Менеджер свяжется с${NBSP}вами — подберём удобное время и${NBSP}ответим на${NBSP}вопросы`}
            </p>

            <div className={`form-row${errors.parent ? ' has-error' : ''}`}>
              <label htmlFor="parent">Ваше имя</label>
              <input
                id="parent" name="parent" type="text"
                ref={firstFieldRef}
                placeholder="Например, Мария" autoComplete="given-name" required
                value={values.parent} onChange={onChange('parent')}
                aria-invalid={errors.parent || undefined}
              />
              {errors.parent && <span className="form-error">Укажите ваше имя</span>}
            </div>

            <div className={`form-row${errors.phone ? ' has-error' : ''}`}>
              <label htmlFor="phone">Телефон</label>
              <input
                id="phone" name="phone" type="tel"
                placeholder="+7 (___) ___-__-__" autoComplete="tel" inputMode="tel" required
                value={values.phone} onChange={onChange('phone')}
                aria-invalid={errors.phone || undefined}
              />
              {errors.phone && <span className="form-error">Введите номер телефона</span>}
            </div>

            <div className={`form-row${errors.email ? ' has-error' : ''}`}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email" name="email" type="email"
                placeholder="vy@example.com" autoComplete="email" inputMode="email" required
                value={values.email} onChange={onChange('email')}
                aria-invalid={errors.email || undefined}
              />
              {errors.email && <span className="form-error">Введите корректный e-mail</span>}
            </div>

            <div className={`form-row${errors.age ? ' has-error' : ''}`}>
              <label htmlFor="age">Возраст ребёнка</label>
              <select
                id="age" name="age" required
                value={values.age} onChange={onChange('age')}
                aria-invalid={errors.age || undefined}
              >
                <option value="">Выберите</option>
                {ages.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
              {errors.age && <span className="form-error">Выберите возраст</span>}
            </div>

            <label className={`form-consent${errors.consent ? ' has-error' : ''}`} htmlFor="consent">
              <input
                id="consent" name="consent" type="checkbox"
                checked={consent} onChange={onConsentChange}
                aria-invalid={errors.consent || undefined}
                required
              />
              <span>
                Я согласен с{NBSP}
                <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>
              </span>
            </label>
            {errors.consent && (
              <span className="form-error" role="alert">Подтвердите согласие</span>
            )}

            <button
              type="submit"
              className="btn btn-accent btn-large form-submit"
              aria-busy={busy || undefined}
              disabled={busy}
            >
              {busy ? 'Отправляем…' : 'Записаться бесплатно'}
              <ArrowRight />
            </button>

            {submitError && (
              <p className="form-error" role="alert" style={{ marginTop: 10 }}>
                {submitError}
              </p>
            )}
          </form>
        ) : (
          <div className="form-success">
            <div className="check-big"><Check /></div>
            <h3>Спасибо за{NBSP}вашу регистрацию</h3>
            <p>{`Менеджер свяжется с${NBSP}вами в${NBSP}ближайшее время, чтобы подобрать удобное время урока.`}</p>
            <button type="button" className="btn btn-primary" onClick={handleClose} style={{ marginTop: 18 }}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
