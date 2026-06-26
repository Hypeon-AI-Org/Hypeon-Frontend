'use client'

import { motion, useMotionValue, useSpring, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Section, { Cell } from "./Section"

/* -------- Animated Number -------- */

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 60, damping: 20 })

  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, value, motionValue])

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.floor(v)))
  }, [spring])

  return <span ref={ref}>{display}</span>
}

/* -------- Section -------- */

export default function HighValueKeywords() {

  const metrics = [
    { label: "Demand", value: 84 },
    { label: "Seasonal Fit", value: 71 },
    { label: "Margin", value: 76 },
    { label: "Competition", value: 42 },
  ]

  return (
    <Section cols={2} className="font-sans">

        {/* LEFT CONTENT – scroll reveal */}
        <Cell className="reveal-left flex flex-col justify-center">

          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-medium mb-4">
            HYPE SCORE
          </p>

          <h2 className="text-2xl sm:text-4xl md:text-4xl  font-bold text-[#1a1a1a] leading-[1.15] mb-4 sm:mb-6 max-w-lg tracking-tighter">
            One number. Updated every 24 hours.
            <br />
            <span className="text-[#696863]">
              That's your answer.
            </span>
          </h2>

          <p className="text-[#757575] text-[14px] sm:text-[15px] leading-relaxed max-w-md mb-3">
            The Hype Score combines demand momentum, seasonal fit, margin
            potential, and competition pressure into a single number from
            0 to 100.
          </p>

          <p className="text-[#757575] text-sm leading-relaxed max-w-sm">
            It doesn't tell you what you want to hear. It regularly scores
            products at <span className="font-medium text-[#1a1a1a]">15 or 22</span> -
            products that look exciting on social media but have no margin
            or are already saturated.
          </p>

        </Cell>


        {/* RIGHT SCORE CARD – scroll reveal (same as TrendingProducts) */}
        <Cell className="reveal-right flex items-center justify-center md:justify-end">
          <motion.div
            className="relative w-full max-w-[300px] rounded-2xl border border-slate-200 bg-slate-50/50 p-4 shadow-sm"
          >

            {/* Score */}
            <div className="flex flex-col items-center">

              <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1a1a1a]">
                <AnimatedNumber value={78} />
              </div>

              <p className="mt-1.5 text-xs text-[#757575]">
                Hype Score
              </p>

            </div>

            {/* Divider */}
            <div className="my-4 h-px bg-slate-200" />

            {/* Metrics – staggered scroll reveal */}
            <div className="space-y-3 reveal-stagger">

              {metrics.map((metric, i) => (
                <div key={metric.label}>

                  <div className="flex justify-between text-xs text-[#757575] mb-1">
                    <span>{metric.label}</span>
                    <span>{metric.value}</span>
                  </div>

                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">

                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ delay: i * 0.15, duration: 0.8 }}
                      viewport={{ once: true }}
                      style={{ width: `${metric.value}%`, transformOrigin: 'left' }}
                      className="h-full bg-[#1a1a1a] rounded-full"
                    />

                  </div>

                </div>
              ))}

            </div>

          </motion.div>
        </Cell>

    </Section>
  )
}
