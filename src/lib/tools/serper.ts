import { hostOf } from './domain';

/*
 * Live Google results through Serper (serper.dev). Google returns at most ten
 * organic results per request, so deeper positions cost one request (one
 * Serper credit) per extra page of ten.
 */

const ENDPOINT = 'https://google.serper.dev/search';

export function isSerperConfigured(): boolean {
  return Boolean(process.env.SERPER_API_KEY?.trim());
}

export type OrganicResult = { position: number; url: string; domain: string; title: string };

type SerperResponse = {
  organic?: { position?: number; link?: string; title?: string }[];
  message?: string;
};

/** One page (ten results) of Google for `query` in `countryCode`, positions numbered from the top of page 1. */
export async function googlePage(query: string, countryCode: string, page: number): Promise<OrganicResult[]> {
  const key = process.env.SERPER_API_KEY?.trim();
  if (!key) throw new Error('SERPER_API_KEY is not set');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'X-API-KEY': key, 'content-type': 'application/json' },
    body: JSON.stringify({ q: query, gl: countryCode.toLowerCase(), page }),
    signal: AbortSignal.timeout(15_000),
  });
  const data = (await res.json().catch(() => ({}))) as SerperResponse;
  if (!res.ok || !data.organic) throw new Error(`Serper ${res.status}: ${data.message ?? 'request failed'}`);

  // Serper numbers each page from 1, so offset by the pages before it.
  return data.organic
    .filter((o) => o.link)
    .map((o, i) => ({
      position: (page - 1) * 10 + (o.position ?? i + 1),
      url: o.link as string,
      domain: hostOf(o.link as string),
      title: (o.title ?? '').trim(),
    }));
}
