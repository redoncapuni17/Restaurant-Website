"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { Event } from "@/types";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import { EASE_OUT } from "@/components/motion/constants";
import { getFeaturedEvent } from "@/lib/events";

interface EventsViewProps {
  events: Event[];
  heroUrl: string | null;
}

function formatEventDate(date: string) {
  const d = new Date(date);
  return {
    month: d.toLocaleDateString("en-GB", { month: "short" }),
    day: d.getDate(),
    weekday: d.toLocaleDateString("en-GB", { weekday: "long" }),
    full: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")}${period}` : `${hour}${period}`;
}

export default function EventsView({ events, heroUrl }: EventsViewProps) {
  const featured = getFeaturedEvent(events);
  const rest = events.filter((e) => e.id !== featured?.id);

  return (
    <>
      <PageHero
        eyebrow="What's On"
        title="Events at Pupa"
        backgroundImage={heroUrl}
        imageOpacity={heroUrl ? 0.35 : 0}
      />

      <section className="relative py-14 sm:py-20 bg-pupa-beige overflow-hidden">
        <div className="absolute -top-24 right-0 w-[28rem] h-[28rem] glow-gold blur-3xl opacity-[0.1] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <p className="font-sans text-pupa-gold text-xs tracking-[0.35em] uppercase mb-4">
              Northern Quarter, Manchester
            </p>
            <p className="font-sans text-pupa-brown/70 text-sm sm:text-base leading-relaxed">
              From live music and wine evenings to supper clubs and chef-led
              tastings — join us for special nights at the grill.
            </p>
          </FadeIn>

          {events.length === 0 ? (
            <FadeIn className="max-w-md mx-auto text-center py-12 sm:py-20">
              <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-6 rounded-full border border-pupa-gold/40 flex items-center justify-center">
                <CalendarDays
                  className="text-pupa-gold"
                  size={24}
                  strokeWidth={1.4}
                />
              </div>
              <p className="font-serif text-2xl sm:text-3xl text-pupa-brown mb-3">
                No upcoming events
              </p>
              <p className="font-sans text-pupa-brown/50 text-sm leading-relaxed">
                Check back soon for new events and special evenings at PUPA.
              </p>
            </FadeIn>
          ) : (
            <>
              {featured && (
                <FeaturedEventCard event={featured} className="mb-10 sm:mb-14" />
              )}

              {rest.length > 0 && (
                <div>
                  <FadeIn className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                      <p className="font-sans text-pupa-gold text-xs tracking-[0.3em] uppercase mb-2">
                        Calendar
                      </p>
                      <h2 className="font-serif text-2xl sm:text-3xl text-pupa-brown font-semibold">
                        More to look forward to
                      </h2>
                    </div>
                    <p className="hidden sm:block font-sans text-pupa-brown/40 text-xs tracking-wider uppercase">
                      {rest.length} upcoming
                    </p>
                  </FadeIn>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {rest.map((event, i) => (
                      <EventCard key={event.id} event={event} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="bg-pupa-dark py-14 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-lg">
              <p className="font-sans text-pupa-gold text-xs tracking-[0.35em] uppercase mb-3">
                Private Hire
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-pupa-cream font-semibold mb-3">
                Planning something bigger?
              </h2>
              <p className="font-sans text-pupa-warm/70 text-sm leading-relaxed">
                Birthdays, corporate dinners, or a full venue hire — we&apos;ll
                tailor the evening to your group.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/private-hire"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-pupa-warm/30 text-pupa-cream font-sans text-xs tracking-[0.18em] uppercase hover:border-pupa-gold hover:text-pupa-gold transition-colors"
              >
                Private Hire
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/#reservation"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-[0.18em] uppercase hover:bg-pupa-cream transition-colors"
              >
                Book a Table
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

function FeaturedEventCard({
  event,
  className = "",
}: {
  event: Event;
  className?: string;
}) {
  const date = formatEventDate(event.date);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, ease: EASE_OUT }}
      className={`group relative overflow-hidden rounded-2xl bg-pupa-dark shadow-[0_24px_60px_-24px_rgba(15,44,34,0.55)] ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[22rem] lg:min-h-[26rem]">
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-full overflow-hidden">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-pupa-brown to-pupa-accent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-pupa-dark via-pupa-dark/40 to-transparent" />
        </div>

        <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pupa-gold/15 border border-pupa-gold/30 text-pupa-gold font-sans text-[0.65rem] tracking-[0.2em] uppercase">
              <Sparkles size={12} />
              Featured
            </span>
            {event.tag && (
              <span className="font-sans text-pupa-warm/60 text-[0.65rem] tracking-[0.2em] uppercase">
                {event.tag}
              </span>
            )}
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-pupa-cream font-semibold leading-tight mb-4">
            {event.title}
          </h2>

          <div className="flex flex-wrap gap-4 mb-5 text-pupa-warm/80">
            <span className="inline-flex items-center gap-2 font-sans text-xs tracking-wide">
              <CalendarDays size={14} className="text-pupa-gold shrink-0" />
              {date.weekday}, {date.full}
            </span>
            <span className="inline-flex items-center gap-2 font-sans text-xs tracking-wide">
              <Clock size={14} className="text-pupa-gold shrink-0" />
              {formatTime(event.time_start)} – {formatTime(event.time_end)}
            </span>
          </div>

          <p className="font-sans text-pupa-warm/75 text-sm sm:text-base leading-relaxed mb-8 line-clamp-4">
            {event.description}
          </p>

          <Link
            href="/#reservation"
            className="inline-flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-7 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-[0.18em] uppercase hover:bg-pupa-cream transition-colors"
          >
            Reserve Your Spot
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="absolute top-5 left-5 lg:left-auto lg:right-8 lg:top-8 w-[4.5rem] h-[4.5rem] rounded-xl bg-pupa-brown/95 backdrop-blur-sm shadow-lg flex flex-col items-center justify-center border border-pupa-gold/20">
        <span className="font-sans text-pupa-gold text-[0.6rem] font-semibold uppercase tracking-[0.2em]">
          {date.month}
        </span>
        <span className="font-serif text-pupa-cream text-3xl leading-none">
          {date.day}
        </span>
      </div>
    </motion.article>
  );
}

function EventCard({ event, index }: { event: Event; index: number }) {
  const date = formatEventDate(event.date);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: EASE_OUT }}
      className="group flex flex-col bg-white rounded-xl overflow-hidden ring-1 ring-pupa-brown/8 shadow-[0_12px_40px_-20px_rgba(15,44,34,0.35)] hover:shadow-[0_20px_50px_-20px_rgba(15,44,34,0.45)] transition-shadow duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-pupa-brown to-pupa-accent flex items-center justify-center">
            <CalendarDays className="text-pupa-gold/40" size={40} strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-pupa-dark/50 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className="px-3 py-2 rounded-lg bg-white/95 backdrop-blur-sm text-center min-w-[3rem] shadow-sm">
            <p className="font-sans text-pupa-gold text-[0.55rem] font-bold uppercase tracking-wider leading-none">
              {date.month}
            </p>
            <p className="font-serif text-pupa-brown text-xl leading-tight">
              {date.day}
            </p>
          </div>
          {event.tag && (
            <span className="px-2.5 py-1 rounded-full bg-pupa-dark/75 backdrop-blur-sm text-pupa-cream font-sans text-[0.6rem] tracking-[0.15em] uppercase">
              {event.tag}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="font-serif text-xl sm:text-2xl text-pupa-brown font-semibold leading-snug mb-2 group-hover:text-pupa-accent transition-colors">
          {event.title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 font-sans text-pupa-brown/50 text-xs">
          <span className="inline-flex items-center gap-1">
            <Clock size={12} className="text-pupa-gold" />
            {formatTime(event.time_start)} – {formatTime(event.time_end)}
          </span>
          <span>{date.weekday}</span>
        </div>

        <p className="font-sans text-pupa-brown/65 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
          {event.description}
        </p>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-pupa-brown/8">
          <span className="inline-flex items-center gap-1 font-sans text-pupa-brown/40 text-[0.65rem] tracking-wider uppercase">
            <MapPin size={11} />
            Pupa, Manchester
          </span>
          <Link
            href="/#reservation"
            className="inline-flex items-center gap-1.5 font-sans text-pupa-brown text-xs tracking-[0.15em] uppercase hover:text-pupa-gold transition-colors"
          >
            Book
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
