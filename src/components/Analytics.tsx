"use client";
import { useEffect } from "react";
import Image from "next/image";

export default function Products() {

  useEffect(() => {
    const wrap = document.querySelector(".stats-counters-wrap");
    if (!wrap) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        const counters = wrap.querySelectorAll<HTMLElement>(".counter");
        counters.forEach((counter) => {
          const firstChild = counter.childNodes[0];
          if (firstChild) firstChild.nodeValue = "0";

          const updateCount = () => {
            const targetAttr = counter.getAttribute("data-target");
            if (targetAttr == null) return;

            const target = +targetAttr;
            const count = +counter.innerText.replace(/\D/g, "");
            const increment = target / 200;
            const node = counter.childNodes[0];

            if (count < target && node) {
              node.nodeValue = String(Math.ceil(count + increment));
              setTimeout(updateCount, 10);
            } else if (node) {
              node.nodeValue = String(target);
            }
          };

          updateCount();
        });

        observer.unobserve(wrap);
      },
      { threshold: 0.2 }
    );

    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-0 lg:min-h-[650px] max-lg:mt-10 lg:mt-0 pt-20 sm:pt-24 md:pt-28 lg:pt-[90px] pb-10 sm:pb-12 md:pb-16 lg:pb-[70px] overflow-hidden bg-[oklch(0.988_0.0041_91.45)] font-sans flex items-center">

      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-0">

        {/* LEFT CONTENT */}
        <div className="reveal-left space-y-3 sm:space-y-4 lg:pr-12 lg:ml-20">

          

          <h2 className="text-3xl sm:text-4xl md:text-4xl tracking-tight text-neutral-900 leading-tight">
            Attribution reporting that <br /> <span className="text-brand-600">shows you the truth.</span>
          </h2>

          <ul className="space-y-2 pt-2">
            {[
              { icon: "target", text: "Set company wide goals" },
              { icon: "schedule", text: "Save hours managing growth at scale" },
              { icon: "show_chart", text: "Get higher ROAS for each advertising dollar" },
              { icon: "dashboard", text: "Everything on a single platform" },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-slate-600 font-semibold text-xs sm:text-sm"
              >
                <span className="material-symbols-outlined text-slate-900 text-lg">
                  {item.icon}
                </span>
                {item.text}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pt-2 sm:pt-4">
            <a href="https://app.hypeon.ai/hub/login" className="bg-black hover:bg-black text-white px-5 py-2.5 sm:py-2 rounded-full text-xs font-bold transition-all shadow-md inline-block min-h-[44px] flex items-center">
              Get the demo
            </a>
          </div>
        </div>

        {/* RIGHT GRID SPACE (desktop) */}
        <div className="hidden lg:block h-1"></div>

        {/* DASHBOARD IMAGE – in flow on mobile/tablet */}
        <div className="lg:hidden w-full max-w-lg mx-auto mt-4 relative z-10">
          <div className="rounded-2xl border border-gray-200 overflow-hidden relative aspect-[800/550]">
            <Image
              src="/images/screen.webp"
              alt="Dashboard Preview"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 0"
            />
          </div>
        </div>
      </div>

      {/* DASHBOARD IMAGE – absolute on desktop */}
      <div className="hidden lg:block absolute bottom-0 right-[-90px] w-[800px] z-0">
        <div className="rounded-2xl border border-gray-200 overflow-hidden relative aspect-[800/550]">
          <Image
            src="/images/screen.webp"
            alt="Dashboard Preview"
            fill
            className="object-cover object-top"
            sizes="800px"
          />
        </div>
      </div>

      {/* RIGHT FADE (optional SaaS effect) – desktop only when image is visible */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#fdfdfd] to-transparent pointer-events-none"></div>




    </section >
  );
}