'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StartToday() {
  return (
    <section className="bg-white pt-6 pb-0 sm:pt-8 lg:pt-10">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[28px] sm:aspect-[16/9] sm:rounded-t-[56px]"
        >
          <Image
            src="/about/team.webp"
            alt="HypeOn AI dashboard"
            fill
            className="object-cover object-top"
          />

          {/* left-to-right scrim so the overlaid copy stays readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

          <div className="relative flex h-full items-center px-6 sm:px-10 lg:px-16">
            <div className="max-w-md text-left">
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Ready to move <span className="text-white/50">faster</span>
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/70">
                Spend less. Sell more. Keep what you earn. Get access to HypeOn AI and put both
                engines - intelligence and creative - to work today.
              </p>

              <div className="mt-7">
                <a
                  href="https://calendly.com/yash-hypeon/30min"
                  className="group relative inline-flex items-center overflow-hidden rounded-full bg-gradient-to-b from-white to-neutral-100 px-6 py-3 text-sm font-bold text-black shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-black/5 transition-shadow duration-200 ease-out hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.5)]"
                >
                  <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
                    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get the demo</span>
                    <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">Get the demo</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
