'use client';

import { useEffect, useState } from 'react';

export type ProgressStep = { /** Seconds after the start when this step begins. */ at: number; label: string };

/** How far along a run looks: 90% at the expected time, then a slow crawl that never reaches 100. */
function estimate(elapsed: number, expected: number): number {
  if (elapsed <= expected) return (elapsed / expected) * 90;
  return 90 + 9 * (1 - Math.exp(-(elapsed - expected) / expected));
}

/**
 * Progress bar shown while a tool runs: percent, the current step and time
 * left. The tools' APIs return in one response, so the percent is estimated
 * from each tool's measured run time unless the caller knows real progress
 * (`fraction`, 0-1), as the AI Visibility Scanner does per answer.
 */
export function ToolProgress({
  active,
  expected,
  steps,
  fraction,
  dark = false,
}: {
  active: boolean;
  /** Typical run time in seconds, from testing. */
  expected: number;
  steps: ProgressStep[];
  fraction?: number;
  dark?: boolean;
}) {
  const [started, setStarted] = useState<number | null>(null);
  const [now, setNow] = useState(0);

  useEffect(() => {
    if (!active) return setStarted(null);
    const t0 = Date.now();
    setStarted(t0);
    setNow(t0);
    const id = setInterval(() => setNow(Date.now()), 200);
    return () => clearInterval(id);
  }, [active]);

  if (!active || started === null) return null;
  const elapsed = Math.max(0, (now - started) / 1000);
  const guess = estimate(elapsed, expected);
  const pct = Math.min(99, Math.round(fraction === undefined ? guess : Math.max(fraction * 99, Math.min(guess, fraction * 99 + 10))));
  const step = [...steps].reverse().find((s) => elapsed >= s.at) ?? steps[0];
  // With real progress, time left follows the actual pace once enough of the run is done.
  const left = Math.ceil(fraction !== undefined && fraction >= 0.25 ? (elapsed * (1 - fraction)) / fraction : expected - elapsed);

  return (
    <div role="status" aria-live="polite" className="mt-4">
      <div className={`flex items-baseline justify-between gap-3 text-[14px] ${dark ? 'text-white/70' : 'text-[#333333]'}`}>
        <span className="min-w-0">{step.label}…</span>
        <span className={`shrink-0 font-medium tabular-nums ${dark ? 'text-white' : 'text-[#121212]'}`}>{pct}%</span>
      </div>
      <div className={`mt-2 h-2 overflow-hidden rounded-full ${dark ? 'bg-white/10' : 'bg-[#ececec]'}`}>
        <div
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${dark ? 'bg-white' : 'bg-[linear-gradient(90deg,#2a2a2a,#121212)]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className={`mt-1.5 text-[13px] tabular-nums ${dark ? 'text-white/40' : 'text-[#8a8a8a]'}`}>
        {left > 0 ? `About ${left}s left` : 'Almost done'} · {Math.floor(elapsed)}s
      </p>
    </div>
  );
}
