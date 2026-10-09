"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "./constants";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; href: string; external?: boolean };
  backgroundImage?: string | null;
  imageOpacity?: number;
  tall?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  cta,
  backgroundImage,
  imageOpacity = 1,
  tall = false,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const height = tall
    ? "h-[52vh] min-h-[300px] sm:min-h-[360px] md:h-[65vh] lg:h-[70vh]"
    : "h-56 sm:h-64 md:h-72 lg:h-[22rem]";

  const fade = (delay: number, y = 14) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay, ease: EASE_OUT },
        };

  return (
    <section className={`relative ${height} overflow-hidden bg-pupa-brown`}>
      {backgroundImage ? (
        <div className="absolute inset-0" style={{ opacity: imageOpacity }}>
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-dark" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[28rem] sm:w-[40rem] h-[18rem] sm:h-[24rem] glow-gold blur-3xl opacity-25" />
        </>
      )}
      <div className="absolute inset-0 bg-pupa-dark/35" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-5 sm:px-6 max-w-3xl mx-auto">
        <motion.p
          {...fade(0.08, 14)}
          className="font-sans text-pupa-cream/90 text-sm tracking-[0.4em] uppercase mb-3 sm:mb-4"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          {...(reduceMotion
            ? fade(0)
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.18, ease: EASE_OUT },
              })}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pupa-cream font-medium leading-tight mb-3 sm:mb-4 text-balance"
        >
          {title}
        </motion.h1>

        <motion.div
          {...(reduceMotion
            ? { initial: false as const, animate: { scaleX: 1 }, transition: { duration: 0 } }
            : {
                initial: { scaleX: 0 },
                animate: { scaleX: 1 },
                transition: { duration: 0.6, delay: 0.35, ease: EASE_OUT },
              })}
          className="w-12 sm:w-16 h-px bg-pupa-cream/80 mb-4 sm:mb-6 origin-center"
        />

        {subtitle && (
          <motion.p
            {...fade(0.45, 12)}
            className="font-sans text-pupa-cream text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-balance"
          >
            {subtitle}
          </motion.p>
        )}

        {cta && (
          <motion.div {...fade(0.55, 12)}>
            {cta.external ? (
              <a
                href={cta.href}
                className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream transition-colors duration-300"
              >
                {cta.label}
              </a>
            ) : (
              <Link
                href={cta.href}
                className="inline-block px-6 sm:px-8 py-3 sm:py-3.5 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-widest uppercase hover:bg-pupa-cream transition-colors duration-300"
              >
                {cta.label}
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
