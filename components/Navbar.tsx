"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Twitter, ChevronDown } from "lucide-react";
import { EASE_OUT } from "@/components/motion/constants";
import { SITE_SOCIAL } from "@/lib/siteConfig";

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

function isLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isMenusActive(pathname: string) {
  const menus = navLinks.find((l) => l.children);
  return (
    menus?.children?.some(
      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`)
    ) ?? false
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopMenusOpen, setDesktopMenusOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menusDropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollY.current;
      const delta = y - prev;

      setScrolled(y > 50);

      // Keep visible near the top, or while the mobile menu is open
      if (y < 80 || isOpen) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }

      lastScrollY.current = y;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const update = () => {
      const height = el.getBoundingClientRect().height;
      setHeaderHeight(height);
      document.documentElement.style.setProperty("--site-header", `${height}px`);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMenuOpen(false);
    setDesktopMenusOpen(false);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopMenusOpen) return;

    const onPointerDown = (e: MouseEvent) => {
      if (!menusDropdownRef.current?.contains(e.target as Node)) {
        setDesktopMenusOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopMenusOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [desktopMenusOpen]);

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const navFocus =
    "outline-none focus:outline-none focus-visible:ring-1 focus-visible:ring-pupa-accent/40 focus-visible:ring-offset-0 rounded-sm";

  const linkClass = (href: string) =>
    `block py-3 sm:py-0 font-sans text-base tracking-wider uppercase transition-colors duration-200 ${
      isLinkActive(pathname, href)
        ? "text-pupa-accent"
        : "text-pupa-brown/80 hover:text-pupa-accent"
    }`;

  const underlineClass = (active: boolean) =>
    `absolute -bottom-1.5 left-0 h-px w-full bg-pupa-accent origin-left transition-all duration-300 ${
      active
        ? "scale-x-100 opacity-100"
        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
    }`;

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 w-full bg-pupa-beige border-b ${
          scrolled
            ? "shadow-md shadow-pupa-brown/10 border-pupa-brown/10"
            : "border-transparent"
        }`}
        initial={{ y: -24, opacity: 0 }}
        animate={{
          y: hidden ? "-100%" : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <div>
          <nav className="w-full bg-pupa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE_OUT }}
          >
            <Link
              href="/"
              className={`font-serif font-semibold text-pupa-brown tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-300 hover:text-pupa-accent shrink-0 ${navFocus}`}
            >
              <span className="text-xl sm:text-3xl sm:hidden">Pupa Restaurant & Bar</span>
              <span className="hidden sm:inline text-3xl">Pupa Restaurant & Bar</span>
            </Link>
          </motion.div>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const menusActive = Boolean(link.children) && isMenusActive(pathname);
              const active = link.children
                ? menusActive
                : isLinkActive(pathname, link.href!);

              return link.children ? (
                <motion.div
                  key={link.label}
                  ref={menusDropdownRef}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.06, ease: EASE_OUT }}
                  className="relative flex items-center h-6"
                  onMouseEnter={() => setDesktopMenusOpen(true)}
                  onMouseLeave={() => setDesktopMenusOpen(false)}
                >
                  <button
                    type="button"
                    id="menus-trigger"
                    aria-expanded={desktopMenusOpen}
                    aria-haspopup="menu"
                    aria-controls="menus-dropdown"
                    onClick={() => setDesktopMenusOpen((open) => !open)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setDesktopMenusOpen(true);
                      }
                    }}
                    className={`relative inline-flex items-center border-0 bg-transparent p-0 m-0 font-sans text-base leading-none tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                      active
                        ? "text-pupa-accent"
                        : "text-pupa-brown/80 hover:text-pupa-accent"
                    } ${navFocus}`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform duration-200 ${desktopMenusOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                    <span className={underlineClass(active)} />
                  </button>
                  <div
                    id="menus-dropdown"
                    role="menu"
                    aria-labelledby="menus-trigger"
                    className={`absolute top-full left-0 pt-3 w-48 transition-all duration-200 ease-out ${
                      desktopMenusOpen
                        ? "opacity-100 visible translate-y-0 pointer-events-auto"
                        : "opacity-0 invisible translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="bg-pupa-cream border border-pupa-brown/15 shadow-xl rounded-md overflow-hidden origin-top">
                      {link.children.map((child) => {
                        const childActive = isLinkActive(pathname, child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            prefetch
                            tabIndex={desktopMenusOpen ? 0 : -1}
                            onClick={() => setDesktopMenusOpen(false)}
                            className={`block px-4 py-2.5 text-base font-sans transition-colors duration-200 ${
                              childActive
                                ? "bg-pupa-beige text-pupa-accent"
                                : "text-pupa-brown/80 hover:bg-pupa-beige hover:text-pupa-accent"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.06, ease: EASE_OUT }}
                  className="flex items-center h-6"
                >
                  <Link
                    href={link.href!}
                    prefetch
                    className={`group relative inline-flex items-center h-6 font-sans text-base leading-none tracking-wider uppercase transition-colors duration-300 ${
                      active
                        ? "text-pupa-accent"
                        : "text-pupa-brown/80 hover:text-pupa-accent"
                    } ${navFocus}`}
                  >
                    {link.label}
                    <span className={underlineClass(active)} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden lg:flex items-center gap-3">
              {SITE_SOCIAL.map(({ href, label }, i) => {
                const Icon =
                  label === "Instagram"
                    ? Instagram
                    : label === "Twitter"
                      ? Twitter
                      : Facebook;
                return (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`text-pupa-brown/70 hover:text-pupa-accent transition-colors ${navFocus}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.35 + i * 0.06,
                    ease: EASE_OUT,
                  }}
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                </motion.a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className={`lg:hidden border-0 bg-transparent p-2 -mr-2 text-pupa-brown cursor-pointer ${navFocus}`}
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
              className="lg:hidden overflow-hidden bg-pupa-beige border-t border-pupa-brown/10"
            >
              <div className="px-4 sm:px-6 py-2 pb-6 flex flex-col">
                {navLinks.map((link, i) => {
                  const menusActive =
                    Boolean(link.children) && isMenusActive(pathname);

                  return link.children ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.35, ease: EASE_OUT }}
                    >
                      <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menus-dropdown"
                        className={`flex items-center justify-between w-full border-0 bg-transparent p-0 py-3 font-sans text-base tracking-wider uppercase cursor-pointer ${
                          menusActive ? "text-pupa-accent" : "text-pupa-brown"
                        } ${navFocus}`}
                      >
                        {link.label}
                        <ChevronDown
                          size={18}
                          className={`text-pupa-accent transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        />
                      </button>
                      <AnimatePresence>
                        {menuOpen && (
                          <motion.div
                            id="mobile-menus-dropdown"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 pl-3 border-l border-pupa-brown/15 flex flex-col mb-2">
                              {link.children.map((child) => {
                                const childActive = isLinkActive(
                                  pathname,
                                  child.href
                                );
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    prefetch
                                    onClick={() => setIsOpen(false)}
                                    className={`py-2.5 text-base ${
                                      childActive
                                        ? "text-pupa-accent font-medium"
                                        : "text-pupa-brown/60 hover:text-pupa-accent"
                                    } ${navFocus}`}
                                  >
                                    {child.label}
                                  </Link>
                                );
                              })}
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
                  );
                })}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex gap-5 pt-4 mt-2 border-t border-pupa-brown/10"
                >
                  <a href="https://www.instagram.com/pupa.restaurant.bar" target="_blank" rel="noopener noreferrer" className={navFocus}>
                    <Instagram size={20} className="text-pupa-brown/70 hover:text-pupa-accent" />
                  </a>
                  <a href="https://twitter.com/PupaRestaurant" target="_blank" rel="noopener noreferrer" className={navFocus}>
                    <Twitter size={20} className="text-pupa-brown/70 hover:text-pupa-accent" />
                  </a>
                  <a href="https://www.facebook.com/pupa.restaurant" target="_blank" rel="noopener noreferrer" className={navFocus}>
                    <Facebook size={20} className="text-pupa-brown/70 hover:text-pupa-accent" />
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
                    className="block w-full text-center py-3.5 bg-pupa-brown text-pupa-cream font-sans text-xs tracking-widest uppercase hover:bg-pupa-accent transition-colors"
                  >
                    Reserve a Table
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
          </nav>
        </div>
      </motion.header>
      {/* Spacer so page content starts below the fixed header */}
      <div style={{ height: headerHeight }} aria-hidden="true" />
    </>
  );
}
