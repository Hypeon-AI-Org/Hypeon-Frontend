"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
const TechnologySection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [p2Done, setP2Done] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Tab Logic ---
  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 4);
    }, 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    resetTimer();
  };

  useEffect(() => {
    if (activeTab === 1) setP2Done(true);
  }, [activeTab]);

  return (
    <div className="bg-white text-[#111] antialiased text-[14px] font-sans">
      <div className="flex flex-col lg:flex-row items-start gap-[40px] py-[60px] px-[16px] lg:px-[40px] max-w-[1100px] mx-auto">

        {/* LEFT COPY – scroll reveal */}
        <div className="w-full lg:w-[340px] pt-4 shrink-0 reveal-left">
          <div className="text-[13px] font-semibold text-[#999] mb-3">Technology</div>
          <h2 className="text-[28px] leading-[1.2] tracking-tight text-[#111] mb-[18px]">
            Understand what your market wants — before it peaks.
          </h2>
          <p className="text-[14px] text-[#666] leading-[1.72] mb-7">
            We make sense of millions of signals across search, social and ads to tell you exactly what to sell, where to sell it, and how to beat your competitors to market.
          </p>
          <button className="inline-block bg-[#111] text-white font-semibold text-[14px] py-[10px] px-[18px] rounded-full hover:opacity-80 transition-opacity">
            Our Technology
          </button>
        </div>

        {/* RIGHT PANEL – scroll reveal */}
       <div className="flex-1 w-full border border-black rounded-[16px] overflow-hidden bg-white min-w-0 font-inter reveal-right shadow-[0_1px_2px_rgba(16,24,40,0.06)]">

          {/* TAB GRID */}
          <div className="grid grid-cols-2">
            {[
              { name: "Trend Forecasting", desc: "Leverage predictive search, social, and market data to understand trend direction." },
              { name: "Social Media Intelligence", desc: "Analyze millions of social trends, and track brand and influencer engagement." },
              { name: "Market Intelligence", desc: "Who are the top markets, countries, styles and demographics driving demand." },
              { name: "Ad Intelligence", desc: "See which competitor ads are winning and what angles dominate your niche." }
            ].map((tab, i) => (
              <div
                key={i}
                onClick={() => handleTabClick(i)}
                className={`p-[22px_26px] cursor-pointer border-b-[1.5px] border-[#e2e2e2] transition-colors select-none ${i % 2 === 0 ? "border-r-[1.5px]" : ""
                  } ${activeTab === i ? "bg-white" : "hover:bg-gray-50"}`}
              >
                <div className={`text-[13px] font-bold mb-1 transition-colors ${activeTab === i ? "text-[#111]" : "text-[#c0c0c0]"}`}>
                  {tab.name}
                </div>
                <div className={`text-[12.5px] font-normal leading-normal transition-colors ${activeTab === i ? "text-[#666]" : "text-[#d0d0d0]"}`}>
                  {tab.desc}
                </div>
              </div>
            ))}
          </div>

          {/* BROWSER CHROME */}
          <div className="p-[14px]">
            <div className="border border-black rounded-[10px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] bg-white">

              {/* TOPBAR */}
              <div className="bg-[#f6f6f6] border-b border-[#e2e2e2] p-[8px_14px] flex items-center gap-3">
                
                <div className="flex items-center gap-[7px]">
                  <div className="w-[22px] h-[22px] bg-[#111] rounded-[6px] flex items-center justify-center text-[11px] font-extrabold text-white tracking-tighter">H</div>
                  <div className="text-[13px] font-semibold text-[#111]">HypeOn</div>
                </div>
                <div className="ml-auto flex items-center gap-[6px] bg-white border border-[#e2e2e2] rounded-[7px] p-[5px_10px] text-[11px] text-[#bbb]">
                  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#bbb" strokeWidth="2"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10.5 10.5l3 3" /></svg>
                  Search for a brand, trend, or product…
                </div>
              </div>

              {/* PANELS */}
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && <Panel1 key="p1" />}
                  {activeTab === 1 && <Panel2 key="p2" />}
                  {activeTab === 2 && <Panel3 key="p3" />}
                  {activeTab === 3 && <Panel4 key="p4" />}
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- PANEL COMPONENTS ---

const Panel1 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s1 = useRef([12, 16, 11, 19, 21, 16, 25, 32, 27, 36, 42, 37, 45, 57, 51, 59, 71, 65, 80, 92, 100, 112, 96, 116, 128, 120, 128]);
  const s2 = useRef([8, 11, 8, 13, 15, 11, 17, 21, 18, 23, 30, 25, 32, 42, 37, 44, 54, 47, 62, 72, 76, 88, 72, 90, 102, 94, 102]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const draw = () => {
      const W = canvas.width = canvas.parentElement?.offsetWidth || 0;
      const H = canvas.height = canvas.parentElement?.offsetHeight || 0;
      ctx.clearRect(0, 0, W, H);

      // Grid
      [.25, .5, .75].forEach((f) => {
        ctx.strokeStyle = "#f0f0f0"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(0, H * f); ctx.lineTo(W, H * f); ctx.stroke();
      });

      const curve = (pts: number[]) => {
        const n = pts.length, xStep = W / (n - 1), yScale = (H - 16) / 130;
        let d = `M0,${H - 8 - pts[0] * yScale}`;
        for (let i = 1; i < n; i++) {
          const x = i * xStep, y = H - 8 - pts[i] * yScale;
          const px = (i - 1) * xStep, py = H - 8 - pts[i - 1] * yScale;
          const cx = (px + x) / 2;
          d += ` C${cx},${py} ${cx},${y} ${x},${y}`;
        }
        return d;
      };

      const renderSeries = (pts: number[], col: string, fillA: string) => {
        const d = curve(pts);
        const p = new Path2D(d);
        const area = new Path2D(d + ` L${W},${H} L0,${H} Z`);
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, fillA); g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g; ctx.fill(area);
        ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.lineJoin = "round";
        ctx.stroke(p);
      };

      renderSeries(s2.current, "#e1306c", "rgba(225,48,108,0.15)");
      renderSeries(s1.current, "#4f8ef7", "rgba(79,142,247,0.18)");
    };

    const interval = setInterval(() => {
      s1.current.shift(); s1.current.push(Math.max(8, Math.min(130, s1.current[s1.current.length - 1] + (Math.random() * 14 - 5))));
      s2.current.shift(); s2.current.push(Math.max(5, Math.min(105, s2.current[s2.current.length - 1] + (Math.random() * 10 - 4))));
      draw();
    }, 1600);

    draw();
    window.addEventListener("resize", draw);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="w-full">
      <div className="flex border-b border-[#efefef] bg-white overflow-x-auto no-scrollbar">
        {["Social Overview", "TikTok", "Instagram", "Facebook", "Pinterest", "Search"].map((t, i) => (
          <div key={t} className={`p-[10px_14px] text-[12px] font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer flex items-center gap-[5px] ${i === 0 ? "text-[#111] border-[#111] font-semibold" : "text-[#bbb] border-transparent hover:text-gray-500"}`}>
            {i === 0 && <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="8" cy="8" r="6" /><path d="M8 4v4l2.5 2.5" /></svg>}
            {t}
          </div>
        ))}
      </div>
      <div className="flex items-center p-[6px_14px] border-b border-[#f0f0f0] bg-[#fafafa] gap-[2px]">
        {["1w", "1m", "3m", "6m", "YTD", "1y", "All"].map((t, i) => (
          <div key={t} className={`text-[11px] font-medium p-[3px_8px] rounded-[5px] cursor-pointer transition-all ${i === 0 ? "bg-[#111] text-white" : "text-[#bbb] hover:bg-gray-100 hover:text-gray-600"}`}>{t}</div>
        ))}
        <div className="ml-auto text-[11px] text-[#bbb] flex items-center gap-[3px] cursor-pointer">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#bbb" strokeWidth="2"><rect x="2" y="3" width="12" height="12" rx="2" /><path d="M5 1v4M11 1v4M2 8h12" /></svg>
          Sep 2023 – Mar 2025 ▾
        </div>
      </div>
      <div className="p-[10px_14px_6px] bg-white">
        <div className="h-[95px] relative">
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between pointer-events-none py-[2px] z-10">
            {["10k", "7.5k", "5k", "2.5k", "0k"].map(v => <span key={v} className="text-[9px] text-[#d8d8d8]">{v}</span>)}
          </div>
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
      </div>
      <div className="flex gap-[14px] p-[6px_14px_8px] border-top border-[#f5f5f5] flex-wrap">
        <div className="flex items-center gap-[5px] text-[10.5px] text-[#999]"><div className="w-2 h-2 rounded-full bg-[#4f8ef7]" />Search Volume</div>
        <div className="flex items-center gap-[5px] text-[10.5px] text-[#999]"><div className="w-[14px] border-t-2 border-dashed border-[#4f8ef7] opacity-50" />Search Trend</div>
        <div className="flex items-center gap-[5px] text-[10.5px] text-[#999]"><div className="w-2 h-2 rounded-full bg-[#e1306c]" />Social Posts</div>
        <div className="flex items-center gap-[5px] text-[10.5px] text-[#999]"><div className="w-[14px] border-t-2 border-dashed border-[#e1306c] opacity-50" />Social Trend</div>
      </div>
      <div className="bg-[#fafafa] border-t border-[#f0f0f0] p-[12px_14px_14px]">
        <div className="flex justify-between items-center text-[13px] font-bold mb-[3px]">Accelerated Growth <a href="#" className="text-[11px] font-medium text-[#aaa] hover:text-[#555]">View in Summary Table ›</a></div>
        <div className="text-[11px] text-[#bbb] mb-[10px]">Year over year growth is positive and is rapidly increasing</div>
        <div className="grid grid-cols-[1fr_100px_100px_90px] py-[3px] border-b border-[#eaeaea]">
          {["Trend", "Search Pattern", "Avg Search Weekly", "TY/LY Growth"].map((h, i) => <span key={h} className={`text-[10px] font-semibold text-[#ccc] ${i === 0 ? "text-left" : "text-right"}`}>{h}</span>)}
        </div>
        {[
          { name: "Pet Grooming Vac", vol: "35,710", growth: "384,503%", sparks: [1, 2, 3, 4, 5, 8, 13, 21, 30] },
          { name: "Hydrogen Water Bottle", vol: "26,568", growth: "36,630%", sparks: [2, 3, 4, 5, 7, 10, 15, 20, 26] },
          { name: "Matcha Frother Set", vol: "10,351,969", growth: "8,144%", sparks: [1, 2, 2, 4, 7, 11, 17, 23, 29] },
          { name: "LED Face Mask", vol: "114,928", growth: "4,989%", sparks: [3, 4, 5, 6, 7, 9, 13, 17, 22] }
        ].map((row, i) => (
          <div key={i} className="grid grid-cols-[1fr_100px_100px_90px] py-[6px] border-b border-[#f5f5f5] last:border-0 items-center">
            <div className="text-[12px] font-medium flex items-center gap-[7px]"><span className="w-[6px] h-[6px] rounded-full bg-gray-300" />{row.name}</div>
            <div className="flex items-end justify-end gap-[1.5px] h-[18px]">
              {row.sparks.map((v, j) => (
                <span key={j} style={{ height: `${Math.max(2, Math.round(v / Math.max(...row.sparks) * 16))}px`, opacity: 0.35 + 0.65 * (v / Math.max(...row.sparks)) }} className="w-[3px] rounded-[1px] bg-[#4f8ef7]" />
              ))}
            </div>
            <div className="text-[11px] text-[#666] text-right">{row.vol}</div>
            <div className="text-[11px] font-semibold text-right flex items-center justify-end gap-[3px]">
              {row.growth} <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M3 13L13 3M13 3H7M13 3v6" /></svg>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Panel2 = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const data = useRef([30, 38, 28, 46, 43, 57, 52, 67, 62, 82, 77, 92, 86, 102, 93, 110, 102, 120, 111, 126]);
  const [counts, setCounts] = useState({ signals: 0, viral: 0, eng: 0 });

  useEffect(() => {
    const dur = 1400;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setCounts({
        signals: 91.4 * e,
        viral: 4.9 * e,
        eng: 8.5 * e
      });
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const W = canvas.width = canvas.parentElement?.offsetWidth || 0;
      const H = canvas.height = 88;
      ctx.clearRect(0, 0, W, H);
      const max = Math.max(...data.current), xs = W / (data.current.length - 1), sc = (H - 8) / max;
      let path = `M0,${H - data.current[0] * sc}`;
      for (let i = 1; i < data.current.length; i++) {
        const x = i * xs, y = H - data.current[i] * sc, px = (i - 1) * xs, py = H - data.current[i - 1] * sc, cx = (px + x) / 2;
        path += ` C${cx},${py} ${cx},${y} ${x},${y}`;
      }
      const area = new Path2D(path + ` L${W},${H} L0,${H} Z`);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "rgba(0,0,0,0.08)"); g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g; ctx.fill(area);
      ctx.strokeStyle = "#111"; ctx.lineWidth = 1.8; ctx.lineJoin = "round";
      ctx.stroke(new Path2D(path));
    };

    const interval = setInterval(() => {
      data.current.shift(); data.current.push(Math.max(20, Math.min(130, data.current[data.current.length - 1] + (Math.random() * 16 - 6))));
      draw();
    }, 1400);

    draw();
    window.addEventListener("resize", draw);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="w-full p-[14px]">
      <div className="flex justify-between items-center mb-3">
        <div className="text-[13px] font-bold">Social Signal Overview</div>
        <div className="text-[11px] text-[#aaa] bg-[#f5f5f5] p-[3px_9px] rounded-[5px] cursor-pointer">Jan 2024 – Mar 2025 ▾</div>
      </div>
      <div className="flex gap-2 mb-3">
        {[
          { lbl: "Total Signals", val: counts.signals.toFixed(1) + "M", chg: "↑ +18% this week" },
          { lbl: "Viral Posts", val: counts.viral.toFixed(1) + "k", chg: "↑ +340 today" },
          { lbl: "Avg Engagement", val: counts.eng.toFixed(1) + "%", chg: "↑ above baseline" }
        ].map((s, i) => (
          <div key={i} className="flex-1 p-[10px_12px] bg-[#fafafa] border border-[#eee] rounded-[8px]">
            <div className="text-[10px] text-[#bbb] font-medium mb-1 tracking-wider">{s.lbl}</div>
            <div className="text-[20px] font-extrabold text-[#111] leading-none">{s.val}</div>
            <div className="text-[10px] font-semibold text-[#111] mt-[3px]">{s.chg}</div>
          </div>
        ))}
      </div>
      <div className="h-[88px] mb-[10px]"><canvas ref={canvasRef} /></div>
      <div className="flex flex-col gap-[5px]">
        {[
          { label: "TikTok", w: 88, count: "91.4M views", chg: "+8.5%", col: "#111" },
          { label: "Instagram", w: 72, count: "44.2M reach", chg: "+5.1%", col: "#555" },
          { label: "Pinterest", w: 52, count: "18.7M saves", chg: "+12.3%", col: "#888" },
          { label: "Google", w: 65, count: "142k searches", chg: "+6.7%", col: "#bbb" }
        ].map((p, i) => (
          <div key={i} className="flex items-center gap-2 p-[7px_10px] bg-[#fafafa] border border-[#f0f0f0] rounded-[7px]">
            <div className="text-[12px] font-semibold flex-1">{p.label}</div>
            <div className="w-[80px] h-1 bg-[#ebebeb] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${p.w}%` }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} style={{ background: p.col }} className="h-full rounded-full" />
            </div>
            <div className="text-[11px] text-[#666] w-[72px] text-right">{p.count}</div>
            <div className="text-[11px] font-semibold text-right w-[36px]">{p.chg}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Panel3 = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="w-full">
      <div className="flex gap-[5px] p-[9px_14px] border-b border-[#f0f0f0] flex-wrap items-center">
        {["Category (1) ▾", "Region ▾", "Style Type ▾", "Gender / Age ▾", "Aug 2024 ▾"].map((f, i) => (
          <div key={i} className={`text-[11px] font-medium p-[4px_10px] rounded-[6px] border border-[#e0e0e0] cursor-pointer transition-colors ${i === 0 ? "bg-[#111] text-white border-[#111]" : "bg-white text-[#555] hover:border-gray-400"}`}>{f}</div>
        ))}
        <div className="ml-auto text-[11px] text-[#bbb] cursor-pointer hover:text-[#555]">Clear all</div>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-[12px_14px] border-r border-[#f0f0f0]">
          <div className="text-[12px] font-bold mb-[10px] flex items-center gap-[6px]">Top Markets <span className="text-[11px] text-[#bbb] font-normal">3,047,605 products</span></div>
          {[
            { flag: "🇺🇸", name: "United States", w: "92%", n: "1.07M", chg: "+24%" },
            { flag: "🇬🇧", name: "United Kingdom", w: "68%", n: "318k", chg: "+18%" },
            { flag: "🇩🇪", name: "Germany", w: "52%", n: "149k", chg: "+31%" },
            { flag: "🇦🇺", name: "Australia", w: "44%", n: "135k", chg: "+42%" },
            { flag: "🇨🇦", name: "Canada", w: "38%", n: "115k", chg: "+19%" },
            { flag: "🇦🇪", name: "UAE", w: "28%", n: "82k", chg: "Untapped", sub: true }
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-[7px] py-[5px] border-b border-[#f7f7f7] last:border-0">
              <span className="text-[14px] leading-none">{c.flag}</span>
              <span className="text-[12px] font-medium flex-1">{c.name}</span>
              <div className="w-[50px] h-1 bg-[#ebebeb] rounded-full overflow-hidden">
                <div style={{ width: c.w }} className="h-full bg-[#111] rounded-full" />
              </div>
              <span className="text-[11px] text-[#888] w-[38px] text-right">{c.n}</span>
              <span className={`text-[11px] font-semibold w-[34px] text-right ${c.sub ? "text-[#aaa]" : ""}`}>{c.chg}</span>
            </div>
          ))}
        </div>
        <div className="p-[12px_14px]">
          <div className="text-[12px] font-bold mb-[10px]">Trending Styles</div>
          <div className="grid grid-cols-2 gap-[5px]">
            {[
              { name: "Minimalist", pct: "↑ 68%", trending: true },
              { name: "Coastal Grandmother", pct: "↑ 420%" },
              { name: "Quiet Luxury", pct: "↑ 185%" },
              { name: "Cottagecore", pct: "↑ 94%", trending: true },
              { name: "Brat", pct: "↑ 340%" },
              { name: "Mob Wife", pct: "↑ 210%" },
              { name: "Dark Academia", pct: "↑ 78%", trending: true },
              { name: "Dopamine Dressing", pct: "↑ 112%" }
            ].map((s, i) => (
              <div key={i} className={`p-2 rounded-[7px] border transition-all text-center cursor-pointer ${s.trending ? "bg-[#111] text-white border-[#111]" : "bg-white text-[#111] border-[#e5e5e5] hover:border-[#111]"}`}>
                <div className="text-[11px] font-semibold">{s.name}</div>
                <div className={`text-[10px] font-bold mt-[2px] ${s.trending ? "text-[#ddd]" : "text-gray-400"}`}>{s.pct}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Panel4 = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="p-[14px]">
      <div className="flex justify-between items-center mb-[10px]">
        <div className="text-[13px] font-bold">Ad Intelligence</div>
        <div className="flex gap-[5px]">
          {["Saved Filter ▾", "☆", "···"].map(b => (
            <div key={b} className="text-[11px] text-[#888] bg-[#f5f5f5] border border-[#e5e5e5] rounded-[5px] p-[4px_10px] cursor-pointer">{b}</div>
          ))}
        </div>
      </div>
      <div className="flex gap-[5px] mb-2 flex-wrap">
        {["Platform ▾", "Brand ▾", "Ad Type ▾", "ROAS ▾", "Run Time ▾"].map(f => <div key={f} className="text-[11px] font-medium p-[4px_10px] border border-[#e0e0e0] rounded-[6px] hover:border-gray-400 cursor-pointer">{f}</div>)}
      </div>
      <div className="text-[11px] text-[#bbb] mb-[10px]">14,518 Brands · 3,047,605 Ads tracked</div>
      <div className="grid grid-cols-3 gap-[7px] mb-3">
        {[
          {
            img: "/images/ad1.jpg",
            plat: "TikTok",
            name: "Running Shoes",
            roas: "4.8x",
            views: "2.1M"
          },
          {
            img: "/images/ad2.jpg",
            plat: "Meta",
            name: "peel stick wallpaper",
            roas: "3.2x",
            views: "840k"
          },
          {
            img: "/images/ad3.jpg",
            plat: "Instagram",
            name: "Gshock watch",
            roas: "2.8x",
            views: "520k"
          }
        ].map((c, i) => (
          <div key={i} className="border border-[#efefef] rounded-[8px] overflow-hidden cursor-pointer hover:border-gray-300 hover:shadow-lg transition-all transform hover:-translate-y-[1px]">
            <div className="relative w-full aspect-[16/13] overflow-hidden">
              <Image
                src={c.img}
                alt={c.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-[7px_9px]">
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#bbb] mb-[2px]">{c.plat}</div>
              <div className="text-[11px] font-semibold mb-[5px] leading-tight">{c.name}</div>
              <div className="flex gap-1 flex-wrap">
                <div className="text-[9px] font-semibold p-[2px_6px] rounded-[4px] bg-[#f0f0f0] text-[#111]">ROAS {c.roas}</div>
                <div className="text-[9px] font-semibold p-[2px_6px] rounded-[4px] bg-[#f0f0f0] text-[#555]">{c.views} views</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.7fr_0.8fr_0.7fr_0.7fr_58px] py-1 border-b border-[#e8e8e8]">
        {["Brand", "Est. Spend", "Avg ROAS", "Run Time", "Signal"].map((h, i) => <span key={h} className={`text-[10px] font-semibold text-[#ccc] ${i === 0 ? "text-left" : "text-right"}`}>{h}</span>)}
      </div>
      {[
        { name: "Hismile", spend: "$142k/mo", roas: "4.8x", time: "68 days", signal: "Scale", color: "#111" },
        { name: "RYZE Coffee", spend: "$88k/mo", roas: "3.4x", time: "45 days", signal: "Scale", color: "#555" },
        { name: "Obvi", spend: "$54k/mo", roas: "2.1x", time: "12 days", signal: "Test", color: "#888" },
        { name: "Caraway", spend: "$31k/mo", roas: "1.8x", time: "5 days", signal: "Watch", color: "#ccc" }
      ].map((row, i) => (
        <div key={i} className="grid grid-cols-[1.7fr_0.8fr_0.7fr_0.7fr_58px] py-[6px] border-b border-[#f5f5f5] last:border-0 items-center">
          <div className="text-[12px] font-semibold flex items-center gap-[6px]"><div className="w-[7px] h-[7px] rounded-full" style={{ background: row.color }} />{row.name}</div>
          <div className="text-[11px] text-right text-[#555]">{row.spend}</div>
          <div className="text-[11px] text-right font-bold text-[#111]">{row.roas}</div>
          <div className="text-[11px] text-right text-[#555]">{row.time}</div>
          <div className={`text-[10px] font-bold text-center py-[3px] rounded-full border ${row.signal === "Scale" ? "bg-[#111] text-white border-[#111]" : row.signal === "Test" ? "bg-[#f0f0f0] text-[#333] border-[#ddd]" : "bg-white text-[#aaa] border-[#e5e5e5]"}`}>
            {row.signal}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default TechnologySection;