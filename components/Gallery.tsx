"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Fotot ekzistuese nga Squarespace
const defaultImages = [
  { url: "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/0e9f73aa-e508-4e6d-b328-c5281a5ae85e/Pupa+Steak+-+001.jpg", alt: "Pupa Steak" },
  { url: "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/175f7e12-a103-4c64-b696-d90bf510ea99/Pupa+Steak+-+016.jpg", alt: "Grilled Steak" },
  { url: "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/163c455a-9d60-4c6a-ad94-cf540bf8f1e8/IMG_7003.jpg", alt: "Restaurant Interior" },
  { url: "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/71d4d9aa-5dab-41c1-87ed-99ced3cb04a7/Pupa+-+002.jpg", alt: "Pupa Restaurant" },
  { url: "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/49fdae99-a36f-4616-bbca-cf5b5e4d36ac/Pupa+-+018.jpg", alt: "Pupa Bar" },
  { url: "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/536722fe-d0db-41ca-9651-dfab62b90a48/Burger+Picture.jpg", alt: "Burger" },
];

interface GalleryProps {
  images?: { url: string; alt: string }[];
}

export default function Gallery({ images = defaultImages }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox((i) => (i! - 1 + images.length) % images.length);
  const next = () => setLightbox((i) => (i! + 1) % images.length);

  return (
    <section className="py-24 bg-pupa-beige">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">
            Our World
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-pupa-brown font-medium mb-4">
            Gallery
          </h2>
          <div className="w-16 h-px bg-pupa-gold mx-auto" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative overflow-hidden cursor-pointer group ${
                i === 0 || i === 3 ? "md:col-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 || i === 3 ? "2/1" : "1/1" }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-pupa-dark/0 group-hover:bg-pupa-dark/30 transition-all duration-500 flex items-center justify-center">
                <span className="text-pupa-cream text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pupa-dark/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-pupa-cream hover:text-pupa-gold"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-6 text-pupa-cream hover:text-pupa-gold"
            >
              <ChevronLeft size={36} />
            </button>
            <div
              className="relative w-full max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].url}
                alt={images[lightbox].alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full max-h-[80vh]"
              />
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-6 text-pupa-cream hover:text-pupa-gold"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
