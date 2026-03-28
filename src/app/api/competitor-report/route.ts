import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

import {
  buildCompetitorReportHtml,
  hostnameToDisplayName,
} from '@/lib/competitorReportEmail';

/** Marketing site used for absolute asset URLs in emails when env/request would be non-public (e.g. localhost). */
const DEFAULT_EMAIL_PUBLIC_ORIGIN = 'https://hypeon.ai';

/** Matches Navbar app links; override with APP_SIGNUP_URL / NEXT_PUBLIC_APP_SIGNUP_URL if you use a dedicated signup URL. */
const DEFAULT_APP_SIGNUP_URL = 'https://app.hypeon.ai/login';

function getRequestOrigin(req: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (env) return env.replace(/\/$/, '');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  if (host) return `${proto}://${host}`;
  return 'http://localhost:3000';
}

function isNonPublicHost(hostname: string): boolean {
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  if (hostname.endsWith('.local')) return true;
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname)) return true;
  return false;
}

/**
 * Base URL for images linked in outbound email. Must be reachable from the public internet (not localhost).
 */
function resolveEmailPublicBaseUrl(req: Request): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || '').trim().replace(/\/$/, '');
  if (fromEnv) {
    try {
      if (!isNonPublicHost(new URL(fromEnv).hostname)) return fromEnv;
    } catch {
      /* ignore */
    }
  }

  try {
    const origin = getRequestOrigin(req);
    const { hostname } = new URL(origin);
    if (!isNonPublicHost(hostname)) return origin.replace(/\/$/, '');
  } catch {
    /* fall through */
  }

  return DEFAULT_EMAIL_PUBLIC_ORIGIN;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const websiteRaw = typeof body.website === 'string' ? body.website.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!websiteRaw || !email) {
      return NextResponse.json({ error: 'website and email are required' }, { status: 400 });
    }

    const normalizedUrl = /^https?:\/\//i.test(websiteRaw) ? websiteRaw : `https://${websiteRaw}`;
    let parsed: URL;
    try {
      parsed = new URL(normalizedUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid website URL' }, { status: 400 });
    }

    if (!/^https?:$/i.test(parsed.protocol)) {
      return NextResponse.json({ error: 'Invalid website URL' }, { status: 400 });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = Number(process.env.SMTP_PORT || 587);
    const mailFrom = process.env.MAIL_FROM;

    if (!host || !user || !pass || !mailFrom) {
      return NextResponse.json(
        { error: 'Email is not configured on the server' },
        { status: 503 }
      );
    }

    const competitorName = hostnameToDisplayName(parsed.toString());
    const imagePath = process.env.COMPETITOR_REPORT_PREVIEW_IMAGE_PATH || '/images/dashboard.webp';
    const pathPart = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    const explicitImage = process.env.COMPETITOR_REPORT_PREVIEW_IMAGE_URL?.trim();
    const imageUrl =
      explicitImage ||
      `${resolveEmailPublicBaseUrl(req)}${pathPart}`;

    const signupUrl = (
      process.env.APP_SIGNUP_URL ||
      process.env.NEXT_PUBLIC_APP_SIGNUP_URL ||
      DEFAULT_APP_SIGNUP_URL
    ).trim();

    const facebookPageUrl = (process.env.COMPETITOR_REPORT_FACEBOOK_PAGE_URL || '').trim();

    const html = buildCompetitorReportHtml({
      competitorName,
      reportImageUrl: imageUrl,
      signupUrl,
      facebookPageUrl,
    });

    const subject = `Hypeon: submission about ${competitorName}`;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const bcc = process.env.MAIL_TO?.trim();

    await transporter.sendMail({
      from: mailFrom,
      to: email,
      ...(bcc ? { bcc } : {}),
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('competitor-report', e);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
