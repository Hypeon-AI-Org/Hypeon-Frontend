"use client"; // Required for Framer Motion in Next.js App Router

import React from 'react';
import { motion } from 'framer-motion';
import Section, { Cell } from './Section';
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
    description: "Spending on paid ads and fighting for margin. You need to know what to sell next and where the real opportunities are — before your competitors do."
  },
  {
    icon: ShoppingCart, // More specific to the "Amazon/Retail" vibe
    title: "Amazon Seller",
    description: "Built on Amazon, thinking beyond it. Find trending products, track competitor moves, and discover which keywords are rising across every platform."
  },
  {
    icon: Globe, // Represents "Everywhere" and "Multi-channel"
    title: "Multi-Channel Brand",
    description: "Selling everywhere, clarity nowhere. Intelligence that works across your own site, Amazon, TikTok Shop and marketplaces — in one place."
  },
  {
    icon: Rocket, // Standard for "Growth-Stage" and "Scale"
    title: "Growth-Stage Brand",
    description: "Revenue growing, decisions getting harder. Stop relying on the same research tools as everyone else and start seeing signals weeks ahead."
  },
  {
    icon: Zap, // Represents "Sharp/Resourceful" and "Fast" action
    title: "Bootstrapped Founder",
    description: "Sharp, resourceful, allergic to wasting money. Get the intelligence that used to require a six-person research team — without the six-person budget."
  },
  {
    icon: BarChart3, // Represents "Data/Reporting" for clients
    title: "Marketing Agency",
    description: "Managing multiple brands and need trend data that's actually current. Give every client a competitive edge — and prove your value with signals they can't find anywhere else."
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
    <Section cols={3}>
      {/* Header — full width, hairline below separates it from the card grid */}
      <Cell className="md:col-span-3 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-4xl font-bold text-slate-900 mb-6 tracking-tighter max-w-3xl mx-auto leading-tight">
            Intelligence for how you actually <span className='text-[#696863]'>sell.</span>
          </h2>

          <p className="text-slate-500 text-[15px] max-w-2xl mx-auto leading-relaxed">
            Whether you're on your own site, Amazon, TikTok Shop, or all three — HypeOn Intelligence works the way your business works.
          </p>
        </motion.div>
      </Cell>

      {/* Feature cards — each its own Cell so hairlines divide the grid */}
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Cell key={index} className="text-left">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="inline-flex items-center justify-center w-10 h-8 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 mb-6">
                <Icon size={iconSize} strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-[17px] font-semibold text-slate-900 mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-[14px] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          </Cell>
        );
      })}
    </Section>
  );
}