import React from 'react';
import { ChevronRight } from 'lucide-react';

const MetricsSection = () => {
  const metrics = [
    {
      category: "Channels",
      title: "8 integrations connected",
      description: "Google Ads, Meta, TikTok, Pinterest, and more",
    },
    {
      category: "Coverage",
      title: "83% attribution without logins",
      description: "Capture sales across devices and browsers",
    },
    {
      category: "Growth",
      title: "+26% average ROAS increase",
      description: "Brands see real improvement after switching",
    },
    {
      category: "Setup",
      title: "10 minutes to go live",
      description: "No engineers needed, no code required",
    },
  ];

  return (
    <section className=" bg-oklch(0.988_0.0041_91.45) py-14 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-sm font-bold tracking-tight mb-4">Metrics</p>
          <h2 className="text-3xl md:text-4xl font-display text-black mb-6">
            What the numbers <span className="text-brand-600">show</span>
          </h2>
          <p className="text-gray-600 text-[15px]">
            Real data from real brands using HypeOn every day
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-2xl p-6 flex flex-col justify-between min-h-[240px] hover:border-black transition-colors group cursor-pointer"
            >
              <div>
                <p className="text-xs  uppercase tracking-wider mb-4">
                  {item.category}
                </p>
                <h3 className="text-xl leading-tight mb-4 text-black">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-sm font-semibold">
             
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;