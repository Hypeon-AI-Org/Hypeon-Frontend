"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CALENDLY_URL } from "./constants";

const FAQS = [
  {
    q: "What exactly is GEO, and is it different from SEO?",
    a: "Generative Engine Optimization makes your brand more likely to be cited or recommended by AI answer engines — ChatGPT, Perplexity, Gemini, Google AI Overviews. SEO competes for a slot on a page of ten links. GEO competes to be one of the two to five brands named inside a single synthesized answer. The signals overlap, but the unit of work differs: SEO optimizes pages, GEO optimizes the claims and entities a model can corroborate about you across many sources.",
  },
  {
    q: "How do you measure GEO when there is no ranking to check?",
    a: "We build a tracked prompt set from the questions your buyers actually ask, then run it across the major engines on a schedule. You get a prompt-share score — how often you are named, in what position, against which competitors — plus referral traffic from AI tools segmented in your analytics. A real baseline you can hold us to, not a feeling.",
  },
  {
    q: "Do I have to buy all four services?",
    a: "No. Plenty of brands start with the Visibility Sprint for a baseline, or with a website build because the site is the bottleneck. The services compound when they run together, but each stands on its own. We will tell you on the call which one moves your number first.",
  },
  {
    q: "How long before I see results?",
    a: "The audit and prompt-share baseline land inside two weeks. Technical and website fixes show up in days. GEO citations typically move over one to three months as new content gets crawled and corroborated — first movers in a category entrench fast. SEO compounds over three to six months. Automation pays back immediately in hours saved.",
  },
  {
    q: "Do I own the website and the content you produce?",
    a: "Yes, all of it. Code, content, design files, analytics and ad accounts stay in your name. If we stop working together, nothing switches off and nothing needs handing over — it is already yours.",
  },
  {
    q: "Is this the same as buying the HypeOn platform?",
    a: "The platform is software you run yourself. This is our team running the strategy and execution, using that platform plus everything around it — search, content, site build and automation. Many clients do both: we operate the loop while your team keeps the platform for day-to-day work.",
  },
  {
    q: "Which industries do you work with?",
    a: "Mostly D2C and e-commerce brands, B2B SaaS and marketplaces — the categories where buyers research before they buy, which is where AI answers and search decide the shortlist. If you sell something people ask questions about first, this applies to you.",
  },
];

export default function ServicesFAQ() {
  // All collapsed on load, matching the site's main FAQ.
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-[200px_1fr] md:gap-16 lg:px-10">
        <div className="flex flex-col items-start">
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-[#111] sm:text-3xl">
            FAQ
          </h2>
          <p className="mb-5 text-[13px] leading-relaxed text-[#888]">
            Still unsure whether GEO applies to your category? Ask us directly.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#0a0a0c] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black/80"
          >
            Contact us
          </a>
        </div>

        <div className="border-t border-[#f0f0f0]">
          {FAQS.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-b border-[#f0f0f0]">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full cursor-pointer items-center justify-between gap-8 py-4 text-left"
                >
                  <span
                    className={`text-[13px] font-medium transition-colors sm:text-sm ${
                      isOpen ? "text-[#111]" : "text-[#444] group-hover:text-[#111]"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#bbb] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[46rem] pb-5 pr-8 text-[13.5px] leading-relaxed text-[#666]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
