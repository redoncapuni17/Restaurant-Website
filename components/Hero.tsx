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
      className="relative min-h-[92vh] overflow-x-clip bg-pupa-beige"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[92vh]">
        <Image
          src={SITE_IMAGES.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[92vh] bg-gradient-to-r from-pupa-dark/45 via-pupa-dark/20 to-transparent lg:via-pupa-dark/15" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[92vh] bg-gradient-to-t from-pupa-dark/35 via-transparent to-pupa-dark/10" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-14 lg:py-16 lg:min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start min-w-0">
          <motion.div
            custom={0.05}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-pupa-cream/35 bg-pupa-dark/40"
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
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-pupa-cream font-semibold leading-[1.05] mb-5"
          >
            Pupa
            <br />
            <span className="italic font-medium text-gold-gradient inline-block pr-2 pb-1">
              Restaurant
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE_OUT }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-pupa-gold to-transparent mb-5"
          />

          <motion.p
            custom={0.32}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="font-sans text-pupa-cream/90 text-base md:text-lg tracking-wide max-w-lg mb-8 text-balance leading-relaxed"
          >
            Freshly grilled meats marinated in rich Mediterranean flavours.
            Manchester, NQ.
          </motion.p>

          <motion.div
            custom={0.4}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/menus"
              className="group relative inline-flex px-8 py-4 border border-pupa-cream/70 text-pupa-cream font-sans text-base tracking-widest uppercase rounded-sm overflow-hidden transition-colors duration-300 hover:text-pupa-dark hover:border-pupa-cream"
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
          </motion.div>
        </div>

        {/* Pa fade — widget rezervon hapësirën që iframe-resize të mos “rifreskojë” faqen */}
        <div className="w-full max-w-[500px] mx-auto lg:ml-auto lg:mr-0">
          <BookingSystemWidget />
        </div>
      </div>
    </section>
  );
}
