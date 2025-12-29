"use client";

import { useState } from "react";
import Link from "next/link";


const COUNTRY_CODES = [
  { code: "+93", label: "AF", flag: "🇦🇫" },
  { code: "+355", label: "AL", flag: "🇦🇱" },
  { code: "+213", label: "DZ", flag: "🇩🇿" },
  { code: "+376", label: "AD", flag: "🇦🇩" },
  { code: "+244", label: "AO", flag: "🇦🇴" },
  { code: "+54", label: "AR", flag: "🇦🇷" },
  { code: "+374", label: "AM", flag: "🇦🇲" },
  { code: "+61", label: "AU", flag: "🇦🇺" },
  { code: "+43", label: "AT", flag: "🇦🇹" },
  { code: "+994", label: "AZ", flag: "🇦🇿" },
  { code: "+973", label: "BH", flag: "🇧🇭" },
  { code: "+880", label: "BD", flag: "🇧🇩" },
  { code: "+32", label: "BE", flag: "🇧🇪" },
  { code: "+55", label: "BR", flag: "🇧🇷" },
  { code: "+1", label: "US", flag: "🇺🇸" },
  { code: "+1", label: "CA", flag: "🇨🇦" },
  { code: "+86", label: "CN", flag: "🇨🇳" },
  { code: "+45", label: "DK", flag: "🇩🇰" },
  { code: "+20", label: "EG", flag: "🇪🇬" },
  { code: "+33", label: "FR", flag: "🇫🇷" },
  { code: "+49", label: "DE", flag: "🇩🇪" },
  { code: "+91", label: "IN", flag: "🇮🇳" },
  { code: "+62", label: "ID", flag: "🇮🇩" },
  { code: "+98", label: "IR", flag: "🇮🇷" },
  { code: "+964", label: "IQ", flag: "🇮🇶" },
  { code: "+353", label: "IE", flag: "🇮🇪" },
  { code: "+972", label: "IL", flag: "🇮🇱" },
  { code: "+39", label: "IT", flag: "🇮🇹" },
  { code: "+81", label: "JP", flag: "🇯🇵" },
  { code: "+254", label: "KE", flag: "🇰🇪" },
  { code: "+965", label: "KW", flag: "🇰🇼" },
  { code: "+60", label: "MY", flag: "🇲🇾" },
  { code: "+52", label: "MX", flag: "🇲🇽" },
  { code: "+977", label: "NP", flag: "🇳🇵" },
  { code: "+31", label: "NL", flag: "🇳🇱" },
  { code: "+64", label: "NZ", flag: "🇳🇿" },
  { code: "+234", label: "NG", flag: "🇳🇬" },
  { code: "+47", label: "NO", flag: "🇳🇴" },
  { code: "+92", label: "PK", flag: "🇵🇰" },
  { code: "+63", label: "PH", flag: "🇵🇭" },
  { code: "+48", label: "PL", flag: "🇵🇱" },
  { code: "+351", label: "PT", flag: "🇵🇹" },
  { code: "+7", label: "RU", flag: "🇷🇺" },
  { code: "+966", label: "SA", flag: "🇸🇦" },
  { code: "+65", label: "SG", flag: "🇸🇬" },
  { code: "+27", label: "ZA", flag: "🇿🇦" },
  { code: "+82", label: "KR", flag: "🇰🇷" },
  { code: "+34", label: "ES", flag: "🇪🇸" },
  { code: "+94", label: "LK", flag: "🇱🇰" },
  { code: "+46", label: "SE", flag: "🇸🇪" },
  { code: "+41", label: "CH", flag: "🇨🇭" },
  { code: "+66", label: "TH", flag: "🇹🇭" },
  { code: "+90", label: "TR", flag: "🇹🇷" },
  { code: "+971", label: "AE", flag: "🇦🇪" },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+84", label: "VN", flag: "🇻🇳" },
];


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
      }, 1800);
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
            Built for Shopify founders, TikTok sellers, and performance marketers
            who are tired of guessing what to launch next.
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
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

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

              {/* PHONE */}
              <div className="flex items-center gap-2">
                <select
                  name="countryCode"
                  defaultValue="+91"
                  className="h-[42px] w-[90px] rounded-lg border px-2 text-sm bg-white focus:border-brand-600 focus:outline-none"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={`${c.label}-${c.code}`} value={c.code}>
                      {c.label} {c.code}
                    </option>
                  ))}
                </select>

                <input
                  name="contactNumber"
                  placeholder="Phone number"
                  className="flex-1 h-[42px] rounded-lg border px-4 text-sm focus:border-brand-600 focus:outline-none"
                />
              </div>

              <textarea
                name="message"
                rows={3}
                placeholder="Message (optional)"
                className="w-full rounded-lg border px-4 py-2.5 text-sm focus:border-brand-600 focus:outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-brand-600 py-3 text-sm font-medium text-white hover:shadow-lg disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Request Beta Access"}
              </button>
            </form>

            {success && (
              <p className="mt-4 text-center text-sm text-green-600">
                 Request submitted successfully!
              </p>
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
