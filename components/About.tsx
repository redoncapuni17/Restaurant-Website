"use client";

import { motion } from "framer-motion";
import { ABOUT_IMAGES } from "@/lib/siteConfig";

export default function About() {
  const images = ABOUT_IMAGES;

  return (
    <section className="py-28 bg-pupa-beige relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 glow-gold blur-3xl opacity-10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-pupa-ink font-semibold leading-[1.05] mb-6">
              Fire, Flavour &<br />
              <span className="italic font-medium text-gold-gradient">Mediterranean Soul</span>
            </h2>
            <div className="w-16 h-px bg-pupa-gold mb-8" />
            <p className="font-sans text-pupa-ink/70 leading-relaxed mb-6">
              At Pupa, we believe great food begins with great fire. Our charcoal
              grill imparts a depth of flavour that cannot be replicated — smoky,
              rich, and unmistakably Mediterranean.
            </p>
            <p className="font-sans text-pupa-ink/70 leading-relaxed mb-10">
              Every cut of meat is carefully marinated with our signature blends,
              slow-rested, and grilled to perfection. From our intimate dining room
              in the heart of Manchester&apos;s Northern Quarter, we bring the warmth
              of the Mediterranean to your table.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-serif text-4xl text-pupa-brown font-semibold">5+</p>
                <p className="font-sans text-xs text-pupa-ink/50 tracking-wider uppercase mt-1">Years serving</p>
              </div>
              <div className="w-px bg-pupa-gold/30" />
              <div>
                <p className="font-serif text-4xl text-pupa-brown font-semibold">100%</p>
                <p className="font-sans text-xs text-pupa-ink/50 tracking-wider uppercase mt-1">Charcoal grilled</p>
              </div>
              <div className="w-px bg-pupa-gold/30" />
              <div>
                <p className="font-serif text-4xl text-pupa-brown font-semibold">NQ</p>
                <p className="font-sans text-xs text-pupa-ink/50 tracking-wider uppercase mt-1">Manchester</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-xl ring-1 ring-pupa-gold/20 shadow-lg group">
              <img
                src={images[0].url}
                alt={images[0].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-3">
              {images.slice(1, 3).map((img) => (
                <div key={img.key} className="aspect-square overflow-hidden rounded-xl ring-1 ring-pupa-gold/20 shadow-lg group">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
