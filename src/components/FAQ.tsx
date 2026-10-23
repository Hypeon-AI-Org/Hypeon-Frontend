'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Accent, Container, DarkButton, DEMO_URL, H2 } from '@/components/home/ui';

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
        <section className="bg-[#ededed] py-16 md:py-[120px]">
            <Container className="grid gap-8 md:grid-cols-[300px_1fr] md:gap-12">
                <div>
                    <H2 className="text-black">
                        Frequently asked <Accent>questions</Accent>
                    </H2>
                    <p className="mt-3 text-[18px] leading-[28px] text-[#545454] md:text-[20px] md:leading-[30px]">
                        Still curious? Talk to the team.
                    </p>
                    <DarkButton href={DEMO_URL} className="mt-6">
                        Book a demo
                    </DarkButton>
                </div>

                <div className="border-t border-black/10">
                    {faqData.map((faq, index) => {
                        const open = openIndex === index;
                        return (
                            <div key={index} className="border-b border-black/10">
                                <button
                                    type="button"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={open}
                                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                                >
                                    <span className="text-[18px] leading-[26px] text-[#121212] transition-opacity group-hover:opacity-70">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`h-5 w-5 shrink-0 text-[#545454] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-[600px] pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="pr-8 text-[16px] leading-[26px] text-[#545454]">{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
