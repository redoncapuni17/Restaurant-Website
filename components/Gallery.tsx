"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { GALLERY_IMAGES, GALLERY_PREVIEW_COUNT } from "@/lib/siteConfig";
import { EASE_OUT } from "@/components/motion/constants";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "120px 0px" });

  const [lightbox, setLightbox] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const images = GALLERY_IMAGES;
  const hasMore = images.length > GALLERY_PREVIEW_COUNT;
  const visibleImages = showAll
    ? images
    : images.slice(0, GALLERY_PREVIEW_COUNT);
  const hiddenCount = images.length - GALLERY_PREVIEW_COUNT;

  const prev = () =>
    setLightbox((i) => (i! - 1 + images.length) % images.length);
  const next = () =>
    setLightbox((i) => (i! + 1) % images.length);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-pupa-brown relative overflow-hidden"
    >
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] glow-gold blur-3xl opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-sans text-pupa-champagne text-xs tracking-[0.4em] uppercase mb-4">
            Our World
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-pupa-cream font-semibold mb-4">
            Gallery
          </h2>
          <div className="w-16 h-px bg-pupa-gold mx-auto" />
        </motion.div>

        {inView ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {visibleImages.map((img, i) => (
                <motion.div
                  key={img.url}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.04, 0.2),
                    ease: EASE_OUT,
                  }}
                  className="relative overflow-hidden cursor-pointer group rounded-xl ring-1 ring-pupa-gold/15 aspect-square"
                  onClick={() => setLightbox(i)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pupa-dark/80 via-pupa-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-5">
                    <span className="inline-flex items-center gap-2 text-pupa-cream text-xs tracking-widest uppercase translate-y-2 group-hover:translate-y-0 transition-transform duration-300 font-sans">
                      <span className="w-5 h-px bg-pupa-gold" /> View
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-10">
                {!showAll ? (
                  <button
                    type="button"
                    onClick={() => setShowAll(true)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 border border-pupa-gold/50 text-pupa-cream font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-pupa-gold hover:text-pupa-dark hover:border-pupa-gold transition-colors duration-300"
                  >
                    See more
                    <span className="text-pupa-gold/80 normal-case tracking-normal">
                      (+{hiddenCount} photos)
                    </span>
                    <ChevronDown size={16} className="text-pupa-gold" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAll(false)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 border border-pupa-warm/40 text-pupa-warm font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:border-pupa-gold hover:text-pupa-gold transition-colors duration-300"
                  >
                    Show less
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <div
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
            aria-hidden
          >
            {Array.from({ length: GALLERY_PREVIEW_COUNT }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-pupa-dark/40 ring-1 ring-pupa-gold/10 animate-pulse"
              />
            ))}
          </div>
        )}
      </div>

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
              aria-label="Close gallery"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 text-pupa-cream hover:text-pupa-gold"
              aria-label="Previous image"
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
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 text-pupa-cream hover:text-pupa-gold"
              aria-label="Next image"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
