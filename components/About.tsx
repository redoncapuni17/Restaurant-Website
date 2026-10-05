"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ABOUT_IMAGES } from "@/lib/siteConfig";
import { EASE_OUT } from "@/components/motion/constants";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "80px 0px" });
  const images = ABOUT_IMAGES;

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-pupa-beige relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 glow-gold blur-3xl opacity-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-sans text-pupa-gold text-sm tracking-[0.4em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-pupa-ink font-semibold leading-[1.05] mb-6">
              Fire, Flavour &<br />
              <span className="italic font-semibold text-pupa-brown">Mediterranean Soul</span>
            </h2>
            <div className="w-16 h-px bg-pupa-gold mb-8" />
            <p className="font-sans text-pupa-ink/70 text-base md:text-lg leading-relaxed mb-6">
              At Pupa, we believe great food begins with great fire. Our charcoal
              grill imparts a depth of flavour that cannot be replicated — smoky,
              rich, and unmistakably Mediterranean.
            </p>
            <p className="font-sans text-pupa-ink/70 text-base md:text-lg leading-relaxed mb-10">
              Every cut of meat is carefully marinated with our signature blends,
              slow-rested, and grilled to perfection. From our intimate dining room
              in the heart of Manchester&apos;s Northern Quarter, we bring the warmth
              of the Mediterranean to your table.
            </p>
            <div className="flex items-stretch gap-0">
              {[
                { value: "5+", label: "Years serving" },
                { value: "100%", label: "Charcoal grilled" },
                { value: "NQ", label: "Manchester" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`flex items-center ${i > 0 ? "pl-8 ml-8 border-l border-pupa-gold/30" : ""}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + i * 0.1,
                    ease: EASE_OUT,
                  }}
                >
                  <div>
                    <p className="font-serif text-4xl text-pupa-brown font-semibold">
                      {stat.value}
                    </p>
                    <p className="font-sans text-sm text-pupa-ink/50 tracking-wider uppercase mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 items-start"
          >
            {inView ? (
              <>
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-pupa-gold/20 shadow-lg group">
                    <Image
                      src={images[0].url}
                      alt={images[0].alt}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-pupa-gold/20 shadow-lg group">
                    <Image
                      src={images[3].url}
                      alt={images[3].alt}
                      fill
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {images.slice(1, 3).map((img) => (
                    <div
                      key={img.key}
                      className="relative aspect-square overflow-hidden rounded-xl ring-1 ring-pupa-gold/20 shadow-lg group"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        loading="lazy"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-3">
                  <div className="aspect-[3/4] rounded-xl bg-pupa-warm/20 animate-pulse" />
                  <div className="aspect-square rounded-xl bg-pupa-warm/20 animate-pulse" />
                </div>
                <div className="flex flex-col gap-3">
                  <div className="aspect-square rounded-xl bg-pupa-warm/20 animate-pulse" />
                  <div className="aspect-square rounded-xl bg-pupa-warm/20 animate-pulse" />
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
