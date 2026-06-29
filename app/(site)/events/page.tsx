import { supabase } from "@/lib/supabase";
import type { Event } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";

export const revalidate = 60;

async function getEvents(): Promise<Event[]> {
  const today = new Date().toISOString().split("T")[0];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .gte("date", today)
    .order("date");

  if (error) {
    console.error("Failed to load events:", error.message);
    return [];
  }
  return data ?? [];
}

// Foto e hero-s vjen nga admini (Supabase). Pa foto si default — nëse admini
// nuk ka ngarkuar ende, përdoret një sfond elegant smerald.
async function getHeroImage(): Promise<string | null> {
  const { data } = await supabase
    .from("site_images")
    .select("url")
    .eq("key", "events")
    .maybeSingle();
  return data?.url ?? null;
}

export default async function EventsPage() {
  const [events, heroUrl] = await Promise.all([getEvents(), getHeroImage()]);

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 overflow-hidden bg-pupa-brown">
        {heroUrl ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${heroUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-dark" />
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[40rem] h-[24rem] glow-gold blur-3xl opacity-25" />
          </>
        )}
        <div className="absolute inset-0 bg-pupa-dark/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3">What&apos;s On</p>
          <h1 className="font-serif text-4xl md:text-5xl text-pupa-cream font-medium">Upcoming Events</h1>
          <div className="w-12 h-px bg-pupa-gold mt-4" />
        </div>
      </section>

      {/* Events List */}
      <section className="relative py-24 bg-pupa-beige overflow-hidden">
        {/* Theks dekorativ smerald në sfond */}
        <div className="absolute -top-32 right-0 w-[36rem] h-[36rem] glow-gold blur-3xl opacity-[0.12] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6">
          {events.length === 0 ? (
            <div className="max-w-md mx-auto text-center py-20">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-pupa-gold/40 flex items-center justify-center">
                <CalendarDays className="text-pupa-gold" size={26} strokeWidth={1.4} />
              </div>
              <p className="font-serif text-3xl text-pupa-brown mb-3">No upcoming events</p>
              <p className="font-sans text-pupa-brown/50 text-sm leading-relaxed">
                Check back soon for new events and special evenings at PUPA.
              </p>
            </div>
          ) : (
            <div className="space-y-20 md:space-y-28">
              {events.map((event, i) => (
                <EventRow key={event.id} event={event} reversed={i % 2 === 1} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EventRow({ event, reversed }: { event: Event; reversed: boolean }) {
  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleDateString("en-GB", { month: "short" });
  const day = dateObj.getDate();
  const weekday = dateObj.toLocaleDateString("en-GB", { weekday: "long" });
  const fullDate = dateObj.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <article className="group grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      {/* Media */}
      <div className={`relative ${reversed ? "md:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-[0_18px_50px_-20px_rgba(15,44,34,0.45)]">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-pupa-dark via-pupa-brown to-pupa-accent">
              <div className="absolute inset-0 bg-grain opacity-[0.12] mix-blend-overlay" />
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-72 h-48 glow-gold blur-3xl opacity-40" />
              <CalendarDays className="absolute inset-0 m-auto text-pupa-gold/40" size={64} strokeWidth={1} />
            </div>
          )}
        </div>

        {/* Date Badge — noton mbi foto */}
        <div className="absolute -top-5 left-6 w-[4.5rem] h-[4.5rem] rounded-sm bg-pupa-brown shadow-xl flex flex-col items-center justify-center">
          <span className="font-sans text-pupa-gold text-[0.6rem] font-semibold uppercase tracking-[0.2em]">
            {month}
          </span>
          <span className="font-serif text-pupa-cream text-3xl leading-none">{day}</span>
        </div>
      </div>

      {/* Content */}
      <div className={reversed ? "md:order-1" : ""}>
        <h2 className="font-serif text-pupa-brown text-3xl md:text-4xl uppercase tracking-wide leading-tight mb-3">
          {event.title}
        </h2>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6">
          <span className="inline-flex items-center gap-1.5 font-sans text-pupa-gold text-xs tracking-widest uppercase">
            <Clock size={13} />
            {event.time_start} – {event.time_end}
          </span>
          <span className="font-sans text-pupa-brown/40 text-xs tracking-wider uppercase">
            {weekday}, {fullDate}
          </span>
        </div>

        <div className="w-10 h-px bg-pupa-gold/60 mb-6" />

        {event.description && (
          <p className="font-sans text-pupa-brown/70 leading-relaxed mb-8 whitespace-pre-line">
            {event.description}
          </p>
        )}

        <Link
          href="/#reservation"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-xs tracking-[0.18em] uppercase transition-all hover:bg-pupa-accent hover:gap-3"
        >
          Reserve a Table
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}
