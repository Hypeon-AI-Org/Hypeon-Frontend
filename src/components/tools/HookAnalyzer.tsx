'use client';

import { useRef, useState, type DragEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Film, Timer, X } from 'lucide-react';

import { Container, STUDIO_URL } from '@/components/home/ui';
import { HOOK_FRAME_TIMES, HOOK_PLATFORMS, type HookAnalysis, type HookPlatformId } from '@/lib/tools/hookRubric';
import { GRADE, scoreColor, ScoreRing } from './scorecard';
import { ResultShell, ToolHero } from './sections';
import { postTool, ToolError, trackTool, useTurnstile } from './toolClient';
import { ToolProgress } from './ToolProgress';
import { inputClass, labelClass, submitClass } from './ui';
import { extractFrames, MAX_VIDEO_BYTES, VIDEO_TYPES, type VideoFrames } from './videoFrames';

const ease = [0.22, 1, 0.36, 1] as const;

type Picked = VideoFrames & { name: string };

/** Only the first three seconds are sampled; a shorter clip keeps what it has. */
function hookTimes(duration: number): number[] {
  return HOOK_FRAME_TIMES.filter((t) => t < duration);
}

function hookTone(score: number): { ring: string; label: string } {
  const ring = scoreColor(score);
  if (score >= 70) return { ring, label: 'Scroll-stopping' };
  if (score >= 45) return { ring, label: 'Some will swipe' };
  return { ring, label: 'Most will swipe' };
}

/** What visitors see before they upload. Illustrative review of a fictional video. */
const EXAMPLE: HookAnalysis = {
  score: 58,
  summary: 'A friendly face from frame one, but nothing on screen tells muted viewers why to stay past second two.',
  checks: [
    { id: 'stop', name: 'Scroll-stop (first frame)', grade: 'good', reason: 'A close-up of her face mid-laugh at 0s is hard to swipe past.' },
    { id: 'subject', name: 'Face or product early', grade: 'good', reason: 'The creator is on screen from the very first frame.' },
    { id: 'text', name: 'On-screen hook text', grade: 'poor', reason: 'No text appears until 3s, so muted viewers get no reason to stay.' },
    { id: 'promise', name: 'Curiosity or promise', grade: 'ok', reason: 'The serum appears at 2s, but nothing hints at a result or payoff.' },
    { id: 'pace', name: 'Pace & movement', grade: 'ok', reason: 'One static talking shot; only a small head turn by 1.5s.' },
    { id: 'safe', name: 'Safe zones', grade: 'ok', reason: 'Vertical 9:16, but her chin sits in the bottom caption area.' },
  ],
  fixes: [
    'Put a large hook line on screen from 0s, e.g. “I tried this for 7 days”.',
    'Cut to the serum in your hand by 1s instead of 2s.',
    'Reframe so your face sits in the middle third, clear of the caption area.',
  ],
  hooks: ['I tried this serum for 7 days', 'Day 1 vs day 7, no filter', 'Why my skin stopped looking dull'],
};

export default function HookAnalyzer() {
  const { ref: captchaRef, getToken, ready, failed } = useTurnstile();
  const fileRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [picked, setPicked] = useState<Picked | null>(null);
  const [platform, setPlatform] = useState<HookPlatformId>('tiktok');
  const [topic, setTopic] = useState('');
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reading, setReading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    analysis: HookAnalysis;
    frames: { src: string; t: number }[];
    platform: HookPlatformId;
  } | null>(null);

  async function pick(file: File | undefined) {
    if (!file) return;
    if (!VIDEO_TYPES.includes(file.type)) return setError('Upload an MP4, MOV or WebM video.');
    if (file.size > MAX_VIDEO_BYTES) return setError('That video is too large. Please use one under 500 MB.');
    setError(null);
    setReading(true);
    try {
      const v = await extractFrames(file, hookTimes);
      if (v.frames.length < 3) throw new Error('short');
      setPicked({ ...v, name: file.name });
    } catch (e) {
      setError(
        e instanceof Error && e.message === 'short'
          ? 'That video is too short. Upload one at least 2 seconds long.'
          : 'We could not read that video in this browser. Try exporting it as an MP4 (H.264).'
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
    if (!picked) return setError('Upload the video you want checked.');
    setError(null);
    setBusy(true);
    trackTool('free_tool_run', { tool: 'hook-analyzer', platform });
    try {
      const data = await postTool<{ analysis: HookAnalysis }>(
        '/api/tools/hook-analyse',
        {
          frames: picked.frames,
          frameTimes: picked.times,
          duration: picked.duration,
          width: picked.width,
          height: picked.height,
          platform,
          topic,
        },
        await getToken()
      );
      setResult({ analysis: data.analysis, frames: picked.frames.map((src, i) => ({ src, t: picked.times[i] })), platform });
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      setError(err instanceof ToolError ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  const shown = result?.analysis ?? EXAMPLE;
  const shownPlatform = HOOK_PLATFORMS.find((p) => p.id === (result?.platform ?? 'tiktok'));
  const tone = hookTone(shown.score);

  return (
    <section className="pb-6 pt-[112px] md:pt-[150px]">
      <Container>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }}>
          <ToolHero
            slug="hook-analyzer"
            title="Win the first"
            accent="3 seconds."
            sub="Upload a Reel, TikTok or Short. AI grades the opening that decides who swipes away, shows you why, and writes better hook lines."
            points={['TikTok, Reels & Shorts', 'Score out of 100', 'Your video never leaves your browser']}
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
                  accept={VIDEO_TYPES.join(',')}
                  className="hidden"
                  onChange={(e) => {
                    pick(e.target.files?.[0]);
                    e.target.value = '';
                  }}
                />
                {picked ? (
                  <div className="flex w-full items-center gap-4 text-left">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={picked.frames[0]} alt="First frame of your video" className="h-16 w-16 shrink-0 rounded-lg object-cover ring-1 ring-[#e4e4e4]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[15px] font-medium text-[#121212]">{picked.name}</p>
                      <p className="mt-0.5 text-[13px] text-[#8a8a8a]">
                        {Math.round(picked.duration)}s video · first {picked.frames.length} frames read · click to change
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label="Remove video"
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
                  <p className="py-4 text-[15px] text-[#545454]">Reading your first 3 seconds…</p>
                ) : (
                  <>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#121212] text-white">
                      <Film className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <p className="mt-2 text-[16px] font-medium text-[#121212]">Drop your video, or click to upload</p>
                    <p className="text-[13px] text-[#8a8a8a]">MP4, MOV, WebM · up to 500 MB</p>
                  </>
                )}
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-[18px] font-medium text-[#121212]">Check your hook</p>
                <p className="mt-1 text-[14px] text-[#8a8a8a]">Pick where you will post it. Results in under a minute.</p>
                <div className="relative mt-4">
                  <select
                    aria-label="Where the video will be posted"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as HookPlatformId)}
                    className={`${inputClass} appearance-none pr-10`}
                  >
                    {HOOK_PLATFORMS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8a8a8a]">▾</span>
                </div>
                <input
                  aria-label="What the video is about (optional)"
                  placeholder="What is it about? (optional)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  maxLength={200}
                  className={`${inputClass} mt-3`}
                />

                <button type="submit" disabled={busy || reading || !ready} className={`${submitClass} mt-4 w-full`}>
                  {busy ? 'Checking your hook…' : ready ? 'Check my hook' : 'Verifying…'}
                  {ready && !busy && <ArrowRight className="h-4 w-4" />}
                </button>
                <ToolProgress
                  active={busy}
                  expected={9}
                  steps={[
                    { at: 0, label: 'Sending your first 3 seconds' },
                    { at: 1, label: 'Measuring movement and framing' },
                    { at: 2, label: 'Agent is analysing your opening' },
                    { at: 6, label: 'Scoring the six checks' },
                    { at: 8, label: 'Writing your hook lines' },
                  ]}
                />
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
          key={result ? result.frames[0].src.slice(-24) : 'example'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mt-14 scroll-mt-28 md:mt-20"
        >
          <ResultShell
            icon={Timer}
            title={result ? 'Your hook scorecard' : 'Hook scorecard · Glow Serum review'}
            meta={shownPlatform?.name}
            example={!result}
            footer={
              result ? (
                <>
                  <p className="text-[15px] text-[#545454]">Want a video that opens stronger? HypeOn Studio makes UGC ads for you.</p>
                  <a href={STUDIO_URL} className={`${submitClass} h-[46px] text-[15px]`}>
                    Make a better video <ArrowRight className="h-4 w-4" />
                  </a>
                </>
              ) : undefined
            }
          >
            {/* Header band: the first frame beside the score and verdict. */}
            <div className="grid gap-6 border-b border-[#ececec] p-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center md:p-6">
              {result ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.frames[0].src}
                  alt="First frame of your video"
                  className="mx-auto aspect-[9/16] w-full max-w-[120px] rounded-xl object-cover ring-1 ring-[#e4e4e4]"
                />
              ) : (
                <div className="mx-auto flex aspect-[9/16] w-full max-w-[120px] flex-col items-center justify-center rounded-xl bg-[linear-gradient(160deg,#3a2a20,#121212_70%)] text-center">
                  <span className="h-12 w-12 rounded-full bg-gradient-to-b from-[#f3c9a8] to-[#c98b62]" />
                  <span className="mt-3 h-10 w-5 rounded-[8px] bg-gradient-to-b from-[#ff9a3c] to-[#e2581b]" />
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

            {result && (
              <div className="border-b border-[#ececec] px-5 py-4 md:px-6">
                <p className={labelClass}>Your first 3 seconds</p>
                <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-7">
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

            <div className="p-5 md:p-6">
              <p className={labelClass}>The six checks</p>
              <ul className="mt-3 divide-y divide-[#f1f1f1] rounded-2xl border border-[#ececec]">
                {shown.checks.map((c) => (
                  // Phones: badge + name on one line, reason below. sm+: three fixed columns.
                  <li
                    key={c.id}
                    className="flex flex-col gap-1.5 px-4 py-3.5 sm:grid sm:grid-cols-[104px_200px_minmax(0,1fr)] sm:items-start sm:gap-x-4"
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
                {shown.hooks.length > 0 && (
                  <div className="rounded-2xl bg-[#f5f5f5] p-5">
                    <p className={labelClass}>Hook lines to test</p>
                    <ul className="mt-3 space-y-2">
                      {shown.hooks.map((h) => (
                        <li key={h} className="rounded-xl bg-white px-3.5 py-2.5 text-[15px] font-medium text-[#121212] ring-1 ring-[#ececec]">
                          “{h}”
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-[13px] text-[#8a8a8a]">Put one on screen from the first frame, large and centred.</p>
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
