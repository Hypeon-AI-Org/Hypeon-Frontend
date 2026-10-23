import { createHash } from 'node:crypto';
import { after, NextResponse } from 'next/server';

import { AD_MODEL, buildInstructions, PLACEMENTS, REPLY_SCHEMA, toAnalysis, type AdAnalysis } from '@/lib/tools/adRubric';
import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import { getClientIp, toolError } from '@/lib/tools/http';
import { chat, isOpenRouterConfigured } from '@/lib/tools/openrouter';
import { cacheGet, cacheSet, takeDailyQuota } from '@/lib/tools/store';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Ad analyses per visitor per day (re-analysing the same ad is cached and free). */
const DAILY_LIMIT = 10;
/** The page shrinks images to ~1600px before upload; this cap leaves room for PNGs. */
const MAX_BYTES = 3 * 1024 * 1024;
/** Used if the main model fails, so a provider hiccup does not cost the visitor a check. */
const FALLBACK_MODEL = 'google/gemini-3.8-flash';
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Checks the bytes really are the image type the data URL claims (not just the label). */
function looksLike(mime: string, b: Buffer): boolean {
  if (mime === 'image/jpeg') return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  if (mime === 'image/png') return b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mime === 'image/webp') return b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP';
  return false;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const image = typeof body.image === 'string' ? body.image : '';
  const placement = PLACEMENTS.find((p) => p.id === body.placement);
  const copy = typeof body.copy === 'string' ? body.copy.trim().slice(0, 500) : '';
  const width = Math.max(0, Math.min(20000, Math.round(Number(body.width) || 0)));
  const height = Math.max(0, Math.min(20000, Math.round(Number(body.height) || 0)));

  const match = image.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return toolError('Upload a JPG, PNG or WebP image of your ad.', 400);
  const bytes = Buffer.from(match[2], 'base64');
  if (bytes.length > MAX_BYTES) return toolError('That image is too large. Please use one under 3 MB.', 413);
  if (!looksLike(match[1], bytes)) return toolError('That file does not look like a valid image.', 400);
  if (!placement) return toolError('Choose where the ad will run.', 400);
  if (!isOpenRouterConfigured()) return toolError('This tool is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const fingerprint = createHash('sha256').update(bytes).update(`|${placement.id}|${copy}`).digest('hex').slice(0, 40);
  const cacheKey = `ad:v1:${fingerprint}`;
  const cached = await cacheGet<AdAnalysis>(cacheKey);
  if (cached) return NextResponse.json({ analysis: cached, session });

  if (!(await takeDailyQuota('ad-analyse', ip, DAILY_LIMIT))) {
    return toolError(`You have used today's ${DAILY_LIMIT} free analyses. Come back tomorrow, or try HypeOn Studio.`, 429);
  }

  const messages = [
    {
      role: 'user' as const,
      content: [
        { type: 'text' as const, text: buildInstructions({ placement, width, height, copy }) },
        { type: 'image_url' as const, image_url: { url: image } },
      ],
    },
  ];

  let analysis: ReturnType<typeof toAnalysis> = null;
  for (const model of [AD_MODEL, FALLBACK_MODEL]) {
    try {
      const data = await chat(model, messages, {
        temperature: 0,
        maxTokens: 1500,
        timeoutMs: 25_000,
        jsonSchema: REPLY_SCHEMA,
      });
      const text = data.choices?.[0]?.message?.content ?? '';
      analysis = toAnalysis(JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}'));
      if (analysis) break;
    } catch (e) {
      console.error('ad-analyse', model, e);
    }
  }

  if (analysis === 'not_an_ad') {
    return toolError('This does not look like an ad. Upload the image or creative you plan to run.', 422);
  }
  if (!analysis) return toolError('We could not analyse this ad right now. Please try again in a minute.', 502);

  const result = analysis;
  after(() => cacheSet(cacheKey, result, WEEK_MS));
  return NextResponse.json({ analysis: result, session });
}
