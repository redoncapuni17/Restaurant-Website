"use client";

import { useCallback, useEffect, useRef } from "react";
import Script from "next/script";
import {
  TABLEGO_ALLOWED_ORIGIN,
  TABLEGO_IFRAME_RESIZER_URL,
  TABLEGO_WIDGET_URL,
} from "@/lib/booking-widget";

type ResizableFrame = HTMLIFrameElement & {
  iFrameResizer?: {
    resize: () => void;
    removeListeners: () => void;
  };
};

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

function releaseResizer(iframe: ResizableFrame) {
  iframe.iFrameResizer?.removeListeners();
  delete iframe.iFrameResizer;
}

export default function BookingSystemWidget() {
  const iframeRef = useRef<ResizableFrame>(null);
  const kickTimers = useRef<number[]>([]);

  const syncHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe || !window.iFrameResize) return;

    // Mos e blloko me një flag njëherësh: pas një ngarkimi të pjesshëm
    // (tabi ende duke u rrotulluar) ose navigimi client-side, iframe-i
    // është i ri dhe duhet rilidhur, përndryshe orët mbeten të prera.
    if (!iframe.iFrameResizer) {
      window.iFrameResize(iframeResizeOptions(), iframe);
      // Nëse "Check availability" është shtypur para se skripti të lidhej,
      // matur përsëri sapo orët të jenë në faqe.
      for (const delay of [250, 1000]) {
        kickTimers.current.push(
          window.setTimeout(() => iframeRef.current?.iFrameResizer?.resize(), delay)
        );
      }
      return;
    }

    iframe.iFrameResizer.resize();
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    syncHeight();

    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      const frame = iframeRef.current;
      if (!frame) return;
      releaseResizer(frame);
      syncHeight();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("pageshow", onPageShow);
      kickTimers.current.forEach((id) => window.clearTimeout(id));
      kickTimers.current = [];
      if (iframe) releaseResizer(iframe);
    };
  }, [syncHeight]);

  return (
    <div className="leading-[0] bg-transparent">
      <iframe
        ref={iframeRef}
        id="tablego-booking"
        src={TABLEGO_WIDGET_URL}
        title="Book a table at Pupa Restaurant & Bar"
        scrolling="no"
        className="block w-full border-0 bg-transparent"
        style={{
          width: "100%",
          maxWidth: 560,
          minHeight: BOOKING_BASE_HEIGHT,
          margin: 0,
          backgroundColor: "transparent",
        }}
        onLoad={syncHeight}
      />
      {/* afterInteractive: mos prit window.load. lazyOnload nuk niste fare
          sa kohë tabi i Chrome-it ishte ende duke u ngarkuar, dhe Check
          availability zgjeronte widget-in brenda një iframe-i të prerë. */}
      <Script
        src={TABLEGO_IFRAME_RESIZER_URL}
        strategy="afterInteractive"
        onReady={syncHeight}
      />
    </div>
  );
}
