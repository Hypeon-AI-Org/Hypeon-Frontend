"use client";
import Image from 'next/image';
import { ArrowUpRight, Search, Info, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrendalyticsSection() {
  return (
    <section className="bg-white py-20 px-4">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto text-center mb-8"
      >
        <div className="inline-flex items-center justify-center p-2 rounded-lg mb-6">

        </div>
        <h1 className="text-2xl md:text-4xl font-medium tracking-tight mb-4">
          See what's coming.<br />
          Weeks before anyone else.
        </h1>
        <p className="text-[17px] text-gray-500 max-w-xl mx-auto mb-6">
          HypeOn Intelligence scans 20M+ signals daily across TikTok, Amazon, Google, Reddit, Pinterest and 90+ sources — and tells you what products will trend, which keywords convert, and which markets are wide open. Before your competitors see it...
        </p>
        <button className="bg-[#1a1a1a] text-white px-6 py-2.5 rounded-full text-[14px]">
          Get In Touch
        </button>
      </motion.div>

      {/* Dashboard Section with Real Image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="max-w-4xl mx-auto "
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] overflow-hidden">

          {/* The Actual Image Container */}
          <div className="relative w-full aspect-[16/10] bg-[#fcfcfc]">
            <Image
              src="/images/dash.png"
              alt="Trendalytics Dashboard UI"
              fill
              priority
              className="object-top object-cover"
            />

            {/* White Blur/Fade Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />

          </div>
        </div>
      </motion.div>
    </section>
  );
}