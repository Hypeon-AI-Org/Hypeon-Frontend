import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollRevealSetup from "@/components/ScrollRevealSetup";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "HypeOn AI - The Future of D2C Trend Intelligence",
  description: "Discover winning products and viral trends 3 weeks before your competitors. The #1 AI Trend Intelligence Platform for D2C.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${plusJakarta.variable} antialiased selection:bg-brand-500 selection:text-white relative font-sans`}>
        <ScrollRevealSetup />
        {children}
      </body>
    </html>
  );
}
