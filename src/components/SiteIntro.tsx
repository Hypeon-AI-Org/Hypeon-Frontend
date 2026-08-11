'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../assets/HypeOn_Logo.png';
import { markIntroDone } from '@/lib/introSignal';

/* Site-wide entrance flash: black curtain → logo, then fades out. Plays on
   every page load/refresh, the instant a visitor lands on the site - not
   scoped to the Hero section, so it shows ahead of whichever page they land
   on. The card-shuffle beat stays local to <Hero />.

   `visible` defaults to true (not flipped on in an effect) so the overlay is
   already present in the very first paint/server-rendered HTML - otherwise
   there's a flash of the white page underneath before the curtain appears. */
export default function SiteIntro() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) { markIntroDone(); return; }
    // Signal "done" the instant the fade-out STARTS (not when it finishes) -
    // the curtain is already translucent well before then, so whatever's
    // underneath should already be animating instead of sitting frozen.
    const t = setTimeout(() => { setVisible(false); markIntroDone(); }, 1400);
    return () => clearTimeout(t);
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
        >
          <div style={{ perspective: 600 }}>
            <motion.div
              key="intro-logo"
              initial={{ opacity: 0, y: 26, rotateX: -55 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: 'preserve-3d', transformOrigin: 'bottom center' }}
              className="flex items-center gap-2.5 text-white/80 sm:gap-3.5 lg:gap-4"
            >
              <Image src={logo} alt="" width={64} height={64} className="w-8 h-8 object-contain sm:w-12 sm:h-12 lg:w-16 lg:h-16" />
              <span className="font-semibold tracking-tight text-xl sm:text-3xl lg:text-4xl">HypeOn</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
