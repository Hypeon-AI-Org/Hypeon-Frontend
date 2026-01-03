"use client";

import { useState } from "react";
import { useContactModal } from "@/context/ContactModalContext";

type FormType = "beta" | "partner" | "invest";

/* ================= COMPONENT ================= */
export default function AboutCTA() {
  const { open, formType, openForm, closeForm } = useContactModal();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const payload = {
      type: formType,
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value,
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
      company:
        (form.elements.namedItem("company") as HTMLInputElement)?.value || "",
      website:
        (form.elements.namedItem("website") as HTMLInputElement)?.value || "",
      partnershipType:
        (form.elements.namedItem("partnershipType") as HTMLSelectElement)
          ?.value || "",
      investorType:
        (form.elements.namedItem("investorType") as HTMLSelectElement)?.value ||
        "",
      firm:
        (form.elements.namedItem("firm") as HTMLInputElement)?.value || "",
      linkedin:
        (form.elements.namedItem("linkedin") as HTMLInputElement)?.value || "",
      message:
        (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      form.reset();

      setTimeout(() => {
        setSuccess(false);
        closeForm();
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
            Build with <span className="text-brand-600">HypeOn AI</span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            Founders, partners, and investors — let’s connect.
          </p>

          <div className="mt-12 flex justify-center gap-5 flex-wrap">
            <button
              onClick={() => openForm("beta")}
              className="rounded-xl bg-brand-600 px-8 py-3 text-white text-sm font-medium"
            >
              Contact Us
            </button>

            <button
              onClick={() => openForm("partner")}
              className="rounded-xl border px-8 py-3 text-sm"
            >
              Partner with us
            </button>

            <button
              onClick={() => openForm("invest")}
              className="rounded-xl border px-8 py-3 text-sm"
            >
              Invest early
            </button>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={closeForm}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
          >
            {!success && (
              <button
                onClick={closeForm}
                className="absolute right-4 top-4 text-slate-400"
              >
                ✕
              </button>
            )}

            {success ? (
              <div className="flex flex-col items-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
                  ✓
                </div>
                <p className="mt-4 text-lg font-semibold">
                  Request Submitted!
                </p>
                <p className="text-sm text-slate-500">
                  We’ll reach out shortly.
                </p>
              </div>
            ) : (
              <>
                {/* ===== HEADINGS ===== */}
                {formType === "beta" && (
                  <>
                    <h3 className="text-2xl font-semibold">Contact Us</h3>
                    <p className="text-sm text-slate-500">
                      Get early access before public launch
                    </p>
                  </>
                )}

                {formType === "partner" && (
                  <>
                    <h3 className="text-2xl font-semibold">
                      Partner with HypeOn AI
                    </h3>
                    <p className="text-sm text-slate-500">
                      Share a few details and we’ll get back to you
                    </p>
                  </>
                )}

                {formType === "invest" && (
                  <>
                    <h3 className="text-2xl font-semibold">Invest Early</h3>
                    <p className="text-sm text-slate-500">
                      Early conversations with aligned investors
                    </p>
                  </>
                )}

                {/* ===== FORM ===== */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <input
                    name="name"
                    required
                    placeholder="Full name"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm"
                  />

                  {formType === "partner" && (
                    <>
                      <input
                        name="company"
                        required
                        placeholder="Company name"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm"
                      />
                      <input
                        name="website"
                        placeholder="Company website"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm"
                      />
                      <select
                        name="partnershipType"
                        required
                        className="w-full rounded-lg border px-4 py-2.5 text-sm bg-white"
                      >
                        <option value="">
                          What type of partnership are you exploring?
                        </option>
                        <option>Distribution / Reseller</option>
                        <option>Data or API partnership</option>
                        <option>Agency / Client delivery</option>
                        <option>Strategic / Ecosystem</option>
                        <option>Not sure yet</option>
                      </select>
                    </>
                  )}

                  {formType === "invest" && (
                    <>
                      <select
                        name="investorType"
                        required
                        className="w-full rounded-lg border px-4 py-2.5 text-sm bg-white"
                      >
                        <option value="">Investor type</option>
                        <option>Angel</option>
                        <option>VC / Micro-VC</option>
                        <option>Operator / Founder</option>
                        <option>Family office</option>
                        <option>Other</option>
                      </select>

                      <input
                        name="firm"
                        placeholder="Firm name"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm"
                      />

                      <input
                        name="linkedin"
                        placeholder="LinkedIn or website"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm"
                      />
                    </>
                  )}

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full rounded-lg border px-4 py-2.5 text-sm"
                  />

                  <textarea
                    name="message"
                    rows={2}
                    placeholder={
                      formType === "partner"
                        ? "What’s the main value you see in partnering with HypeOn AI? (Optional)"
                        : formType === "invest"
                        ? "Anything you’d like us to know?"
                        : "Message (optional)"
                    }
                    className="w-full rounded-lg border px-4 py-2.5 text-sm"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-brand-600 py-3 text-sm font-medium text-white disabled:opacity-60"
                  >
                    {loading
                      ? "Submitting..."
                      : formType === "partner"
                      ? "Let’s explore partnership"
                      : formType === "invest"
                      ? "Start the conversation"
                      : "Submit"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
