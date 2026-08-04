'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Section, { Cell } from './Section';

export default function StartToday() {
  return (
    <Section cols={2} className="font-sans">
      {/* LEFT - heading + CTA */}
      <Cell className="flex flex-col justify-center text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl md:text-4xl text-black tracking-tight"
        >
          Ready to move <span className="text-[#696863]">faster</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-3 text-base md:text-lg text-gray-500 max-w-xl mx-auto md:mx-0 leading-relaxed"
        >
          Spend less. Sell more. Keep what you earn. Get access to HypeOn AI and
          put both engines - intelligence and creative - to work today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-7 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3"
        >
          <Link
            href="https://calendly.com/yash-hypeon/30min"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold text-sm hover:bg-black/95 transition-colors shadow-md"
          >
            Get the demo
          </Link>
        </motion.div>
      </Cell>

      {/* RIGHT - image */}
      <Cell bleed className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative h-full min-h-[260px]"
        >
          <div className="relative h-full w-full bg-slate-200">
            <Image
              src="/about/team.webp"
              alt="Work with HypeOn AI"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </Cell>
    </Section>
  );
}
