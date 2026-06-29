"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";

const TRUST_BADGES = [
  { icon: CalendarCheck, label: "Real-time availability" },
  { icon: Clock, label: "Instant confirmation" },
  { icon: ShieldCheck, label: "Secure booking" },
];

// URL-ja e widget-it të ResDiary. Është faqe e plotë HTML e pavarur, prandaj e
// ngarkojmë në një <iframe>: widget-i ekzekutohet në dokumentin e vet (jQuery +
// knockout + widget.js + window.onload) pa konfliktet e React/Next.js (SPA).
const RESDIARY_WIDGET_URL =
  "https://booking.resdiary.com/widget/Standard/PUPA/48467";

// Widget-i vjen nga sistemi i ResDiary (iframe cross-origin), prandaj përmasat e
// brendshme nuk i ndryshojmë dot nga jashtë. E zvogëlojmë gjithë widget-in
// vizualisht me transform:scale dhe i japim lartësi të mjaftueshme (logjike) që
// kalendari të shfaqet i plotë, PA scroll të brendshëm.
const WIDGET_SCALE = 0.92; // sa i vogël (1 = përmasa origjinale)
const WIDGET_LOGICAL_HEIGHT = 630; // px — lartësia e brendshme aq sa mbaron kalendari (pa bardhësi)

export default function BookingWidget() {
  // Kalendari ngarkohet menjëherë kur hapet faqja (jo me scroll/klik), që të
  // jetë gati. Mbajmë vetëm gjendjen e ngarkimit për overlay-in.
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      id="reservation"
      className="py-24 bg-pupa-dark relative overflow-hidden"
    >
      {/* Dekoracion në background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border border-pupa-gold rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-pupa-gold rounded-full translate-x-48 translate-y-48" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Kolona majtas — Teksti */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">
              Book Your Experience
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-pupa-cream font-semibold mb-4">
              Make a Reservation
            </h2>
            <div className="w-16 h-px bg-pupa-gold mx-auto lg:mx-0 mb-6" />
            <p className="font-sans text-pupa-warm text-sm max-w-md mx-auto lg:mx-0 mb-8">
              Reserve your table in seconds. Real-time availability with instant
              confirmation.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 mb-8">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-pupa-warm/80"
                >
                  <Icon size={16} className="text-pupa-gold" />
                  <span className="font-sans text-xs tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-sans text-pupa-warm text-sm">
              Can&apos;t find a timeslot?{" "}
              <a
                href="tel:01614004830"
                className="text-pupa-gold hover:underline"
              >
                Call us on 0161 400 4830
              </a>
            </p>
          </motion.div>

          {/* Kolona djathtas — Karta e widget-it */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-pupa-gold/25 bg-gradient-to-b from-pupa-beige/10 to-pupa-dark/20 shadow-2xl shadow-black/30 backdrop-blur-sm"
          >
            {/* Vija e artë sipër kartës */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-pupa-gold to-transparent" />

            <div className="relative p-2.5 md:p-3">
              {/* Loading Placeholder — overlay sipër iframe-it derisa ngarkohet */}
              {!isLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-pupa-beige/10 to-pupa-dark/20 backdrop-blur-sm">
                  {/* Animacion elegant me ngjyrat e restorantit */}
                  <div className="relative w-16 h-16">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 border-2 border-transparent border-t-pupa-gold rounded-full"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-2 border-2 border-transparent border-t-pupa-cream/50 rounded-full"
                    />
                    {/* Ikona në mes */}
                    <div className="absolute inset-0 flex items-center justify-center text-pupa-gold text-xl">
                      🍽
                    </div>
                  </div>

                  <p className="font-sans text-pupa-warm text-xs tracking-wider animate-pulse">
                    Loading reservation system...
                  </p>
                </div>
              )}

              {/* ResDiary Widget në iframe — ngarkohet vetëm kur seksioni bëhet visible.
                E zvogëluar me transform:scale; wrapper-i e pret tepricën dhe e
                cakton lartësinë vizuale = lartësia logjike * scale (pa scroll). */}
              <div
                className="overflow-hidden rounded-xl bg-white"
                style={{
                  height: `${Math.round(WIDGET_LOGICAL_HEIGHT * WIDGET_SCALE)}px`,
                }}
              >
              <iframe
                src={RESDIARY_WIDGET_URL}
                title="Book a table at Pupa Restaurant & Bar"
                onLoad={() => setIsLoaded(true)}
                className="block"
                style={{
                  width: `${100 / WIDGET_SCALE}%`,
                  height: `${WIDGET_LOGICAL_HEIGHT}px`,
                  transform: `scale(${WIDGET_SCALE})`,
                  transformOrigin: "top left",
                  border: "0",
                }}
                loading="eager"
              />
              </div>
            </div>

            {/* Footer i kartës */}
            <div className="border-t border-pupa-gold/15 bg-pupa-dark/30 px-6 py-4 flex items-center justify-center gap-2 text-center">
              <span className="font-sans text-pupa-warm/50 text-xs">
                Powered by ResDiary — secure online booking
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
