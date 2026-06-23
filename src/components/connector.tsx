import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link2, Target, Sparkles } from 'lucide-react';

const FloatingCard = ({
  icon: Icon,
  title,
  description,
  className,
  delay = 0
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let rafId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left - rect.width / 2;
        const y = clientY - rect.top - rect.height / 2;
        card.style.transform = `translate3d(${x * 0.08}px, ${y * 0.08}px, 0)`;
      });
    };

    const handleMouseLeave = () => {
      card.style.transform = 'translate3d(0, 0, 0)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`absolute bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-soft-lg border border-gray-200 transition-all duration-500 cursor-pointer ${className} ${isHovered ? 'shadow-soft-xl border-gray-300' : ''
        }`}
      style={{
        animationDelay: `${delay}s`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease, border-color 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-2 sm:gap-3">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="min-w-0">
          <h4 className="font-semibold text-black text-xs sm:text-sm">{title}</h4>
          <p className="text-gray-500 text-[11px] sm:text-xs mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section className="relative min-h-0 sm:min-h-[75vh] overflow-hidden bg-[oklch(0.988_0.0041_91.45)] font-sans text-[#111] antialiased">
      {/* Subtle grid background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Navigation */}


      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 lg:pb-14">
        <div className="max-w-7xl mx-auto">
          {/* Text Content */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 reveal">
            <h1 className="text-2xl sm:text-4xl md:text-4xl text-black mb-4 sm:mb-6 text-balance tracking-tight">
              The most True{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-700 to-black">attribution platform</span>{' '}
              for <span className="text-[#696863]">e-commerce</span>
            </h1>

            <p className="text-sm sm:text-[15px] text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              No more inflated ROAS from platforms marking their own homework.
              HypeOn cleans, unifies and attributes every sale — giving you one clear,
              unbiased truth across every channel.
            </p>


          </div>

          {/* Dashboard Visual */}
          <div className="relative max-w-4xl mx-auto reveal-scale px-1 sm:px-0">
            {/* Main Dashboard Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-soft-xl bg-white">
              <Image
                src="/images/hero.webp"
                alt="HypeOn Analytics Dashboard"
                width={1200}
                height={720}
                className="w-full h-auto"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>

            {/* Mobile + tablet cards */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
              <FloatingCard
                icon={Link2}
                title="Connect"
                description="All 8 channels. One view. No gaps."
                className="relative w-full"
                delay={0}
              />

              <FloatingCard
                icon={Target}
                title="Attribute"
                description="See what really drives conversions."
                className="relative w-full"
                delay={0}
              />

              <FloatingCard
                icon={Sparkles}
                title="Decide"
                description="AI Copilot connected to live marketing data."
                className="relative w-full sm:col-span-2"
                delay={0}
              />
            </div>

            {/* Floating cards on large screens */}
            <FloatingCard
              icon={Link2}
              title="Connect"
              description="All 8 channels. One view. No gaps."
              className="hidden lg:block left-0 sm:-left-4 lg:-left-20 top-[18%] sm:top-[22%] animate-float w-[85%] max-w-[200px] sm:w-auto sm:max-w-none"
              delay={0}
            />

            <FloatingCard
              icon={Target}
              title="Attribute"
              description="See what really drives conversions."
              className="hidden lg:block right-0 sm:-right-4 lg:-right-20 top-[24%] sm:top-[28%] animate-float-delayed w-[85%] max-w-[200px] sm:w-auto sm:max-w-none"
              delay={2}
            />

            <FloatingCard
              icon={Sparkles}
              title="Decide"
              description="AI Copilot connected to live marketing data."
              className="hidden lg:block left-1/2 -translate-x-1/2 sm:left-1/4 sm:translate-x-0 -bottom-4 sm:-bottom-6 animate-float-delayed-2 w-[90%] sm:w-auto max-w-[280px] sm:max-w-none"
              delay={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}