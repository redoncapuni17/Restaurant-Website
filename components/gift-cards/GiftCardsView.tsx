"use client";

import Link from "next/link";
import { ArrowRight, Gift, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import GiftCardVouchersWidget from "@/components/gift-cards/GiftCardVouchersWidget";
import { GIFT_CARD_PERKS } from "@/lib/giftCards";

interface GiftCardsViewProps {
  content: Record<string, string>;
  images: Record<string, string>;
}

export default function GiftCardsView({
  content: c,
  images: img,
}: GiftCardsViewProps) {
  const phoneHref = `tel:${c.gc_phone.replace(/\s+/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow={c.gc_hero_eyebrow}
        title={c.gc_title}
        backgroundImage={img.giftcards_hero}
      />

      <section className="relative bg-pupa-beige py-6 sm:py-6 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 glow-gold blur-3xl opacity-[0.12] pointer-events-none" />

        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-6">
          <FadeIn className="mx-auto mb-8 max-w-2xl text-center">
            <p className="font-sans text-pupa-gold text-xs tracking-[0.32em] uppercase mb-2">
              {c.gc_eyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-pupa-brown font-semibold leading-tight">
              {c.gc_heading}
            </h2>
            <p className="mt-3 font-sans text-pupa-brown/70 text-base leading-relaxed">
              {c.gc_body}
            </p>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
              {GIFT_CARD_PERKS.map((perk) => (
                <li
                  key={perk}
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-pupa-brown/70"
                >
                  <Gift
                    size={13}
                    className="text-pupa-gold shrink-0"
                    strokeWidth={1.5}
                  />
                  {perk}
                </li>
              ))}
            </ul>
          </FadeIn>

          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-center font-sans text-[0.7rem] tracking-[0.28em] uppercase text-pupa-brown/50">
              Choose an amount
            </p>
            <GiftCardVouchersWidget />
          </div>

          <p className="mt-8 text-center font-sans text-sm text-pupa-brown/60">
            Prefer to collect a physical card in the restaurant?{" "}
            <a
              href={phoneHref}
              className="inline-flex items-center gap-1 text-pupa-brown underline-offset-4 hover:underline"
            >
              <Phone size={13} className="text-pupa-gold" />
              Call {c.gc_phone}
            </a>
            <span className="mx-2 text-pupa-brown/30">·</span>
            <a
              href={`mailto:${c.gc_email}?subject=Gift Card Enquiry`}
              className="text-pupa-brown underline-offset-4 hover:underline"
            >
              Email us
            </a>
          </p>
        </div>
      </section>

      <section className="bg-pupa-dark py-12 sm:py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <p className="font-sans text-pupa-gold text-sm tracking-[0.3em] uppercase mb-2">
                {c.gc_store_label}
              </p>
              <h3 className="font-serif text-2xl text-pupa-cream font-semibold mb-2">
                {c.gc_store_title}
              </h3>
              <p className="font-sans text-pupa-warm/70 text-base leading-relaxed flex items-start gap-2">
                <MapPin size={14} className="text-pupa-gold shrink-0 mt-0.5" />
                {c.gc_store_text}
              </p>
            </div>
            <Link
              href="/#reservation"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-sm tracking-[0.18em] uppercase hover:bg-pupa-cream transition-colors shrink-0"
            >
              Book a Table
              <ArrowRight size={14} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
