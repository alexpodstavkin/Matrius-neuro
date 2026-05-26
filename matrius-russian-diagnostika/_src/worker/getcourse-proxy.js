/**
 * Cloudflare Worker — прокси формы → GetCourse API.
 * Лендинг: matrius-russian-diagnostika (бесплатная диагностика по русскому, 1-4 класс).
 *
 * Принимает POST с JSON или application/x-www-form-urlencoded:
 *   { name, phone, email, age, child?, utm_*?, referer? }
 *
 * Делает серверный POST на https://<account>.getcourse.ru/pl/api/deals
 * с секретным ключом из env (ключ НЕ попадает в браузер).
 *
 * Env-переменные (wrangler secret put / Dashboard → Variables and Secrets):
 *   GC_ACCOUNT       — поддомен аккаунта (например `matrius`) или полный домен
 *   GC_SECRET_KEY    — ключ из админки GC: Настройки → Общее → API
 *   ALLOWED_ORIGIN   — origin сайта для CORS, по умолчанию https://web.matrius.online
 *
 * Оффер 8408464 захардкожен в этом файле (а не в env), чтобы избежать
 * случайной перегрузки общим GC_OFFER_CODE от соседнего Worker'а.
 *
 * Деплой:
 *   wrangler secret put GC_ACCOUNT
 *   wrangler secret put GC_SECRET_KEY
 *   wrangler deploy
 */

// ─── Константы лендинга ─────────────────────────────────────────────
const OFFER_CODE  = '8408464';
const LEAD_SOURCE = 'Matrius — Диагностика русского 1-4 класса';

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

// ─── Утилиты ────────────────────────────────────────────────────────
function corsHeaders(origin, allowed) {
  const allow = allowed && allowed !== '*' ? allowed : 'https://web.matrius.online';
  return {
    'Access-Control-Allow-Origin': origin === allow ? origin : allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

async function readPayload(request) {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    return await request.json();
  }
  const fd = await request.formData();
  const obj = {};
  for (const [k, v] of fd.entries()) obj[k] = v;
  return obj;
}

function sanitizePhone(s) {
  return String(s || '').replace(/\s+/g, '').slice(0, 32);
}

function pickName(name) {
  const trimmed = String(name || '').trim();
  if (!trimmed) return { first_name: '', last_name: '' };
  const parts = trimmed.split(/\s+/);
  return { first_name: parts[0], last_name: parts.slice(1).join(' ') || '' };
}

// SHA-1 → hex (для идемпотентного deal_number)
async function sha1Hex(text) {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-1', buf);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

// base64 от UTF-8 строки (btoa умеет только latin-1)
function utf8ToBase64(s) {
  return btoa(unescape(encodeURIComponent(s)));
}

// ─── Вызов GC API ───────────────────────────────────────────────────
async function gcCreateDeal(env, payload, session) {
  if (!env.GC_ACCOUNT || !env.GC_SECRET_KEY) {
    throw new Error('Worker env missing: GC_ACCOUNT / GC_SECRET_KEY');
  }

  const { first_name, last_name } = pickName(payload.name);

  // addfields в GC — ключи должны совпадать с названиями полей в админке
  const addfields = { 'Источник': LEAD_SOURCE };
  if (payload.age && String(payload.age).trim() !== '') {
    addfields['Возраст ребёнка'] = String(payload.age);
  }
  if (payload.child && String(payload.child).trim() !== '') {
    addfields['Имя ребёнка'] = String(payload.child);
  }

  const dealCommentParts = [`Источник: ${LEAD_SOURCE}`];
  if (payload.age)   dealCommentParts.push(`Возраст ребёнка: ${payload.age}`);
  if (payload.child) dealCommentParts.push(`Имя ребёнка: ${payload.child}`);

  // Идемпотентность: повторный submit того же email за минуту = один deal
  const minuteBucket = Math.floor(Date.now() / 60_000);
  const idemHash = (await sha1Hex(`${String(payload.email).toLowerCase()}|${OFFER_CODE}|${minuteBucket}`)).slice(0, 10);
  const dealNumber = `ru-${idemHash}`;

  const params = {
    user: {
      email: payload.email,
      phone: sanitizePhone(payload.phone),
      first_name,
      last_name,
      addfields,
    },
    system: { refresh_if_exists: 1, return_deal_number: 1 },
    session: session || {},
    deal: {
      offer_code:   OFFER_CODE,
      deal_status:  'Новый',
      deal_comment: dealCommentParts.join('\n'),
      deal_number:  dealNumber,
    },
  };

  const encoded = utf8ToBase64(JSON.stringify(params));
  const body = new URLSearchParams({
    action: 'add',
    key:    env.GC_SECRET_KEY,
    params: encoded,
  });

  // GC_ACCOUNT может быть поддоменом ('matrius') или полным доменом
  const host = env.GC_ACCOUNT.includes('.') ? env.GC_ACCOUNT : `${env.GC_ACCOUNT}.getcourse.ru`;
  const url  = `https://${host}/pl/api/deals`;

  const res = await fetch(url, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json; q=1.0, */*; q=0.1' },
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch {
    return { ok: false, status: res.status, raw: text.slice(0, 500), deal_number: dealNumber };
  }
  return { ok: !!data.success, gc: data, deal_number: dealNumber };
}

// ─── Worker entry ───────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
        status: 405, headers: { ...JSON_HEADERS, ...cors },
      });
    }

    let payload;
    try {
      payload = await readPayload(request);
    } catch {
      return new Response(JSON.stringify({ ok: false, error: 'invalid_body' }), {
        status: 400, headers: { ...JSON_HEADERS, ...cors },
      });
    }

    // Honeypot — на сайте есть скрытое поле `company`. Если бот его заполнил —
    // тихо отвечаем 202 и в GC не идём.
    if (payload.company && String(payload.company).trim() !== '') {
      return new Response(JSON.stringify({ ok: true, queued: true }), {
        status: 202, headers: { ...JSON_HEADERS, ...cors },
      });
    }

    if (!payload.email || !payload.phone || !payload.name) {
      return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), {
        status: 400, headers: { ...JSON_HEADERS, ...cors },
      });
    }

    // UTM-метки и referer — кладём в session GC (нужно для отчётов).
    const session = {
      utm_source:   payload.utm_source,
      utm_medium:   payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_content:  payload.utm_content,
      utm_term:     payload.utm_term,
      referer:      payload.referer || request.headers.get('referer') || '',
    };
    for (const k of Object.keys(session)) if (!session[k]) delete session[k];

    try {
      const result = await gcCreateDeal(env, payload, session);
      // Логируем (видно в `wrangler tail` или Cloudflare Dashboard → Worker → Logs).
      console.log(JSON.stringify({
        event: result.ok ? 'gc.ok' : 'gc.fail',
        deal_number: result.deal_number,
        gc_success:  result.gc?.success,
        user_id:     result.gc?.result?.user_id  ?? null,
        deal_id:     result.gc?.result?.deal_id  ?? null,
        error_message: result.gc?.result?.error_message ?? null,
      }));
      return new Response(JSON.stringify(result), {
        status: result.ok ? 202 : 502,
        headers: { ...JSON_HEADERS, ...cors },
      });
    } catch (e) {
      console.error('worker_error', String(e?.message || e));
      return new Response(
        JSON.stringify({ ok: false, error: 'worker_error', message: String(e?.message || e) }),
        { status: 500, headers: { ...JSON_HEADERS, ...cors } },
      );
    }
  },
};
