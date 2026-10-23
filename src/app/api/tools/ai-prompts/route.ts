import { after, NextResponse } from 'next/server';

import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import { countryName } from '@/lib/tools/countries';
import { PROMPT_WRITER_MODEL } from '@/lib/tools/engines';
import { normalizeDomain } from '@/lib/tools/domain';
import { getClientIp, toolError } from '@/lib/tools/http';
import { chat, isOpenRouterConfigured } from '@/lib/tools/openrouter';
import { readHomepage } from '@/lib/tools/siteText';
import { cacheGet, cacheSet, takeDailyQuota } from '@/lib/tools/store';

export const runtime = 'nodejs';
export const maxDuration = 30;

/** Domain look-ups per visitor per day (cache hits are free and not counted). */
const DAILY_LIMIT = 10;
const PROMPT_COUNT = 5;

type PromptSet = { brand: string; industry: string; prompts: string[] };

function parsePromptSet(text: string, domain: string): PromptSet | null {
  const json = text.match(/\{[\s\S]*\}/)?.[0];
  if (!json) return null;
  try {
    const data = JSON.parse(json) as Partial<PromptSet>;
    const prompts = (Array.isArray(data.prompts) ? data.prompts : [])
      .filter((p): p is string => typeof p === 'string')
      .map((p) => p.trim().replace(/^["“]|["”]$/g, ''))
      .filter((p) => p.length >= 5 && p.length <= 200)
      .slice(0, PROMPT_COUNT);
    if (prompts.length === 0) return null;
    return {
      brand: typeof data.brand === 'string' && data.brand.trim() ? data.brand.trim().slice(0, 60) : domain.split('.')[0],
      industry: typeof data.industry === 'string' ? data.industry.trim().slice(0, 60) : '',
      prompts,
    };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const domain = normalizeDomain(body.domain);
  const country = typeof body.country === 'string' ? countryName(body.country) : null;
  if (!domain) return toolError('Enter a valid domain, like example.com.', 400);
  if (!country) return toolError('Choose a country.', 400);
  if (!isOpenRouterConfigured()) return toolError('This tool is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const cacheKey = `ai-prompts:v1:${body.country}:${domain}`;
  const cached = await cacheGet<PromptSet>(cacheKey);
  if (cached) return NextResponse.json({ domain, ...cached, session });

  if (!(await takeDailyQuota('ai-prompts', ip, DAILY_LIMIT))) {
    return toolError(`You have used today's ${DAILY_LIMIT} free look-ups. Come back tomorrow, or book a demo for a full audit.`, 429);
  }

  const site = await readHomepage(domain);
  const siteInfo = site
    ? `Homepage title: ${site.title}\nMeta description: ${site.description}\nHomepage text: ${site.text}`
    : 'The homepage could not be read; infer the business from the domain name.';

  try {
    const data = await chat(
      PROMPT_WRITER_MODEL,
      [
        {
          role: 'system',
          content:
            'You research how potential customers use AI assistants. Reply with JSON only, no prose and no code fences.',
        },
        {
          role: 'user',
          content: `Website: ${domain}
Market: ${country}
${siteInfo}

Work out the business's brand name and a short industry label (2-4 words, add the city if it is a local business). Then write the ${PROMPT_COUNT} questions a potential customer in ${country} is most likely to type into ChatGPT when looking for what this business sells.

Rules:
- ${PROMPT_COUNT - 1} questions must NOT name the brand; they are category questions such as "best ... for ..." or "which ... should I ...".
- The last question names the brand, as a customer checking it out ("is <brand> good for ...").
- Short, natural, lowercase, like a real person types. No numbering.

JSON shape: {"brand": string, "industry": string, "prompts": string[]}`,
        },
      ],
      { maxTokens: 800, timeoutMs: 20_000 }
    );
    const set = parsePromptSet(data.choices?.[0]?.message?.content ?? '', domain);
    if (!set) return toolError('We could not work out what this site does. Try the live check below instead.', 502);

    after(() => cacheSet(cacheKey, set));
    return NextResponse.json({ domain, ...set, session });
  } catch (e) {
    console.error('ai-prompts', e);
    return toolError('Something went wrong on our side. Please try again in a minute.', 502);
  }
}
