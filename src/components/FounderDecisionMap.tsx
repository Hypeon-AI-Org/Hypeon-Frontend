'use client'

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const sections = [
  {
    id: "01",
    image: "/product/Trendsignal.webp",
    title: "Spot What Product to Sell Next ",
    description: "See what's trending online and search before it hits mainstream. Get into winning products weeks before your competitors even notice the signal."
  },
  {
    id: "02",
    image: "/product/Roas.webp",
    title: "See Your Real ROAS",
    description: "Not what Google claims. Not what Meta reports. The actual return on every dollar you spent - across every channel - with zero duplication."
  },
  {
    id: "03",
    image: "/product/Budget.webp",
    title: "Pricing Intelligence ",
    description: "See what your competitors price  across every market before you set your prices. Stay competitive where it matters, charge more where you can, and never lose a sale because you were priced wrong."
  },
  {
    id: "05",
    image: "/product/Trendkeyword.webp",
    title: "Find Trending Keywords",
    description: "Know exactly what your customers are typing into Google right now. Build campaigns around real demand - not last month's search volume."
  },
  {
    id: "06",
    image: "/product/productdevlopment.webp",
    title: "Know What Product to Develop",
    description: "See exactly what, designs and product improvements your market is asking for - pulled from reviews, social and search signals. Stop guessing what customers want and start building what they'll actually pay for."
  },
  {
    id: "07",
    image: "/product/Adcreative.webp",
    title: "Find Your Competitors' Best Performing Ads",
    description: "See exactly which ads your competitors are running and which ones are actually working. Stop starting from scratch - know the winning angles, hooks and offers in your niche before you spend a penny testing."
  },
  {
    id: "08",
    image: "/product/socialmeadi.webp",
    title: "Competitor Social Media Analysis ",
    description: "See exactly what content is working for them. Know their winning angles, top products and engagement spikes in real time."
  },
  {
    id: "09",
    image: "/product/review.webp",
    title: "Competitor Trustpilot Analysis",
    description: "Read your competitors' reviews so you know exactly what their customers hate about them. Turn their weaknesses into your biggest selling points."
  },
  {
    id: "10",
    image: "/product/market.webp",
    title: "Know What Markets to Enter",
    description: "Find pockets of demand that nobody is selling into yet. See exactly which geographies and demographics are underserved before the ad costs catch up."
  },
]

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const set = () => setIsDesktop(mq.matches)
    set()
    mq.addEventListener("change", set)
    return () => mq.removeEventListener("change", set)
  }, [])
  return isDesktop
}

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="relative bg-[oklch(0.988_0.0041_91.45)] py-10 sm:py-12 lg:py-14 ">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 lg:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black">
          Every problem. Solved.
          <br />
          <span className="text-brand-600">In one platform.</span>
        </h2>
        <p className="mt-4 sm:mt-6 text-sm sm:text-[15px] text-neutral-500 max-w-3xl mx-auto px-2">
          Here’s how HypeOn maps directly to the decisions you make every week as a founder.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col items-center">
        {sections.map((item, index) => (
          <Card key={item.id} item={item} index={index} total={sections.length} />
        ))}
      </div>

      {/* Bottom Spacer */}
      <div className="h-[6vh]" />
    </section>
  )
}

function Card({ item, index, total }: { item: any, index: number, total: number }) {
  const cardRef = useRef(null)
  const isDesktop = useIsDesktop()

  // Tracks scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  })

  // Scale down slightly as more cards stack on top (desktop only for stacking effect)
  const scale = useTransform(scrollYProgress, [0, 1], [1, isDesktop ? 1 - (total - index) * 0.04 : 1])

  return (
    <div
      ref={cardRef}
      className="relative md:sticky md:top-20 lg:top-24 w-full flex justify-center px-3 sm:px-4 md:px-6 mb-[6vh] sm:mb-[10vh]"
      style={{
        zIndex: index + 1,
        paddingTop: isDesktop ? `${index * 25}px` : 0
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-5xl min-h-[280px] sm:min-h-[360px] lg:min-h-[420px] rounded-2xl sm:rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden bg-white flex flex-col md:flex-row"
      >
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="w-full md:w-[40%] p-5 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center bg-white">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs shrink-0">
              {item.id}
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400">Feature</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl text-slate-900 mb-4 sm:mb-6 leading-tight">
            {item.title}
          </h3>

          <p className="text-[15px] text-slate-600 leading-relaxed max-w-sm">
            {item.description}
          </p>

          <a href="https://calendly.com/yash-hypeon/30min?month=2026-03" className="mt-6 sm:mt-8 w-fit inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-colors">
            Get the demo
          </a>
        </div>

        {/* RIGHT SIDE: IMAGE */}
        <div className="w-full md:w-[60%] relative min-h-[200px] sm:min-h-[280px] md:min-h-full overflow-hidden flex items-center justify-center p-4 sm:p-6">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>
      </motion.div>
    </div>
  )
}