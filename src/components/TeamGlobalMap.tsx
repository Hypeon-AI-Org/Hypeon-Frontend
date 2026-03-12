'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function StartToday() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden font-sans">
      
      <div className="bg-[oklch(0.988_0.0041_91.45)]">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-12 md:py-14 text-center">

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl  text-black tracking-tight"
          >
            Ready to move faster
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-3 text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            Get access to HypeOn AI and start making better decisions today.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link
              href="https://calendly.com/yash-hypeon/30min?month=2026-03"
              className="px-6 py-2.5 rounded-lg bg-black text-white font-semibold text-sm hover:bg-black/95 transition-colors shadow-md"
            >
              Get the demo
            </Link>

          
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 mx-auto max-w-3xl rounded-xl overflow-hidden shadow-xl border border-white/10"
          >
            <div className="relative aspect-[16/10] bg-slate-200">
              <Image
                src="/about/team.png"
                alt="Work with HypeOn AI"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}