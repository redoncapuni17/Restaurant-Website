"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import { EASE_OUT } from "@/components/motion/constants";
import { SITE_IMAGES } from "@/lib/siteConfig";

const menus = [
  {
    title: "Wine List",
    description:
      "A curated selection of Mediterranean wines to complement your meal.",
    href: "/wine-list",
    image: "/images/menus/wine-glass.jpg",
  },
  {
    title: "Lunch Menu",
    description:
      "Light Mediterranean favourites, perfect for a midday escape.",
    href: "/lunch-menu",
    image: SITE_IMAGES.lunch,
  },
  {
    title: "Main Menu",
    description:
      "Our signature charcoal-grilled meats and Mediterranean classics.",
    href: "/main-menu",
    image: SITE_IMAGES.mainMenu,
  },
  {
    title: "Festive Menu",
    description:
      "The full sharing menu — every starter, main and dessert. Minimum 10 guests.",
    href: "/festive-menu",
    image: "/images/gallery/027.jpg",
    isNew: true,
  },
  {
    title: "Dessert Menu",
    description:
      "Sweet endings crafted with care and Mediterranean inspiration.",
    href: "/dessert-menu",
    image: "/images/menus/dessert-food.jpg",
  },
  {
    title: "Drink Menu",
    description: "Cocktails, spirits, soft drinks and more.",
    href: "/drink-menu",
    image: SITE_IMAGES.drink,
  },
];

function OliveBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M98 20c2 48 6 96 4 144-1 28-8 55-22 78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse cx="78" cy="70" rx="18" ry="9" transform="rotate(-35 78 70)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="118" cy="95" rx="16" ry="8" transform="rotate(40 118 95)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="72" cy="130" rx="17" ry="8" transform="rotate(-30 72 130)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="112" cy="155" rx="15" ry="7" transform="rotate(35 112 155)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="70" cy="185" rx="16" ry="8" transform="rotate(-40 70 185)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="100" cy="210" rx="14" ry="7" transform="rotate(25 100 210)" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="78" cy="240" rx="13" ry="6" transform="rotate(-20 78 240)" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function MenuCard({
  title,
  description,
  href,
  image,
  index,
  isNew = false,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
  index: number;
  isNew?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: EASE_OUT }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex items-center gap-4 sm:gap-5 h-full rounded-2xl bg-white/90 shadow-[0_8px_30px_rgba(61,42,31,0.08)] border border-pupa-brown/5 px-4 py-4 sm:px-5 sm:py-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(61,42,31,0.12)]"
      >
        <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-pupa-beige shadow-inner">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="80px"
          />
        </div>

        <div className="min-w-0 flex-1 pr-1">
          <h2 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-serif text-pupa-brown text-2xl sm:text-3xl font-semibold mb-1 group-hover:text-pupa-accent transition-colors">
            {title}
            {isNew && (
              <span className="inline-flex items-center rounded-sm bg-[#6B2E2E] px-1.5 py-1 font-sans text-[10px] font-medium uppercase leading-none tracking-[0.14em] text-pupa-cream">
                New
              </span>
            )}
          </h2>
          <p className="font-sans text-pupa-warm text-base leading-relaxed line-clamp-2">
            {description}
          </p>
          <span className="inline-block mt-2.5 font-sans text-sm tracking-[0.18em] uppercase text-pupa-brown/70 group-hover:text-pupa-accent transition-colors">
            View Menu →
          </span>
        </div>

        <span className="shrink-0 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-pupa-brown/20 text-pupa-brown transition-all duration-300 group-hover:bg-pupa-brown group-hover:text-pupa-cream group-hover:border-pupa-brown">
          <ArrowRight size={18} />
        </span>
      </Link>
    </motion.div>
  );
}

export default function MenusView() {
  return (
    <>
      <PageHero
        eyebrow="Explore"
        title="Our Menus"
        backgroundImage={SITE_IMAGES.menus}
      />

      <section className="relative py-4 sm:py-6 md:py-8 bg-pupa-beige overflow-hidden">
        <OliveBranch className="pointer-events-none absolute -left-6 top-8 w-36 sm:w-48 text-pupa-brown/15 -rotate-12" />
        <OliveBranch className="pointer-events-none absolute -right-8 bottom-12 w-40 sm:w-52 text-pupa-brown/15 rotate-[160deg] scale-x-[-1]" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-6 sm:mb-8">
            <Leaf
              size={22}
              className="mx-auto mb-2 text-pupa-brown/55"
              strokeWidth={1.5}
            />
            <p className="font-serif text-pupa-brown text-xl sm:text-2xl text-balance">
              Choose a menu and discover Mediterranean flavours.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {menus.map((menu, i) => (
              <MenuCard key={menu.title} {...menu} index={i} />
            ))}
          </div>

          <FadeIn className="mt-8 sm:mt-10" delay={0.15}>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="h-px flex-1 bg-pupa-brown/20" />
              <p className="font-sans text-pupa-warm text-base text-center max-w-md shrink">
                Menus are subject to seasonal changes. Please ask your server
                about today&apos;s specials.
              </p>
              <div className="h-px flex-1 bg-pupa-brown/20" />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
