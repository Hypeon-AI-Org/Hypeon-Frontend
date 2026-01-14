'use client';

import { 
  BarChart3, 
  Layers, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Rocket, 
  HelpCircle,
  Brain,
  Link2,
  Filter,
  Package,
  UserCheck,
  MessageSquare,
  Lightbulb,
  Plug,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function SolutionsAnalytics() {
  const problems = [
    {
      icon: Layers,
      title: "Data is Fragmented",
      description: "Marketing data is scattered across multiple platforms."
    },
    {
      icon: BarChart3,
      title: "Double Attribution",
      description: "Double counting inflates performance numbers."
    },
    {
      icon: Eye,
      title: "No True Growth Visibility",
      description: "Unclear which channel actually drives growth."
    },
    {
      icon: DollarSign,
      title: "Budget Allocation is Guesswork",
      description: "Difficult to decide how much budget to allocate per channel."
    },
    {
      icon: TrendingUp,
      title: "Unclear Unit Economics",
      description: "No clean CAC, ROI, LTC, and real profit per channel."
    },
    {
      icon: Filter,
      title: "No Channel Role Clarity",
      description: "Unclear roles across awareness, traffic, conversions, and revenue."
    },
    {
      icon: Users,
      title: "No Channel-User Clarity",
      description: "Hard to identify best channels for new vs returning users."
    },
    {
      icon: Rocket,
      title: "Launch and Fit are Unclear",
      description: "Hard to identify best channels for launches or product-channel fit."
    },
    {
      icon: HelpCircle,
      title: "Dashboards Lack Direction",
      description: "Dashboards show data but do not answer what to do next."
    }
  ];

  const solutions = [
    {
      icon: Brain,
      title: "AI & ML-Powered Marketing Intelligence",
      description: "Autonomous AI agents analyze cross-channel performance and calculate true CAC, ROI, LTC, and profit per channel."
    },
    {
      icon: Link2,
      title: "Unified Cross-Channel View",
      description: "Google Ads, Meta Ads, TikTok, Pinterest, and GA4 in one system with unified metrics."
    },
    {
      icon: Filter,
      title: "Clean Attribution",
      description: "Last-click attribution removes double counting with clear separation of awareness, traffic, and conversion impact."
    },
    {
      icon: Package,
      title: "Channel & Product Intelligence",
      description: "Product-level performance by channel and product-channel fit analysis for awareness, traffic, orders, and launches."
    },
    {
      icon: UserCheck,
      title: "New vs Returning User Insights",
      description: "Channel effectiveness by user type with smarter budget allocation by lifecycle stage."
    },
    {
      icon: MessageSquare,
      title: "Conversational Analytics",
      description: "Ask questions in plain English, get instant answers and summaries, and generate reports in chat."
    },
    {
      icon: Lightbulb,
      title: "Actionable Recommendations",
      description: "Channels to scale, optimize, or pause with budget reallocation suggestions for profitable growth."
    },
    {
      icon: Plug,
      title: "No Developer Involvement",
      description: "Plug-and-play integrations with fully automated insights and reporting."
    }
  ];

  return (
    <>
      {/* Problems Section - Matching SolutionsProblems style */}
      <section className="py-24 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
            <h2 className="text-3xl md:text-4xl font-display text-slate-900 mb-6">
              Marketing Analytics <span className="text-brand-600">Problems</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Marketing data is scattered, attribution is broken, and you can't see which channels actually drive growth. 
              Here's what you're dealing with:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className="relative p-6 rounded-xl bg-white border-2 border-red-200 hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 transition-all reveal-scale group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <h3 className="text-lg font-semibold text-slate-900">
                          {problem.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section - Matching SolutionsSolutions style */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-brand-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
            <h2 className="text-3xl md:text-4xl font-display text-slate-900 mb-6">
              HypeOn <span className="text-brand-600">Analytics</span> Solutions
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              ML-powered AI agents and conversational analytics show where real marketing growth comes from and what to do next.
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
              <BarChart3 className="w-5 h-5" />
              <span>HypeOn Analytics focuses on profitable growth, not vanity metrics.</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
