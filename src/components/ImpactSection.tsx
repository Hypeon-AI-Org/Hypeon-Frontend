'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useInView
} from "framer-motion"
import { useEffect, useRef, useState } from "react"

/* ---------------- Animated Number ---------------- */

function AnimatedNumber({
  value,
  suffix = ""
}: {
  value: number
  suffix?: string
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
      setDisplay(Math.floor(latest))
    })
  }, [spring])

  return <span ref={ref}>{display}{suffix}</span>
}

/* ---------------- Section ---------------- */

export default function ImpactSection() {
  return (
    <section className="relative py-16 bg-white">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm text-neutral-500 mb-6"
        >
          AVERAGE IMPACT ACROSS 2,400+ BRANDS
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-[40px] font-semibold tracking-tight text-black leading-tight mb-12"
        >
          Spend less. Sell more.
          <br />
          <span className="text-brand-600">
            Keep what you earn.
          </span>
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 border-t border-neutral-200">

          {[
            {
              value: 68,
              suffix: "%",
              title: "Wasted ad spend identified & reallocated",
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
              suffix: "",
              prefix: "3–",
              title: "Weeks early on trends",
              subtitle: "Before viral peak on average"
            },
            {
              value: 2400,
              suffix: "+",
              format: "k",
              title: "E-commerce founders",
              subtitle: "Across 48 countries"
            }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`py-8 px-3 ${
                i !== 3 ? "border-r border-neutral-200" : ""
              }`}
            >
              {/* Number */}
              <div className="text-5xl font-semibold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent">
                {stat.prefix}
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Title */}
              <p className="mt-6 text-[15px] font-medium text-black">
                {stat.title}
              </p>

              {/* Subtitle */}
              <p className="mt-1 text-[13px] text-neutral-500">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}

        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 text-sm text-neutral-500"
        >
          Based on real founder data • First 90 days • All platforms, all channels
        </motion.p>

      </div>
    </section>
  )
}