"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const TABLEGO_VOUCHERS_URL =
  "https://tablego.uk/widget/pupa-restaurant-and-bar--wwefqm/vouchers";
const TABLEGO_IFRAME_RESIZER_URL = "https://tablego.uk/js/iframeResizer.min.js";
const TABLEGO_ALLOWED_ORIGIN = "https://tablego.uk";
const VOUCHER_MIN_HEIGHT = 320;
/** TableGo cards can't be styled inside the iframe, so the whole widget is scaled down. */
const VOUCHER_SCALE = 0.92;

declare global {
  interface Window {
    iFrameResize?: (
      options: Record<string, unknown>,
      selector: string
    ) => void;
  }
}

export default function GiftCardVouchersWidget() {
  const resizedRef = useRef(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = document.getElementById("tablego-vouchers");
    const frame = frameRef.current;
    if (!iframe || !frame) return;

    const fit = () => {
      frame.style.height = `${Math.round(iframe.offsetHeight * VOUCHER_SCALE)}px`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(iframe);
    return () => observer.disconnect();
  }, []);

  function attachResizer() {
    if (resizedRef.current || !window.iFrameResize) return;
    if (!document.getElementById("tablego-vouchers")) return;
    resizedRef.current = true;
    window.iFrameResize(
      {
        checkOrigin: [TABLEGO_ALLOWED_ORIGIN],
        heightCalculationMethod: "lowestElement",
        minHeight: VOUCHER_MIN_HEIGHT,
        tolerance: 24,
      },
      "#tablego-vouchers"
    );
  }

  useEffect(() => {
    attachResizer();
  }, []);

  return (
    <div
      ref={frameRef}
      className="w-full overflow-hidden bg-transparent"
      style={{ minHeight: Math.round(VOUCHER_MIN_HEIGHT * VOUCHER_SCALE) }}
    >
      <iframe
        id="tablego-vouchers"
        title="Buy a Pupa Restaurant gift card"
        src={TABLEGO_VOUCHERS_URL}
        className="block w-full border-0 bg-transparent"
        style={{
          transform: `scale(${VOUCHER_SCALE})`,
          transformOrigin: "top center",
          minHeight: VOUCHER_MIN_HEIGHT,
          backgroundColor: "transparent",
          colorScheme: "normal",
        }}
      />
      <Script
        src={TABLEGO_IFRAME_RESIZER_URL}
        strategy="afterInteractive"
        onLoad={attachResizer}
      />
    </div>
  );
}
