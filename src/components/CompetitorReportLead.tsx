'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Loader2, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const SUCCESS_MESSAGE_HIDE_MS = 5000;

const badges = [
  'No credit card to start',
  'Export to PDF/CSV',
  'Works for any vertical',
] as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export default function CompetitorReportLead() {
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (submitState !== 'success') return;
    const id = window.setTimeout(() => {
      setSubmitState('idle');
    }, SUCCESS_MESSAGE_HIDE_MS);
    return () => window.clearTimeout(id);
  }, [submitState]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitState('loading');
    setErrorMessage('');
    try {
      const res = await fetch('/api/competitor-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ website: website.trim(), email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setSubmitState('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        return;
      }
      setSubmitState('success');
      setWebsite('');
      setEmail('');
    } catch {
      setSubmitState('error');
      setErrorMessage('Network error. Please try again.');
    }
  }

  const orbTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 10, repeat: Infinity, repeatType: 'reverse' as const, ease: 'easeInOut' };

  return (
    <section className="relative overflow-hidden bg-[oklch(0.988_0.0041_91.45)] pt-10 pb-8 font-sans text-black sm:pt-16 sm:pb-12 lg:pt-24 lg:pb-16">
      {/* Ambient layers */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_0%_0%,rgba(15,23,42,0.05),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(51,230,122,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[linear-gradient(to_right,rgba(148,163,184,0.09)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.09)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
        aria-hidden
      />

      {/* Soft animated orb */}
      <motion.div
        className="pointer-events-none absolute -right-28 top-1/4 h-56 w-56 rounded-full bg-gradient-to-br from-emerald-200/30 via-slate-200/20 to-violet-200/25 blur-3xl sm:-right-24 sm:h-72 sm:w-72"
        aria-hidden
        animate={
          reduceMotion
            ? {}
            : { scale: [1, 1.08, 1], opacity: [0.45, 0.65, 0.45] }
        }
        transition={orbTransition}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16 xl:gap-20">
          {/* Copy — centered on mobile, left-aligned on desktop */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2">
              <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 shadow-sm backdrop-blur-sm sm:text-xs sm:tracking-[0.2em]">
                <Sparkles className="h-3.5 w-3.5 text-brand-600" strokeWidth={2} aria-hidden />
                Competitor report
              </span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-[1.9rem] font-bold leading-[1.1] tracking-tighter text-black sm:text-4xl md:text-5xl md:leading-[1.06]"
            >
              Get a{' '}
              <span className="bg-gradient-to-r from-brand-600 to-brand-600/80 bg-clip-text text-transparent">
                competitor report
              </span>{' '}
              in minutes
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl px-1 text-[15px] leading-relaxed text-neutral-600 sm:mt-6 sm:px-0 sm:text-lg lg:mx-0"
            >
              Paste a competitor website, and get a shareable deck for your team in
              email. Complete with real ad data – creative angles, spend signals,
              and timelines.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              className="mx-auto mt-6 flex max-w-[min(100%,40rem)] flex-wrap justify-center gap-2 px-1 py-1 sm:mt-8 sm:flex-nowrap sm:justify-center sm:gap-2.5 sm:overflow-x-auto sm:px-0 sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] lg:mx-0 lg:justify-start [&::-webkit-scrollbar]:hidden"
              role="list"
            >
              {badges.map((label, i) => (
                <motion.li
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: easeOut }}
                  whileHover={reduceMotion ? undefined : { y: -2, transition: { duration: 0.2 } }}
                  className="inline-flex shrink-0 cursor-default items-center gap-2 whitespace-nowrap rounded-full border border-neutral-200/90 bg-white/90 px-3 py-2 text-xs font-medium text-neutral-800 shadow-sm ring-1 ring-black/[0.04] backdrop-blur-sm sm:px-3.5 sm:text-[13px]"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_rgba(22,163,74,0.12)] ${reduceMotion ? '' : 'motion-safe:animate-pulse'}`}
                    aria-hidden
                  />
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: easeOut, delay: 0.08 }}
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:mx-0 lg:max-w-none"
          >
            <div
              className="absolute -inset-[1px] rounded-[1.15rem] bg-gradient-to-br from-emerald-500/25 via-slate-300/20 to-violet-500/20 opacity-80 blur-[2px]"
              aria-hidden
            />
            <div className="relative rounded-2xl border border-neutral-200/90 bg-white px-4 pb-3 pt-4 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] sm:px-8 sm:pb-5 sm:pt-8">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 sm:gap-5"
              >
                <label className="sr-only" htmlFor="competitor-url">
                  Competitor website
                </label>
                <div className="group flex min-h-[52px] items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-black/[0.07]">
                  <Globe
                    className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-600"
                    strokeWidth={1.35}
                    aria-hidden
                  />
                  <input
                    id="competitor-url"
                    type="url"
                    name="website"
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value);
                      if (submitState !== 'idle' && submitState !== 'loading') {
                        setSubmitState('idle');
                        setErrorMessage('');
                      }
                    }}
                    placeholder="Paste your competitor website"
                    className="min-w-0 flex-1 bg-transparent text-[15px] leading-normal text-slate-900 placeholder:text-neutral-400 outline-none sm:text-base"
                    autoComplete="url"
                  />
                </div>

                <label className="sr-only" htmlFor="company-email">
                  Company email
                </label>
                <div className="group flex min-h-[52px] items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:border-neutral-300 hover:shadow-md focus-within:border-neutral-400 focus-within:ring-2 focus-within:ring-black/[0.07]">
                  <Mail
                    className="h-5 w-5 shrink-0 text-neutral-400 transition-colors group-focus-within:text-neutral-600"
                    strokeWidth={1.35}
                    aria-hidden
                  />
                  <input
                    id="company-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (submitState !== 'idle' && submitState !== 'loading') {
                        setSubmitState('idle');
                        setErrorMessage('');
                      }
                    }}
                    placeholder="Your company email"
                    className="min-w-0 flex-1 bg-transparent text-[15px] leading-normal text-slate-900 placeholder:text-neutral-400 outline-none sm:text-base"
                    autoComplete="email"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitState === 'loading'}
                  aria-busy={submitState === 'loading'}
                  whileHover={reduceMotion || submitState === 'loading' ? undefined : { scale: 1.02 }}
                  whileTap={reduceMotion || submitState === 'loading' ? undefined : { scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="group relative mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-black px-8 py-3.5 text-[15px] font-medium text-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] disabled:cursor-not-allowed disabled:opacity-90 sm:mt-5"
                >
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%)',
                    }}
                  />
                  {submitState === 'loading' ? (
                    <>
                      <Loader2
                        className="relative h-5 w-5 shrink-0 motion-safe:animate-spin motion-reduce:opacity-80"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="relative">Generating report…</span>
                    </>
                  ) : (
                    <>
                    
                      <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white text-black transition-all duration-500 ease-in-out">
    <ArrowRight className="w-4 h-4" />
  </div>  <span className="relative">Get Free Report</span>
                    </>
                  )}
                </motion.button>
                <p
                  className="text-center text-sm min-h-[1.25rem]"
                  aria-live="polite"
                  role="status"
                >
                  {submitState === 'success' && (
                    <span className="font-medium text-brand-600">
                      Check your inbox — we’ve sent your report details.
                    </span>
                  )}
                  {submitState === 'error' && errorMessage && (
                    <span className="font-medium text-red-600">{errorMessage}</span>
                  )}
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-8 text-center text-sm text-neutral-500 sm:mt-10 lg:mt-12"
        >
          <motion.a
            href="https://calendly.com/yash-hypeon/30min?month=2026-03"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reduceMotion ? undefined : { y: -1 }}
            className="group inline-flex items-center gap-1.5 font-medium transition-colors hover:text-black"
          >
            Talk to sales
            <span
              aria-hidden
              className="inline-block text-neutral-400 transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </motion.a>
        </motion.p>
      </div>
    </section>
  );
}
