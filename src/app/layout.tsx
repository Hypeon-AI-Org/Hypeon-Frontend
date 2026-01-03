import type { Metadata } from "next";
import "./globals.css";
import ScrollRevealSetup from "@/components/ScrollRevealSetup";
import { ContactModalProvider } from "@/context/ContactModalContext";

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
      <body className="antialiased selection:bg-brand-500 selection:text-white relative font-sans">
        <ContactModalProvider>
          <ScrollRevealSetup />
          {children}
        </ContactModalProvider>
      </body>
    </html>
  );
}
