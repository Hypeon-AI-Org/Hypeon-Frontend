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
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@24,400,0&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-brand-500 selection:text-white relative font-sans ">
        <ContactModalProvider>
          <ScrollRevealSetup />
          {children}
        </ContactModalProvider>
      </body>
    </html>
  );
}
