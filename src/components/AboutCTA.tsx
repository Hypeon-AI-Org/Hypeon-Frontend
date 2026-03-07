'use client'

import { motion } from "framer-motion"

export default function StartToday() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-sm tracking-[0.25em] text-neutral-400 mb-6">
            START TODAY
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-black leading-tight">
            Stop guessing.
            <br />
            <span className="text-brand-600">
              Start knowing.
            </span>
          </h2>

          <p className="mt-6 text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Your competitors are making decisions based on
            <span className="text-black font-medium"> 3-month-old data </span>
            and platform lies. HypeOn gives you the edge that turns founders
            into market winners.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 bg-black text-white rounded-full text-[15px] font-medium shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:bg-neutral-800 transition-all"
          >
            Get Early Access — Free Trial →
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ y: -2 }}
            className="px-6 py-3 text-black font-medium border border-neutral-300 rounded-full hover:bg-neutral-100 transition-all"
          >
            Book a Demo
          </motion.button>
        </motion.div>

        {/* Trust Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
          className="mt-6 text-sm text-neutral-500"
        >
          No credit card required · Setup in under 10 minutes · Cancel anytime
        </motion.p>

      </div>
    </section>
  )
}