'use client'

import { motion } from "framer-motion"
import { BarChart2 } from "lucide-react"
import Image from "next/image"
import Section, { Cell } from "./Section"

const PLATFORM_LOGOS = [
  { name: "Google Ads", src: "/logos/google.png" },
  { name: "Shopify", src: "/logos/shopify.png" },
  { name: "Amazon", src: "/logos/amazon.png" },
  { name: "TikTok", src: "/logos/tiktok.webp" },
  { name: "Instagram", src: "/logos/instagram.png" },
  { name: "Pinterest", src: "/logos/pinterest.png" },
  { name: "Meta Ads", src: "/logos/meta.png" },
] as const

const integrations = [
  ...PLATFORM_LOGOS,
  { name: "GA4", icon: BarChart2, color: "text-yellow-500" },
]

/* ---------------- Main Component ---------------- */

export default function Features() {
  return (
    <Section>
      <Cell>

      <div>

        {/* ===== Main Copy ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16"
        >
          <div className="mb-4 flex items-center justify-center gap-2.5"><span className="h-px w-6 bg-neutral-300" /><span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Why HypeOn</span></div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-4 sm:mb-6">
            Why Founders Choose <span className="text-[#696863]">HypeOn</span>
          </h2>

          <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-4 sm:mb-6 tracking-tight">
            Spy. Create. Scale. All in one place.
          </h3>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed px-2">
            Before HypeOn, founders paid for separate tools to spy, create, and
            scale - then stitched the results together by hand.
            <span className="text-black font-medium">
              {" "}HypeOn does all three in one workflow, so you move at the speed of the trend, not your tool stack.
            </span>
          </p>
        </motion.div>

        {/* ===== CTA ===== */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-10 sm:mb-12 lg:mb-16"
        >
          <a href="https://calendly.com/yash-hypeon/30min" className="px-6 sm:px-7 py-2.5 sm:py-3 bg-black text-white rounded-full text-sm sm:text-[15px] font-medium hover:bg-neutral-800 transition-all inline-block min-h-[44px] flex items-center justify-center">
            Get the demo
          </a>
        </motion.div>

        {/* ===== Integrations ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center text-center border-t border-neutral-200 pt-8 sm:pt-10 lg:pt-12"
        >
          {integrations.map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              {'src' in item ? (
                <span className="relative w-6 h-6 flex-shrink-0 rounded flex items-center justify-center bg-white border border-neutral-100 overflow-hidden p-0.5">
                  <Image
                    src={item.src}
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain w-5 h-5"
                  />
                </span>
              ) : (
                <item.icon className={`w-3.5 h-3.5 flex-shrink-0 ${item.color}`} />
              )}
              <span className="text-xs sm:text-sm font-medium text-center sm:text-left">
                {item.name}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
      </Cell>
    </Section>
  )
}