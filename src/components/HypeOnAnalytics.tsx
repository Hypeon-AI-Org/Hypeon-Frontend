"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: "What is HypeOn and who is it for?", answer: "MarketerHypeOn is a prediction and attribution intelligence platform built specifically for e-commerce founders and brand owners. It combines HypeOn Intelligence (what to sell, what keywords to target, what creatives to run, where competitors are weak) with HypeOn Analytics (exactly which marketing channel drove every sale, with no double counting). It's for anyone running a Shopify store spending £5K–£500K+/month on ads who is tired of guessing." },
  { question: "How is HypeOn different from Jungle Scout or AdSpy?", answer: "Jungle Scout focuses only on Amazon product research. AdSpy focuses only on ad creative tracking. Neither tells you which channel actually drove your revenue, what your true CAC is by channel, or where competitors are gaining traffic. HypeOn is the only platform that covers trend discovery, keyword intelligence, creative analysis, competitor intelligence, GEO analysis, AND marketing attribution — all in one place, all connected, with an AI Copilot to make it actionable.ds, retailers, and marketers looking for a data-driven edge." },
  { question: "What does attribution without double counting actually mean?", answer: "Every ad platform (Google, Meta, TikTok) takes 100% credit for every sale it touched. So if a customer clicked a Google ad on Monday and a Facebook ad on Thursday before buying, both platforms claim that sale. Your real ROAS looks 2–4× better than it is. HypeOn's last-click attribution assigns every Shopify order to exactly ONE channel — the last touchpoint before purchase — using GA4 identity data and cross-device email bridging. You see reality, not platform propaganda. offer seamless API integrations with most major retail and marketing platforms." },
  { question: "Do I need a developer to set up HypeOn Analytics?", answer: "The Hype Score is a proprietary 0–100 metric updated daily for every product and keyword in our database. It combines four signals: Demand Momentum (how fast demand is rising), Seasonal Fit (whether timing amplifies or limits demand right now), Margin Potential (estimated profitability), and Competition Pressure (how saturated the market is). A score above 70 means early-stage, high-potential opportunity. Above 85 means breaking out now. It's designed to tell you whether to launch, wait, or skip — before you've spent a penny.nlike agencies, we provide real-time, AI-driven software tools that you control." },
  { question: "How accurate is the attribution coverage?", answer: "OHypeOn achieves 80–85% attribution coverage on average. The remaining 15–20% is technically unavoidable without mandatory login — it covers customers who browse incognito, use iOS ITP, or switch devices without providing an email. Any tool claiming 100% attribution is using probabilistic modelling (guessing) or is inaccurate. We believe in transparent, honest attribution with confidence levels — so you know exactly how much to trust each data point.ur suite includes trend forecasting, customer sentiment analysis, and revenue-driving insights." },
  { question: "Can I use HypeOn for multiple brands or stores?", answer: "Yes. The Agency / Enterprise plan supports multi-brand and multi-store setups with separate data environments for each brand. Agencies can manage multiple clients from a single dashboard with white-label reporting. Contact us for custom pricing based on the number of brands and combined ad spend.Book demo" },
  { question: "How do you ensure scalability?", answer: "Our infrastructure is built on elastic cloud systems to handle data for any brand size." },
  { question: "Is my data secure with HypeOn?", answer: "Yes, we use enterprise-grade encryption and comply with all major data protection standards." }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-14 px-6 font-sans">
      <div className="max-w-6xl mx-auto bg-[#111111] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-16">
        
        {/* Left Side: Header – scroll reveal */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-white text-3xl md:text-4xl font-display font-semibold mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-[16px] leading-relaxed max-w-md">
            Read some of the most asked questions around Hypeon. If you cannot find your answer, reach out to us using the chat in the bottom-right corner!
          </p>
        </motion.div>

        {/* Right Side: Accordion – scroll reveal */}
        <motion.div
          className="md:w-1/2 border-t border-gray-800"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-800">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-4 flex justify-between items-center text-left text-white group"
              >
                <span className="text-[15px] font-medium pr-4">{faq.question}</span>
                <ChevronDown 
                  className={`text-gray-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={18} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 text-gray-400 leading-relaxed text-[14px]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );

}