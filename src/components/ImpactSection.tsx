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
    <section className="relative py-10 sm:py-12 lg:pt-6 lg:pb-6 bg-[oklch(0.988_0.0041_91.45)] ">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight mb-8 sm:mb-12"
        >
          Spend less. Sell more.
          <br />
          <span className="text-brand-600">
            Keep what you earn.
          </span>
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-neutral-200">

          {[
            {
              value: 47,
              suffix: "M+",
              title: "Competitor ads analyzed",
            
            },
            {
              value: 60,
              suffix: "s",
              title: "From prompt to launch-ready ad",
              
            },
            {
              value:77,
              suffix: "%",
              title: "uplift in conversion rate",
              
            },
          
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`py-6 sm:py-8 px-4 sm:px-3 border-b sm:border-b-0 border-neutral-200 ${i !== 2 ? "lg:border-r border-neutral-200" : ""}`}
            >
              {/* Number */}
              <div className="text-4xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent">
                
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Title */}
              <p className="mt-6 text-[15px] font-medium text-black">
                {stat.title}
              </p>

              {/* Subtitle */}
          
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}