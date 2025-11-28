# HypeOn AI - Frontend

A modern Next.js application for HypeOn AI, the AI-powered trend intelligence platform for D2C brands.

## 🚀 How to Run the Project

### Prerequisites
- Node.js 18.0.0 or higher
- npm, yarn, pnpm, or bun package manager

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

The page will auto-update as you edit files. Hot reload is enabled by default.

## 📖 About HypeOn AI

**HypeOn AI** is the future of D2C trend intelligence. We help e-commerce founders discover winning products and viral trends **3 weeks before** their competitors.

### What We Do

HypeOn AI analyzes **20M+ daily signals** from TikTok, Reddit, Amazon, and other platforms to predict what products will sell next month—not what sold last month. Our proprietary AI algorithms identify breakout trends 72 hours before they hit mainstream tools.

### Key Features

- **Real-Time Trend Radar**: 24/7 monitoring of TikTok, Reddit, and Pinterest to identify "breakout" signals before they peak
- **AI Launch Score**: Proprietary algorithm that calculates `Demand × Competition` to give every product a validation score (90+ means launch immediately)
- **Creative Intelligence**: AI-generated hooks, scripts, and landing page copy based on top-performing ads
- **AI Copilot Chat**: GPT-4 powered assistant that helps you find untapped niches and validate product ideas

### How It Works

1. **Select Your Niche**: Simply tell HypeOn AI your category (e.g., "Home Decor") and target region
2. **Get Validated Winners**: Receive a curated list of products with rising search volume and low ad competition
3. **Launch with Confidence**: Use our generated ad copy and creative briefs to launch ads that actually convert

### The HypeOn Advantage

Unlike traditional tools like JungleScout that show you what sold last month, HypeOn AI uses predictive AI to show you what will sell next month. We combine:
- **Trends** from multiple sources
- **Keywords** with real-time velocity signals
- **Creatives** analysis from top-performing ads

All in one dashboard, giving you a 72-hour lead time on your competitors.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Inter & Plus Jakarta Sans (Google Fonts)
- **Animations**: Custom CSS animations with Intersection Observer

## 📁 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   └── components/      # React components
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── ValueProp.tsx
│       ├── Pricing.tsx
│       ├── Footer.tsx
│       └── Background.tsx
├── assets/               # Static assets
│   └── HypeOn_Logo.png
├── public/              # Public static files
└── tailwind.config.js   # Tailwind configuration
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach with breakpoints for all devices
- **Smooth Animations**: Scroll-triggered animations with multiple reveal effects
- **Glassmorphism UI**: Modern transparent navigation and card effects
- **3D Interactive Elements**: Mouse-tilt effects on hero dashboard
- **Typewriter Animation**: Dynamic typing effect in copilot preview
- **Marquee Animation**: Continuous scrolling platform logos
- **Dark/Light Mode Ready**: Built with Tailwind's dark mode support

## 📝 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

© 2025 HypeOn AI Inc. All rights reserved.
