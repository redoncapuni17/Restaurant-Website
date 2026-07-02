"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  GALLERY_EXTRA_COUNT,
  GALLERY_PREVIEW,
  type GalleryImage,
} from "@/lib/galleryPreview";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [extraImages, setExtraImages] = useState<GalleryImage[] | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const isExpanded = extraImages !== null;

  const displayed = useMemo(
    () => (isExpanded ? [...GALLERY_PREVIEW, ...extraImages!] : GALLERY_PREVIEW),
    [isExpanded, extraImages]
  );

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || isExpanded) return;
    setLoadingMore(true);
    try {
      const { GALLERY_EXTRA } = await import("@/lib/galleryExtra");
      setExtraImages(GALLERY_EXTRA);
    } finally {
      setLoadingMore(false);
    }
  }, [isExpanded, loadingMore]);

  const handleShowLess = useCallback(() => {
    setExtraImages(null);
    setLightbox(null);
  }, []);

  const prev = () =>
    setLightbox((i) => (i! - 1 + displayed.length) % displayed.length);
  const next = () =>
    setLightbox((i) => (i! + 1) % displayed.length);

  return (
    <section
      className="py-20 sm:py-24 bg-pupa-brown relative"
      data-gallery="preview-v2"
    >
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] glow-gold blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-10 sm:mb-12">
          <p className="font-sans text-pupa-champagne text-xs tracking-[0.4em] uppercase mb-4">
            Our World
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-pupa-cream font-semibold mb-4">
            Gallery
          </h2>
          <div className="w-16 h-px bg-pupa-gold mx-auto mb-4" />
          <p className="font-sans text-pupa-warm/60 text-xs sm:text-sm">
            {isExpanded
              ? `Showing all ${displayed.length} photos`
              : `Showing ${GALLERY_PREVIEW.length} of ${GALLERY_PREVIEW.length + GALLERY_EXTRA_COUNT} photos`}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {displayed.map((img, i) => (
            <GalleryTile
              key={img.url}
              img={img}
              onOpen={() => setLightbox(i)}
            />
          ))}

          {!isExpanded && (
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={loadingMore}
              aria-label={`Load ${GALLERY_EXTRA_COUNT} more gallery photos`}
              className="relative aspect-square w-full rounded-xl border-2 border-dashed border-pupa-gold/50 bg-pupa-dark/40 hover:bg-pupa-dark/70 hover:border-pupa-gold transition-colors duration-300 flex flex-col items-center justify-center gap-2 p-4 text-center disabled:opacity-60"
            >
              <Plus size={28} className="text-pupa-gold" strokeWidth={1.5} />
              <span className="font-sans text-pupa-cream text-xs sm:text-sm tracking-[0.15em] uppercase">
                {loadingMore ? "Loading…" : "Load more"}
              </span>
              <span className="font-sans text-pupa-warm/70 text-[0.65rem] sm:text-xs">
                +{GALLERY_EXTRA_COUNT} photos
              </span>
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="flex justify-center mt-8 sm:mt-10">
            <button
              type="button"
              onClick={handleShowLess}
              className="px-8 py-3.5 border border-pupa-warm/40 text-pupa-warm font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:border-pupa-gold hover:text-pupa-gold transition-colors duration-300"
            >
              Show less
            </button>
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
                src={displayed[lightbox].url}
                alt={displayed[lightbox].alt}
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

function GalleryTile({
  img,
  onOpen,
}: {
  img: GalleryImage;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="relative overflow-hidden group rounded-xl ring-1 ring-pupa-gold/15 aspect-square w-full text-left"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.url}
        alt={img.alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pupa-dark/80 via-pupa-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-5 pointer-events-none">
        <span className="inline-flex items-center gap-2 text-pupa-cream text-xs tracking-widest uppercase font-sans">
          <span className="w-5 h-px bg-pupa-gold" /> View
        </span>
      </div>
    </button>
  );
}
