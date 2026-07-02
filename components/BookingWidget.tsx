"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";

const TRUST_BADGES = [
  { icon: CalendarCheck, label: "Real-time availability" },
  { icon: Clock, label: "Instant confirmation" },
  { icon: ShieldCheck, label: "Secure booking" },
];

const RESDIARY_WIDGET_URL =
  "https://booking.resdiary.com/widget/Standard/PUPA/48467";

// ResDiary widget runs in a cross-origin iframe — we cannot style its internals.
// Keep scale at 1 so text and calendar cells stay sharp (scaling causes blur).
const WIDGET_HEIGHT = 640;

export default function BookingWidget() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section
      id="reservation"
      className="py-24 bg-pupa-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 border border-pupa-gold rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-pupa-gold rounded-full translate-x-48 translate-y-48" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="rounded-xl overflow-hidden border border-pupa-warm/30 bg-white shadow-lg shadow-black/20">
              <div className="relative bg-white">
                {!isLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-white">
                    <div className="relative w-14 h-14">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 border-2 border-transparent border-t-pupa-gold rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-pupa-gold text-xl">
                        🍽
                      </div>
                    </div>
                    <p className="font-sans text-pupa-brown/50 text-xs tracking-wider">
                      Loading reservation system...
                    </p>
                  </div>
                )}

                <div
                  className="overflow-hidden bg-white"
                  style={{ height: `${WIDGET_HEIGHT}px` }}
                >
                  <iframe
                    src={RESDIARY_WIDGET_URL}
                    title="Book a table at Pupa Restaurant & Bar"
                    onLoad={() => setIsLoaded(true)}
                    className="block w-full bg-white"
                    style={{
                      height: `${WIDGET_HEIGHT}px`,
                      border: "0",
                    }}
                    loading="eager"
                  />
                </div>
              </div>

              <div className="border-t border-pupa-warm/20 bg-pupa-beige/40 px-4 py-3 text-center">
                <span className="font-sans text-pupa-brown/45 text-xs">
                  Powered by ResDiary — secure online booking
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
