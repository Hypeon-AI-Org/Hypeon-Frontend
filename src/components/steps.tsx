import React from 'react';
import Image from 'next/image';

const MarketerSteps = () => {
    const steps = [
        {
            number: "1",
            text: "Connect your store or channels",
        },
        {
            number: "2",
            text: "Let Hypeon maps every signal, gap and opportunity in your market",
        },
        {
            number: "3",
            text: "Launch monitor and scale real time"
        },
    ];

    return (
        <section className="max-w-5xl mx-auto px-6 py-14 font-sans text-black ">

            {/* Header */}
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-14 tracking-tight">
                It's easy to start growing <br /> with <span className='text-brand-600'>Hypeon.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* Image */}
                <div className="relative rounded-xl overflow-hidden aspect-square max-w-[360px] mx-auto">
                    <Image
                        src="/images/steps.png"
                        alt="Team working together"
                        width={360}
                        height={360}
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Steps */}
                <div className="space-y-2">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-6 py-5 border-b border-gray-100 last:border-0"
                        >
                            <span className="text-4xl font-bold text-gray-200 min-w-[40px]">
                                {step.number}
                            </span>

                            <p className="text-base font-medium leading-tight max-w-xs">
                                {step.text}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* CTA */}
            <div className="mt-14 flex justify-center">
                <a href="https://app.hypeon.ai/login" className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">

                    <span className="bg-white text-black rounded-full p-1">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>

                    Get the demo
                </a>
            </div>

        </section>
    );
};

export default MarketerSteps;