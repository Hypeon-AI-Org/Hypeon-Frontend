import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LazyVideo from './LazyVideo'

// Define your color palette for consistent styling
const colors = {
  textPrimary: '#1a202c', // Dark gray/black for main headings
  textSecondary: '#4a5568', // Medium gray for body text
  primaryButtonBg: '#000000', // Black for the main CTA button
  primaryButtonText: '#ffffff', // White for button text
  uiBackground: '#f7fafc', // Light gray background for the app screenshot secztion
  border: '#e2e8f0', // Border color for UI elements
  accentPink: '#ffffffff', // Soft pink accent used in the screenshot background
}

export default function FunnelAILandingPage() {
  return (
    <>
      <Head>
        <title>The future of attribution is conversational</title>
      </Head>

      <div className="min-h-screen bg-[oklch(0.988_0.0041_91.45)] font-sans antialiased text-center">
        {/* Main Content Container - centered with padding */}
        <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">

          {/* Logo and Brand Name Section */}
          <div className="mb-8 reveal">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-600">HypeOn AI Copilot</p>
          </div>

          {/* Headline and Subheadline Section */}
          <div className="max-w-2xl mx-auto mb-12 reveal-left">
            <h1 className="text-2xl sm:text-4xl md:text-4xl tracking-tight mb-6" style={{ color: colors.textPrimary }}>
              The future of attribution is <span className="text-[#696863]">conversational</span>
            </h1>
            <p className="text-[15px]  leading-relaxed" style={{ color: colors.textSecondary }}>
              Ask your data anything — in plain English. The Copilot is wired directly into your live attribution layer and gives you specific, numbered answers. No dashboards to dig through. No analysts to wait for.
            </p>
          </div>

          {/* Call-to-Action Button */}
          <div className="mb-20 reveal">
            <Link href="https://app.hypeon.ai/hub/login">
              <span className="inline-block px-6 py-3 font-bold text-base rounded-md transition duration-150 ease-in-out hover:opacity-90"
                style={{ backgroundColor: colors.primaryButtonBg, color: colors.primaryButtonText }}>
                Get the demo
              </span>
            </Link>
          </div>

          {/* UI Screenshot/App Showcase Section */}
          <div
            className="relative rounded-lg border shadow-xl overflow-hidden max-w-4xl mx-auto reveal-scale"
            style={{ borderColor: colors.border }}
          >
            <LazyVideo src="/images/CHABOT56.mp4" className="w-full h-auto" />
          </div>
        </main>
      </div>
    </>
  )
}