import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"LL ivory"', 'Georgia', 'sans-serif'],
        display: ["Inter", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.75rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px",
      },
      letterSpacing: {
        'tight-heading': '-0.025em',
        'tighter-heading': '-0.035em',
      },
      colors: {
        // Dashboard (emerald) + site
        primary: "#059669",
        "brand-accent": "#33e67a",
        "background-light": "#f8fafc",
        "background-dark": "#0f172a",
        "accent-dark": "#000000",
        // Design tokens
        surface: '#F9F7F4',       // off-white/cream main bg
        'surface-2': '#FDFDFC',   // near-white section bg
        ink: {
          DEFAULT: '#0f172a',     // near-black text
          muted: '#64748b',       // secondary text
          faint: '#94a3b8',       // placeholder / captions
        },
        accent: {
          DEFAULT: '#16a34a',     // green — badges only
          light: '#dcfce7',
          dark: '#15803d',
        },
        // Neutral brand (replaces pink/indigo)
        brand: {
          DEFAULT: '#0f172a',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          900: '#0f172a',
          dark: '#0f172a',
        }
      },
      backgroundImage: {
        'gradient-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
      },
      animation: {
        'blob': 'blob 8s infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'float-delayed': 'float 3.5s ease-in-out 1.5s infinite',
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.4,0,0.2,1) forwards',
        'shimmer': 'shimmer 2.2s linear infinite',
        'shine-sweep': 'shineSweep 0.6s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
        'grow': 'grow forwards',
        'fade-in': 'fadeIn forwards',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shineSweep: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(250%) skewX(-12deg)' },
        },
        grow: {
          '0%': { height: '0%' },
          '100%': { height: 'var(--tw-h)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    }
  },
  plugins: [tailwindcssAnimate],
};
