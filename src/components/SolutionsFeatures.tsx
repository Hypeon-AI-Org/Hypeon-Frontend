'use client';

import { TrendingUp, Search, Video, DollarSign, BarChart3, BrainCircuit, Users } from 'lucide-react';

export default function SolutionsFeatures() {
  const features = [
    {
      icon: TrendingUp,
      title: "Trending Products",
      description: "Real-time product trend analysis with predictive scoring"
    },
    {
      icon: Search,
      title: "Trending Keywords",
      description: "High-value keyword discovery with conversion potential"
    },
    {
      icon: Video,
      title: "Trending Ad Creatives",
      description: "Winning ad creative analysis and inspiration"
    },
    {
      icon: DollarSign,
      title: "Price Intelligence",
      description: "Optimal pricing recommendations based on market data"
    },
    {
      icon: BrainCircuit,
      title: "Trend Prediction",
      description: "AI-powered predictions for your next design and product decisions"
    },
    {
      icon: Users,
      title: "Expert Matching",
      description: "Find the right digital marketer + expert consulting calls"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
          <h2 className="text-3xl md:text-4xl font-display text-slate-900 mb-6">
            Everything You Need in <span className="text-brand-600">One Platform</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Stop juggling multiple tools. HypeOn Intelligence brings all your research and decision-making into one unified dashboard.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 reveal-stagger">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-8 rounded-2xl hover:shadow-xl transition-all reveal-scale group"
              >
                <div className="w-14 h-14 bg-brand-500/10 rounded-xl flex items-center justify-center mb-6 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
                  <Icon className="w-7 h-7 text-brand-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
