import { useEffect, useRef, useState, type FormEvent, type ChangeEvent } from 'react';
import { ages } from '../../data/content';
import { formatRussianPhone } from '../../lib/phoneMask';
import { Check, ArrowRight, Cross } from '../icons/icons';
import { useBooking } from '../ui/BookingContext';

const NBSP = ' ';

type Field = 'parent' | 'phone' | 'child' | 'age';
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, boolean>>;

const REQUIRED: Field[] = ['parent', 'phone', 'age'];

export function BookingModal() {
  const { isOpen, close } = useBooking();
  const [values, setValues] = useState<Values>({ parent: '', phone: '', child: '', age: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
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
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Errors = {};
    let firstInvalid: Field | null = null;
    for (const f of REQUIRED) {
      const empty = !values[f].trim();
      next[f] = empty;
      if (empty && !firstInvalid) firstInvalid = f;
    }
    setErrors(next);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setOk(true);
    }, 200);
  };

  const onChange = (field: Field) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => update(field, e.target.value);

  const reset = () => {
    setValues({ parent: '', phone: '', child: '', age: '' });
    setErrors({});
    setOk(false);
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
            <h3 id="modal-title">{`Запись на${NBSP}бесплатный урок`}</h3>
            <p className="muted">
              {`Менеджер свяжется в${NBSP}течение 15${NBSP}минут — подберём удобное время.`}
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

            <div className="form-grid-2">
              <div className="form-row">
                <label htmlFor="child">Имя ребёнка</label>
                <input
                  id="child" name="child" type="text"
                  placeholder="Имя" autoComplete="off"
                  value={values.child} onChange={onChange('child')}
                />
              </div>
              <div className={`form-row${errors.age ? ' has-error' : ''}`}>
                <label htmlFor="age">Возраст</label>
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
            </div>

            <button
              type="submit"
              className="btn btn-accent btn-large form-submit"
              aria-busy={busy || undefined}
              disabled={busy}
            >
              Записаться бесплатно
              <ArrowRight />
            </button>

            <p className="form-disclaimer">
              {`Нажимая кнопку, вы${NBSP}соглашаетесь с${NBSP}`}
              <a href="#">политикой обработки персональных данных</a>.
            </p>
          </form>
        ) : (
          <div className="form-success">
            <div className="check-big"><Check /></div>
            <h3>Заявка принята!</h3>
            <p>{`Менеджер свяжется в${NBSP}течение 15${NBSP}минут, чтобы${NBSP}подобрать удобное время.`}</p>
            <button type="button" className="btn btn-primary" onClick={handleClose} style={{ marginTop: 18 }}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
