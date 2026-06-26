import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import type { Event } from "@/types";
import Image from "next/image";
import Link from "next/link";

async function getEvents(): Promise<Event[]> {
  const { data } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date");
  return data || [];
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/155bf0fb-21cc-4805-afd3-f00a5c2d40eb/IMG_2276.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-pupa-dark/65" />
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3">What&apos;s On</p>
          <h1 className="font-serif text-4xl md:text-5xl text-pupa-cream font-medium">Upcoming Events</h1>
          <div className="w-12 h-px bg-pupa-gold mt-4" />
        </div>
      </section>

      {/* Events List */}
      <section className="py-20 bg-pupa-beige">
        <div className="max-w-4xl mx-auto px-6">
          {events.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-pupa-brown/40 mb-4">No upcoming events</p>
              <p className="font-sans text-pupa-brown/30 text-sm">Check back soon for new events and special evenings.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {events.map((event, i) => (
                <div key={event.id} className="flex flex-col md:flex-row gap-6 bg-white border border-pupa-warm p-6 md:p-8">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-20 h-20 bg-pupa-brown flex flex-col items-center justify-center">
                    <span className="font-sans text-pupa-gold text-xs uppercase tracking-wider">
                      {new Date(event.date).toLocaleDateString("en-GB", { month: "short" })}
                    </span>
                    <span className="font-serif text-pupa-cream text-3xl leading-none">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <p className="font-sans text-pupa-gold text-xs tracking-wider uppercase mb-2">
                      {event.time_start} – {event.time_end}
                    </p>
                    <h2 className="font-serif text-pupa-brown text-2xl mb-3">{event.title}</h2>
                    {event.description && (
                      <p className="font-sans text-pupa-brown/70 leading-relaxed">{event.description}</p>
                    )}
                    <Link
                      href="/#reservation"
                      className="inline-block mt-4 px-6 py-2.5 bg-pupa-brown text-pupa-cream font-sans text-xs tracking-widest uppercase hover:bg-pupa-dark transition-colors"
                    >
                      Reserve a Table
                    </Link>
                  </div>

                  {/* Image */}
                  {event.image_url && (
                    <div className="md:w-48 h-48 relative overflow-hidden flex-shrink-0">
                      <Image src={event.image_url} alt={event.title} fill className="object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
