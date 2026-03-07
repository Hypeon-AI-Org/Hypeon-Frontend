'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useInView
} from "framer-motion"
import {
  BarChart3,
  ShoppingBag,
  Package,
  Video,
  Instagram,
  Facebook,
  Mail,
  BarChart2,
  Pin
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

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
  {
    value: 2400,
    format: "k", // custom formatter
    suffix: "+",
    title: "E-commerce founders",
    subtitle: "Across 48 countries"
  }
]

const integrations = [
  { name: "Google Trends", icon: BarChart3, color: "text-blue-400" },
  { name: "Shopify", icon: ShoppingBag, color: "text-green-500" },
  { name: "Amazon", icon: Package, color: "text-orange-500" },
  { name: "TikTok ", icon: Video, color: "text-black" },
  { name: "Instagram", icon: Instagram, color: "text-pink-500" },
  { name: "Pinterest", icon: Pin, color: "text-red-500" },
  { name: "Meta Ads", icon: Facebook, color: "text-blue-500" },

  { name: "GA4", icon: BarChart2, color: "text-yellow-500" }
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
<section className="relative py-16 bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== Stats Grid ===== */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">

          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="text-center"
            >
              <div className="text-5xl font-semibold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent">

                {stat.prefix}

                <AnimatedNumber
                  value={stat.value}
                  format={stat.format}
                />

                {stat.suffix}
              </div>

              <p className="mt-6 text-[15px] font-medium text-black">
                {stat.title}
              </p>

              <p className="mt-2 text-[13px] text-neutral-500">
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
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-semibold tracking-tight text-black mb-6">
            Why Founders Choose <span className="text-brand-600">HypeOn</span>
          </h2>

          <h3 className="text-2xl font-medium text-black mb-6">
            The e-commerce intelligence stack. All of it.
          </h3>

          <p className="text-lg text-neutral-600 leading-relaxed">
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
          className="flex justify-center mb-16"
        >
          <button className="px-7 py-3 bg-black text-white rounded-full text-[15px] font-medium hover:bg-neutral-800 transition-all">
            Get Early Access →
          </button>
        </motion.div>

        {/* ===== Integrations ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-8 gap-6 items-center text-center border-t border-neutral-200 pt-12"
        >
         {integrations.map((item, i) => {
      const Icon = item.icon
      return (
        <div
          key={i}
          className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300"
        >
          <Icon className={`w-3.5 h-3.5 ${item.color}`} />
          <span className="text-sm font-medium">
            {item.name}
          </span>
        </div>
      )
    })}
        </motion.div>

      </div>
    </section>
  )
}