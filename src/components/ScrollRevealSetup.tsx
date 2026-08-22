'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollRevealSetup() {
  const pathname = usePathname();

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    // Small delay so the new page's DOM is in place after client-side navigation
    const rafId = requestAnimationFrame(() => {
      const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px',
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, observerOptions);

      const revealSelectors = [
        '.reveal',
        '.reveal-scale',
        '.reveal-left',
        '.reveal-right',
        '.reveal-blur',
        '.reveal-rotate',
        '.reveal-stagger',
        '.reveal-gradient',
      ];

      revealSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => observer.observe(el));
      });

      // Cache parallax nodes AND their resting document offsets once, so the
      // scroll loop never reads layout (getBoundingClientRect) per frame -
      // that was forcing a synchronous reflow on every scroll tick.
      const parallaxElements = Array.from(
        document.querySelectorAll<HTMLElement>('.parallax-slow')
      );
      // Base document-top of each element (read layout ONCE here, never in the loop).
      let baseTops = parallaxElements.map(
        (el) => el.getBoundingClientRect().top + window.scrollY
      );
      // Promote to its own GPU layer so transform updates don't repaint siblings.
      parallaxElements.forEach((el) => {
        el.style.willChange = 'transform';
      });

      const recomputeTops = () => {
        // Recompute on resize only (layout may have shifted).
        parallaxElements.forEach((el) => (el.style.transform = ''));
        baseTops = parallaxElements.map(
          (el) => el.getBoundingClientRect().top + window.scrollY
        );
      };

      // Apply parallax. Pure math on cached offsets - no layout reads.
      const applyParallax = () => {
        const scrollY = window.scrollY;
        for (let i = 0; i < parallaxElements.length; i++) {
          // Position relative to viewport = base - scroll.
          const relativeTop = baseTops[i] - scrollY;
          const yPos = -(relativeTop * 0.3);
          parallaxElements[i].style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      };

      // Prefer Lenis's own frame: it writes the scroll position and then emits,
      // so we transform in the SAME frame the content moves. Falling back to
      // the native scroll event + rAF costs a frame, which reads as the
      // parallax layer sliding a beat behind everything around it.
      type LenisScrollBus = {
        on: (event: 'scroll', cb: () => void) => void;
        off: (event: 'scroll', cb: () => void) => void;
      };
      const lenis = (window as Window & { __lenis?: LenisScrollBus }).__lenis;

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            applyParallax();
            ticking = false;
          });
          ticking = true;
        }
      };

      let detachScroll: () => void = () => {};
      if (parallaxElements.length > 0) {
        if (lenis) {
          lenis.on('scroll', applyParallax);
          detachScroll = () => lenis.off('scroll', applyParallax);
        } else {
          window.addEventListener('scroll', handleScroll, { passive: true });
          detachScroll = () =>
            window.removeEventListener('scroll', handleScroll);
        }
        window.addEventListener('resize', recomputeTops, { passive: true });
      }

      cleanup = () => {
        observer.disconnect();
        detachScroll();
        window.removeEventListener('resize', recomputeTops);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
