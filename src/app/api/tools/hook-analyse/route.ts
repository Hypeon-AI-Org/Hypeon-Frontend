import { createHash } from 'node:crypto';
import { after, NextResponse } from 'next/server';

import { AD_MODEL } from '@/lib/tools/adRubric';
import { bedrockStructured, isBedrockConfigured } from '@/lib/tools/bedrock';
import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import {
  buildHookInstructions,
  combineHookAnalyses,
  withMeasuredPace,
  HOOK_PLATFORMS,
  HOOK_REPLY_SCHEMA,
  toHookAnalysis,
  type HookAnalysis,
} from '@/lib/tools/hookRubric';
import { getClientIp, toolError } from '@/lib/tools/http';
import { decodeImage } from '@/lib/tools/images';
import { measurePace } from '@/lib/tools/motion';
import { chat, isOpenRouterConfigured, type ContentPart } from '@/lib/tools/openrouter';
import { cacheGet, cacheSet, takeDailyQuota } from '@/lib/tools/store';

export const runtime = 'nodejs';
export const maxDuration = 60;

/** Hook checks per visitor per day (re-checking the same video is cached and free). */
const DAILY_LIMIT = 10;
/** Seven 640px JPEG frames are well under this; Vercel rejects bodies over 4.5 MB. */
const MAX_BYTES = 3 * 1024 * 1024;
/** The page sends a frame every half second from 0 to 3s; a clip under a second has too few. */
const MIN_FRAMES = 3;
const MAX_FRAMES = 8;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
/** Parallel Bedrock answers per check; the median grade of three outvotes a one-off flip. */
const BEDROCK_RUNS = 3;

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const platform = HOOK_PLATFORMS.find((p) => p.id === body.platform);
  const topic = typeof body.topic === 'string' ? body.topic.trim().slice(0, 200) : '';
  const width = Math.max(0, Math.min(20000, Math.round(Number(body.width) || 0)));
  const height = Math.max(0, Math.min(20000, Math.round(Number(body.height) || 0)));
  const duration = Math.max(0, Math.min(600, Number(body.duration) || 0));

  const raw = Array.isArray(body.frames) ? body.frames.slice(0, MAX_FRAMES + 1) : [];
  if (raw.length < MIN_FRAMES || raw.length > MAX_FRAMES) {
    return toolError('We could not read the first 3 seconds of that video. Try an MP4 at least 2 seconds long.', 400);
  }
  const decoded = raw.map(decodeImage);
  if (decoded.some((d) => !d)) return toolError('We could not read frames from that video. Try an MP4 file.', 400);
  const images = decoded as { url: string; bytes: Buffer }[];
  if (images.reduce((n, i) => n + i.bytes.length, 0) > MAX_BYTES) return toolError('Those frames are too large. Please try again.', 413);
  const times = Array.isArray(body.frameTimes) ? body.frameTimes : [];
  const frameTimes = images.map((_, i) => Math.max(0, Math.round((Number(times[i]) || 0) * 100) / 100));
  if (!platform) return toolError('Choose where the video will be posted.', 400);

  const useBedrock = isBedrockConfigured();
  if (!useBedrock && !isOpenRouterConfigured()) return toolError('This tool is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const hash = createHash('sha256').update(`${platform.id}|${topic}|`);
  for (const img of images) hash.update(img.bytes);
  const cacheKey = `hook:v7:${hash.digest('hex').slice(0, 40)}`;
  const cached = await cacheGet<HookAnalysis>(cacheKey);
  if (cached) return NextResponse.json({ analysis: cached, session });

  if (!(await takeDailyQuota('hook-analyse', ip, DAILY_LIMIT))) {
    return toolError(`You have used today's ${DAILY_LIMIT} free hook checks. Come back tomorrow, or try HypeOn Studio.`, 429);
  }

  const pace = await measurePace(images.map((i) => i.bytes), frameTimes);
  const content: ContentPart[] = [
    { type: 'text', text: buildHookInstructions({ platform, width, height, duration, frameTimes, topic, pace }) },
  ];
  images.forEach((img, i) => {
    content.push({ type: 'text', text: `Frame at ${frameTimes[i].toFixed(1)}s:` });
    content.push({ type: 'image_url', image_url: { url: img.url } });
  });

  // Claude on AWS Bedrock (paid from AWS credits) when its key is set; Claude on OpenRouter otherwise or if Bedrock fails.
  const viaBedrock = async () => {
    try {
      return toHookAnalysis((await bedrockStructured(content, HOOK_REPLY_SCHEMA, { timeoutMs: 25_000 })) as object, { width, height });
    } catch (e) {
      console.error('hook-analyse bedrock', e);
      return null;
    }
  };
  const viaOpenRouter = async () => {
    if (!isOpenRouterConfigured()) return null;
    try {
      const data = await chat(AD_MODEL, [{ role: 'user', content }], {
        temperature: 0,
        maxTokens: 1500,
        timeoutMs: 25_000,
        jsonSchema: HOOK_REPLY_SCHEMA,
      });
      const text = data.choices?.[0]?.message?.content ?? '';
      return toHookAnalysis(JSON.parse(text.match(/\{[\s\S]*\}/)?.[0] ?? '{}'), { width, height });
    } catch (e) {
      console.error('hook-analyse openrouter', e);
      return null;
    }
  };

  // Three Bedrock answers at once, combined per check (see combineHookAnalyses); OpenRouter is a single-answer fallback.
  let analysis: HookAnalysis | 'not_a_video' | null = null;
  if (useBedrock) {
    const runs = await Promise.all(Array.from({ length: BEDROCK_RUNS }, viaBedrock));
    const usable = runs.filter((r): r is HookAnalysis => !!r && r !== 'not_a_video');
    if (runs.filter((r) => r === 'not_a_video').length > usable.length) analysis = 'not_a_video';
    else if (usable.length) analysis = combineHookAnalyses(usable);
  }
  analysis ??= await viaOpenRouter();
  if (analysis && analysis !== 'not_a_video') analysis = withMeasuredPace(analysis, pace);

  if (analysis === 'not_a_video') {
    return toolError('This does not look like a Reel or TikTok. Upload the short video you plan to post.', 422);
  }
  if (!analysis) return toolError('We could not check this hook right now. Please try again in a minute.', 502);

  after(() => cacheSet(cacheKey, analysis, WEEK_MS));
  return NextResponse.json({ analysis, session });
}
