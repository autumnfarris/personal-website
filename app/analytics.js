"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-QXRDP0JP4Z"; // your GA4 Measurement ID

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize GA once
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, []);

  // Track pageviews on route change
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      ReactGA.send({ hitType: "pageview", page: url });
    }
  }, [pathname, searchParams]);

  return null;
}
