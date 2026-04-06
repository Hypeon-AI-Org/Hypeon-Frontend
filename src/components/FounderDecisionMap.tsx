'use client'

import {
  WORKSPACE_PREVIEW_DASHBOARD_FRAME,
  WORKSPACE_PREVIEW_GLOW_GUTTER,
  WORKSPACE_PREVIEW_INNER_CENTER,
  WORKSPACE_PREVIEW_SHELL_STYLE,
} from "@/lib/workspacePreviewShell"
import { useRef, useState, useEffect } from "react"
import NextImage from "next/image"
import { ArrowUp, Image as ImageIcon, Music2, Paperclip, Search, Sparkles } from "lucide-react"

const WORKSPACE_BACKDROP_STYLE = {
  backgroundImage: "url('/images/back.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#c8c5b8",
} as const

const sections = [
  {
    id: "01",
    title: "Spot What Product to Sell Next ",
    description: "See what's trending online and search before it hits mainstream. Get into winning products weeks before your competitors even notice the signal."
  },
  {
    id: "02",
    title: "See Your Real ROAS",
    description: "Not what Google claims. Not what Meta reports. The actual return on every dollar you spent - across every channel - with zero duplication."
  },
  {
    id: "03",
    title: "Pricing Intelligence ",
    description: "See what your competitors price  across every market before you set your prices. Stay competitive where it matters, charge more where you can, and never lose a sale because you were priced wrong."
  },
  {
    id: "05",
    title: "Find Trending Keywords",
    description: "Know exactly what your customers are typing into Google right now. Build campaigns around real demand - not last month's search volume."
  },
  {
    id: "06",
    title: "Know What Product to Develop",
    description: "See exactly what, designs and product improvements your market is asking for - pulled from reviews, social and search signals. Stop guessing what customers want and start building what they'll actually pay for."
  },
  {
    id: "07",
    title: "Find Your Competitors' Best Performing Ads",
    description: "See exactly which ads your competitors are running and which ones are actually working. Stop starting from scratch - know the winning angles, hooks and offers in your niche before you spend a penny testing."
  },
  {
    id: "08",
    title: "Competitor Social Media Analysis ",
    description: "See exactly what content is working for them. Know their winning angles, top products and engagement spikes in real time."
  },
  {
    id: "09",
    title: "Competitor Trustpilot Analysis",
    description: "Read your competitors' reviews so you know exactly what their customers hate about them. Turn their weaknesses into your biggest selling points."
  },
  {
    id: "10",
    title: "Know What Markets to Enter",
    description: "Find pockets of demand that nobody is selling into yet. See exactly which geographies and demographics are underserved before the ad costs catch up."
  },
]

const STATUS_MESSAGES = [
  "Analyzing product velocity...",
  "Scanning TikTok signals...",
  "Identifying breakout trends...",
]

/** Product thumbnails for “Product signals” preview (Unsplash, allowed in next.config). */
const PRODUCT_SIGNAL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240&h=240&fit=crop&q=80", alt: "Sneaker product" },
  { src: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=240&h=240&fit=crop&q=80", alt: "Tote bag" },
  { src: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=240&h=240&fit=crop&q=80", alt: "Table lamp" },
  { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=240&h=240&fit=crop&q=80", alt: "Watch product" },
] as const

/** Card 01 HTML reference — PNGs decoded from your inline base64 (public/product-signals/). */
const PRODUCT_SIGNAL_HTML_PREVIEW = [
  { src: "/product-signals/0.png", alt: "Sneaker product" },
  { src: "/product-signals/1.png", alt: "Tote bag" },
  { src: "/product-signals/2.png", alt: "Table lamp" },
  { src: "/product-signals/3.png", alt: "Product silhouette" },
] as const

const ANALYTICS_CHAT_SCROLL_STYLE = `
.analytics-chat-scroll::-webkit-scrollbar { display: none; }
.analytics-chat-scroll { scrollbar-width: none; -ms-overflow-style: none; }
`

/** Card 01 — pixel-aligned with Product Signals HTML reference (scoped under .ps-html-root). */
const PRODUCT_SIGNALS_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
.ps-html-root * { box-sizing: border-box; }
.ps-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.ps-html-root .ps-outer-card {
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 12px;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  border: 1px solid rgba(255,255,255,0.6);
}
.ps-html-root .ps-panels {
  display: flex;
  gap: 10px;
  min-height: 500px;
}
.ps-html-root .ps-left-panel {
  flex: 1;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 22px 18px 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
}
.ps-html-root .ps-panel-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 18px;
}
.ps-html-root .ps-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
}
.ps-html-root .ps-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 18px 18px 4px 18px;
  padding: 10px 14px;
  font-size: 13px;
  color: #333;
  max-width: 82%;
  line-height: 1.4;
}
.ps-html-root .ps-ai-message {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.ps-html-root .ps-ai-icon {
  width: 26px;
  height: 26px;
  background: #c8c4bc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.ps-html-root .ps-ai-icon svg { width: 14px; height: 14px; opacity: 0.7; }
.ps-html-root .ps-ai-text {
  font-size: 13px;
  color: #444;
  line-height: 1.5;
  padding-top: 2px;
}
.ps-html-root .ps-loading-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 28px 0 20px;
}
.ps-html-root .ps-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: ps-spin 0.9s linear infinite;
}
@keyframes ps-spin { to { transform: rotate(360deg); } }
.ps-html-root .ps-loading-text {
  font-size: 13px;
  color: #888;
  letter-spacing: 0.01em;
}
.ps-html-root .ps-input-bar {
  display: flex;
  align-items: center;
  background: #edeae4;
  border-radius: 28px;
  padding: 9px 10px 9px 14px;
  gap: 8px;
  margin-top: auto;
}
.ps-html-root .ps-input-bar input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: #333;
  font-family: inherit;
  min-width: 0;
}
.ps-html-root .ps-input-bar input::placeholder { color: #bbb; }
.ps-html-root .ps-icon-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  transition: background 0.15s;
}
.ps-html-root .ps-send-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: #aaa;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: background 0.15s;
}
.ps-html-root .ps-right-panel {
  flex: 1;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  overflow-y: auto;
}
.ps-html-root .ps-section-card {
  background: #edeae4;
  border-radius: 14px;
  padding: 14px 16px;
}
.ps-html-root .ps-section-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.ps-html-root .ps-products-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.ps-html-root .ps-product-thumb {
  flex: 1;
  background: #e4e0d8;
  border-radius: 10px;
  padding: 8px 6px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 80px;
  position: relative;
}
.ps-html-root .ps-product-thumb img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 6px;
}
.ps-html-root .ps-badge {
  font-size: 9px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  letter-spacing: 0.03em;
}
.ps-html-root .ps-badge-trending { background: #b8d4c8; color: #2e6e55; }
.ps-html-root .ps-badge-rising { background: #c8d4e0; color: #2e4e6e; }
.ps-html-root .ps-badge-trending-light {
  background: #e4e0d8;
  color: #999;
  border: 1px solid #d4d0c8;
}
.ps-html-root .ps-indicators-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.ps-html-root .ps-indicator-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #e4e0d8;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 11px;
  color: #555;
}
.ps-html-root .ps-indicator-chip .ps-chip-icon { font-size: 12px; }
.ps-html-root .ps-winners-row { display: flex; gap: 8px; }
.ps-html-root .ps-winner-card {
  flex: 1;
  background: #e4e0d8;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  gap: 6px;
  align-items: center;
  min-width: 0;
}
.ps-html-root .ps-winner-thumb {
  width: 28px;
  height: 36px;
  background: #d4d0c8;
  border-radius: 6px;
  flex-shrink: 0;
}
.ps-html-root .ps-winner-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.ps-html-root .ps-winner-line {
  height: 7px;
  background: #ccc8c0;
  border-radius: 4px;
}
.ps-html-root .ps-winner-line.ps-short { width: 60%; }
.ps-html-root .ps-comp-label {
  font-size: 12px;
  color: #aaa;
  text-align: center;
  padding: 4px 0 2px;
}
.ps-html-root .ps-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.85);
  pointer-events: none;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
  line-height: 1;
}
@media (max-width: 767px) {
  .ps-html-root .ps-panels { flex-direction: column; min-height: 0; }
  .ps-html-root .ps-left-panel { min-height: 280px; }
}
  
`

/** Card 05 — Keyword Intelligence preview (pixel-aligned with supplied HTML reference). */
const KEYWORD_INTELLIGENCE_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
.ki-html-root * { box-sizing: border-box; margin: 0; padding: 0; }
.ki-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.ki-html-root .ki-outer-card {
  width: 100%;
  max-width: 900px;
  background: rgba(255,255,255,0.48);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(255,255,255,0.65);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.13);
}
.ki-html-root .ki-panels {
  display: flex;
  gap: 10px;
  min-height: 500px;
}
.ki-html-root .ki-left-panel {
  flex: 0 0 200px;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 20px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
}
.ki-html-root .ki-panel-label {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 16px;
}
.ki-html-root .ki-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
}
.ki-html-root .ki-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 18px 18px 4px 18px;
  padding: 10px 13px;
  font-size: 12.5px;
  color: #444;
  line-height: 1.45;
  max-width: 155px;
}
.ki-html-root .ki-ai-row {
  display: flex;
  gap: 9px;
  align-items: flex-start;
}
.ki-html-root .ki-ai-icon {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #c8c4bc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ki-html-root .ki-ai-icon svg { width: 14px; height: 14px; }
.ki-html-root .ki-ai-text {
  font-size: 12.5px;
  color: #555;
  line-height: 1.52;
}
.ki-html-root .ki-loading-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding-left: 2px;
  margin-top: 4px;
}
.ki-html-root .ki-spinner-row {
  display: flex;
  align-items: center;
  gap: 7px;
}
.ki-html-root .ki-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #d4d0c8;
  border-top-color: #999;
  border-radius: 50%;
  animation: ki-kw-spin 0.9s linear infinite;
  flex-shrink: 0;
}
@keyframes ki-kw-spin { to { transform: rotate(360deg); } }
.ki-html-root .ki-loading-text {
  font-size: 12px;
  color: #999;
}
.ki-html-root .ki-input-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #edeae4;
  border-radius: 28px;
  padding: 8px 10px;
  margin-top: 14px;
}
.ki-html-root .ki-input-btn {
  background: none;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  color: #aaa;
  flex-shrink: 0;
}
.ki-html-root .ki-input-btn svg { width: 15px; height: 15px; }
.ki-html-root .ki-input-field {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #888;
  min-width: 0;
}
.ki-html-root .ki-send-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #b0aca6;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.ki-html-root .ki-send-btn svg { width: 12px; height: 12px; }
.ki-html-root .ki-right-panel {
  flex: 1;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 20px 18px 16px;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  overflow-y: auto;
}
.ki-html-root .ki-right-panel .ki-panel-label { margin-bottom: 14px; }
.ki-html-root .ki-kw-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}
.ki-html-root .ki-kw-indicator {
  width: 3px;
  height: 16px;
  background: #5b8dd9;
  border-radius: 2px;
}
.ki-html-root .ki-kw-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #555;
}
.ki-html-root .ki-kw-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 14px;
}
.ki-html-root .ki-kw-table th {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #bbb;
  padding: 0 8px 6px;
  text-align: left;
  white-space: nowrap;
}
.ki-html-root .ki-kw-table th:nth-child(2),
.ki-html-root .ki-kw-table th:nth-child(3) { text-align: right; }
.ki-html-root .ki-kw-table th:nth-child(4) { text-align: center; }
.ki-html-root .ki-kw-table th:nth-child(5) { text-align: right; }
.ki-html-root .ki-kw-table td {
  font-size: 12px;
  color: #555;
  padding: 6px 8px;
  border-top: 1px solid rgba(0,0,0,0.045);
  white-space: nowrap;
}
.ki-html-root .ki-kw-table td:nth-child(2),
.ki-html-root .ki-kw-table td:nth-child(3) { text-align: right; color: #777; }
.ki-html-root .ki-kw-table td:nth-child(4) { text-align: center; }
.ki-html-root .ki-kw-table td:nth-child(5) { text-align: right; }
.ki-html-root .ki-badge {
  display: inline-block;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 20px;
  text-transform: uppercase;
}
.ki-html-root .ki-badge-low { background: #c8e8d0; color: #2a7a45; }
.ki-html-root .ki-badge-medium { background: #fde8b8; color: #8a5a10; }
.ki-html-root .ki-badge-high { background: #f8ccc8; color: #9a2020; }
.ki-html-root .ki-hype-score {
  font-size: 13px;
  font-weight: 700;
}
.ki-html-root .ki-hype-91 { color: #3a7a5a; }
.ki-html-root .ki-hype-87 { color: #4a8a6a; }
.ki-html-root .ki-hype-79 { color: #7a7a3a; }
.ki-html-root .ki-hype-64 { color: #7a4a3a; }
.ki-html-root .ki-skeleton-row td {
  padding: 7px 8px;
  border-top: 1px solid rgba(0,0,0,0.045);
}
.ki-html-root .ki-skel-bar {
  height: 9px;
  background: linear-gradient(90deg, #e4e0d8 25%, #ece8e0 50%, #e4e0d8 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: ki-kw-shimmer 1.6s infinite;
}
@keyframes ki-kw-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.ki-html-root .ki-bottom-row {
  display: flex;
  gap: 10px;
  flex: 1;
  min-height: 0;
}
.ki-html-root .ki-section-card {
  background: #edeae4;
  border-radius: 12px;
  padding: 12px 14px;
  flex: 1;
  min-width: 0;
}
.ki-html-root .ki-section-card-title {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 10px;
}
.ki-html-root .ki-cpc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ki-html-root .ki-cpc-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.ki-html-root .ki-cpc-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ki-html-root .ki-cpc-name {
  font-size: 11px;
  color: #666;
  font-weight: 500;
}
.ki-html-root .ki-cpc-price {
  font-size: 11px;
  color: #888;
  font-weight: 500;
}
.ki-html-root .ki-cpc-bar-track {
  height: 6px;
  background: #e4e0d8;
  border-radius: 10px;
  overflow: hidden;
}
.ki-html-root .ki-cpc-bar-fill {
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease;
}
.ki-html-root .ki-bar-blue { background: linear-gradient(90deg, #7aacdc, #5590c8); }
.ki-html-root .ki-bar-red { background: linear-gradient(90deg, #e07a6a, #cc5545); }
.ki-html-root .ki-cpc-note {
  font-size: 9.5px;
  color: #aaa;
  margin-top: 8px;
  line-height: 1.4;
}
@media (max-width: 767px) {
  .ki-html-root .ki-panels { flex-direction: column; min-height: 0; }
  .ki-html-root .ki-left-panel { flex: 0 0 auto; }
  .ki-html-root .ki-bottom-row { flex-direction: column; }
}


.ps-outer-card,
.ki-outer-card,
.pi-outer-card,
.aid-outer-card,
.mex-outer-card,
.rad-outer-card,
.inv-outer-card,
.csi-outer-card,
.cad-outer-card {
  max-width: 820px !important;   /* 🔥 reduces size */
  height: 580px !important;      /* 🔥 consistent height */
  margin: 40px -40px 40px auto !important;  /* 🔥 shift to the right */
  display: flex !important;
  flex-direction: column !important;
  overflow: hidden !important;
}

/* Mobile + tablet: keep the card centered and fully visible */
@media (max-width: 1023px) {
  .ps-outer-card,
  .ki-outer-card,
  .pi-outer-card,
  .aid-outer-card,
  .mex-outer-card,
  .rad-outer-card,
  .inv-outer-card,
  .csi-outer-card,
  .cad-outer-card {
    width: calc(100% - 24px) !important;
    max-width: 100% !important;
    margin: 18px auto 24px auto !important;
  }
}

@media (max-width: 640px) {
  .ps-outer-card,
  .ki-outer-card,
  .pi-outer-card,
  .aid-outer-card,
  .mex-outer-card,
  .rad-outer-card,
  .inv-outer-card,
  .csi-outer-card,
  .cad-outer-card {
    height: 520px !important;
    margin: 14px auto 20px auto !important;
  }
}

.ps-panels,
.ki-panels,
.pi-panels,
.aid-dashboard,
.mex-panels,
.rad-panels,
.inv-panels,
.csi-panels,
.cad-panels {
  flex: 1 !important;
  min-height: 0 !important;
  overflow: hidden !important;
}

.ps-right-panel,
.ki-right-panel,
.pi-right-panel,
.aid-right-grid,
.mex-right-panel,
.rad-right-panel,
.inv-right-panel,
.csi-right-panel,
.cad-right-panel {
  min-height: 0 !important;
  overflow-y: auto !important;
}

/* Hide all scrollbars in cards globally */
.ps-html-root *, .ki-html-root *, .pi-html-root *, .aid-html-root *, .mex-html-root *, .rad-html-root *, .inv-html-root *, .csi-html-root *, .cad-html-root * {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
.ps-html-root *::-webkit-scrollbar, .ki-html-root *::-webkit-scrollbar, .pi-html-root *::-webkit-scrollbar, .aid-html-root *::-webkit-scrollbar, .mex-html-root *::-webkit-scrollbar, .rad-html-root *::-webkit-scrollbar, .inv-html-root *::-webkit-scrollbar, .csi-html-root *::-webkit-scrollbar, .cad-html-root *::-webkit-scrollbar {
  display: none !important;
}
`

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const set = () => setIsDesktop(mq.matches)
    set()
    mq.addEventListener("change", set)
    return () => mq.removeEventListener("change", set)
  }, [])
  return isDesktop
}

/** Card 03 — Pricing Intelligence preview (matches supplied HTML reference; scoped under .pi-html-root). */
const PRICING_INTELLIGENCE_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
.pi-html-root *, .pi-html-root *::before, .pi-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.pi-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.pi-html-root .pi-outer-card {
  width: 100%;
  max-width: 880px;
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
}
.pi-html-root .pi-panels {
  display: flex;
  gap: 10px;
  min-height: 500px;
}
.pi-html-root .pi-left-panel {
  flex: 0 0 220px;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 22px 18px 16px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.pi-html-root .pi-panel-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 18px;
}
.pi-html-root .pi-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
}
.pi-html-root .pi-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 18px 18px 4px 18px;
  padding: 11px 14px;
  font-size: 13px;
  color: #444;
  line-height: 1.5;
  max-width: 90%;
}
.pi-html-root .pi-ai-message {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: flex-start;
}
.pi-html-root .pi-ai-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #c8c4bc;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pi-html-root .pi-ai-icon svg { width: 14px; height: 14px; }
.pi-html-root .pi-ai-text {
  font-size: 13px;
  color: #444;
  line-height: 1.5;
}
.pi-html-root .pi-loading-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding-left: 2px;
}
.pi-html-root .pi-spinner-dots {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 16px;
}
.pi-html-root .pi-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #bbb;
  animation: pi-dotBounce 1.2s ease-in-out infinite;
}
.pi-html-root .pi-dot:nth-child(2) { animation-delay: 0.2s; }
.pi-html-root .pi-dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes pi-dotBounce {
  0%, 80%, 100% { transform: scale(0.7); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
}
.pi-html-root .pi-loading-text {
  font-size: 13px;
  color: #888;
  line-height: 1.5;
}
.pi-html-root .pi-input-bar {
  margin-top: 16px;
  background: #edeae4;
  border-radius: 28px;
  padding: 9px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pi-html-root .pi-input-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #999;
  flex-shrink: 0;
}
.pi-html-root .pi-text-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 13px;
  color: #888;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  min-width: 0;
}
.pi-html-root .pi-send-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: #aaa;
  border-radius: 50%;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}
.pi-html-root .pi-middle-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
.pi-html-root .pi-right-panel {
  flex: 0 0 220px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
}
.pi-html-root .pi-section-card {
  background: #f5f3ef;
  border-radius: 16px;
  padding: 18px 18px 16px;
}
.pi-html-root .pi-section-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 14px;
}
.pi-html-root .pi-benchmark-card {
  background: #f5f3ef;
  border-radius: 16px;
  padding: 18px 18px 16px;
  flex: 1;
}
.pi-html-root .pi-benchmark-content {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 16px;
}
.pi-html-root .pi-bag-thumb {
  width: 72px;
  height: 72px;
  border-radius: 10px;
  background: #edeae4;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.pi-html-root .pi-bag-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.pi-html-root .pi-benchmark-info { flex: 1; min-width: 0; }
.pi-html-root .pi-competitor-range {
  font-size: 11px;
  color: #999;
  margin-bottom: 4px;
}
.pi-html-root .pi-your-price {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}
.pi-html-root .pi-your-price span {
  font-size: 13px;
  font-weight: 400;
  color: #888;
}
.pi-html-root .pi-price-slider-wrapper {
  position: relative;
  margin-bottom: 6px;
}
.pi-html-root .pi-price-track {
  width: 100%;
  height: 6px;
  background: #e0ddd6;
  border-radius: 3px;
  position: relative;
  overflow: visible;
}
.pi-html-root .pi-price-range-fill {
  position: absolute;
  left: 0%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #c8dce8 0%, #a8c8dc 100%);
  border-radius: 3px;
}
.pi-html-root .pi-price-thumb {
  position: absolute;
  width: 14px;
  height: 14px;
  background: #5a8fb0;
  border: 2px solid white;
  border-radius: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 4px rgba(0,0,0,0.2);
}
.pi-html-root .pi-you-label {
  position: absolute;
  font-size: 9px;
  color: #5a8fb0;
  font-weight: 600;
  white-space: nowrap;
  transform: translateX(-50%);
  top: 12px;
}
.pi-html-root .pi-price-labels {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #aaa;
  margin-top: 4px;
}
.pi-html-root .pi-within-range {
  background: #d8ead8;
  color: #4a8a4a;
  font-size: 12px;
  border-radius: 8px;
  padding: 8px 12px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.pi-html-root .pi-within-range::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5aaa5a;
  flex-shrink: 0;
}
.pi-html-root .pi-competitor-card {
  background: #f5f3ef;
  border-radius: 16px;
  padding: 16px 18px;
}
.pi-html-root .pi-competitor-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  gap: 8px;
}
.pi-html-root .pi-competitor-row:last-of-type { border-bottom: none; }
.pi-html-root .pi-competitor-name {
  font-size: 13px;
  color: #444;
}
.pi-html-root .pi-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
  white-space: nowrap;
}
.pi-html-root .pi-badge-gray { background: #e4e0d8; color: #888; }
.pi-html-root .pi-badge-midmarket { background: #e4e0d8; color: #888; }
.pi-html-root .pi-badge-premium { background: #d0e8d4; color: #3a7a4a; }
.pi-html-root .pi-gap-note {
  background: #f5ead0;
  color: #886020;
  font-size: 11.5px;
  border-radius: 8px;
  padding: 9px 12px;
  margin-top: 10px;
  line-height: 1.4;
  border-left: 3px solid #d4a840;
}
.pi-html-root .pi-demand-card {
  background: #f5f3ef;
  border-radius: 16px;
  padding: 16px 18px;
  flex: 1;
}
.pi-html-root .pi-demand-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  gap: 8px;
}
.pi-html-root .pi-demand-row:last-of-type { border-bottom: none; }
.pi-html-root .pi-demand-label {
  font-size: 12px;
  color: #555;
  flex: 1;
}
.pi-html-root .pi-demand-value {
  font-size: 11px;
  color: #777;
  text-align: right;
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}
.pi-html-root .pi-green-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #5aaa5a;
  flex-shrink: 0;
}
.pi-html-root .pi-demand-note {
  font-size: 11px;
  color: #aaa;
  font-style: italic;
  margin-top: 10px;
  line-height: 1.4;
}
.pi-html-root .pi-opportunity-card {
  background: #2a3a32;
  border-radius: 16px;
  padding: 18px 18px 16px;
  flex: 1;
}
.pi-html-root .pi-opportunity-card .pi-section-title { color: #7aaa8a; }
.pi-html-root .pi-price-arrow {
  font-size: 26px;
  font-weight: 600;
  color: white;
  margin-bottom: 10px;
  letter-spacing: -0.5px;
}
.pi-html-root .pi-price-arrow .pi-arrow { color: #7aaa8a; }
.pi-html-root .pi-opp-detail {
  font-size: 11.5px;
  color: rgba(255,255,255,0.65);
  line-height: 1.5;
  margin-bottom: 6px;
}
.pi-html-root .pi-opp-detail strong {
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}
.pi-html-root .pi-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.8);
  pointer-events: none;
  user-select: none;
}
@media (max-width: 1023px) {
  .pi-html-root .pi-panels { flex-direction: column; min-height: 0; }
  .pi-html-root .pi-left-panel,
  .pi-html-root .pi-right-panel { flex: 0 0 auto; }
}
`

/** Card 09 — AI Insights dashboard (matches supplied HTML; scoped under .aid-html-root). */
const AI_INSIGHTS_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
.aid-html-root *, .aid-html-root *::before, .aid-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.aid-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.aid-html-root .aid-outer-card {
  width: 100%;
  max-width: 960px;
  min-width: 0;
  background: rgba(255,255,255,0.50);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  border: 1px solid rgba(255,255,255,0.68);
  border-radius: 26px;
  padding: 12px;
  box-shadow: 0 8px 48px rgba(0,0,0,0.13);
  overflow: hidden;
}
.aid-html-root .aid-dashboard {
  display: flex;
  gap: 10px;
  min-height: 460px;
  flex: 1;
  min-width: 0;
}
.aid-html-root .aid-left-panel {
  width: 210px;
  flex-shrink: 0;
  background: #f5f3ef;
  border-radius: 18px;
  padding: 18px 15px 13px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  min-width: 0;
}
.aid-html-root .aid-panel-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 16px;
}
.aid-html-root .aid-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
  min-height: 0;
}
.aid-html-root .aid-user-row {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 7px;
}
.aid-html-root .aid-user-bubble {
  background: #e8e4dc;
  border-radius: 14px 14px 3px 14px;
  padding: 8px 11px;
  font-size: 12px;
  color: #444;
  line-height: 1.45;
  max-width: 148px;
}
.aid-html-root .aid-user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #c8b8a8, #d8c8b8);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.aid-html-root .aid-ai-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}
.aid-html-root .aid-ai-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #c8c4bc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.aid-html-root .aid-ai-text {
  font-size: 12px;
  color: #555;
  line-height: 1.55;
  padding-top: 1px;
}
.aid-html-root .aid-loading-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 0 0;
}
.aid-html-root .aid-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #ddd;
  border-top-color: #888;
  border-radius: 50%;
  animation: aid-insights-spin 0.9s linear infinite;
}
@keyframes aid-insights-spin { to { transform: rotate(360deg); } }
.aid-html-root .aid-loading-text {
  font-size: 12px;
  color: #888;
  text-align: center;
  line-height: 1.5;
}
.aid-html-root .aid-loading-sub {
  font-size: 11px;
  color: #bbb;
  margin-top: -4px;
}
.aid-html-root .aid-input-bar {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #edeae4;
  border-radius: 28px;
  padding: 7px 7px 7px 13px;
  margin-top: 14px;
  flex-shrink: 0;
}
.aid-html-root .aid-input-bar input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: #888;
  outline: none;
  min-width: 0;
}
.aid-html-root .aid-input-bar input::placeholder { color: #c0bcb6; }
.aid-html-root .aid-send-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #b0aba3;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.aid-html-root .aid-right-grid {
  flex: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px;
  min-width: 0;
  min-height: 0;
}
.aid-html-root .aid-section-card {
  background: #fdfcfb;
  border-radius: 16px;
  padding: 15px 17px 14px;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: auto;
  overflow-y: auto;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 1px 6px rgba(0,0,0,0.04);
  min-height: 0;
  min-width: 0;
}
.aid-html-root .aid-section-title {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 12px;
  flex-shrink: 0;
}
.aid-html-root .aid-complaint-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}
.aid-html-root .aid-complaint-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid #f2efe9;
  min-width: 0;
}
.aid-html-root .aid-complaint-item:last-child { border-bottom: none; padding-bottom: 0; }
.aid-html-root .aid-complaint-item:first-child { padding-top: 0; }
.aid-html-root .aid-complaint-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.aid-html-root .aid-warn-icon {
  width: 20px;
  height: 20px;
  background: #fef0e0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 11px;
}
.aid-html-root .aid-complaint-text {
  font-size: 12.5px;
  color: #3a3a3a;
  font-weight: 400;
  line-height: 1.3;
  min-width: 0;
  overflow-wrap: anywhere;
}
.aid-html-root .aid-badge-mentioned {
  background: #fdecd8;
  color: #c05a18;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  max-width: 42%;
  text-align: center;
  box-sizing: border-box;
}
.aid-html-root .aid-feature-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
}
.aid-html-root .aid-feature-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 9px 0;
  border-bottom: 1px solid #f2efe9;
  min-width: 0;
}
.aid-html-root .aid-feature-item:last-child { border-bottom: none; padding-bottom: 0; }
.aid-html-root .aid-feature-item:first-child { padding-top: 0; }
.aid-html-root .aid-feature-left {
  display: flex;
  align-items: flex-start;
  gap: 7px;
  flex: 1;
  min-width: 0;
}
.aid-html-root .aid-feat-icon {
  font-size: 13px;
  flex-shrink: 0;
  line-height: 1.4;
  margin-top: 1px;
}
.aid-html-root .aid-feature-text {
  font-size: 12.5px;
  color: #3a3a3a;
  font-weight: 400;
  line-height: 1.35;
  min-width: 0;
  overflow-wrap: anywhere;
}
.aid-html-root .aid-badge-requested {
  background: #ddeaf8;
  color: #1e5a9e;
  border-radius: 20px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
  max-width: 42%;
  text-align: center;
  box-sizing: border-box;
}
.aid-html-root .aid-patterns-body {
  display: flex;
  gap: 14px;
  flex: 1;
  min-height: 0;
  min-width: 0;
}
.aid-html-root .aid-word-cloud-col {
  flex: 1.1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 2px;
}
.aid-html-root .aid-wc-word {
  font-weight: 700;
  color: #2a2a2a;
  line-height: 1.08;
  display: block;
}
.aid-html-root .aid-wc-word.aid-wc-lg { font-size: 20px; }
.aid-html-root .aid-wc-word.aid-wc-md { font-size: 20px; }
.aid-html-root .aid-wc-word.aid-wc-sm { font-size: 17px; color: #555; }
.aid-html-root .aid-wc-word.aid-wc-xs { font-size: 14px; color: #888; }
.aid-html-root .aid-wc-sublabel {
  font-size: 9px;
  color: #c0bcb6;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 10px;
}
.aid-html-root .aid-sentiment-col {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 4px;
}
.aid-html-root .aid-sent-sublabel {
  font-size: 9px;
  color: #c0bcb6;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.aid-html-root .aid-sent-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.aid-html-root .aid-sent-bar-track {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  height: 8px;
  background: #f0ede8;
  border-radius: 6px;
  overflow: hidden;
  box-sizing: border-box;
}
.aid-html-root .aid-sent-bar-fill {
  height: 100%;
  border-radius: 6px;
}
.aid-html-root .aid-sent-bar-fill.aid-sent-positive { background: #4cba74; width: 68%; }
.aid-html-root .aid-sent-bar-fill.aid-sent-neutral { background: #b8b4ae; width: 22%; }
.aid-html-root .aid-sent-bar-fill.aid-sent-negative { background: #e8704a; width: 10%; }
.aid-html-root .aid-sent-label {
  font-size: 11px;
  font-weight: 500;
}
.aid-html-root .aid-sent-label.aid-sent-positive { color: #3a9e5a; }
.aid-html-root .aid-sent-label.aid-sent-neutral { color: #888; }
.aid-html-root .aid-sent-label.aid-sent-negative { color: #c85030; }
.aid-html-root .aid-product-snapshot-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}
.aid-html-root .aid-product-img-wrap {
  flex: 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f0ece5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  position: relative;
}
.aid-html-root .aid-product-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.aid-html-root .aid-product-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  flex-shrink: 0;
}
.aid-html-root .aid-badge-issue {
  background: #fdecd8;
  color: #c05a18;
  border-radius: 20px;
  padding: 4px 11px;
  font-size: 10px;
  font-weight: 600;
}
.aid-html-root .aid-badge-req {
  background: #ddeaf8;
  color: #1e5a9e;
  border-radius: 20px;
  padding: 4px 11px;
  font-size: 10px;
  font-weight: 600;
}
@media (max-width: 900px) {
  .aid-html-root .aid-dashboard { flex-direction: column; height: auto; min-height: 0; }
  .aid-html-root .aid-left-panel { width: 100%; flex-shrink: 0; }
  .aid-html-root .aid-right-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
}
  /* ✅ ONE FIX FOR ALL CARDS */


`

/** Inline SVG assets for card 10 Market Expansion preview (matches reference HTML). */
const MEX_FLAG_DE = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1IDMiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIzIiBmaWxsPSIjMDAwIi8+CjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjIiIHk9IjEiIGZpbGw9IiNERDAwMDAiLz4KPHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMSIgeT0iMiIgZmlsbD0iI0ZGQ0UwMCIvPgo8L3N2Zz4=`
const MEX_FLAG_UAE = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDMiPgo8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSIxIiBmaWxsPSIjMDA5QTQ0Ii8+CjxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjEiIHk9IjEiIGZpbGw9IiNGRkZGRkYiLz4KPHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iMSIgeT0iMiIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB3aWR0aD0iMS41IiBoZWlnaHQ9IjMiIGZpbGw9IiNFRjMzNDAiLz4KPC9zdmc+`
const MEX_FLAG_AU = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCAzMCI+CjxyZWN0IHdpZHRoPSI2MCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzAwMDA4QiIvPgo8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMzAiIGhlaWdodD0iMTUiIGZpbGw9IiMwMTIxNjkiLz4KPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMzAiIHkyPSIxNSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjYiLz4KPGxpbmUgeDE9IjMwIiB5MT0iMCIgeDI9IjAiIHkyPSIxNSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjYiLz4KPGxpbmUgeDE9IjAiIHkxPSIwIiB4Mj0iMzAiIHkyPSIxNSIgc3Ryb2tlPSIjQzgxMDJFIiBzdHJva2Utd2lkdGg9IjQiLz4KPGxpbmUgeDE9IjMwIiB5MT0iMCIgeDI9IjAiIHkyPSIxNSIgc3Ryb2tlPSIjQzgxMDJFIiBzdHJva2Utd2lkdGg9IjQiLz4KPHJlY3QgeD0iMTIiIHk9IjAiIHdpZHRoPSI2IiBoZWlnaHQ9IjE1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHg9IjAiIHk9IjQuNSIgd2lkdGg9IjMwIiBoZWlnaHQ9IjYiIGZpbGw9IiNmZmYiLz4KPHJlY3QgeD0iMTMuNSIgeT0iMCIgd2lkdGg9IjMiIGhlaWdodD0iMTUiIGZpbGw9IiNDODEwMkUiLz4KPHJlY3QgeD0iMCIgeT0iNiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMiIGZpbGw9IiNDODEwMkUiLz4KPGNpcmNsZSBjeD0iNDUiIGN5PSI3IiByPSIyLjUiIGZpbGw9IiNmZmYiLz4KPGNpcmNsZSBjeD0iNTMiIGN5PSIxMyIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSI0NSIgY3k9IjIyIiByPSIyLjUiIGZpbGw9IiNmZmYiLz4KPGNpcmNsZSBjeD0iMzciIGN5PSIxNCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjI0IiByPSIxLjUiIGZpbGw9IiNmZmYiLz4KPHBvbHlnb24gcG9pbnRzPSI5LDE3IDEwLjIsMjEgMTQsMjEgMTEsMjMuMiAxMi4yLDI3IDksMjUgNS44LDI3IDcsMjMuMiA0LDIxIDcuOCwyMSIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=`
const MEX_LOGO_GOOGLE = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik00My42IDIwSDI0djhoMTEuM0MzMy42IDMzLjEgMjkuMyAzNiAyNCAzNmMtNi42IDAtMTItNS40LTEyLTEyczUuNC0xMiAxMi0xMmMzIDAgNS44IDEuMSA3LjkgM2w1LjctNS43QzM0IDYuMSAyOS4zIDQgMjQgNCAxMi45IDQgNCAxMi45IDQgMjRzOC45IDIwIDIwIDIwYzExIDAgMjAtOCAyMC0yMCAwLTEuMy0uMi0yLjctLjQtNHoiLz4KPHBhdGggZmlsbD0iI0ZGM0QwMCIgZD0iTTYuMyAxNC43bDYuNiA0LjhDMTQuNSAxNS4xIDE4LjkgMTIgMjQgMTJjMyAwIDUuOCAxLjEgNy45IDNsNS43LTUuN0MzNCA2LjEgMjkuMyA0IDI0IDQgMTYuMyA0IDkuNiA4LjMgNi4zIDE0Ljd6Ii8+CjxwYXRoIGZpbGw9IiM0Q0FGNTAiIGQ9Ik0yNCA0NGM1LjIgMCA5LjktMS45IDEzLjUtNS4xbC02LjItNS4yQzI5LjMgMzUuMyAyNi44IDM2IDI0IDM2Yy01LjIgMC05LjYtMy40LTExLjItOGwtNi41IDVDOS44IDQwIDE2LjQgNDQgMjQgNDR6Ii8+CjxwYXRoIGZpbGw9IiMxOTc2RDIiIGQ9Ik00My42IDIwSDI0djhoMTEuM2MtLjkgMi40LTIuNSA0LjUtNC41IDUuOWw2LjIgNS4yQzQxLjMgMzUuNiA0NCAzMC4yIDQ0IDI0YzAtMS4zLS4yLTIuNy0uNC00eiIvPgo8L3N2Zz4=`
const MEX_LOGO_FB = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9IiMxODc3RjIiLz4KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMyIDI0aC01djE2aC02VjI0aC00di02aDR2LTNjMC00IDIuMy02IDYtNiAxLjcgMCAzLjUuMyAzLjUuM1YxNWgtMmMtMS45IDAtMi41IDEuMi0yLjUgMi40VjE4aDVsLS44IDZ6Ii8+Cjwvc3ZnPg==`
const MEX_LOGO_TIKTOK = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxyZWN0IHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9IiMwMDAiLz4KPHBhdGggZmlsbD0iIzY5QzlEMCIgZD0iTTM0IDE2LjVjLTIuMi0xLjQtMy43LTMuNy00LTYuNWgtNXYyNWMwIDIuMi0xLjggNC00IDRzLTQtMS44LTQtNCAxLjgtNCA0LTRjLjQgMCAuOC4xIDEuMi4yVjI2Yy0uNC0uMS0uOC0uMS0xLjItLjEtNSAwLTkgNC05IDlzNCA5IDkgOSA5LTQgOS05VjIzLjRjMiAxLjMgNC4zIDIuMSA2LjggMi4xdi01Yy0xLjIgMC0yLjItLjQtMi44LTF2LTN6Ii8+CjxwYXRoIGZpbGw9IiNFRTFENTIiIGQ9Ik0zNi44IDE5LjV2NWMtMi41IDAtNC44LS44LTYuOC0yLjFWMzVjMCA1LTQgOS05IDlzLTktNC05LTkgNC05IDktOWMuNCAwIC44IDAgMS4yLjF2NS4yYy0uNC0uMS0uOC0uMi0xLjItLjItMi4yIDAtNCAxLjgtNCA0czEuOCA0IDQgNCA0LTEuOCA0LTRWMTBoNWMuMyAyLjggMS44IDUuMSA0IDYuNWwyLjggM3oiLz4KPC9zdmc+`

/** Card 10 — Market Expansion AI (matches supplied HTML; scoped under .mex-html-root). */
const MARKET_EXPANSION_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
.mex-html-root *, .mex-html-root *::before, .mex-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.mex-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.mex-html-root .mex-outer-card {
  width: 100%;
  max-width: 920px;
  min-width: 0;
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  overflow: hidden;
}
.mex-html-root .mex-panels { display: flex; gap: 10px; min-height: 500px; min-width: 0; }
.mex-html-root .mex-left-panel {
  flex: 0 0 230px;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 20px 16px 14px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.mex-html-root .mex-panel-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 16px;
}
.mex-html-root .mex-chat-area { flex: 1; display: flex; flex-direction: column; gap: 14px; min-height: 0; }
.mex-html-root .mex-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 18px 18px 4px 18px;
  padding: 10px 13px;
  font-size: 13px;
  color: #444;
  line-height: 1.45;
  max-width: 90%;
}
.mex-html-root .mex-ai-message { display: flex; gap: 8px; align-items: flex-start; }
.mex-html-root .mex-ai-icon {
  width: 26px;
  height: 26px;
  min-width: 26px;
  background: #c8c4bc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mex-html-root .mex-ai-text { font-size: 13px; color: #444; line-height: 1.5; }
.mex-html-root .mex-loading-area { display: flex; align-items: center; gap: 9px; padding: 2px 0; }
.mex-html-root .mex-spinner {
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 2px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: mex-spin 0.9s linear infinite;
}
@keyframes mex-spin { to { transform: rotate(360deg); } }
.mex-html-root .mex-loading-text { font-size: 13px; color: #888; }
.mex-html-root .mex-loading-dots::after {
  content: '';
  animation: mex-dots 1.4s steps(4, end) infinite;
}
@keyframes mex-dots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
}
.mex-html-root .mex-input-bar {
  margin-top: 14px;
  background: #edeae4;
  border-radius: 28px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.mex-html-root .mex-icon-btn {
  background: none;
  border: none;
  cursor: default;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
}
.mex-html-root .mex-input-bar input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 13px;
  color: #555;
  min-width: 0;
}
.mex-html-root .mex-input-bar input::placeholder { color: #bbb; }
.mex-html-root .mex-send-btn {
  width: 26px;
  height: 26px;
  background: #aaa;
  border: none;
  border-radius: 50%;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mex-html-root .mex-right-panel {
  flex: 1;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.mex-html-root .mex-right-panel > .mex-panel-label { margin-bottom: 14px; }
.mex-html-root .mex-right-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px;
  flex: 1;
  min-height: 0;
  min-width: 0;
}
.mex-html-root .mex-section-card {
  background: #edeae4;
  border-radius: 12px;
  padding: 13px 14px;
  min-width: 0;
  overflow-x: auto;
  overflow-y: visible;
}
.mex-html-root .mex-section-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 12px;
}
.mex-html-root .mex-market-row {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
  min-width: 0;
}
.mex-html-root .mex-market-row:last-child { margin-bottom: 0; }
.mex-html-root .mex-flag-wrap {
  width: 28px;
  height: 19px;
  min-width: 28px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.18);
  display: flex;
  align-items: center;
}
.mex-html-root .mex-flag-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mex-html-root .mex-country-name {
  font-size: 12px;
  font-weight: 500;
  color: #444;
  min-width: 0;
  flex: 0 1 auto;
}
.mex-html-root .mex-badge {
  font-size: 9px;
  font-weight: 600;
  padding: 3px 7px;
  border-radius: 20px;
  white-space: normal;
  line-height: 1.25;
  max-width: 100%;
  flex: 1 1 auto;
  min-width: 0;
  box-sizing: border-box;
}
.mex-html-root .mex-badge-green { background: #b8d4c8; color: #2e6e55; }
.mex-html-root .mex-badge-blue { background: #c8d4e0; color: #2e4e6e; }
.mex-html-root .mex-shimmer-row {
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.4;
  min-width: 0;
}
.mex-html-root .mex-shimmer-box {
  height: 14px;
  min-width: 0;
  background: linear-gradient(90deg, #ddd8d0 25%, #e8e4dc 50%, #ddd8d0 75%);
  background-size: 200% 100%;
  animation: mex-shimmer 1.5s infinite;
  border-radius: 4px;
}
@keyframes mex-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
.mex-html-root .mex-demand-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 9px;
  min-width: 0;
}
.mex-html-root .mex-demand-row:last-child { margin-bottom: 0; }
.mex-html-root .mex-logo-wrap {
  width: 20px;
  height: 20px;
  min-width: 20px;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mex-html-root .mex-logo-wrap img { width: 100%; height: 100%; object-fit: contain; }
.mex-html-root .mex-demand-text {
  font-size: 11.5px;
  color: #555;
  line-height: 1.4;
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}
.mex-html-root .mex-demand-highlight { font-weight: 600; color: #333; }
.mex-html-root .mex-comp-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  min-width: 0;
}
.mex-html-root .mex-comp-row:last-child { margin-bottom: 0; }
.mex-html-root .mex-comp-flag-wrap {
  width: 28px;
  height: 19px;
  min-width: 28px;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.18);
}
.mex-html-root .mex-comp-flag-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mex-html-root .mex-comp-info { flex: 1; min-width: 0; }
.mex-html-root .mex-comp-name { font-size: 11.5px; font-weight: 500; color: #444; }
.mex-html-root .mex-comp-cpc { font-size: 10px; color: #aaa; }
.mex-html-root .mex-comp-dots { display: flex; gap: 3px; flex-shrink: 0; }
.mex-html-root .mex-dot { width: 7px; height: 7px; border-radius: 50%; }
.mex-html-root .mex-dot-filled { background: #888; }
.mex-html-root .mex-dot-empty { background: #d4d0c8; }
.mex-html-root .mex-expansion-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 0;
}
.mex-html-root .mex-exp-card {
  flex: 1;
  background: rgba(255,255,255,0.55);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  border: 1px solid rgba(255,255,255,0.7);
  align-items: center;
  min-width: 0;
}
.mex-html-root .mex-exp-flag-wrap {
  width: 100%;
  height: 48px;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}
.mex-html-root .mex-exp-flag-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.mex-html-root .mex-priority-badge {
  font-size: 9px;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 20px;
  background: #b8d4c8;
  color: #2e6e55;
}
.mex-html-root .mex-priority-badge-2 { background: #c8d4e0; color: #2e4e6e; }
.mex-html-root .mex-exp-text {
  font-size: 10.5px;
  color: #555;
  line-height: 1.4;
  text-align: center;
  overflow-wrap: anywhere;
}
.mex-html-root .mex-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.8);
  pointer-events: none;
  user-select: none;
}
@media (max-width: 900px) {
  .mex-html-root .mex-panels { flex-direction: column; min-height: 0; }
  .mex-html-root .mex-left-panel { flex: 0 0 auto; }
  .mex-html-root .mex-right-grid { grid-template-columns: 1fr; }
}



`

/** Card 02 — Revenue Attribution dashboard (matches supplied HTML; scoped under .rad-html-root). */
const REVENUE_ATTRIBUTION_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');
.rad-html-root *, .rad-html-root *::before, .rad-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.rad-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.rad-html-root .rad-outer-card {
  width: 100%;
  max-width: 880px;
  min-width: 0;
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  overflow: hidden;
}
.rad-html-root .rad-panels { display: flex; gap: 10px; min-height: 490px; min-width: 0; }
.rad-html-root .rad-left-panel {
  flex: 1;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 22px 18px 16px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.rad-html-root .rad-panel-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 18px;
}
.rad-html-root .rad-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
}
.rad-html-root .rad-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 18px 18px 4px 18px;
  padding: 10px 14px;
  font-size: 13px;
  color: #333;
  max-width: 90%;
  line-height: 1.45;
}
.rad-html-root .rad-ai-message { display: flex; align-items: flex-start; gap: 10px; }
.rad-html-root .rad-ai-icon {
  width: 26px;
  height: 26px;
  min-width: 26px;
  background: #c8c4bc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.rad-html-root .rad-ai-text {
  font-size: 13px;
  color: #444;
  line-height: 1.5;
  padding-top: 3px;
}
.rad-html-root .rad-loading-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0 4px 36px;
}
.rad-html-root .rad-spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: rad-spin 0.9s linear infinite;
}
@keyframes rad-spin { to { transform: rotate(360deg); } }
.rad-html-root .rad-loading-text { font-size: 13px; color: #888; }
.rad-html-root .rad-input-bar {
  background: #edeae4;
  border-radius: 28px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
  flex-shrink: 0;
}
.rad-html-root .rad-icon-btn {
  background: none;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  padding: 2px;
  flex-shrink: 0;
}
.rad-html-root .rad-icon-btn svg { width: 17px; height: 17px; }
.rad-html-root .rad-text-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: #555;
  min-width: 0;
}
.rad-html-root .rad-text-input::placeholder { color: #bbb; }
.rad-html-root .rad-send-btn {
  width: 28px;
  height: 28px;
  min-width: 28px;
  background: #aaa;
  border: none;
  border-radius: 50%;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}
.rad-html-root .rad-send-btn svg { width: 13px; height: 13px; }
.rad-html-root .rad-right-panel {
  flex: 1.35;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
  min-height: 0;
}
.rad-html-root .rad-right-row { display: flex; gap: 10px; flex: 1; min-height: 0; }
.rad-html-root .rad-section-card {
  background: #edeae4;
  border-radius: 14px;
  padding: 14px 15px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.rad-html-root .rad-section-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 11px;
}
.rad-html-root .rad-channel-card { flex: 1.4; min-width: 0; }
.rad-html-root .rad-channel-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; }
.rad-html-root .rad-channel-row + .rad-channel-row { border-top: 1px solid rgba(0,0,0,0.055); }
.rad-html-root .rad-channel-logo-wrap {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rad-html-root .rad-channel-logo-wrap svg { width: 30px; height: 30px; }
.rad-html-root .rad-channel-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
}
.rad-html-root .rad-roas-left { display: flex; flex-direction: column; }
.rad-html-root .rad-roas-lbl { font-size: 9.5px; color: #bbb; font-weight: 400; }
.rad-html-root .rad-roas-val { font-size: 14px; color: #b0aca6; font-weight: 500; line-height: 1.2; }
.rad-html-root .rad-roas-right { display: flex; flex-direction: column; align-items: flex-end; }
.rad-html-root .rad-real-lbl { font-size: 9.5px; color: #999; font-weight: 500; }
.rad-html-root .rad-real-val { font-size: 16px; font-weight: 700; line-height: 1.2; }
.rad-html-root .rad-val-red { color: #d9501e; }
.rad-html-root .rad-val-green { color: #2e8a50; }
.rad-html-root .rad-revenue-card { flex: 1; min-width: 145px; }
.rad-html-root .rad-rev-main {
  font-size: 30px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
  letter-spacing: -0.5px;
  margin-bottom: 3px;
}
.rad-html-root .rad-rev-platform {
  font-size: 13px;
  color: #c0bcb6;
  text-decoration: line-through;
  font-weight: 500;
  margin-bottom: 4px;
}
.rad-html-root .rad-rev-label { font-size: 10px; color: #aaa; margin-bottom: 10px; }
.rad-html-root .rad-overclaimed {
  background: #fde8e4;
  color: #c83020;
  font-size: 10px;
  font-weight: 600;
  border-radius: 20px;
  padding: 4px 10px;
  display: inline-block;
}
.rad-html-root .rad-overlap-card { flex: 1; min-width: 0; }
.rad-html-root .rad-venn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}
.rad-html-root .rad-venn-svg {
  width: 100%;
  max-width: 150px;
  height: auto;
  min-height: 100px;
  display: block;
  margin: 0 auto;
  overflow: visible;
}
.rad-html-root .rad-overlap-note { font-size: 10px; color: #999; text-align: center; line-height: 1.45; }
.rad-html-root .rad-profit-card { flex: 1.2; min-width: 0; }
.rad-html-root .rad-profit-row { display: flex; align-items: center; gap: 9px; padding: 7px 0; }
.rad-html-root .rad-profit-row + .rad-profit-row { border-top: 1px solid rgba(0,0,0,0.055); }
.rad-html-root .rad-profit-logo-wrap {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.rad-html-root .rad-profit-logo-wrap svg { width: 28px; height: 28px; }
.rad-html-root .rad-profit-info { flex: 1; min-width: 0; }
.rad-html-root .rad-profit-name { font-size: 10.5px; font-weight: 600; color: #333; line-height: 1.3; }
.rad-html-root .rad-profit-desc { font-size: 9px; color: #aaa; margin-top: 1px; line-height: 1.3; }
.rad-html-root .rad-profit-badge {
  font-size: 9.5px;
  font-weight: 600;
  border-radius: 20px;
  padding: 3px 10px;
  white-space: nowrap;
  flex-shrink: 0;
}
.rad-html-root .rad-badge-scale { background: #d4eedf; color: #1e7a46; }
.rad-html-root .rad-badge-hold { background: #fdefd4; color: #b07010; }
.rad-html-root .rad-badge-review { background: #fde0d8; color: #c04020; }
.rad-html-root .rad-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.8);
  pointer-events: none;
}
@media (max-width: 900px) {
  .rad-html-root .rad-panels { flex-direction: column; min-height: 0; align-items: stretch; }
  .rad-html-root .rad-left-panel { flex: 0 0 auto; width: 100%; min-width: 0; }
  .rad-html-root .rad-right-panel { flex: 1 1 auto; width: 100%; min-width: 0; }
  .rad-html-root .rad-right-row { flex-direction: column; flex: 0 1 auto; min-height: 0; }
  .rad-html-root .rad-section-card { flex: none !important; width: 100%; min-width: 0; }
  .rad-html-root .rad-revenue-card { min-width: 0; }
  .rad-html-root .rad-channel-info { flex-wrap: wrap; row-gap: 8px; }
  .rad-html-root .rad-roas-right { align-items: flex-start; }
}
@media (max-width: 420px) {
  .rad-html-root .rad-channel-info { flex-direction: column; align-items: stretch; gap: 8px; }
  .rad-html-root .rad-roas-right { align-items: flex-start; }
  .rad-html-root .rad-profit-row { flex-wrap: wrap; row-gap: 8px; }
  .rad-html-root .rad-profit-badge { margin-left: auto; white-space: normal; }
}
`

/** Card 06 — Inventory AI dashboard (matches supplied HTML; scoped under .inv-html-root). */
const INVENTORY_AI_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
.inv-html-root *, .inv-html-root *::before, .inv-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.inv-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.inv-html-root .inv-outer-card {
  width: 100%;
  max-width: 900px;
  min-width: 0;
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  overflow: hidden;
}
.inv-html-root .inv-panels { display: flex; gap: 10px; min-height: 500px; min-width: 0; }
.inv-html-root .inv-left-panel {
  flex: 0 0 220px;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 18px 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  min-height: 0;
}
.inv-html-root .inv-panel-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.inv-html-root .inv-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
}
.inv-html-root .inv-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 18px 18px 4px 18px;
  padding: 10px 14px;
  font-size: 13px;
  color: #333;
  max-width: 90%;
  line-height: 1.45;
}
.inv-html-root .inv-timestamp {
  font-size: 10px;
  color: #bbb;
  text-align: right;
  margin-top: 4px;
}
.inv-html-root .inv-ai-row { display: flex; align-items: flex-start; gap: 8px; }
.inv-html-root .inv-ai-icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #c8c4bc;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inv-html-root .inv-ai-icon svg { width: 14px; height: 14px; }
.inv-html-root .inv-ai-message { font-size: 13px; color: #444; line-height: 1.5; }
.inv-html-root .inv-dots-row { display: flex; gap: 5px; padding: 4px 0 4px 34px; }
.inv-html-root .inv-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ccc;
}
.inv-html-root .inv-dot.inv-dot-active { background: #999; }
.inv-html-root .inv-loading-area { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
.inv-html-root .inv-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #ccc;
  border-top-color: #888;
  border-radius: 50%;
  animation: inv-spin 0.9s linear infinite;
  flex-shrink: 0;
}
@keyframes inv-spin { to { transform: rotate(360deg); } }
.inv-html-root .inv-loading-text { font-size: 12px; color: #888; }
.inv-html-root .inv-input-bar {
  background: #edeae4;
  border-radius: 28px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.inv-html-root .inv-input-bar input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 12px;
  color: #666;
  font-family: 'DM Sans', sans-serif;
  min-width: 0;
}
.inv-html-root .inv-input-bar input::placeholder { color: #aaa; }
.inv-html-root .inv-icon-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: default;
  color: #999;
  border-radius: 50%;
  flex-shrink: 0;
}
.inv-html-root .inv-send-btn {
  width: 26px;
  height: 26px;
  background: #aaa;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  flex-shrink: 0;
}
.inv-html-root .inv-right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-width: 0;
  min-height: 0;
}
.inv-html-root .inv-results-header {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  padding: 4px 2px;
}
.inv-html-root .inv-results-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px;
  flex: 1;
  min-height: 0;
  min-width: 0;
}
.inv-html-root .inv-section-card {
  background: #fdfcfb;
  border-radius: 14px;
  padding: 14px;
  border: 1px solid rgba(0,0,0,0.05);
  min-height: 0;
  min-width: 0;
  overflow-x: auto;
  overflow-y: visible;
}
.inv-html-root .inv-section-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.inv-html-root .inv-product-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
  border-bottom: 1px solid #f0ede8;
}
.inv-html-root .inv-product-row:last-child { border-bottom: none; }
.inv-html-root .inv-product-thumb {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #f0ede8;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.inv-html-root .inv-product-thumb img { width: 100%; height: 100%; object-fit: cover; }
.inv-html-root .inv-product-info { flex: 1; min-width: 0; }
.inv-html-root .inv-product-name {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.inv-html-root .inv-product-sub { font-size: 10px; color: #aaa; }
.inv-html-root .inv-badge {
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  white-space: nowrap;
  flex-shrink: 0;
}
.inv-html-root .inv-badge-units-high { background: #ffe5d0; color: #c0622a; }
.inv-html-root .inv-badge-units-low { background: #d4edda; color: #2d6e44; }
.inv-html-root .inv-badge-units-blue { background: #d0e4ff; color: #2a54a0; }
.inv-html-root .inv-vel-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  border-bottom: 1px solid #f0ede8;
}
.inv-html-root .inv-vel-row:last-child { border-bottom: none; }
.inv-html-root .inv-vel-info { flex: 1; min-width: 0; }
.inv-html-root .inv-vel-name { font-size: 12px; font-weight: 500; color: #333; }
.inv-html-root .inv-vel-sub { font-size: 10px; color: #aaa; }
.inv-html-root .inv-vel-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 0;
  flex-shrink: 0;
  max-width: 40%;
}
.inv-html-root .inv-vel-label { font-size: 10px; color: #888; }
.inv-html-root .inv-vel-bar-wrap {
  width: 100%;
  max-width: 88px;
  min-width: 0;
  height: 5px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}
.inv-html-root .inv-vel-bar { height: 100%; border-radius: 3px; }
.inv-html-root .inv-bar-green { background: #4caf7d; }
.inv-html-root .inv-bar-blue { background: #5b9bd5; }
.inv-html-root .inv-bar-orange { background: #e8a83a; }
.inv-html-root .inv-stockout-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #f0ede8;
}
.inv-html-root .inv-stockout-row:last-child { border-bottom: none; }
.inv-html-root .inv-stockout-info { flex: 1; min-width: 0; }
.inv-html-root .inv-stockout-main { font-size: 12px; font-weight: 500; color: #333; }
.inv-html-root .inv-stockout-sub { font-size: 10px; color: #aaa; }
.inv-html-root .inv-badge-urgent {
  background: #fff0d0;
  color: #c07a10;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  white-space: nowrap;
}
.inv-html-root .inv-badge-review {
  background: #fff3cd;
  color: #a07020;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 20px;
  white-space: nowrap;
}
.inv-html-root .inv-stockout-urgent-wrap {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.inv-html-root .inv-reorder-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
  border-bottom: 1px solid #f0ede8;
}
.inv-html-root .inv-reorder-row:last-child { border-bottom: none; }
.inv-html-root .inv-reorder-info { flex: 1; min-width: 0; }
.inv-html-root .inv-reorder-main {
  font-size: 12px;
  font-weight: 500;
  color: #333;
  line-height: 1.35;
  overflow-wrap: anywhere;
}
.inv-html-root .inv-reorder-sub { font-size: 10px; color: #aaa; }
.inv-html-root .inv-badge-actnow {
  background: #c8e6c9;
  color: #2e6e44;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
}
.inv-html-root .inv-badge-schedule {
  background: #ddd;
  color: #666;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 20px;
  white-space: nowrap;
}
.inv-html-root .inv-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.8);
  pointer-events: none;
}
@media (max-width: 900px) {
  .inv-html-root .inv-panels { flex-direction: column; min-height: 0; }
  .inv-html-root .inv-results-grid { grid-template-columns: 1fr; }
}
`

/** Card 08 — Competitor Social / Intelligence (matches supplied HTML; scoped under .csi-html-root). */
const COMPETITOR_SOCIAL_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
.csi-html-root *, .csi-html-root *::before, .csi-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.csi-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.csi-html-root .csi-outer-card {
  width: 100%;
  max-width: 960px;
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
}
.csi-html-root .csi-top-tabs {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 10px;
  padding: 0 4px;
  flex-wrap: wrap;
}
.csi-html-root .csi-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background: transparent;
  color: #888;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.csi-html-root .csi-tab.csi-tab-active {
  background: rgba(255,255,255,0.75);
  color: #333;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}
.csi-html-root .csi-tab svg { width: 13px; height: 13px; flex-shrink: 0; }
.csi-html-root .csi-panels { display: flex; gap: 10px; min-height: 500px; }
.csi-html-root .csi-left-panel {
  width: 155px;
  min-width: 155px;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 16px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
}
.csi-html-root .csi-panel-label {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #bbb;
  margin-bottom: 4px;
}
.csi-html-root .csi-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  overflow-y: auto;
}
.csi-html-root .csi-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 14px 14px 3px 14px;
  padding: 9px 12px;
  font-size: 11.5px;
  color: #444;
  line-height: 1.45;
  max-width: 90%;
}
.csi-html-root .csi-ai-message-row { display: flex; align-items: flex-start; gap: 8px; }
.csi-html-root .csi-ai-icon {
  width: 24px;
  height: 24px;
  min-width: 24px;
  border-radius: 50%;
  background: #c8c4bc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.csi-html-root .csi-ai-text { font-size: 11.5px; color: #555; line-height: 1.5; }
.csi-html-root .csi-loading-area { display: flex; align-items: center; gap: 7px; padding: 4px 0; }
.csi-html-root .csi-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #ddd;
  border-top-color: #999;
  border-radius: 50%;
  animation: csi-spin 0.9s linear infinite;
  flex-shrink: 0;
}
@keyframes csi-spin { to { transform: rotate(360deg); } }
.csi-html-root .csi-loading-text { font-size: 11px; color: #999; }
.csi-html-root .csi-dots::after {
  content: '';
  animation: csi-dots 1.4s steps(3, end) infinite;
}
@keyframes csi-dots {
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
}
.csi-html-root .csi-input-bar {
  background: #edeae4;
  border-radius: 28px;
  padding: 7px 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;

}
.csi-html-root .csi-input-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: transparent;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  flex-shrink: 0;
}
.csi-html-root .csi-input-field {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  color: #666;
  min-width: 0;
}
.csi-html-root .csi-input-field::placeholder { color: #bbb; }
.csi-html-root .csi-send-btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #bbb;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}
.csi-html-root .csi-center-panel {
  flex: 1;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 18px 16px 12px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.csi-html-root .csi-section-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 12px;
}
.csi-html-root .csi-comp-table { width: 100%; border-collapse: collapse; }
.csi-html-root .csi-comp-table th {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #bbb;
  padding: 0 4px 6px;
  text-align: left;
  white-space: nowrap;
}
.csi-html-root .csi-comp-table th:last-child { text-align: center; }
.csi-html-root .csi-comp-table td {
  padding: 5px 4px;
  font-size: 10px;
  color: #555;
  vertical-align: middle;
  border-top: 1px solid rgba(0,0,0,0.04);
}
.csi-html-root .csi-comp-table tr:first-child td { border-top: none; }
.csi-html-root .csi-brand-cell { display: flex; align-items: center; gap: 8px; }
.csi-html-root .csi-brand-thumb {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden;
  background: #e0ddd7;
  flex-shrink: 0;
  position: relative;
}
.csi-html-root .csi-brand-thumb img { width: 100%; height: 100%; object-fit: cover; }
.csi-html-root .csi-brand-name { font-size: 11px; font-weight: 500; color: #444; line-height: 1.2; }
.csi-html-root .csi-row-num {
  font-size: 10px;
  color: #ccc;
  font-weight: 500;
  width: 14px;
  text-align: center;
  display: inline-block;
}
.csi-html-root .csi-platform-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 10px;
  color: #666;
  background: rgba(0,0,0,0.04);
  border-radius: 20px;
  padding: 2px 7px;
  white-space: nowrap;
}
.csi-html-root .csi-engagement-val { font-size: 11px; color: #555; font-weight: 500; }
.csi-html-root .csi-ads-badge { font-size: 10px; color: #888; white-space: nowrap; }
.csi-html-root .csi-score-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  text-align: center;
  min-width: 32px;
}
.csi-html-root .csi-score-94 { background: #d4f0d4; color: #2a7a2a; }
.csi-html-root .csi-score-89 { background: #cce8f0; color: #1e5a74; }
.csi-html-root .csi-score-87 { background: #d8e8f4; color: #2a5070; }
.csi-html-root .csi-score-73 { background: #e8e8e8; color: #888; }
.csi-html-root .csi-skeleton-row td {
  padding: 8px 6px;
  border-top: 1px solid rgba(0,0,0,0.04);
}
.csi-html-root .csi-skeleton-line {
  height: 10px;
  background: linear-gradient(90deg, #e4e0d8 25%, #ece8e0 50%, #e4e0d8 75%);
  background-size: 200% 100%;
  animation: csi-shimmer 1.5s infinite;
  border-radius: 5px;
}
@keyframes csi-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
.csi-html-root .csi-skeleton-block {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #e4e0d8;
  flex-shrink: 0;
}
.csi-html-root .csi-skeleton-flex { display: flex; align-items: center; gap: 8px; }
.csi-html-root .csi-skeleton-col { flex: 1; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.csi-html-root .csi-table-footer {
  margin-top: auto;
  padding-top: 10px;
  font-size: 9.5px;
  color: #bbb;
  text-align: center;
  border-top: 1px solid rgba(0,0,0,0.05);
  line-height: 1.4;
}
.csi-html-root .csi-right-panel {
  width: 185px;
  min-width: 185px;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 16px 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
}
.csi-html-root .csi-angles-card {
  background: #edeae4;
  border-radius: 12px;
  padding: 12px 12px 10px;
}
.csi-html-root .csi-angles-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}
.csi-html-root .csi-angle-item {
  border-radius: 8px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
}
.csi-html-root .csi-angle-item.csi-angle-green { background: #c8e6c0; }
.csi-html-root .csi-angle-item.csi-angle-yellow { background: #e8e4b0; }
.csi-html-root .csi-angle-item.csi-angle-peach { background: #e8d4b8; }
.csi-html-root .csi-angle-name { font-size: 10.5px; font-weight: 600; color: #444; }
.csi-html-root .csi-angle-stat { font-size: 9.5px; color: #666; white-space: nowrap; }
.csi-html-root .csi-mini-bars {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 28px;
  margin-top: 8px;
  padding: 0 2px;
}
.csi-html-root .csi-mini-bar {
  flex: 1;
  border-radius: 2px 2px 0 0;
  min-width: 4px;
}
.csi-html-root .csi-chart-card {
  background: #edeae4;
  border-radius: 12px;
  padding: 12px 12px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.csi-html-root .csi-chart-label {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #aaa;
  margin-bottom: 6px;
}
.csi-html-root .csi-chart-brand { font-size: 9px; color: #e08060; font-weight: 600; margin-bottom: 2px; }
.csi-html-root .csi-chart-annotation { font-size: 9px; color: #888; margin-bottom: 8px; line-height: 1.3; }
.csi-html-root .csi-chart-annotation span { color: #e08060; font-weight: 600; }
.csi-html-root .csi-chart-wrap { position: relative; flex: 1; min-height: 90px; }
.csi-html-root .csi-y-axis {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  pointer-events: none;
  z-index: 1;
}
.csi-html-root .csi-y-axis span { font-size: 7.5px; color: #ccc; line-height: 1; }
.csi-html-root .csi-chart-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  padding-left: 18px;
  min-height: 80px;
}
.csi-html-root .csi-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.8);
  pointer-events: none;
  animation: csi-sparkle-pulse 2s ease-in-out infinite;
}
@keyframes csi-sparkle-pulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
}
@media (max-width: 900px) {
  .csi-html-root .csi-panels { flex-direction: column; min-height: 0; }
  .csi-html-root .csi-left-panel,
  .csi-html-root .csi-right-panel { width: 100%; min-width: 0; }
}
`

/** Card 07 — Ad Intelligence / competitor ads (matches supplied HTML; scoped under .cad-html-root). */
const AD_INTELLIGENCE_HTML_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
.cad-html-root *, .cad-html-root *::before, .cad-html-root *::after { box-sizing: border-box; margin: 0; padding: 0; }
.cad-html-root {
  font-family: 'DM Sans', sans-serif;
  margin: 0;
  -webkit-font-smoothing: antialiased;
}
.cad-html-root .cad-outer-card {
  width: 100%;
  max-width: 920px;
  min-width: 0;
  background: rgba(255,255,255,0.45);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.6);
  border-radius: 24px;
  padding: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.12);
  overflow: hidden;
}
.cad-html-root .cad-panels {
  display: flex;
  gap: 10px;
  min-height: min(520px, 50vh);
  min-width: 0;
  flex: 1;
  align-items: stretch;
}
.cad-html-root .cad-left-panel {
  flex: 0 0 24%;
  min-width: 0;
  min-height: 0;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 16px 12px 14px;
  display: flex;
  flex-direction: column;
}
.cad-html-root .cad-panel-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 14px;
}
.cad-html-root .cad-panel-suffix {
  color: #bbb;
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
}
.cad-html-root .cad-chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  min-height: 0;
  padding-bottom: 12px;
}
.cad-html-root .cad-user-bubble {
  align-self: flex-end;
  background: #e8e4dc;
  border-radius: 14px 14px 3px 14px;
  padding: 9px 12px;
  font-size: 11.5px;
  color: #444;
  line-height: 1.45;
  max-width: 90%;
}
.cad-html-root .cad-ai-message { display: flex; gap: 10px; align-items: flex-start; }
.cad-html-root .cad-ai-icon {
  width: 26px;
  height: 26px;
  min-width: 26px;
  border-radius: 50%;
  background: #c8c4bc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.cad-html-root .cad-ai-icon svg { width: 13px; height: 13px; }
.cad-html-root .cad-ai-text { font-size: 11.5px; color: #555; line-height: 1.5; }
.cad-html-root .cad-loading-area { display: flex; align-items: center; gap: 8px; padding: 4px 0; }
.cad-html-root .cad-spinner {
  width: 16px;
  height: 16px;
  min-width: 16px;
  border: 2px solid #ddd;
  border-top-color: #888;
  border-radius: 50%;
  animation: cad-spin 0.9s linear infinite;
}
@keyframes cad-spin { to { transform: rotate(360deg); } }
.cad-html-root .cad-loading-text { font-size: 11px; color: #999; }
.cad-html-root .cad-dots { display: inline-block; }
.cad-html-root .cad-dots::after {
  content: '';
  animation: cad-dots-ellipsis 1.4s steps(3, end) infinite;
}
@keyframes cad-dots-ellipsis {
  0% { content: ''; }
  33% { content: '.'; }
  66% { content: '..'; }
  100% { content: '...'; }
}
.cad-html-root .cad-input-bar {
  margin-top: 16px;
  background: #edeae4;
  border-radius: 28px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}
.cad-html-root .cad-icon-btn {
  width: 30px;
  height: 30px;
  border: none;
  background: transparent;
  border-radius: 50%;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  flex-shrink: 0;
}
.cad-html-root .cad-text-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 11.5px;
  color: #666;
  min-width: 0;
  
}
.cad-html-root .cad-text-input::placeholder { color: #bbb; }
.cad-html-root .cad-send-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #aaa;
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cad-html-root .cad-right-panel {
  flex: 1;
  min-width: 0;
  background: #f5f3ef;
  border-radius: 16px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.cad-html-root .cad-results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  flex-shrink: 0;
}
.cad-html-root .cad-results-label {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #888;
}
.cad-html-root .cad-cards-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
  gap: 8px;
  flex: 1;
  min-height: 0;
  min-width: 0;
  align-items: stretch;
}
.cad-html-root .cad-section-card {
  background: #edeae4;
  border-radius: 14px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 0;
  min-width: 0;
  height: 100%;
  overflow: hidden;
}
.cad-html-root .cad-section-fill {
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
}
.cad-html-root .cad-section-card.cad-section-balance .cad-section-fill {
  justify-content: center;
}
.cad-html-root .cad-card-title {
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  flex-shrink: 0;
  margin-bottom: 10px;
}
.cad-html-root .cad-ad-cards-row { display: flex; gap: 8px; }
.cad-html-root .cad-ad-card {
  flex: 1;
  min-width: 0;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0,0,0,0.06);
}
.cad-html-root .cad-ad-card-img-wrap {
  width: 100%;
  height: 80px;
  position: relative;
  overflow: hidden;
}
.cad-html-root .cad-ad-card-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.cad-html-root .cad-ad-card-footer {
  padding: 5px 7px 7px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.cad-html-root .cad-platform-row { display: flex; align-items: center; gap: 4px; }
.cad-html-root .cad-platform-icon {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.cad-html-root .cad-fb-icon { background: #1877F2; }
.cad-html-root .cad-tiktok-icon-wrap { background: #000; }
.cad-html-root .cad-run-time { font-size: 9px; color: #888; font-weight: 500; }
.cad-html-root .cad-ad-badge {
  display: inline-block;
  font-size: 8.5px;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 20px;
  align-self: flex-start;
}
.cad-html-root .cad-badge-scaling { background: #b8d4c8; color: #2e6e55; }
.cad-html-root .cad-badge-testing { background: #c8d4e0; color: #2e4e6e; }
.cad-html-root .cad-signal-list { display: flex; flex-direction: column; gap: 8px; }
.cad-html-root .cad-signal-item { display: flex; align-items: flex-start; gap: 8px; }
.cad-html-root .cad-signal-dot {
  width: 8px;
  height: 8px;
  min-width: 8px;
  border-radius: 50%;
  margin-top: 3px;
}
.cad-html-root .cad-dot-green { background: #4caf7d; }
.cad-html-root .cad-dot-blue { background: #5b8dee; }
.cad-html-root .cad-dot-purple { background: #9b6ee0; }
.cad-html-root .cad-signal-text { font-size: 12px; color: #555; line-height: 1.4; flex: 1; min-width: 0; }
.cad-html-root .cad-signal-right { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.cad-html-root .cad-tiktok-small {
  width: 16px;
  height: 16px;
  background: #000;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cad-html-root .cad-pattern-row {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  background: white;
  border-radius: 10px;
  border: 1px solid rgba(0,0,0,0.06);
  min-width: 0;
  flex-shrink: 0;
}
.cad-html-root .cad-pattern-img {
  width: 36px;
  height: 36px;
  border-radius: 5px;
  object-fit: cover;
  flex-shrink: 0;
}
.cad-html-root .cad-vs-badge { font-size: 8.5px; font-weight: 700; color: #aaa; padding: 0 2px; flex-shrink: 0; }
.cad-html-root .cad-pattern-text { flex: 1; min-width: 0; }
.cad-html-root .cad-pattern-title { font-size: 10px; font-weight: 500; color: #444; line-height: 1.3; margin-bottom: 2px; }
.cad-html-root .cad-pattern-sub { font-size: 9.5px; color: #888; }
.cad-html-root .cad-pin-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e4e0d8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: flex-end;
}
.cad-html-root .cad-angles-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 6px;
  min-width: 0;
}
.cad-html-root .cad-angle-chip {
  background: white;
  border-radius: 8px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(0,0,0,0.06);
  gap: 3px;
  min-width: 0;
}
.cad-html-root .cad-angle-chip.cad-angle-highlight { background: #e8f0e4; }
.cad-html-root .cad-angle-chip.cad-angle-highlight .cad-angle-text { color: #3a6e3a; }
.cad-html-root .cad-angle-chip.cad-angle-blue { background: #e4ecf5; }
.cad-html-root .cad-angle-chip.cad-angle-blue .cad-angle-text { color: #2e4e7e; }
.cad-html-root .cad-angle-text { font-size: 10px; font-weight: 500; color: #444; line-height: 1.25; }
.cad-html-root .cad-angle-count {
  font-size: 9px;
  font-weight: 600;
  color: #aaa;
  background: #edeae4;
  padding: 2px 5px;
  border-radius: 20px;
  flex-shrink: 0;
}
.cad-html-root .cad-angle-chip.cad-angle-highlight .cad-angle-count,
.cad-html-root .cad-angle-chip.cad-angle-blue .cad-angle-count { background: rgba(255,255,255,0.6); }
.cad-html-root .cad-card-footer-note {
  font-size: 10px;
  color: #aaa;
  text-align: center;
  font-style: italic;
  flex-shrink: 0;
  margin-top: auto;
  padding-top: 8px;
}
.cad-html-root .cad-sparkle {
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-size: 26px;
  color: rgba(255,255,255,0.8);
  pointer-events: none;
}
@media (max-width: 900px) {
  .cad-html-root .cad-panels { flex-direction: column; min-height: 0; align-items: stretch; }
  .cad-html-root .cad-left-panel { flex: 0 0 auto; width: 100%; min-width: 0; }
  .cad-html-root .cad-right-panel { width: 100%; min-width: 0; flex: 1 1 auto; }
  .cad-html-root .cad-cards-grid { grid-template-columns: 1fr; grid-template-rows: auto; }
  .cad-html-root .cad-section-card { height: auto; min-height: 0; }
  .cad-html-root .cad-ad-cards-row { flex-direction: column; align-items: stretch; gap: 10px; }
  .cad-html-root .cad-ad-card { flex: none; width: 100%; max-width: 100%; }
  .cad-html-root .cad-results-header { flex-wrap: wrap; gap: 8px; }
}
@media (max-width: 480px) {
  .cad-html-root .cad-angles-grid { grid-template-columns: 1fr; }
  .cad-html-root .cad-pattern-row { flex-wrap: wrap; align-items: flex-start; }
  .cad-html-root .cad-pin-icon { align-self: flex-start; }
}
`

/** Card 01 — Product Signals preview matching the HTML reference (layout, typography, imagery). */
function ProductSignalsHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  const [statusIdx, setStatusIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_MESSAGES.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: PRODUCT_SIGNALS_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`ps-html-root relative ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="ps-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="ps-panels min-h-0 flex-1">
              {/* LEFT PANEL */}
              <div className="ps-left-panel">
    
                <div className="ps-chat-area">
                  <div className="ps-user-bubble">Find trending products I can launch this month</div>
                  <div className="ps-ai-message">
                    <div className="ps-ai-icon" aria-hidden>
                      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7 7-3.13 7-7"
                          stroke="#555"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4"
                          stroke="#555"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <circle cx="10" cy="10" r="1.5" fill="#555" />
                      </svg>
                    </div>
                    <div className="ps-ai-text">
                      Scanning Shopify stores, TikTok trends, and ad performance signals to identify breakout
                      products.
                    </div>
                  </div>
                  <div className="ps-loading-area">
                    <div className="ps-spinner" aria-hidden />
                    <div className="ps-loading-text">
                      {STATUS_MESSAGES[statusIdx]} <span>...</span>
                    </div>
                  </div>
                </div>
                <div className="ps-input-bar">
                  <button type="button" className="ps-icon-btn" title="Attach" aria-label="Attach">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <button type="button" className="ps-icon-btn" title="Email" aria-label="Email">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </button>
                  <input type="text" readOnly placeholder="" aria-label="Message" />
                  <button type="button" className="ps-send-btn" title="Send" aria-label="Send">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="ps-right-panel">
           
                <div className="ps-section-card">
                  <div className="ps-section-title">Product Signals</div>
                  <div className="ps-products-row">
                    <div className="ps-product-thumb">
                      <NextImage
                  src={PRODUCT_SIGNAL_HTML_PREVIEW[0].src}
                  alt={PRODUCT_SIGNAL_HTML_PREVIEW[0].alt}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                      <span className="ps-badge ps-badge-trending-light">Trending</span>

                    </div>
                    <div className="ps-product-thumb">
                      <NextImage
                        src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                      <span className="ps-badge ps-badge-trending-light">Trending</span>
                    </div>
                    <div className="ps-product-thumb">
                      <NextImage
                        src={PRODUCT_SIGNAL_HTML_PREVIEW[2].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[2].alt}
                        width={48}
                        height={50}
                        className="object-contain"

                      />
                      <span className="ps-badge ps-badge-trending-light">Trending</span>
                    </div>
                    
                  </div>
                </div>
                <div className="ps-section-card">
                  <div className="ps-section-title">Early Indicators</div>
                  <div className="ps-indicators-row">
                    <div className="ps-indicator-chip">
                      <span className="ps-chip-icon">♪</span>
                      TikTok engagement increasing
                    </div>
                    <div className="ps-indicator-chip">
                      <span className="ps-chip-icon">🔍</span>
                      Search demand rising
                    </div>
                  </div>
                </div>
                <div className="ps-section-card">
                  <div className="ps-section-title">Potential Winners</div>
                  <div className="ps-winners-row">
                    {[0, 1, 2].map((k) => (
                      <div key={k} className="ps-winner-card">
                        <div className="ps-winner-thumb" />
                        <div className="ps-winner-lines">
                          <div className="ps-winner-line" />
                          <div className="ps-winner-line ps-short" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ps-section-card">
                  <div className="ps-section-title">Competition Level</div>
                  <div className="ps-comp-label">Low saturation detected</div>
                </div>
              </div>
            </div>
          </div>
          <div className="ps-sparkle" aria-hidden>

          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 05 — Keyword Intelligence (matches reference HTML: assistant + table + scatter + CPC bars). */
function KeywordIntelligenceHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYWORD_INTELLIGENCE_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`ki-html-root relative mx-auto max-w-[900px] ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="ki-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="ki-panels min-h-0 flex-1">
              <div className="ki-left-panel">
                <div className="ki-panel-label">Assistant</div>
                <div className="ki-chat-area">
                  <div className="ki-user-bubble">What keywords should I be targeting right now?</div>
                  <div className="ki-ai-row">
                    <div className="ki-ai-icon" aria-hidden>
                      <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 2C6.5 2 4.5 4 4.5 6.5C4.5 8.5 6 10 8 10C9.5 10 10.5 9 10.5 7.5C10.5 6.5 9.8 5.8 9 5.8C8.4 5.8 8 6.2 8 6.7"
                          stroke="#888"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9 2C11.8 2 14 4.2 14 7C14 10.3 11.3 13 8 13C5.2 13 3 11 3 8.2"
                          stroke="#888"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                        <path d="M8 13C8 14.5 9 16 10.5 16" stroke="#888" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className="ki-ai-text">
                      Scanning live search data across Google, TikTok, and Pinterest. Ranking by Hype Score —
                      combining search volume, CPC efficiency, competition pressure, and purchase intent.
                    </div>
                  </div>
                  <div className="ki-loading-area">
                    <div className="ki-spinner-row">
                      <div className="ki-spinner" aria-hidden />
                    </div>
                    <div className="ki-loading-text">Scoring 2,400 keywords across 6 platforms...</div>
                  </div>
                </div>
                <div className="ki-input-bar">
                  <button type="button" className="ki-input-btn" title="Attach" aria-label="Attach">
                    <svg viewBox="0 0 16 16" fill="none" stroke="#b0aca6" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M13.5 7.5l-6 6a4 4 0 01-5.66-5.66l6.5-6.5a2.5 2.5 0 013.54 3.54L5.4 11.36a1 1 0 01-1.41-1.41L9.5 4.5" />
                    </svg>
                  </button>
                  <button type="button" className="ki-input-btn" title="Emoji" aria-label="Emoji">
                    <svg viewBox="0 0 16 16" fill="none" stroke="#b0aca6" strokeWidth="1.6" strokeLinecap="round">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M5.5 9.5c.7.9 1.8 1.5 2.5 1.5s1.8-.6 2.5-1.5" />
                      <circle cx="6" cy="7" r=".7" fill="#b0aca6" />
                      <circle cx="10" cy="7" r=".7" fill="#b0aca6" />
                    </svg>
                  </button>
                  <input className="ki-input-field" type="text" readOnly placeholder="" aria-label="Message" />
                  <button type="button" className="ki-send-btn" title="Send" aria-label="Send">
                    <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="ki-right-panel">
                <div className="ki-panel-label">Intelligence</div>
                <div className="ki-kw-header">
                  <div className="ki-kw-indicator" />
                  <div className="ki-kw-title">Keyword Intelligence</div>
                </div>
                <table className="ki-kw-table">
                  <thead>
                    <tr>
                      <th>Keyword</th>
                      <th>Search Vol</th>
                      <th>CPC</th>
                      <th>Competition</th>
                      <th>Hype Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>minimal leather tote bag</td>
                      <td>74,000/mo</td>
                      <td>$0.68</td>
                      <td>
                        <span className="ki-badge ki-badge-low">Low</span>
                      </td>
                      <td>
                        <span className="ki-hype-score ki-hype-91">91</span>
                      </td>
                    </tr>
                    <tr>
                      <td>sage linen table lamp</td>
                      <td>48,200/mo</td>
                      <td>$0.92</td>
                      <td>
                        <span className="ki-badge ki-badge-low">Low</span>
                      </td>
                      <td>
                        <span className="ki-hype-score ki-hype-87">87</span>
                      </td>
                    </tr>
                    <tr>
                      <td>organic cotton crossbody</td>
                      <td>61,500/mo</td>
                      <td>$1.10</td>
                      <td>
                        <span className="ki-badge ki-badge-medium">Medium</span>
                      </td>
                      <td>
                        <span className="ki-hype-score ki-hype-79">79</span>
                      </td>
                    </tr>
                    <tr>
                      <td>chunky platform sneakers</td>
                      <td>112,000/mo</td>
                      <td>$1.44</td>
                      <td>
                        <span className="ki-badge ki-badge-high">High</span>
                      </td>
                      <td>
                        <span className="ki-hype-score ki-hype-64">64</span>
                      </td>
                    </tr>
                    <tr className="ki-skeleton-row">
                      <td>
                        <div className="ki-skel-bar" style={{ width: 130 }} />
                      </td>
                      <td>
                        <div className="ki-skel-bar ml-auto" style={{ width: 60 }} />
                      </td>
                      <td>
                        <div className="ki-skel-bar ml-auto" style={{ width: 35 }} />
                      </td>
                      <td>
                        <div className="ki-skel-bar mx-auto" style={{ width: 50 }} />
                      </td>
                      <td>
                        <div className="ki-skel-bar ml-auto" style={{ width: 25 }} />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="ki-bottom-row">
                  <div className="ki-section-card">
                    <div className="ki-section-card-title">Competition Pressure Map</div>
                    <svg width="100%" viewBox="0 0 220 148" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
                      <text
                        x="7"
                        y="82"
                        transform="rotate(-90,7,82)"
                        textAnchor="middle"
                        fontFamily="DM Sans,sans-serif"
                        fontSize="7"
                        fill="#bbb"
                        fontWeight="600"
                        letterSpacing="0.5"
                      >
                        Search Volume
                      </text>
                      <text x="18" y="10" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#ccc">
                        ▲
                      </text>
                      <text x="18" y="20" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#bbb">
                        high
                      </text>
                      <text x="18" y="130" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#bbb">
                        low
                      </text>
                      <rect x="28" y="8" width="92" height="59" rx="5" fill="rgba(170,215,185,0.5)" />
                      <rect x="122" y="8" width="92" height="59" rx="5" fill="rgba(220,190,175,0.35)" />
                      <rect x="28" y="69" width="92" height="59" rx="5" fill="rgba(210,207,200,0.22)" />
                      <rect x="122" y="69" width="92" height="59" rx="5" fill="rgba(210,205,198,0.22)" />
                      <text x="34" y="22" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="700" fill="#3d8a58">
                        Win Zone
                      </text>
                      <text x="200" y="22" textAnchor="end" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#b8957a">
                        Costly
                      </text>
                      <text x="34" y="122" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#b0aca6">
                        Niche
                      </text>
                      <text x="200" y="122" textAnchor="end" fontFamily="DM Sans,sans-serif" fontSize="7.5" fontWeight="600" fill="#b0aca6">
                        Avoid
                      </text>
                      <text x="28" y="144" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#bbb">
                        low →
                      </text>
                      <text x="121" y="144" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#bbb">
                        Competition
                      </text>
                      <text x="214" y="144" textAnchor="end" fontFamily="DM Sans,sans-serif" fontSize="7" fill="#bbb">
                        → high
                      </text>
                      <circle cx="62" cy="30" r="5" fill="#4a9a68" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                      <text x="70" y="34" fontFamily="DM Sans,sans-serif" fontSize="7.5" fill="#555">
                        leather tote
                      </text>
                      <circle cx="75" cy="50" r="5" fill="#4a9a68" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                      <text x="83" y="54" fontFamily="DM Sans,sans-serif" fontSize="7.5" fill="#555">
                        linen lamp
                      </text>
                      <circle cx="172" cy="34" r="5" fill="#e0904a" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                      <text x="148" y="26" fontFamily="DM Sans,sans-serif" fontSize="7.5" fill="#555">
                        platform sneakers
                      </text>
                      <circle cx="50" cy="98" r="5" fill="#aaa" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                      <text x="58" y="102" fontFamily="DM Sans,sans-serif" fontSize="7.5" fill="#888">
                        jute crossbody
                      </text>
                    </svg>
                  </div>
                  <div className="ki-section-card">
                    <div className="ki-section-card-title">CPC Efficiency Ranking</div>
                    <div className="ki-cpc-list">
                      <div className="ki-cpc-item">
                        <div className="ki-cpc-top">
                          <span className="ki-cpc-name">minimal leather tote</span>
                          <span className="ki-cpc-price">$0.88</span>
                        </div>
                        <div className="ki-cpc-bar-track">
                          <div className="ki-cpc-bar-fill ki-bar-blue" style={{ width: "42%" }} />
                        </div>
                      </div>
                      <div className="ki-cpc-item">
                        <div className="ki-cpc-top">
                          <span className="ki-cpc-name">sage linen lamp</span>
                          <span className="ki-cpc-price">$0.92</span>
                        </div>
                        <div className="ki-cpc-bar-track">
                          <div className="ki-cpc-bar-fill ki-bar-blue" style={{ width: "50%" }} />
                        </div>
                      </div>
                      <div className="ki-cpc-item">
                        <div className="ki-cpc-top">
                          <span className="ki-cpc-name">organic cotton crossbody</span>
                          <span className="ki-cpc-price">$1.10</span>
                        </div>
                        <div className="ki-cpc-bar-track">
                          <div className="ki-cpc-bar-fill ki-bar-blue" style={{ width: "68%" }} />
                        </div>
                      </div>
                      <div className="ki-cpc-item">
                        <div className="ki-cpc-top">
                          <span className="ki-cpc-name">chunky platform sneakers</span>
                          <span className="ki-cpc-price">$1.44</span>
                        </div>
                        <div className="ki-cpc-bar-track">
                          <div className="ki-cpc-bar-fill ki-bar-red" style={{ width: "92%" }} />
                        </div>
                      </div>
                    </div>
                    <div className="ki-cpc-note">Lower CPC + High Hype Score = your best entry point.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 03 — Pricing Intelligence (matches supplied HTML: chat + benchmark + middle + right columns). */
function PricingIntelligenceHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: PRICING_INTELLIGENCE_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`pi-html-root relative mx-auto max-w-[880px] ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="pi-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="pi-panels min-h-0 flex-1">
              <div className="pi-left-panel">
                <div className="pi-panel-label">Chat</div>
                <div className="pi-chat-area">
                  <div className="pi-user-bubble">
                    Am I pricing my products correctly — or am I leaving margin on the table?
                  </div>
                  <div className="pi-ai-message">
                    <div className="pi-ai-icon" aria-hidden>
                      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 1.5C4 1.5 1.5 4 1.5 7s2.5 5.5 5.5 5.5S12.5 10 12.5 7c0-1.5-.6-2.8-1.5-3.8"
                          stroke="#888"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 4C9 3 7.5 2.5 6 3s-2.5 2-2 3.5 2.5 2.5 4 1.5"
                          stroke="#888"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="pi-ai-text">
                      Analyzing competitor pricing, demand elasticity signals, and conversion behavior to identify where you can increase price without losing customers.
                    </div>
                  </div>
                  <div className="pi-loading-area">
                    <div className="pi-spinner-dots">
                      <div className="pi-dot" />
                      <div className="pi-dot" />
                      <div className="pi-dot" />
                    </div>
                    <div className="pi-loading-text">Evaluating price-performance signals across 340 competitor SKUs...</div>
                  </div>
                </div>
                <div className="pi-input-bar">
                  <button type="button" className="pi-input-btn" aria-label="Attach">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path
                        d="M12.5 7.5L7 13c-1.9 1.9-5 1.9-6.9 0s-1.9-5 0-6.9l6-6c1.3-1.3 3.4-1.3 4.7 0s1.3 3.4 0 4.7L5.5 10c-.6.6-1.7.6-2.4 0s-.6-1.7 0-2.4L8.5 3"
                        stroke="#999"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                  <button type="button" className="pi-input-btn" aria-label="Microphone">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="4.5" y="1" width="5" height="8" rx="2.5" stroke="#999" strokeWidth="1.2" />
                      <path d="M2 7c0 2.8 2.2 5 5 5s5-2.2 5-5" stroke="#999" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="7" y1="12" x2="7" y2="13.5" stroke="#999" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input className="pi-text-input" type="text" readOnly placeholder="" aria-label="Message" />
                  <button type="button" className="pi-send-btn" aria-label="Send">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="pi-middle-panel">
                <div className="pi-benchmark-card">
                  <div className="pi-section-title">Price Benchmark</div>
                  <div className="pi-benchmark-content">
                    <div className="pi-bag-thumb">
                      <NextImage
                         src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt}
                        width={72}
                        height={72}
                        className="h-full w-full object-contain"
                        sizes="72px"
                      />
                    </div>
                    <div className="pi-benchmark-info">
                      <div className="pi-competitor-range">Competitor range: $68 – $102</div>
                      <div className="pi-your-price">
                        <span>Your price: </span>$84
                      </div>
                      <div className="pi-price-slider-wrapper">
                        <div className="pi-price-track">
                          <div className="pi-price-range-fill" />
                          <div className="pi-price-thumb" style={{ left: "47%" }} />
                          <div className="pi-you-label" style={{ left: "47%" }}>
                            You are here
                          </div>
                        </div>
                        <div className="pi-price-labels">
                          <span>$68</span>
                          <span>$102</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pi-within-range">Within range — not premium positioned.</div>
                </div>

                <div className="pi-competitor-card">
                  <div className="pi-section-title">Competitor Pricing</div>
                  <div className="pi-competitor-row">
                    <span className="pi-competitor-name">Brand A — $75</span>
                    <span className="pi-badge pi-badge-gray">Budget positioning</span>
                  </div>
                  <div className="pi-competitor-row">
                    <span className="pi-competitor-name">Brand B — $82</span>
                    <span className="pi-badge pi-badge-midmarket">Mid-market</span>
                  </div>
                  <div className="pi-competitor-row">
                    <span className="pi-competitor-name">Brand C — $96</span>
                    <span className="pi-badge pi-badge-premium">Premium positioning</span>
                  </div>
                  <div className="pi-gap-note">Gap between $84 and $96 — premium positioning unclaimed.</div>
                </div>
              </div>

              <div className="pi-right-panel">
                <div className="pi-demand-card">
                  <div className="pi-section-title">Demand Response</div>
                  <div className="pi-demand-row">
                    <span className="pi-demand-label">Conversion rate</span>
                    <span className="pi-demand-value">
                      stable above $80 <span className="pi-green-dot" />
                    </span>
                  </div>
                  <div className="pi-demand-row">
                    <span className="pi-demand-label">No measurable drop in add-to-cart at $89</span>
                    <span className="pi-demand-value">
                      <span className="pi-green-dot" />
                    </span>
                  </div>
                  <div className="pi-demand-row">
                    <span className="pi-demand-label">Purchase intent maintained at current price</span>
                    <span className="pi-demand-value">
                      <span className="pi-green-dot" />
                    </span>
                  </div>
                  <div className="pi-demand-note">Demand is price-inelastic in this range.</div>
                </div>

                <div className="pi-opportunity-card">
                  <div className="pi-section-title">Pricing Opportunity</div>
                  <div className="pi-price-arrow">
                    $84 <span className="pi-arrow">→</span> $94
                  </div>
                  <div className="pi-opp-detail">
                    +€10 per unit x est. 380 units/mo = +€3,800 / mo margin
                  </div>
                  <div className="pi-opp-detail">No predicted conversion drop in this range</div>
                  <div className="pi-opp-detail">Positions brand above mid-market competitors.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="pi-sparkle" aria-hidden>

          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 09 — AI Insights (Trustpilot-style dashboard; matches supplied HTML reference). */
function AiInsightsHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: AI_INSIGHTS_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`aid-html-root relative mx-auto max-w-[960px] min-w-0 ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="aid-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="aid-dashboard">
              <div className="aid-left-panel">
                <div className="aid-panel-label">AI Insights</div>
                <div className="aid-chat-area">
                  <div className="aid-user-row">
                    <div className="aid-user-bubble">What are customers actually asking us to improve?</div>
                    <div className="aid-user-avatar" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" fill="#8a7a6a" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#8a7a6a" />
                      </svg>
                    </div>
                  </div>
                  <div className="aid-ai-row">
                    <div className="aid-ai-icon" aria-hidden>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#777" strokeWidth="1.5" />
                        <path d="M12 7v5l3 3" stroke="#777" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="2" fill="#777" />
                      </svg>
                    </div>
                    <div className="aid-ai-text">
                      Scanning verified purchase reviews, social comments, and return data to surface recurring
                      product feedback patterns — grouped by theme.
                    </div>
                  </div>
                  <div className="aid-loading-area">
                    <div className="aid-spinner" aria-hidden />
                    <div className="aid-loading-text">Processing 4,200 customer signals...</div>
                    <div className="aid-loading-sub">Searching...</div>
                  </div>
                </div>
                <div className="aid-input-bar">
                  <input type="text" readOnly placeholder="Ask about your data..." aria-label="Message" />
                  <button type="button" className="aid-send-btn" aria-label="Send">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="#fff"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="aid-right-grid">
                <div className="aid-section-card">
                  <div className="aid-section-title">Top Complaints</div>
                  <div className="aid-complaint-list">
                    <div className="aid-complaint-item">
                      <div className="aid-complaint-left">
                        <div className="aid-warn-icon">⚠️</div>
                        <span className="aid-complaint-text">Strap breaks after 3 weeks</span>
                      </div>
                      <span className="aid-badge-mentioned">Mentioned 142x</span>
                    </div>
                    <div className="aid-complaint-item">
                      <div className="aid-complaint-left">
                        <div className="aid-warn-icon">⚠️</div>
                        <span className="aid-complaint-text">Difficult to clean material</span>
                      </div>
                      <span className="aid-badge-mentioned">Mentioned 89x</span>
                    </div>
                    <div className="aid-complaint-item">
                      <div className="aid-complaint-left">
                        <div className="aid-warn-icon">⚠️</div>
                        <span className="aid-complaint-text">Color fades quickly</span>
                      </div>
                      <span className="aid-badge-mentioned">Mentioned 87x</span>
                    </div>
                  </div>
                </div>

                <div className="aid-section-card">
                  <div className="aid-section-title">Feature Requests</div>
                  <div className="aid-feature-list">
                    <div className="aid-feature-item">
                      <div className="aid-feature-left">
                        <span className="aid-feat-icon">👍</span>
                        <span className="aid-feature-text">More color options (especially sage + terracotta)</span>
                      </div>
                      <span className="aid-badge-requested">Requested 198x</span>
                    </div>
                    <div className="aid-feature-item">
                      <div className="aid-feature-left">
                        <span className="aid-feat-icon">👍⭐</span>
                        <span className="aid-feature-text">Water-resistant version</span>
                      </div>
                      <span className="aid-badge-requested">Requested 134x</span>
                    </div>
                    <div className="aid-feature-item">
                      <div className="aid-feature-left">
                        <span className="aid-feat-icon">👍⭐</span>
                        <span className="aid-feature-text">Internal zip pocket</span>
                      </div>
                      <span className="aid-badge-requested">Requested 112x</span>
                    </div>
                  </div>
                </div>

                <div className="aid-section-card">
                  <div className="aid-section-title">Recurring Patterns</div>
                  <div className="aid-patterns-body">
                    <div className="aid-word-cloud-col">
                      <span className="aid-wc-word aid-wc-lg">Durability</span>
                      <span className="aid-wc-word aid-wc-md">Quality</span>
                      <span className="aid-wc-word aid-wc-sm">Strap</span>
                      <span className="aid-wc-word aid-wc-xs">Material</span>
                      <div className="aid-wc-sublabel">Sized by frequency</div>
                    </div>
                    <div className="aid-sentiment-col">
                      <div className="aid-sent-sublabel">Sentiment Breakdown</div>
                      <div className="aid-sent-row">
                        <div className="aid-sent-bar-track">
                          <div className="aid-sent-bar-fill aid-sent-positive" />
                        </div>
                        <span className="aid-sent-label aid-sent-positive">68% Positive</span>
                      </div>
                      <div className="aid-sent-row">
                        <div className="aid-sent-bar-track">
                          <div className="aid-sent-bar-fill aid-sent-neutral" />
                        </div>
                        <span className="aid-sent-label aid-sent-neutral">22% Neutral</span>
                      </div>
                      <div className="aid-sent-row">
                        <div className="aid-sent-bar-track">
                          <div className="aid-sent-bar-fill aid-sent-negative" />
                        </div>
                        <span className="aid-sent-label aid-sent-negative">10% Negative</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="aid-section-card">
                  <div className="aid-section-title">Product Snapshot</div>
                  <div className="aid-product-snapshot-body">
                    <div className="aid-product-img-wrap">
                      <NextImage
                        src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 900px) 100vw, 200px"
                      />
                    </div>
                    <div className="aid-product-badges">
                      <span className="aid-badge-issue">Top issue: Durability</span>
                      <span className="aid-badge-req">Top request: More colors</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 10 — Market Expansion AI (matches supplied HTML reference). */
function MarketExpansionHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: MARKET_EXPANSION_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`mex-html-root relative mx-auto max-w-[920px] min-w-0 ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="mex-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="mex-panels min-h-0 flex-1">
              <div className="mex-left-panel">
              
                <div className="mex-chat-area">
                  <div className="mex-user-bubble">
                    Which new markets should I expand into — and are they ready?
                  </div>
                  <div className="mex-ai-message">
                    <div className="mex-ai-icon" aria-hidden>
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 1.5C7 1.5 4.5 4 4.5 7C4.5 10 7 12.5 7 12.5C7 12.5 9.5 10 9.5 7C9.5 4 7 1.5 7 1.5Z"
                          stroke="#666"
                          strokeWidth="1.2"
                          fill="none"
                        />
                        <path
                          d="M1.5 7C1.5 7 4 4.5 7 4.5C10 4.5 12.5 7 12.5 7C12.5 7 10 9.5 7 9.5C4 9.5 1.5 7 1.5 7Z"
                          stroke="#666"
                          strokeWidth="1.2"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="mex-ai-text">
                      Analyzing global demand signals, ad competition levels, and conversion rate benchmarks to
                      surface underserved markets with real purchase intent for your product category.
                    </div>
                  </div>
                  <div className="mex-loading-area">
                    <div className="mex-spinner" aria-hidden />
                    <span className="mex-loading-text">
                      Evaluating 34 regional markets<span className="mex-loading-dots" />
                    </span>
                  </div>
                </div>
                <div className="mex-input-bar">
                  <button type="button" className="mex-icon-btn" aria-label="Attach">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <button type="button" className="mex-icon-btn" aria-label="Email">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </button>
                  <input type="text" readOnly placeholder="" aria-label="Message" />
                  <button type="button" className="mex-send-btn" aria-label="Send">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mex-right-panel">
                
                <div className="mex-right-grid">
                  <div className="mex-section-card">
                    <div className="mex-section-title">Markets Detected</div>
                    <div className="mex-market-row">
                      <div className="mex-flag-wrap">
                        <img src={MEX_FLAG_DE} alt="Germany" />
                      </div>
                      <span className="mex-country-name">Germany</span>
                      <span className="mex-badge mex-badge-green">High demand, low ad saturation</span>
                    </div>
                    <div className="mex-market-row">
                      <div className="mex-flag-wrap">
                        <img src={MEX_FLAG_UAE} alt="UAE" />
                      </div>
                      <span className="mex-country-name">UAE</span>
                      <span className="mex-badge mex-badge-blue">Rising purchase intent</span>
                    </div>
                    <div className="mex-market-row">
                      <div className="mex-flag-wrap">
                        <img src={MEX_FLAG_AU} alt="Australia" />
                      </div>
                      <span className="mex-country-name">Australia</span>
                      <span className="mex-badge mex-badge-green">Strong home decor trend</span>
                    </div>
                    <div className="mex-shimmer-row">
                      <div className="mex-shimmer-box" style={{ width: 28, height: 18, borderRadius: 3 }} />
                      <div className="mex-shimmer-box" style={{ width: 55 }} />
                      <div className="mex-shimmer-box" style={{ flex: 1 }} />
                    </div>
                  </div>

                  <div className="mex-section-card">
                    <div className="mex-section-title">Demand Signals</div>
                    <div className="mex-demand-row">
                      <div className="mex-logo-wrap">
                        <img src={MEX_LOGO_GOOGLE} alt="Google" />
                      </div>
                      <div className="mex-demand-text">
                        Search volume <span className="mex-demand-highlight">+34%</span> for home decor
                      </div>
                    </div>
                    <div className="mex-demand-row">
                      <div className="mex-logo-wrap">
                        <img src={MEX_LOGO_FB} alt="Facebook" />
                      </div>
                      <div className="mex-demand-text">
                        Purchase intent rising — <span className="mex-demand-highlight">low CPM</span>
                      </div>
                    </div>
                    <div className="mex-demand-row">
                      <div className="mex-logo-wrap">
                        <img src={MEX_LOGO_TIKTOK} alt="TikTok" />
                      </div>
                      <div className="mex-demand-text">UGC engagement high, few competitors</div>
                    </div>
                  </div>

                  <div className="mex-section-card">
                    <div className="mex-section-title">Competition Level</div>
                    <div className="mex-comp-row">
                      <div className="mex-comp-flag-wrap">
                        <img src={MEX_FLAG_DE} alt="Germany" />
                      </div>
                      <div className="mex-comp-info">
                        <div className="mex-comp-name">Germany</div>
                        <div className="mex-comp-cpc">CPC est. low —</div>
                      </div>
                      <div className="mex-comp-dots">
                        <div className="mex-dot mex-dot-filled" />
                        <div className="mex-dot mex-dot-filled" />
                        <div className="mex-dot mex-dot-empty" />
                        <div className="mex-dot mex-dot-empty" />
                        <div className="mex-dot mex-dot-empty" />
                      </div>
                    </div>
                    <div className="mex-comp-row">
                      <div className="mex-comp-flag-wrap">
                        <img src={MEX_FLAG_UAE} alt="UAE" />
                      </div>
                      <div className="mex-comp-info">
                        <div className="mex-comp-name">UAE</div>
                        <div className="mex-comp-cpc">CPC est. very low</div>
                      </div>
                      <div className="mex-comp-dots">
                        <div className="mex-dot mex-dot-filled" />
                        <div className="mex-dot mex-dot-empty" />
                        <div className="mex-dot mex-dot-empty" />
                        <div className="mex-dot mex-dot-empty" />
                        <div className="mex-dot mex-dot-empty" />
                      </div>
                    </div>
                    <div className="mex-comp-row">
                      <div className="mex-comp-flag-wrap">
                        <img src={MEX_FLAG_AU} alt="Australia" />
                      </div>
                      <div className="mex-comp-info">
                        <div className="mex-comp-name">Australia</div>
                        <div className="mex-comp-cpc">CPC est. moderate</div>
                      </div>
                      <div className="mex-comp-dots">
                        <div className="mex-dot mex-dot-filled" />
                        <div className="mex-dot mex-dot-filled" />
                        <div className="mex-dot mex-dot-filled" />
                        <div className="mex-dot mex-dot-empty" />
                        <div className="mex-dot mex-dot-empty" />
                      </div>
                    </div>
                  </div>

                  <div className="mex-section-card">
                    <div className="mex-section-title">Expansion Signal</div>
                    <div className="mex-expansion-cards">
                      <div className="mex-exp-card">
                        <div className="mex-exp-flag-wrap">
                          <img src={MEX_FLAG_DE} alt="Germany" />
                        </div>
                        <span className="mex-priority-badge">Priority 1</span>
                        <div className="mex-exp-text">Est. 3–4x lower CPC than home market</div>
                      </div>
                      <div className="mex-exp-card">
                        <div className="mex-exp-flag-wrap">
                          <img src={MEX_FLAG_UAE} alt="UAE" />
                        </div>
                        <span className="mex-priority-badge mex-priority-badge-2">Priority 2</span>
                        <div className="mex-exp-text">Premium buyer segment identified.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mex-sparkle" aria-hidden>

          </div>
        </div>
      </div>
    </div>
  )
}

function RadLogoMeta36() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="18" fill="#1877F2" />
      <path
        d="M25 18c0-3.866-3.134-7-7-7s-7 3.134-7 7c0 3.494 2.56 6.391 5.906 6.919V20.25h-1.778V18h1.778v-1.543c0-1.754 1.045-2.723 2.643-2.723.766 0 1.567.137 1.567.137v1.722h-.882c-.87 0-1.14.54-1.14 1.094V18h1.938l-.31 2.25H19.094v4.669C22.44 24.391 25 21.494 25 18z"
        fill="white"
      />
    </svg>
  )
}

function RadLogoGoogle36() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="18" fill="white" stroke="#e8e8e8" strokeWidth="1" />
      <path
        d="M27.6 18.2c0-.67-.06-1.32-.17-1.94H18v3.67h5.38c-.23 1.18-.94 2.18-1.99 2.85v2.37h3.22c1.88-1.73 2.97-4.29 2.97-6.95z"
        fill="#4285F4"
      />
      <path
        d="M18 28c2.7 0 4.96-.9 6.61-2.41l-3.22-2.5c-.89.6-2.04.95-3.39.95-2.61 0-4.82-1.76-5.61-4.13H9.07v2.58C10.71 25.82 14.09 28 18 28z"
        fill="#34A853"
      />
      <path
        d="M12.39 19.91A5.97 5.97 0 0 1 12.07 18c0-.67.12-1.32.32-1.93v-2.58H9.07A9.99 9.99 0 0 0 8 18c0 1.61.38 3.14 1.07 4.49l3.32-2.58z"
        fill="#FBBC05"
      />
      <path
        d="M18 11.94c1.47 0 2.79.51 3.83 1.49l2.87-2.87C22.95 8.99 20.7 8 18 8c-3.91 0-7.29 2.18-8.93 5.49l3.32 2.58c.79-2.37 3-4.13 5.61-4.13z"
        fill="#EA4335"
      />
    </svg>
  )
}

function RadLogoTikTok36({ withStroke }: { withStroke?: boolean }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="18" fill="#010101" />
      <path
        d="M24.8 15.1a6.3 6.3 0 0 1-3.7-1.2v5.5a5.4 5.4 0 1 1-5.4-5.4c.2 0 .4 0 .6.01v2.7c-.2-.02-.4-.04-.6-.04a2.73 2.73 0 1 0 2.73 2.73V9h2.67a3.62 3.62 0 0 0 3.62 3.42v2.68z"
        fill="white"
      />
      {withStroke ? (
        <path
          d="M24.8 15.1a6.3 6.3 0 0 1-3.7-1.2v5.5a5.4 5.4 0 1 1-5.4-5.4c.2 0 .4 0 .6.01v2.7c-.2-.02-.4-.04-.6-.04a2.73 2.73 0 1 0 2.73 2.73V9h2.67a3.62 3.62 0 0 0 3.62 3.42v2.68z"
          fill="none"
          stroke="#69C9D0"
          strokeWidth="0.4"
          opacity="0.7"
        />
      ) : null}
    </svg>
  )
}

/** Card 02 — Real ROAS / revenue attribution (matches supplied HTML reference). */
function RevenueAttributionHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  const aiIcon = (
    <div className="rad-ai-icon" aria-hidden>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 2C8.5 3.5 9.5 5 9.5 7C9.5 9 8 10.5 7 11.5C6 10.5 4.5 9 4.5 7C4.5 5 5.5 3.5 7 2Z"
          stroke="#666"
          strokeWidth="1.1"
          fill="none"
        />
        <circle cx="7" cy="7" r="1.4" fill="#888" />
      </svg>
    </div>
  )

  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: REVENUE_ATTRIBUTION_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`rad-html-root relative mx-auto w-full min-w-0 max-w-[880px] ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="rad-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="rad-panels min-h-0 flex-1">
              <div className="rad-left-panel">
                <div className="rad-panel-label">Revenue Attribution</div>
                <div className="rad-chat-area">
                  <div className="rad-user-bubble">
                    Show me what&apos;s actually driving my revenue — not what the platforms claim
                  </div>
                  <div className="rad-ai-message">
                    {aiIcon}
                    <div className="rad-ai-text">Removing duplicated attribution across Meta, Google, and TikTok.</div>
                  </div>
                  <div className="rad-ai-message">
                    {aiIcon}
                    <div className="rad-ai-text">
                      Calculating true revenue contribution per channel using last-touch and data-driven models.
                    </div>
                  </div>
                  <div className="rad-loading-area">
                    <div className="rad-spinner" aria-hidden />
                    <div className="rad-loading-text">Reconciling 14,823 conversion events...</div>
                  </div>
                </div>
                <div className="rad-input-bar">
                  <button type="button" className="rad-icon-btn" aria-label="Attach">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <button type="button" className="rad-icon-btn" aria-label="Email">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </button>
                  <input className="rad-text-input" type="text" readOnly placeholder="" aria-label="Message" />
                  <button type="button" className="rad-send-btn" aria-label="Send">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5,12 12,5 19,12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="rad-right-panel">
                <div className="rad-right-row">
                  <div className="rad-section-card rad-channel-card">
                    <div className="rad-section-title">Channel Performance</div>
                    <div className="rad-channel-row">
                      <div className="rad-channel-logo-wrap">
                        <RadLogoMeta36 />
                      </div>
                      <div className="rad-channel-info">
                        <div className="rad-roas-left">
                          <span className="rad-roas-lbl">Reported ROAS:</span>
                          <span className="rad-roas-val">4.1x</span>
                        </div>
                        <div className="rad-roas-right">
                          <span className="rad-real-lbl">Real ROAS:</span>
                          <span className="rad-real-val rad-val-red">2.3x</span>
                        </div>
                      </div>
                    </div>
                    <div className="rad-channel-row">
                      <div className="rad-channel-logo-wrap">
                        <RadLogoGoogle36 />
                      </div>
                      <div className="rad-channel-info">
                        <div className="rad-roas-left">
                          <span className="rad-roas-lbl">Reported ROAS:</span>
                          <span className="rad-roas-val">3.2x</span>
                        </div>
                        <div className="rad-roas-right">
                          <span className="rad-real-lbl">Real ROAS:</span>
                          <span className="rad-real-val rad-val-green">2.8x</span>
                        </div>
                      </div>
                    </div>
                    <div className="rad-channel-row">
                      <div className="rad-channel-logo-wrap">
                        <RadLogoTikTok36 withStroke />
                      </div>
                      <div className="rad-channel-info">
                        <div className="rad-roas-left">
                          <span className="rad-roas-lbl">Reported ROAS:</span>
                          <span className="rad-roas-val">5.6x</span>
                        </div>
                        <div className="rad-roas-right">
                          <span className="rad-real-lbl">Real ROAS:</span>
                          <span className="rad-real-val rad-val-red">1.4x</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rad-section-card rad-revenue-card">
                    <div className="rad-section-title">Real Revenue</div>
                    <div className="rad-rev-main">€38,200</div>
                    <div className="rad-rev-platform">€61,400</div>
                    <div className="rad-rev-label">True Revenue (7 days)</div>
                    <div className="rad-overclaimed">€23,200 over-claimed</div>
                  </div>
                </div>

                <div className="rad-right-row">
                  <div className="rad-section-card rad-overlap-card">
                    <div className="rad-section-title">Attribution Overlap</div>
                    <div className="rad-venn-wrap">
                      <svg className="rad-venn-svg" viewBox="0 0 140 108" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="52" cy="43" r="28" fill="#5b9fcf" opacity="0.52" />
                        <circle cx="88" cy="43" r="28" fill="#d97b3a" opacity="0.52" />
                        <circle cx="70" cy="68" r="28" fill="#8b6dcc" opacity="0.52" />
                        <text
                          x="36"
                          y="31"
                          fontFamily="DM Sans,sans-serif"
                          fontSize="8.5"
                          fontWeight="700"
                          fill="white"
                          textAnchor="middle"
                        >
                          Meta
                        </text>
                        <text
                          x="104"
                          y="31"
                          fontFamily="DM Sans,sans-serif"
                          fontSize="8.5"
                          fontWeight="700"
                          fill="white"
                          textAnchor="middle"
                        >
                          Google
                        </text>
                        <text
                          x="70"
                          y="86"
                          fontFamily="DM Sans,sans-serif"
                          fontSize="8.5"
                          fontWeight="700"
                          fill="white"
                          textAnchor="middle"
                        >
                          TikTok
                        </text>
                      </svg>
                    </div>
                    <div className="rad-overlap-note">31% of conversions claimed by 2+ channels.</div>
                  </div>

                  <div className="rad-section-card rad-profit-card">
                    <div className="rad-section-title">Profitability Signal</div>
                    <div className="rad-profit-row">
                      <div className="rad-profit-logo-wrap">
                        <RadLogoGoogle36 />
                      </div>
                      <div className="rad-profit-info">
                        <div className="rad-profit-name">Strongest real profitability</div>
                      </div>
                      <span className="rad-profit-badge rad-badge-scale">Scale</span>
                    </div>
                    <div className="rad-profit-row">
                      <div className="rad-profit-logo-wrap">
                        <RadLogoMeta36 />
                      </div>
                      <div className="rad-profit-info">
                        <div className="rad-profit-name">Meta</div>
                        <div className="rad-profit-desc">Moderate — watch overlap</div>
                      </div>
                      <span className="rad-profit-badge rad-badge-hold">Hold</span>
                    </div>
                    <div className="rad-profit-row">
                      <div className="rad-profit-logo-wrap">
                        <RadLogoTikTok36 />
                      </div>
                      <div className="rad-profit-info">
                        <div className="rad-profit-name">TikTok</div>
                        <div className="rad-profit-desc">Low real return — scale cautiously</div>
                      </div>
                      <span className="rad-profit-badge rad-badge-review">Review</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rad-sparkle" aria-hidden>

          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 06 — Inventory AI (matches supplied HTML reference; scoped under .inv-html-root). */
function InventoryAiHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  const tote = PRODUCT_SIGNAL_IMAGES[1]
  const lamp = PRODUCT_SIGNAL_IMAGES[2]
  const sneaker = PRODUCT_SIGNAL_IMAGES[0]

  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: INVENTORY_AI_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`inv-html-root relative mx-auto max-w-[900px] min-w-0 ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="inv-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="inv-panels min-h-0 flex-1">
              <div className="inv-left-panel">
                <div className="inv-panel-label">Chat</div>
                <div className="inv-chat-area">
                  <div>
                    <div className="inv-user-bubble">Am I going to run out of stock — and when?</div>
                    <div className="inv-timestamp">11:02 AM</div>
                  </div>
                  <div className="inv-ai-row">
                    <div className="inv-ai-icon" aria-hidden>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 10 10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div className="inv-ai-message">
                      Forecasting demand based on current sales velocity, trend trajectory, and seasonal signals. Comparing
                      against your live inventory levels.
                    </div>
                  </div>
                  <div className="inv-timestamp" style={{ paddingLeft: 34, marginTop: -8, textAlign: "left" }}>
                    11:02 AM
                  </div>
                  <div className="inv-dots-row" aria-hidden>
                    <div className="inv-dot inv-dot-active" />
                    <div className="inv-dot inv-dot-active" />
                    <div className="inv-dot" />
                  </div>
                  <div className="inv-loading-area">
                    <div className="inv-spinner" aria-hidden />
                    <span className="inv-loading-text">Modeling demand for next 30 days...</span>
                  </div>
                </div>
                <div className="inv-input-bar">
                  <button type="button" className="inv-icon-btn" aria-label="Attach">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <input type="text" readOnly placeholder="Ask about your growth, performance, or operations..." aria-label="Message" />
                  <button type="button" className="inv-send-btn" aria-label="Send">
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="inv-right-panel">
                <div className="inv-results-header">Results</div>
                <div className="inv-results-grid">
                  <div className="inv-section-card">
                    <div className="inv-section-title">Current Stock Status</div>
                    <div className="inv-product-row">
                      <div className="inv-product-thumb">
                        <NextImage src={PRODUCT_SIGNAL_HTML_PREVIEW[0].src}
                          alt={PRODUCT_SIGNAL_HTML_PREVIEW[0].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-product-info">
                        <div className="inv-product-name">Cream Tote Bag</div>
                        <div className="inv-product-sub">Tote Bag — Natural</div>
                      </div>
                      <div className="inv-badge inv-badge-units-high">142 units</div>
                    </div>
                    <div className="inv-product-row">
                      <div className="inv-product-thumb">
                        <NextImage src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                          alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-product-info">
                        <div className="inv-product-name">Sage Arch Lamp</div>
                        <div className="inv-product-sub">Arch Lamp — Sage</div>
                      </div>
                      <div className="inv-badge inv-badge-units-low">34 units</div>
                    </div>
                    <div className="inv-product-row">
                      <div className="inv-product-thumb">
                        <NextImage src={PRODUCT_SIGNAL_HTML_PREVIEW[2].src}
                          alt={PRODUCT_SIGNAL_HTML_PREVIEW[2].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-product-info">
                        <div className="inv-product-name">White Platform Sneaker</div>
                        <div className="inv-product-sub">Platform Sneaker — White</div>
                      </div>
                      <div className="inv-badge inv-badge-units-blue">289 units</div>
                    </div>
                  </div>

                  <div className="inv-section-card">
                    <div className="inv-section-title">Sales Velocity</div>
                    <div className="inv-vel-row">
                      <div className="inv-vel-info">
                        <div className="inv-vel-name">Tote Bag</div>
                        <div className="inv-vel-sub">Natural</div>
                      </div>
                      <div className="inv-vel-right">
                        <div className="inv-vel-label">Selling fast</div>
                        <div className="inv-vel-bar-wrap">
                          <div className="inv-vel-bar inv-bar-green" style={{ width: "82%" }} />
                        </div>
                      </div>
                    </div>
                    <div className="inv-vel-row">
                      <div className="inv-vel-info">
                        <div className="inv-vel-name">Arch Lamp</div>
                        <div className="inv-vel-sub">Sage</div>
                      </div>
                      <div className="inv-vel-right">
                        <div className="inv-vel-label">High velocity</div>
                        <div className="inv-vel-bar-wrap">
                          <div className="inv-vel-bar inv-bar-blue" style={{ width: "91%" }} />
                        </div>
                      </div>
                    </div>
                    <div className="inv-vel-row">
                      <div className="inv-vel-info">
                        <div className="inv-vel-name">Sneaker</div>
                        <div className="inv-vel-sub">White</div>
                      </div>
                      <div className="inv-vel-right">
                        <div className="inv-vel-label">Steady</div>
                        <div className="inv-vel-bar-wrap">
                          <div className="inv-vel-bar inv-bar-orange" style={{ width: "46%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inv-section-card">
                    <div className="inv-section-title">Stockout Forecast</div>
                    <div className="inv-stockout-row">
                      <div className="inv-product-thumb">
                        <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[0].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[0].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-stockout-info">
                        <div className="inv-stockout-main">Stockout in ~9 days</div>
                      </div>
                      <div className="inv-stockout-urgent-wrap">
                        <span style={{ fontSize: 13 }} aria-hidden>
                          ⚠️
                        </span>
                        <span className="inv-badge-urgent">Urgent</span>
                      </div>
                    </div>
                    <div className="inv-stockout-row">
                      <div className="inv-product-thumb">
                        <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-stockout-info">
                        <div className="inv-stockout-main">Stockout risk in ~18 days</div>
                      </div>
                      <span className="inv-badge-review">Review</span>
                    </div>
                  </div>

                  <div className="inv-section-card">
                    <div className="inv-section-title">Reorder Recommendation</div>
                    <div className="inv-reorder-row">
                      <div className="inv-product-thumb">
                        <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[2].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[2].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-reorder-info">
                        <div className="inv-reorder-main">Reorder 200 units — lead time 14 days</div>
                      </div>
                      <span className="inv-badge-actnow">Act Now</span>
                    </div>
                    <div className="inv-reorder-row">
                      <div className="inv-product-thumb">
                        <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt} width={38} height={38} className="object-cover" sizes="38px" />
                      </div>
                      <div className="inv-reorder-info">
                        <div className="inv-reorder-main">Reorder 150 units within 10 days</div>
                      </div>
                      <span className="inv-badge-schedule">Schedule</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inv-sparkle" aria-hidden>

          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 08 — Competitor Social Media Analysis (matches supplied HTML reference). */
function CompetitorSocialHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  const [activeTab, setActiveTab] = useState(0)
  const img = PRODUCT_SIGNAL_IMAGES

  const tabClass = (i: number) =>
    `csi-tab${activeTab === i ? " csi-tab-active" : ""}`

  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: COMPETITOR_SOCIAL_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`csi-html-root relative mx-auto max-w-[960px] ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}>
          <div className="csi-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="csi-top-tabs">

            </div>

            <div className="csi-panels min-h-0 flex-1">
              <div className="csi-left-panel">
                <div className="csi-panel-label">Intelligence Chat</div>
                <div className="csi-chat-area">
                  <div className="csi-user-bubble">Who are my top competitors running ads right now?</div>
                  <div className="csi-ai-message-row">
                    <div className="csi-ai-icon" aria-hidden>
                      <svg width={13} height={13} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 2C10 2 6 6 6 10C6 12 7 13.5 8.5 14.5C7.5 15.5 6 17 6 18"
                          stroke="#888"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                        />
                        <path
                          d="M10 2C10 2 14 6 14 10C14 12 13 13.5 11.5 14.5C12.5 15.5 14 17 14 18"
                          stroke="#888"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                        />
                        <circle cx="10" cy="10" r="2" fill="#999" />
                      </svg>
                    </div>
                    <div className="csi-ai-text">
                      Scanning Meta Ad Library, TikTok Creative Center, and organic social signals. Identifying top
                      performing brands by engagement velocity, creative volume, and posting frequency.
                    </div>
                  </div>
                  <div className="csi-loading-area">
                    <div className="csi-spinner" aria-hidden />
                    <div className="csi-loading-text">
                      Analysing 345 brand profiles across Instagram and TikTok<span className="csi-dots" />
                    </div>
                  </div>
                </div>
                <div className="csi-input-bar">
                  <button type="button" className="csi-input-btn" aria-label="Attach">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                    </svg>
                  </button>
                  <button type="button" className="csi-input-btn" aria-label="Email">
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </button>
                  <input className="csi-input-field" type="text" readOnly placeholder="Ask anything..." aria-label="Message" />
                  <button type="button" className="csi-send-btn" aria-label="Send">
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="19" x2="12" y2="5" />
                      <polyline points="5 12 12 5 19 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="csi-center-panel">
                <div className="csi-section-title">Competitor Social Analysis</div>
                <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto">
                  <table className="csi-comp-table">
                    <thead>
                      <tr>
                        <th />
                        <th>Brand</th>
                        <th>Top Platform</th>
                        <th>Avg Engagement</th>
                        <th>Ads Running</th>
                        <th>HIPPS Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <span className="csi-row-num">1</span>
                        </td>
                        <td>
                          <div className="csi-brand-cell">
                            <div className="csi-brand-thumb">
                              <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[0].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[0].alt} width={28} height={28} className="object-cover" sizes="28px" />
                            </div>
                            <span className="csi-brand-name">Lulu &amp; Co</span>
                          </div>
                        </td>
                        <td>
                          <span className="csi-platform-badge"> Instagram</span>
                        </td>
                        <td className="csi-engagement-val">4.8%</td>
                        <td className="csi-ads-badge">12 active ads</td>
                        <td>
                          <span className="csi-score-badge csi-score-94">94</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="csi-row-num">2</span>
                        </td>
                        <td>
                          <div className="csi-brand-cell">
                            <div className="csi-brand-thumb">
                              <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt} width={28} height={28} className="object-cover" sizes="28px" />
                            </div>
                            <span className="csi-brand-name">Maison Nude</span>
                          </div>
                        </td>
                        <td>
                          <span className="csi-platform-badge">♪ TikTok</span>
                        </td>
                        <td className="csi-engagement-val">6.1%</td>
                        <td className="csi-ads-badge">8 active ads</td>
                        <td>
                          <span className="csi-score-badge csi-score-89">89</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="csi-row-num">3</span>
                        </td>
                        <td>
                          <div className="csi-brand-cell">
                            <div className="csi-brand-thumb">
                              <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[2].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[2].alt} width={28} height={28} className="object-cover" sizes="28px" />
                            </div>
                            <span className="csi-brand-name">
                              Minimal
                              <br />
                              Lifestyle
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="csi-platform-badge"> Instagram</span>
                        </td>
                        <td className="csi-engagement-val">4.7%</td>
                        <td className="csi-ads-badge">6 active ads</td>
                        <td>
                          <span className="csi-score-badge csi-score-89">89</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="csi-row-num">4</span>
                        </td>
                        <td>
                          <div className="csi-brand-cell">
                            <div className="csi-brand-thumb">
                              <NextImage  src={PRODUCT_SIGNAL_HTML_PREVIEW[3].src}
                        alt={PRODUCT_SIGNAL_HTML_PREVIEW[3].alt} width={28} height={28} className="object-cover" sizes="28px" />
                            </div>
                            <span className="csi-brand-name">
                              Minimal
                              <br />
                              Lifestyle
                            </span>
                          </div>
                        </td>
                        <td>
                          <span className="csi-platform-badge">♪ TikTok</span>
                        </td>
                        <td className="csi-engagement-val">4.3%</td>
                        <td className="csi-ads-badge">6 active ads</td>
                        <td>
                          <span className="csi-score-badge csi-score-87">87</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="csi-row-num">5</span>
                        </td>
                        <td>
                          <div className="csi-brand-cell">
                            <div className="csi-brand-thumb">
                              <NextImage src={img[0].src} alt="Minimal" width={28} height={28} className="object-cover" sizes="28px" />
                            </div>
                            <span className="csi-brand-name">Minimal</span>
                          </div>
                        </td>
                        <td>
                          <span className="csi-platform-badge"> Instagram</span>
                        </td>
                        <td className="csi-engagement-val">4.8%</td>
                        <td className="csi-ads-badge">2 active ads</td>
                        <td>
                          <span className="csi-score-badge csi-score-73">73</span>
                        </td>
                      </tr>
                      <tr className="csi-skeleton-row">
                        <td />
                        <td colSpan={5}>
                          <div className="csi-skeleton-flex">
                            <div className="csi-skeleton-block" />
                            <div className="csi-skeleton-col">
                              <div className="csi-skeleton-line" style={{ width: "55%" }} />
                              <div className="csi-skeleton-line" style={{ width: "35%" }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="csi-skeleton-row">
                        <td />
                        <td colSpan={5}>
                          <div className="csi-skeleton-flex">
                            <div className="csi-skeleton-block" />
                            <div className="csi-skeleton-col">
                              <div className="csi-skeleton-line" style={{ width: "65%" }} />
                              <div className="csi-skeleton-line" style={{ width: "40%" }} />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="csi-table-footer">
                  See exactly what content is working for them. Know their winning angles, top products and engagement
                  spikes in real time.
                </div>
              </div>

              <div className="csi-right-panel">
                <div className="csi-angles-card">
                  <div className="csi-section-title">Winning Content Angles</div>
                  <div className="csi-angles-list">
                    <div className="csi-angle-item csi-angle-green">
                      <span className="csi-angle-name">Before &amp; After</span>
                      <span className="csi-angle-stat">3.2x avg eng</span>
                    </div>
                    <div className="csi-angle-item csi-angle-yellow">
                      <span className="csi-angle-name">Founder Story</span>
                      <span className="csi-angle-stat">2.8x avg eng</span>
                    </div>
                    <div className="csi-angle-item csi-angle-peach">
                      <span className="csi-angle-name">Unboxing Close-up</span>
                      <span className="csi-angle-stat">2.1x avg eng</span>
                    </div>
                  </div>
                  <div className="csi-mini-bars" aria-hidden>
                    <div className="csi-mini-bar" style={{ height: "35%", background: "#c0c8b8" }} />
                    <div className="csi-mini-bar" style={{ height: "55%", background: "#c8b8b0" }} />
                    <div className="csi-mini-bar" style={{ height: "45%", background: "#b8c4b0" }} />
                    <div className="csi-mini-bar" style={{ height: "70%", background: "#b0c0b8" }} />
                    <div className="csi-mini-bar" style={{ height: "50%", background: "#c0b8b0" }} />
                    <div className="csi-mini-bar" style={{ height: "85%", background: "#a8b8a8" }} />
                    <div className="csi-mini-bar" style={{ height: "60%", background: "#b8c0b0" }} />
                    <div className="csi-mini-bar" style={{ height: "95%", background: "#a0b0a8" }} />
                    <div className="csi-mini-bar" style={{ height: "75%", background: "#b0b8b0" }} />
                    <div className="csi-mini-bar" style={{ height: "80%", background: "#a8c0a8" }} />
                    <div className="csi-mini-bar" style={{ height: "65%", background: "#b0b8b0" }} />
                    <div className="csi-mini-bar" style={{ height: "90%", background: "#a0b8a8" }} />
                  </div>
                </div>

                <div className="csi-chart-card">
                  <div className="csi-chart-label">Engagement Spikes</div>
                  <div className="csi-chart-brand">Maison Nude</div>
                  <div className="csi-chart-annotation">
                    <span>+340% spike</span>
                    <br />
                    Raw event went viral
                    <br />
                    Oct 14
                  </div>
                  <div className="csi-chart-wrap">
                    <div className="csi-y-axis">
                      <span>40k</span>
                      <span>30k</span>
                      <span>20k</span>
                      <span>10k</span>
                    </div>
                    <svg className="csi-chart-svg" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <line x1="18" y1="8" x2="158" y2="8" stroke="#e8e4dc" strokeWidth={0.5} />
                      <line x1="18" y1="28" x2="158" y2="28" stroke="#e8e4dc" strokeWidth={0.5} />
                      <line x1="18" y1="48" x2="158" y2="48" stroke="#e8e4dc" strokeWidth={0.5} />
                      <line x1="18" y1="68" x2="158" y2="68" stroke="#e8e4dc" strokeWidth={0.5} />
                      <polyline
                        points="18,68 28,65 38,62 48,60 58,58 68,55 78,50 88,10 98,52 108,55 118,58 128,62 138,63 148,64 158,65"
                        fill="none"
                        stroke="#e08060"
                        strokeWidth={1.5}
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="18,72 28,70 38,70 48,68 58,70 68,68 78,67 88,65 98,65 108,66 118,68 128,67 138,68 148,70 158,69"
                        fill="none"
                        stroke="#6090c0"
                        strokeWidth={1}
                        strokeLinejoin="round"
                        opacity={0.7}
                      />
                      <polyline
                        points="18,75 28,73 38,74 48,72 58,73 68,74 78,72 88,70 98,73 108,72 118,74 128,72 138,73 148,74 158,73"
                        fill="none"
                        stroke="#80a878"
                        strokeWidth={1}
                        strokeLinejoin="round"
                        opacity={0.6}
                      />
                      <circle cx="88" cy="10" r="3" fill="#e08060" />
                      <line x1="88" y1="10" x2="88" y2="5" stroke="#e08060" strokeWidth={0.8} strokeDasharray="2,1" />
                      <text x="18" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        1
                      </text>
                      <text x="38" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        3
                      </text>
                      <text x="58" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        5
                      </text>
                      <text x="78" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        7
                      </text>
                      <text x="98" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        9
                      </text>
                      <text x="118" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        11
                      </text>
                      <text x="138" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        13
                      </text>
                      <text x="158" y="82" fontSize="6" fill="#ccc" textAnchor="middle">
                        14
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="csi-sparkle" aria-hidden>

          </div>
        </div>
      </div>
    </div>
  )
}

/** Card 07 — Ad Intelligence / competitor ads (matches supplied HTML reference). */
function AdIntelligenceHtmlPreview({ fillHeight }: { fillHeight?: boolean }) {
  const tote = PRODUCT_SIGNAL_IMAGES[1]
  const lamp = PRODUCT_SIGNAL_IMAGES[2]
  const sneaker = PRODUCT_SIGNAL_IMAGES[0]
  const patternUgc = PRODUCT_SIGNAL_IMAGES[1]
  const patternStudio = PRODUCT_SIGNAL_IMAGES[3]

  return (
    <div
      className={`relative flex w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "min-h-[280px] h-full md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: AD_INTELLIGENCE_HTML_CSS }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_BACKDROP_STYLE}
      />
      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div
          className={`cad-html-root relative mx-auto w-full min-w-0 max-w-[920px] py-3 sm:py-4 md:py-5 ${WORKSPACE_PREVIEW_DASHBOARD_FRAME}`}
        >
          <div className="cad-outer-card flex h-full max-h-full min-h-0 flex-col">
            <div className="cad-panels min-h-0">
              <div className="cad-left-panel">
                <div className="cad-panel-label">
                  AI Chat <span className="cad-panel-suffix">(28%)</span>
                </div>
                <div className="cad-chat-area">
                  <div className="cad-user-bubble">Which competitor ads are actually working right now?</div>
                  <div className="cad-ai-message">
                    <div className="cad-ai-icon" aria-hidden>
                      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 1C7 1 9 3.5 9 7C9 10.5 7 13 7 13"
                          stroke="#666"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M7 1C7 1 5 3.5 5 7C5 10.5 7 13 7 13"
                          stroke="#666"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <circle cx="7" cy="7" r="1.5" fill="#666" />
                        <path
                          d="M1.5 5.5C3.5 4.5 5.5 4 7 4C8.5 4 10.5 4.5 12.5 5.5"
                          stroke="#666"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                        <path
                          d="M1.5 8.5C3.5 9.5 5.5 10 7 10C8.5 10 10.5 9.5 12.5 8.5"
                          stroke="#666"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="cad-ai-text">
                      Tracking active ad creatives across Meta Ad Library and TikTok Creative Center — surfacing what&apos;s
                      scaling, how long ads have been running, and what formats are winning.
                    </div>
                  </div>
                  <div className="cad-loading-area" aria-hidden>
                    <div className="cad-spinner" />
                    <span className="cad-loading-text">
                      Analyzing 847 active ad creatives<span className="cad-dots" />
                    </span>
                  </div>
                </div>
                <div className="cad-input-bar">
                  <button type="button" className="cad-icon-btn" aria-label="Edit" tabIndex={-1}>
                    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" aria-hidden>
                      <path
                        d="M12 5L8.5 1.5L2 8L1.5 13.5L7 13L13.5 6.5L12 5Z"
                        stroke="#999"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                      <path d="M8 2L13 7" stroke="#999" strokeWidth="1.2" />
                    </svg>
                  </button>
                  <button type="button" className="cad-icon-btn" aria-label="Attach" tabIndex={-1}>
                    <svg width={15} height={15} viewBox="0 0 15 15" fill="none" aria-hidden>
                      <rect x="1.5" y="3" width="12" height="9" rx="1.5" stroke="#999" strokeWidth="1.2" />
                      <path d="M1.5 5.5L7.5 9L13.5 5.5" stroke="#999" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </button>
                  <input className="cad-text-input" type="text" readOnly placeholder="Ask anything..." aria-label="Message" />
                  <button type="button" className="cad-send-btn" aria-label="Send" tabIndex={-1}>
                    <svg width={13} height={13} viewBox="0 0 13 13" fill="none" aria-hidden>
                      <path
                        d="M6.5 11V2M6.5 2L2.5 6M6.5 2L10.5 6"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cad-right-panel">

                <div className="cad-cards-grid">
                  <div className="cad-section-card">
                    <div className="cad-card-title">Card 1: Active Ads Detected</div>
                    <div className="cad-section-fill">
                      <div className="cad-ad-cards-row">
                        <div className="cad-ad-card">
                          <div className="cad-ad-card-img-wrap relative">
                            <NextImage
                              src={PRODUCT_SIGNAL_HTML_PREVIEW[0].src}
                              alt={PRODUCT_SIGNAL_HTML_PREVIEW[0].alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 900px) 30vw, 140px"
                            />
                          </div>
                          <div className="cad-ad-card-footer">
                            <div className="cad-platform-row">
                              <div className="cad-platform-icon cad-fb-icon">
                                <svg width={8} height={8} viewBox="0 0 10 10" fill="white" aria-hidden>
                                  <path d="M6.5 2H5.2C4.8 2 4.7 2.2 4.7 2.5V3.5H6.5L6.3 5H4.7V9H3V5H2V3.5H3V2.3C3 1 3.7 0.5 5 0.5C5.6 0.5 6.5 0.6 6.5 0.6V2Z" />
                                </svg>
                              </div>
                              <span className="cad-run-time">Running 23 days</span>
                            </div>
                            <span className="cad-ad-badge cad-badge-scaling">Scaling</span>
                          </div>
                        </div>
                        <div className="cad-ad-card">
                          <div className="cad-ad-card-img-wrap relative">
                            <NextImage
                              src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                              alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 900px) 30vw, 140px"
                            />
                          </div>
                          <div className="cad-ad-card-footer">
                            <div className="cad-platform-row">
                              <div className="cad-platform-icon cad-fb-icon">
                                <svg width={8} height={8} viewBox="0 0 10 10" fill="white" aria-hidden>
                                  <path d="M6.5 2H5.2C4.8 2 4.7 2.2 4.7 2.5V3.5H6.5L6.3 5H4.7V9H3V5H2V3.5H3V2.3C3 1 3.7 0.5 5 0.5C5.6 0.5 6.5 0.6 6.5 0.6V2Z" />
                                </svg>
                              </div>
                              <span className="cad-run-time">Running 23 days</span>
                            </div>
                            <span className="cad-ad-badge cad-badge-scaling">Scaling</span>
                          </div>
                        </div>
                        <div className="cad-ad-card">
                          <div className="cad-ad-card-img-wrap relative">
                            <NextImage
                              src={PRODUCT_SIGNAL_HTML_PREVIEW[2].src}
                              alt={PRODUCT_SIGNAL_HTML_PREVIEW[2].alt}
                              fill
                              className="object-cover"
                              sizes="(max-width: 900px) 30vw, 140px"
                            />
                          </div>
                          <div className="cad-ad-card-footer">
                            <div className="cad-platform-row">
                              <div className="cad-platform-icon cad-tiktok-icon-wrap">
                                <svg width={8} height={8} viewBox="0 0 10 10" fill="white" aria-hidden>
                                  <path d="M7 1C7 1 7.5 3 9 3.5V5C8 5 7 4.5 7 4.5V7C7 8.5 5.8 9.5 4.5 9.5C3.2 9.5 2 8.5 2 7C2 5.5 3.2 4.5 4.5 4.5V6C3.8 6 3.5 6.5 3.5 7C3.5 7.5 3.8 8 4.5 8C5.2 8 5.5 7.5 5.5 7V1H7Z" />
                                </svg>
                              </div>
                              <span className="cad-run-time">Running 23 days</span>
                            </div>
                            <span className="cad-ad-badge cad-badge-testing">Testing</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cad-section-card">
                    <div className="cad-card-title">Card 2: Performance Signals</div>
                    <div className="cad-section-fill">
                      <div className="cad-signal-list">
                        <div className="cad-signal-item">
                          <div className="cad-signal-dot cad-dot-green" />
                          <div className="cad-signal-text">Average run time: 23 days (strong signal)</div>
                        </div>
                        <div className="cad-signal-item">
                          <div className="cad-signal-dot cad-dot-blue" />
                          <div className="cad-signal-text">Estimated spend increasing — scaling detected</div>
                          <div className="cad-signal-right">
                            <div className="cad-tiktok-small">
                              <svg width={8} height={8} viewBox="0 0 10 10" fill="white" aria-hidden>
                                <path d="M7 1C7 1 7.5 3 9 3.5V5C8 5 7 4.5 7 4.5V7C7 8.5 5.8 9.5 4.5 9.5C3.2 9.5 2 8.5 2 7C2 5.5 3.2 4.5 4.5 4.5V6C3.8 6 3.5 6.5 3.5 7C3.5 7.5 3.8 8 4.5 8C5.2 8 5.5 7.5 5.5 7V1H7Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="cad-signal-item">
                          <div className="cad-signal-dot cad-dot-purple" />
                          <div className="cad-signal-text">High engagement rate on UGC formats</div>
                          <div className="cad-signal-right">
                            <div className="cad-tiktok-small">
                              <svg width={8} height={8} viewBox="0 0 10 10" fill="white" aria-hidden>
                                <path d="M7 1C7 1 7.5 3 9 3.5V5C8 5 7 4.5 7 4.5V7C7 8.5 5.8 9.5 4.5 9.5C3.2 9.5 2 8.5 2 7C2 5.5 3.2 4.5 4.5 4.5V6C3.8 6 3.5 6.5 3.5 7C3.5 7.5 3.8 8 4.5 8C5.2 8 5.5 7.5 5.5 7V1H7Z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cad-section-card cad-section-balance">
                    <div className="cad-card-title">Card 3: Winning Ad Patterns</div>
                    <div className="cad-section-fill">
                      <div className="cad-pattern-row">
                        <NextImage
                          className="cad-pattern-img"
                          src={PRODUCT_SIGNAL_HTML_PREVIEW[0].src}
                          alt={PRODUCT_SIGNAL_HTML_PREVIEW[0].alt}
                          width={30}
                          height={30}
                          sizes="52px"
                        />
                        <span className="cad-vs-badge">vs</span>
                        <NextImage
                          className="cad-pattern-img"
                          src={PRODUCT_SIGNAL_HTML_PREVIEW[1].src}
                          alt={PRODUCT_SIGNAL_HTML_PREVIEW[1].alt}
                          width={52}
                          height={52}
                          sizes="52px"
                        />
                        <div className="cad-pattern-text">
                          <div className="cad-pattern-title">UGC lifestyle content outperforming studio shots 3:1</div>
                        </div>
                        <div className="cad-pin-icon" aria-hidden>
                          <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                            <circle cx="5" cy="5" r="3" stroke="#aaa" strokeWidth="1.2" />
                            <circle cx="5" cy="5" r="1" fill="#aaa" />
                          </svg>
                        </div>
                      </div>
                      <div className="cad-pattern-row">
                        <div className="cad-pattern-text">
                          <div className="cad-pattern-title">Hook style: Problem-solution (10 sec) highest completion rate.</div>
                        </div>
                        <div className="cad-pin-icon" aria-hidden>
                          <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                            <circle cx="5" cy="5" r="3" stroke="#aaa" strokeWidth="1.2" />
                            <circle cx="5" cy="5" r="1" fill="#aaa" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="cad-section-card cad-section-balance">
                    <div className="cad-card-title">Card 4: Creative Angles</div>
                    <div className="cad-section-fill">
                      <div className="cad-angles-grid">
                        <div className="cad-angle-chip cad-angle-highlight">
                          <span className="cad-angle-text">
                            Lifestyle
                            <br />
                            in-home use
                          </span>
                          <span className="cad-angle-count">42</span>
                        </div>
                        <div className="cad-angle-chip cad-angle-blue">
                          <span className="cad-angle-text">
                            Customer
                            <br />
                            testimonial
                          </span>
                          <span className="cad-angle-count">71</span>
                        </div>
                        <div className="cad-angle-chip" style={{ background: "#f0eae4" }}>
                          <span className="cad-angle-text">
                            Side-by-side
                            <br />
                            comparison
                          </span>
                          <span className="cad-angle-count">09</span>
                        </div>
                        <div className="cad-angle-chip" style={{ background: "#f5e8e0" }}>
                          <span className="cad-angle-text">
                            Unboxing
                            <br />
                            moment
                          </span>
                          <span className="cad-angle-count">08</span>
                        </div>
                      </div>
                    </div>
                    <div className="cad-card-footer-note">Lifestyle format: highest CTR this week</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cad-sparkle" aria-hidden>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsWorkspacePreview({
  userQuery,
  chatUserMessage,
  fillHeight,
}: {
  userQuery: string
  /** Optional override for the user bubble (e.g. first card demo copy). */
  chatUserMessage?: string
  /** When true, stretch to parent height (tall first card). */
  fillHeight?: boolean
}) {
  const [statusIdx, setStatusIdx] = useState(0)
  const bubbleText = (chatUserMessage ?? userQuery).trim()

  useEffect(() => {
    const t = setInterval(() => {
      setStatusIdx((i) => (i + 1) % STATUS_MESSAGES.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      className={`relative flex h-full min-h-[280px] w-full flex-col overflow-hidden ${WORKSPACE_PREVIEW_GLOW_GUTTER} md:min-h-full ${fillHeight ? "h-full min-h-0" : "h-full min-h-[280px] md:min-h-full"
        }`}
    >
      <style dangerouslySetInnerHTML={{ __html: ANALYTICS_CHAT_SCROLL_STYLE }} />
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
        style={WORKSPACE_PREVIEW_SHELL_STYLE}
      />

      <div className={WORKSPACE_PREVIEW_INNER_CENTER}>
        <div className={`${WORKSPACE_PREVIEW_DASHBOARD_FRAME} max-w-[820px] w-full ml-auto mr-[-40px] h-[580px] my-[40px] overflow-hidden rounded-xl border border-white/60 bg-[#F2F0E9]/75 backdrop-blur-xl md:flex-row`}>
          {/* Left: chat — warm beige, compact like reference */}
          <div className="flex h-full min-h-0 w-full flex-col border-b border-[#E8E4DC] md:w-[40%] md:border-b-0 md:border-r md:border-[#E8E4DC]">
            <div className="analytics-chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-[#F9F8F3] p-4 sm:p-5">
              <div className="flex justify-end">
                <div className="max-w-[95%] rounded-[22px] bg-[#EDEAE0] px-4 py-2.5 text-[13px] font-normal leading-snug text-[#2D3748] shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:text-sm">
                  {bubbleText}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E4DC] bg-white shadow-sm">
                  <Sparkles className="h-4 w-4 shrink-0 text-[#4A5568]" strokeWidth={1.75} />
                </div>
                <p className="max-w-[92%] text-[13px] font-normal leading-relaxed text-[#2D3748] sm:text-[14px]">
                  Scanning <strong className="font-semibold text-[#1e293b]">Shopify stores</strong>,{" "}
                  <strong className="font-semibold text-[#1e293b]">TikTok trends</strong>, and{" "}
                  <strong className="font-semibold text-[#1e293b]">ad performance signals</strong> to identify breakout
                  products.
                </p>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center gap-4 py-6 sm:py-8">
                <div className="relative h-10 w-10" aria-hidden>
                  <div className="absolute inset-0 rounded-full border-[3px] border-[#E5E1D8]" />
                  <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#94A3B8] border-r-[#94A3B8]/30" style={{ animationDuration: "0.9s" }} />
                </div>
                <p className="text-center text-[13px] font-normal tracking-tight text-[#475569] sm:text-sm">
                  {STATUS_MESSAGES[statusIdx]}
                  <span className="inline-block w-6 text-[#94a3b8]">...</span>
                </p>
              </div>
            </div>

            <div className="border-t border-[#EDE9E0] bg-[#F9F8F3] px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
              <div className="flex items-center gap-2 rounded-[18px] border border-white/80 bg-white px-3 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] sm:gap-3 sm:px-4 sm:py-3">
                <div className="flex shrink-0 items-center gap-2.5 text-[#94A3B8] sm:gap-3">
                  <Paperclip className="h-4 w-4 shrink-0 cursor-default" strokeWidth={1.75} />
                  <ImageIcon className="h-4 w-4 shrink-0 cursor-default" strokeWidth={1.75} />
                </div>
                <div className="min-h-[22px] flex-1 border-l border-[#E8E4DC] pl-3 sm:pl-4">
                  <span className="inline-block h-4 w-px animate-pulse bg-[#64748B]" aria-hidden />
                </div>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EEF7] text-[#64748B] shadow-sm transition-colors hover:bg-[#DFE8F6]"
                  aria-label="Send"
                >
                  <ArrowUp className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Right: product signals + indicators */}
          <div className="flex w-full flex-1 flex-col overflow-y-auto bg-[#F2F0E9] p-4 sm:p-5 md:w-[60%] md:p-5 lg:p-6">
            <div className="space-y-4">
              <div className="rounded-[20px] border border-black/[0.04] bg-[#F2F0E9]/80 p-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:p-5">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                  Product Signals
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
                  {PRODUCT_SIGNAL_IMAGES.map((img, i) => {
                    const badge =
                      i === 0 ? "Trending" : i === 1 ? "Rising" : i === 2 ? "Rising" : i === 3 ? "Trending" : null
                    const blurred = i === 3
                    return (
                      <div
                        key={img.src}
                        className={`relative overflow-hidden rounded-[14px] border border-black/[0.06] bg-white p-1.5 shadow-sm ${blurred ? "opacity-50" : ""}`}
                      >
                        {badge ? (
                          <span
                            className={`absolute right-1 top-1 z-[1] rounded-md px-1.5 py-0.5 text-[8px] font-semibold shadow-sm sm:text-[9px] ${blurred ? "bg-slate-100/90 text-slate-500" : "bg-[#E8EEF7]/95 text-[#3B5B8C]"}`}
                          >
                            {badge}
                          </span>
                        ) : null}
                        <div
                          className={`relative aspect-square w-full overflow-hidden rounded-[10px] bg-[#F0EDE6] ${badge ? "mt-5 sm:mt-6" : "mt-1"} ${blurred ? "blur-[2px]" : ""}`}
                        >
                          <NextImage
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 25vw, 120px"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.04] bg-[#EDEAE0]/80 p-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:p-5">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                  Early Indicators
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  <div className="flex items-center gap-2 rounded-full border border-[#E0DCD4] bg-white px-3 py-2 shadow-sm sm:gap-2.5 sm:px-4">
                    <Music2 className="h-4 w-4 shrink-0 text-[#475569]" strokeWidth={2} />
                    <span className="text-[11px] font-medium text-[#334155] sm:text-xs">TikTok engagement increasing</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-[#E0DCD4] bg-white px-3 py-2 shadow-sm sm:gap-2.5 sm:px-4">
                    <Search className="h-4 w-4 shrink-0 text-[#475569]" strokeWidth={2} />
                    <span className="text-[11px] font-medium text-[#334155] sm:text-xs">Search demand rising</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-black/[0.04] bg-[#EDEAE0]/80 p-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:p-5">
                <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                  Potential Winners
                </h3>
                <div
                  className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                  style={{
                    WebkitMaskImage: "linear-gradient(to right, black 75%, transparent 100%)",
                    maskImage: "linear-gradient(to right, black 75%, transparent 100%)",
                  }}
                >
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      className="flex items-center gap-3 rounded-[14px] border border-black/[0.06] bg-white p-3 shadow-sm"
                    >
                      <div className="h-12 w-12 shrink-0 rounded-lg bg-[#ECE8E0]" />
                      <div className="flex-1 space-y-2">
                        <div className="h-2 w-[85%] rounded-full bg-[#E5E1D8]" />
                        <div className="h-2 w-[55%] rounded-full bg-[#E5E1D8]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative flex min-h-[88px] flex-col justify-center rounded-[20px] border border-black/[0.04] bg-[#EDEAE0]/80 p-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] sm:p-5">
                <h3 className="absolute left-4 top-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8] sm:left-5 sm:top-5">
                  Competition Level
                </h3>
                <div className="mt-6 flex justify-center sm:mt-7">
                  <span className="text-xs font-medium text-[#64748B]">Low saturation detected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative scroll-smooth bg-[oklch(0.988_0.0041_91.45)] py-10 sm:py-12 lg:py-14"
    >
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10 lg:mb-14 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-black">
          Every problem. Solved.
          <br />
          <span className="text-brand-600">In one platform.</span>
        </h2>
        <p className="mt-4 sm:mt-6 text-sm sm:text-[15px] text-neutral-500 max-w-3xl mx-auto px-2">
          Here’s how HypeOn maps directly to the decisions you make every week as a founder.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col items-center">
        {sections.map((item, index) => (
          <Card key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* Bottom Spacer */}
      <div className="h-[6vh]" />
    </section>
  )
}

function Card({ item, index }: { item: (typeof sections)[number], index: number }) {
  const isDesktop = useIsDesktop()

  return (
    <div
      className="relative md:sticky md:top-20 lg:top-24 w-full flex justify-center px-3 sm:px-4 md:px-6 mb-[6vh] sm:mb-[10vh]"
      style={{
        zIndex: index + 1,
        paddingTop: isDesktop ? `${index * 25}px` : 0
      }}
    >
      <div className="relative flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_30px_-22px_rgba(15,23,42,0.18)] sm:rounded-[2.5rem] md:flex-row md:items-stretch lg:max-w-[1200px] min-h-[360px] sm:min-h-[460px] md:h-[min(76vh,680px)] md:min-h-[min(76vh,680px)]">
        {/* LEFT: feature copy */}
        <div className="flex min-h-0 w-full shrink-0 flex-col justify-center bg-white p-5 sm:p-6 md:w-[34%] md:p-8 lg:p-12">
          <div className="mb-4 flex items-center gap-3 sm:mb-6">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-xs text-white">
              {item.id}
            </span>
            <span className="text-sm font-semibold uppercase tracking-widest text-neutral-400">Feature</span>
          </div>

          <h3 className="mb-4 text-xl leading-tight text-slate-900 sm:mb-6 sm:text-2xl md:text-3xl">
            {item.title}
          </h3>

          <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">
            {item.description}
          </p>

          <a
            href="https://calendly.com/yash-hypeon/30min?month=2026-03"
            className="mt-6 inline-flex min-h-[44px] w-fit items-center justify-center rounded-full bg-black px-5 py-2.5 font-medium text-white transition-colors hover:bg-neutral-800 sm:mt-8"
          >
            Get the demo
          </a>
        </div>

        {/* RIGHT: workspace preview — pricing UI for Pricing Intelligence; product signals UI for others */}
        <div className="relative flex min-h-[320px] w-full flex-1 flex-col overflow-hidden sm:min-h-[400px] md:min-h-0 md:h-full md:w-[66%]">
          {item.id === "03" ? (
            <PricingIntelligenceHtmlPreview fillHeight />
          ) : item.id === "06" ? (
            <InventoryAiHtmlPreview fillHeight />
          ) : item.id === "07" ? (
            <AdIntelligenceHtmlPreview fillHeight />
          ) : item.id === "08" ? (
            <CompetitorSocialHtmlPreview fillHeight />
          ) : item.id === "02" ? (
            <RevenueAttributionHtmlPreview fillHeight />
          ) : item.id === "09" ? (
            <AiInsightsHtmlPreview fillHeight />
          ) : item.id === "10" ? (
            <MarketExpansionHtmlPreview fillHeight />
          ) : item.id === "01" ? (
            <ProductSignalsHtmlPreview fillHeight />
          ) : item.id === "05" ? (
            <KeywordIntelligenceHtmlPreview fillHeight />
          ) : (
            <AnalyticsWorkspacePreview userQuery={item.title} fillHeight />
          )}
        </div>
      </div>
    </div>
  )
}
