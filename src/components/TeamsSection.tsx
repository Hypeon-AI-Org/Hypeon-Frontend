"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, Building2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const TeamsSection = () => {
  const sections = [
    {
      icon: User,
      title: "Brand Founders",
      subtitle: "The clarity to lead with confidence",
      desc: "Stop making budget decisions based on unreliable platform data. HypeOn gives you one clear, unbiased truth across every channel so you can focus on growth, not guesswork.",
      image: "/images/founder.png",
      bullets: [
        "Real-time ROAS across all channels",
        "Deduplicated conversion tracking",
        "Profit-first growth metrics"
      ],
      reversed: false
    },
    {
      icon: Users,
      title: "Marketing Teams",
      subtitle: "Precision engineering for your ad spend",
      desc: "Know exactly which channels bring new customers vs returning customers. Our AI-driven signals help you decide where to scale, hold, or pause in real-time.",
      image: "/images/marketing.png",
      bullets: [
        "New vs returning attribution split",
        "Automated scale/pause signals",
        "AI Copilot for data-backed agility"
      ],
      reversed: true
    },
    {
      icon: Building2,
      title: "Agencies",
      subtitle: "Client performance, perfected",
      desc: "Manage multiple brands with a single source of truth. Deliver client-ready reporting that proves your value with verified data that platforms can't inflate.",
      image: "/images/agencies.png",
      bullets: [
        "Multi-brand workspace overview",
        "White-label transparency for clients",
        "Audit-ready performance data"
      ],
      reversed: false
    }
  ];

  const stats = [
    { num: "2,400+", label: "Active brands" },
    { num: "48", label: "Countries" },
    { num: "$2.1B", label: "Revenue attributed" }
  ];

  return (
    <section className="py-16 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden font-sans">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-900 font-medium tracking-wide uppercase text-xs mb-4"
          >
            Built for every team
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mb-6"
          >
            Why brands choose <span className="text-brand-600">HypeOn Analytics</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[15px] md:text-lg text-gray-500 leading-relaxed"
          >
            The ultimate attribution stack for high-growth D2C teams.
          </motion.p>
        </div>

        {/* Alternating Sections */}
        <div className="space-y-20 md:space-y-28">
          {sections.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col lg:items-center gap-8 lg:gap-12 ${item.reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: item.reversed ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-lg shadow-gray-200">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">{item.title}</h3>
                        <p className="text-xl font-semibold text-gray-900">{item.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <ul className="space-y-4">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                          <CheckCircle2 className="h-5 w-5 text-gray-900" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Dashboard Image Visual */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: item.reversed ? -30 : 30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-transparent rounded-[24px] -m-4 md:-m-6 blur-2xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    <div className="relative rounded-[24px] overflow-hidden border border-gray-200 shadow-2xl bg-white shadow-gray-200/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={500}
                        className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Stat Callout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-28 bg-gray-900 rounded-[32px] p-6 md:p-10 relative overflow-hidden text-center lg:text-left"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-pink-500/5 blur-[120px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            <div className="max-w-xl">
              <h3 className="text-white text-2xl md:text-4xl  tracking-tight leading-tight mb-6">
                Deliver <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">+26% average ROAS</span> increase across the board
              </h3>
              <p className="text-gray-400 text-lg">
                The data doesn't lie. Across 2,400+ brands, HypeOn Analytics consistently reveals untapped profitability in the first 90 days.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full lg:w-auto">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="text-white text-3xl md:text-4xl  tracking-tighter"
                  >
                    {stat.num}
                  </motion.div>
                  <div className="text-gray-500 text-xs uppercase tracking-[0.2em] ">
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