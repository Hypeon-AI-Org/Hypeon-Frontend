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

      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const parallaxElements = document.querySelectorAll('.parallax-slow');
            parallaxElements.forEach((el) => {
              const rect = el.getBoundingClientRect();
              const speed = 0.3;
              const yPos = -(rect.top * speed);
              (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
            });
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      cleanup = () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
