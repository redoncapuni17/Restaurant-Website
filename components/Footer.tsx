import Link from "next/link";
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail } from "lucide-react";
import { OPENING_HOURS } from "@/lib/siteConfig";

const DAYS_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function Footer() {
  const rows = DAYS_ORDER.map((day) => {
    const h = OPENING_HOURS.find((row) => row.day === day);
    if (!h) return { day, time: "", closed: false };
    return {
      day,
      time: h.is_closed ? "CLOSED" : `${h.open_time ?? ""} – ${h.close_time ?? ""}`,
      closed: h.is_closed,
    };
  });

  return (
    <footer className="bg-pupa-dark text-pupa-warm border-t border-pupa-gold/15">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          <div>
            <h4 className="font-serif text-pupa-cream text-lg mb-6">Contact Us</h4>
            <div className="space-y-3 font-sans text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-pupa-gold mt-0.5 shrink-0" />
                <span>37 Turner Street,<br />Manchester, NQ, M4 1DW</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-pupa-gold shrink-0" />
                <a href="tel:01614004830" className="hover:text-pupa-gold transition-colors">
                  0161 400 4830
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-pupa-gold shrink-0" />
                <a href="mailto:info@puparestaurant.com" className="hover:text-pupa-gold transition-colors">
                  info@puparestaurant.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center text-center md:items-center">
            <h3 className="font-serif text-pupa-cream text-2xl sm:text-3xl font-semibold mb-3">Pupa Restaurant</h3>
            <p className="font-sans text-xs tracking-widest uppercase text-pupa-champagne mb-6">
              Mediterranean Charcoal Grill
            </p>
            <div className="flex gap-5 mb-8">
              <a href="https://www.instagram.com/pupa.restaurant.bar" target="_blank" rel="noopener noreferrer"
                className="text-pupa-warm hover:text-pupa-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com/PupaRestaurant" target="_blank" rel="noopener noreferrer"
                className="text-pupa-warm hover:text-pupa-gold transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.facebook.com/pupa.restaurant" target="_blank" rel="noopener noreferrer"
                className="text-pupa-warm hover:text-pupa-gold transition-colors">
                <Facebook size={20} />
              </a>
            </div>
            <Link
              href="/#reservation"
              className="w-full sm:w-auto px-6 py-3 sm:py-2.5 border border-pupa-gold text-pupa-gold text-xs tracking-widest uppercase font-sans hover:bg-pupa-gold hover:text-pupa-dark transition-all duration-300 text-center"
            >
              Reserve a Table
            </Link>
          </div>

          <div>
            <h4 className="font-serif text-pupa-cream text-lg mb-6">Opening Hours</h4>
            <div className="space-y-2.5 font-sans text-sm">
              {rows.map(({ day, time, closed }) => (
                <div key={day} className="flex justify-between gap-4">
                  <span className="text-pupa-warm/70">{day}</span>
                  <span className={closed ? "text-red-400" : "text-pupa-gold"}>
                    {closed ? "CLOSED" : time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-pupa-warm/20 mt-10 sm:mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
          <p className="font-sans text-xs text-pupa-warm/50">
            © {new Date().getFullYear()} Pupa Restaurant & Bar. All rights reserved.
          </p>
          <p className="font-sans text-xs text-pupa-warm/50">
            Our restaurant prefers cash payments
          </p>
        </div>
      </div>
    </footer>
  );
}
