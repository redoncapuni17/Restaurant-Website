"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Hyrje elegante që shfaqet kur hapet faqja për herë të parë në sesion.
// Përdor sessionStorage që të mos shfaqet sërish gjatë navigimit të brendshëm.
export default function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("pupa-intro-seen");
    if (seen) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      sessionStorage.setItem("pupa-intro-seen", "1");
      setShow(false);
      document.body.style.overflow = "";
    }, 2400);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-pupa-dark"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          {/* Glow i artë në qendër */}
          <div className="absolute w-[40rem] h-[40rem] glow-gold blur-3xl opacity-40 animate-glow-pulse" />

          <div className="relative flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans text-pupa-champagne text-[0.65rem] sm:text-xs tracking-[0.5em] uppercase mb-5"
            >
              Mediterranean Charcoal Grill
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="font-serif text-7xl sm:text-8xl md:text-9xl font-semibold text-gold-gradient animate-gradient-x"
            >
              Pupa
            </motion.h1>

            {/* Vija e artë që vizatohet */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease: "easeInOut" }}
              className="mt-5 h-px w-40 origin-center bg-gradient-to-r from-transparent via-pupa-gold to-transparent"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-5 font-sans text-pupa-warm/80 text-xs sm:text-sm tracking-[0.4em] uppercase"
            >
              Restaurant &amp; Bar
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
