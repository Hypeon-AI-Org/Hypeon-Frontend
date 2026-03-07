'use client'

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"

const features = [
  {
    name: "Trending product discovery (Hype Score)",
    values: ["yes", "yes", "no", "no", "no"]
  },
  {
    name: "Cross-platform keyword intelligence",
    values: ["yes", "partial", "no", "no", "no"]
  },
  {
    name: "Winning ad creative analysis",
    values: ["yes", "no", "yes", "no", "no"]
  },
  {
    name: "Pricing intelligence & recommendations",
    values: ["yes", "partial", "no", "no", "no"]
  },
  {
    name: "Brand review & market gap analysis",
    values: ["yes", "no", "no", "no", "no"]
  },
  {
    name: "Competitor social media analysis",
    values: ["yes", "no", "partial", "no", "no"]
  },
  {
    name: "Competitor website traffic analysis",
    values: ["yes", "no", "no", "no", "no"]
  },
  {
    name: "GEO demand analysis by country",
    values: ["yes", "no", "no", "no", "no"]
  },
  {
    name: "Last-click attribution",
    values: ["yes", "no", "no", "yes", "no"]
  },
  {
    name: "Cross-device identity resolution",
    values: ["yes", "no", "no", "partial", "no"]
  },
  {
    name: "New vs returning customer by channel",
    values: ["yes", "no", "no", "partial", "no"]
  },
  {
    name: "Product-channel fit analysis",
    values: ["yes", "no", "no", "no", "no"]
  },
  {
    name: "AI Copilot (plain English queries)",
    values: ["yes", "no", "no", "no", "partial"]
  },
  {
    name: "Actionable budget recommendations",
    values: ["yes", "no", "no", "partial", "no"]
  },
  {
    name: "Zero-code integrations",
    values: ["yes", "yes", "yes", "yes", "no"]
  }
]

export default function ComparisonBlackWhite() {
  return (
    <section className="relative py-16 bg-white overflow-hidden">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black">
            One platform vs <span className="text-brand-600">six tools.</span>
          </h2>
          <p className="mt-6 text-lg text-neutral-500 max-w-3xl mx-auto">
            Stop paying for tools that don’t talk to each other — while still leaving half your intelligence gaps unfilled.
          </p>
        </motion.div>

        {/* Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-neutral-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.08)] overflow-x-auto"
        >
          <table className="min-w-full text-sm">

            {/* Header */}
            <thead>
              <tr className="border-b border-neutral-200 text-left">
                <th className="px-4 py-3 text-neutral-500 font-medium w-[300px]">
                  Capability
                </th>

                {/* HypeOn Highlight */}
                <th className="px-4 py-3 font-semibold text-black bg-neutral-100">
                  HypeOn
                </th>

                <th className="px-4 py-3 text-neutral-500 font-medium">
                  Trend Tools
                </th>
                <th className="px-4 py-3 text-neutral-500 font-medium">
                  Ad Spy Tools
                </th>
                <th className="px-4 py-3 text-neutral-500 font-medium">
                  Attribution Tools
                </th>
                <th className="px-4 py-3 text-neutral-500 font-medium">
                  BI Tools
                </th>
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {features.map((feature, rowIndex) => (
                <motion.tr
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.04 }}
                  viewport={{ once: true }}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-300"
                >
                  <td className="px-4 py-3 text-neutral-800 font-medium">
                    {feature.name}
                  </td>

                  {feature.values.map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-4 py-3 text-center ${colIndex === 0 ? "bg-neutral-50" : ""
                        }`}
                    >
                      {value === "yes" && (
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-900 text-white"
                        >
                          <Check size={16} />
                        </motion.div>
                      )}

                      {value === "no" && (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-neutral-100 text-neutral-400">
                          <X size={16} />
                        </div>
                      )}

                      {value === "partial" && (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="text-neutral-600 font-medium"
                        >
                          Partial
                        </motion.div>
                      )}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}