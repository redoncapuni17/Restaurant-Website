"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram, Facebook, Twitter, ChevronDown } from "lucide-react";
import { EASE_OUT } from "@/components/motion/constants";
import { SITE_SOCIAL } from "@/lib/siteConfig";

/** Approx banner + nav — avoids layout jump before ResizeObserver runs */
const HEADER_FALLBACK_HEIGHT = 108;
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
  const [headerHeight, setHeaderHeight] = useState(HEADER_FALLBACK_HEIGHT);

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

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => {
      const h = el.getBoundingClientRect().height;
      if (h > 0) setHeaderHeight(h);
    };
    update();

    if (typeof ResizeObserver === "undefined") return;
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

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
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
        initial={false}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0, ease: EASE_OUT }}
            className="text-pupa-brown/70 text-center py-2.5 px-3 text-[0.7rem] sm:text-xs tracking-[0.2em] sm:tracking-widest uppercase font-sans border-b border-pupa-brown/10 leading-relaxed"
          >
            <span className="hidden sm:inline">
              Our restaurant prefers cash payments due to high card transaction fees
            </span>
            <span className="sm:hidden">We prefer cash payments</span>
          </motion.div>

          <nav className="w-full bg-pupa-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.04, ease: EASE_OUT }}
          >
            <Link
              href="/"
              className={`font-serif font-semibold text-pupa-brown tracking-[0.02em] sm:tracking-[0.2em] uppercase transition-colors duration-300 hover:text-pupa-accent min-w-0 ${navFocus}`}
            >
              <span className="block whitespace-nowrap text-2xl sm:text-3xl leading-none">
                Pupa Restaurant & Bar
              </span>
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
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: EASE_OUT }}
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
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.08 + i * 0.04, ease: EASE_OUT }}
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
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: 0.28 + i * 0.04,
                    ease: EASE_OUT,
                  }}
                >
                  <Icon size={18} />
                </motion.a>
                );
              })}
            </div>

            <motion.button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1, ease: EASE_OUT }}
              className={`lg:hidden border-0 bg-transparent p-2 -mr-2 text-pupa-brown cursor-pointer ${navFocus}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              key="nav-backdrop"
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] bg-pupa-dark/45 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              onClick={() => setIsOpen(false)}
            />
            <motion.aside
              key="nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed top-0 right-0 z-[70] flex h-full w-[min(86vw,22rem)] flex-col bg-pupa-beige shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.38, ease: EASE_OUT }}
            >
              <div className="flex items-center justify-between border-b border-pupa-brown/10 px-5 py-4">
                <span className="font-serif text-lg tracking-[0.16em] uppercase text-pupa-brown">
                  Pupa
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className={`border-0 bg-transparent p-1 text-pupa-brown ${navFocus}`}
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-2">
                {navLinks.map((link) => {
                  const menusActive =
                    Boolean(link.children) && isMenusActive(pathname);

                  return link.children ? (
                    <div key={link.label}>
                      <button
                        type="button"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-menus-dropdown"
                        className={`flex w-full items-center justify-between border-0 bg-transparent p-0 py-3.5 font-sans text-base tracking-wider uppercase cursor-pointer ${
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
                            transition={{ duration: 0.28, ease: EASE_OUT }}
                            className="overflow-hidden"
                          >
                            <div className="mb-2 ml-1 flex flex-col border-l border-pupa-brown/15 pl-4">
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
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href!}
                      prefetch
                      onClick={() => setIsOpen(false)}
                      className={`${linkClass(link.href!)} ${navFocus}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-pupa-brown/10 px-5 py-5">
                <div className="mb-5 flex gap-5">
                  {SITE_SOCIAL.map(({ href, label }) => {
                    const Icon =
                      label === "Instagram"
                        ? Instagram
                        : label === "Twitter"
                          ? Twitter
                          : Facebook;
                    return (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className={navFocus}
                      >
                        <Icon size={20} className="text-pupa-brown/70 hover:text-pupa-accent" />
                      </a>
                    );
                  })}
                </div>
                <Link
                  href="/#reservation"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3.5 text-center font-sans text-xs tracking-widest uppercase bg-pupa-brown text-pupa-cream hover:bg-pupa-accent transition-colors"
                >
                  Reserve a Table
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      {/* Spacer so page content starts below the fixed header */}
      <div style={{ height: headerHeight }} aria-hidden="true" />
    </>
  );
}
