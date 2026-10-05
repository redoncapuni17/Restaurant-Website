"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import {
  TABLEGO_ALLOWED_ORIGIN,
  TABLEGO_IFRAME_RESIZER_URL,
  TABLEGO_WIDGET_URL,
} from "@/lib/booking-widget";

declare global {
  interface Window {
    iFrameResize?: (
      options: Record<string, unknown>,
      selector: string
    ) => void;
  }
}

/** Lartësi e qëndrueshme fillestare — afër formës reale, që resize të mos kërcejë faqen. */
const BOOKING_BASE_HEIGHT = 520;

function iframeResizeOptions() {
  return {
    checkOrigin: [TABLEGO_ALLOWED_ORIGIN],
    scrolling: false,
    tolerance: 8,
    heightCalculationMethod: "lowestElement",
  };
}

export default function BookingSystemWidget() {
  const resizedRef = useRef(false);

  useEffect(() => {
    // Nëse skripti është ngarkuar tashmë (navigim client-side), lidhe menjëherë.
    if (resizedRef.current || !window.iFrameResize) return;
    const el = document.getElementById("tablego-booking");
    if (!el) return;
    resizedRef.current = true;
    window.iFrameResize(iframeResizeOptions(), "#tablego-booking");
  }, []);

  return (
    <div className="leading-[0] bg-transparent">
      <iframe
        id="tablego-booking"
        src={TABLEGO_WIDGET_URL}
        title="Book a table at Pupa Restaurant & Bar"
        scrolling="no"
        className="block w-full border-0 bg-transparent"
        style={{
          width: "100%",
          maxWidth: 560,
          height: BOOKING_BASE_HEIGHT,
          margin: 0,
          backgroundColor: "transparent",
        }}
      />
      <Script
        src={TABLEGO_IFRAME_RESIZER_URL}
        strategy="lazyOnload"
        onLoad={() => {
          if (resizedRef.current || !window.iFrameResize) return;
          resizedRef.current = true;
          window.iFrameResize(iframeResizeOptions(), "#tablego-booking");
        }}
      />
    </div>
  );
}
