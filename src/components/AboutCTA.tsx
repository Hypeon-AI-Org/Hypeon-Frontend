"use client";

import { useState } from "react";
import Link from "next/link";

/* ================= COUNTRY CODES ================= */
const COUNTRY_CODES = [
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+971", label: "AE", flag: "🇦🇪" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
];

/* ================= COMPONENT ================= */
export default function AboutCTA() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      contact: `${
        (form.elements.namedItem("countryCode") as HTMLSelectElement).value
      } ${(form.elements.namedItem("contactNumber") as HTMLInputElement).value}`,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      form.reset();

      setTimeout(() => {
        setOpen(false);
        setSuccess(false);
      }, 1500);
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* ================= CTA ================= */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-indigo-50" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display text-slate-900">
            Join our <span className="text-brand-600">beta program</span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            Built for founders & performance marketers who want certainty
            before they scale.
          </p>

          <div className="mt-12 flex justify-center gap-5 flex-wrap">
            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-brand-600 px-8 py-3 text-white text-sm font-medium hover:scale-105 transition"
            >
              Join our beta
            </button>

            <Link
              href="/partner"
              className="rounded-xl border px-8 py-3 text-sm text-slate-700 hover:bg-slate-50"
            >
              Partner with us
            </Link>

            <Link
              href="/invest"
              className="rounded-xl border px-8 py-3 text-sm text-slate-500 hover:text-slate-700"
            >
              Invest early
            </Link>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-[scaleIn_.25s_ease]"
          >
            {!success && (
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}

            {/* ===== SUCCESS STATE ===== */}
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="h-9 w-9 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <p className="mt-4 text-lg font-semibold text-slate-900">
                  Request Submitted!
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  We’ll reach out shortly 
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Join Beta Program
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Get early access before public launch
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    name="name"
                    placeholder="Full Name"
                    required
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
                  />

                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full rounded-lg border px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
                  />

                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      defaultValue="+91"
                      className="h-[42px] w-[90px] rounded-lg border px-2 text-sm bg-white"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={c.label} value={c.code}>
                          {c.label} {c.code}
                        </option>
                      ))}
                    </select>

                    <input
                      name="contactNumber"
                      placeholder="Phone number"
                      className="flex-1 h-[42px] rounded-lg border px-4 text-sm"
                    />
                  </div>

                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Message (optional)"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-brand-600 py-3 text-sm font-medium text-white disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Request Beta Access"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
