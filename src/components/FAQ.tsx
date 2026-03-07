'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is HypeOn and who is it for?",
        answer: "MarketerHypeOn is a prediction and attribution intelligence platform built specifically for e-commerce founders and brand owners. It combines HypeOn Intelligence (what to sell, what keywords to target, what creatives to run, where competitors are weak) with HypeOn Analytics (exactly which marketing channel drove every sale, with no double counting). It's for anyone running a Shopify store spending £5K–£500K+/month on ads who is tired of guessing."
    },
    {
        question: "How is HypeOn different from Jungle Scout or AdSpy?",
        answer: "Jungle Scout focuses only on Amazon product research. AdSpy focuses only on ad creative tracking. Neither tells you which channel actually drove your revenue, what your true CAC is by channel, or where competitors are gaining traffic. HypeOn is the only platform that covers trend discovery, keyword intelligence, creative analysis, competitor intelligence, GEO analysis, AND marketing attribution — all in one place, all connected, with an AI Copilot to make it actionable."
    },
    {
        question: "What does attribution without double counting actually mean?",
        answer: "Every ad platform (Google, Meta, TikTok) takes 100% credit for every sale it touched. So if a customer clicked a Google ad on Monday and a Facebook ad on Thursday before buying, both platforms claim that sale. Your real ROAS looks 2–4× better than it is. HypeOn's last-click attribution assigns every Shopify order to exactly ONE channel — the last touchpoint before purchase — using GA4 identity data and cross-device email bridging. You see reality, not platform propaganda."
    },
    {
        question: "Do I need a developer to set up HypeOn Analytics?",
        answer: "The Hype Score is a proprietary 0–100 metric updated daily for every product and keyword in our database. It combines four signals: Demand Momentum (how fast demand is rising), Seasonal Fit (whether timing amplifies or limits demand right now), Margin Potential (estimated profitability), and Competition Pressure (how saturated the market is). A score above 70 means early-stage, high-potential opportunity. Above 85 means breaking out now. It's designed to tell you whether to launch, wait, or skip — before you've spent a penny."
    },
    {
        question: "How accurate is the attribution coverage?",
        answer: "HypeOn achieves 80–85% attribution coverage on average. The remaining 15–20% is technically unavoidable without mandatory login — it covers customers who browse incognito, use iOS ITP, or switch devices without providing an email. Any tool claiming 100% attribution is using probabilistic modelling (guessing) or is inaccurate. We believe in transparent, honest attribution with confidence levels — so you know exactly how much to trust each data point."
    },
    {
        question: "Can I use HypeOn for multiple brands or stores?",
        answer: "Yes. The Agency / Enterprise plan supports multi-brand and multi-store setups with separate data environments for each brand. Agencies can manage multiple clients from a single dashboard with white-label reporting. Contact us for custom pricing based on the number of brands and combined ad spend."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16 bg-[#FDFDFC] border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-6 lg:gap-12">

                    {/* Left Column: Heading and Context */}
                    <div className="flex flex-col">
                        <h2 className="text-3xl md:text-4xl lg:text-[44px] leading-none font-medium text-slate-900 tracking-[-0.02em] mb-8">
                            FA<span className="text-brand-600">Q</span>
                        </h2>

                        <div className="mt-auto border-t border-slate-200 pt-8">
                            <p className="text-[14px] text-slate-500 leading-relaxed max-w-[280px]">
                                Read some of the most asked questions around Hypeon. If you cannot find your answer, reach out to us using the chat in the bottom-right corner!
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Accordion */}
                    <div className="flex flex-col border-t border-slate-200">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-slate-200"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between py-4 text-left hover:text-slate-600 transition-colors group"
                                >
                                    <span className="text-[16px] font-medium text-slate-900 group-hover:text-slate-600 transition-colors">
                                        {faq.question}
                                    </span>
                                    <span className="ml-6 flex-shrink-0 text-slate-400">
                                        {openIndex === index ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-32 pb-4 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-[14px] text-slate-500 leading-relaxed pr-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom CTA */}
                <div className="mt-20 flex justify-center">
                    <a
                        href="#"
                        className="inline-flex items-center gap-3 pl-2 pr-5 py-1.5 rounded-full bg-black text-white hover:bg-neutral-900 transition-colors"
                    >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-black">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14"></path>
                                <path d="m12 5 7 7-7 7"></path>
                            </svg>
                        </span>
                        <span className="text-[14px] font-medium">Book demo</span>
                    </a>
                </div>

            </div>
        </section>
    );
}
