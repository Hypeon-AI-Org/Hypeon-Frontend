"use client";

import { motion } from "framer-motion";
import { reveal } from "./constants";

const STEPS = [
  {
    n: "01",
    week: "Week 1",
    title: "Audit & baseline",
    desc: "We run your brand through the prompts your buyers actually type, score where you appear today, and audit the site behind it.",
    deliverable: "Prompt-share baseline + fix list",
  },
  {
    n: "02",
    week: "Weeks 2–4",
    title: "Build the foundation",
    desc: "Entity and schema work, the citable content set, technical fixes, and — where the site is the bottleneck — the new build.",
    deliverable: "Shipped pages, schema, content engine",
  },
  {
    n: "03",
    week: "Weeks 5–8",
    title: "Automate the loop",
    desc: "HypeOn wired into your stack: competitor intelligence feeding briefs, AI creative generation, lifecycle and campaign flows.",
    deliverable: "Live automations, human approval gate",
  },
  {
    n: "04",
    week: "Ongoing",
    title: "Measure & compound",
    desc: "Monthly prompt-share tracking, ranking and traffic reporting, creative readouts — and next quarter's queue built from what moved.",
    deliverable: "One dashboard, one monthly call",
  },
];

export default function ServicesProcess() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="mb-5 inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-[11px] font-medium text-slate-500">
            How we work
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-[#1a1a1a] sm:text-4xl">
            Eight weeks from invisible to cited, ranked and automated.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-500">
            No six-month discovery phase. A baseline in week one, shipped work
            every fortnight after that.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              {...reveal}
              transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
              className="group flex flex-col rounded-[16px] border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-gray-300 hover:shadow-[0_20px_44px_-24px_rgba(15,23,42,0.28)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#111] text-[11px] font-bold text-white tabular-nums">
                  {step.n}
                </span>
                <span className="rounded-[5px] bg-[#f5f5f5] px-[8px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#888]">
                  {step.week}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-tight text-[#111]">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#666]">
                {step.desc}
              </p>

              <div className="mt-auto pt-5">
                <div className="rounded-[10px] border border-[#f0f0f0] bg-[#fafafa] px-3 py-2.5">
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[#bbb]">
                    Deliverable
                  </p>
                  <p className="mt-1 text-[12.5px] font-medium leading-snug text-[#333]">
                    {step.deliverable}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
