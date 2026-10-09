"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EASE_OUT } from "@/components/motion/constants";
import { GALLERY_ALL } from "@/lib/galleryAll";
import type { GalleryImage } from "@/lib/galleryPreview";

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const TILE_DURATION = 0.75;
const STAGGER = 0.12;

function useGridColumns() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const update = () => setColumns(md.matches ? 3 : 2);
    update();
    md.addEventListener("change", update);
    return () => md.removeEventListener("change", update);
  }, []);

  return columns;
}

export default function GalleryPageView() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const columns = useGridColumns();

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + GALLERY_ALL.length) % GALLERY_ALL.length
      ),
    []
  );

  const next = useCallback(
    () =>
      setLightbox((i) => (i === null ? i : (i + 1) % GALLERY_ALL.length)),
    []
  );

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
    <section className="py-16 sm:py-24 bg-pupa-brown relative isolate overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[50rem] h-[30rem] glow-gold blur-3xl opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="text-center md:text-left mb-10 sm:mb-12"
        >
          <p className="font-sans text-pupa-champagne text-sm tracking-[0.4em] uppercase mb-4">
            Our World
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-pupa-cream font-semibold mb-4">
            Gallery
          </h1>
          <div className="w-16 h-px bg-pupa-gold mx-auto md:mx-0 mb-4" />
          <p className="font-sans text-pupa-warm/60 text-sm sm:text-base">
            {GALLERY_ALL.length} photos from the grill, the wine, and the room
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_ALL.map((img, i) => (
            <GalleryPageTile
              key={img.url}
              img={img}
              index={i}
              delay={reduceMotion ? 0 : (i % columns) * STAGGER}
              reduceMotion={Boolean(reduceMotion)}
              onOpen={() => setLightbox(i)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY_ALL[lightbox]?.alt || "Gallery image"}
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
              className="absolute left-4 sm:left-6 text-pupa-cream hover:text-pupa-gold"
              aria-label="Previous image"
            >
              <ChevronLeft size={36} />
            </button>
            <div
              className="relative w-full max-w-4xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ALL[lightbox].url}
                alt={GALLERY_ALL[lightbox].alt}
                width={1200}
                height={800}
                className="object-contain w-full h-full max-h-[80vh]"
                priority
              />
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 sm:right-6 text-pupa-cream hover:text-pupa-gold"
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

function GalleryPageTile({
  img,
  index,
  delay,
  reduceMotion,
  onOpen,
}: {
  img: GalleryImage;
  index: number;
  delay: number;
  reduceMotion: boolean;
  onOpen: () => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
        priority={index < 3}
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

  if (reduceMotion) {
    return <div className="relative">{tile}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: TILE_DURATION, delay, ease: EASE_OUT }}
      className="relative"
    >
      {tile}
    </motion.div>
  );
}
