'use client';

import { Brain, Link2, Zap } from 'lucide-react';

export default function MarketingDecisioning() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-brand-50/20 to-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto reveal-blur">
          <h2 className="text-4xl md:text-5xl font-display text-slate-900 mb-6">
            Make better marketing decisions on{" "}
            <span className="text-brand-600">HypeOn</span>
          </h2>
          
          <div className="mt-8 p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center border border-brand-100">
                <Brain className="w-6 h-6 text-brand-600" />
              </div>
              <div className="text-left">
                <p className="text-lg text-slate-700 leading-relaxed">
                  <span className="font-medium text-slate-900">AI-powered marketing decisioning.</span>{" "}
                  Connect data, analyze results with agents, and orchestrate actions across your stack.
                </p>
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto reveal-stagger">
            <div className="p-6 rounded-2xl bg-white/60 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 border border-brand-100">
                <Link2 className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Connect Data</h3>
              <p className="text-xs text-slate-600">Unified view across all your marketing platforms</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/60 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 border border-brand-100">
                <Brain className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Analyze with Agents</h3>
              <p className="text-xs text-slate-600">AI agents process and interpret your results</p>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/60 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4 border border-brand-100">
                <Zap className="w-5 h-5 text-brand-600" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-2">Orchestrate Actions</h3>
              <p className="text-xs text-slate-600">Automate decisions across your entire stack</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
