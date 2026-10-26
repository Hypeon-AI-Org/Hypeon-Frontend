import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { after, NextResponse } from 'next/server';

import { rewritePiece, writeCopy, type PieceKind } from '@/lib/tools/adCopy';
import { isBedrockConfigured } from '@/lib/tools/bedrock';
import { extendTo } from '@/lib/tools/imageExtend';
import { issueSession, passesBotCheck } from '@/lib/tools/captcha';
import { getClientIp, toolError } from '@/lib/tools/http';
import { decodeImage } from '@/lib/tools/images';
import { cacheGet, cacheSet, takeDailyQuota } from '@/lib/tools/store';
import { canErase, grabText } from '@/lib/tools/textErase';

export const runtime = 'nodejs';
/** Making text editable takes ~45s (find + erase); writing copy ~10s. */
export const maxDuration = 120;

/*
 * The Ad Creative Editor's AI steps, one route:
 *   grab  - "Make text editable": Claude finds the ad text, Stability erases it,
 *           and the page recreates it as editable layers (the costly step)
 *   write   - Claude writes three sets of new ad text
 *   rewrite - Claude rewrites the one piece of text the visitor selected
 *   extend  - Stability Outpaint grows the image to an ad size's shape
 */
const LIMITS = { grab: 5, write: 20, rewrite: 30, extend: 40 } as const;
type Action = keyof typeof LIMITS;
/** The page shrinks images to 1600px first; Vercel rejects bodies over 4.5 MB. */
const MAX_BYTES = 3 * 1024 * 1024;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const FAILED: Record<Action, string> = {
  grab: 'We could not make the text editable right now. Please try again in a minute.',
  write: 'We could not write new text right now. Please try again in a minute.',
  rewrite: 'We could not rewrite this right now. Please try again in a minute.',
  extend: 'We could not extend the background right now. Please try again in a minute.',
};

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const action = (['grab', 'write', 'rewrite', 'extend'] as const).find((a) => a === body.action);
  if (!action) return toolError('Unknown request.', 400);

  const img = decodeImage(body.image);
  if (!img) return toolError('Upload a JPG, PNG or WebP image.', 400);
  if (img.bytes.length > MAX_BYTES) return toolError('That image is too large. Please use one under 3 MB.', 413);
  const ratio = Number(body.ratio);
  if (action === 'extend' && !(ratio >= 0.4 && ratio <= 2.5)) return toolError('Choose an ad size to extend to.', 400);
  if (action === 'grab' || action === 'extend') {
    const { width = 0, height = 0 } = await sharp(img.bytes).metadata().catch(() => ({ width: 0, height: 0 }));
    if (!canErase(width, height)) {
      return toolError('This image is too narrow or too small to edit. Use one between 1:2.5 and 2.5:1, at least 64px on each side.', 400);
    }
  }
  const text = (key: string, n: number) => (typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, n) : '');
  const currentText = text('currentText', 400);
  const instruction = text('instruction', 200);
  const piece = text('piece', 200);
  const kind: PieceKind = (['headline', 'subline', 'button', 'text'] as const).find((k) => k === body.kind) ?? 'text';
  if (action === 'rewrite' && !piece) return toolError('Type some text first, then ask AI to rewrite it.', 400);
  if (!isBedrockConfigured()) return toolError('This feature is not available right now. Please try again later.', 503);

  const ip = getClientIp(req);
  if (!(await passesBotCheck(body, ip))) return toolError('Please complete the security check and try again.', 403);
  const session = issueSession(ip);

  const hash = createHash('sha256').update(`${action}|${currentText}|${instruction}|${piece}|${kind}|${action === 'extend' ? ratio.toFixed(3) : ''}|`).update(img.bytes);
  const cacheKey = `creative:v8:${hash.digest('hex').slice(0, 40)}`;
  const cached = await cacheGet<Record<string, unknown>>(cacheKey);
  if (cached) return NextResponse.json({ ...cached, session });

  if (!(await takeDailyQuota(`creative-${action}`, ip, LIMITS[action]))) {
    return toolError(`You have used today's ${LIMITS[action]} free AI ${action === 'grab' ? 'text edits' : action === 'write' ? 'text sets' : action === 'extend' ? 'background extensions' : 'rewrites'}. Come back tomorrow, or try HypeOn Studio.`, 429);
  }

  let result: Record<string, unknown>;
  try {
    if (action === 'grab') {
      const grabbed = await grabText(img.bytes);
      if (grabbed === 'no_text') return toolError('We could not find any ad text in this image. Use + Text to add your own.', 422);
      result = grabbed;
    } else if (action === 'extend') {
      const extended = await extendTo(img.bytes, ratio);
      result = extended === 'fits' ? { fits: true } : extended;
    } else if (action === 'rewrite') {
      const options = await rewritePiece(img.url, { piece, kind, context: currentText, instruction });
      if (!options.length) throw new Error('no rewrites');
      result = { options };
    } else {
      const options = await writeCopy(img.url, { currentText, instruction });
      if (!options.length) throw new Error('no copy options');
      result = { options };
    }
  } catch (e) {
    console.error('creative-ai', action, e);
    return toolError(FAILED[action], 502);
  }

  after(() => cacheSet(cacheKey, result, WEEK_MS));
  return NextResponse.json({ ...result, session });
}
