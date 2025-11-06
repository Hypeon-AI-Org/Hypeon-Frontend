"use client";


import Link from "next/link";
import { useState } from "react";
import "../../styles/PricingPage.css";


export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFAQ = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const faqs = [
    { question: "What does the subscription cost include?", answer: "Full access to all features, including ecom store builder, product research tools, store intelligence, and more." },
    { question: "What's the catch? Why are your plans so cheap?", answer: "No catch – we want AI tools accessible to everyone." },
    { question: "Is there a free trial available?", answer: "Yes, you can try all features for free." },
    { question: "Will I pay anything during the free trial?", answer: "No, the free trial is completely free." },
    { question: "Can I cancel my subscription anytime?", answer: "Yes, cancel anytime with no penalty." },
    { question: "What payment methods do you accept?", answer: "Major credit/debit cards and PayPal." },
    { question: "Is there a limit on products/stores?", answer: "No, all plans support multiple stores and products according to plan limits." },
    { question: "Are there any additional fees?", answer: "No hidden fees – only your chosen plan." },
    { question: "What happens after my free trial ends?", answer: "Choose a paid plan to continue using Hypeon AI." },
    { question: "Is customer support included?", answer: "Yes, through email and chat." },
  ];

  const pricing = {
    monthly: [
      {
        name: "Free",
        price: "$0",
        description: "Perfect for testing basic features.",
        features: ["Basic trend analysis", "Limited product insights", "No API access", "Single store support"],
        link: "/signup",
      },
      {
        name: "Pro",
        price: "$29",
        description: "For creators & founders who want deep AI insights.",
        features: ["Full trend analysis", "Product prediction AI", "Dashboard access", "Early feature access", "Up to 5 stores"],
        link: "/signup",
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For agencies, teams, and businesses that need custom solutions.",
        features: ["Everything in Pro", "API & custom dashboards", "Priority support", "Private AI model training", "Unlimited stores & products"],
        link: "/contact",
      },
    ],
    yearly: [
      {
        name: "Free",
        price: "$0",
        description: "Perfect for testing basic features.",
        features: ["Basic trend analysis", "Limited product insights", "No API access", "Single store support"],
        link: "/signup",
      },
      {
        name: "Pro",
        price: "$299",
        description: "Annual plan saves 15%! Great for creators & founders.",
        features: ["Full trend analysis", "Product prediction AI", "Dashboard access", "Early feature access", "Up to 5 stores"],
        link: "/signup",
      },
      {
        name: "Enterprise",
        price: "Custom",
        description: "For agencies, teams, and businesses needing custom solutions.",
        features: ["Everything in Pro", "API & custom dashboards", "Priority support", "Private AI model training", "Unlimited stores & products"],
        link: "/contact",
      },
    ],
  };

  return (
    <div className="pricing-page flex flex-col min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-pink-900 text-white">


      <section className="py-20 px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-pink-300">Pricing Plans</h1>
        <p className="text-lg text-gray-300 mb-12">Choose the perfect plan for your growth with Hypeon AI.</p>

        {/* Top Slider Toggle */}
        <div className="billing-toggle">
  <div
    className="billing-slider"
    style={{ transform: billing === "monthly" ? "translateX(0%)" : "translateX(100%)" }}
  />
  <button className={billing === "monthly" ? "active" : ""} onClick={() => setBilling("monthly")}>
    Monthly
  </button>
  <button className={billing === "yearly" ? "active" : ""} onClick={() => setBilling("yearly")}>
    Yearly
  </button>
</div>


        {/* Pricing Cards */}
        <div className="pricing-cards grid grid-cols-1 md:grid-cols-3 gap-10" >
          {pricing[billing].map((plan, index) => (
            <div key={index} className="pricing-card bg-purple-800/60 border border-purple-500 rounded-2xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h2 className="text-2xl font-semibold mb-2 text-pink-300">{plan.name}</h2>
              <p className="text-3xl font-bold mb-2">{plan.price}</p>
              <p className="mb-4 text-gray-300">{plan.description}</p>
              <ul className="text-sm text-gray-200 space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
              <Link href={plan.link} className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:opacity-90 transition">
                {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section max-w-4xl mx-auto px-8 text-left mb-20">
        <h2 className="text-4xl font-bold mb-8 text-pink-300">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item border-b border-gray-700 py-4 cursor-pointer" onClick={() => toggleFAQ(index)}>
            <h3 className="flex justify-between items-center text-lg font-semibold">
              {faq.question} <span>{openIndex === index ? "-" : "+"}</span>
            </h3>
            {openIndex === index && <p className="mt-2 text-gray-300">{faq.answer}</p>}
          </div>
        ))}
      </section>

   
    </div>
  );
}

