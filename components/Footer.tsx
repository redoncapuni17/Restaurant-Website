import Link from "next/link";
import { Instagram, Twitter, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";

const hours = [
  { day: "Monday & Wednesday", time: "17:00 – 22:00" },
  { day: "Tuesday", time: "CLOSED" },
  { day: "Thursday – Saturday", time: "12:00 – 22:00" },
  { day: "Sunday", time: "13:30 – 22:00" },
];

export default function Footer() {
  return (
    <footer className="bg-pupa-brown text-pupa-warm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact */}
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

          {/* Center - Logo & Social */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-serif text-pupa-cream text-2xl mb-3">Pupa Restaurant</h3>
            <p className="font-sans text-xs tracking-widest uppercase text-pupa-gold mb-6">
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
            <Link href="#reservation"
              className="px-6 py-2.5 border border-pupa-gold text-pupa-gold text-xs tracking-widest uppercase font-sans hover:bg-pupa-gold hover:text-pupa-dark transition-all duration-300">
              Reserve a Table
            </Link>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-serif text-pupa-cream text-lg mb-6">Opening Hours</h4>
            <div className="space-y-2.5 font-sans text-sm">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex justify-between gap-4">
                  <span className="text-pupa-warm/70">{day}</span>
                  <span className={time === "CLOSED" ? "text-red-400" : "text-pupa-gold"}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-pupa-warm/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
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
