"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { Event } from "@/types";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import { EASE_OUT } from "@/components/motion/constants";

interface EventsViewProps {
  events: Event[];
  heroUrl: string | null;
}

export default function EventsView({ events, heroUrl }: EventsViewProps) {
  return (
    <>
      <PageHero
        eyebrow="What's On"
        title="Upcoming Events"
        backgroundImage={heroUrl}
        imageOpacity={heroUrl ? 1 : 0}
      />

      <section className="relative py-14 sm:py-20 md:py-24 bg-pupa-beige overflow-hidden">
        <div className="absolute -top-32 right-0 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] glow-gold blur-3xl opacity-[0.12] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6">
          {events.length === 0 ? (
            <FadeIn className="max-w-md mx-auto text-center py-12 sm:py-20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full border border-pupa-gold/40 flex items-center justify-center">
                <CalendarDays className="text-pupa-gold" size={24} strokeWidth={1.4} />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-pupa-brown mb-3">No upcoming events</p>
              <p className="font-sans text-pupa-brown/50 text-sm leading-relaxed">
                Check back soon for new events and special evenings at PUPA.
              </p>
            </FadeIn>
          ) : (
            <div className="space-y-14 sm:space-y-20 md:space-y-28">
              {events.map((event, i) => (
                <EventRow key={event.id} event={event} reversed={i % 2 === 1} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EventRow({
  event,
  reversed,
  index,
}: {
  event: Event;
  reversed: boolean;
  index: number;
}) {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleDateString("en-GB", { month: "short" });
  const day = dateObj.getDate();
  const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "long" });
  const fullDate = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE_OUT }}
      className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      <div className={`relative ${reversed ? "md:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-[0_18px_50px_-20px_rgba(15,44,34,0.45)]">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-accent">
              <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" />
              <CalendarDays className="absolute inset-0 m-auto text-pupa-gold/40" size={56} strokeWidth={1} />
            </div>
          )}
        </div>

        <div className="absolute -top-4 left-4 sm:-top-5 sm:left-6 w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-sm bg-pupa-brown shadow-xl flex flex-col items-center justify-center">
          <span className="font-sans text-pupa-gold text-[0.55rem] sm:text-[0.6rem] font-semibold uppercase tracking-[0.2em]">
            {month}
          </span>
          <span className="font-serif text-pupa-cream text-2xl sm:text-3xl leading-none">{day}</span>
        </div>
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <h2 className="font-serif text-pupa-brown text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide leading-tight mb-3">
          {event.title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-x-4 mb-5 sm:mb-6">
          <span className="inline-flex items-center gap-1.5 font-sans text-pupa-gold text-xs tracking-widest uppercase">
            <Clock size={13} />
            {event.time_start} – {event.time_end}
          </span>
          <span className="font-sans text-pupa-brown/40 text-xs tracking-wider uppercase">
            {weekday}, {fullDate}
          </span>
        </div>

        <div className="w-10 h-px bg-pupa-gold/60 mb-5 sm:mb-6" />

        {event.description && (
          <p className="font-sans text-pupa-brown/70 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 whitespace-pre-line">
            {event.description}
          </p>
        )}

        <Link
          href="/#reservation"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-xs tracking-[0.18em] uppercase transition-all hover:bg-pupa-accent hover:gap-3"
        >
          Reserve a Table
          <ArrowRight size={14} />
        </Link>
      </div>
    </motion.article>
  );
}
