"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UtensilsCrossed, Images, Calendar,
  Clock, Gift, LogOut, LayoutDashboard
} from "lucide-react";

const menuItems = [
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed, desc: "Menaxho pjatat dhe çmimet" },
  { href: "/admin/gallery", label: "Gallery", icon: Images, desc: "Ngarko dhe menaxho fotot" },
  { href: "/admin/events", label: "Events", icon: Calendar, desc: "Shto dhe ndrysho eventet" },
  { href: "/admin/hours", label: "Opening Hours", icon: Clock, desc: "Ndrysho oraret e hapjes" },
];

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/admin/login");
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-pupa-beige">
      {/* Admin Navbar */}
      <nav className="bg-pupa-brown px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={20} className="text-pupa-gold" />
          <span className="font-serif text-pupa-cream text-lg">Pupa Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-sans text-pupa-warm text-sm hidden md:block">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-pupa-warm hover:text-pupa-gold transition-colors text-sm font-sans"
          >
            <LogOut size={16} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-serif text-3xl text-pupa-brown mb-2">
            Welcome back
          </h1>
          <p className="font-sans text-pupa-brown/60 text-sm">
            Menaxho website-in e Pupa Restaurant nga ky panel.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={item.href}
                className="block p-6 bg-white border border-pupa-warm hover:border-pupa-gold hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-pupa-cream group-hover:bg-pupa-gold transition-colors duration-300">
                    <item.icon size={22} className="text-pupa-brown" />
                  </div>
                  <div>
                    <h3 className="font-serif text-pupa-brown text-lg mb-1">
                      {item.label}
                    </h3>
                    <p className="font-sans text-pupa-brown/60 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 bg-pupa-brown/5 border border-pupa-warm"
        >
          <h3 className="font-sans text-xs tracking-widest uppercase text-pupa-brown/60 mb-4">
            Website Links
          </h3>
          <div className="flex gap-4">
            <Link
              href="/"
              target="_blank"
              className="font-sans text-sm text-pupa-gold hover:underline"
            >
              → View Website
            </Link>
            <Link
              href="/#reservation"
              target="_blank"
              className="font-sans text-sm text-pupa-gold hover:underline"
            >
              → Booking Widget
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
