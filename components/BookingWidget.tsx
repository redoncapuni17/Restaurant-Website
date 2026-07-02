"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";

const TRUST_BADGES = [
  { icon: CalendarCheck, label: "Real-time availability" },
  { icon: Clock, label: "Instant confirmation" },
  { icon: ShieldCheck, label: "Secure booking" },
];

export default function BookingWidget({
  children,
}: {
  children: React.ReactNode;
}) {
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

          <div className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
