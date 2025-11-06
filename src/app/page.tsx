'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Target, BarChart3, MessageSquare, Zap, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Hype Score Analytics',
      description: 'Quantify product popularity with AI-powered hype scoring across multiple platforms',
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Social Sentiment Insights',
      description: 'Understand what users think with real-time sentiment analysis from social platforms',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Trend Index',
      description: 'Detect emerging product categories before they explode in the market',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Cross-Platform Intelligence',
      description: 'Compare performance across Amazon, Shopify, Reddit, and TikTok in one view',
    },
  ];

  const howItWorks = [
    {
      step: '1',
      title: 'Collect',
      description: 'Gather data from Amazon, Shopify, Reddit, TikTok',
    },
    {
      step: '2',
      title: 'Analyze',
      description: 'AI models compute hype, growth, and sentiment',
    },
    {
      step: '3',
      title: 'Visualize',
      description: 'Beautiful dashboards and reports for decision-making',
    },
  ];

  const platforms = ['Amazon', 'Shopify', 'Reddit', 'TikTok'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 text-gray-900">
              AI-Powered Trend Intelligence
              <br />
              <span className="text-violet-600">for Modern Brands</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Analyze hype, sentiment, and trends across Amazon, Shopify, Reddit, and TikTok — all in one dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="px-8 py-4 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2"
              >
                Get Started
                <Sparkles className="w-5 h-5" />
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-violet-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors border-2 border-violet-600"
              >
                See Features
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Platforms Strip */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-500 mb-8">Powered by data from leading platforms</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-2xl font-bold text-gray-400 hover:text-violet-600 transition-colors"
              >
                {platform}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-gray-900">
              What You Can Do with <span className="text-violet-600">Hypeon</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Leverage cutting-edge AI technology to stay ahead of market trends
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-violet-600 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-gray-900">
              How It <span className="text-violet-600">Works</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-violet-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
            >
              See Dashboard Demo
              <TrendingUp className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-purple-50 -z-10" />
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-4 border-2 border-violet-200">
              <div className="aspect-video bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-24 h-24 text-violet-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-gray-900">Dashboard Preview</p>
                  <p className="text-gray-600">Interactive analytics coming soon</p>
                </div>
              </div>
            </div>
            <p className="text-xl font-semibold text-gray-900 mt-8">
              All your product intelligence — <span className="text-violet-600">visualized instantly</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-12"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 text-white">
              Ready to uncover what's trending?
            </h2>
            <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
              Join modern brands using Hypeon AI to make smarter, data-driven decisions
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-3xl"
            >
              Start Free
              <Sparkles className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
