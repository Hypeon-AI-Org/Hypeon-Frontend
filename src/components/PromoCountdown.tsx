"use client";

import { useEffect, useRef, useState } from "react";

/** Milliseconds until `endsAt`, floored at zero. */
export function msLeft(endsAt: string, now: number): number {
  return Math.max(0, Date.parse(endsAt) - now);
}

/**
 * hh:mm:ss. Hours run past 24 on purpose: a 48-hour offer reads "48:00:00",
 * the number the offer was announced with, not "2 days".
 */
export function formatCountdown(ms: number): string {
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const two = (n: number) => String(n).padStart(2, "0");
  return `${two(h)}:${two(m)}:${two(s)}`;
}

/**
 * A live countdown chip to a deadline, ticking once a second, that fires
 * `onExpire` exactly once at zero so the parent can drop the offer it announced.
 *
 * Server-safe: the page is pre-rendered, so the first paint shows a neutral
 * "--:--:--" and the real value arrives after mount. Rendering a clock value on
 * the server would hydrate against a different second and warn.
 *
 * `role="timer"` with `aria-live="off"`: a region announcing every second is
 * unusable with a screen reader; the label carries the value for anyone who
 * lands on it. The pulse is the only motion and yields to reduced-motion.
 */
export default function PromoCountdown({
  endsAt,
  onExpire,
  label = "Limited offer ends in",
  className = "",
}: {
  endsAt: string;
  onExpire?: () => void;
  label?: string;
  className?: string;
}) {
  const [left, setLeft] = useState<number | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    let fired = false;
    const tick = () => {
      const remaining = msLeft(endsAt, Date.now());
      setLeft(remaining);
      if (remaining === 0 && !fired) {
        fired = true;
        clearInterval(id);
        onExpireRef.current?.();
      }
    };
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [endsAt]);

  const value = left === null ? "--:--:--" : formatCountdown(left);
  return (
    <span
      role="timer"
      aria-live="off"
      aria-label={`${label} ${value}`}
      className={`inline-flex items-center gap-2 rounded-md bg-amber-100 px-2.5 py-1 text-[12px] font-semibold text-amber-900 ${className}`}
    >
      <span aria-hidden className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-70 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-600" />
      </span>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </span>
  );
}
