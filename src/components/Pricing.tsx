'use client';

import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-blur">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Simple Pricing, <span className="text-brand-600">Massive ROI</span>
          </h2>
          <p className="text-slate-500 text-lg">Pay for the tool with your first winning product launch.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl bg-slate-50 shadow-lg reveal-left relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Starter</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-display font-bold text-slate-900">€29</span>
              <span className="text-base font-normal text-slate-900">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 text-slate-900">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-slate-900 flex-shrink-0" /> 100 Trend Searches
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-slate-900 flex-shrink-0" /> Basic Launch Scores
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-slate-900 flex-shrink-0" /> Email Support
              </li>
            </ul>
            <a
              href="#"
              className="block w-full py-3 px-6 text-center rounded-full bg-white border-2 border-slate-200 text-slate-900 font-bold hover:border-slate-300 transition-all"
            >
              Start Trial
            </a>
          </div>

          {/* Pro Growth Plan */}
          <div className="p-8 rounded-3xl bg-slate-900 shadow-lg reveal-right relative overflow-visible">
            {/* POPULAR Badge */}
            <div className="absolute -top-3 -right-3 bg-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-lg uppercase tracking-wide transform rotate-3 z-10">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro Growth</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-display font-bold text-white">€89</span>
              <span className="text-base font-normal text-white">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 text-white">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-500 flex-shrink-0" /> Unlimited Searches
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-500 flex-shrink-0" /> AI Copilot Chat
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-brand-500 flex-shrink-0" /> Creative Generator
              </li>
            </ul>
            <a
              href="#"
              className="block w-full py-3 px-6 text-center rounded-full bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
