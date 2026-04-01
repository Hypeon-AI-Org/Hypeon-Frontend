import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { cookies } from "next/headers";
import "./globals.css";
import ScrollRevealSetup from "@/components/ScrollRevealSetup";
import { ScaleProvider } from "@/context/ScaleContext";
import CookieBanner from "@/components/CookieBanner";
import GtmOnConsent from "@/components/GtmOnConsent";

const CONSENT_KEY = "hypeon_cookie_consent_v1";
type ConsentCookie = {
  marketing?: boolean;
  analytics?: boolean;
};

async function readConsentFromRequestCookie(): Promise<ConsentCookie | null> {
  const jar = await cookies();
  const raw = jar.get(CONSENT_KEY)?.value;
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as ConsentCookie | null;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const consent = await readConsentFromRequestCookie();
  const allowGtm = Boolean(consent?.marketing || consent?.analytics);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {allowGtm && (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N3J2S7LP');`}
          </Script>
        )}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL@24,400,0&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-brand-500 selection:text-white relative font-sans ">
        {allowGtm && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-N3J2S7LP"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <ScaleProvider>
          <ScrollRevealSetup />
          {children}
          <CookieBanner />
          <GtmOnConsent />
        </ScaleProvider>
      </body>
    </html>
  );
}
