"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="bg-white py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Animated Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-sans text-gray-900 leading-[1.1] tracking-tight mb-6"
        >
          Stop researching with yesterday's <br className="hidden md:block" /> data.
        </motion.h2>

        {/* Animated Subtext */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-[15px] md:text-lg max-w-2xl leading-relaxed mb-8"
        >
          The day you connect HypeOn Intelligence, you start seeing 
          the signals your competitors haven't found yet. That's the 
          only edge that matters.
        </motion.p>

        {/* Animated Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <button className="bg-[#0A0A0A] text-white px-7 py-3 rounded-xl font-semibold text-[15px] hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95">
            Show me what I'm missing
          </button>
        </motion.div>

        {/* Animated Footer Tags */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-5 flex flex-wrap justify-center gap-2 text-gray-400 text-[13px] md:text-sm font-medium"
        >
          <span>Free to start</span>
          <span className="text-gray-300">•</span>
          <span>10 minute setup</span>
          <span className="text-gray-300">•</span>
          <span>No credit card required</span>
        </motion.div>
        
      </div>
    </section>
  );
}