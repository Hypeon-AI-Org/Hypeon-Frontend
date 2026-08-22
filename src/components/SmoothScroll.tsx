'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Site-wide momentum smooth scrolling (Lenis).
 * - Runs on top of native scroll, so position: sticky, anchor links and the
 *   scrollbar keep working.
 * - Disabled for users who prefer reduced motion (accessibility).
 * - Inner scrollable areas should set `data-lenis-prevent` so Lenis lets them
 *   scroll natively instead of moving the page.
 *
 * The instance is published on `window.__lenis` so scroll-driven effects
 * (parallax, reveals) can run inside Lenis's own frame instead of scheduling a
 * second rAF off the native scroll event - that second hop is what makes
 * parallax lag one frame behind the content it sits on.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion users - keep native scrolling for them.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Desktop only - phones keep their native touch scrolling, which feels
    // better than momentum smooth-scroll on touch.
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window;
    if (isTouch) {
      return;
    }

    const lenis = new Lenis({
      // Frame-rate independent interpolation. Unlike `duration`+easing (which
      // restarts a fixed-length tween on every wheel tick and stacks up into
      // that floaty, behind-your-finger feel), lerp eases toward a live target,
      // so continuous wheeling stays glued to the input and settles cleanly.
      lerp: 0.09,
      smoothWheel: true,
      // Slightly damped wheel so one notch travels a comfortable distance
      // instead of overshooting and having to ease back.
      wheelMultiplier: 0.9,
      // No smoothing on touch - native scroll only.
      syncTouch: false,
      // Let Lenis animate in-page #anchor jumps instead of the browser
      // hard-jumping and fighting the interpolation.
      anchors: true,
      // We drive raf ourselves below so the loop can idle on hidden tabs.
      autoRaf: false,
    });

    (window as Window & { __lenis?: Lenis }).__lenis = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Background tabs throttle rAF to ~1fps; resuming from that with a stale
    // timestamp makes Lenis jump. Stop the loop while hidden, restart on show.
    const onVisibility = () => {
      cancelAnimationFrame(rafId);
      if (!document.hidden) rafId = requestAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Lazy images/videos and font swaps change page height after mount; Lenis
    // caches that height, so re-measure whenever the document actually resizes.
    const ro = new ResizeObserver(() => lenis.resize());
    ro.observe(document.documentElement);
    ro.observe(document.body);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as Window & { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
