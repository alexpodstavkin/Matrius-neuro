import { NextResponse } from 'next/server';

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  answers?: {
    age?: string;
    screenTime?: string;
    subject?: string;
  };
};

export async function POST(req: Request) {
  let body: Lead = {};
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad-json' }, { status: 400 });
  }

  const name = (body.name ?? '').trim();
  const phone = (body.phone ?? '').trim();
  const email = (body.email ?? '').trim();

  if (!name || !phone || !email) {
    return NextResponse.json(
      { ok: false, error: 'missing-fields' },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'bad-email' }, { status: 400 });
  }

  console.log('[lead]', {
    name,
    phone,
    email,
    answers: body.answers ?? {},
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
