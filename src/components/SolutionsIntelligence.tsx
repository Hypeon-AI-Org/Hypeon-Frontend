'use client';

import { 
  Sparkles, 
  Search, 
  Video, 
  DollarSign, 
  Users, 
  Briefcase,
  TrendingUp,
  Package,
  BrainCircuit,
  Zap
} from 'lucide-react';

export default function SolutionsIntelligence() {
  const intelligenceFeatures = [
    {
      icon: Sparkles,
      title: "Trend Spotter",
      description: "Discover products that are breaking out right now, not last month. Get validated winners with real-time velocity signals.",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Search,
      title: "Keyword Spy",
      description: "Find high-value keywords that are trending now. Stop bidding on dead keywords and start targeting what's actually converting.",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Video,
      title: "Ad Creatives",
      description: "See which ad creatives are winning in your niche. Learn from top performers and create ads that actually convert.",
      color: "from-pink-400 to-pink-600"
    },
    {
      icon: DollarSign,
      title: "Pricing Intelligence",
      description: "Get optimal pricing recommendations based on competitor analysis and market trends. Maximize margins without losing sales.",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Users,
      title: "Competitor Analysis",
      description: "Understand what your competitors are doing right. Track their products, pricing, and strategies in real-time.",
      color: "from-orange-400 to-orange-600"
    },
    {
      icon: Briefcase,
      title: "Find the Right Marketing Expert",
      description: "Connect with marketing experts who understand your niche and have access to the same intelligence you do.",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      icon: TrendingUp,
      title: "Product Development",
      description: "Skip months of guesswork. Get data-driven insights on what products to develop based on actual market demand.",
      color: "from-cyan-400 to-cyan-600"
    },
    {
      icon: Package,
      title: "Trend Prediction",
      description: "AI-powered predictions for your next design and product decisions based on 20M+ daily signals.",
      color: "from-rose-400 to-rose-600"
    },
    {
      icon: BrainCircuit,
      title: "AI Copilot",
      description: "Ask questions in plain English and get instant AI-powered insights. No dashboards, no SQL, no analysts required.",
      color: "from-brand-400 to-brand-600"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
          <h2 className="text-3xl md:text-4xl font-display text-slate-900 mb-6">
            HypeOn <span className="text-brand-600">Intelligence</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            The prediction engine that powers everything inside HypeOn — designed to identify what will work before it becomes obvious.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
          {intelligenceFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all reveal-scale group relative overflow-hidden"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 border border-slate-200/50 group-hover:scale-110 transition-transform shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center reveal-blur">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full font-semibold shadow-lg shadow-brand-500/30">
            <Zap className="w-5 h-5" />
            <span>Powered by 20M+ Daily Signals & Hype Score Algorithm</span>
          </div>
        </div>
      </div>
    </section>
  );
}

