'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useInView
} from "framer-motion"
import { BarChart2 } from "lucide-react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const PLATFORM_LOGOS = [
  { name: "Google Ads", src: "/logos/google.png" },
  { name: "Shopify", src: "/logos/shopify.png" },
  { name: "Amazon", src: "/logos/amazon.png" },
  { name: "TikTok", src: "/logos/tiktok.webp" },
  { name: "Instagram", src: "/logos/instagram.png" },
  { name: "Pinterest", src: "/logos/pinterest.png" },
  { name: "Meta Ads", src: "/logos/meta.png" },
] as const

/* ---------------- Stats Data ---------------- */

const stats = [
  {
    value: 20,
    suffix: "M+",
    title: "Daily signals analysed",
    subtitle: "Across 100+ data sources"
  },
  {
    value: 83,
    suffix: "%",
    title: "Attribution coverage",
    subtitle: "Without mandatory login"
  },
  {
    value: 8,
    prefix: "3–",
    title: "Weeks early on trends",
    subtitle: "Before viral peak on average"
  },
 
]

const integrations = [
  ...PLATFORM_LOGOS,
  { name: "GA4", icon: BarChart2, color: "text-yellow-500" },
]
/* ---------------- Animated Number ---------------- */

function AnimatedNumber({
  value,
  format
}: {
  value: number
  format?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 20
  })

  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    return spring.on("change", (latest) => {
      setDisplay(latest)
    })
  }, [spring])

  const formatted =
    format === "k"
      ? (display / 1000).toFixed(1)
      : Math.floor(display).toString()

  return <span ref={ref}>{formatted}</span>
}

/* ---------------- Main Component ---------------- */

export default function Features() {
  return (
    <section className="relative py-10 sm:py-12 lg:py-16 bg-[oklch(0.988_0.0041_91.45)] overflow-hidden ">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== Stats Grid ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-16 sm:justify-items-center">

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="text-center sm:text-center"
            >
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent">

                {stat.prefix}

                <AnimatedNumber
                  value={stat.value}
                  
                />

                {stat.suffix}
              </div>

              <p className="mt-6 text-[15px] font-medium text-black">
                {stat.title}
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}

        </div>

        {/* ===== Main Copy ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter text-black mb-4 sm:mb-6">
            Why Founders Choose <span className="text-brand-600">HypeOn</span>
          </h2>

          <h3 className="text-2xl sm:text-3xl font-semibold text-black mb-4 sm:mb-6 tracking-tight">
            The e-commerce intelligence stack. All of it.
          </h3>

          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed px-2">
            Before HypeOn, winning meant paying for 6+ disconnected tools,
            hiring analysts to stitch data together, and still making
            decisions on gut feel.
            <span className="text-black font-medium">
              {" "}HypeOn replaces all of it — with one platform, one score, one truth.
            </span>
          </p>
        </motion.div>

        {/* ===== CTA ===== */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-10 sm:mb-12 lg:mb-16"
        >
          <a href="https://app.hypeon.ai/hub/login" className="px-6 sm:px-7 py-2.5 sm:py-3 bg-black text-white rounded-full text-sm sm:text-[15px] font-medium hover:bg-neutral-800 transition-all inline-block min-h-[44px] flex items-center justify-center">
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
    </section>
  )
}