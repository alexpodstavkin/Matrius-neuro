/**
 * Cloudflare Worker — прокси формы → GetCourse API.
 *
 * Принимает POST с JSON или application/x-www-form-urlencoded:
 *   { name, phone, email, age }
 *
 * Делает серверный POST на https://<account>.getcourse.ru/pl/api/deals
 * с секретным ключом из env (ключ НЕ попадает в браузер).
 *
 * Env-переменные (в настройках Worker → Variables):
 *   GC_ACCOUNT       — поддомен аккаунта (например `matrius`)
 *   GC_SECRET_KEY    — секретный ключ из админки GC: Настройки → Общее → API
 *   GC_OFFER_CODE    — код оффера в GC (текстовый alias) или числовой ID
 *   ALLOWED_ORIGIN   — origin сайта для CORS, например https://web.matrius.online
 *
 * Деплой: через Wrangler (`wrangler deploy`) или скопировать
 * в Cloudflare Dashboard → Workers → Create → paste.
 */

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

function corsHeaders(origin, allowed) {
  const allow = allowed && allowed !== '*' ? allowed : '*';
  return {
    'Access-Control-Allow-Origin': origin === allow ? origin : allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
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

async function gcCreateDeal(env, payload, session) {
  if (!env.GC_ACCOUNT || !env.GC_SECRET_KEY || !env.GC_OFFER_CODE) {
    throw new Error('Worker env missing: GC_ACCOUNT / GC_SECRET_KEY / GC_OFFER_CODE');
  }

  const { first_name, last_name } = pickName(payload.name);
  const ageNote = payload.age ? `Возраст ребёнка: ${payload.age}` : '';

  const params = {
    user: {
      email: payload.email,
      phone: sanitizePhone(payload.phone),
      first_name,
      last_name,
      addfields: ageNote ? { 'Возраст ребёнка': payload.age } : undefined,
    },
    system: { refresh_if_exists: 1, return_deal_number: 1 },
    session: session || {},
    deal: {
      offer_code: env.GC_OFFER_CODE,
      deal_status: 'Новый',
      deal_comment: ageNote,
      deal_number: payload.deal_number || `web-${Date.now()}`,
    },
  };

  // Strip undefined nested objects
  if (!params.user.addfields) delete params.user.addfields;

  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(params))));
  const body = new URLSearchParams({
    action: 'add',
    key: env.GC_SECRET_KEY,
    params: encoded,
  });

  // GC_ACCOUNT может быть либо поддоменом (`matrius`), либо полным доменом (`school-genius.club`)
  const host = env.GC_ACCOUNT.includes('.') ? env.GC_ACCOUNT : `${env.GC_ACCOUNT}.getcourse.ru`;
  const url = `https://${host}/pl/api/deals`;
  const res = await fetch(url, {
    method: 'POST',
    body,
    headers: { Accept: 'application/json; q=1.0, */*; q=0.1' },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, status: res.status, raw: text.slice(0, 500) };
  }
  return { ok: !!data.success, gc: data };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const cors = corsHeaders(origin, env.ALLOWED_ORIGIN);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: cors });
    }

    let payload;
    try {
      payload = await readPayload(request);
    } catch {
      return new Response(JSON.stringify({ ok: false, error: 'invalid_body' }), {
        status: 400,
        headers: { ...JSON_HEADERS, ...cors },
      });
    }

    if (!payload.email || !payload.phone || !payload.name) {
      return new Response(JSON.stringify({ ok: false, error: 'missing_fields' }), {
        status: 400,
        headers: { ...JSON_HEADERS, ...cors },
      });
    }

    // Pull UTMs from referer or query if site forwarded them in payload
    const session = {
      utm_source: payload.utm_source,
      utm_medium: payload.utm_medium,
      utm_campaign: payload.utm_campaign,
      utm_content: payload.utm_content,
      utm_term: payload.utm_term,
      referer: payload.referer || request.headers.get('referer') || '',
    };
    Object.keys(session).forEach((k) => {
      if (!session[k]) delete session[k];
    });

    try {
      const result = await gcCreateDeal(env, payload, session);
      return new Response(JSON.stringify(result), {
        status: result.ok ? 200 : 502,
        headers: { ...JSON_HEADERS, ...cors },
      });
    } catch (e) {
      return new Response(
        JSON.stringify({ ok: false, error: 'worker_error', message: String(e?.message || e) }),
        { status: 500, headers: { ...JSON_HEADERS, ...cors } },
      );
    }
  },
};
