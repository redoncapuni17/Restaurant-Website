"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function IframeLoadOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const iframe = containerRef.current?.querySelector("iframe");
    if (!iframe) return;

    const markLoaded = () => setIsLoaded(true);

    try {
      if (iframe.contentDocument?.readyState === "complete") {
        markLoaded();
        return;
      }
    } catch {
      // Cross-origin iframe — rely on the load event.
    }

    iframe.addEventListener("load", markLoaded, { once: true });
    return () => iframe.removeEventListener("load", markLoaded);
  }, []);

  return (
    <div className="rounded-xl overflow-hidden border border-pupa-warm/30 bg-white shadow-lg shadow-black/20">
      <div className="relative bg-white">
        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-white">
            <div className="relative w-14 h-14">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 border-2 border-transparent border-t-pupa-gold rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center text-pupa-gold text-xl">
                🍽
              </div>
            </div>
            <p className="font-sans text-pupa-brown/50 text-xs tracking-wider">
              Loading reservation system...
            </p>
          </div>
        )}

        <div ref={containerRef} className="overflow-hidden bg-white">
          {children}
        </div>
      </div>

      <div className="border-t border-pupa-warm/20 bg-pupa-beige/40 px-4 py-3 text-center">
        <span className="font-sans text-pupa-brown/45 text-xs">
          Powered by ResDiary — secure online booking
        </span>
      </div>
    </div>
  );
}
