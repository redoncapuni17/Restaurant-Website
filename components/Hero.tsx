"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { SITE_IMAGES } from "@/lib/siteConfig";
import { EASE_OUT } from "@/components/motion/constants";
import BookingSystemWidget from "@/components/BookingSystemWidget";

/** Tekstet hyjnë nga lart — sinkron me navbar. */
const fadeFromTop = {
  hidden: { opacity: 0, y: -18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: EASE_OUT },
  }),
};

export default function Hero() {
  return (
    <section
      id="reservation"
      className="relative min-h-[92vh] overflow-x-clip bg-pupa-dark"
    >
      <div className="absolute inset-0">
        <Image
          src={SITE_IMAGES.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-pupa-dark/45 via-pupa-dark/20 to-transparent lg:via-pupa-dark/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-pupa-dark/35 via-transparent to-pupa-dark/10" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 py-14 lg:py-16 lg:min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Nën lg, `contents` i lë fëmijët në grid që kalendari të hyjë mes titullit dhe butonit. */}
        <div className="contents lg:flex lg:flex-col lg:items-start lg:min-w-0">
          <motion.div
            custom={0.12}
            variants={fadeFromTop}
            initial="hidden"
            animate="visible"
            className="order-4 lg:order-none justify-self-center lg:justify-self-auto inline-flex items-center gap-2.5 px-4 py-2 lg:mb-6 rounded-full border border-pupa-cream/35 bg-pupa-dark/40"
          >
            <UtensilsCrossed size={14} className="text-pupa-gold shrink-0" />
            <span className="font-sans text-pupa-cream text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.35em] uppercase">
              Mediterranean Charcoal Grill
            </span>
          </motion.div>

          <div className="order-1 lg:order-none text-center lg:text-left flex flex-col items-center lg:items-start min-w-0">
            <motion.h1
              custom={0.18}
              variants={fadeFromTop}
              initial="hidden"
              animate="visible"
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-pupa-cream font-semibold leading-[1.05] mb-5"
            >
              Pupa
              <br />
              Restaurant
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.24, ease: EASE_OUT }}
              className="w-24 h-px bg-gradient-to-r from-transparent via-pupa-gold to-transparent mb-5"
            />

            <motion.p
              custom={0.28}
              variants={fadeFromTop}
              initial="hidden"
              animate="visible"
              className="hidden lg:block font-sans text-pupa-cream/90 text-base md:text-lg tracking-wide max-w-lg lg:mb-8 text-balance leading-relaxed"
            >
              Freshly grilled meats marinated in rich Mediterranean flavours.
              Manchester, NQ.
            </motion.p>
          </div>

          <motion.div
            custom={0.34}
            variants={fadeFromTop}
            initial="hidden"
            animate="visible"
            className="order-3 lg:order-none justify-self-center lg:justify-self-auto"
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

        <div className="order-2 lg:order-none w-full max-w-[500px] mx-auto lg:ml-auto lg:mr-0">
          <BookingSystemWidget />
        </div>
      </div>
    </section>
  );
}
