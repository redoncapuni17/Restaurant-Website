"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  GALLERY_EXTRA_COUNT,
  GALLERY_LOAD_BATCH,
  GALLERY_PREVIEW,
  GALLERY_TOTAL,
  type GalleryImage,
} from "@/lib/galleryPreview";

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [extraPool, setExtraPool] = useState<GalleryImage[] | null>(null);
  const [extraVisibleCount, setExtraVisibleCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const displayed = useMemo(() => {
    const extra = extraPool ? extraPool.slice(0, extraVisibleCount) : [];
    return [...GALLERY_PREVIEW, ...extra];
  }, [extraPool, extraVisibleCount]);

  const hasMore = extraVisibleCount < GALLERY_EXTRA_COUNT;
  const hasExtras = extraVisibleCount > 0;

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      let pool = extraPool;
      if (!pool) {
        const { GALLERY_EXTRA } = await import("@/lib/galleryExtra");
        pool = GALLERY_EXTRA;
        setExtraPool(pool);
      }
      setExtraVisibleCount((count) =>
        Math.min(count + GALLERY_LOAD_BATCH, pool!.length)
      );
    } finally {
      setLoadingMore(false);
    }
  }, [extraPool, hasMore, loadingMore]);

  const handleShowLess = useCallback(() => {
    setExtraVisibleCount(0);
    setExtraPool(null);
    setLightbox(null);
  }, []);

  const prev = () =>
    setLightbox((i) => (i! - 1 + displayed.length) % displayed.length);
  const next = () =>
    setLightbox((i) => (i! + 1) % displayed.length);

  return (
    <section className="py-24 sm:py-28 bg-pupa-brown relative">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] glow-gold blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center md:text-left mb-10 sm:mb-12">
          <p className="font-sans text-pupa-champagne text-xs tracking-[0.4em] uppercase mb-4">
            Our World
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-pupa-cream font-semibold mb-4">
            Gallery
          </h2>
          <div className="w-16 h-px bg-pupa-gold mx-auto md:mx-0 mb-4" />
          <p className="font-sans text-pupa-warm/60 text-xs sm:text-sm">
            Showing {displayed.length} of {GALLERY_TOTAL} photos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayed.map((img, i) => (
            <GalleryTile
              key={img.url}
              img={img}
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>

        {(hasMore || hasExtras) && (
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8 sm:mt-10">
            {hasMore && (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-pupa-cream transition-colors duration-300 disabled:opacity-60"
              >
                {loadingMore ? "Loading…" : "Load more"}
              </button>
            )}
            {hasExtras && (
              <button
                type="button"
                onClick={handleShowLess}
                className="px-8 py-3.5 border border-pupa-warm/40 text-pupa-warm font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:border-pupa-gold hover:text-pupa-gold transition-colors duration-300"
              >
                Show less
              </button>
            )}
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
