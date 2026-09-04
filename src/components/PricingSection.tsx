'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import PromoCountdown from '@/components/PromoCountdown';

/* ============================================================
   "Simple pricing. Scale as you grow." - 4 plan cards on a light
   gray section: name, price, credits/mo, CTA, then a checklist of
   what's included (with "Everything in X plus..." carried forward
   from the tier below). A Monthly/Annual pill toggle above the
   cards swaps price + billing note.
============================================================ */

/* The Growth launch offer, kept in step with /pricing (src/app/pricing/page.tsx):
   first month at `offerPrice`, offered until `endsAt` (UTC). The app enforces the
   same deadline server-side; this section only announces it and withdraws it on
   its own once the clock passes. It is a first-month price, so it is shown on the
   monthly cycle only. */
const STUDIO_PLANS_URL = 'https://app.hypeon.ai/studio/plans';

const GROWTH_OFFER = {
  planName: 'Growth',
  offerPrice: '$7.90',
  endsAt: '2026-09-06T11:00:00Z',
};

type BillingCycle = 'monthly' | 'annual';

type Plan = {
  name: string;
  isFree?: boolean;
  monthlyPrice: string;
  annualPrice: string;
  note?: string;
  credits: string;
  cta: string;
  badge?: string;
  featuresIntro?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: 'Starter',
    isFree: true,
    monthlyPrice: 'Free',
    annualPrice: 'Free',
    note: 'No card required',
    credits: '100 credits / mo',
    cta: 'Start free',
    features: [
      '1 brand, 1 seat',
      'Unlimited competitor ad search + Hype Score',
      'Static ad generation',
      'Video + UGC generation',
      'Auto-launch to ad channels (Meta, Google, Pinterest, TikTok)',
      'Competitor deep-dive reports',
      'Auto-scaling budget',
      'Integrations (Shopify, Slack)',
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: '$79',
    annualPrice: '$63',
    credits: '2,000 credits / mo',
    cta: 'Choose Growth',
    badge: 'Most brands pick this',
    featuresIntro: 'Everything in Starter plus...',
    features: [
      '3 brands, 3 seats',
      'Unlimited competitor ad search + Hype Score',
      'Static ad generation',
      'Video + UGC generation',
      'Auto-launch to ad channels (Meta, Google, Pinterest, TikTok)',
      '15 competitor deep-dive reports / mo',
      'Auto-scaling budget',
      'Integrations (Shopify, Slack)',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: '$199',
    annualPrice: '$159',
    credits: '6,000 credits / mo',
    cta: 'Choose Pro',
    featuresIntro: 'Everything in Growth plus...',
    features: [
      '10 brands, 10 seats',
      'Unlimited competitor ad search + Hype Score',
      'Static ad generation',
      'Video + UGC generation',
      'Auto-launch to ad channels (Meta, Google, Pinterest, TikTok)',
      '40 competitor deep-dive reports / mo',
      'Auto-scaling budget',
      'Integrations (Shopify, Slack)',
    ],
  },
  {
    name: 'Scale',
    monthlyPrice: '$499',
    annualPrice: '$399',
    credits: '20,000 credits / mo',
    cta: 'Choose Scale',
    featuresIntro: 'Everything in Pro plus...',
    features: [
      'Unlimited brands and seats',
      'Unlimited competitor ad search + Hype Score',
      'Static ad generation',
      'Video + UGC generation',
      'Auto-launch to ad channels (Meta, Google, Pinterest, TikTok)',
      'Unlimited competitor deep-dive reports',
      'Auto-scaling budget',
      'Integrations (Shopify, Slack)',
      'Priority support + onboarding',
      'Custom credit top-ups',
    ],
  },
];

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="relative inline-flex items-center rounded-full border border-white/40 bg-white/30 p-1 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      {(['monthly', 'annual'] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`relative z-10 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${cycle === c ? 'text-white' : 'text-neutral-500 hover:text-neutral-700'
            }`}
        >
          {cycle === c && (
            <motion.span
              layoutId="billing-toggle-pill"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className="absolute inset-0 -z-10 rounded-full bg-black/85 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.5)] ring-1 ring-white/10 backdrop-blur-md"
            />
          )}
          {c === 'monthly' ? 'Monthly pricing' : 'Annual pricing'}
        </button>
      ))}
    </div>
  );
}

function PlanCard({
  plan,
  index,
  cycle,
  offerLive,
  onOfferExpire,
}: {
  plan: Plan;
  index: number;
  cycle: BillingCycle;
  offerLive: boolean;
  onOfferExpire: () => void;
}) {
  const price = cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  const period = plan.isFree
    ? undefined
    : cycle === 'annual'
      ? 'per month, billed yearly'
      : 'per month';

  // The offer buys the first month, so it does not apply to annual billing.
  const offer =
    offerLive && cycle === 'monthly' && plan.name === GROWTH_OFFER.planName ? GROWTH_OFFER : null;
  const ctaLabel = offer ? `Get Growth for ${offer.offerPrice}` : plan.cta;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-2xl border bg-white p-6 ${offer || plan.badge ? 'border-black' : 'border-neutral-200'
        }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-6 rounded-full bg-black px-3 py-1 text-[11px] font-semibold text-white">
          {plan.badge}
        </span>
      )}

      <div className={offerLive && cycle === 'monthly' ? 'min-h-[188px]' : 'min-h-[132px]'}>
        <p className="text-sm font-medium text-neutral-500">{plan.name}</p>

        {offer ? (
          <>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight text-black">{offer.offerPrice}</span>
              <s className="text-xl font-semibold text-neutral-400">{plan.monthlyPrice}</s>
              <span className="text-sm font-medium text-neutral-400">first month</span>
            </div>

            <p className="mt-1 text-xs text-neutral-400">
              then {plan.monthlyPrice} / month · cancel anytime
            </p>
            <p className="mt-1 text-sm text-neutral-500">{plan.credits}</p>
            <PromoCountdown endsAt={offer.endsAt} onExpire={onOfferExpire} className="mt-3" />
          </>
        ) : (
          <>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight text-black">{price}</span>
              {period && <span className="text-base font-medium text-neutral-400">{period}</span>}
            </div>

            <p className="mt-1 text-xs text-neutral-400">
              {plan.note ?? ' '}
            </p>
            <p className="mt-1 text-sm text-neutral-500">{plan.credits}</p>
          </>
        )}
      </div>

      <a
        href={STUDIO_PLANS_URL}
        className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] to-[#0a0a0c] px-5 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-shadow duration-200 ease-out hover:from-[#333333] hover:to-[#141414] hover:shadow-[0_12px_26px_-8px_rgba(0,0,0,0.65)]"
      >
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-gradient-to-b from-white/20 to-transparent" />
        <span className="relative inline-block h-[1.2em] overflow-hidden align-top">
          <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">{ctaLabel}</span>
          <span aria-hidden className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full">{ctaLabel}</span>
        </span>
      </a>

      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-neutral-400">Features</p>
      {plan.featuresIntro && (
        <p className="mt-2 text-sm italic text-neutral-500">{plan.featuresIntro}</p>
      )}

      <ul className="mt-3 flex flex-col gap-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-black" strokeWidth={2.2} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  // `true` on the server and on the first client render so hydration agrees; the
  // effect withdraws the offer when the deadline has already passed, and the
  // countdown withdraws it the second it reaches zero.
  const [offerLive, setOfferLive] = useState(true);
  useEffect(() => {
    if (Date.now() >= Date.parse(GROWTH_OFFER.endsAt)) setOfferLive(false);
  }, []);

  return (
    <section id="pricing" className="scroll-mt-24 rounded-t-[28px] bg-neutral-100 pb-8 pt-16 sm:rounded-t-[56px] sm:pb-10 sm:pt-24 lg:pb-12 lg:pt-28">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Simple pricing. Scale as you grow.
          </h2>
          <p className="mt-3 text-sm text-neutral-500 sm:text-base">
            Pick the plan that fits your team. Upgrade or downgrade anytime.
          </p>

          <div className="mt-6 flex justify-center">
            <BillingToggle cycle={cycle} onChange={setCycle} />
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              index={i}
              cycle={cycle}
              offerLive={offerLive}
              onOfferExpire={() => setOfferLive(false)}
            />
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs text-neutral-400">
          Monthly billing · Cancel anytime
        </p>
      </div>
    </section>
  );
}
