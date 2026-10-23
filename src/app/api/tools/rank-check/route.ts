import { createHash } from 'node:crypto';
import { after, NextResponse } from 'next/server';

import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import { countryName } from '@/lib/tools/countries';
import { isSameSite, normalizeDomain } from '@/lib/tools/domain';
import { getClientIp, toolError } from '@/lib/tools/http';
import { googlePage, isSerperConfigured, type OrganicResult } from '@/lib/tools/serper';
import { cacheGet, cacheSet, takeDailyQuota } from '@/lib/tools/store';

export const runtime = 'nodejs';
export const maxDuration = 30;

/** Rank checks per visitor per day (cache hits are free and not counted). */
const DAILY_LIMIT = 20;
/** Pages of ten searched before giving up: the top 30, at most three Serper credits a check. */
const MAX_PAGES = 3;

/** The results for one keyword in one country, as deep as anyone has needed so far. */
type Serp = { results: OrganicResult[]; pages: number };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const domain = normalizeDomain(body.domain);
  const countryCode = typeof body.country === 'string' ? body.country : '';
  const country = countryName(countryCode);
  const keyword = typeof body.keyword === 'string' ? body.keyword.trim().replace(/\s+/g, ' ') : '';

  if (!domain) return toolError('Enter a valid domain, like example.com.', 400);
  if (keyword.length < 2 || keyword.length > 100) return toolError('Type a keyword between 2 and 100 characters.', 400);
  if (!country) return toolError('Choose a country.', 400);
  if (!isSerperConfigured()) return toolError('This tool is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const keywordHash = createHash('sha256').update(keyword.toLowerCase()).digest('hex').slice(0, 32);
  const cacheKey = `rank:v1:${countryCode}:${keywordHash}`;
  const find = (s: Serp) => s.results.find((r) => isSameSite(r.domain, domain)) ?? null;

  let serp = (await cacheGet<Serp>(cacheKey)) ?? { results: [], pages: 0 };
  const startPages = serp.pages;

  if (!find(serp) && serp.pages < MAX_PAGES) {
    if (!(await takeDailyQuota('rank-check', ip, DAILY_LIMIT))) {
      return toolError(`You have used today's ${DAILY_LIMIT} free checks. Come back tomorrow, or book a demo for a full audit.`, 429);
    }
    try {
      while (!find(serp) && serp.pages < MAX_PAGES) {
        const next = await googlePage(keyword, countryCode, serp.pages + 1);
        // A short page means Google has nothing deeper, so treat the keyword as fully searched.
        serp = { results: [...serp.results, ...next], pages: next.length < 10 ? MAX_PAGES : serp.pages + 1 };
      }
    } catch (e) {
      console.error('rank-check', e);
      if (!serp.results.length) return toolError('Something went wrong on our side. Please try again in a minute.', 502);
    }
    if (serp.pages > startPages) after(() => cacheSet(cacheKey, serp));
  }

  const hit = find(serp);
  return NextResponse.json({
    domain,
    keyword,
    country,
    position: hit?.position ?? null,
    url: hit?.url ?? null,
    depth: serp.results.at(-1)?.position ?? 0,
    top: serp.results.slice(0, 10),
    session,
  });
}
