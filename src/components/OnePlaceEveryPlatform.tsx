'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { primeIOSVideo } from '@/lib/videoAutoplay';

/* ============================================================
   "One place. Every platform." - a light section right after the
   founder letter: heading + subheading, then one large composited
   video (photo + animated "live connections" status ticker baked
   into the footage) inside a rounded frame.
============================================================ */

export default function OnePlaceEveryPlatform() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Autoplay can silently fail on first mount in some browsers (especially
  // right after a route/section becomes visible) - nudge it once mounted.
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            One place. Every platform.
          </h2>
          <p className="mt-4 text-sm text-neutral-500 sm:text-base">
            The average marketing team pays for 91 tools and actively uses fewer than half.
            Connect what you already have. HypeOn reads across all of it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 overflow-hidden rounded-3xl bg-black shadow-[0_30px_70px_-25px_rgba(0,0,0,0.35)] sm:mt-16"
        >
          <video
            ref={videoRef}
            src="/One-Place-Every-Platform.mp4"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            preload="auto"
            onLoadedData={(e) => primeIOSVideo(e.currentTarget)}
            className="block w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
