'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  open: boolean;
  onClose: () => void;
};

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

export default function LeadModal({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSuccess(false);
      setError(null);
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const n = name.trim();
    const p = phone.trim();
    const em = email.trim();
    if (!n) return setError('Укажите ваше имя');
    if (p.replace(/\D/g, '').length < 11) return setError('Укажите корректный номер');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return setError('Укажите корректный email');

    setSubmitting(true);
    try {
      await fetch('api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: n, phone: p, email: em }),
      }).catch(() => null);
    } finally {
      setSubmitting(false);
      setSuccess(true);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="card relative w-full max-w-md p-6 md:p-8"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:text-navy hover:bg-surface-soft transition-colors"
            >
              ✕
            </button>

            {!success ? (
              <>
                <h2 className="h2 mb-2">Забрать базу знаний</h2>
                <p className="lead mb-5 text-[15px]">
                  Заполните контакты — пришлём материалы для&nbsp;вашего ребёнка на&nbsp;почту
                </p>
                <form onSubmit={submit} className="space-y-4">
                  <label className="block">
                    <span className="block text-sm font-semibold text-navy mb-1.5">Имя родителя</span>
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
                    <span className="block text-sm font-semibold text-navy mb-1.5">Телефон</span>
                    <input
                      type="tel"
                      required
                      inputMode="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      className="input"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-semibold text-navy mb-1.5">Email</span>
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
                  {error && <p className="text-sm text-orange font-semibold">{error}</p>}
                  <p className="text-xs text-caption">
                    Нажимая «Забрать бесплатно», вы&nbsp;соглашаетесь с&nbsp;политикой конфиденциальности
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {submitting ? 'Отправляем…' : 'Забрать бесплатно'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-orange/10 text-orange text-2xl font-bold mb-4">
                  ✓
                </div>
                <h2 className="h2 mb-3">Спасибо!</h2>
                <p className="lead mb-6">Материалы придут на&nbsp;указанную почту.</p>
                <button type="button" onClick={onClose} className="btn-ghost">
                  Закрыть
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const inputStyle = '';
