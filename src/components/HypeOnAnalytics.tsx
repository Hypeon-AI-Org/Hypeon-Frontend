'use client';

import { 
  BarChart3, 
  Layers, 
  TrendingUp, 
  DollarSign, 
  Users, 
  CheckCircle2,
  XCircle,
  Zap,
  PieChart,
  Brain,
  Link2,
  Filter,
  Package,
  UserCheck,
  MessageSquare,
  Lightbulb,
  Plug,
  Activity,
  Target,
  Rocket,
  Search,
  LayoutDashboard
} from 'lucide-react';

export default function HypeOnAnalytics() {
  const problems = [
    {
      icon: Layers,
      title: "Fragmented Data",
      description: "Marketing data is scattered across multiple platforms with no single source of truth."
    },
    {
      icon: BarChart3,
      title: "Double Attribution",
      description: "Double counting across platforms inflates performance numbers and misleading ROAS."
    },
    {
      icon: Activity,
      title: "Growth Blindspots",
      description: "No clear visibility into which channel actually drives incremental growth."
    },
    {
      icon: DollarSign,
      title: "Budget Guesswork",
      description: "Difficulty deciding how much budget to allocate per channel without real attribution."
    },
    {
      icon: PieChart,
      title: "Unclear Economics",
      description: "Unclear CAC, ROI, and real profit per channel making scaling decisions risky."
    },
    {
      icon: Target,
      title: "Channel Role Confusion",
      description: "No understanding of each channel's specific role in Awareness, Traffic, or Revenue."
    },
    {
      icon: Rocket,
      title: "Optimization Struggle",
      description: "Hard to identify best channels for launches, new vs returning users, or product fit."
    },
    {
      icon: LayoutDashboard,
      title: "Static Dashboards",
      description: "Dashboards show historical data, but don't answer: 'What should we do next?'"
    }
  ];

  const solutions = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Autonomous AI agents analyze cross-channel performance and calculate true CAC, ROI, and profit per channel."
    },
    {
      icon: Link2,
      title: "Unified Cross-Channel View",
      description: "Google Ads, Meta Ads, TikTok, Pinterest, and GA4 in one single source of truth with unified metrics."
    },
    {
      icon: Filter,
      title: "Clean Attribution",
      description: "Last-click attribution removes double counting with clear separation of awareness and conversion impact."
    },
    {
      icon: Package,
      title: "Product Intelligence",
      description: "Product-level performance by channel to identify best fits for awareness, traffic, and launches."
    },
    {
      icon: UserCheck,
      title: "User Lifecycle Insights",
      description: "Channel effectiveness by user type with smarter budget allocation for new vs returning customers."
    },
    {
      icon: MessageSquare,
      title: "Conversational Analytics",
      description: "Ask questions in plain English and get instant answers, summaries, or reports directly in chat."
    },
    {
      icon: Lightbulb,
      title: "Actionable Recommendations",
      description: "Specific channels to scale, optimize, or pause with budget reallocation suggestions for growth."
    },
    {
      icon: Plug,
      title: "Zero-Code Integration",
      description: "Plug-and-play integrations with fully automated insights and reporting. No developers required."
    }
  ];

  return (
    <div id="analytics" className="relative">
      {/* Problems Section */}
      <section className="py-24 bg-white relative z-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
            <h2 className="text-3xl md:text-4xl font-display text-slate-900 mb-6">
              Marketing Analytics <span className="text-red-600">Problems</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Traditional analytics are fragmented, delayed, and misleading. 
              Here is why most D2C brands struggle to see their true performance:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className="relative p-8 rounded-[32px] bg-slate-50 border border-slate-200 hover:border-red-200 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 transition-all reveal-scale group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-red-50 group-hover:border-red-100 transition-all duration-500">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-red-500" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {problem.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-brand-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
            <h2 className="text-4xl md:text-5xl font-display text-slate-900 mb-6">
              HypeOn <span className="text-brand-600">Analytics</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              HypeOn Analytics uses ML-powered AI agents and conversational analytics to show where 
              your real marketing growth comes from—and what to do next.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={index}
                  className="relative p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/10 transition-all reveal-scale group overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-brand-500/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-6 border border-brand-100 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {solution.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


