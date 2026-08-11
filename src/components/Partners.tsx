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
      {/* 1. PARTNERS SECTION - dark, matching ProductEngines (section 2). Plain
          monochrome logo row, no card/border, fading out at the edges. */}
      <section className="rounded-t-[56px] bg-[#0a0a0c] py-12 sm:py-16">
        <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
          <div
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:flex-nowrap sm:justify-between"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <p className="shrink-0 text-white/60 font-semibold text-base sm:text-lg">
              Official partners
            </p>

            <Image
              src={googleStartups}
              alt="Google Cloud for Startups"
              width={110}
              height={50}
              className="w-[130px] sm:w-[150px] h-auto object-contain opacity-80 grayscale invert transition-opacity duration-300 hover:opacity-100"
            />

            <Image
              src={openAIBG}
              alt="OpenAI for Startups"
              width={95}
              height={50}
              className="w-[110px] sm:w-[130px] h-auto object-contain opacity-80 grayscale invert transition-opacity duration-300 hover:opacity-100"
            />

            <Image
              src={awsStartups}
              alt="AWS for Startups"
              width={95}
              height={50}
              className="w-[110px] sm:w-[130px] h-auto object-contain opacity-80 grayscale invert transition-opacity duration-300 hover:opacity-100"
            />

            <Image
              src={nividia}
              alt="NVIDIA"
              width={95}
              height={50}
              className="w-[110px] sm:w-[130px] h-auto object-contain opacity-80 grayscale invert transition-opacity duration-300 hover:opacity-100"
            />
          </div>
        </div>
      </section>
      {/* 2. FOUNDER SECTION - dark background, white paper letter floating on top. */}
      <div>
      <section className="relative min-h-[200px] flex items-center justify-center overflow-hidden rounded-b-[56px] bg-[#0a0a0c] py-16">

        {/* Faint dot-grid texture - same treatment as the other dark sections */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
          }}
        />

        {/* Backdrop Overlay - button for reliable mobile tap */}
        <button
          type="button"
          aria-label="Close overlay"
          className={`fixed inset-0 z-20 w-full h-full bg-black/60 backdrop-blur-sm transition-opacity duration-500 cursor-pointer border-0 p-0 appearance-none ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setViewState('idle')}
        />

        {/* The Card Container */}
        <div className={`
         relative z-30 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${isExpanded ? 'fixed inset-0 flex items-center justify-center p-3 sm:p-4 md:p-8' : 'w-full max-w-[480px] px-3 sm:px-4'}
        `}>

          <div
            {...(isExpanded ? { 'data-lenis-prevent': '' } : {})}
            role={isExpanded ? undefined : 'button'}
            tabIndex={isExpanded ? undefined : 0}
            onMouseEnter={() => !isExpanded && setViewState('hovered')}
            onMouseLeave={() => !isExpanded && setViewState('idle')}
            onClick={() => !isExpanded && setViewState('expanded')}
            onKeyDown={(e) => { if (!isExpanded && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setViewState('expanded'); } }}
            className={`
              relative bg-[#F5F1E6] border border-[#E5DEC9] transition-all duration-700
              ${isExpanded
                ? 'w-full max-w-[700px] max-h-[90vh] overflow-y-auto p-5 sm:p-8 md:p-10 lg:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.4)] rotate-0'
                : 'p-5 sm:p-7 md:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer min-h-[44px]'
              }
              ${viewState === 'idle' && !isExpanded ? '-rotate-1 translate-y-2' : ''}
              ${viewState === 'hovered' && !isExpanded ? 'rotate-0 translate-y-0 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.6)] border-[#D8CFAF]' : ''}
            `}
            style={{
              maskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 98%)',
              WebkitMaskImage: isExpanded ? 'none' : 'linear-gradient(to bottom, black 60%, transparent 98%)',
            }}
          >
            {/* Close Button */}
            {isExpanded && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setViewState('idle'); }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 p-2 rounded-full hover:bg-[#EDE6D3] transition-colors group min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Close"
              >
                <X size={20} className="text-[#A1A19A] group-hover:text-black" />
              </button>
            )}

            {/* Letter Content */}
            <div className="text-left font-mono ">
              <h2 className={`
                tracking-tight text-[#1A1A1A] font-medium leading-tight transition-all duration-500
                ${isExpanded ? 'text-[28px] md:text-[36px] mb-16' : 'text-[20px] mb-10'}
              `}>
                The growth stack is broken.
              </h2>

              <div className={`
                text-[#5E5E5C] transition-all duration-500
                ${isExpanded ? 'text-[15px] md:text-[16px] leading-[1.8] space-y-10' : 'text-sm leading-[1.7] space-y-6'}
              `}>
                <p>
                  Every e-commerce founder I know has the same morning routine. Open five tabs to see what their competitors are doing. Screenshot a few ads. Guess which ones are actually working. Then sit down to brief a creative they won't see for two weeks. None of it is based on truth.
                </p>
                <p>
                  A competitor goes viral and you scramble to reverse-engineer it. Was it the hook? The format? The targeting? By the time you've pieced it together, they've moved on to the next winner. You're always one step behind, not because you're slower, but because you're working blind.
                </p>
                {isExpanded && (
                  <>
                    <p>
                      Meanwhile, your agency takes three days to turn around a single ad. Your designer is backed up. And the trending product you spent months researching? Someone else launched it first. They saw the signal early. You didn't, because you were using the same tools as everyone else.
                    </p>
                    <p>
                      This is the problem I kept running into. Not the lack of tools. The lack of an unfair advantage. No one could show me which competitor ads were truly scaling. No one could turn that intelligence into a ready-to-launch ad in minutes. No one could tell me what was about to trend before it peaked.
                    </p>
                    <p>So we built HypeOn.</p>
                    <p>It decodes every competitor ad - spend, reach, the winning angles - so you start from what already works. It turns that intelligence into static, video, and UGC creatives in seconds, not weeks. And it spots breakout products and pricing gaps before the market catches on - so your next move is always the right one.

                    </p>
                    <div className="pt-12 border-t border-[#E5DEC9]">
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
      </div>
    </main>
  );
}
