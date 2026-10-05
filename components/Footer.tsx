"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { OPENING_HOURS, SITE_CONTACT, SITE_SOCIAL } from "@/lib/siteConfig";
import { staggerContainer, staggerItem } from "@/components/motion/constants";

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const SOCIAL_ICONS = {
  Instagram,
  Twitter,
  Facebook,
} as const;

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();

  const rows = DAYS_ORDER.map((day) => {
    const h = OPENING_HOURS.find((row) => row.day === day);
    if (!h) return { day, time: "", closed: false };
    return {
      day,
      time: h.is_closed ? "CLOSED" : `${h.open_time ?? ""} – ${h.close_time ?? ""}`,
      closed: h.is_closed,
    };
  });

  const goToReservation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      document
        .getElementById("reservation")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "/#reservation");
      return;
    }
    router.push("/#reservation");
  };

  return (
    <footer className="bg-pupa-beige text-pupa-brown border-t border-pupa-brown/10">
      <motion.div
        className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          <motion.div variants={staggerItem}>
            <h4 className="font-serif text-pupa-brown text-xl mb-6 uppercase tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-3 font-sans text-base text-pupa-warm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-pupa-brown mt-0.5 shrink-0" />
                <span>
                  {SITE_CONTACT.addressLine1}
                  <br />
                  {SITE_CONTACT.addressLine2}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-pupa-brown shrink-0" />
                <a
                  href={SITE_CONTACT.phoneHref}
                  className="text-pupa-brown underline underline-offset-2 hover:text-pupa-accent transition-colors"
                >
                  {SITE_CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-pupa-brown shrink-0" />
                <a
                  href={SITE_CONTACT.emailHref}
                  className="text-pupa-brown underline underline-offset-2 hover:text-pupa-accent transition-colors"
                >
                  {SITE_CONTACT.email}
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center text-center md:items-center"
          >
            <div className="flex gap-5 mb-6">
              {SITE_SOCIAL.map(({ href, label }) => {
                const Icon = SOCIAL_ICONS[label as keyof typeof SOCIAL_ICONS];
                return (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-pupa-brown hover:text-pupa-accent transition-colors"
                  whileHover={{ y: -3, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={20} />
                </motion.a>
                );
              })}
            </div>
            <h3 className="font-serif text-pupa-brown text-3xl sm:text-4xl font-semibold mb-3 uppercase tracking-wide">
              Pupa Restaurant
            </h3>
            <p className="font-sans text-sm tracking-widest uppercase text-pupa-warm mb-8">
              Mediterranean Charcoal Grill
            </p>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/#reservation"
                onClick={goToReservation}
                className="inline-block w-full sm:w-auto px-6 py-3 sm:py-2.5 border border-pupa-brown text-pupa-brown text-sm tracking-widest uppercase font-sans hover:bg-pupa-brown hover:text-pupa-cream transition-all duration-300 text-center"
              >
                Make a Reservation
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <h4 className="font-serif text-pupa-brown text-xl mb-6 uppercase tracking-wide">
              Opening Hours
            </h4>
            <div className="space-y-2.5 font-sans text-base">
              {rows.map(({ day, time, closed }) => (
                <div key={day} className="flex justify-between gap-4">
                  <span className="text-pupa-warm">{day}</span>
                  <span className={closed ? "text-red-700" : "text-pupa-brown"}>
                    {closed ? "CLOSED" : time}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerItem}
          className="border-t border-pupa-brown/10 mt-10 sm:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left"
        >
          <p className="font-sans text-sm text-pupa-warm/70">
            © {new Date().getFullYear()} Pupa Restaurant & Bar. All rights
            reserved.
          </p>
          <p className="font-sans text-sm text-pupa-warm/70">
            Our restaurant prefers cash payments
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
