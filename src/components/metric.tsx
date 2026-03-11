import React from 'react';

const CTASection = () => {
    return (
        <section className="relative overflow-hidden bg-[oklch(0.988_0.0041_91.45)] py-16 px-6 font-sans">
            {/* Subtle background glow to match your theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Social Proof Badge */}
                <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">

                    <p className="text-sm font-medium text-gray-300">
                        Join 2,400+ brands scaling with truth
                    </p>
                </div>

                {/* Main Headline */}
                <h2 className="mb-6 text-3xl tracking-tight text-black md:text-4xl">
                    Your competitors read dashboards.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-black">
                        You can read the truth.
                    </span>
                </h2>

                {/* Subtext */}
                <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-relaxed text-gray-400">
                    Stop trusting inflated ROAS numbers. Our zero-code integration gives you the
                    raw performance data you need to scale what actually works.
                </p>

                {/* Action Area */}
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <a href="https://app.hypeon.ai/login" className="group relative flex h-12 items-center justify-center overflow-hidden rounded-xl bg-black px-6 font-semibold text-white transition-all hover:scale-[1.02] active:scale-95">
                        Get the demo
                    </a>


                </div>

                {/* Trust Markers */}
                <div className="mt-8 grid grid-cols-1 gap-6 border-t border-black/10 pt-8 sm:grid-cols-3">
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Setup</span>
                        <span className="text-base text-black">10 Minutes</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Integration</span>
                        <span className="text-base text-black">Zero Code</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Commitment</span>
                        <span className="text-base text-black">Cancel Anytime</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;