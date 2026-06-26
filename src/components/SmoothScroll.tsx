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
      duration: 1.05,
      // easeOutExpo - gives the weighted, premium feel without lag.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // No smoothing on touch - native scroll only.
      syncTouch: false,
    });

    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
