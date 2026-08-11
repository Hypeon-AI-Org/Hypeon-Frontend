'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
        <section className="bg-white pt-16 pb-4 sm:pt-20 sm:pb-5 lg:pt-24 lg:pb-6">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-[160px_1fr] md:gap-16 lg:px-10">

            {/* Left column: title + contact button */}
            <div className="flex flex-col items-start md:pl-8 lg:pl-12">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 sm:text-3xl">FAQ</h2>
                <a
                    href="https://calendly.com/yash-hypeon/30min"
                    className="inline-flex items-center rounded-full bg-[#0a0a0c] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-black/80"
                >
                    Contact us
                </a>
            </div>

            {/* Right column: compact accordion list */}
            <div className="border-t border-slate-200 font-sans text-black">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className="border-b border-slate-200"
                    >
                        <button
                            type="button"
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex items-center justify-between py-4 text-left hover:text-slate-600 transition-colors group cursor-pointer"
                        >
                            <span className="text-[13px] sm:text-sm font-medium text-slate-800 group-hover:text-slate-600 transition-colors pr-8">
                                {faq.question}
                            </span>
                            <ChevronDown
                                className={`ml-4 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] pb-4 opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <p className="text-[13px] text-slate-500 leading-relaxed pr-8">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </section>
    );
}
