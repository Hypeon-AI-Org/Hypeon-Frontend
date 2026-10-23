import { NextResponse } from 'next/server';

export function toolError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/** Vercel puts the visitor's address first in x-forwarded-for. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}
