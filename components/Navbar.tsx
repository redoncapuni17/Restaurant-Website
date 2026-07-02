"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Twitter, ChevronDown } from "lucide-react";
import { EASE_OUT } from "@/components/motion/constants";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "Menus",
    children: [
      { href: "/menus", label: "All Menus" },
      { href: "/wine-list", label: "Wine List" },
      { href: "/lunch-menu", label: "Lunch Menu" },
      { href: "/main-menu", label: "Main Menu" },
      { href: "/dessert-menu", label: "Dessert Menu" },
      { href: "/drink-menu", label: "Drink Menu" },
    ],
  },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/events", label: "Events" },
  { href: "/gift-cards", label: "Gift Cards" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const navFocus =
    "outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-pupa-gold/40 focus-visible:ring-offset-0 rounded-sm";

  const linkClass = (href: string) =>
    `block py-3 sm:py-0 font-sans text-sm tracking-wider uppercase transition-colors duration-200 ${
      pathname === href
        ? "text-pupa-gold"
        : "text-pupa-cream/85 hover:text-pupa-gold"
    }`;

  return (
    <header className="w-full bg-pupa-dark">
      <div className="text-pupa-champagne text-center py-2 px-3 text-[0.6rem] sm:text-[0.7rem] tracking-[0.2em] sm:tracking-widest uppercase font-sans border-b border-pupa-gold/15 leading-relaxed">
        <span className="hidden sm:inline">
          Our restaurant prefers cash payments due to high card transaction fees
        </span>
        <span className="sm:hidden">We prefer cash payments</span>
      </div>

      <nav
        className={`sticky top-0 z-50 w-full border-b transition-shadow duration-300 ${
          scrolled
            ? "shadow-lg shadow-black/30 border-pupa-gold/20"
            : "border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className={`font-serif font-semibold text-pupa-cream tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-300 hover:text-pupa-gold shrink-0 ${navFocus}`}
          >
            <span className="text-lg sm:text-2xl sm:hidden">Pupa</span>
            <span className="hidden sm:inline text-2xl">Pupa Restaurant & Bar</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    type="button"
                    className={`relative border-0 bg-transparent p-0 font-sans text-xs tracking-wider uppercase text-pupa-cream/85 hover:text-pupa-gold transition-colors duration-300 cursor-pointer ${navFocus}`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-pupa-gold scale-x-0 opacity-0 origin-left transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                  </button>
                  {/* pt-3 bridges the gap so hover stays active while moving to the menu */}
                  <div className="absolute top-full left-0 pt-3 w-48 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto">
                    <div className="bg-pupa-dark border border-pupa-gold/20 shadow-xl rounded-md overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          prefetch
                          className="block px-4 py-2.5 text-sm font-sans text-pupa-cream/80 hover:bg-pupa-brown hover:text-pupa-gold transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  prefetch
                  className={`group relative font-sans text-xs tracking-wider uppercase transition-colors duration-300 ${
                    pathname === link.href ? "text-pupa-gold" : "text-pupa-cream/85 hover:text-pupa-gold"
                  } ${navFocus}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-pupa-gold scale-x-0 opacity-0 origin-left transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://www.instagram.com/pupa.restaurant.bar"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-pupa-cream/80 hover:text-pupa-gold transition-colors ${navFocus}`}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com/PupaRestaurant"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-pupa-cream/80 hover:text-pupa-gold transition-colors ${navFocus}`}
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.facebook.com/pupa.restaurant"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-pupa-cream/80 hover:text-pupa-gold transition-colors ${navFocus}`}
              >
                <Facebook size={18} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={`lg:hidden border-0 bg-transparent p-2 -mr-2 text-pupa-cream cursor-pointer ${navFocus}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="lg:hidden overflow-hidden bg-pupa-dark border-t border-pupa-gold/15"
            >
              <div className="px-4 sm:px-6 py-2 pb-6 flex flex-col">
                {navLinks.map((link, i) =>
                  link.children ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: EASE_OUT }}
                    >
                      <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className={`flex items-center justify-between w-full border-0 bg-transparent p-0 py-3 font-sans text-sm tracking-wider uppercase text-pupa-cream cursor-pointer ${navFocus}`}
                      >
                        {link.label}
                        <ChevronDown
                          size={18}
                          className={`text-pupa-gold transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {menuOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 pl-3 border-l border-pupa-gold/20 flex flex-col mb-2">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  prefetch
                                  onClick={() => setIsOpen(false)}
                                  className={`py-2.5 text-sm text-pupa-cream/60 hover:text-pupa-gold ${navFocus}`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: EASE_OUT }}
                    >
                      <Link
                        href={link.href!}
                        prefetch
                        onClick={() => setIsOpen(false)}
                        className={`${linkClass(link.href!)} ${navFocus}`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex gap-5 pt-4 mt-2 border-t border-pupa-gold/15"
                >
                  <a href="https://www.instagram.com/pupa.restaurant.bar" target="_blank" rel="noopener noreferrer" className={navFocus}>
                    <Instagram size={20} className="text-pupa-cream/80 hover:text-pupa-gold" />
                  </a>
                  <a href="https://twitter.com/PupaRestaurant" target="_blank" rel="noopener noreferrer" className={navFocus}>
                    <Twitter size={20} className="text-pupa-cream/80 hover:text-pupa-gold" />
                  </a>
                  <a href="https://www.facebook.com/pupa.restaurant" target="_blank" rel="noopener noreferrer" className={navFocus}>
                    <Facebook size={20} className="text-pupa-cream/80 hover:text-pupa-gold" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-5"
                >
                  <Link
                    href="/#reservation"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-widest uppercase hover:bg-pupa-cream transition-colors"
                  >
                    Reserve a Table
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
