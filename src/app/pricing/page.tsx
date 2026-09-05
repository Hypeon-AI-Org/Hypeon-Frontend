"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartToday from "../../components/TeamGlobalMap";
import { Activity } from "lucide-react";
import PromoCountdown from "@/components/PromoCountdown";
import { GROWTH_OFFER, STUDIO_PLANS_URL, usd } from "@/lib/growthOffer";

type TabKey = "intelligence" | "analytics";

/* ──────────────────────────────────────────────
   STUDIO CATALOG
   Mirrors apps/studio-api/app/services/billing/plans.py in the product repo:
   that file is what checkout charges, so a price changed there must change
   here the same day. Prices are USD per month; `yearly` is the per-month
   equivalent when billed yearly (75600 / 12 = 63, and so on).
   ────────────────────────────────────────────── */

type StudioPlan = {
  key: "STARTER" | "GROWTH" | "PRO" | "SCALE";
  name: string;
  blurb: string;
  monthly: number; // 0 == free
  yearly: number | null; // per-month equivalent billed yearly
  credits: number;
  cta: string;
  badge?: string;
  includesLabel: string;
  features: string[];
};

const STUDIO_PLANS: StudioPlan[] = [
  {
    key: "STARTER",
    name: "Starter",
    blurb: "Analyse your site, set up your brand and generate your first ads. Free, no card.",
    monthly: 0,
    yearly: null,
    credits: 100,
    cta: "Start free",
    includesLabel: "What's included",
    features: [
      "1 brand, 1 seat",
      "100 credits / month",
      "Website analysis + brand setup",
      "Unlimited competitor ad search + Hype Score",
      "Static ad generation",
    ],
  },
  {
    key: "GROWTH",
    name: "Growth",
    blurb: "For brands shipping ads every week that want the competitor picture behind them.",
    monthly: 79,
    yearly: 63,
    credits: 2000,
    cta: "Choose Growth",
    includesLabel: "Everything in Starter, plus",
    features: [
      "3 brands, 3 seats",
      "2,000 credits / month",
      "Video + UGC generation",
      "Competitor ad library",
      "15 competitor deep-dive reports / month",
      "Auto-launch to ad channels (Meta, Google, Pinterest, TikTok)",
    ],
  },
  {
    key: "PRO",
    name: "Pro",
    blurb: "For scaling brands and small teams running several brands and channels.",
    monthly: 199,
    yearly: 159,
    credits: 6000,
    cta: "Choose Pro",
    badge: "Most brands pick this",
    includesLabel: "Everything in Growth, plus",
    features: [
      "10 brands, 10 seats",
      "6,000 credits / month",
      "40 competitor deep-dive reports / month",
      "Auto-scaling budget",
      "Integrations (Shopify, Slack)",
    ],
  },
  {
    key: "SCALE",
    name: "Scale",
    blurb: "For agencies and multi-brand operators who want every limit lifted.",
    monthly: 499,
    yearly: 399,
    credits: 20000,
    cta: "Choose Scale",
    includesLabel: "Everything in Pro, plus",
    features: [
      "Unlimited brands and seats",
      "20,000 credits / month",
      "Unlimited competitor deep-dive reports",
      "Priority support + onboarding",
      "Custom credit top-ups",
    ],
  },
];

type RevenueKey = "5k" | "10k" | "20k" | "40k" | "83k" | "250k" | "750k" | "1m";

const analyticsPricing: Record<
  RevenueKey,
  { starter: number; growth: number; pro: number | "Custom" }
> = {
  "5k": { starter: 49, growth: 119, pro: 279 },
  "10k": { starter: 59, growth: 149, pro: 349 },
  "20k": { starter: 79, growth: 199, pro: 449 },
  "40k": { starter: 109, growth: 269, pro: 599 },
  "83k": { starter: 149, growth: 349, pro: 799 },
  "250k": { starter: 229, growth: 499, pro: 1099 },
  "750k": { starter: 349, growth: 749, pro: 1599 },
  "1m": { starter: 499, growth: 999, pro: "Custom" },
};

function CheckIcon() {
  return (
    <span className="inline-flex items-center justify-center w-[18px] h-[18px] bg-emerald-50 rounded-full shrink-0 mt-px">
      <svg viewBox="0 0 12 12" fill="none" className="w-[10px] h-[10px]">
        <path
          d="M2 6.5L4.5 9L10 3"
          stroke="#10B981"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    onChange();

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    }

    // Safari fallback
    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, []);

  return reduced;
}

function useInView<T extends Element>({
  threshold = 0.12,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  disabled = false,
}: {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  disabled?: boolean;
} = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (disabled) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, once, disabled]);

  return { ref, inView } as const;
}

function Reveal({
  children,
  delayMs = 0,
  className = "",
}: {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({
    disabled: reducedMotion,
    threshold: 0.15,
    rootMargin: "0px 0px -5% 0px",
  });

  return (
    <div
      ref={ref}
      className={[
        className,
        "transform-gpu",
        "will-change-[transform,opacity] motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out motion-reduce:transition-none",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
      ].join(" ")}
      style={
        delayMs > 0 && !reducedMotion
          ? ({ transitionDelay: `${delayMs}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("intelligence");
  const [revenue, setRevenue] = useState<RevenueKey>("10k");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  // The Growth offer. `true` on the server and on the first client render so
  // hydration agrees; the effect withdraws it when the deadline has passed,
  // and the countdown withdraws it the second it reaches zero.
  const [offerLive, setOfferLive] = useState(true);
  useEffect(() => {
    if (Date.now() >= Date.parse(GROWTH_OFFER.endsAt)) setOfferLive(false);
  }, []);

  const activeTabRef = useRef<TabKey>(activeTab);
  activeTabRef.current = activeTab;

  const toggleContainerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const btnIntelRef = useRef<HTMLButtonElement | null>(null);
  const btnAnalyticsRef = useRef<HTMLButtonElement | null>(null);

  const analyticsTier = analyticsPricing[revenue];
  const revLabel = revenue === "1m" ? "1M+" : revenue;

  /** Uses `activeTabRef` so resize/zoom handlers always match the selected tab (avoids stale closure from `useEffect([])`). */
  const positionSlider = useCallback(() => {
    const container = toggleContainerRef.current;
    const slider = sliderRef.current;
    const tab = activeTabRef.current;
    const btn =
      tab === "intelligence"
        ? btnIntelRef.current
        : btnAnalyticsRef.current;
    if (!container || !slider || !btn) return;

    const rect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    // Matches container `p-1` + slider `left-1` (4px) inset; round to reduce subpixel blur on zoom/transform.
    const inset = 4;
    const width = Math.round(rect.width);
    const x = Math.round(rect.left - containerRect.left - inset);
    slider.style.width = `${width}px`;
    slider.style.transform = `translate3d(${x}px,0,0)`;
  }, []);

  useLayoutEffect(() => {
    positionSlider();
    requestAnimationFrame(() => positionSlider());
  }, [activeTab, positionSlider]);

  useEffect(() => {
    const container = toggleContainerRef.current;
    const run = () => requestAnimationFrame(() => positionSlider());

    window.addEventListener("resize", run);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", run);
    vv?.addEventListener("scroll", run);

    const ro =
      container &&
      new ResizeObserver(() => {
        run();
      });
    if (container && ro) ro.observe(container);

    return () => {
      window.removeEventListener("resize", run);
      vv?.removeEventListener("resize", run);
      vv?.removeEventListener("scroll", run);
      ro?.disconnect();
    };
  }, [positionSlider]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <Navbar />

      <main className="relative z-10">
        <div className="antialiased leading-relaxed text-gray-900">
          {/* ─── HERO ─── */}
          <Reveal>
            <section className="text-center pt-24 pb-12 px-6 max-w-[1200px] mx-auto">
              <div className="inline-flex items-center gap-2 text-gray-600 text-sm font-medium mb-6">
                <span className="flex items-center justify-center w-5 h-5 rounded-md bg-black text-white shrink-0">
                  <Activity className="w-3 h-3" />
                </span>
                Built on millions of data signals
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tighter mb-4 text-gray-900">
                Plans and <span className="text-[#696863]">pricing</span>
              </h1>
              <p className="text-base text-gray-600 max-w-[520px] leading-relaxed mb-1.5 mx-auto">
                Get started with HypeOn
              </p>
              <p className="text-sm text-gray-400 max-w-[520px] font-normal mx-auto">
                Improve your conversion rate and Profit
              </p>
            </section>
          </Reveal>

          {/* ─── TOGGLE ─── */}
          <Reveal delayMs={80}>
            <div className="flex justify-center px-6 pb-4">
              <div
                ref={toggleContainerRef}
                className="relative flex items-stretch bg-white border border-gray-200 rounded-full p-1 shadow-sm"
              >
                <div
                  ref={sliderRef}
                  className="pointer-events-none absolute left-1 top-1 z-[1] h-[calc(100%-8px)] rounded-full bg-slate-800 [backface-visibility:hidden] motion-safe:transition-[transform,width] motion-safe:duration-[450ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                  style={{ width: 0, transform: "translate3d(0,0,0)" }}
                />
                <button
                  ref={btnIntelRef}
                  type="button"
                  className={`relative z-[2] px-5 sm:px-8 py-3 border-none bg-transparent text-sm sm:text-[15px] font-semibold cursor-pointer rounded-full transition-colors duration-300 whitespace-nowrap ${
                    activeTab === "intelligence" ? "text-white" : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("intelligence")}
                >
                  HypeOn Studio
                </button>
                <button
                  ref={btnAnalyticsRef}
                  type="button"
                  className={`relative z-[2] px-5 sm:px-8 py-3 border-none bg-transparent text-sm sm:text-[15px] font-semibold cursor-pointer rounded-full transition-colors duration-300 whitespace-nowrap ${
                    activeTab === "analytics" ? "text-white" : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("analytics")}
                >
                  HypeOn Analytics
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="text-center pt-2 px-6 mb-10">
              <p className="text-sm text-gray-400">
                {activeTab === "intelligence"
                  ? "Competitor intelligence, ad creation and launch in one workspace"
                  : "Cross-channel attribution, true ROAS & budget optimization"}
              </p>
              {activeTab === "intelligence" && (
                <div className="flex justify-center mt-2.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-gray-300 bg-white text-xs font-medium text-gray-800 shadow-sm leading-tight">
                    30 day money-back guarantee
                  </span>
                </div>
              )}
            </div>
          </Reveal>

          {/* ═══════════ INTELLIGENCE TAB ═══════════ */}
          {activeTab === "intelligence" && (
            <div>
              {/* Studio plan cards: one card per STUDIO_PLANS entry. Growth
                  carries the launch offer while `offerLive`. */}
              <Reveal delayMs={120}>
                <section className="max-w-[1200px] mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8 max-md:max-w-[480px] max-md:mx-auto">
                  {STUDIO_PLANS.map((plan, i) => {
                    const isFree = plan.monthly === 0;
                    const highlighted = plan.key === "PRO";
                    const offer = plan.key === "GROWTH" && offerLive ? GROWTH_OFFER : null;
                    const cardClass = highlighted
                      ? "bg-white border-gray-900 border rounded-2xl p-9 flex flex-col relative shadow-lg transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl motion-reduce:transition-none motion-reduce:transform-none motion-safe:animate-fadeUp"
                      : `bg-white border rounded-2xl p-9 flex flex-col relative transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none motion-safe:animate-fadeUp ${
                          offer ? "border-amber-400 shadow-md" : "border-gray-200 hover:border-gray-300"
                        }`;
                    const ctaClass = highlighted || offer
                      ? "block w-full py-3.5 rounded-full text-[15px] font-semibold cursor-pointer text-center no-underline mb-7 bg-slate-800 text-white transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-900 motion-reduce:transition-none motion-reduce:transform-none"
                      : "block w-full py-3.5 rounded-full text-[15px] font-semibold cursor-pointer text-center no-underline bg-transparent border-2 border-gray-200 text-gray-900 mb-7 transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color,background-color,color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 motion-reduce:transition-none motion-reduce:transform-none";
                    return (
                      <div
                        key={plan.key}
                        className={cardClass}
                        style={{ animationDelay: `${50 + i * 70}ms` }}
                        aria-label={`${plan.name} plan`}
                      >
                        {plan.badge && (
                          <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-semibold px-5 py-1.5 rounded-b-[10px] tracking-wide whitespace-nowrap">
                            {plan.badge}
                          </div>
                        )}
                        <div className="text-xl font-bold mb-3">{plan.name}</div>
                        <div className="text-sm text-gray-600 mb-6 min-h-[60px]">{plan.blurb}</div>

                        {offer ? (
                          <>
                            <div className="mb-1 flex items-baseline gap-1">
                              <span className="text-5xl font-bold tracking-[-2px] leading-none">
                                {usd(offer.offerPrice)}
                              </span>
                              <s className="text-2xl font-semibold text-gray-400 ml-1">{usd(plan.monthly)}</s>
                              <span className="text-sm text-gray-400 ml-1">first month</span>
                            </div>
                            <div className="text-[13px] text-gray-400 mb-2">
                              then {usd(plan.monthly)} / month · cancel anytime
                            </div>
                            <PromoCountdown
                              endsAt={offer.endsAt}
                              onExpire={() => setOfferLive(false)}
                              className="self-start mb-5"
                            />
                          </>
                        ) : (
                          <>
                            <div className="mb-1 flex items-baseline gap-1">
                              <span className="text-5xl font-bold tracking-[-2px] leading-none">
                                {isFree ? "Free" : usd(plan.monthly)}
                              </span>
                              {!isFree && <span className="text-sm text-gray-400 ml-1">/ month</span>}
                            </div>
                            <div className="text-[13px] text-gray-400 mb-2">
                              {isFree
                                ? "No credit card required"
                                : plan.yearly
                                  ? `or ${usd(plan.yearly)} / month billed yearly`
                                  : "Billed monthly · No commitment"}
                            </div>
                            <div className="mb-5" />
                          </>
                        )}

                        <a href={STUDIO_PLANS_URL} className={ctaClass}>
                          {offer ? `Get Growth for ${usd(offer.offerPrice)}` : plan.cta}
                        </a>

                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-3 border-b border-gray-200">
                          {plan.includesLabel}
                        </div>
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-start gap-2.5 text-sm text-gray-600 mb-3 leading-snug">
                            <CheckIcon />
                            {f}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
                <p className="text-center text-[13px] text-gray-400 mb-12">
                  A credit is one unit of generation. Static ad ~50 credits · Video or UGC ad
                  ~150-200 · Competitor deep-dive ~100. Unused credits roll over one month; top up
                  anytime at $19 per 500. Need custom limits or a dedicated manager?{" "}
                  <a
                    href="https://calendly.com/yash-hypeon/30min"
                    className="font-semibold text-gray-700 underline underline-offset-2 hover:text-gray-900"
                  >
                    Talk to sales
                  </a>
                  .
                </p>
                </section>
              </Reveal>

              {/* Compare Intelligence Table */}
              <Reveal delayMs={100}>
                <CompareIntelligenceTable analyticsTier={analyticsTier} />
              </Reveal>
            </div>
          )}

          {/* ═══════════ ANALYTICS TAB ═══════════ */}
          {activeTab === "analytics" && (
            <div>
              {/* Revenue Selector */}
              <Reveal delayMs={60}>
                <section className="text-center mb-12 px-6">
                  <h3 className="text-base font-semibold mb-4 text-gray-900">
                    What&apos;s your tracked monthly revenue?
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(
                      [
                        ["5k", "$5k"],
                        ["10k", "$10k"],
                        ["20k", "$20k"],
                        ["40k", "$40k"],
                        ["83k", "$83k"],
                        ["250k", "$250k"],
                        ["750k", "$750k"],
                        ["1m", "$1M+"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        className={`px-[22px] py-3 border-[1.5px] rounded-full text-[13px] font-bold cursor-pointer transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color,background-color,color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transition-none motion-reduce:transform-none ${
                        revenue === key
                          ? "bg-slate-800 text-white border-transparent"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-900 hover:text-gray-900"
                        }`}
                        onClick={() => setRevenue(key)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </section>
              </Reveal>

              {/* Analytics Cards */}
              <Reveal delayMs={100}>
                <section className="max-w-[1200px] mx-auto px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20 max-md:max-w-[480px] max-md:mx-auto">
                  {/* Starter */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-9 flex flex-col relative transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gray-300 hover:shadow-md motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none motion-safe:animate-fadeUp [animation-delay:50ms]">
                  <div className="text-xl font-bold mb-3">Starter</div>
                    <div className="text-sm text-gray-600 mb-6 min-h-[60px]">
                      See your real numbers. Stop trusting platform-reported data blindly.
                    </div>
                    <div className="mb-1 flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-[-2px] leading-none">
                        ${analyticsTier.starter}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">/ month</span>
                    </div>
                    <div className="text-[13px] text-gray-400 mb-2">
                      Based on up to ${revLabel} tracked monthly revenue
                    </div>
                    <div className="mb-5" />
                    <a
                      href="https://calendly.com/yash-hypeon/30min"
                      className="block w-full py-3.5 rounded-full text-[15px] font-semibold cursor-pointer text-center no-underline bg-transparent border-2 border-gray-200 text-gray-900 mb-7 transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color,background-color,color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300 motion-reduce:transition-none motion-reduce:transform-none"
                    >
                      Get Started
                    </a>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-3 border-b border-gray-200">
                      What&apos;s included
                    </div>
                    {[
                      "Cross-channel ROAS (deduplicated)",
                      "True CPA per channel, side by side",
                      "2 ad channels (Meta + Google)",
                      "Executive dashboard",
                      "Channel performance breakdown",
                      "Weekly budget reallocation signals",
                      "Wasted spend summary",
                      "Shopify / WooCommerce / BigCommerce",
                      "GA4 integration",
                      "90-day data retention",
                      "2 users",
                      "Email support",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-gray-600 mb-3 leading-snug">
                        <CheckIcon />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Growth (recommended) */}
                  <div className="bg-white border-gray-900 border rounded-2xl p-9 flex flex-col relative shadow-lg transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-xl motion-reduce:transition-none motion-reduce:transform-none motion-safe:animate-fadeUp [animation-delay:120ms]">
                  <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-semibold px-5 py-1.5 rounded-b-[10px] tracking-wide">
                      Most Popular
                    </div>
                  <div className="text-xl font-bold mb-3">Pro</div>
                    <div className="text-sm text-gray-600 mb-6 min-h-[60px]">
                      Daily campaign-level decisions. Know exactly what to scale, hold, or cut.
                    </div>
                    <div className="mb-1 flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-[-2px] leading-none">
                        ${analyticsTier.growth}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">/ month</span>
                    </div>
                    <div className="text-[13px] text-gray-400 mb-2">
                      Based on up to ${revLabel} tracked monthly revenue
                    </div>
                    <div className="mb-5" />
                    <a
                      href="https://calendly.com/yash-hypeon/30min"
                      className="block w-full py-3.5 rounded-full text-[15px] font-semibold cursor-pointer text-center no-underline mb-7 bg-slate-800 text-white transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-900 motion-reduce:transition-none motion-reduce:transform-none"
                    >
                      Get Started
                    </a>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-3 border-b border-gray-200">
                      Everything in Starter, plus
                    </div>
                    {[
                      "5 ad channels (+ TikTok, Klaviyo, etc.)",
                      "First-party server-side tracking",
                      "Multi-touch attribution model",
                      "Daily Scale / Hold / Cut signals per campaign",
                      "Per-campaign wasted spend detection",
                      "Custom dashboards (up to 3)",
                      "Scheduled email reports",
                      "Slack / Teams alerts",
                      "12-month data retention",
                      "Guided setup call",
                      "5 users · Priority chat support",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-gray-600 mb-3 leading-snug">
                        <CheckIcon />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Enterprise */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-9 flex flex-col relative transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gray-300 hover:shadow-md motion-safe:hover:-translate-y-1 motion-reduce:transition-none motion-reduce:transform-none motion-safe:animate-fadeUp [animation-delay:190ms]">
                  <div className="text-xl font-bold mb-3">Enterprise</div>
                    <div className="text-sm text-gray-600 mb-6 min-h-[60px]">
                      Tailored to your needs - custom limits, integrations, and dedicated
                      support. Let&apos;s build a plan that fits.
                    </div>
                    <div className="mb-1 flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-[-2px] leading-none">
                        {typeof analyticsTier.pro === "string"
                          ? analyticsTier.pro
                          : `$${analyticsTier.pro}`}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">
                        {typeof analyticsTier.pro === "string" ? "" : "/ month"}
                      </span>
                    </div>
                    <div className="text-[13px] text-gray-400 mb-2">
                      {typeof analyticsTier.pro === "string"
                        ? "Contact us for enterprise pricing"
                        : `Based on up to $${revLabel} tracked monthly revenue`}
                    </div>
                    <div className="mb-5" />
                    <a
                      href="https://calendly.com/yash-hypeon/30min"
                      className="block w-full py-3.5 rounded-full text-[15px] font-semibold cursor-pointer text-center no-underline mb-7 bg-slate-800 text-white transform-gpu will-change-transform motion-safe:transition-[transform,box-shadow,background-color] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-900 motion-reduce:transition-none motion-reduce:transform-none"                    >
                      Talk to Sales
                    </a>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4 pb-3 border-b border-gray-200">
                      Everything in Growth, plus
                    </div>
                    {[
                      "Unlimited ad channels (Pinterest, Snap, Amazon…)",
                      "Custom attribution windows",
                      "AI-powered budget optimizer",
                      "Per-ad wasted spend alerts",
                      "Unlimited custom dashboards",
                      "Data warehouse export (BigQuery, Snowflake)",
                      "API access",
                      "Unlimited data retention",
                      "Done-for-you pixel & tracking setup",
                      "Unlimited users · Dedicated account manager",
                      "SLA & uptime guarantee",
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2.5 text-sm text-gray-600 mb-3 leading-snug">
                        <CheckIcon />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
                </section>
              </Reveal>

              {/* Compare Analytics Table */}
              <Reveal delayMs={100}>
                <CompareAnalyticsTable analyticsTier={analyticsTier} />
              </Reveal>
            </div>
          )}

          {/* ─── FAQ ─── */}
          <Reveal delayMs={80}>
            <section className="max-w-[980px] mx-auto px-6 pb-[72px]">
              <h2 className="text-center text-2xl md:text-4xl font-bold tracking-tight mb-10">
                Got questions? <span className="text-[#696863]">We got answers.</span>
              </h2>
              <div className="bg-white/70 border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
                {[
                  {
                    q: "Intelligence vs Analytics - which one do I actually need?",
                    a: (
                      <>
                        <strong>Intelligence</strong> tells you what to sell, who to beat, and
                        where to expand. <strong>Analytics</strong> tells you where your
                        money&apos;s actually going and which campaigns to kill or scale. Most
                        serious D2C brands run both - Intelligence finds the opportunity,
                        Analytics makes sure you don&apos;t burn cash chasing it.
                      </>
                    ),
                  },
                  {
                    q: "Can I stack both products and get a bundle deal?",
                    a: (
                      <>
                        Yes. Brands running both Intelligence + Analytics get a unified dashboard
                        and a bundled price. Reach out and we&apos;ll put together a package based
                        on your revenue tier and the features you actually need - no filler, no
                        upsell traps.
                      </>
                    ),
                  },
                  {
                    q: "Why does Analytics pricing scale with my revenue?",
                    a: (
                      <>
                        Because a brand doing $10k/mo and one doing $750k/mo are dealing with
                        totally different data volumes, attribution complexity, and channel mix.
                        Revenue-based pricing means you&apos;re never overpaying for scale you
                        haven&apos;t hit yet - and you get enterprise-grade accuracy when you do.
                      </>
                    ),
                  },
                  {
                    q: 'What does "True ROAS" actually mean - how is it different from what Meta/Google shows me?',
                    a: (
                      <>
                        Meta and Google both claim credit for the same conversion. You end up
                        counting sales twice (sometimes three times). HypeOn deduplicates
                        everything using first-party, server-side data - so you see one number per
                        sale, attributed to the channel that actually drove it. Most brands
                        discover they&apos;ve been over-reporting conversions by 25–40%.
                      </>
                    ),
                  },
                  {
                    q: "Which platforms and stores does HypeOn integrate with?",
                    a: (
                      <>
                        Analytics connects to Shopify, WooCommerce, BigCommerce, and Magento. On
                        the paid side: Meta, Google, TikTok, Pinterest, Snapchat, Amazon Ads,
                        Klaviyo, and more. Intelligence monitors any public-facing brand across ad
                        libraries, social platforms, and review sites - no integration needed on
                        their end.
                      </>
                    ),
                  },
                  {
                    q: "Is there a free trial?",
                    a: (
                      <>
                        HypeOn Studio Starter is free, no credit card required: analyse your
                        site, set up your brand and generate your first ads before paying
                        anything. Paid Studio plans start at $79/mo and cancel anytime. For
                        Analytics plans, book a demo and we&apos;ll walk you through everything
                        live before you commit.
                      </>
                    ),
                  },
                  {
                    q: "I'm spending under $5k/mo on ads - is HypeOn worth it for me?",
                    a: (
                      <>
                        If you&apos;re at that stage, start on Studio Starter for free, or Growth
                        at $79/mo. It&apos;ll show you what your competitors are running and
                        generate ads you can launch straight away. Once your ad spend grows and
                        attribution starts getting messy, that&apos;s when Analytics pays for
                        itself many times over.
                      </>
                    ),
                  },
                  {
                    q: "What if I need custom limits, integrations, or dedicated support?",
                    a: (
                      <>
                        Tailored to your needs - custom limits, integrations, and dedicated
                        support. Let&apos;s build a plan that fits. Reach out to our team and
                        we&apos;ll scope something that matches your exact setup, channels, and
                        team size.
                      </>
                    ),
                  },
                ].map((item, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={item.q} className="border-b border-gray-200 last:border-b-0">
                      <button
                        type="button"
                        className="flex justify-between items-start gap-4 p-[22px] cursor-pointer text-[17px] font-semibold text-gray-900 bg-transparent border-none w-full text-left leading-snug transition-colors duration-150 hover:bg-gray-900/[0.02] focus-visible:outline focus-visible:outline-3 focus-visible:outline-gray-900/20 focus-visible:-outline-offset-[3px]"
                        onClick={() => setOpenFaq((v) => (v === idx ? null : idx))}
                      >
                        <span className="flex-1 min-w-0">{item.q}</span>
                        <span
                          className={`text-xl text-gray-400 shrink-0 mt-0.5 w-7 h-7 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 transform-gpu will-change-transform motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                            isOpen ? "rotate-45 text-gray-900" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden text-[15px] text-gray-600 leading-relaxed transform-gpu will-change-[transform,opacity] motion-safe:transition-[max-height,opacity,transform,padding] motion-safe:duration-[520ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                          isOpen
                            ? "max-h-[520px] pb-[22px] px-[22px] opacity-100 translate-y-0"
                            : "max-h-0 pb-0 px-[22px] opacity-0 -translate-y-1"
                        }`}
                      >
                        {item.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </Reveal>

          {/* StartToday / CTA */}
          <Reveal delayMs={60}>
            <div className="-mt-8 max-sm:-mt-4">
              <StartToday />
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ──────────────────────────────────────────────
   COMPARE INTELLIGENCE TABLE (extracted component)
   ────────────────────────────────────────────── */
function CompareIntelligenceTable({}: { analyticsTier?: unknown }) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Compare Studio Plans</h2>
        <p className="text-gray-600 text-base mt-2">Every feature, side by side</p>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse">
          <thead>
            <tr>
              <th className="p-[18px_16px] text-sm sm:text-base font-bold text-left pl-6 border-b border-gray-200 bg-gray-100 text-gray-900 w-[34%]" />
              {STUDIO_PLANS.map((plan) => (
                <th
                  key={plan.key}
                  className={`p-[18px_16px] text-sm sm:text-base font-bold text-center border-b border-gray-200 text-gray-900 border-l border-gray-200/80 ${
                    plan.key === "PRO" ? "bg-blue-50/60" : "bg-gray-100"
                  }`}
                >
                  {plan.name}
                  <br />
                  <span className="font-normal text-gray-400 text-xs">
                    {plan.monthly === 0 ? "Free" : `${usd(plan.monthly)}/mo`}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SectionRow label="Workspace" cols={5} />
            <CompareRow feature="Brands" vals={["1", "3", "10", "Unlimited"]} highlight={2} />
            <CompareRow feature="Seats" vals={["1", "3", "10", "Unlimited"]} highlight={2} />
            <CompareRow
              feature="Credits per month"
              tooltip="Static ad ~50 · Video / UGC ~150-200 · Deep-dive ~100"
              vals={["100", "2,000", "6,000", "20,000"]}
              highlight={2}
            />
            <CompareRow feature="Credit rollover" vals={["1 month", "1 month", "1 month", "1 month"]} highlight={2} />
            <CompareRow feature="Credit top-ups" vals={["$19 / 500", "$19 / 500", "$19 / 500", "Custom"]} highlight={2} />

            <SectionRow label="Create" cols={5} />
            <CompareRow feature="Website analysis + brand setup" vals={["✓", "✓", "✓", "✓"]} highlight={2} />
            <CompareRow feature="Static ad generation" vals={["✓", "✓", "✓", "✓"]} highlight={2} />
            <CompareRow feature="Video + UGC generation" vals={["-", "✓", "✓", "✓"]} highlight={2} />
            <CompareRow
              feature="Auto-launch to ad channels"
              tooltip="Meta, Google, Pinterest, TikTok"
              vals={["-", "✓", "✓", "✓"]}
              highlight={2}
            />
            <CompareRow feature="Auto-scaling budget" vals={["-", "-", "✓", "✓"]} highlight={2} />

            <SectionRow label="Research" cols={5} />
            <CompareRow feature="Competitor ad search + Hype Score" vals={["✓", "✓", "✓", "✓"]} highlight={2} />
            <CompareRow feature="Competitor ad library" vals={["-", "✓", "✓", "✓"]} highlight={2} />
            <CompareRow
              feature="Competitor deep-dive reports / month"
              tooltip="Extra reports: 10 credits each on paid plans"
              vals={["-", "15", "40", "Unlimited"]}
              highlight={2}
            />

            <SectionRow label="Integrations & support" cols={5} />
            <CompareRow feature="Integrations (Shopify, Slack)" vals={["-", "-", "✓", "✓"]} highlight={2} />
            <CompareRow feature="Support" vals={["Email", "Email", "Priority", "Priority + onboarding"]} highlight={2} />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CompareAnalyticsTable({
  analyticsTier,
}: {
  analyticsTier: { starter: number; growth: number; pro: number | "Custom" };
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Compare Analytics <span className="text-[#696863]">Plans</span></h2>
        <p className="text-gray-600 text-base mt-2">Every feature, side by side</p>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr>
              <th className="p-[18px_16px] text-sm sm:text-base font-bold text-left pl-6 border-b border-gray-200 bg-gray-100 text-gray-900 w-[40%]" />
              <th className="p-[18px_16px] text-sm sm:text-base font-bold text-center border-b border-gray-200 bg-gray-100 text-gray-900 border-l border-gray-200/80">
                Starter
                <br />
                <span className="font-normal text-gray-400 text-xs">
                  ${analyticsTier.starter}/mo
                </span>
              </th>
              <th className="p-[18px_16px] text-sm sm:text-base font-bold text-center border-b border-gray-200 bg-blue-50/60 text-gray-900 border-l border-gray-200/80">
                Growth
                <br />
                <span className="font-normal text-gray-400 text-xs">
                  ${analyticsTier.growth}/mo
                </span>
              </th>
              <th className="p-[18px_16px] text-sm sm:text-base font-bold text-center border-b border-gray-200 bg-gray-100 text-gray-900 border-l border-gray-200/80">
                Enterprise
                <br />
                <span className="font-normal text-gray-400 text-xs">
                  {typeof analyticsTier.pro === "string"
                    ? analyticsTier.pro
                    : `$${analyticsTier.pro}/mo`}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <SectionRow label="Attribution & True ROAS" />
            <CompareRow
              feature="Cross-channel ROAS (deduplicated)"
              tooltip="Real return across every channel, zero double-counting"
              vals={["✓", "✓", "✓"]}
            />
            <CompareRow
              feature="True CPA per channel"
              tooltip="Real cost-per-sale side by side"
              vals={["✓", "✓", "✓"]}
            />
            <CompareRow feature="Ad channels tracked" vals={["2", "5", "Unlimited"]} />
            <CompareRow feature="First-party server-side tracking" vals={["-", "✓", "✓"]} />
            <CompareRow feature="Multi-touch attribution model" vals={["-", "✓", "✓"]} />
            <CompareRow feature="Custom attribution windows" vals={["-", "-", "✓"]} />

            <SectionRow label="Budget Optimization" />
            <CompareRow
              feature="Budget reallocation signals"
              tooltip="Which channels to scale, hold, or cut"
              vals={["Weekly", "Daily", "Real-time"]}
            />
            <CompareRow
              feature="Campaign-level Scale / Hold / Cut signals"
              vals={["-", "✓", "✓"]}
            />
            <CompareRow
              feature="Wasted ad spend detector"
              vals={["Summary", "Per campaign", "Per ad + alerts"]}
            />
            <CompareRow feature="AI-powered budget optimizer" vals={["-", "-", "✓"]} />

            <SectionRow label="Reporting & Data" />
            <CompareRow feature="Executive dashboard" vals={["✓", "✓", "✓"]} />
            <CompareRow feature="Channel performance breakdown" vals={["✓", "✓", "✓"]} />
            <CompareRow feature="Custom dashboards" vals={["-", "3", "Unlimited"]} />
            <CompareRow feature="Scheduled email reports" vals={["-", "✓", "✓"]} />
            <CompareRow feature="Slack / Teams alerts" vals={["-", "✓", "✓"]} />
            <CompareRow
              feature="Historical data retention"
              vals={["90 days", "12 months", "Unlimited"]}
            />

            <SectionRow label="Integrations & Connectors" />
            <CompareRow feature="Shopify / WooCommerce / BigCommerce" vals={["✓", "✓", "✓"]} />
            <CompareRow feature="Meta Ads" vals={["✓", "✓", "✓"]} />
            <CompareRow feature="Google Ads" vals={["✓", "✓", "✓"]} />
            <CompareRow feature="TikTok Ads" vals={["-", "✓", "✓"]} />
            <CompareRow feature="Pinterest / Snapchat / Amazon Ads" vals={["-", "-", "✓"]} />
            <CompareRow feature="Google Analytics 4" vals={["✓", "✓", "✓"]} />
            <CompareRow feature="Klaviyo / email platforms" vals={["-", "✓", "✓"]} />
            <CompareRow
              feature="Data warehouse export (BigQuery, Snowflake)"
              vals={["-", "-", "✓"]}
            />
            <CompareRow feature="API access" vals={["-", "-", "✓"]} />

            <SectionRow label="Platform & Support" />
            <CompareRow feature="Users" vals={["2", "5", "Unlimited"]} />
            <CompareRow feature="Support" vals={["Email", "Priority chat", "Dedicated manager"]} />
            <CompareRow
              feature="Onboarding & pixel setup"
              vals={["Self-serve docs", "Guided setup call", "Done-for-you setup"]}
            />
            <CompareRow feature="SLA & uptime guarantee" vals={["-", "-", "✓"]} />
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SHARED TABLE COMPONENTS
   ────────────────────────────────────────────── */
function SectionRow({ label, cols = 4 }: { label: string; cols?: number }) {
  return (
    <tr>
      <td
        colSpan={cols}
        className="bg-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500 py-3 px-6 border-b border-gray-200"
      >
        {label}
      </td>
    </tr>
  );
}

function CompareRow({
  feature,
  tooltip,
  vals,
  highlight = 1,
}: {
  feature: string;
  tooltip?: string;
  vals: string[];
  /** Index of the column drawn as the recommended plan. */
  highlight?: number;
}) {
  const cellStyle = (val: string, isHighlight: boolean) => {
    const base = `py-3 px-4 text-xs sm:text-base text-center border-b border-gray-200 border-l border-gray-200/80 ${
      isHighlight ? "bg-blue-50/40" : ""
    }`;
    if (val === "✓") return `${base} text-emerald-500 font-bold`;
    if (val === "-") return `${base} text-gray-300 text-sm`;
    return `${base} text-xs font-bold text-gray-900`;
  };

  return (
    <tr className="group hover:bg-gray-900/[0.02]">
      <td className="py-3 px-4 pl-6 text-left text-gray-900 font-medium text-sm sm:text-base border-b border-gray-200">
        {feature}
        {tooltip && (
          <span className="block text-xs text-gray-400 font-normal mt-0.5">{tooltip}</span>
        )}
      </td>
      {vals.map((val, i) => (
        <td key={i} className={cellStyle(val, i === highlight)}>
          {val}
        </td>
      ))}
    </tr>
  );
}