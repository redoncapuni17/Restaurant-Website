"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Hero({ initialBgUrl = null }: { initialBgUrl?: string | null }) {
  const [bgUrl, setBgUrl] = useState<string | null>(initialBgUrl);

  // URL-ja vjen nga serveri (SSR) që imazhi të nisë menjëherë. Bëjmë fetch në
  // klient VETËM si fallback nëse serveri nuk e dha (p.sh. ndryshim i fundit).
  useEffect(() => {
    if (initialBgUrl) return;
    const fetchHero = async () => {
      const { data } = await supabase
        .from("site_images")
        .select("url")
        .eq("key", "hero")
        .maybeSingle();
      if (data?.url) setBgUrl(data.url);
    };
    fetchHero();
  }, [initialBgUrl]);

  return (
    <section className="relative h-[92vh] min-h-[640px] overflow-hidden bg-pupa-dark">
      {/* Background: foto nga admini (statike, nuk lëviz), ose gradient si fallback */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-dark"
        style={
          bgUrl
            ? {
                backgroundImage: `url('${bgUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center 35%",
              }
            : undefined
        }
      />

      {/* Gradient Overlays - errësirë dramatike me nuancë smeraldi */}
      <div className="absolute inset-0 bg-gradient-to-b from-pupa-dark/85 via-pupa-dark/55 to-pupa-dark/95" />
      <div className="absolute inset-0 bg-gradient-to-tr from-pupa-brown/50 via-transparent to-pupa-dark/40" />
      {/* Vinjetë në skaje */}
      <div className="absolute inset-0 shadow-[inset_0_0_180px_60px_rgba(8,11,9,0.9)] pointer-events-none" />
      {/* Glow smerald në fund */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[60rem] h-[40rem] glow-gold blur-3xl opacity-40 animate-glow-pulse pointer-events-none" />
      {/* Teksturë grain delikate */}
      <div className="absolute inset-0 bg-grain opacity-[0.1] mix-blend-overlay pointer-events-none" />

      {/* Orb-e dekorativë që notojnë */}
      <div className="absolute top-1/4 left-[12%] w-2 h-2 rounded-full bg-pupa-gold/60 blur-[1px] animate-float pointer-events-none" />
      <div className="absolute top-1/3 right-[15%] w-1.5 h-1.5 rounded-full bg-pupa-champagne/50 blur-[1px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/3 left-[20%] w-1 h-1 rounded-full bg-pupa-gold/50 animate-float-slow pointer-events-none" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        {/* Tagline me badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 mb-7 rounded-full border border-pupa-gold/40 bg-pupa-dark/40 backdrop-blur-sm"
        >
          <UtensilsCrossed size={14} className="text-pupa-gold" />
          <span className="font-sans text-pupa-champagne text-[0.65rem] md:text-xs tracking-[0.35em] uppercase">
            Mediterranean Charcoal Grill
          </span>
        </motion.div>

        {/* Titulli kryesor */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="font-serif text-7xl md:text-8xl lg:text-9xl text-pupa-cream font-semibold leading-[0.95] mb-6"
        >
          Pupa
          <br />
          <span className="italic font-medium text-gold-gradient animate-gradient-x">
            Restaurant
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-pupa-gold to-transparent mb-6"
        />

        {/* Përshkrim */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-sans text-pupa-warm text-sm md:text-base tracking-wide max-w-md mb-10 text-balance"
        >
          Freshly grilled meats marinated in rich Mediterranean flavours.
          Manchester, NQ.
        </motion.p>

        {/* Butonat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Butoni kryesor me efekt shine */}
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
            {/* Shine sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
          </Link>

          {/* Butoni dytësor */}
          <Link
            href="/menus"
            className="group relative px-8 py-4 border border-pupa-cream/70 text-pupa-cream font-sans text-sm tracking-widest uppercase rounded-sm overflow-hidden transition-colors duration-300 hover:text-pupa-dark hover:border-pupa-cream"
          >
            <span className="relative z-10">View Menu</span>
            <span className="absolute inset-0 bg-pupa-cream scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator — formë mouse-i */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div className="w-5 h-9 rounded-full border border-pupa-gold/60 flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
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
