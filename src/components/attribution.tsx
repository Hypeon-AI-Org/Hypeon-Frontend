"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Hub, VerifiedUser, ShowChart, Timer,  Laptop, 
  Mail, 
  MapPin, 
  MousePointerClick, 
  BrainCircuit, 
  TrendingUp  } from 'lucide-react'; // Or use standard Lucide names
import { Share2, ShieldCheck, Clock } from 'lucide-react';

const metrics = [
  {
    icon: <Share2 className="w-6 h-6" />,
    value: "8 Channels",
    label: "Omnichannel Integration",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    value: "83% Coverage",
    label: "Attributed Order Volume",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    value: "+26% ROAS",
    label: "Average Performance Lift",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    value: "10 min Setup",
    label: "Zero-Code Implementation",
  },
];


const stages = [
  {
    id: "L1",
    name: "Same Device",
    desc: "Direct cookie and browser fingerprint match for 1:1 identification.",
    icon: <Laptop className="w-6 h-6" />,
    accuracy: "99.9% Accuracy",
    color: "bg-pink-600"
  },
  {
    id: "L2",
    name: "Email Bridge",
    desc: "Cross-device identity via hashed email matching across sessions.",
    icon: <Mail className="w-6 h-6" />,
    color: "bg-gray-200 dark:bg-gray-800"
  },
  {
    id: "L3",
    name: "Household IP",
    desc: "Location-based pairing for shared connections and family accounts.",
    icon: <MapPin className="w-6 h-6" />,
    color: "bg-gray-200 dark:bg-gray-800"
  },
  {
    id: "L4",
    name: "Click History",
    desc: "Touchpoint sequencing and referral path reconstruction.",
    icon: <MousePointerClick className="w-6 h-6" />,
    color: "bg-gray-200 dark:bg-gray-800"
  },
  {
    id: "L5",
    name: "Probabilistic AI",
    desc: "Machine learning pattern matching for dark social attribution.",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "bg-gray-200 dark:bg-gray-800"
  }
];
const MetricsAndCTA = () => {
  return (
    <div className="bg-white dark:bg-slate-900 font-sans">

      <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-8">
        
        {/* Header - premium theme */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black-600 font-semibold tracking-wide uppercase text-xs mb-4"
          >
            Multi-touch attribution
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 font-display"
          >
            The Attribution <span className="text-brand-600">Waterfall</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed"
          >
            Our proprietary 5-layer identification engine ensures no sale goes unattributed.
            From deterministic matching to AI-driven probabilistic models.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Waterfall Flow - premium card style */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {stages.map((stage, idx) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                whileHover={{ x: 4 }}
                className="flex gap-6 group bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[24px] p-6 transition-shadow hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50"
              >
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 z-10
                    ${idx === 0 ? 'text-white bg-pink-600 shadow-lg shadow-pink-500/30' : 'bg-gray-200/80 dark:bg-gray-700 text-gray-900 dark:text-white group-hover:bg-pink-600 group-hover:text-white'}
                  `}
                  >
                    {stage.icon}
                  </div>
                  {idx !== stages.length - 1 && (
                    <div className="w-[2px] h-12 flex-1 min-h-[24px] bg-gradient-to-b from-pink-500/40 to-transparent rounded-full mt-1" />
                  )}
                </div>

                <div className="pt-0.5 pb-2">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white font-display">
                    {stage.id}: {stage.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-1">
                    {stage.desc}
                  </p>
                  {stage.accuracy && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 + 0.2 }}
                      className="inline-block mt-3 px-3 py-1 rounded-lg bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 text-[10px] font-bold uppercase tracking-wider"
                    >
                      {stage.accuracy}
                    </motion.span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Coverage Indicator Card - premium dark container */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="bg-gray-900 dark:bg-gray-900 p-10 rounded-[32px] relative overflow-hidden flex flex-col items-center text-center shadow-2xl"
            >
              {/* Premium glow */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-500/10 blur-[120px]" />
              <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-500/10 blur-[100px]" />

              {/* Circular Progress */}
              <div className="relative w-48 h-48 mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-700"
                    cx="50" cy="50" r="45"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <motion.circle
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 48 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-pink-500"
                    cx="50" cy="50" r="45"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-5xl font-black text-white font-display"
                  >
                    83%
                  </motion.span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Coverage</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-display">
                Maximum Traceability
              </h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">
                Outperform standard GA4 tracking by over 30% with our cross-domain waterfall technology.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-xl text-xs font-bold"
              >
                <TrendingUp className="w-4 h-4" />
                +12% tracking accuracy vs Last-Click
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
      {/* --- Metric Cards Grid - premium container style --- */}
      <section className="py-16 px-8 max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-[24px] border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-shadow cursor-default text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-200/80 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                {metric.icon}
              </div>
              <div className="text-3xl font-black text-gray-900 dark:text-white mb-1 font-display">
                {metric.value}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- Bottom CTA Section - premium dark container --- */}
      <section className="py-24 px-8 max-w-[1160px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-900 dark:bg-gray-900 rounded-[32px] p-12 md:p-20 text-center overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-500/10 blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white text-4xl md:text-5xl font-bold mb-6 font-display tracking-tight"
            >
              Ready to fix your tracking?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
            >
              Join the top-performing Shopify stores using HypeOn to scale their ad spend with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:-translate-y-1 transition-all shadow-xl">
                Start Free Trial
              </button>
              <button className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                Talk to Sales
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-gray-500 text-sm font-medium"
            >
              Free 14-day trial • No credit card required • 10-min setup
            </motion.p>
          </div>
        </motion.div>
      </section>

      
    </div>
  );
};

export default MetricsAndCTA;