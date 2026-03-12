import type { Metadata, Viewport } from "next";
import "./globals.css";
import ScrollRevealSetup from "@/components/ScrollRevealSetup";
import { ScaleProvider } from "@/context/ScaleContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "HypeOn AI - The Future of D2C Trend Intelligence",
  description:
    "Discover winning products and viral trends 3 weeks before your competitors. The #1 AI Trend Intelligence Platform for D2C.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@24,400,0&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-brand-500 selection:text-white relative font-sans ">
        <ScaleProvider>
          <ScrollRevealSetup />
          {children}
        </ScaleProvider>
      </body>
    </html>
  );
}
