"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { SITE_IMAGES } from "@/lib/siteConfig";
import { EASE_OUT } from "@/components/motion/constants";
import BookingSystemWidget from "@/components/BookingSystemWidget";

/** Vetëm fade — pa y/scale dhe pa “ready” flip që shkakton një hap të dytë pas animacionit. */
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 0.65, delay, ease: EASE_OUT },
  }),
};

export default function Hero() {
  return (
    <section
      id="reservation"
      className="relative min-h-[calc(100svh-var(--site-header,5.25rem))] bg-pupa-beige"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={SITE_IMAGES.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-pupa-dark/50 via-pupa-dark/25 to-transparent lg:via-pupa-dark/20" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-pupa-dark/40 via-transparent to-pupa-dark/15" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-4 pb-12 lg:min-h-[calc(100svh-var(--site-header,5.25rem))] lg:py-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
        <div className="contents lg:flex lg:min-h-[calc(100svh-var(--site-header,5.25rem)-4rem)] lg:flex-col lg:justify-center lg:items-start lg:min-w-0 lg:text-left">
          <div className="order-1 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
            <motion.div
              custom={0.05}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 px-4 py-2 mb-3 rounded-full border border-pupa-cream/35 bg-pupa-dark/40"
            >
              <UtensilsCrossed size={14} className="text-pupa-gold" />
              <span className="font-sans text-pupa-cream text-sm tracking-[0.35em] uppercase">
                Mediterranean Charcoal Grill
              </span>
            </motion.div>

            <motion.h1
              custom={0.12}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-pupa-cream font-semibold leading-[0.92] tracking-[-0.02em] [text-shadow:0_3px_28px_rgba(26,20,16,0.6)]"
            >
              Pupa
              <br />
              <span className="relative mt-1 inline-block italic font-medium tracking-normal text-pupa-champagne pr-2 [text-shadow:0_2px_18px_rgba(26,20,16,0.55)]">
                Restaurant
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-[2px] w-24 bg-gradient-to-r from-pupa-gold via-pupa-champagne to-transparent"
                />
              </span>
            </motion.h1>
          </div>

          <div className="order-3 flex flex-col items-center text-center lg:order-2 lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.28, ease: EASE_OUT }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-pupa-champagne to-transparent mb-4"
            />

            <p className="hero-fade-in hero-fade-in-copy font-sans text-pupa-cream text-base md:text-lg tracking-wide max-w-lg mb-5 text-balance leading-relaxed [text-shadow:0_2px_16px_rgba(26,20,16,0.65)]">
              Freshly grilled meats marinated in rich Mediterranean flavours.
              Manchester, NQ.
            </p>

            <div className="hero-fade-in hero-fade-in-menu">
              <Link
                href="/menus"
                className="group relative inline-flex px-8 py-4 border border-pupa-cream/85 text-pupa-cream font-sans text-base tracking-widest uppercase rounded-sm overflow-hidden transition-colors duration-300 hover:text-pupa-dark hover:border-pupa-cream [text-shadow:0_2px_12px_rgba(26,20,16,0.45)] hover:[text-shadow:none]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Menu
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 bg-pupa-cream scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            </div>
          </div>
        </div>

        {/* Pa fade — widget rezervon hapësirën që iframe-resize të mos “rifreskojë” faqen.
            Pa scroll: rritet poshtë, dhe fotoja e hero-s (inset-0) zgjatet bashkë me seksionin. */}
        <div className="order-2 mt-3 w-full max-w-[500px] mx-auto lg:order-none lg:mt-[max(0px,calc((100svh-var(--site-header,5.25rem)-4rem-38rem)/2))] lg:ml-auto lg:mr-0">
          <p className="hero-fade-in mb-3 rounded-lg bg-pupa-cream px-4 py-3 text-center font-sans text-[0.7rem] sm:text-xs font-medium uppercase leading-relaxed tracking-[0.14em] sm:tracking-widest text-pupa-brown shadow-lg shadow-black/20">
            Our restaurant prefers cash payments due to high card transaction fees
          </p>
          <BookingSystemWidget />
        </div>
      </div>
    </section>
  );
}
