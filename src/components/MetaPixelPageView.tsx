"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Fires PageView on client-side navigations (App Router). Initial load is handled by the bootstrap script.
 */
export default function MetaPixelPageView() {
  const pathname = usePathname();
  const skipNextPageView = useRef(true);

  useEffect(() => {
    const fbq = window.fbq;
    if (!fbq) return;
    if (skipNextPageView.current) {
      skipNextPageView.current = false;
      return;
    }
    fbq("track", "PageView");
  }, [pathname]);

  return null;
}
