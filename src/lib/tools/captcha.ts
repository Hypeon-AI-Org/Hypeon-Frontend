import { createHmac, timingSafeEqual } from 'node:crypto';

/*
 * Bot protection for the free tools.
 *
 * The first request from a page carries a Cloudflare Turnstile token. Turnstile
 * tokens are single-use, but one tool run makes several API calls, so a request
 * that passes the captcha gets back a short-lived signed "tool session" which
 * the page sends on its follow-up calls instead.
 *
 * Without TURNSTILE_SECRET_KEY (local development) every request is let through.
 */

const SESSION_TTL_MS = 30 * 60 * 1000;

function secret(): string | undefined {
  return process.env.TURNSTILE_SECRET_KEY?.trim() || undefined;
}

export function isCaptchaConfigured(): boolean {
  return Boolean(secret());
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const key = secret();
  if (!key) return true;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: key, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (e) {
    console.error('turnstile verify', e);
    return false;
  }
}

function sign(payload: string, key: string): string {
  return createHmac('sha256', key).update(payload).digest('base64url');
}

export function issueSession(ip: string): string | null {
  const key = secret();
  if (!key) return null;
  const payload = Buffer.from(JSON.stringify({ ip, exp: Date.now() + SESSION_TTL_MS })).toString('base64url');
  return `${payload}.${sign(payload, key)}`;
}

function verifySession(session: string, ip: string): boolean {
  const key = secret();
  if (!key) return true;
  const [payload, mac] = session.split('.');
  if (!payload || !mac) return false;
  const expected = Buffer.from(sign(payload, key));
  const given = Buffer.from(mac);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { ip?: string; exp?: number };
    return data.ip === ip && typeof data.exp === 'number' && data.exp > Date.now();
  } catch {
    return false;
  }
}

/** Accepts a still-valid tool session, otherwise a fresh Turnstile token. */
export async function passesBotCheck(
  body: { session?: unknown; turnstileToken?: unknown },
  ip: string
): Promise<boolean> {
  if (!isCaptchaConfigured()) return true;
  if (typeof body.session === 'string' && verifySession(body.session, ip)) return true;
  if (typeof body.turnstileToken === 'string' && body.turnstileToken) {
    return verifyTurnstile(body.turnstileToken, ip);
  }
  return false;
}
