'use client';

import { Clock, DollarSign, TrendingDown, Target, AlertCircle, BarChart3, Users, XCircle } from 'lucide-react';

export default function SolutionsProblems() {
  const problems = [
    {
      icon: Clock,
      title: "Months of Research",
      description: "Spending months finding the right trending products or keywords across multiple tools"
    },
    {
      icon: Clock,
      title: "Slow Product Development",
      description: "Months of research in product development before even launching"
    },
    {
      icon: DollarSign,
      title: "Multiple Tool Subscriptions",
      description: "Paying for multiple research tools that don't talk to each other"
    },
    {
      icon: DollarSign,
      title: "Wasted Budget on Experiments",
      description: "Months of experimentation that cost budget with no guaranteed results"
    },
    {
      icon: BarChart3,
      title: "Limited Data Decisions",
      description: "Making decisions based on limited data and constrained budgets"
    },
    {
      icon: AlertCircle,
      title: "Wrong Pricing Strategy",
      description: "Pricing products incorrectly—either too high (no sales) or too low (loss in margin)"
    },
    {
      icon: TrendingDown,
      title: "Struggling with Profits",
      description: "Promoting highly competitive products with high CPA, eating into margins"
    },
    {
      icon: Target,
      title: "Wrong Product Selection",
      description: "Spending on products with no future trends—bidding on items that won't convert"
    },
    {
      icon: Target,
      title: "Wrong Traffic & Keywords",
      description: "Driving wrong traffic with keywords that don't convert"
    },
    {
      icon: XCircle,
      title: "Ineffective Ad Copy",
      description: "Ad copy that doesn't resonate with your potential customers"
    },
    {
      icon: Users,
      title: "Mismatched Marketing Experts",
      description: "Working with marketing experts who don't understand your niche or data"
    }
  ];

  return (
    <section className="py-24 bg-white relative z-10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-blur">
          <h2 className="text-3xl md:text-5xl font-display text-slate-900 mb-6">
            The <span className="text-red-500">Normal Process</span> is Broken
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Traditional e-commerce and marketing workflows waste time, money, and opportunity. 
            Here's what you're dealing with right now:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-200 hover:bg-red-50/30 transition-all reveal-scale"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {problem.title}
                    </h3>
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
  );
}
