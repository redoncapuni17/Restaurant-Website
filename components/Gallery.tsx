"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { EASE_OUT } from "@/components/motion/constants";
import {
  GALLERY_EXTRA_COUNT,
  GALLERY_LOAD_BATCH,
  GALLERY_PREVIEW,
  GALLERY_TOTAL,
  type GalleryImage,
} from "@/lib/galleryPreview";

const PREVIEW_STAGGER = 0.14;
const BATCH_STAGGER = 0.12;
const TILE_DURATION = 0.85;

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [extraPool, setExtraPool] = useState<GalleryImage[] | null>(null);
  const [extraVisibleCount, setExtraVisibleCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  const displayed = useMemo(() => {
    const extra = extraPool ? extraPool.slice(0, extraVisibleCount) : [];
    return [...GALLERY_PREVIEW, ...extra];
  }, [extraPool, extraVisibleCount]);

  const batchStart = useMemo(
    () =>
      GALLERY_PREVIEW.length +
      Math.max(0, extraVisibleCount - GALLERY_LOAD_BATCH),
    [extraVisibleCount]
  );

  const hasMore = extraVisibleCount < GALLERY_EXTRA_COUNT;
  const hasExtras = extraVisibleCount > 0;

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + displayed.length) % displayed.length
      ),
    [displayed.length]
  );

  const next = useCallback(
    () =>
      setLightbox((i) => (i === null ? i : (i + 1) % displayed.length)),
    [displayed.length]
  );

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

  // Scroll lock + focus management while lightbox is open
  useEffect(() => {
    if (lightbox === null) return;

    lastFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
      lastFocusRef.current?.focus();
    };
  }, [lightbox, closeLightbox, prev, next]);

  return (
    <section className="py-24 sm:py-28 bg-pupa-brown relative isolate overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] glow-gold blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="text-center md:text-left mb-10 sm:mb-12"
        >
          <p className="font-sans text-pupa-champagne text-sm tracking-[0.4em] uppercase mb-4">
            Our World
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-pupa-cream font-semibold mb-4">
            Gallery
          </h2>
          <div className="w-16 h-px bg-pupa-gold mx-auto md:mx-0 mb-4" />
          <motion.p
            key={displayed.length}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="font-sans text-pupa-warm/60 text-sm sm:text-base"
          >
            Showing {displayed.length} of {GALLERY_TOTAL} photos
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayed.map((img, i) => (
            <GalleryTile
              key={img.url}
              img={img}
              index={i}
              isPreview={i < GALLERY_PREVIEW.length}
              isNewInBatch={i >= batchStart}
              staggerDelay={
                i < GALLERY_PREVIEW.length
                  ? i * PREVIEW_STAGGER
                  : i >= batchStart
                    ? (i - batchStart) * BATCH_STAGGER
                    : 0
              }
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>

        {(hasMore || hasExtras) && (
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8 sm:mt-10">
            {hasMore && (
              <motion.button
                type="button"
                onClick={handleLoadMore}
                disabled={loadingMore}
                whileHover={{ scale: loadingMore ? 1 : 1.02 }}
                whileTap={{ scale: loadingMore ? 1 : 0.98 }}
                className="px-8 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:bg-pupa-cream transition-colors duration-300 disabled:opacity-60"
              >
                {loadingMore ? "Loading…" : "Load more"}
              </motion.button>
            )}
            {hasExtras && (
              <motion.button
                type="button"
                onClick={handleShowLess}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 border border-pupa-warm/40 text-pupa-warm font-sans text-xs tracking-[0.2em] uppercase rounded-sm hover:border-pupa-gold hover:text-pupa-gold transition-colors duration-300"
              >
                Show less
              </motion.button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={displayed[lightbox]?.alt || "Gallery image"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-pupa-dark/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-pupa-cream hover:text-pupa-gold"
              aria-label="Close gallery"
            >
              <X size={28} />
            </button>
            <button
              type="button"
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
              type="button"
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
  index,
  isPreview,
  isNewInBatch,
  staggerDelay,
  onOpen,
}: {
  img: GalleryImage;
  index: number;
  isPreview: boolean;
  isNewInBatch: boolean;
  staggerDelay: number;
  onOpen: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const shouldAnimate = isPreview || isNewInBatch;
  const priority = isPreview && index < 2;

  const tile = (
    <button
      type="button"
      onClick={onOpen}
      className="relative overflow-hidden group rounded-xl ring-1 ring-pupa-gold/15 aspect-square w-full text-left bg-pupa-dark"
    >
      <div
        className={`absolute inset-0 bg-pupa-dark transition-opacity duration-500 ${
          imageLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <Image
        src={img.url}
        alt={img.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 50vw, 33vw"
        onLoad={() => setImageLoaded(true)}
        className={`object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pupa-dark/80 via-pupa-dark/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-5 pointer-events-none">
        <span className="inline-flex items-center gap-2 text-pupa-cream text-xs tracking-widest uppercase font-sans">
          <span className="w-5 h-px bg-pupa-gold" /> View
        </span>
      </div>
    </button>
  );

  if (!shouldAnimate) {
    return <div className="relative">{tile}</div>;
  }

  const motionProps = isPreview
    ? {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-24px" as const },
        transition: {
          duration: TILE_DURATION,
          delay: staggerDelay,
          ease: EASE_OUT,
        },
      }
    : {
        initial: { opacity: 0, y: 32 },
        animate: { opacity: 1, y: 0 },
        transition: {
          duration: TILE_DURATION,
          delay: staggerDelay,
          ease: EASE_OUT,
        },
      };

  return (
    <motion.div {...motionProps} className="relative">
      {tile}
    </motion.div>
  );
}
