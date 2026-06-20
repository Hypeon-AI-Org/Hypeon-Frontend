import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { cookies } from "next/headers";
import "./globals.css";
import ScrollRevealSetup from "@/components/ScrollRevealSetup";
import IosErrorOverlay from "@/components/IosErrorOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import { ScaleProvider } from "@/context/ScaleContext";
import CookieBanner from "@/components/CookieBanner";
import CompetitorReportPopup from "@/components/CompetitorReportPopup";
import GtmOnConsent from "@/components/GtmOnConsent";
import MetaPixelOnConsent from "@/components/MetaPixelOnConsent";
import MetaPixelPageView from "@/components/MetaPixelPageView";
import { consentModeUpdateFromPrefs } from "@/lib/googleConsentMode";
import {
  getMetaPixelBootstrapScript,
  META_PIXEL_ID,
  META_PIXEL_SCRIPT_ID,
} from "@/lib/metaPixel";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const CONSENT_KEY = "hypeon_cookie_consent_v1";
type ConsentCookie = {
  marketing?: boolean;
  analytics?: boolean;
  personalised?: boolean;
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
  metadataBase: new URL("https://hypeon.ai"),
  title: "HypeOn AI - The Future of D2C Trend Intelligence",
  description:
    "Discover winning products and viral trends 3 weeks before your competitors. The #1 AI Trend Intelligence Platform for D2C.",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "fza2dgTuUQVS7-VUdg8YiazMXq8QndJ9dtL7sUBCfD8",
    other: {
      "facebook-domain-verification": "y322ekcwtnzw7qybbx2wxvaaqdjfnp",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const consent = await readConsentFromRequestCookie();
  const allowGtm = Boolean(consent?.marketing || consent?.analytics);
  const allowMetaPixel = Boolean(consent?.marketing);
  const consentUpdateJson = JSON.stringify(
    consentModeUpdateFromPrefs({
      marketing: Boolean(consent?.marketing),
      analytics: Boolean(consent?.analytics),
      personalised: Boolean(consent?.personalised),
    })
  );

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script id="google-consent-mode-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
'ad_storage':'denied','ad_user_data':'denied','ad_personalization':'denied',
'analytics_storage':'denied','functionality_storage':'denied','personalization_storage':'denied',
'security_storage':'granted','wait_for_update':500
});`}
        </Script>
        {allowGtm && (
          <Script id="google-tag-manager" strategy="beforeInteractive">
            {`gtag('consent','update',${consentUpdateJson});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N3J2S7LP');`}
          </Script>
        )}
        {allowMetaPixel && (
          <Script id={META_PIXEL_SCRIPT_ID} strategy="afterInteractive">
            {getMetaPixelBootstrapScript()}
          </Script>
        )}
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
        {allowMetaPixel && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        )}
        <ScaleProvider>
          <IosErrorOverlay />
          <SmoothScroll />
          <ScrollRevealSetup />
          {children}
          <CookieBanner />
          <CompetitorReportPopup />
          <GtmOnConsent />
          <MetaPixelOnConsent />
          <MetaPixelPageView />
        </ScaleProvider>
      </body>
    </html>
  );
}
