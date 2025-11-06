'use client';

import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  LineChart,
  Award
} from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: 'Engagement Analytics',
      description: 'Tracks engagement from social platforms (Reddit, TikTok) and product listings (Amazon, Shopify).',
      benefit: 'Identify which products or niches get real audience attention before investing in ads or inventory.',
      example: 'See which TikTok trends correlate with product sales spikes.',
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: 'Growth Rate Analysis',
      description: 'Measures weekly and monthly growth patterns across platforms.',
      benefit: 'Detect momentum early — before competitors saturate the niche.',
      example: 'Spot upward-trending products with fast sales acceleration.',
    },
    {
      icon: <MessageSquare className="w-10 h-10" />,
      title: 'Sentiment Intelligence',
      description: 'Analyzes thousands of Reddit and TikTok comments for positive, negative, or neutral sentiment.',
      benefit: 'Understand real user perception — which features people love or complain about.',
      example: 'Discover if "eco-friendly" or "minimalist" trends are gaining love in your category.',
    },
    {
      icon: <LineChart className="w-10 h-10" />,
      title: 'Trend Index',
      description: 'Quantifies trend momentum by combining engagement, mentions, and sales velocity.',
      benefit: 'Acts as an early warning system for what\'s becoming "hot" or "declining."',
      example: 'Find niches that are trending up before ad costs explode.',
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Hype Score',
      description: 'Aggregates social engagement, sentiment, and growth data into one unified metric.',
      benefit: 'Gives D2C operators a simple, at-a-glance way to rank opportunities.',
      example: 'Compare the hype score of two similar products to decide where to focus.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <section className="px-4 py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
            Hypeon AI <span className="text-violet-600">Features</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides five core analytics modules designed to help D2C brands and dropshippers make data-driven product decisions.
          </p>
        </div>
      </section>

      {/* Features List */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 md:p-10 hover:border-violet-300 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                      {feature.title}
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">What it does</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-violet-600 uppercase tracking-wide mb-2">Why it matters</h3>
                        <p className="text-gray-700 leading-relaxed">
                          {feature.benefit}
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 border-l-4 border-violet-600 p-4 rounded">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Example</h3>
                        <p className="text-gray-700 text-sm italic">
                          {feature.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
