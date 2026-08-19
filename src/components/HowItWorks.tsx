'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { primeIOSVideo } from '@/lib/videoAutoplay';

// Real UGC ad clips out of /public/ugc video - the folder name has a space,
// so every path goes through encodeURI before it hits the <video> src.
const UGC_VIDEOS = [
  '1_Product_in_hand.mp4',
  '2_Product_showcase.mp4',
  '3_Podcast.mp4',
  '4_Unboxing.mp4',
  '5_Before_and_after.mp4',
  '6_How-to.mp4',
].map((file) => encodeURI(`/ugc video/${file}`));

// Exact cards data matching reference image image_45d872.jpg
const CARDS_DATA = [
  {
    id: 'blume-purple',
    brand: 'Product in hand',
    title: 'Hydration Serum',
    caption: '"Looking for hydrated glass skin?"',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-purple-400 to-indigo-600',
    badge: null
  },
  {
    id: 'red-pump-tub',
    brand: 'Product showcase',
    title: 'Daily Moisturizer',
    caption: '"Prime Time Pumping Cream 🧴"',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-red-500 to-amber-600',
    badge: null
  },
  {
    id: 'rosalia-necklace',
    brand: 'Podcast',
    title: 'Fine Jewelry',
    caption: 'ROSALIA',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-amber-300 to-amber-700',
    badge: null
  },
  {
    id: 'glow-dew',
    brand: 'Unboxing',
    title: 'Dew Drops',
    caption: '"boost your daily routine ✨"',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-pink-400 to-rose-600',
    badge: null
  },
  {
    id: 'orange-sachet',
    brand: 'Before & after',
    title: 'Glow Sachets',
    caption: 'Daily Electrolyte Packs',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-orange-400 to-amber-600',
    badge: null
  },
  {
    id: 'seed-bottle',
    brand: 'How-to',
    title: 'Daily Synbiotic',
    caption: 'Whole-Body Health Starts in Your Gut',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-emerald-800 to-stone-900',
    badge: null
  },
  {
    id: 'bluemint-ring',
    brand: 'Product in hand',
    title: 'Swimwear',
    caption: 'Over 1M units sold this season! 🌊',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-sky-400 to-blue-600',
    badge: null
  },
  {
    id: 'alo-studio',
    brand: 'Product showcase',
    title: 'Activewear',
    caption: 'Studio Essentials',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-stone-400 to-stone-700',
    badge: null
  },
  {
    id: 'running-watermelon',
    brand: 'Podcast',
    title: 'Energy Drink',
    caption: '"watermelon"',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    fallbackBg: 'from-emerald-600 to-slate-800',
    badge: 'AMPLIFY THIS'
  }
];

export default function TikTokScrollSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // The one card the visitor chose to actually watch, with sound. Null means
  // the ring is just idling with every clip muted.
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIdRef = useRef<string | null>(null);

  // Card the pointer is resting on - the ring holds still so Play and Generate
  // are not moving targets, and that card is lifted clear of its neighbours
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredIdRef = useRef<string | null>(null);
  const isHovered = hoveredId !== null;

  const setHovered = useCallback((id: string | null) => {
    hoveredIdRef.current = id;
    setHoveredId(id);
  }, []);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // The ring position lives in a ref, not state - see paint() below
  const offsetRef = useRef(0);
  const glideTarget = useRef<number | null>(null);

  const animFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const dragMoved = useRef(false);
  const velocityRef = useRef(0);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const CARD_COUNT = CARDS_DATA.length;
  const SPEED = 0.25; // Continuous cards per second
  const DRAG_THRESHOLD_PX = 6; // Past this the gesture is a drag, not a tap

  // The ring is sized in raw px, so it can't scale off Tailwind breakpoints -
  // widen it from JS instead, or it sits as a small island on a big screen.
  const [isWide, setIsWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const R = isWide ? 620 : 410; // Cylinder radius in px
  // Narrower angular step on desktop keeps the same card-to-card overlap the
  // smaller ring has, instead of letting the fan spread out into a flat row
  const STEP_ANGLE_DEG = isWide ? 22 : 27;

  const wrap = useCallback(
    (value: number) => {
      const next = value % CARD_COUNT;
      return next < 0 ? next + CARD_COUNT : next;
    },
    [CARD_COUNT]
  );

  // Shortest signed distance between two slots on the ring
  const shortest = useCallback(
    (value: number) => {
      let d = value;
      while (d > CARD_COUNT / 2) d -= CARD_COUNT;
      while (d < -CARD_COUNT / 2) d += CARD_COUNT;
      return d;
    },
    [CARD_COUNT]
  );

  // Writes the ring straight to the DOM every frame. This used to run through
  // React state, which re-rendered all nine <video> tiles 60x a second - that
  // is what made the rotation stutter once every card had a live clip in it.
  const paint = useCallback(() => {
    CARDS_DATA.forEach((card, index) => {
      const el = cardRefs.current[card.id];
      if (!el) return;

      const rawDist = shortest(index - offsetRef.current);
      const rad = (rawDist * STEP_ANGLE_DEG * Math.PI) / 180;

      const translateX = R * Math.sin(rad);
      const translateZ = R * (Math.cos(rad) - 1); // recedes back as angle grows
      const rotateY = -rawDist * STEP_ANGLE_DEG; // curves inward towards center

      const opacity = Math.max(0, Math.cos(rad));

      el.style.transform = `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg)`;
      // A neighbour nearer the front would otherwise cover this card's centre
      // - and with it the play button - even where the card looks unobscured.
      el.style.zIndex =
        hoveredIdRef.current === card.id
          ? '3000'
          : String(Math.round(1000 + translateZ));
      el.style.opacity = String(opacity);

      // Cards swung round the back are invisible but would still swallow the
      // pointer, so the hand and the click could land on a card you cannot
      // see. Only what is actually visible stays hit-testable.
      el.style.pointerEvents = opacity < 0.02 ? 'none' : 'auto';
    });
  }, [R, STEP_ANGLE_DEG, shortest]);

  // Lay the ring out on mount, and again if the breakpoint changes its size
  useEffect(() => {
    paint();
  }, [paint]);

  const animate = useCallback(
    (time: number) => {
      if (lastTimeRef.current !== null) {
        // Clamped so a backgrounded tab doesn't resume with one huge jump
        const delta = Math.min((time - lastTimeRef.current) / 1000, 0.05);

        if (!isDragging) {
          if (glideTarget.current !== null) {
            // Ease into a tapped card instead of snapping to it
            const d = shortest(glideTarget.current - offsetRef.current);
            if (Math.abs(d) < 0.002) {
              offsetRef.current = wrap(glideTarget.current);
              glideTarget.current = null;
            } else {
              offsetRef.current = wrap(offsetRef.current + d * 0.12);
            }
          } else if (Math.abs(velocityRef.current) > 0.0005) {
            // A flick always gets to play out, autoplaying or not
            offsetRef.current = wrap(offsetRef.current - velocityRef.current);
            velocityRef.current *= 0.94; // Momentum decay
          } else if (isPlaying && !isHovered) {
            velocityRef.current = 0;
            offsetRef.current = wrap(offsetRef.current + SPEED * delta);
          }

          paint();
        }
      }
      lastTimeRef.current = time;
      animFrameId.current = requestAnimationFrame(animate);
    },
    [isDragging, isPlaying, isHovered, wrap, paint, shortest]
  );

  useEffect(() => {
    animFrameId.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [animate]);

  useEffect(
    () => () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    []
  );

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX ?? 0;
    dragStartX.current = clientX;
    dragStartOffset.current = offsetRef.current;
    dragMoved.current = false;
    velocityRef.current = 0;
    glideTarget.current = null;
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      // Keep the page from scrolling out from under a horizontal drag
      if ('touches' in e && e.cancelable) e.preventDefault();

      const clientX = 'clientX' in e ? e.clientX : e.touches[0]?.clientX ?? 0;
      const deltaX = clientX - dragStartX.current;
      if (Math.abs(deltaX) > DRAG_THRESHOLD_PX) dragMoved.current = true;

      const sensitivity = 0.003;
      const deltaOffset = deltaX * sensitivity;

      velocityRef.current = deltaOffset * 0.15;
      offsetRef.current = wrap(dragStartOffset.current - deltaOffset);
      paint();
    },
    [isDragging, wrap, paint]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMouseMove, { passive: false });
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleCardClick = (targetIndex: number, distFromCenter: number) => {
    if (dragMoved.current) return; // The gesture was a drag, not a tap
    if (Math.abs(distFromCenter) < 0.25) return;

    velocityRef.current = 0;
    glideTarget.current = targetIndex % CARD_COUNT;

    // Hold on the tapped card for a beat, then hand it back to autoplay
    setIsPlaying(false);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      // Never rotate out from under a card the visitor is actually watching
      if (!activeIdRef.current) setIsPlaying(true);
    }, 3000);
  };

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  // Play brings that card to the front, gives it the audio and holds the ring
  // still. Pressing it again releases everything and the ring carries on.
  const handlePlayToggle = (
    e: React.MouseEvent,
    id: string,
    index: number
  ) => {
    e.stopPropagation(); // never let this double as a tap on the card
    const next = activeIdRef.current === id ? null : id;

    activeIdRef.current = next;
    setActiveId(next);

    if (resumeTimer.current) clearTimeout(resumeTimer.current);

    if (next) {
      velocityRef.current = 0;
      glideTarget.current = index % CARD_COUNT;
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  // One audible card at a time. Unmuting only works because this runs off a
  // click, which is the gesture browsers require before allowing audio.
  useEffect(() => {
    CARDS_DATA.forEach((card) => {
      const el = videoRefs.current[card.id];
      if (!el) return;

      const audible = card.id === activeId;
      el.muted = !audible;
      if (audible) {
        el.currentTime = 0; // start the chosen clip from the top
        el.play().catch(() => {});
      } else if (!el.paused) {
        el.pause(); // idle cards sit on a still frame, they do not autoplay
      }
    });
  }, [activeId]);

  // Nothing plays on its own any more, but the clips still have to decode one
  // frame each or the ring would be nine empty boxes. Playing then immediately
  // pausing is the reliable way to force that first frame out.
  useEffect(() => {
    CARDS_DATA.forEach((card) => {
      const el = videoRefs.current[card.id];
      if (!el) return;
      primeIOSVideo(el);

      // Only pause if this is still the throwaway frame-priming playback. A
      // late-firing listener must never stop a clip the visitor pressed play on.
      const settle = () => {
        if (activeIdRef.current !== card.id) el.pause();
      };
      el.addEventListener('timeupdate', settle, { once: true });
    });
  }, []);

  return (
    <section className="relative w-full bg-white text-black pt-14 pb-2 sm:pt-20 sm:pb-2 font-sans overflow-hidden select-none">

      {/* 3D Hardware Accelerated Stage CSS */}
      <style>{`
        .perspective-stage {
          perspective: 1100px;
          perspective-origin: 50% 50%;
          touch-action: pan-y;
        }
        .cylinder-ring {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .card-3d-item {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Header Copy Section - same left-aligned header row as the "Made with
          HypeOn" section below: copy on the left, CTA pinned to the right */}
      <div className="relative z-20 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center rounded-full border border-neutral-200 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
              UGC engine
            </span>

            <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tighter text-black sm:text-3xl lg:text-4xl">
              UGC video templates
            </h2>

            <p className="mt-2 max-w-xl text-sm text-neutral-500 sm:text-base">
              Turn products into UGC videos using proven video styles that
              capture attention and drive sales.
            </p>
          </div>

          <a
            href="https://app.hypeon.ai/studio/login"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 sm:mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-slate-500" strokeWidth={2.2} />
            Explore templates
            <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* 3D Cylinder Arc Container */}
      <div className="relative mt-12 sm:mt-16 w-full flex flex-col items-center justify-center">

        {/* Soft Vignette Edge Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-30 hidden sm:block sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-30 hidden sm:block sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* 3D Perspective Stage */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className={`perspective-stage relative w-full h-[380px] sm:h-[430px] lg:h-[560px] flex items-center justify-center overflow-hidden ${
            isHovered ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          <div className="cylinder-ring relative w-full h-full flex items-center justify-center">
            {CARDS_DATA.map((card, index) => {
              // Nine tiles, six clips - the repeats land on the far side of the
              // ring, so the same video is never on screen twice at once
              const cardVideo = UGC_VIDEOS[index % UGC_VIDEOS.length];

              // Position/opacity are owned by paint(), not by React. Only the
              // very first frame is laid out here, before paint() takes over.
              const rad = (shortest(index) * STEP_ANGLE_DEG * Math.PI) / 180;

              return (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[card.id] = el;
                  }}
                  onClick={() => handleCardClick(index, shortest(index - offsetRef.current))}
                  onMouseEnter={() => setHovered(card.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="card-3d-item cursor-pointer active:cursor-pointer absolute w-[200px] sm:w-[220px] lg:w-[280px] h-[330px] sm:h-[370px] lg:h-[470px] rounded-[28px] overflow-hidden bg-white/10 backdrop-blur-md shadow-[0_10px_24px_-18px_rgba(0,0,0,0.45)] border border-white/20"
                  style={{
                    transform: `translate3d(${R * Math.sin(rad)}px, 0px, ${R * (Math.cos(rad) - 1)}px) rotateY(${-shortest(index) * STEP_ANGLE_DEG}deg)`,
                    zIndex: Math.round(1000 + R * (Math.cos(rad) - 1)),
                    opacity: Math.max(0, Math.cos(rad))
                  }}
                >
                  {/* Neutral glass backing. Every card used to carry its own
                      coloured gradient, which tinted each one differently once
                      the flanks faded out - one shared tone keeps them uniform */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-sm" />

                  {/* Card Background UGC Clip */}
                  {!imgErrors[card.id] && (
                    <video
                      ref={(el) => {
                        videoRefs.current[card.id] = el;
                      }}
                      src={cardVideo}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      disableRemotePlayback
                      onLoadedData={(e) => {
                        // primeIOSVideo force-mutes, so skip the audible card
                        if (activeId !== card.id) primeIOSVideo(e.currentTarget);
                      }}
                      onError={() => handleImageError(card.id)}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}

                  {/* Light vignette - just enough to seat the tile against the
                      page; there is no overlay copy left to keep legible */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                  {/* Top Brand Pill Tag */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-2.5 py-1 text-[10px] font-black tracking-wider bg-black/40 backdrop-blur-md text-white rounded-md uppercase border border-white/10">
                      {card.brand}
                    </span>
                  </div>

                  {/* Play with sound - holds the ring still while it runs */}
                  <button
                    type="button"
                    onClick={(e) => handlePlayToggle(e, card.id, index)}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    aria-label={
                      activeId === card.id
                        ? `Stop ${card.brand} template`
                        : `Play ${card.brand} template with sound`
                    }
                    className="absolute left-1/2 top-1/2 z-20 cursor-pointer active:cursor-pointer inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                  >
                    {activeId === card.id ? (
                      <Pause className="h-5 w-5" strokeWidth={2} />
                    ) : (
                      <Play className="h-5 w-5 translate-x-[1px]" strokeWidth={2} />
                    )}
                  </button>

                  {/* Per-card Generate action. stopPropagation so following the
                      link never doubles as a tap on the card behind it */}
                  <a
                    href="https://app.hypeon.ai/studio/login"
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="group/gen absolute bottom-3.5 right-3.5 z-20 cursor-pointer active:cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/55 px-3 py-1.5 text-[11px] font-bold text-black backdrop-blur-md transition-colors hover:bg-white/80"
                  >
                    <Sparkles className="h-3 w-3 text-neutral-500" strokeWidth={2.2} />
                    Generate
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Closing CTA - gives the floating ring something to land on */}
      <div className="relative z-20 mt-10 flex flex-col items-center px-4 sm:mt-12 sm:px-6">
        {/* Same pill treatment as the navbar CTA - gradient body, gloss cap
            and the label sliding up on hover */}
        <a
          href="https://calendly.com/yash-hypeon/30min"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)] md:px-7 md:text-base"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent"
          />
          <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              Get the demo
            </span>
            <span
              aria-hidden
              className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
            >
              Get the demo
            </span>
          </span>
        </a>

        <p className="mt-5 text-xs font-medium text-neutral-400 sm:text-sm">
          6 proven formats · New templates every week · No shoot required
        </p>
      </div>
    </section>
  );
}
