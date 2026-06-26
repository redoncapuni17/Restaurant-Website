"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function BookingWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Lazy loading — ngarkohet vetëm kur vizitori scrollon tek seksioni
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  // Ngarko ResDiary script vetëm kur seksioni është visible
  useEffect(() => {
    if (!isVisible) return;

    // Vendos URL-in e widget-it
    const input = document.getElementById("rdwidgeturl") as HTMLInputElement;
    if (input) {
      input.value =
        "https://booking.resdiary.com/widget/Standard/PUPA/48467?includeJquery=false";
    }

    // Ngarko script-in
    const script = document.createElement("script");
    script.src = "https://booking.resdiary.com/bundles/WidgetV2Loader.js";
    script.async = true;
    script.onload = () => {
      setTimeout(() => setIsLoaded(true), 500);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isVisible]);

  return (
    <section
      id="reservation"
      ref={sectionRef}
      className="py-24 bg-pupa-brown relative overflow-hidden"
    >
      {/* Dekoracion në background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 border border-pupa-gold rounded-full -translate-x-32 -translate-y-32" />
        <div className="absolute bottom-0 right-0 w-96 h-96 border border-pupa-gold rounded-full translate-x-48 translate-y-48" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">
            Book Your Experience
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-pupa-cream font-medium mb-4">
            Make a Reservation
          </h2>
          <div className="w-16 h-px bg-pupa-gold mx-auto mb-6" />
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

        {/* Widget Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-pupa-beige/5 border border-pupa-gold/20 p-6 md:p-10"
        >
          {/* Loading Placeholder — shfaqet derisa widget-i ngarkohet */}
          {!isLoaded && (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              {/* Animacion elegant me ngjyrat e restorantit */}
              <div className="relative w-16 h-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-transparent border-t-pupa-gold rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-2 border-transparent border-t-pupa-cream/50 rounded-full"
                />
                {/* Ikona në mes */}
                <div className="absolute inset-0 flex items-center justify-center text-pupa-gold text-xl">
                  🍽
                </div>
              </div>

              {/* Skeleton cards */}
              <div className="w-full max-w-sm space-y-3">
                <div className="skeleton h-10 w-full rounded" />
                <div className="flex gap-3">
                  <div className="skeleton h-10 flex-1 rounded" />
                  <div className="skeleton h-10 flex-1 rounded" />
                </div>
                <div className="skeleton h-32 w-full rounded" />
                <div className="skeleton h-10 w-32 rounded mx-auto" />
              </div>

              <p className="font-sans text-pupa-warm text-xs tracking-wider animate-pulse">
                Loading reservation system...
              </p>
            </div>
          )}

          {/* ResDiary Widget */}
          <div className={isLoaded ? "block" : "hidden"}>
            <div id="rd-widget-frame" />
            <input
              id="rdwidgeturl"
              name="rdwidgeturl"
              type="hidden"
              defaultValue=""
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
