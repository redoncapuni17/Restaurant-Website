"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import { EASE_OUT } from "@/components/motion/constants";

import { SITE_IMAGES } from "@/lib/siteConfig";

const menus = [
  {
    title: "Wine List",
    description: "A curated selection of Mediterranean wines to complement your meal.",
    href: "/wine-list",
    icon: "🍷",
  },
  {
    title: "Lunch Menu",
    description: "Light Mediterranean favourites, perfect for a midday escape.",
    href: "/lunch-menu",
    icon: "☀️",
  },
  {
    title: "Main Menu",
    description: "Our signature charcoal-grilled meats and Mediterranean classics.",
    href: "/main-menu",
    icon: "🔥",
  },
  {
    title: "Dessert Menu",
    description: "Sweet endings crafted with care and Mediterranean inspiration.",
    href: "/dessert-menu",
    icon: "🍮",
  },
  {
    title: "Drink Menu",
    description: "Cocktails, spirits, soft drinks and more.",
    href: "/drink-menu",
    icon: "🥂",
  },
];

export default function MenusView() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Our Menus"
        backgroundImage={SITE_IMAGES.menus}
      />

      <section className="py-14 sm:py-20 bg-pupa-beige">
        <div className="max-w-4xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {menus.map((menu, i) => (
              <motion.div
                key={menu.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: EASE_OUT }}
              >
                <Link
                  href={menu.href}
                  className="flex items-start gap-4 sm:gap-5 bg-white border border-pupa-warm p-5 sm:p-6 hover:border-pupa-gold hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group h-full rounded-sm"
                >
                  <span className="text-2xl sm:text-3xl shrink-0">{menu.icon}</span>
                  <div className="min-w-0">
                    <h2 className="font-serif text-pupa-brown text-lg sm:text-xl mb-1.5 sm:mb-2 group-hover:text-pupa-accent transition-colors">
                      {menu.title}
                    </h2>
                    <p className="font-sans text-pupa-brown/60 text-sm leading-relaxed">
                      {menu.description}
                    </p>
                    <span className="inline-block mt-3 font-sans text-xs tracking-wider uppercase text-pupa-gold">
                      View Menu →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <FadeIn className="text-center mt-10 sm:mt-12" delay={0.2}>
            <p className="font-sans text-pupa-brown/40 text-xs sm:text-sm px-2">
              Menus are subject to seasonal changes. Please ask your server about today&apos;s specials.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
