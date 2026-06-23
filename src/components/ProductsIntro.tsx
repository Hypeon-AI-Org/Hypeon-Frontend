"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Section, { Cell } from "./Section";

export default function TrendalyticsSection() {
  return (
    <Section cols={1}>
      {/* Header cell */}
      <Cell className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center p-2 rounded-lg mb-6">

          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl  font-bold tracking-tighter leading-tight mb-4">
            All your Competitor ads<br />
            <span className='text-[#696863]'>Across every platform</span>
          </h1>
          <p className="text-base text-gray-500 max-w-xl mx-auto mb-6">
            Access 200M ads with share of voice, reach, creative and estimated spend data.
          </p>
          <a href="https://app.hypeon.ai/hub/login" className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-[14px] inline-block">
            Get the demo
          </a>
        </motion.div>
      </Cell>

      {/* Dashboard image cell — hairline separates it from the heading above */}
      <Cell bleed className="px-6 py-12 sm:px-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden">

            {/* The Actual Image Container — full 16:9 image, no crop/fade */}
            <div className="relative w-full aspect-[16/9] bg-[#fcfcfc]">
              <Image
                src="/dashboard_2.png"
                alt="Trendalytics Dashboard UI"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </Cell>
    </Section>
  );
}
