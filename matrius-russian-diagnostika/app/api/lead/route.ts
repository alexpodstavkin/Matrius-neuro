import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

type LeadPayload = {
  parentName?: string
  email?: string
  phone?: string
  childAge?: number | null
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function digits(v: string) {
  return v.replace(/\D/g, '')
}

async function callGetcourse(params: URLSearchParams, account: string) {
  const url = `https://${account}.getcourse.ru/pl/api/users`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  const text = await res.text()
  return { ok: res.ok, status: res.status, raw: text }
}

export async function POST(req: NextRequest) {
  let body: LeadPayload = {}
  try {
    body = (await req.json()) as LeadPayload
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный JSON' }, { status: 400 })
  }

  const parentName = (body.parentName || '').trim()
  const email = (body.email || '').trim()
  const phoneRaw = (body.phone || '').trim()
  const phone = digits(phoneRaw)
  const childAge = body.childAge ?? null

  if (!parentName) {
    return NextResponse.json({ ok: false, error: 'Укажите имя' }, { status: 400 })
  }
  if (!email || !isEmail(email)) {
    return NextResponse.json({ ok: false, error: 'Укажите корректную почту' }, { status: 400 })
  }
  if (!phone || phone.length < 11) {
    return NextResponse.json({ ok: false, error: 'Укажите корректный телефон' }, { status: 400 })
  }
  if (childAge === null || typeof childAge !== 'number' || childAge < 5 || childAge > 17) {
    return NextResponse.json({ ok: false, error: 'Укажите возраст ребёнка (5–17)' }, { status: 400 })
  }

  const account = process.env.GETCOURSE_ACCOUNT
  const apiKey = process.env.GETCOURSE_API_KEY
  const groupId = process.env.GETCOURSE_GROUP_ID

  const lead = { parentName, email, phone, childAge, at: new Date().toISOString() }

  if (!account || !apiKey) {
    console.warn('[lead] GetCourse env not configured — accepting lead without forwarding', lead)
    return NextResponse.json({ ok: true, forwarded: false })
  }

  const userPayload = {
    user: {
      email,
      phone: `+${phone}`,
      first_name: parentName,
      addfields: {
        'Возраст_ребёнка': String(childAge),
        'Источник': 'Matrius — Диагностика русского 1-4 класса',
      },
      ...(groupId ? { group_name: groupId } : {}),
    },
    system: { refresh_if_exists: 1 },
  }
  const encoded = Buffer.from(JSON.stringify(userPayload)).toString('base64')
  const params = new URLSearchParams({ action: 'add', key: apiKey, params: encoded })

  const result = await callGetcourse(params, account)
  if (!result.ok) {
    console.error('[lead] GetCourse error', result.status, result.raw?.slice(0, 500))
    return NextResponse.json(
      { ok: false, error: 'Сервис временно недоступен. Попробуйте позже.' },
      { status: 502 }
    )
  }

  console.log('[lead] forwarded to GetCourse', { ...lead, status: result.status })
  return NextResponse.json({ ok: true, forwarded: true })
}
