"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="py-24 bg-pupa-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-pupa-brown font-medium leading-tight mb-6">
              Fire, Flavour &<br />
              <span className="italic">Mediterranean Soul</span>
            </h2>
            <div className="w-16 h-px bg-pupa-gold mb-8" />
            <p className="font-sans text-pupa-brown/70 leading-relaxed mb-6">
              At Pupa, we believe great food begins with great fire. Our charcoal
              grill imparts a depth of flavour that cannot be replicated — smoky,
              rich, and unmistakably Mediterranean.
            </p>
            <p className="font-sans text-pupa-brown/70 leading-relaxed mb-8">
              Every cut of meat is carefully marinated with our signature blends,
              slow-rested, and grilled to perfection. From our intimate dining room
              in the heart of Manchester&apos;s Northern Quarter, we bring the warmth
              of the Mediterranean to your table.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="font-serif text-3xl text-pupa-brown">5+</p>
                <p className="font-sans text-xs text-pupa-brown/60 tracking-wider uppercase">Years serving</p>
              </div>
              <div className="w-px bg-pupa-gold/30" />
              <div>
                <p className="font-serif text-3xl text-pupa-brown">100%</p>
                <p className="font-sans text-xs text-pupa-brown/60 tracking-wider uppercase">Charcoal grilled</p>
              </div>
              <div className="w-px bg-pupa-gold/30" />
              <div>
                <p className="font-serif text-3xl text-pupa-brown">NQ</p>
                <p className="font-sans text-xs text-pupa-brown/60 tracking-wider uppercase">Manchester</p>
              </div>
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src="https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/b7a4765e-c88b-4f71-9efd-b56cc44b8373/Pupa+-+007.jpg"
                alt="Pupa Restaurant"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/3919327a-c155-4056-b0f0-822d9b2e314c/Steak+Carrousel+2.jpg"
                  alt="Grilled steak"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square overflow-hidden">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/e46e9802-bfe5-4728-8e8b-b16cb52bf6f7/Tapas+1.jpg"
                  alt="Tapas"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
