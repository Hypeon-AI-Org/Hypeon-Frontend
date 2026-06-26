'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import Section, { Cell } from "./Section";

const faqData = [
    {
        question: "What is HypeOn and who is it for?",
        answer: "HypeOn is an AI-powered growth platform built specifically for D2C brands. It combines competitor ad intelligence, AI-powered ad creation, and scaling tools in one place - so you can see what's working in your market, build ads from winning angles, and launch across every channel without the chaos. It's built for D2C founders, growth marketers, and performance teams who are tired of guessing and want to move faster than their competitors."
    },
    {
        question: "How is HypeOn different from AdSpy or Meta Ad Library?",
        answer: "AdSpy and the Meta Ad Library show you ads. HypeOn tells you what's actually working. We go beyond screenshots - surfacing which ads are actively scaling, how long they've been running, what angles and hooks are winning, what competitors' customers are complaining about in reviews, and which keywords are spiking right now. Then we let you turn all of that into live ads in seconds. It's the full loop, not just a library."
    },
    {
        question: "What does \"Find Competitors' Best Performing Ads\" actually mean?",
        answer: "It means we don't just show you what ads exist - we show you which ones are winning. We track run time, spend trajectory, engagement signals, and creative format performance across Meta and TikTok. An ad that's been running for 23 days with increasing spend is a signal. A UGC testimonial outperforming studio shots 3:1 is a signal. HypeOn surfaces those signals so you brief smarter, not harder."
    },
    {
        question: "Do I need a developer to set up HypeOn?",
        answer: "No. HypeOn connects to your ad accounts and product store in a few clicks - no code, no technical setup, no waiting on an agency. Most teams are up and running in under 10 minutes. If you run into anything, our support team is here."
    },
    {
        question: "How does HypeOn generate UGC and video ads?",
        answer: "You drop your product link or describe what you sell. HypeOn pulls the winning hooks, formats, and angles from competitor ads already scaling in your category, builds a brief automatically, and generates video, UGC-style, and static creatives ready to launch. The output is based on what's proven to work in your niche - not a generic template."
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
        <Section gridClassName="md:grid-cols-[1fr_2fr]">

            {/* Left cell: heading + context (vertical hairline separates it from the accordion) */}
            <Cell className="flex flex-col font-sans text-black">
                <div className="mb-4 flex items-center gap-2.5"><span className="h-px w-6 bg-neutral-300" /><span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Questions</span></div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl leading-tight font-bold text-slate-900 tracking-tighter">
                    Frequently<br className="hidden lg:block" /> asked
                </h2>
                <p className="mt-8 text-[14px] text-slate-500 leading-relaxed max-w-[280px]">
                    Read some of the most asked questions around Hypeon. If you cannot find your answer, reach out to us using the chat in the bottom-right corner!
                </p>
            </Cell>

            {/* Right cell: accordion - each question is a hairline-separated row (inside grid) */}
            <Cell bleed className="font-sans text-black">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-[var(--grid-line)] last:border-b-0 px-6 sm:px-8 lg:px-10"
                    >
                        <button
                            type="button"
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between py-5 text-left hover:text-slate-600 transition-colors group relative min-h-[48px] cursor-pointer"
                        >
                            <span className="text-[15px] sm:text-[16px] font-medium text-slate-900 group-hover:text-slate-600 transition-colors pr-8">
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
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] sm:max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-sm sm:text-[14px] text-slate-500 leading-relaxed pr-4 sm:pr-8">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </Cell>
        </Section>
    );
}
