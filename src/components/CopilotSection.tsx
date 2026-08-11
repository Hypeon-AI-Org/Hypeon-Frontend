"use client"; // Required for Framer Motion in Next.js App Router

import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingCart,
  Globe,
  Rocket,
  Zap,
  BarChart3
} from 'lucide-react';

const iconSize = 18; // Matches text-xl (~1.25rem) for visual alignment with title
const features = [
  {
    icon: TrendingUp, // Better for "margin" and "opportunities"
    title: "DTC Brand Owner",
    description: "Spending on paid ads and fighting for margin. You need to know what to sell next and where the real opportunities are - before your competitors do."
  },
  {
    icon: ShoppingCart, // More specific to the "Amazon/Retail" vibe
    title: "Amazon Seller",
    description: "Built on Amazon, thinking beyond it. Find trending products, track competitor moves, and discover which keywords are rising across every platform."
  },
  {
    icon: Globe, // Represents "Everywhere" and "Multi-channel"
    title: "Multi-Channel Brand",
    description: "Selling everywhere, clarity nowhere. Intelligence that works across your own site, Amazon, TikTok Shop and marketplaces - in one place."
  },
  {
    icon: Rocket, // Standard for "Growth-Stage" and "Scale"
    title: "Growth-Stage Brand",
    description: "Revenue growing, decisions getting harder. Stop relying on the same research tools as everyone else and start seeing signals weeks ahead."
  },
  {
    icon: Zap, // Represents "Sharp/Resourceful" and "Fast" action
    title: "Bootstrapped Founder",
    description: "Sharp, resourceful, allergic to wasting money. Get the intelligence that used to require a six-person research team - without the six-person budget."
  },
  {
    icon: BarChart3, // Represents "Data/Reporting" for clients
    title: "Marketing Agency",
    description: "Managing multiple brands and need trend data that's actually current. Give every client a competitive edge - and prove your value with signals they can't find anywhere else."
  }
];
// Animation Variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

export default function FeatureGrid() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28">
      {/* faint dot-grid backdrop, matching the reference layout */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_30%,black_40%,transparent_100%)]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tighter max-w-3xl mx-auto leading-tight">
              Intelligence for how you actually <span className=''>sell.</span>
            </h2>

            <p className="text-slate-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
              Whether you're on your own site, Amazon, TikTok Shop, or all three - HypeOn Intelligence works the way your business works.
            </p>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -4, boxShadow: '0 20px 40px -16px rgba(15,23,42,0.14)' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-[0_1px_2px_rgba(15,23,42,0.05)] sm:p-7"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 mb-6">
                  <Icon size={iconSize} strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-[17px] font-semibold text-slate-900 mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-[14px] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}