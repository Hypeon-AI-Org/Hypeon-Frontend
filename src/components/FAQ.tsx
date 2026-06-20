'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        question: "What is HypeOn and who is it for?",
        answer: "HypeOn is an AI-powered growth platform built specifically for D2C brands. It combines competitor ad intelligence, AI-powered ad creation, and scaling tools in one place — so you can see what's working in your market, build ads from winning angles, and launch across every channel without the chaos. It's built for D2C founders, growth marketers, and performance teams who are tired of guessing and want to move faster than their competitors."
    },
    {
        question: "How is HypeOn different from AdSpy or Meta Ad Library?",
        answer: "AdSpy and the Meta Ad Library show you ads. HypeOn tells you what's actually working. We go beyond screenshots — surfacing which ads are actively scaling, how long they've been running, what angles and hooks are winning, what competitors' customers are complaining about in reviews, and which keywords are spiking right now. Then we let you turn all of that into live ads in seconds. It's the full loop, not just a library."
    },
    {
        question: "What does \"Find Competitors' Best Performing Ads\" actually mean?",
        answer: "It means we don't just show you what ads exist — we show you which ones are winning. We track run time, spend trajectory, engagement signals, and creative format performance across Meta and TikTok. An ad that's been running for 23 days with increasing spend is a signal. A UGC testimonial outperforming studio shots 3:1 is a signal. HypeOn surfaces those signals so you brief smarter, not harder."
    },
    {
        question: "Do I need a developer to set up HypeOn?",
        answer: "No. HypeOn connects to your ad accounts and product store in a few clicks — no code, no technical setup, no waiting on an agency. Most teams are up and running in under 10 minutes. If you run into anything, our support team is here."
    },
    {
        question: "How does HypeOn generate UGC and video ads?",
        answer: "You drop your product link or describe what you sell. HypeOn pulls the winning hooks, formats, and angles from competitor ads already scaling in your category, builds a brief automatically, and generates video, UGC-style, and static creatives ready to launch. The output is based on what's proven to work in your niche — not a generic template."
    },
    {
        question: "Can I use HypeOn across multiple brands or stores?",
        answer: "Yes. HypeOn is built to handle multiple brands, multiple ad accounts, and multiple markets. Whether you're an agency managing several D2C clients or a brand expanding into new geographies, you can track, create, and scale across all of them from one workspace. Reach out to us about our Scale plan for custom multi-brand pricing."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-10 sm:py-12 lg:py-16 bg-[oklch(0.988_0.0041_91.45)] font-sans text-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-12">

                    {/* Left Column: Heading and Context */}
                    <div className="flex flex-col">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-slate-900 tracking-tighter mb-8">
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
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-center justify-between py-3 sm:py-4 text-left hover:text-slate-600 transition-colors group relative min-h-[48px] sm:min-h-0 cursor-pointer"
                                >
                                    <span className="text-[15px] sm:text-[16px] font-medium text-slate-900 group-hover:text-slate-600 transition-colors pr-8 sm:pr-0">
                                        {faq.question}
                                    </span>
                                    <span className="ml-4 sm:ml-6 flex-shrink-0 text-slate-400">
                                        {openIndex === index ? (
                                            <Minus className="w-5 h-5" />
                                        ) : (
                                            <Plus className="w-5 h-5" />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] sm:max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <p className="text-[13px] sm:text-[14px] text-slate-500 leading-relaxed pr-4 sm:pr-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom CTA */}

            </div>
        </section>
    );
}
