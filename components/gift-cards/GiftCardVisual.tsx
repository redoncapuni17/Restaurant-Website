"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/components/motion/constants";

function OliveSprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M60 10 C45 50, 70 80, 55 120 C40 155, 65 175, 60 195"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />
      <ellipse cx="42" cy="45" rx="14" ry="7" fill="currentColor" opacity="0.2" transform="rotate(-25 42 45)" />
      <ellipse cx="78" cy="70" rx="16" ry="8" fill="currentColor" opacity="0.25" transform="rotate(20 78 70)" />
      <ellipse cx="38" cy="95" rx="15" ry="7" fill="currentColor" opacity="0.18" transform="rotate(-35 38 95)" />
      <ellipse cx="72" cy="115" rx="14" ry="7" fill="currentColor" opacity="0.22" transform="rotate(15 72 115)" />
      <ellipse cx="48" cy="140" rx="13" ry="6" fill="currentColor" opacity="0.2" transform="rotate(-20 48 140)" />
      <ellipse cx="68" cy="165" rx="12" ry="6" fill="currentColor" opacity="0.15" transform="rotate(25 68 165)" />
      <circle cx="35" cy="48" r="3" fill="currentColor" opacity="0.35" />
      <circle cx="80" cy="72" r="3.5" fill="currentColor" opacity="0.3" />
      <circle cx="40" cy="98" r="2.5" fill="currentColor" opacity="0.28" />
    </svg>
  );
}

function FieldLine({ label, wide = true }: { label: string; wide?: boolean }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <p className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase text-pupa-brown/55 mb-1">
        {label}
      </p>
      <div className="h-px bg-pupa-brown/20" />
    </div>
  );
}

export default function GiftCardVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem]"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute -inset-4 glow-gold blur-2xl opacity-40 pointer-events-none" />

      <motion.div
        whileHover={{ y: -6, rotateY: -4, rotateX: 2 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className="relative rounded-xl overflow-hidden shadow-[0_28px_60px_-20px_rgba(15,44,34,0.55)] ring-1 ring-pupa-brown/10"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Top band */}
        <div className="h-3 sm:h-3.5 bg-pupa-brown" />

        <div className="relative bg-pupa-cream px-6 sm:px-8 pt-7 sm:pt-8 pb-6 sm:pb-7 overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-[0.06] mix-blend-multiply pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-pupa-gold/[0.06] to-transparent pointer-events-none" />

          <OliveSprig className="absolute -right-2 top-8 w-24 sm:w-28 h-auto text-pupa-accent pointer-events-none" />

          <div className="relative z-10 text-center mb-6 sm:mb-7">
            <p className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.45em] uppercase text-pupa-brown/60 mb-3">
              Pupa Restaurant &amp; Bar
            </p>
            <h3 className="font-serif text-4xl sm:text-[2.75rem] text-pupa-brown font-semibold leading-none tracking-wide uppercase">
              Gift Card
            </h3>
            <p className="font-serif italic text-pupa-accent text-lg sm:text-xl mt-2">
              a gift for you
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <span className="w-8 h-px bg-pupa-gold/50" />
              <span className="w-1.5 h-1.5 rotate-45 border border-pupa-gold/60" />
              <span className="w-8 h-px bg-pupa-gold/50" />
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-5 mb-6 sm:mb-7">
            <FieldLine label="To" />
            <FieldLine label="From" />
            <FieldLine label="For (£)" />
            <div>
              <p className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase text-pupa-brown/55 mb-1">
                Expiry Date
              </p>
              <div className="h-px bg-pupa-brown/20" />
              <p className="font-sans text-[0.5rem] text-pupa-brown/35 mt-1 tracking-wide">
                (a year from purchase)
              </p>
            </div>
            <div>
              <p className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase text-pupa-brown/55 mb-1">
                Voucher No.
              </p>
              <div className="h-px bg-pupa-brown/20" />
            </div>
          </div>

          <div className="relative z-10 text-center border-t border-pupa-brown/10 pt-4">
            <p className="font-sans text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase text-pupa-brown/50">
              Mediterranean Charcoal Grill
            </p>
            <p className="font-sans text-[0.5rem] sm:text-[0.55rem] tracking-[0.15em] uppercase text-pupa-brown/40 mt-1.5 leading-relaxed">
              37 Turner Street, Manchester M4 1DW
              <br />
              www.puparestaurant.com
            </p>
          </div>
        </div>

        {/* Bottom band */}
        <div className="h-3 sm:h-3.5 bg-pupa-brown" />
      </motion.div>

      <p className="text-center mt-5 sm:mt-6">
        <span className="font-serif text-lg sm:text-xl text-pupa-brown font-medium">
          Gift Card
        </span>
        <span className="block font-sans text-pupa-brown/50 text-sm mt-1">
          from £25.00
        </span>
      </p>
    </motion.div>
  );
}
