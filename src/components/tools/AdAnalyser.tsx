'use client';

import { useRef, useState, type DragEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clapperboard, Film, ImagePlus, X } from 'lucide-react';

import { Container, STUDIO_URL } from '@/components/home/ui';
import { PLACEMENTS, type AdAnalysis, type Grade, type PlacementId } from '@/lib/tools/adRubric';
import { ResultShell, ToolHero } from './sections';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { inputClass, labelClass, submitClass } from './ui';

const ease = [0.22, 1, 0.36, 1] as const;
/** Longest side sent to the model: plenty for judging an ad, and keeps uploads small. */
const MAX_SIDE = 1600;
/** Video frames are smaller: ten of them have to fit in one upload. */
const FRAME_SIDE = 640;
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm'];
/** Only the frames leave the browser, so the file itself can be large. */
const MAX_VIDEO_BYTES = 500 * 1024 * 1024;
/** Seconds sampled at the start, where the hook lives; the middle and end are added per clip. */
const HOOK_TIMES = [0.1, 0.5, 1, 1.5, 2, 3];

type Picked =
  | { kind: 'image'; dataUrl: string; width: number; height: number; name: string }
  | { kind: 'video'; dataUrl: string; frames: string[]; times: number[]; duration: number; width: number; height: number; name: string };

/** What visitors see before they upload. Illustrative review of a fictional ad. */
const EXAMPLE: AdAnalysis = {
  score: 63,
  summary: 'A strong product shot that loses people because the offer and next step are hard to find.',
  checks: [
    { id: 'hook', name: 'Hook', grade: 'good', reason: 'The bright orange bottle on a dark background stands out in a feed.' },
    { id: 'clarity', name: 'Message clarity', grade: 'ok', reason: '“Glow Serum” is clear, but the 30% discount is buried in small text.' },
    { id: 'cta', name: 'Call to action', grade: 'poor', reason: 'There is no button or instruction telling people what to do next.' },
    { id: 'visual', name: 'Visual & branding', grade: 'good', reason: 'One focal point and the logo is visible in the top corner.' },
    { id: 'readability', name: 'Text & readability', grade: 'ok', reason: 'Four lines of copy are too small to read on a phone.' },
    { id: 'fit', name: 'Platform fit', grade: 'poor', reason: 'A landscape image wastes space in a portrait 4:5 feed slot.' },
  ],
  fixes: [
    'Add a “Shop now” button in the bottom third of the image.',
    'Move “30% off today” into a large badge next to the bottle.',
    'Crop to 4:5 portrait so the product fills the feed.',
  ],
  headlines: ['Glow in 7 days, or it’s free', 'Your new morning glow, 30% off'],
  cta: 'Get 30% off',
};

/** Reads an image file and shrinks it in the browser before upload. */
function shrink(file: File): Promise<Picked> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
      const width = Math.round(img.naturalWidth * scale);
      const height = Math.round(img.naturalHeight * scale);
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('canvas'));
      ctx.fillStyle = '#ffffff'; // transparent PNGs become white, not black, as JPEG
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve({ kind: 'image', dataUrl: canvas.toDataURL('image/jpeg', 0.85), width, height, name: file.name });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    img.src = url;
  });
}

/** Timestamps to sample: most of the first three seconds, then a quarter, half, three quarters and the end. */
function frameTimes(duration: number): number[] {
  const end = Math.max(0.1, duration - 0.3);
  const picks = [...HOOK_TIMES.filter((t) => t < duration), ...[0.25, 0.5, 0.75].map((f) => f * duration), end];
  return [...new Set(picks.map((t) => Math.round(t * 10) / 10))].sort((a, b) => a - b).filter((t, i, all) => i === 0 || t - all[i - 1] >= 0.4);
}

/**
 * Plays nothing and uploads nothing: seeks a hidden <video> to each timestamp
 * and draws that frame to a canvas. Only these small JPEG frames are sent.
 */
function extractFrames(file: File): Promise<Picked> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.muted = true;
    video.playsInline = true;
    video.preload = 'auto';
    const fail = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    video.onerror = fail;
    video.onloadeddata = async () => {
      try {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration <= 0 || !video.videoWidth) return fail();
        const scale = Math.min(1, FRAME_SIDE / Math.max(video.videoWidth, video.videoHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(video.videoWidth * scale);
        canvas.height = Math.round(video.videoHeight * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return fail();
        const times = frameTimes(duration);
        const frames: string[] = [];
        for (const t of times) {
          await new Promise<void>((done) => {
            video.onseeked = () => done();
            video.currentTime = Math.min(t, duration - 0.05);
          });
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          frames.push(canvas.toDataURL('image/jpeg', 0.72));
        }
        URL.revokeObjectURL(url);
        const thumb = frames[Math.min(2, frames.length - 1)];
        resolve({
          kind: 'video',
          dataUrl: thumb,
          frames,
          times,
          duration,
          width: video.videoWidth,
          height: video.videoHeight,
          name: file.name,
        });
      } catch {
        fail();
      }
    };
    video.src = url;
  });
}

const GRADE: Record<Grade, { label: string; badge: string }> = {
  good: { label: 'Strong', badge: 'bg-[#e3f9ee] text-[#007a45]' },
  ok: { label: 'Needs work', badge: 'bg-[#fdf2df] text-[#94600b]' },
  poor: { label: 'Weak', badge: 'bg-[#fdeaea] text-[#b4232a]' },
};

function scoreTone(score: number): { ring: string; label: string } {
  if (score >= 70) return { ring: '#00b86b', label: 'Ready to scale' };
  if (score >= 45) return { ring: '#f2a93b', label: 'Fix before you spend' };
  return { ring: '#e5484d', label: 'Needs a rework' };
}

/** Animated ring for the 0-100 ad score. */
function ScoreRing({ score }: { score: number }) {
  const size = 132;
  const stroke = 11;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone = scoreTone(score);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#f1f1f1" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone.ring}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * score) / 100 }}
          transition={{ duration: 1.1, ease }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[38px] font-medium leading-none tracking-[-0.03em] text-[#121212]">{score}</span>
        <span className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#9a9a9a]">of 100</span>
      </div>
    </div>
  );
}

export default function AdAnalyser() {
  const { ref: captchaRef, getToken, ready, failed } = useTurnstile();
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [picked, setPicked] = useState<Picked | null>(null);
  const [placement, setPlacement] = useState<PlacementId>('meta-feed');
  const [copy, setCopy] = useState('');
  const [showCopy, setShowCopy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    analysis: AdAnalysis;
    image: string;
    frames?: { src: string; t: number }[];
    placement: PlacementId;
  } | null>(null);

  async function pick(file: File | undefined) {
    if (!file) return;
    const isVideo = VIDEO_TYPES.includes(file.type);
    if (!isVideo && !IMAGE_TYPES.includes(file.type)) return setError('Upload a JPG, PNG or WebP image, or an MP4, MOV or WebM video.');
    if (!isVideo && file.size > 20 * 1024 * 1024) return setError('That image is too large. Please use one under 20 MB.');
    if (isVideo && file.size > MAX_VIDEO_BYTES) return setError('That video is too large. Please use one under 500 MB.');
    setError(null);
    setReading(true);
    try {
      const next = isVideo ? await extractFrames(file) : await shrink(file);
      setPicked(next);
      // Video ads mostly run full-screen; move off image-first placements by default.
      if (isVideo && (placement === 'meta-feed' || placement === 'google-display')) setPlacement('meta-story');
    } catch {
      setError(
        isVideo
          ? 'We could not read that video in this browser. Try exporting it as an MP4 (H.264).'
          : 'We could not read that image. Try saving it as a JPG.'
      );
    } finally {
      setReading(false);
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files?.[0]);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!picked) return setError('Upload the ad you want scored.');
    setError(null);
    setBusy(true);
    trackTool('free_tool_run', { tool: 'ad-analyser', kind: picked.kind, placement });
    try {
      const payload =
        picked.kind === 'video'
          ? { kind: 'video', frames: picked.frames, frameTimes: picked.times, duration: picked.duration }
          : { kind: 'image', image: picked.dataUrl };
      const data = await postTool<{ analysis: AdAnalysis }>(
        '/api/tools/ad-analyse',
        { ...payload, width: picked.width, height: picked.height, placement, copy },
        await getToken()
      );
      setResult({
        analysis: data.analysis,
        image: picked.dataUrl,
        frames: picked.kind === 'video' ? picked.frames.map((src, i) => ({ src, t: picked.times[i] })) : undefined,
        placement,
      });
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const shown = result?.analysis ?? EXAMPLE;
  const shownPlacement = PLACEMENTS.find((p) => p.id === (result?.placement ?? 'meta-feed'));
  const tone = scoreTone(shown.score);

  return (
    <section className="pb-6 pt-[112px] md:pt-[150px]">
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <ToolHero
            slug="ad-analyser"
            title="Score your ad"
            accent="before you spend."
            sub="Upload an image or UGC video and an AI creative strategist scores it, explains what works and what doesn’t, and hands you the fixes."
            points={['Image & UGC video', 'Score out of 100', 'Your ad is never stored']}
          >
            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-stretch md:gap-6">
              <div
                role="button"
                tabIndex={0}
                onClick={() => fileRef.current?.click()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-5 py-7 text-center transition-colors ${
                  dragging ? 'border-[#00b86b] bg-[#e3f9ee]' : 'border-[#dcdcdc] bg-[#fafafa] hover:border-[#9a9a9a]'
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept={[...IMAGE_TYPES, ...VIDEO_TYPES].join(',')}
                  className="hidden"
                  onChange={(e) => {
                    pick(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                {picked ? (
                  <div className="flex w-full items-center gap-4 text-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={picked.dataUrl} alt="Your ad" className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-[#e4e4e4]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-[#121212]">{picked.name}</p>
                      <p className="mt-0.5 text-[13px] text-[#8a8a8a]">
                        {picked.kind === 'video'
                          ? `Video · ${Math.round(picked.duration)}s · ${picked.frames.length} frames read · click to change`
                          : `${picked.width} × ${picked.height}px · click to change`}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove file"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPicked(null);
                      }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#8a8a8a] ring-1 ring-[#e4e4e4] hover:text-[#121212]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : reading ? (
                  <p className="py-4 text-[15px] text-[#545454]">Reading your ad…</p>
                ) : (
                  <>
                    <span className="flex gap-2">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#121212] text-white">
                        <ImagePlus className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#121212] ring-1 ring-[#e4e4e4]">
                        <Film className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                    </span>
                    <p className="mt-2 text-[16px] font-medium text-[#121212]">Drop your ad, or click to upload</p>
                    <p className="text-[13px] text-[#8a8a8a]">JPG, PNG, WebP · MP4, MOV, WebM</p>
                  </>
                )}
              </div>

              <div className="flex flex-col justify-center">
              <p className="text-[18px] font-medium text-[#121212]">Score your ad</p>
              <p className="mt-1 text-[14px] text-[#8a8a8a]">Pick where it will run. Results in under a minute.</p>
              <div className="relative mt-4">
                <select
                  aria-label="Where the ad will run"
                  value={placement}
                  onChange={(e) => setPlacement(e.target.value as PlacementId)}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  {PLACEMENTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8a8a]">▾</span>
              </div>

              {showCopy ? (
                <textarea
                  aria-label="Ad copy (optional)"
                  placeholder="Paste the ad's primary text and headline (optional)"
                  value={copy}
                  onChange={(e) => setCopy(e.target.value)}
                  maxLength={500}
                  rows={3}
                  className={`${inputClass} mt-3 h-auto resize-none py-3`}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowCopy(true)}
                  className="mt-3 text-[14px] text-[#545454] underline underline-offset-4 hover:text-[#121212]"
                >
                  + Add the ad copy for a fuller review
                </button>
              )}

              <button type="submit" disabled={busy || reading || !ready} className={`${submitClass} mt-4 w-full`}>
                {busy ? 'Scoring your ad…' : ready ? 'Score my ad' : 'Verifying…'}
                {ready && !busy && <ArrowRight className="h-4 w-4" />}
              </button>
              <div ref={captchaRef} className="mt-4 empty:hidden" />
              {(error || (failed && !ready)) && (
                <p role="alert" className="mt-4 rounded-xl bg-[#fdeaea] px-4 py-3 text-[14px] text-[#b4232a]">
                  {error ?? 'The security check could not load. Please refresh the page.'}
                </p>
              )}
              </div>
            </form>
          </ToolHero>
        </motion.div>

        <motion.div
          ref={resultRef}
          key={result ? result.image.slice(-24) : 'example'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 scroll-mt-28 md:mt-20"
        >
          <ResultShell
            icon={Clapperboard}
            title={result ? 'Your ad scorecard' : 'Ad scorecard · Glow Serum'}
            meta={shownPlacement?.name}
            example={!result}
            footer={
              result ? (
                <>
                  <p className="text-[15px] text-[#545454]">Want a version with these fixes? HypeOn Studio builds it for you.</p>
                  <a href={STUDIO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                    Make a better ad <ArrowRight className="h-4 w-4" />
                  </a>
                </>
              ) : undefined
            }
          >
            {/* Header band: the ad beside its score and verdict, so neither column runs long. */}
            <div className="grid gap-6 border-b border-[#ececec] p-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center md:p-6">
              {result ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.image}
                  alt="Your ad"
                  className="mx-auto max-h-[220px] w-full max-w-[150px] rounded-xl object-contain ring-1 ring-[#e4e4e4]"
                />
              ) : (
                <div className="mx-auto flex aspect-[4/5] w-full max-w-[150px] flex-col items-center justify-center rounded-xl bg-[linear-gradient(160deg,#2b1d14,#121212_70%)] text-center">
                  <span className="h-14 w-6 rounded-[10px] bg-gradient-to-b from-[#ff9a3c] to-[#e2581b] shadow-[0_8px_24px_rgba(255,120,40,0.35)]" />
                  <p className="mt-3 text-[12px] font-medium text-white">Glow Serum</p>
                  <p className="text-[10px] text-white/40">30% off today</p>
                </div>
              )}
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-7">
                <ScoreRing score={shown.score} />
                <div className="min-w-0">
                  <span
                    className="inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium"
                    style={{ color: tone.ring, backgroundColor: `${tone.ring}1a` }}
                  >
                    {tone.label}
                  </span>
                  <p className="mt-2 text-[18px] leading-[28px] text-[#121212]">{shown.summary}</p>
                </div>
              </div>
            </div>

            {result?.frames && (
              <div className="border-b border-[#ececec] px-5 py-4 md:px-6">
                <p className={labelClass}>Frames reviewed</p>
                <div className="mt-2 grid grid-cols-5 gap-2 sm:grid-cols-10">
                  {result.frames.map((f) => (
                    <figure key={f.t} className="min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.src} alt="" className="aspect-[9/16] w-full rounded-md object-cover ring-1 ring-[#e4e4e4]" />
                      <figcaption className="mt-1 text-center text-[11px] tabular-nums text-[#9a9a9a]">{f.t.toFixed(1)}s</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* The six checks, full width */}
            <div className="p-5 md:p-6">
              <p className={labelClass}>The six checks</p>
              <ul className="mt-3 divide-y divide-[#f1f1f1] rounded-2xl border border-[#ececec]">
                {shown.checks.map((c) => (
                  // Phones: badge + name on one line, reason below. sm+: three fixed columns.
                  <li
                    key={c.id}
                    className="flex flex-col gap-1.5 px-4 py-3.5 sm:grid sm:grid-cols-[104px_190px_minmax(0,1fr)] sm:items-start sm:gap-x-4"
                  >
                    <div className="flex items-center gap-2 sm:contents">
                      <span
                        className={`inline-flex w-fit items-center whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-medium ${GRADE[c.grade].badge}`}
                      >
                        {GRADE[c.grade].label}
                      </span>
                      <span className="text-[15px] font-medium leading-[24px] text-[#121212]">{c.name}</span>
                    </div>
                    <p className="text-[15px] leading-[24px] text-[#545454]">{c.reason}</p>
                  </li>
                ))}
              </ul>

              {/* Fixes and rewrites side by side */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {shown.fixes.length > 0 && (
                  <div className="rounded-2xl border border-[#ececec] p-5">
                    <p className={labelClass}>Fix these first</p>
                    <ol className="mt-3 space-y-3">
                      {shown.fixes.map((f, i) => (
                        <li key={f} className="flex gap-3 text-[15px] leading-[24px] text-[#333333]">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#121212] text-[12px] font-medium text-white">
                            {i + 1}
                          </span>
                          {f}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
                {(shown.headlines.length > 0 || shown.cta) && (
                  <div className="rounded-2xl bg-[#f5f5f5] p-5">
                    <p className={labelClass}>Headlines to test</p>
                    <ul className="mt-3 space-y-2">
                      {shown.headlines.map((h) => (
                        <li key={h} className="rounded-xl bg-white px-3.5 py-2.5 text-[15px] font-medium text-[#121212] ring-1 ring-[#ececec]">
                          “{h}”
                        </li>
                      ))}
                    </ul>
                    {shown.cta && (
                      <>
                        <p className={`${labelClass} mt-5`}>Button</p>
                        <span className="mt-2 inline-flex rounded-xl bg-[#121212] px-4 py-2.5 text-[14px] font-medium text-white">
                          {shown.cta}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ResultShell>
        </motion.div>
      </Container>
    </section>
  );
}
