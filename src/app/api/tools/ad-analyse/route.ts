import { createHash } from 'node:crypto';
import { after, NextResponse } from 'next/server';

import {
  AD_MODEL,
  buildInstructions,
  PLACEMENTS,
  replySchema,
  toAnalysis,
  type AdAnalysis,
  type AdKind,
} from '@/lib/tools/adRubric';
import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import { getClientIp, toolError } from '@/lib/tools/http';
import { chat, isOpenRouterConfigured, type ContentPart } from '@/lib/tools/openrouter';
import { cacheGet, cacheSet, takeDailyQuota } from '@/lib/tools/store';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Ad analyses per visitor per day (re-analysing the same ad is cached and free). */
const DAILY_LIMIT = 10;
/**
 * Total decoded upload cap. Base64 adds a third, and Vercel rejects request
 * bodies over 4.5 MB, so 3 MB is the most that reliably gets through. The page
 * shrinks images to 1600px and video frames to 640px, well under this.
 */
const MAX_BYTES = 3 * 1024 * 1024;
/** Video frames the page samples: most from the first 3 seconds, plus the middle and the end. */
const MIN_FRAMES = 3;
const MAX_FRAMES = 12;
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

/** Decodes one data URL into its bytes, or null if it is not a real JPG/PNG/WebP. */
function decodeImage(dataUrl: unknown): { url: string; bytes: Buffer } | null {
  if (typeof dataUrl !== 'string') return null;
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const bytes = Buffer.from(match[2], 'base64');
  return looksLike(match[1], bytes) ? { url: dataUrl, bytes } : null;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const kind: AdKind = body.kind === 'video' ? 'video' : 'image';
  const placement = PLACEMENTS.find((p) => p.id === body.placement);
  const copy = typeof body.copy === 'string' ? body.copy.trim().slice(0, 500) : '';
  const width = Math.max(0, Math.min(20000, Math.round(Number(body.width) || 0)));
  const height = Math.max(0, Math.min(20000, Math.round(Number(body.height) || 0)));

  // An image ad is one picture; a video ad arrives as frames the page sampled from it.
  let images: { url: string; bytes: Buffer }[];
  let frameTimes: number[] = [];
  let duration = 0;
  if (kind === 'video') {
    const raw = Array.isArray(body.frames) ? body.frames.slice(0, MAX_FRAMES + 1) : [];
    if (raw.length < MIN_FRAMES || raw.length > MAX_FRAMES) return toolError('We could not read frames from that video. Try an MP4 file.', 400);
    const decoded = raw.map(decodeImage);
    if (decoded.some((d) => !d)) return toolError('We could not read frames from that video. Try an MP4 file.', 400);
    images = decoded as { url: string; bytes: Buffer }[];
    const times = Array.isArray(body.frameTimes) ? body.frameTimes : [];
    frameTimes = images.map((_, i) => Math.max(0, Math.round((Number(times[i]) || 0) * 10) / 10));
    duration = Math.max(0, Math.min(600, Number(body.duration) || 0));
  } else {
    const one = decodeImage(body.image);
    if (!one) return toolError('Upload a JPG, PNG or WebP image of your ad.', 400);
    images = [one];
  }
  if (images.reduce((n, i) => n + i.bytes.length, 0) > MAX_BYTES) {
    return toolError('That file is too large. Please use one under 3 MB.', 413);
  }
  if (!placement) return toolError('Choose where the ad will run.', 400);
  if (!isOpenRouterConfigured()) return toolError('This tool is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const hash = createHash('sha256').update(`${kind}|${placement.id}|${copy}|`);
  for (const img of images) hash.update(img.bytes);
  const cacheKey = `ad:v2:${hash.digest('hex').slice(0, 40)}`;
  const cached = await cacheGet<AdAnalysis>(cacheKey);
  if (cached) return NextResponse.json({ analysis: cached, session });

  if (!(await takeDailyQuota('ad-analyse', ip, DAILY_LIMIT))) {
    return toolError(`You have used today's ${DAILY_LIMIT} free analyses. Come back tomorrow, or try HypeOn Studio.`, 429);
  }

  const content: ContentPart[] = [
    { type: 'text', text: buildInstructions({ kind, placement, width, height, copy, frameTimes, duration }) },
  ];
  images.forEach((img, i) => {
    if (kind === 'video') content.push({ type: 'text', text: `Frame at ${frameTimes[i].toFixed(1)}s:` });
    content.push({ type: 'image_url', image_url: { url: img.url } });
  });
  const messages = [{ role: 'user' as const, content }];

  const review = async (model: string): Promise<ReturnType<typeof toAnalysis>> => {
    try {
      const data = await chat(model, messages, {
        temperature: 0,
        maxTokens: 1500,
        timeoutMs: 25_000,
        jsonSchema: replySchema(kind),
      });
      const text = data.choices?.[0]?.message?.content ?? '';
      return toAnalysis(JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}'), kind);
    } catch (e) {
      console.error('ad-analyse', kind, model, e);
      return null;
    }
  };

  const analysis = (await review(AD_MODEL)) ?? (await review(FALLBACK_MODEL));

  if (analysis === 'not_an_ad') {
    return toolError('This does not look like an ad. Upload the image or video you plan to run.', 422);
  }
  if (!analysis) return toolError('We could not analyse this ad right now. Please try again in a minute.', 502);

  const result = analysis;
  after(() => cacheSet(cacheKey, result, WEEK_MS));
  return NextResponse.json({ analysis: result, session });
}
