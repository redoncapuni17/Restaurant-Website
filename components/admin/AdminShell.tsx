"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard,
  ImagePlus,
  UtensilsCrossed,
  Images,
  Calendar,
  Clock,
  Gift,
  LogOut,
} from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site-images", label: "Homepage", icon: ImagePlus },
  { href: "/admin/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/gift-cards", label: "Gift Cards", icon: Gift },
  { href: "/admin/hours", label: "Hours", icon: Clock },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen bg-pupa-beige">
      <nav className="bg-pupa-brown px-4 md:px-6 py-3 flex items-center gap-4 sticky top-0 z-40">
        <Link href="/admin/dashboard" className="flex items-center gap-2 shrink-0">
          <LayoutDashboard size={18} className="text-pupa-gold" />
          <span className="font-serif text-pupa-cream text-base hidden sm:block">Pupa Admin</span>
        </Link>

        <div className="flex items-center gap-1 overflow-x-auto flex-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                prefetch
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans whitespace-nowrap transition-colors ${
                  active
                    ? "bg-pupa-gold text-pupa-dark"
                    : "text-pupa-warm hover:text-pupa-gold"
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-pupa-warm hover:text-pupa-gold transition-colors text-xs font-sans shrink-0"
        >
          <LogOut size={14} />
          <span className="hidden md:block">Logout</span>
        </button>
      </nav>

      {children}
    </div>
  );
}
