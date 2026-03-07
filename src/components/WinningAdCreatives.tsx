'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function TikTokScrollSection() {

  return (
    <section className="relative  bg-white py-14 overflow-hidden font-sans">

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">

        {/* LEFT TEXT */}
        <motion.div className="z-20 bg-white lg:pl-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >


          <motion.p variants={item} className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-medium mb-4">
            Winning creatives
          </motion.p>

          <motion.h2
            variants={item}
            className="text-2xl md:text-3xl text-[#1a1a1a] leading-[1.15] mb-6 max-w-lg"
          >
            We understand and <br /> analyze Ads so <br />
            <span className="opacity-40">you don&apos;t have to.</span>
          </motion.h2>

          <motion.p
            variants={item}
            className="text-[#757575] text-[13px] leading-relaxed max-w-md mb-6"
          >
            Our Ads Insights tool, powered by proprietary AI, offers a unique
            ability to track and capitalize on Ads trends.
          </motion.p>

          <motion.div variants={item}>
            <motion.a
              href="#"
              className="btn-primary inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              Get Started
            </motion.a>
          </motion.div>

        </motion.div>

        {/* AUTO SCROLL GRID */}
        <div className="relative flex gap-6 h-[620px] overflow-hidden">

          {/* COLUMN 1 */}
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex flex-col gap-6 w-1/2"
          >

            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-6">

                <VideoItem height="h-[260px]" src="/images/image.png" isVideo />
                <VideoItem height="h-[260px]" src="/images/wallpaper.png" isVideo />
                <VideoItem height="h-[260px]" src="/images/diy.png" isVideo />

              </div>
            ))}

          </motion.div>


          {/* COLUMN 2 */}
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex flex-col gap-4 w-1/2 pt-20"
          >

            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex flex-col gap-6">

                <VideoItem height="h-[260px]" src="/images/tech (1).png" isVideo />
                <VideoItem height="h-[260px]" src="/images/curtains.png" isVideo />
                <VideoItem height="h-[260px]" src="/images/image.png" isVideo />

              </div>
            ))}

          </motion.div>

        </div>

      </div>

    </section>
  );
}


function VideoItem({ height, src, isVideo = false }: { height: string; src: string; isVideo?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative w-full ${height} rounded-[2rem] overflow-hidden bg-gray-100 border shadow-sm`}
    >

      <img src={src} className="w-full h-full object-cover" alt="TikTok Content" />

      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">

          <div className="w-14 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">

            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[10px] border-l-white border-b-[8px] border-b-transparent ml-1" />

          </div>

        </div>
      )}

    </motion.div>
  );
}