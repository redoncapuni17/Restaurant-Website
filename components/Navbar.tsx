"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Twitter } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  {
    label: "Menus",
    children: [
      { href: "/menus#wine", label: "Wine List" },
      { href: "/menus#lunch", label: "Lunch Menu" },
      { href: "/menus#main", label: "Main Menu" },
      { href: "/menus#dessert", label: "Dessert Menu" },
      { href: "/menus#drinks", label: "Drink Menu" },
    ],
  },
  { href: "/private-hire", label: "Private Hire" },
  { href: "/events", label: "Events" },
  { href: "/gift-cards", label: "Gift Cards" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Cash Payment Banner */}
      <div className="bg-pupa-brown text-pupa-cream text-center py-2 text-xs tracking-widest uppercase font-sans">
        Our restaurant prefers cash payments due to high card transaction fees
      </div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-pupa-beige/95 backdrop-blur-md shadow-md"
            : "bg-pupa-cream"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl font-semibold text-pupa-brown tracking-widest uppercase">
            Pupa Restaurant & Bar
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button className="font-sans text-sm tracking-wider uppercase text-pupa-brown hover:text-pupa-gold transition-colors duration-300">
                    {link.label}
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-44 bg-pupa-beige border border-pupa-warm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm font-sans text-pupa-brown hover:bg-pupa-warm hover:text-pupa-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className="font-sans text-sm tracking-wider uppercase text-pupa-brown hover:text-pupa-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Social + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <a href="https://www.instagram.com/pupa.restaurant.bar" target="_blank" rel="noopener noreferrer" className="text-pupa-brown hover:text-pupa-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com/PupaRestaurant" target="_blank" rel="noopener noreferrer" className="text-pupa-brown hover:text-pupa-gold transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.facebook.com/pupa.restaurant" target="_blank" rel="noopener noreferrer" className="text-pupa-brown hover:text-pupa-gold transition-colors">
                <Facebook size={18} />
              </a>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-pupa-brown"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden bg-pupa-beige border-t border-pupa-warm"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {navLinks.map((link) =>
                  link.children ? (
                    <div key={link.label}>
                      <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="font-sans text-sm tracking-wider uppercase text-pupa-brown w-full text-left"
                      >
                        {link.label}
                      </button>
                      <div className="ml-4 mt-2 flex flex-col gap-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="text-sm text-pupa-brown/70 hover:text-pupa-gold"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      onClick={() => setIsOpen(false)}
                      className="font-sans text-sm tracking-wider uppercase text-pupa-brown hover:text-pupa-gold"
                    >
                      {link.label}
                    </Link>
                  )
                )}
                <div className="flex gap-4 pt-2 border-t border-pupa-warm">
                  <a href="https://www.instagram.com/pupa.restaurant.bar" target="_blank" rel="noopener noreferrer">
                    <Instagram size={18} className="text-pupa-brown" />
                  </a>
                  <a href="https://twitter.com/PupaRestaurant" target="_blank" rel="noopener noreferrer">
                    <Twitter size={18} className="text-pupa-brown" />
                  </a>
                  <a href="https://www.facebook.com/pupa.restaurant" target="_blank" rel="noopener noreferrer">
                    <Facebook size={18} className="text-pupa-brown" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
