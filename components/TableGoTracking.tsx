"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function TableGoTracking() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const host = new URL(event.origin).hostname;

        if (host !== "tablego.uk" && !host.endsWith(".tablego.uk")) {
          return;
        }
      } catch {
        return;
      }

      if (!event.data || event.data.type !== "tablego:booking_confirmed") {
        return;
      }

      window.dataLayer = window.dataLayer || [];

      window.dataLayer.push({
        event: "tablego_booking_confirmed",
        reservationId: event.data.reservationId || "",
      });

      console.log("TableGo booking confirmed:", event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null;
}
