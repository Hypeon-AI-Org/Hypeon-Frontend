'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, X } from 'lucide-react';

// Import your assets
import googleStartups from '../../assets/Google_Startups.png';
import openAIBG from '../../assets/OpenAI_BG.png';
import awsStartups from '../../assets/AWS_STUPS.png';
import nividia from '../../assets/nvidia-logo.png';

export default function CombinedLayout() {
  const [viewState, setViewState] = useState('idle'); // 'idle' | 'hovered' | 'expanded'
  const isExpanded = viewState === 'expanded';

  // Prevent scrolling when the letter is "pulled out"
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isExpanded]);

  return (
    <main>
      {/* 1. PARTNERS SECTION (NOW ON TOP) */}
      <section className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">

        {/* Grid Container */}
        <div className="grid grid-cols-2 md:grid-cols-5 items-center text-center">

          {/* Label Column */}
          <div className="py-7 px-6 border-b md:border-b-0 md:border-r border-slate-200">
            <p className="text-slate-700 font-medium">
              Official partners
            </p>
          </div>

          {/* Google */}
          <div className="py-7 px-5 border-b md:border-b-0 md:border-r border-slate-200 flex items-center justify-center">
            <Image
              src={googleStartups}
              alt="Google Cloud for Startups"
              width={110}
              height={50}
              
            />
          </div>

          {/* OpenAI */}
          <div className="py-7 px-5 border-b md:border-b-0 md:border-r border-slate-200 flex items-center justify-center">
            <Image
              src={openAIBG}
              alt="OpenAI for Startups"
              width={95}
              height={50}
             
            />
          </div>

          {/* AWS */}
          <div className="py-7 px-5 border-b md:border-b-0 md:border-r border-slate-200 flex items-center justify-center">
            <Image
              src={awsStartups}
              alt="AWS for Startups"
              width={95}
              height={50}
              
            />
          </div>

          {/* NVIDIA */}
          <div className="py-7 px-5 flex items-center justify-center">
            <Image
              src={nividia}
              alt="NVIDIA"
              width={95}
              height={50}
              
            />
          </div>

        </div>
      </div>
    </section>
      {/* 2. FOUNDER SECTION (NOW BELOW) */}
      <section className="relative min-h-[200px] flex items-center justify-center overflow-hidden bg-[#FBFBF9] py-16">

        {/* Very Light Grid Background */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${isExpanded ? 'blur-md opacity-[0.2]' : 'opacity-[0.4]'}`}
          style={{
            backgroundImage: `
              linear-gradient(to right, #E5E5E1 1px, transparent 1px),
              linear-gradient(to bottom, #E5E5E1 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          }}
        />

        {/* Backdrop Overlay */}
        <div
          className={`fixed inset-0 z-40 bg-[#FBFBF9]/40 backdrop-blur-sm transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setViewState('idle')}
        />

        {/* The Card Container */}
        <div className={`
          relative z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isExpanded ? 'fixed inset-0 flex items-center justify-center p-4 md:p-8' : 'w-full max-w-[480px] px-4'}
        `}>

          <div
            onMouseEnter={() => !isExpanded && setViewState('hovered')}
            onMouseLeave={() => !isExpanded && setViewState('idle')}
            onClick={() => !isExpanded && setViewState('expanded')}
            className={`
              relative bg-white border border-[#E8E8E3] transition-all duration-700
              ${isExpanded
                ? 'w-full max-w-[700px] max-h-[90vh] overflow-y-auto p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.06)] rotate-0'
                : 'p-9 shadow-[0_10px_40px_rgba(0,0,0,0.02)] cursor-pointer'
              }
              ${viewState === 'idle' && !isExpanded ? '-rotate-1 translate-y-2' : ''}
              ${viewState === 'hovered' && !isExpanded ? 'rotate-0 translate-y-0 shadow-lg border-[#D1D1CC]' : ''}
            `}
            style={{
              maskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 98%)',
              WebkitMaskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 98%)',
            }}
          >
            {/* Close Button */}
            {isExpanded && (
              <button
                onClick={(e) => { e.stopPropagation(); setViewState('idle'); }}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-[#F5F5F0] transition-colors group"
              >
                <X size={20} className="text-[#A1A19A] group-hover:text-black" />
              </button>
            )}

            {/* Letter Content */}
            <div className="text-left font-mono">
              <h2 className={`
                tracking-tight text-[#1A1A1A] font-medium leading-tight transition-all duration-500
                ${isExpanded ? 'text-[28px] md:text-[36px] mb-16' : 'text-[20px] mb-10'}
              `}>
                The growth stack is broken.
              </h2>

              <div className={`
                text-[#5E5E5C] transition-all duration-500
                ${isExpanded ? 'text-[15px] md:text-[16px] leading-[1.8] space-y-10' : 'text-[13px] leading-[1.7] space-y-6'}
              `}>
                <p>
                Every e-commerce founder I know has the same morning routine. Open five dashboards. See five different revenue numbers. Try to figure out which one is real. None of them are.
                </p>

                <p>
                Google takes credit for the sale. Meta takes credit for the same sale. TikTok does too. Add them up and you look like a genius. Check your bank account and the truth is 40–60% lower.
                </p>
                {isExpanded && (
                  <>
                    <p>
                    Meanwhile, you spend months researching a product. Launch it. Nothing happens. Two weeks later, someone else goes viral with the same thing. They saw the signal first. You didn't - because you were using the same tools as everyone else.
                    </p>
                    <p>
                    This is the problem I kept running into. Not a lack of tools. A lack of truth. No one could tell me which channel actually made the sale. No one could show me what was about to trend before it peaked. No one could give me a straight answer on where to put my next pound of ad spend.
                    </p>
                    <p>So we built HypeOn.</p>
                    <p>It scans 20 million signals a day to show you what's coming - weeks before it peaks. It attributes every order to one channel with zero double counting. And it answers your marketing questions in plain English, with specific numbers and specific actions.
2,400+ founders across 48 countries use it now. We're just getting started.
</p>
                    <div className="pt-12 border-t border-[#F0F0EB]">
                      <p className="font-semibold text-black text-[20px]">Yash Kumar</p>
                      <p className="text-sm opacity-50">founder</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Hover Hint */}
            {!isExpanded && (
              <div className={`
                absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 
                transition-all duration-300 pointer-events-none
                ${viewState === 'hovered' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
                <Mail size={16} className="text-black" />
                <span className="text-sm font-medium text-black whitespace-nowrap">Read our founder letter</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}