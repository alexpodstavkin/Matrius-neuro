/**
 * Захват и хранение UTM-меток + отправка лида в GC-прокси.
 *
 * URL прокси: import.meta.env.VITE_GC_PROXY_URL.
 * Прокси (FastAPI или Cloudflare Worker) принимает JSON с полями
 *   { name, phone, email, age, child?, referer?, utm_source?, ... }
 * и сам делает серверный POST в GetCourse с секретным ключом.
 */

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type Utms = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = 'mx_utm';

/** Один раз при загрузке: вытащить UTM из URL, замержить с уже сохранёнными в sessionStorage. */
export function captureUtmsFromUrl(): void {
  if (typeof window === 'undefined') return;
  try {
    const url = new URLSearchParams(window.location.search);
    let stored: Utms = {};
    try {
      stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') as Utms;
    } catch {
      stored = {};
    }
    let changed = false;
    UTM_KEYS.forEach((k) => {
      const v = url.get(k);
      if (v) {
        stored[k] = v.slice(0, 256);
        changed = true;
      }
    });
    if (changed) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  } catch {
    /* sessionStorage может быть недоступен (приватный режим, sandbox) — игнорируем */
  }
}

export function readUtms(): Utms {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}') as Utms;
  } catch {
    return {};
  }
}

export interface LeadInput {
  name: string;
  phone: string;
  email: string;
  age: string;
  child?: string;
}

export interface LeadResult {
  ok: boolean;
  /** Когда прокси не задан в env — фронт отвечает локальным success, чтобы не ронять UX */
  skipped?: boolean;
  /** Сообщение для пользователя в случае ошибки */
  error?: string;
}

/** Отправка заявки в GC-прокси. Никогда не бросает — всегда возвращает структуру. */
export async function submitLead(input: LeadInput, signal?: AbortSignal): Promise<LeadResult> {
  // Дефолт — PHP-обработчик рядом с лендингом на том же домене.
  // Можно переопределить через .env.production: VITE_GC_PROXY_URL=https://your-proxy/...
  const envUrl = (import.meta.env.VITE_GC_PROXY_URL as string | undefined)?.trim();
  const url = envUrl || `${import.meta.env.BASE_URL}php/submit.php`;

  const utms = readUtms();
  const referer =
    typeof document !== 'undefined' && document.referrer ? document.referrer : undefined;

  const payload: Record<string, string> = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    age: input.age.trim(),
  };
  if (input.child && input.child.trim()) payload.child = input.child.trim();
  if (referer) payload.referer = referer;
  for (const k of UTM_KEYS) {
    const v = utms[k];
    if (v) payload[k] = v;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal,
    });
    if (res.status === 202) return { ok: true };
    if (res.ok) return { ok: true };

    if (res.status === 422) {
      return { ok: false, error: 'Проверьте правильность email и телефона.' };
    }
    if (res.status === 429) {
      return { ok: false, error: 'Слишком много заявок. Попробуйте через минуту.' };
    }
    return { ok: false, error: 'Не удалось отправить заявку. Попробуйте ещё раз.' };
  } catch (err) {
    if ((err as { name?: string }).name === 'AbortError') {
      return { ok: false, error: 'Отправка прервана.' };
    }
    return { ok: false, error: 'Сеть недоступна. Попробуйте ещё раз.' };
  }
}
