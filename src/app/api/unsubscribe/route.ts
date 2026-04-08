import { NextResponse } from 'next/server';

import { isDatabaseConfigured, recordUnsubscribe } from '@/lib/unsubscribeDb';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export async function GET(req: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: 'Unsubscribe is not configured on the server' },
      { status: 503 }
    );
  }

  let emailParam: string | null;
  try {
    emailParam = new URL(req.url).searchParams.get('email');
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const email = typeof emailParam === 'string' ? normalizeEmail(emailParam) : '';
  if (!email) {
    return NextResponse.json({ error: 'email query parameter is required' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    await recordUnsubscribe(email);
    return NextResponse.json({
      success: true,
      message: 'You have been unsubscribed successfully.',
    });
  } catch (e) {
    console.error('unsubscribe', e);
    return NextResponse.json({ error: 'Failed to save unsubscribe' }, { status: 500 });
  }
}
