'use client'

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const sections = [
  { 
    id: "01", 
    image: "/product/Trendsignal.png", 
    title: "Spot What Product to Sell Next ",
    description: "See what's trending online and search before it hits mainstream. Get into winning products weeks before your competitors even notice the signal."
  },
  { 
    id: "02", 
    image: "/product/ROAS.png", 
    title: "See Your Real ROAS",
    description: "Not what Google claims. Not what Meta reports. The actual return on every dollar you spent - across every channel - with zero duplication."
  },
  { 
    id: "03", 
    image: "/product/Budget.png", 
    title: "Pricing Intelligence ",
    description: "See what your competitors price  across every market before you set your prices. Stay competitive where it matters, charge more where you can, and never lose a sale because you were priced wrong."
  },
  { 
    id: "05", 
    image: "/product/TrendKeyword.png", 
    title: "Find Trending Keywords",
    description: "Know exactly what your customers are typing into Google right now. Build campaigns around real demand - not last month's search volume."
  },
   { 
    id: "06", 
    image: "/product/productdevlopment.png", 
    title: "Know What Product to Develop",
    description: "See exactly what, designs and product improvements your market is asking for - pulled from reviews, social and search signals. Stop guessing what customers want and start building what they'll actually pay for."
  },
   { 
    id: "07", 
    image: "/product/Adcreative.png", 
    title: "Find Your Competitors' Best Performing Ads",
    description: "See exactly which ads your competitors are running and which ones are actually working. Stop starting from scratch - know the winning angles, hooks and offers in your niche before you spend a penny testing."
  },
   { 
    id: "08", 
    image: "/product/socialmeadi.png", 
    title: "Competitor Social Media Analysis ",
    description: "See exactly what content is working for them. Know their winning angles, top products and engagement spikes in real time."
  },
  { 
    id: "09", 
    image: "/product/review.png", 
    title: "Competitor Trustpilot Analysis",
    description: "Read your competitors' reviews so you know exactly what their customers hate about them. Turn their weaknesses into your biggest selling points."
  },
  { 
    id: "09", 
    image: "/product/market.png", 
    title: "Know What Markets to Enter",
    description: "Find pockets of demand that nobody is selling into yet. See exactly which geographies and demographics are underserved before the ad costs catch up."
  },
]

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
<section ref={containerRef} className="relative bg-[#FAFAFA] py-14">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-6 mb-14 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
          Every problem. Solved.
          <br />
          <span className="text-brand-600">In one platform.</span>
        </h2>
        <p className="mt-6 text-[15px] text-neutral-500 max-w-3xl mx-auto">
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
  
  // Tracks scroll progress of this specific card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  })

  // Scale down slightly as more cards stack on top
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - index) * 0.04])
  
  return (
    <div 
      ref={cardRef}
      className="sticky top-24 w-full flex justify-center mb-[10vh]"
      style={{ 
        zIndex: index + 1,
        // This creates the "stepped" look at the top of the stack
        paddingTop: `${index * 25}px`
      }}
    >
      <motion.div
        style={{ scale }}
        className="relative w-full max-w-5xl min-h-[420px] rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden bg-white flex flex-col md:flex-row"
      >
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-xs ">
              {item.id}
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400">Feature</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl text-slate-900 mb-6 leading-tight">
            {item.title}
          </h3>
          
          <p className="text-[15px] text-slate-600 leading-relaxed max-w-sm">
            {item.description}
          </p>

          <button className="mt-8 w-fit px-5 py-2.5 rounded-full bg-black text-white font-medium hover:bg-neutral-800 transition-colors">
            Learn more
          </button>
        </div>

        {/* RIGHT SIDE: IMAGE */}
       <div className="w-full md:w-[60%] relative min-h-[300px] md:min-h-full overflow-hidden flex items-center justify-center p-6">
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  )
}