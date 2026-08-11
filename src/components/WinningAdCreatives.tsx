import React, { useState, useEffect, useRef, useCallback } from 'react';

// Exact cards data matching reference image image_45d872.jpg
const CARDS_DATA = [
  {
    id: 'blume-purple',
    brand: 'BLUME',
    title: 'Hydration Serum',
    caption: '"Looking for hydrated glass skin?"',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-purple-400 to-indigo-600',
    badge: null
  },
  {
    id: 'red-pump-tub',
    brand: 'SOLARIS',
    title: 'Daily Moisturizer',
    caption: '"Prime Time Pumping Cream 🧴"',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-red-500 to-amber-600',
    badge: null
  },
  {
    id: 'rosalia-necklace',
    brand: 'ROSALIA',
    title: 'Fine Jewelry',
    caption: 'ROSALIA',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-amber-300 to-amber-700',
    badge: null
  },
  {
    id: 'glow-dew',
    brand: 'GLOW',
    title: 'Dew Drops',
    caption: '"boost your daily routine ✨"',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-pink-400 to-rose-600',
    badge: null
  },
  {
    id: 'orange-sachet',
    brand: 'TERRA',
    title: 'Glow Sachets',
    caption: 'Daily Electrolyte Packs',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-orange-400 to-amber-600',
    badge: null
  },
  {
    id: 'seed-bottle',
    brand: 'Seed®',
    title: 'Daily Synbiotic',
    caption: 'Whole-Body Health Starts in Your Gut',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-emerald-800 to-stone-900',
    badge: null
  },
  {
    id: 'bluemint-ring',
    brand: 'BLUEMINT',
    title: 'Swimwear',
    caption: 'Over 1M units sold this season! 🌊',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-sky-400 to-blue-600',
    badge: null
  },
  {
    id: 'alo-studio',
    brand: 'alo',
    title: 'Activewear',
    caption: 'Studio Essentials',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-stone-400 to-stone-700',
    badge: null
  },
  {
    id: 'running-watermelon',
    brand: 'AMPLIFY',
    title: 'Energy Drink',
    caption: '"watermelon"',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-emerald-600 to-slate-800',
    badge: 'AMPLIFY THIS'
  }
];

export default function TikTokScrollSection() {
  const [offset, setOffset] = useState(0); // continuous offset index
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const animFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef = useRef(0);

  const CARD_COUNT = CARDS_DATA.length;
  const SPEED = 0.25; // Continuous cards per second

  const animate = useCallback((time: number) => {
    if (lastTimeRef.current !== null) {
      const delta = (time - lastTimeRef.current) / 1000;

      if (!isDragging) {
        if (isPlaying) {
          setOffset((prev) => (prev + SPEED * delta) % CARD_COUNT);
        } else if (Math.abs(velocityRef.current) > 0.001) {
          setOffset((prev) => {
            let next = (prev - velocityRef.current) % CARD_COUNT;
            if (next < 0) next += CARD_COUNT;
            return next;
          });
          velocityRef.current *= 0.92; // Momentum decay
        }
      }
    }
    lastTimeRef.current = time;
    animFrameId.current = requestAnimationFrame(animate);
  }, [isDragging, isPlaying, CARD_COUNT]);

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animate]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX ?? 0;
    dragStartX.current = clientX;
    dragStartOffset.current = offset;
    velocityRef.current = 0;
  };

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX ?? 0;
    const deltaX = clientX - dragStartX.current;
    
    const sensitivity = 0.003;
    const deltaOffset = deltaX * sensitivity;
    let nextOffset = (dragStartOffset.current - deltaOffset) % CARD_COUNT;
    if (nextOffset < 0) nextOffset += CARD_COUNT;

    velocityRef.current = deltaOffset * 0.15;
    setOffset(nextOffset);
  }, [isDragging, CARD_COUNT]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleCardClick = (targetIndex: number, distFromCenter: number) => {
    if (Math.abs(distFromCenter) < 0.25) return;
    setIsPlaying(false);
    setOffset(targetIndex % CARD_COUNT);
  };

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="relative w-full rounded-[28px] bg-[#0a0a0c] text-white py-12 sm:rounded-[56px] sm:py-16 font-sans overflow-hidden select-none flex flex-col justify-center">
      
      {/* 3D Hardware Accelerated Stage CSS */}
      <style>{`
        .perspective-stage {
          perspective: 1100px;
          perspective-origin: 50% 50%;
        }
        .cylinder-ring {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .card-3d-item {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
          transition: transform 0.05s ease-out, opacity 0.05s ease-out;
        }
      `}</style>

      {/* Header Copy Section */}
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 z-20">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          Winning creatives
        </p>

        <h1 className="text-2xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl]">
          We understand and<br className="hidden sm:block" /> analyze Ads so{' '}
          you don&apos;t have to.
        </h1>

        <p className="mt-4 mx-auto max-w-2xl text-sm sm:text-base text-white/50 leading-relaxed font-normal">
          Our Ads Insights tool, powered by proprietary AI, offers a unique
          ability to track and capitalize on Ads trends.
        </p>
      </div>

      {/* 3D Cylinder Arc Container */}
      <div className="relative mt-12 sm:mt-16 w-full flex flex-col items-center justify-center">
        
        {/* Soft Vignette Edge Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 w-12 sm:w-32 bg-gradient-to-r from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 w-12 sm:w-32 bg-gradient-to-l from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent" />

        {/* 3D Perspective Stage */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className="perspective-stage relative w-full h-[380px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
        >
          <div className="cylinder-ring relative w-full h-full flex items-center justify-center">
            {CARDS_DATA.map((card, index) => {
              // Calculate continuous float distance relative to current offset
              let rawDist = index - offset;
              
              // Normalize distance for circular wrapping around the ring
              while (rawDist > CARD_COUNT / 2) rawDist -= CARD_COUNT;
              while (rawDist < -CARD_COUNT / 2) rawDist += CARD_COUNT;

              const absDist = Math.abs(rawDist);

              // Precise 3D Cylinder Trigonometry matching image_45d872.jpg
              const R = 410; // Cylinder radius in px
              const stepAngleDeg = 27; // Angular step per card
              const rad = (rawDist * stepAngleDeg * Math.PI) / 180;

              // Position on 3D circle
              const translateX = R * Math.sin(rad);
              const translateZ = R * (Math.cos(rad) - 1); // recedes back as angle increases
              const rotateY = -rawDist * stepAngleDeg; // curves inward towards center

              // Layering and fading
              const zIndex = Math.round(1000 + translateZ);
              const opacity = Math.max(0, Math.cos(rad)); // smooth fade at back flanks

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index, rawDist)}
                  className="card-3d-item absolute w-[200px] sm:w-[220px] h-[330px] sm:h-[370px] rounded-[28px] overflow-hidden bg-slate-900 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.3)] border border-black/10"
                  style={{
                    transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg)`,
                    zIndex,
                    opacity
                  }}
                >
                  {/* Card Background Image or Gradient Fallback */}
                  {!imgErrors[card.id] ? (
                    <img
                      src={card.image}
                      alt={card.brand}
                      onError={() => handleImageError(card.id)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-b ${card.fallbackBg} p-4 flex flex-col justify-end`} />
                  )}

                  {/* Dark Vignette Overlay for Crisp White Text Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                  {/* Top Brand Pill Tag */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-2.5 py-1 text-[10px] font-black tracking-widest bg-black/40 backdrop-blur-md text-white rounded-md uppercase border border-white/10">
                      {card.brand}
                    </span>
                  </div>

                  {/* Bottom Text Content & Badges */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-1.5">
                    {card.badge && (
                      <span className="self-start px-2 py-0.5 text-[10px] font-black tracking-wide bg-[#22C55E] text-black rounded uppercase shadow-md">
                        {card.badge}
                      </span>
                    )}
                    <p className="text-xs sm:text-[13px] font-semibold text-white leading-snug drop-shadow-md">
                      {card.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}