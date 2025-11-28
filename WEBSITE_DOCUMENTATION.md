# HypeOn AI Website Documentation

## Table of Contents
1. [Overview](#overview)
2. [Website Structure](#website-structure)
3. [Section-by-Section Breakdown](#section-by-section-breakdown)
4. [Component Details](#component-details)
5. [Data & Content](#data--content)
6. [Styling & Design System](#styling--design-system)
7. [Technical Stack](#technical-stack)

---

## Overview

**Project Name:** HypeOn AI Frontend  
**Purpose:** Marketing website for HypeOn AI - An AI-powered trend intelligence platform for D2C brands  
**Framework:** Next.js 14 with App Router  
**Language:** TypeScript  
**Styling:** Tailwind CSS

---

## Website Structure

The website follows a single-page layout with the following sections (in order):

1. **Background** (Fixed layer)
2. **Navigation Bar** (Fixed at top)
3. **Hero Section**
4. **Value Proposition Section** (Comparison + Methodology)
5. **Features Section**
6. **Pricing Section**
7. **Footer**

---

## Section-by-Section Breakdown

### 1. Background Component (`Background.tsx`)

**Purpose:** Provides animated background effects throughout the page

**Content:**
- **Animated Blobs:** Three gradient orbs with different colors and positions
  - Top-left: Brand pink (`bg-brand-200/55`)
  - Top-right: Indigo (`bg-indigo-200/55`)
  - Bottom-left: Purple (`bg-purple-200/55`)
- **Grid Pattern:** Subtle dot grid overlay (`bg-grid-light`)

**Visual Effects:**
- Blur effects (80px)
- Mix-blend-multiply for color blending
- Parallax scrolling effects
- Animation delays for staggered movement

---

### 2. Navigation Bar (`Navbar.tsx`)

**Position:** Fixed at top, centered, pill-shaped glassmorphism design

**Content:**

#### Desktop Navigation:
- **Logo:** HypeOn AI logo image + text
- **Navigation Links:**
  - Features (links to `#features`)
  - Methodology (links to `#how-it-works`)
  - Pricing (links to `#pricing`)
- **CTA Buttons:**
  - "Log in" (text link)
  - "Start Free Demo" (primary button)

#### Mobile Navigation:
- Hamburger menu icon
- Collapsible menu with same links
- Mobile-optimized layout

**Data Points:**
- Logo image path: `../../assets/HypeOn_Logo.png`
- Brand name: "HypeOn AI" (with "AI" in brand color)

---

### 3. Hero Section (`Hero.tsx`)

**Purpose:** Main landing area with value proposition and interactive demo

**Content:**

#### Badge/Announcement:
- Text: "New: Launch Score v2.0 is Live"
- Animated ping indicator (brand color)
- Hover effects

#### Main Headline:
- **Text:** "Your end-to-end AI growth partner for D2C brands"
- **Size:** `text-3xl md:text-5xl`
- **Font:** Display font (LL ivory)
- **Line Break:** "Your end-to-end" on first line, "AI growth partner for D2C brands" on second line (desktop only)

#### Subheadline/Description:
- **Text:** "Powered by our **Hype Score**, we analyze **20M+ signals** to uncover product trends, high-value keywords, and winning ad creatives before your competition even knows they exist."
- **Emphasized Terms:** "Hype Score" and "20M+ signals"

#### CTA Buttons:
1. **Primary CTA:** "Find My Next Winner"
   - Icon: Zap
   - Style: Dark background (slate-900)
   - Hover: Shadow and translate effects

2. **Secondary CTA:** "Watch 1-Min Demo"
   - Icon: PlayCircle
   - Style: White background with border
   - Links to demo video

#### Interactive Dashboard Demo:

**Floating Elements:**
1. **Success Notification** (top-right):
   - Icon: TrendingUp (green)
   - Text: "Trend Detected"
   - Data: "Pet Grooming Vac +420%"
   - Position: Absolute, floating animation

2. **AI Chat Preview** (bottom-left):
   - Icon: Bot (brand color)
   - Label: "AI Copilot"
   - Message: "I found 3 untapped niches in Germany with low ad competition."

**Main Dashboard Interface:**

*Mac Window Header:*
- Traffic light buttons (red, yellow, green)
- URL: "hypeon.ai/dashboard" with lock icon

*Sidebar (Left - Desktop only):*
- **Discovery Section:**
  - Active: "Trend Spotter" (highlighted)
  - "Keyword Spy"
  - "Ad Creatives"
- **Saved Launches:**
  - "Project Alpha" (purple indicator)
  - "Summer Drop" (blue indicator)

*Main Content Area:*

**AI Copilot Chat:**
- Title: "Ask HypeOn AI Copilot"
- Typewriter effect: "Find me trending pet accessories in Germany under €50..."
- Bot icon with gradient background

**Results Cards** (appear after typing completes):

*Result 1: Calming Pet Bed*
- Emoji: 🐶
- Title: "Calming Pet Bed"
- Niche: "Pet Accessories"
- Volume Badge: "+420% Vol" (green)
- Launch Score: **92/100**
- Progress bar: 92% filled (gradient: brand-400 to brand-600)
- Tags: "TikTok Viral", "Low Competition"

*Result 2: Hydrogen Water Bottle*
- Emoji: 💧
- Title: "Hydrogen Water Bottle"
- Niche: "Wellness"
- Volume Badge: "+185% Vol" (green)
- Launch Score: **88/100**
- Progress bar: 88% filled
- Tags: "Google Trends", "High Margin"

**Logos Marquee:**
- Text: "Trusted by founders scaling on"
- Scrolling logos:
  - Meta Ads (Facebook icon)
  - Google Trends (BarChart3 icon)
  - Shopify (ShoppingBag icon)
  - Amazon (Package icon)
  - TikTok Shop (Video icon)
  - Instagram (Instagram icon)
  - Pinterest (Search icon)
- Infinite scroll animation

**Interactive Features:**
- 3D tilt effect on dashboard (desktop only)
- Typewriter animation
- Fade-in results
- Mouse parallax effects

---

### 4. Value Proposition Section (`ValueProp.tsx`)

This section contains two subsections:

#### A. Comparison Section

**Purpose:** Compare old methods vs. HypeOn AI approach

**Content:**

**Section Header:**
- Title: "You're Looking in the **Rearview Mirror.**"
- Description: "Tools like JungleScout show you what sold *last month*. By the time you launch, the trend is dead. HypeOn AI uses predictive AI to show you what will sell *next month*."

**Two-Column Comparison:**

*Left Column - "The Old Way":*
- Badge: Red XCircle icon + "The Old Way"
- List items:
  1. Clock icon: "Manual research across 6 different tools (Google Trends, Ad Library, Amazon)."
  2. BarChart2 icon: "Relying on lagging sales data from 30 days ago."
  3. Frown icon: "Guessing ad angles and wasting budget on testing."
- Style: Muted, lower opacity

*Right Column - "The AI Way":*
- Badge: "The HypeOn AI Advantage" (brand color, positioned top-right)
- Header: CheckCircle2 icon + "The AI Way" (brand color)
- List items:
  1. Zap icon: "One dashboard combining Trends + Keywords + Creatives."
  2. TrendingUp icon: "Real-time velocity signals (72-hour lead time)."
  3. PenTool icon: "AI-generated hooks and creative briefs ready to launch."
- Style: Highlighted, scaled up, prominent border

#### B. Methodology Section (`#how-it-works`)

**Purpose:** Explain the 3-step process

**Layout:** Two columns (desktop), stacked (mobile)

**Left Column - Steps:**

**Section Header:**
- Title: "From 'I have no idea' to **Market Leader in 5 minutes.**"

**Step 1: Select Your Niche**
- Number badge: "1" (brand color circle)
- Title: "Select Your Niche"
- Description: "Simply tell HypeOn AI your category (e.g., 'Home Decor') and target region."

**Step 2: Get Validated Winners**
- Number badge: "2" (brand color circle)
- Title: "Get Validated Winners"
- Description: "Receive a curated list of products with rising search volume and low ad competition."

**Step 3: Launch with Confidence**
- Number badge: "3" (brand color circle)
- Title: "Launch with Confidence"
- Description: "Use our generated ad copy and creative briefs to launch ads that actually convert."

**CTA Link:**
- Text: "Explore all features"
- Icon: ArrowRight
- Links to: `#features`

**Right Column - Trend Analysis Card:**

**Card Header:**
- Label: "TREND ANALYSIS"
- Product Name: "Sunset Projection Lamp"
- Status Badge: "Viral" (green, with TrendingUp icon)

**Bar Chart Visualization:**
- 6 bars showing trend growth
- Heights: 20%, 35%, 40%, 60%, 85%, 100%
- Colors: Brand color with varying opacity
- Shadow effects on last two bars

**Data Points:**
- **Keywords:** "aesthetic room decor"
- **Top Platform:** TikTok (with Video icon)

**Visual Effects:**
- Background glow (brand color, blurred)
- Floating animation
- Glassmorphism card style

---

### 5. Features Section (`Features.tsx`)

**Section ID:** `#features`

**Purpose:** Showcase three core features

**Section Header:**
- Title: "Stop Guessing. **Start Knowing.**"
- Description: "Most tools show you what sold last month. HypeOn AI shows you what will sell next month by analyzing velocity signals across the entire web."

**Three Feature Cards:**

#### Feature 1: Real-Time Trend Radar
- **Icon:** Radar (blue)
- **Title:** "Real-Time Trend Radar"
- **Description:** "We scrape TikTok, Reddit, and Pinterest 24/7. Our AI identifies 'breakout' signals 72 hours before they hit mainstream tools like JungleScout."
- **Color Theme:** Blue

#### Feature 2: AI Launch Score (Highlighted)
- **Icon:** BrainCircuit (brand pink)
- **Title:** "AI Launch Score"
- **Description:** "Don't waste money testing bad ideas. Our proprietary algorithm ranks products by **Demand × Competition** to give you a single validation score."
- **Color Theme:** Brand pink
- **Special Styling:** Highlighted border, shadow, white background

#### Feature 3: Creative Intelligence
- **Icon:** Wand2 (purple)
- **Title:** "Creative Intelligence"
- **Description:** "Knowing *what* to sell is half the battle. HypeOn AI analyzes top-performing ads to generate high-converting hooks, angles, and scripts for you."
- **Color Theme:** Purple

**Visual Effects:**
- Staggered reveal animations
- Glassmorphism cards
- Hover effects

---

### 6. Pricing Section (`Pricing.tsx`)

**Section ID:** `#pricing`

**Purpose:** Display pricing plans

**Section Header:**
- Title: "Simple Pricing, **Massive ROI**"
- Subtitle: "Pay for the tool with your first winning product launch."

**Two Pricing Plans:**

#### Plan 1: Starter
- **Price:** €29/month
- **Background:** Light gray (slate-50)
- **Features:**
  - ✓ 100 Trend Searches
  - ✓ Basic Launch Scores
  - ✓ Email Support
- **CTA Button:** "Start Trial"
  - Style: White background with border

#### Plan 2: Pro Growth (Featured)
- **Badge:** "POPULAR" (brand color, rotated)
- **Price:** €89/month
- **Background:** Dark (slate-900)
- **Text Color:** White
- **Features:**
  - ✓ Unlimited Searches
  - ✓ AI Copilot Chat
  - ✓ Creative Generator
- **CTA Button:** "Get Started"
  - Style: Brand color background

**Visual Effects:**
- Slide-in animations (left/right)
- Checkmark icons
- Hover effects on buttons

---

### 7. Footer (`Footer.tsx`)

**Purpose:** Site navigation and company information

**Layout:** 4-column grid (desktop), stacked (mobile)

**Column 1: Brand & Description**
- Logo + "HypeOn AI" text
- Description: "The secret weapon for modern D2C founders. Stop guessing and start scaling with predictive data."

**Column 2: Product Links**
- Heading: "Product"
- Links:
  - Features
  - Pricing
  - Chrome Extension

**Column 3: Resources Links**
- Heading: "Resources"
- Links:
  - Trend Report 2025
  - Case Studies
  - Help Center

**Column 4: Company Links**
- Heading: "Company"
- Links:
  - About Us
  - Contact
  - Privacy

**Bottom Bar:**
- Copyright: "© 2025 HypeOn AI Inc. All rights reserved."
- Social Media Icons:
  - Twitter
  - LinkedIn
  - GitHub

**Styling:**
- Hover effects on links (brand color)
- Border separator
- Responsive layout

---

## Component Details

### Reusable Components

#### ScrollReveal Components
- **ScrollRevealSetup.tsx:** Initializes scroll reveal animations
- **ScrollReveal.tsx:** Handles intersection observer for animations

**Animation Classes:**
- `reveal` - Fade up
- `reveal-blur` - Fade with blur
- `reveal-left` - Slide from left
- `reveal-right` - Slide from right
- `reveal-scale` - Scale up
- `reveal-rotate` - Rotate in
- `reveal-stagger` - Staggered children animation

---

## Data & Content

### Static Content Data

#### Hero Section Data:
```javascript
{
  badge: "New: Launch Score v2.0 is Live",
  headline: "Your end-to-end AI growth partner for D2C brands",
  description: "Powered by our Hype Score, we analyze 20M+ signals...",
  typewriterText: "Find me trending pet accessories in Germany under €50...",
  results: [
    {
      emoji: "🐶",
      title: "Calming Pet Bed",
      niche: "Pet Accessories",
      volume: "+420% Vol",
      score: 92,
      tags: ["TikTok Viral", "Low Competition"]
    },
    {
      emoji: "💧",
      title: "Hydrogen Water Bottle",
      niche: "Wellness",
      volume: "+185% Vol",
      score: 88,
      tags: ["Google Trends", "High Margin"]
    }
  ],
  platforms: ["Meta Ads", "Google Trends", "Shopify", "Amazon", "TikTok Shop", "Instagram", "Pinterest"]
}
```

#### Features Data:
```javascript
[
  {
    icon: "Radar",
    title: "Real-Time Trend Radar",
    description: "We scrape TikTok, Reddit, and Pinterest 24/7...",
    color: "blue"
  },
  {
    icon: "BrainCircuit",
    title: "AI Launch Score",
    description: "Don't waste money testing bad ideas...",
    color: "brand",
    highlighted: true
  },
  {
    icon: "Wand2",
    title: "Creative Intelligence",
    description: "Knowing what to sell is half the battle...",
    color: "purple"
  }
]
```

#### Pricing Data:
```javascript
[
  {
    name: "Starter",
    price: 29,
    currency: "€",
    period: "mo",
    features: [
      "100 Trend Searches",
      "Basic Launch Scores",
      "Email Support"
    ],
    cta: "Start Trial"
  },
  {
    name: "Pro Growth",
    price: 89,
    currency: "€",
    period: "mo",
    featured: true,
    badge: "POPULAR",
    features: [
      "Unlimited Searches",
      "AI Copilot Chat",
      "Creative Generator"
    ],
    cta: "Get Started"
  }
]
```

#### Trend Analysis Card Data:
```javascript
{
  label: "TREND ANALYSIS",
  product: "Sunset Projection Lamp",
  status: "Viral",
  chartData: [20, 35, 40, 60, 85, 100], // percentages
  keywords: "aesthetic room decor",
  platform: "TikTok"
}
```

---

## Styling & Design System

### Color Palette

**Brand Colors (Pink):**
- `brand-50`: `#fdf2f8` (lightest)
- `brand-100`: `#fce7f3`
- `brand-200`: `#fbcfe8`
- `brand-400`: `#f472b6`
- `brand-500`: `#ec4899` (primary)
- `brand-600`: `#db2777`
- `brand-900`: `#831843` (darkest)
- `brand.accent`: `#6366f1` (indigo)
- `brand.dark`: `#0f172a` (slate)

**Neutral Colors:**
- Background: `#f8fafc` (slate-50)
- Text: `#0f172a` (slate-900)
- Borders: Various slate shades

### Typography

**Font Family:**
- Primary: `"LL ivory", Georgia, sans-serif`
- Applied to all text (headings and body)

**Font Weights:**
- Body text: 400
- Headings (h3-h6): 400
- Main titles (h1, h2): 500
- Buttons/Labels: 400-500

**Font Sizes:**
- Main heading: `text-3xl md:text-5xl`
- Section headings: `text-3xl md:text-5xl`
- Subheadings: `text-xl` or `text-2xl`
- Body: `text-base` or `text-lg`

**Line Height:**
- Body text: 150%

### Design Patterns

**Glassmorphism:**
- `.glass-nav`: Navigation bar
- `.glass-nav-pill`: Pill-shaped navbar
- `.glass-card`: Feature cards and content cards
- Background: `rgba(255, 255, 255, 0.6-0.8)`
- Backdrop blur: 7-16px

**Animations:**
- Fade-up on scroll
- Typewriter effect
- Floating elements
- 3D tilt (desktop)
- Marquee scrolling
- Staggered reveals

**Spacing:**
- Section padding: `py-24`
- Container max-width: `max-w-7xl`
- Grid gaps: `gap-8` or `gap-12`

---

## Technical Stack

### Core Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Images:** Next.js Image component

### Key Features
- Server-side rendering
- Client-side interactivity (`'use client'`)
- Responsive design (mobile-first)
- Smooth scrolling
- Intersection Observer for animations
- 3D CSS transforms

### File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page (sections)
│   └── globals.css         # Global styles
└── components/
    ├── Background.tsx      # Animated background
    ├── Navbar.tsx          # Navigation
    ├── Hero.tsx            # Hero section
    ├── ValueProp.tsx       # Comparison & Methodology
    ├── Features.tsx        # Features section
    ├── Pricing.tsx         # Pricing section
    ├── Footer.tsx          # Footer
    ├── ScrollReveal.tsx    # Animation utilities
    └── ScrollRevealSetup.tsx # Animation setup
```

### Configuration Files
- `tailwind.config.js` - Tailwind configuration
- `next.config.js` - Next.js configuration
- `tsconfig.json` - TypeScript configuration

---

## Section IDs & Navigation

The website uses anchor links for navigation:

- `#features` - Features section
- `#how-it-works` - Methodology section
- `#pricing` - Pricing section

All navigation links use these IDs for smooth scrolling.

---

## Interactive Elements

### User Interactions

1. **Navigation:**
   - Smooth scroll to sections
   - Mobile menu toggle
   - Hover effects on links

2. **Hero Dashboard:**
   - 3D mouse tilt (desktop)
   - Typewriter animation
   - Results fade-in

3. **Animations:**
   - Scroll-triggered reveals
   - Floating elements
   - Marquee scrolling
   - Hover transitions

4. **Buttons:**
   - Hover effects
   - Transform animations
   - Color transitions

---

## Content Updates

### Where to Update Content

1. **Hero Section:** `src/components/Hero.tsx`
   - Headline (line 113-114)
   - Description (line 121-122)
   - Typewriter text (line 35)
   - Results data (lines 258-325)

2. **Features:** `src/components/Features.tsx`
   - Section header (lines 10-16)
   - Feature cards (lines 21-55)

3. **Pricing:** `src/components/Pricing.tsx`
   - Plans and prices (lines 18-71)

4. **Value Prop:** `src/components/ValueProp.tsx`
   - Comparison section (lines 12-76)
   - Methodology steps (lines 86-142)

5. **Footer:** `src/components/Footer.tsx`
   - Links and company info (lines 11-92)

---

## Notes

- All prices are in Euros (€)
- The site is optimized for mobile and desktop
- Animations are performance-optimized
- Images use Next.js Image component for optimization
- All external links currently point to "#" (placeholder)

---

**Last Updated:** 2025  
**Version:** 1.0
