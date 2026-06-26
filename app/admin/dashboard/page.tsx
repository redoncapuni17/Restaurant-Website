"use client";

import Link from "next/link";
import {
  UtensilsCrossed, Images, Calendar,
  Clock, ImagePlus,
} from "lucide-react";

const menuItems = [
  { href: "/admin/site-images", label: "Homepage Images", icon: ImagePlus, desc: "Foto e Hero dhe seksioni Our Story" },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed, desc: "Menaxho pjatat dhe çmimet" },
  { href: "/admin/gallery", label: "Gallery", icon: Images, desc: "Ngarko dhe menaxho fotot" },
  { href: "/admin/events", label: "Events", icon: Calendar, desc: "Shto dhe ndrysho eventet" },
  { href: "/admin/hours", label: "Opening Hours", icon: Clock, desc: "Ndrysho oraret e hapjes" },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-pupa-brown mb-2">Welcome back</h1>
        <p className="font-sans text-pupa-brown/60 text-sm">
          Menaxho website-in e Pupa Restaurant nga ky panel.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className="block p-6 bg-white border border-pupa-warm hover:border-pupa-gold hover:shadow-lg transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pupa-cream group-hover:bg-pupa-gold transition-colors duration-200">
                <item.icon size={22} className="text-pupa-brown" />
              </div>
              <div>
                <h3 className="font-serif text-pupa-brown text-lg mb-1">{item.label}</h3>
                <p className="font-sans text-pupa-brown/60 text-sm">{item.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 p-6 bg-pupa-brown/5 border border-pupa-warm">
        <h3 className="font-sans text-xs tracking-widest uppercase text-pupa-brown/60 mb-4">
          Website Links
        </h3>
        <div className="flex gap-4">
          <Link href="/" target="_blank" className="font-sans text-sm text-pupa-gold hover:underline">
            → View Website
          </Link>
          <Link href="/#reservation" target="_blank" className="font-sans text-sm text-pupa-gold hover:underline">
            → Booking Widget
          </Link>
        </div>
      </div>
    </div>
  );
}
