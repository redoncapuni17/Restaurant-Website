"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Loader2 } from "lucide-react";
import {
  TABLEGO_ALLOWED_ORIGIN,
  TABLEGO_IFRAME_RESIZER_URL,
  TABLEGO_WIDGET_URL,
} from "@/lib/booking-widget";
import { EASE_OUT } from "@/components/motion/constants";

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
const LOAD_FALLBACK_MS = 8000;

function bookingMaxHeight() {
  if (typeof window === "undefined") return 780;
  return Math.min(780, Math.round(window.innerHeight * 0.82));
}

function iframeResizeOptions() {
  return {
    checkOrigin: [TABLEGO_ALLOWED_ORIGIN],
    scrolling: false,
    tolerance: 24,
    heightCalculationMethod: "lowestElement",
    minHeight: BOOKING_BASE_HEIGHT,
  };
}

export default function BookingSystemWidget() {
  const resizedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [maxHeight, setMaxHeight] = useState(780);

  useEffect(() => {
    const update = () => setMaxHeight(bookingMaxHeight());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const attachResizer = useCallback(() => {
    if (resizedRef.current || !window.iFrameResize) return;
    const el = document.getElementById("tablego-booking");
    if (!el) return;
    resizedRef.current = true;
    window.iFrameResize(iframeResizeOptions(), "#tablego-booking");
  }, []);

  const markReady = useCallback(() => {
    setReady(true);
    attachResizer();
  }, [attachResizer]);

  useEffect(() => {
    attachResizer();
  }, [attachResizer]);

  // If the iframe never fires onLoad, still reveal after a timeout
  useEffect(() => {
    if (ready) return;
    const t = window.setTimeout(() => setReady(true), LOAD_FALLBACK_MS);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT }}
      className="relative leading-[0]"
      style={{ minHeight: BOOKING_BASE_HEIGHT }}
    >
      <AnimatePresence>
        {!ready && (
          <motion.div
            key="booking-loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-xl bg-white px-6 text-center shadow-xl shadow-black/15"
            aria-busy="true"
            aria-live="polite"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pupa-brown/10">
              <CalendarDays className="text-pupa-accent" size={22} strokeWidth={1.5} />
            </div>
            <p className="font-serif text-xl text-pupa-brown font-medium">
              Reserve a table
            </p>
            <p className="font-sans text-sm text-pupa-brown/55 tracking-wide">
              Loading booking calendar…
            </p>
            <Loader2
              className="mt-1 text-pupa-gold animate-spin"
              size={20}
              aria-hidden
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative overflow-x-hidden overflow-y-auto"
        style={{ maxHeight }}
      >
        <iframe
          id="tablego-booking"
          src={TABLEGO_WIDGET_URL}
          title="Book a table at Pupa Restaurant & Bar"
          scrolling="no"
          className="block w-full border-0"
          onLoad={markReady}
          style={{
            width: "100%",
            maxWidth: 560,
            height: BOOKING_BASE_HEIGHT,
            minHeight: BOOKING_BASE_HEIGHT,
            margin: 0,
          }}
        />
      </motion.div>

      <Script
        src={TABLEGO_IFRAME_RESIZER_URL}
        strategy="afterInteractive"
        onLoad={attachResizer}
      />
    </motion.div>
  );
}
