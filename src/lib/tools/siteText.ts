import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';

/*
 * Reads a visitor-supplied website's homepage so the prompt writer knows what
 * the business does. Because the URL comes from the public, every hop is
 * checked to resolve to a public address (no fetching our own infrastructure),
 * redirects are followed by hand, and the body is capped.
 */

const MAX_BYTES = 300_000;
const MAX_REDIRECTS = 3;
const TIMEOUT_MS = 6000;

function isPrivateAddress(address: string): boolean {
  if (isIP(address) === 4) {
    const [a, b] = address.split('.').map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }
  const v6 = address.toLowerCase();
  if (v6.startsWith('::ffff:')) return isPrivateAddress(v6.slice(7));
  return v6 === '::' || v6 === '::1' || v6.startsWith('fc') || v6.startsWith('fd') || v6.startsWith('fe80');
}

async function isPublicHost(hostname: string): Promise<boolean> {
  try {
    const addresses = await lookup(hostname, { all: true });
    return addresses.length > 0 && addresses.every((a) => !isPrivateAddress(a.address));
  } catch {
    return false;
  }
}

async function fetchPublicHtml(startUrl: string): Promise<string | null> {
  let url = startUrl;
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    const parsed = new URL(url);
    if (!/^https?:$/.test(parsed.protocol) || !(await isPublicHost(parsed.hostname))) return null;

    const res = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; HypeOnFreeTools/1.0; +https://hypeon.ai/tools)',
        accept: 'text/html',
      },
    });

    if (res.status >= 300 && res.status < 400) {
      const next = res.headers.get('location');
      if (!next) return null;
      url = new URL(next, url).toString();
      continue;
    }
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('text/html') || !res.body) return null;

    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (size < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      size += value.length;
    }
    await reader.cancel().catch(() => {});
    return new TextDecoder().decode(Buffer.concat(chunks));
  }
  return null;
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function firstMatch(html: string, re: RegExp): string {
  return decodeEntities(html.match(re)?.[1]?.replace(/<[^>]+>/g, ' ') ?? '')
    .replace(/\s+/g, ' ')
    .trim();
}

export type SiteSummary = { title: string; description: string; text: string };

/** Title, meta description and the opening visible text of the homepage; null if unreachable. */
export async function readHomepage(domain: string): Promise<SiteSummary | null> {
  let html: string | null = null;
  try {
    html = await fetchPublicHtml(`https://${domain}/`);
  } catch {
    html = null;
  }
  if (!html) return null;

  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description =
    firstMatch(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) ||
    firstMatch(html, /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i);
  const body = html
    .replace(/<(script|style|noscript|svg|template)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ');
  const text = decodeEntities(body).replace(/\s+/g, ' ').trim().slice(0, 2000);

  return { title, description, text };
}
