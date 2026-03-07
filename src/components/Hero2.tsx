import React from 'react';
import { CheckCircle2, ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[600px] w-full bg-[#003d2b] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 z-10">
          <p className="text-white text-xs font-bold uppercase tracking-widest mb-6">
            The Marketing Intelligence Platform
          </p>
          <h1 className="text-white text-5xl lg:text-7xl font-bold leading-[1.1] mb-8">
            Marketing reporting <br />
            that unlocks growth
          </h1>
          <p className="text-white/90 text-xl mb-10">
            Understand your performance and optimize with confidence.
          </p>

          <div className="space-y-4 mb-12">
            {[
              "Centralize all your marketing data",
              "Get clear unbiased measurement of marketing performance",
              "Move faster with AI-powered workflows"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="text-[#4ade80] w-6 h-6" />
                <span className="text-white text-lg font-medium">{text}</span>
              </div>
            ))}
          </div>

          <button className="bg-[#f0abfc] hover:bg-[#e879f9] text-black px-8 py-4 rounded-sm font-bold flex items-center gap-2 transition-all mb-12">
            Get a demo <ArrowRight size={20} />
          </button>

          {/* Ratings */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">4.7</span>
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">4.5</span>
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - The UI Mockup */}
        <div className="w-full lg:w-1/2 mt-20 lg:mt-0 relative">
            {/* Color accent bars behind the dashboard */}
            <div className="absolute -left-10 top-10 w-24 h-[500px] bg-[#fb923c] rounded-t-3xl opacity-80" />
            <div className="absolute -left-20 top-20 w-24 h-[500px] bg-[#60a5fa] rounded-t-3xl opacity-80" />
            
            {/* Main Dashboard Image Container */}
            <div className="relative shadow-2xl rounded-tl-2xl overflow-hidden border-l border-t border-white/20">
              <img 
                src="/dashboard-screenshot.png" 
                alt="Dashboard Preview" 
                className="w-full h-auto object-cover"
              />
              
              {/* Floating "Cost" Card (as seen in image) */}
              <div className="absolute top-20 -left-12 bg-white p-6 rounded-xl shadow-xl w-40">
                <p className="text-gray-500 text-xs font-bold uppercase flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Cost
                </p>
                <h4 className="text-2xl font-bold mt-2">$100K</h4>
                <p className="text-xs text-gray-400 mt-1">↓ 5% from $105K</p>
              </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;