"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface AboutImage {
  key: string;
  url: string;
  alt: string;
}

const ABOUT_KEYS = ["about_1", "about_2", "about_3"];

export default function About() {
  const [images, setImages] = useState<AboutImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase
        .from("site_images")
        .select("key, url, alt")
        .in("key", ABOUT_KEYS);
      if (data) {
        // Ruaj radhën sipas ABOUT_KEYS
        const ordered = ABOUT_KEYS.map((k) => data.find((d) => d.key === k)).filter(
          Boolean
        ) as AboutImage[];
        setImages(ordered);
      }
    };
    fetchImages();
  }, []);

  const hasImages = images.length > 0;

  return (
    <section className="py-24 bg-pupa-warm">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={
            hasImages
              ? "grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
              : "max-w-3xl mx-auto text-center"
          }
        >
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: hasImages ? -40 : 0, y: hasImages ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
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
            <div className={`w-16 h-px bg-pupa-gold mb-8 ${hasImages ? "" : "mx-auto"}`} />
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
            <div className={`flex gap-8 ${hasImages ? "" : "justify-center"}`}>
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

          {/* Image Grid - vetëm nëse ka foto nga admini */}
          {hasImages && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={images[0].url}
                  alt={images[0].alt || "Pupa Restaurant"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {images.length > 1 && (
                <div className="flex flex-col gap-3">
                  {images.slice(1, 3).map((img) => (
                    <div key={img.key} className="aspect-square overflow-hidden">
                      <img
                        src={img.url}
                        alt={img.alt || "Pupa Restaurant"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
