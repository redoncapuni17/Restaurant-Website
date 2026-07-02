"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { SITE_IMAGES } from "@/lib/siteConfig";
import { EASE_OUT } from "@/components/motion/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: EASE_OUT },
  }),
};

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[640px] overflow-hidden bg-pupa-dark">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-dark"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        style={{
          backgroundImage: `url('${SITE_IMAGES.hero}')`,
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-pupa-dark/85 via-pupa-dark/55 to-pupa-dark/95" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pupa-brown/50 via-transparent to-pupa-dark/40" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(8,11,9,0.9)] pointer-events-none" />
      <div
        className={`absolute -bottom-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] glow-gold blur-3xl opacity-40 pointer-events-none ${
          ready ? "animate-glow-pulse" : ""
        }`}
      />
      <div className="absolute inset-0 bg-grain opacity-[0.1] mix-blend-overlay pointer-events-none" />

      <div
        className={`absolute top-1/4 left-[12%] w-2 h-2 rounded-full bg-pupa-gold/60 blur-[1px] pointer-events-none ${
          ready ? "animate-float" : ""
        }`}
      />
      <div
        className={`absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full bg-pupa-champagne/50 blur-[1px] pointer-events-none ${
          ready ? "animate-float-slow" : ""
        }`}
      />
      <div
        className={`absolute bottom-1/3 left-[20%] w-1 h-1 rounded-full bg-pupa-gold/50 pointer-events-none ${
          ready ? "animate-float-slow" : ""
        }`}
      />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <motion.div
          custom={0.1}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-7 rounded-full border border-pupa-gold/40 bg-pupa-dark/60"
        >
          <UtensilsCrossed size={14} className="text-pupa-gold" />
          <span className="font-sans text-pupa-champagne text-[0.65rem] md:text-xs tracking-[0.35em] uppercase">
            Mediterranean Charcoal Grill
          </span>
        </motion.div>

        <motion.h1
          custom={0.22}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          className="font-serif text-7xl md:text-8xl lg:text-9xl text-pupa-cream font-semibold leading-[0.95] mb-6"
        >
          Pupa
          <br />
          <span className="italic font-medium text-gold-gradient">Restaurant</span>
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={ready ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE_OUT }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-pupa-gold to-transparent mb-6 origin-center"
        />

        <motion.p
          custom={0.55}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          className="font-sans text-pupa-warm text-sm md:text-base tracking-wide max-w-md mb-10 text-balance"
        >
          Freshly grilled meats marinated in rich Mediterranean flavours.
          Manchester, NQ.
        </motion.p>

        <motion.div
          custom={0.68}
          variants={fadeUp}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#reservation"
            className="group relative overflow-hidden px-8 py-4 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-2xl hover:shadow-pupa-gold/30 hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              Reserve a Table
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
          </Link>

          <Link
            href="/menus"
            className="group relative px-8 py-4 border border-pupa-cream/70 text-pupa-cream font-sans text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-colors duration-300 hover:text-pupa-dark hover:border-pupa-cream"
          >
            <span className="relative z-10">View Menu</span>
            <span className="absolute inset-0 bg-pupa-cream scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: EASE_OUT }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-5 h-9 rounded-full border border-pupa-gold/60 flex justify-center pt-1.5">
          <motion.div
            animate={ready ? { y: [0, 10, 0], opacity: [1, 0.3, 1] } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-pupa-gold"
          />
        </div>
        <span className="text-pupa-warm/70 text-[0.6rem] tracking-[0.3em] uppercase font-sans">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
