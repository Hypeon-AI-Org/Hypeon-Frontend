import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="relative py-32 overflow-hidden">

      {/* LIGHT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-indigo-50" />

      {/* SOFT AMBIENT GLOWS */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-6 text-center reveal">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-display leading-tight text-slate-900">
          Join our <span className="text-brand-600">beta program</span>
        </h2>

        {/* Subheading */}
        <p className="mt-5 text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Built for Shopify founders, TikTok sellers, and performance marketers
          who are tired of guessing what to launch next.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex justify-center gap-5 flex-wrap">

          {/* Primary CTA */}
          <Link
            href="/beta"
            className="
              rounded-xl
              bg-brand-600
              px-8
              py-3
              text-white
              text-sm
              font-medium
              transition
              hover:scale-[1.05]
              hover:shadow-lg
            "
          >
            Join our beta
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/partner"
            className="
              rounded-xl
              border
              border-slate-300
              px-8
              py-3
              text-sm
              text-slate-700
              transition
              hover:border-slate-500
              hover:bg-slate-50
            "
          >
            Partner with us
          </Link>

          {/* Tertiary CTA */}
          <Link
            href="/invest"
            className="
              rounded-xl
              border
              border-slate-200
              px-8
              py-3
              text-sm
              text-slate-500
              transition
              hover:border-slate-400
              hover:text-slate-700
            "
          >
            Invest early
          </Link>
        </div>

        {/* Trust microcopy */}
        <p className="mt-10 text-xs text-slate-400">
          Limited beta access • Early partners welcome
        </p>
      </div>
    </section>
  );
}
