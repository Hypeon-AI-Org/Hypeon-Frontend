'use client';

import { useEffect } from 'react';

export default function ScrollRevealSetup() {
  useEffect(() => {
    // Enhanced Scroll Reveal Logic with multiple animation types
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Don't unobserve to allow re-animation if needed
        }
      });
    }, observerOptions);

    // Observe all reveal elements
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

    // Parallax effect on scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
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

    return () => {
      revealSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => observer.unobserve(el));
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
