"use client";
import { useEffect } from "react";

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
    <section className="relative min-h-[900px] py-[100px] overflow-hidden bg-[#fdfdfd] font-sans flex items-center">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center -mt-20">

        {/* LEFT CONTENT */}
        <div className="reveal-left space-y-4 lg:pr-12">

          <span className="inline-block px-3 py-1 rounded-full border border-slate-200 text-[11px] font-semibold text-slate-900 bg-white shadow-sm">
            Attribution reporting that
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 leading-tight">
            Attribution reporting that <br /> <span className="text-brand-600">shows you the truth.</span>
          </h2>

          <ul className="space-y-3 pt-2">
            {[
              { icon: "target", text: "Set company wide goals" },
              { icon: "schedule", text: "Save hours managing growth at scale" },
              { icon: "show_chart", text: "Get higher ROAS for each advertising dollar" },
              { icon: "dashboard", text: "Everything on a single platform" },
            ].map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 text-slate-600 font-semibold text-sm"
              >
                <span className="material-symbols-outlined text-slate-900 text-lg">
                  {item.icon}
                </span>
                {item.text}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 pt-4">
            <button className="bg-black hover:bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-md">
              Book demo
            </button>

           
          </div>
        </div>

        {/* RIGHT GRID SPACE */}
        <div className="hidden lg:block h-1"></div>

      </div>

      {/* DASHBOARD IMAGE */}
      <div className="hidden lg:block absolute bottom-0 right-[-300px] w-[1100px] z-0">
          <div className="rounded-2xl border border-gray-200  overflow-hidden">

    <img
      src="/images/screen.png"
      alt="Dashboard Preview"
      className="w-full max-h-[680px] "
    />
 </div>
</div>

      {/* RIGHT FADE (optional SaaS effect) */}
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#fdfdfd] to-transparent pointer-events-none"></div>

      {/* MOBILE VERSION */}
      <div className="lg:hidden w-full px-6 mt-12 overflow-hidden shadow-2xl rounded-2xl border border-slate-100">
        <div className="bg-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg mb-4">Dashboard Preview</h3>

          <img
  src="/images/dashboard.png"
  alt="Dashboard Preview"
  className="w-full h-full object-cover"
/>
        </div>
      </div>

    </section>
  );
}