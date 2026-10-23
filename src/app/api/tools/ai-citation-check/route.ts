import { createHash } from 'node:crypto';
import { after, NextResponse } from 'next/server';

import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import { countryName } from '@/lib/tools/countries';
import { normalizeDomain } from '@/lib/tools/domain';
import { ENGINES, type EngineResult } from '@/lib/tools/engines';
import { getClientIp, toolError } from '@/lib/tools/http';
import { askEngine, isOpenRouterConfigured, toResult, type RawAnswer } from '@/lib/tools/openrouter';
import { cacheGetMany, cacheSet, takeDailyQuota } from '@/lib/tools/store';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Prompt checks per visitor per day. A domain look-up runs three (five with
 * "check more"), so this is about four full look-ups plus a few live checks.
 * Fully cached prompts are free.
 */
const DAILY_LIMIT = 20;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const domain = normalizeDomain(body.domain);
  const countryCode = typeof body.country === 'string' ? body.country : '';
  const country = countryName(countryCode);
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim().replace(/\s+/g, ' ') : '';
  const brand = typeof body.brand === 'string' ? body.brand.trim().slice(0, 60) : '';

  if (!domain) return toolError('Enter a valid domain, like example.com.', 400);
  if (!country) return toolError('Choose a country.', 400);
  if (prompt.length < 5 || prompt.length > 300) return toolError('Type a question between 5 and 300 characters.', 400);
  if (!isOpenRouterConfigured()) return toolError('This tool is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const promptHash = createHash('sha256').update(prompt.toLowerCase()).digest('hex').slice(0, 32);
  const keyFor = (engineId: string) => `ai-answer:v4:${engineId}:${countryCode}:${promptHash}`;

  const cached = await cacheGetMany<RawAnswer>(ENGINES.map((e) => keyFor(e.id)));
  if (cached.some((c) => !c) && !(await takeDailyQuota('ai-check', ip, DAILY_LIMIT))) {
    return toolError(`You have used today's free checks. Come back tomorrow, or book a demo for a full audit.`, 429);
  }

  const results: EngineResult[] = await Promise.all(
    ENGINES.map(async (engine, i) => {
      try {
        let raw = cached[i];
        if (!raw) {
          const fresh = await askEngine(engine, prompt, country);
          // Saved after the response is sent, so a slow database never delays the visitor.
          after(() => cacheSet(keyFor(engine.id), fresh));
          raw = fresh;
        }
        return toResult(engine, raw, domain, brand || domain.split('.')[0]);
      } catch (e) {
        console.error('ai-citation-check', engine.id, e);
        return { engine: engine.id, verdict: 'error' as const, answer: '', sources: [] };
      }
    })
  );

  return NextResponse.json({ domain, prompt, results, session });
}
