import sharp from 'sharp';

import type { Grade } from './adRubric';

/*
 * The hook's "Pace & movement" grade, measured instead of asked. Each frame is
 * shrunk to 32x32 greyscale and compared with the next; the change is the mean
 * pixel difference as a percentage. Claude flipped between grades on the same
 * clip run to run; this gives the same answer every time.
 *
 * Calibrated on the test clips: a podcast talking head changes ~0.5% per half
 * second, handheld UGC with movement 4-7%, and a hard cut 15% or more.
 */

const SIDE = 32;
/** A jump this large between two frames is a cut, zoom or new angle. */
const CUT = 14;
/** Below this average change the shot is effectively still. */
const STILL = 2;

export type Pace = { grade: Grade; reason: string };

export async function measurePace(frames: Buffer[], times: number[]): Promise<Pace | null> {
  try {
    const px = await Promise.all(frames.map((f) => sharp(f).resize(SIDE, SIDE, { fit: 'fill' }).greyscale().raw().toBuffer()));
    const diffs = px.slice(1).map((b, i) => {
      let sum = 0;
      for (let k = 0; k < b.length; k++) sum += Math.abs(b[k] - px[i][k]);
      return (sum / b.length / 255) * 100;
    });
    if (!diffs.length) return null;
    const cut = diffs.findIndex((d) => d >= CUT);
    if (cut >= 0) {
      return { grade: 'good', reason: `The shot cuts or changes angle by ${times[cut + 1].toFixed(1)}s, which keeps the eye moving.` };
    }
    const mean = diffs.reduce((a, b) => a + b, 0) / diffs.length;
    if (mean >= STILL) return { grade: 'ok', reason: 'One continuous shot with movement, but no cut or new angle in the first 3 seconds.' };
    return { grade: 'poor', reason: 'The first 3 seconds are nearly still: one shot with almost no movement.' };
  } catch (e) {
    console.error('measurePace', e);
    return null;
  }
}
