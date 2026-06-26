"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const [bgUrl, setBgUrl] = useState<string | null>(null);

  // Merr foton e sfondit nga admini (Supabase)
  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase
        .from("site_images")
        .select("url")
        .eq("key", "hero")
        .maybeSingle();
      if (data?.url) setBgUrl(data.url);
    };
    fetchHero();
  }, []);

  // Parallax efekt
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background: foto nga admini, ose gradient si fallback */}
      <div
        ref={bgRef}
        className="absolute inset-0 scale-110 parallax-img bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-dark"
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

      {/* Gradient Overlay - e ngrohtë dhe elegante */}
      <div className="absolute inset-0 bg-gradient-to-b from-pupa-dark/70 via-pupa-dark/50 to-pupa-dark/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-pupa-dark/30 via-transparent to-pupa-dark/30" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-6"
        >
          Mediterranean Charcoal Grill
        </motion.p>

        {/* Titulli kryesor */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-pupa-cream font-medium leading-tight mb-6"
        >
          Pupa
          <br />
          <span className="italic font-light">Restaurant</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-24 h-px bg-pupa-gold mb-6"
        />

        {/* Përshkrim */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="font-sans text-pupa-warm text-sm md:text-base tracking-wide max-w-md mb-10"
        >
          Freshly grilled meats marinated in rich Mediterranean flavours.
          Manchester, NQ.
        </motion.p>

        {/* Butonat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="#reservation"
            className="px-8 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream transition-all duration-300"
          >
            Reserve a Table
          </Link>
          <Link
            href="/menus"
            className="px-8 py-3.5 border border-pupa-cream text-pupa-cream font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream hover:text-pupa-dark transition-all duration-300"
          >
            View Menu
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-pupa-warm text-xs tracking-widest uppercase font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-pupa-gold"
        />
      </motion.div>
    </section>
  );
}
