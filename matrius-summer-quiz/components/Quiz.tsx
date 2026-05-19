'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export type Answers = {
  age?: '7-9' | '10-11' | '12-13' | '14-15';
  screenTime?: '<1' | '1-4' | '4+';
  subject?:
    | 'russian'
    | 'math'
    | 'english'
    | 'speedread'
    | 'consult';
  name?: string;
  phone?: string;
  email?: string;
};

type Step = 1 | 2 | 3 | 4;

type Props = {
  initialAnswers: Answers;
  onBackToHero: () => void;
  onSuccess: (data: Answers) => void;
};

const AGE_OPTIONS: { value: NonNullable<Answers['age']>; label: string }[] = [
  { value: '7-9', label: '7–9 лет' },
  { value: '10-11', label: '10–11 лет' },
  { value: '12-13', label: '12–13 лет' },
  { value: '14-15', label: '14–15 лет' },
];

const SCREEN_OPTIONS: { value: NonNullable<Answers['screenTime']>; label: string }[] = [
  { value: '<1', label: 'Менее часа' },
  { value: '1-4', label: 'От 1 до 4 часов' },
  { value: '4+', label: 'Более 4 часов' },
];

const SUBJECT_OPTIONS: {
  value: NonNullable<Answers['subject']>;
  label: string;
  hint: string;
}[] = [
  {
    value: 'russian',
    label: 'Русский язык',
    hint: 'Улучшить понимание правил, сократить время на домашку, уменьшить количество ошибок',
  },
  {
    value: 'math',
    label: 'Математика',
    hint: 'Улучшить оценки, качество выполнения домашек, прокачать мышление',
  },
  {
    value: 'english',
    label: 'Английский язык',
    hint: 'Увеличить словарный запас, улучшить понимание правил, научиться говорить на языке',
  },
  {
    value: 'speedread',
    label: 'Скорочтение',
    hint: 'Увеличить скорость чтения, повысить качество ответа у доски, развить любовь к книгам',
  },
  {
    value: 'consult',
    label: 'Не знаю, нужна консультация',
    hint: 'Преподаватель подберёт подходящее направление по результатам диагностики',
  },
];

function formatPhone(input: string): string {
  const digits = input.replace(/\D/g, '').slice(0, 11);
  const d = digits.startsWith('8') || digits.startsWith('7') ? digits.slice(1) : digits;
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);
  let out = '+7';
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ')';
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

export default function Quiz({ initialAnswers, onBackToHero, onSuccess }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => (step / 4) * 100, [step]);

  const canNext =
    (step === 1 && !!answers.age) ||
    (step === 2 && !!answers.screenTime) ||
    (step === 3 && !!answers.subject) ||
    step === 4;

  function goBack() {
    setError(null);
    if (step === 1) onBackToHero();
    else setStep((s) => (s - 1) as Step);
  }

  function goNext() {
    setError(null);
    if (step < 4) setStep((s) => (s + 1) as Step);
  }

  function selectAndAdvance<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setError(null);
    window.setTimeout(() => {
      setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
    }, 250);
  }

  async function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const name = (answers.name ?? '').trim();
    const phone = (answers.phone ?? '').trim();
    const email = (answers.email ?? '').trim();
    if (!name) return setError('Укажите ваше имя');
    if (phone.replace(/\D/g, '').length < 11) return setError('Укажите корректный номер');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('Укажите корректный email');

    setSubmitting(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          answers: {
            age: answers.age,
            screenTime: answers.screenTime,
            subject: answers.subject,
          },
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'request-failed');
      }
      onSuccess({ ...answers, name, phone, email });
    } catch (err) {
      setError('Не удалось отправить. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card p-5 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-5">
          <span className="text-sm font-semibold text-navy-light">
            Шаг {step} из 4
          </span>
          <button
            type="button"
            onClick={goBack}
            className="text-sm font-semibold text-navy hover:opacity-70 transition-opacity"
            aria-label="Назад"
          >
            ← {step === 1 ? 'К началу' : 'Назад'}
          </button>
        </div>
        <div className="h-1.5 w-full rounded-sm bg-surface-tint overflow-hidden mb-7">
          <motion.div
            className="h-full bg-navy"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          key={`step-${step}`}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
        >
          {step === 1 && (
            <div>
              <h2 className="h2 mb-5">Сколько лет вашему ребёнку?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {AGE_OPTIONS.map((o) => (
                  <Option
                    key={o.value}
                    selected={answers.age === o.value}
                    onSelect={() => selectAndAdvance('age', o.value)}
                    label={o.label}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="h2 mb-5">
                Сколько времени в день ребёнок проводит с телефоном или за компьютером?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCREEN_OPTIONS.map((o) => (
                  <Option
                    key={o.value}
                    selected={answers.screenTime === o.value}
                    onSelect={() => selectAndAdvance('screenTime', o.value)}
                    label={o.label}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="h2 mb-2">Вам доступен бесплатный урок</h2>
              <p className="lead mb-5">
                Выберите направление, которое необходимо улучшить у вашего ребёнка
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SUBJECT_OPTIONS.map((o) => (
                  <SubjectOption
                    key={o.value}
                    selected={answers.subject === o.value}
                    onSelect={() => selectAndAdvance('subject', o.value)}
                    label={o.label}
                    hint={o.hint}
                  />
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={submitForm} className="space-y-4">
              <h2 className="h2 mb-2">Куда отправить материалы?</h2>
              <p className="lead mb-5">
                Заполните контакты — пришлём 8&nbsp;материалов для вашего ребёнка
              </p>
              <Field label="Имя родителя">
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={answers.name ?? ''}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, name: e.target.value }))
                  }
                  className="input"
                  placeholder="Анна"
                />
              </Field>
              <Field label="Телефон">
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  value={answers.phone ?? ''}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, phone: formatPhone(e.target.value) }))
                  }
                  className="input"
                  placeholder="+7 (___) ___-__-__"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={answers.email ?? ''}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, email: e.target.value }))
                  }
                  className="input"
                  placeholder="you@email.ru"
                />
              </Field>
              {error && (
                <p className="text-sm text-orange font-semibold">{error}</p>
              )}
              <p className="text-xs text-caption">
                Нажимая «Получить материалы», вы соглашаетесь с политикой конфиденциальности
              </p>
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={goBack}
                  className="btn-ghost sm:w-auto"
                >
                  Назад
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex-1 disabled:opacity-60"
                >
                  {submitting ? 'Отправляем…' : 'Получить материалы'}
                </button>
              </div>
            </form>
          )}
        </motion.div>

        {step !== 4 && (
          <div className="pt-6">
            <span className="text-xs text-caption">
              {step === 3
                ? 'Последний шаг до материалов'
                : `Осталось ${4 - step} ${step === 2 ? 'шага' : 'шагов'}`}
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 12px 14px;
          border-radius: 8px;
          border: 1.5px solid #e6e6e6;
          background: #ffffff;
          color: #212121;
          font-size: 16px;
          transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          outline: none;
        }
        :global(.input::placeholder) {
          color: #b8b8b8;
        }
        :global(.input:focus) {
          border-color: #385681;
          box-shadow: 0 0 0 3px rgba(56, 86, 129, 0.12);
        }
      `}</style>
    </div>
  );
}

function Option({
  selected,
  onSelect,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-lg px-4 py-4 border-[1.5px] transition-all duration-200 ease-in-out font-semibold text-[15px] ${
        selected
          ? 'border-navy bg-navy/5 text-navy'
          : 'border-surface-tint bg-white text-ink hover:border-navy-light hover:bg-surface-soft'
      }`}
    >
      <span className="inline-flex items-center gap-3">
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 ${
            selected ? 'border-navy' : 'border-gray-300'
          }`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-navy" />}
        </span>
        {label}
      </span>
    </button>
  );
}

function SubjectOption({
  selected,
  onSelect,
  label,
  hint,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left rounded-lg p-4 border-[1.5px] transition-all duration-200 ease-in-out ${
        selected
          ? 'border-navy bg-navy/5'
          : 'border-surface-tint bg-white hover:border-navy-light hover:bg-surface-soft'
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
            selected ? 'border-navy' : 'border-gray-300'
          }`}
        >
          {selected && <span className="h-2 w-2 rounded-full bg-navy" />}
        </span>
        <div>
          <div className="font-semibold text-[15px] text-navy mb-1">{label}</div>
          <div className="text-[13px] leading-snug text-muted">{hint}</div>
        </div>
      </div>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy mb-1.5">{label}</span>
      {children}
    </label>
  );
}
