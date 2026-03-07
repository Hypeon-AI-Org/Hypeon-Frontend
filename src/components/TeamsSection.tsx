"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Building2 } from 'lucide-react';

const TeamsSection = () => {
  const cards = [
    {
      icon: User,
      title: "Brand Founders",
      desc: "Stop making budget decisions based on unreliable platform data. See real ROAS, real growth.",
      bullets: [
        "Real ROAS across all channels",
        "No more double-counted conversions",
        "Decisions backed by unbiased data"
      ]
    },
    {
      icon: Users,
      title: "Marketing Teams",
      desc: "Know exactly which channels bring new customers vs returning customers. Scale the right ones.",
      bullets: [
        "New vs returning attribution split",
        "Scale / hold / pause signals",
        "AI Copilot for daily decisions"
      ]
    },
    {
      icon: Building2,
      title: "Agencies",
      desc: "Manage attribution across multiple brands with clear, client-ready reporting that proves results.",
      bullets: [
        "Multi-brand attribution workspace",
        "White-label client reporting",
        "Provable ROAS improvement data"
      ]
    }
  ];

  const stats = [
    { num: "2,400+", label: "Active brands" },
    { num: "48", label: "Countries" },
    { num: "$2.1B", label: "Revenue attributed" }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black-600 font-semibold tracking-wide uppercase text-xs mb-4"
          >
            Built for every team
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6 font-display"
          >
            Why brands choose <span className="text-brand-600">HypeOn Analytics</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 leading-relaxed"
          >
            Whether you're a founder, media buyer, or agency — HypeOn gives you the clarity to act fast on real data.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-gray-50 border border-gray-200 rounded-[24px] p-8 transition-shadow hover:shadow-xl hover:shadow-gray-200/50"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-200/80 text-gray-900">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-8">{card.desc}</p>

                <ul className="space-y-4">
                  {card.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-[13px] text-gray-700 font-medium">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-pink-600">
                          <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Stat Callout */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 rounded-[32px] p-8 md:p-12 relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-md text-center lg:text-left">
              <h3 className="text-white text-3xl md:text-4xl font-bold font-display leading-tight mb-4">
                +26% average ROAS increase
              </h3>
              <p className="text-gray-400 text-sm">
                Across 2,400+ brands · 48 countries · First 90 days
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="text-white text-4xl font-bold font-display tracking-tight"
                  >
                    {stat.num}
                  </motion.div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TeamsSection;