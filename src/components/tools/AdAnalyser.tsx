'use client';

import { useRef, useState, type DragEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ImagePlus, X } from 'lucide-react';

import { Accent, Container, STUDIO_URL } from '@/components/home/ui';
import { PLACEMENTS, type AdAnalysis, type Grade, type PlacementId } from '@/lib/tools/adRubric';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { inputClass, submitClass } from './ui';

const ease = [0.22, 1, 0.36, 1] as const;
/** Longest side sent to the model: plenty for judging an ad, and keeps uploads small. */
const MAX_SIDE = 1600;
const ACCEPT = ['image/jpeg', 'image/png', 'image/webp'];

type Picked = { dataUrl: string; width: number; height: number; name: string };

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
      resolve({ dataUrl: canvas.toDataURL('image/jpeg', 0.85), width, height, name: file.name });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('decode'));
    };
    img.src = url;
  });
}

const GRADE: Record<Grade, { label: string; text: string; badge: string }> = {
  good: { label: 'Strong', text: 'text-[#00da7f]', badge: 'border-[#00da7f]/30 bg-[#00da7f]/10 text-[#00da7f]' },
  ok: { label: 'Needs work', text: 'text-white/70', badge: 'border-white/15 bg-white/[0.06] text-white/80' },
  poor: { label: 'Weak', text: 'text-[#ff8f9c]', badge: 'border-[#ff8f9c]/30 bg-[#ff8f9c]/10 text-[#ff8f9c]' },
};

function scoreColour(score: number): string {
  if (score >= 70) return 'text-[#00da7f]';
  if (score >= 45) return 'text-white';
  return 'text-[#ff8f9c]';
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
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ analysis: AdAnalysis; image: string; placement: PlacementId } | null>(null);

  async function pick(file: File | undefined) {
    if (!file) return;
    if (!ACCEPT.includes(file.type)) return setError('Upload a JPG, PNG or WebP image of your ad.');
    if (file.size > 20 * 1024 * 1024) return setError('That image is too large. Please use one under 20 MB.');
    setError(null);
    try {
      setPicked(await shrink(file));
    } catch {
      setError('We could not read that image. Try saving it as a JPG.');
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    pick(e.dataTransfer.files?.[0]);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!picked) return setError('Upload the ad you want analysed.');
    setError(null);
    setBusy(true);
    trackTool('free_tool_run', { tool: 'ad-analyser', placement });
    try {
      const data = await postTool<{ analysis: AdAnalysis }>(
        '/api/tools/ad-analyse',
        { image: picked.dataUrl, width: picked.width, height: picked.height, placement, copy },
        await getToken()
      );
      setResult({ analysis: data.analysis, image: picked.dataUrl, placement });
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const shown = result?.analysis ?? EXAMPLE;
  const shownPlacement = PLACEMENTS.find((p) => p.id === (result?.placement ?? 'meta-feed'));

  return (
    <section className="relative overflow-hidden pb-10 pt-[120px] md:pt-[160px]">
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-white/45">Free tool 03</p>
          <h1 className="mt-4 text-[40px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[64px]">
            Free AI ad <Accent>analyser.</Accent>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-[28px] text-white/55 md:text-[20px] md:leading-[30px]">
            Upload an ad and an AI agent reviews it like a performance marketer: a score, what works, what
            doesn&rsquo;t, and the exact fixes to make before you spend.
          </p>
        </motion.div>

        <form onSubmit={onSubmit} className="mx-auto mt-9 max-w-[760px]">
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
            className={`relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-8 text-center transition-colors ${
              dragging ? 'border-[#00da7f]/60 bg-[#00da7f]/[0.06]' : 'border-[#3a3a3a] bg-[#161616] hover:border-white/30'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPT.join(',')}
              className="hidden"
              onChange={(e) => {
                pick(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
            {picked ? (
              <div className="flex w-full items-center gap-4 text-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={picked.dataUrl} alt="Your ad" className="h-20 w-20 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] text-white">{picked.name}</p>
                  <p className="mt-1 text-[14px] text-white/45">
                    {picked.width} × {picked.height}px · click to change
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Remove image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPicked(null);
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] text-[#00da7f]">
                  <ImagePlus className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <p className="text-[16px] text-white">Drop your ad here, or click to upload</p>
                <p className="text-[14px] text-white/40">JPG, PNG or WebP · static image ads</p>
              </>
            )}
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <div className="relative sm:flex-1">
              <select
                aria-label="Where the ad will run"
                value={placement}
                onChange={(e) => setPlacement(e.target.value as PlacementId)}
                className={`${inputClass} appearance-none pr-10 [&>option]:bg-[#1a1a1a] [&>option]:text-white`}
              >
                {PLACEMENTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45">▾</span>
            </div>
            <button type="submit" disabled={busy || !ready} className={submitClass}>
              {busy ? 'Analysing…' : ready ? 'Analyse my ad' : 'Verifying…'}
            </button>
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
              className="mt-3 text-[14px] text-white/50 underline underline-offset-4 hover:text-white"
            >
              + Add the ad copy for a fuller review (optional)
            </button>
          )}

          <div ref={captchaRef} className="mt-4 flex justify-center empty:hidden" />
          <p className="mt-4 text-center text-[14px] text-white/40">Free, no sign-up. Your image is analysed, never stored.</p>
          {(error || (failed && !ready)) && (
            <p
              role="alert"
              className="mt-4 rounded-2xl border border-[#ff8f9c]/25 bg-[#ff8f9c]/10 px-4 py-3 text-center text-[15px] text-[#ffb3bc]"
            >
              {error ?? 'The security check could not load. Please refresh the page.'}
            </p>
          )}
        </form>

        <motion.div
          ref={resultRef}
          key={result ? result.image.slice(-24) : 'example'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 scroll-mt-28 overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#161616]/90 backdrop-blur md:mt-20"
        >
          {/* window bar */}
          <div className="flex items-center gap-3 border-b border-[#2a2a2a] px-5 py-3.5">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            </span>
            <p className="truncate text-[14px] text-white/50">Ad review · {shownPlacement?.name}</p>
            {!result && (
              <span className="ml-auto shrink-0 rounded-md border border-white/10 px-2 py-0.5 text-[12px] text-white/40">
                Example
              </span>
            )}
          </div>

          <div className="grid gap-6 p-5 md:grid-cols-[260px_minmax(0,1fr)] md:gap-8 md:p-7">
            {/* the ad + score; on phones the ad is capped at 240px so the score stays near the top */}
            <div>
              {result ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.image}
                  alt="Your ad"
                  className="mx-auto w-full max-w-[240px] rounded-xl border border-[#2a2a2a] object-contain md:max-w-none"
                />
              ) : (
                <div className="mx-auto flex aspect-[4/5] w-full max-w-[240px] flex-col items-center justify-center rounded-xl md:max-w-none border border-[#2a2a2a] bg-[linear-gradient(160deg,#2b1d14,#121212_70%)] text-center">
                  <span className="h-24 w-10 rounded-[14px] bg-gradient-to-b from-[#ff9a3c] to-[#e2581b] shadow-[0_10px_30px_rgba(255,120,40,0.35)]" />
                  <p className="mt-4 text-[15px] font-medium text-white">Glow Serum</p>
                  <p className="text-[11px] text-white/40">30% off today</p>
                </div>
              )}
              <div className="mt-5 flex items-end gap-2">
                <span className={`text-[56px] font-medium leading-none tracking-[-0.04em] ${scoreColour(shown.score)}`}>
                  {shown.score}
                </span>
                <span className="pb-1.5 text-[15px] text-white/45">/ 100 ad score</span>
              </div>
              <p className="mt-3 text-[15px] leading-[24px] text-white/70">{shown.summary}</p>
            </div>

            {/* checks, fixes, rewrites */}
            <div className="min-w-0">
              <ul className="divide-y divide-[#2a2a2a] rounded-xl border border-[#2a2a2a]">
                {shown.checks.map((c) => (
                  // Phones: badge + name on one line, reason below. sm+: three fixed columns,
                  // so every badge, name and reason starts at the same x whatever its length.
                  <li
                    key={c.id}
                    className="flex flex-col gap-1.5 px-4 py-3.5 sm:grid sm:grid-cols-[92px_150px_minmax(0,1fr)] sm:items-start sm:gap-x-4"
                  >
                    <div className="flex items-center gap-2 sm:contents">
                      <span
                        className={`inline-flex h-6 w-fit items-center whitespace-nowrap rounded-md border px-2 text-[12px] font-medium sm:mt-px ${GRADE[c.grade].badge}`}
                      >
                        {GRADE[c.grade].label}
                      </span>
                      <span className="text-[15px] font-medium leading-[23px] text-white">{c.name}</span>
                    </div>
                    <p className="text-[15px] leading-[23px] text-white/60">{c.reason}</p>
                  </li>
                ))}
              </ul>

              {shown.fixes.length > 0 && (
                <div className="mt-6">
                  <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40">Top fixes</p>
                  <ol className="mt-3 space-y-2.5">
                    {shown.fixes.map((f, i) => (
                      <li key={f} className="flex gap-3 text-[15px] leading-[23px] text-white/80">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00da7f]/10 text-[13px] font-medium text-[#00da7f]">
                          {i + 1}
                        </span>
                        {f}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {(shown.headlines.length > 0 || shown.cta) && (
                <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="rounded-xl border border-[#2a2a2a] bg-[#121212] p-4">
                    <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40">Try these headlines</p>
                    <ul className="mt-2 space-y-1.5">
                      {shown.headlines.map((h) => (
                        <li key={h} className="text-[15px] text-white">
                          “{h}”
                        </li>
                      ))}
                    </ul>
                  </div>
                  {shown.cta && (
                    <div className="rounded-xl border border-[#2a2a2a] bg-[#121212] p-4">
                      <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/40">Button</p>
                      <span className="mt-2 inline-flex rounded-lg bg-white px-3 py-1.5 text-[14px] font-medium text-[#121212]">
                        {shown.cta}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className="flex flex-col gap-4 border-t border-[#2a2a2a] px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
              <p className="text-[16px] text-white/60">Want a version with these fixes? HypeOn Studio builds it for you.</p>
              <a href={STUDIO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                Make a better ad <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
