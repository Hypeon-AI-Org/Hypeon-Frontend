'use client';

import { CheckCircle2, TrendingUp, Package, Search, Video, DollarSign, Users, Zap } from 'lucide-react';

export default function SolutionsSolutions() {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Trending Product Research",
      description: "Discover products that are breaking out right now, not last month. Get validated winners with real-time velocity signals."
    },
    {
      icon: Package,
      title: "Product Development",
      description: "Skip months of guesswork. Get data-driven insights on what products to develop based on actual market demand."
    },
    {
      icon: Search,
      title: "Trending Keyword Research",
      description: "Find high-value keywords that are trending now. Stop bidding on dead keywords and start targeting what's actually converting."
    },
    {
      icon: Video,
      title: "Ad Creatives Trend Analysis",
      description: "See which ad creatives are winning in your niche. Learn from top performers and create ads that actually convert."
    },
    {
      icon: DollarSign,
      title: "Pricing Intelligence",
      description: "Get optimal pricing recommendations based on competitor analysis and market trends. Maximize margins without losing sales."
    },
    {
      icon: TrendingUp,
      title: "Competitor Analysis",
      description: "Understand what your competitors are doing right. Track their products, pricing, and strategies in real-time."
    },
    {
      icon: Users,
      title: "Match with Right Marketing Expert",
      description: "Connect with marketing experts who understand your niche and have access to the same intelligence you do."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-brand-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
          <h2 className="text-3xl md:text-5xl font-display text-slate-900 mb-6">
            How <span className="text-brand-600">HypeOn</span> Helps
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            One platform. One dashboard. Everything you need to make profitable decisions faster.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-white border-2 border-brand-200 hover:border-brand-400 hover:shadow-xl hover:shadow-brand-500/10 transition-all reveal-scale group"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-slate-900">
                          {solution.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center reveal-blur">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full font-semibold shadow-lg shadow-brand-500/30">
            <Zap className="w-5 h-5" />
            <span>All Powered by HypeOn Intelligence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
