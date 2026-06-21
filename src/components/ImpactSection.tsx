'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useInView
} from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Section, { Cell } from "./Section"

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
  const stats = [
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
      value: 77,
      suffix: "%",
      title: "uplift in conversion rate",
    },
  ]

  return (
    <Section cols={3}>

      {/* Heading + Eyebrow (full width) */}
      <Cell className="md:col-span-3">
        {/* Eyebrow */}
        <div className="mb-4 flex items-center gap-2.5">
          <span className="h-px w-6 bg-neutral-300" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            The Impact
          </span>
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black leading-tight"
        >
          Spend less. Sell more.
          <br />
          <span className="text-brand-600">
            Keep what you earn.
          </span>
        </motion.h2>
      </Cell>

      {/* Stats */}
      {stats.map((stat, i) => (
        <Cell key={i}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Number */}
            <div className="text-3xl sm:text-5xl font-semibold tracking-tight bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 bg-clip-text text-transparent">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>

            {/* Title */}
            <p className="mt-6 text-[15px] font-medium text-black">
              {stat.title}
            </p>
          </motion.div>
        </Cell>
      ))}

    </Section>
  )
}