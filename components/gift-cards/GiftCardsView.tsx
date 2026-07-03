"use client";

import Link from "next/link";
import { ArrowRight, Gift, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import GiftCardVisual from "@/components/gift-cards/GiftCardVisual";
import { GIFT_CARD_AMOUNTS, GIFT_CARD_PERKS } from "@/lib/giftCards";

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
        imageOpacity={0.2}
      />

      <section className="relative py-14 sm:py-20 md:py-24 bg-pupa-beige overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 glow-gold blur-3xl opacity-[0.12] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <GiftCardVisual />

            <div>
              <FadeIn>
                <p className="font-sans text-pupa-gold text-xs tracking-[0.35em] uppercase mb-3">
                  {c.gc_eyebrow}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl text-pupa-brown font-semibold leading-tight mb-4">
                  {c.gc_heading}
                </h2>
                <div className="w-12 h-px bg-pupa-gold mb-5" />
                <p className="font-sans text-pupa-brown/70 text-sm sm:text-base leading-relaxed mb-8">
                  {c.gc_body}
                </p>
              </FadeIn>

              <FadeIn delay={0.08}>
                <p className="font-sans text-pupa-brown/50 text-xs tracking-[0.2em] uppercase mb-3">
                  Choose an amount
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {GIFT_CARD_AMOUNTS.map((amount) => (
                    <span
                      key={amount}
                      className="px-4 py-2 rounded-sm bg-white ring-1 ring-pupa-brown/10 font-sans text-sm text-pupa-brown shadow-sm"
                    >
                      {amount}
                    </span>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={0.12}>
                <ul className="space-y-3 mb-8">
                  {GIFT_CARD_PERKS.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-3 font-sans text-pupa-brown/65 text-sm"
                    >
                      <Gift
                        size={15}
                        className="text-pupa-gold shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      {perk}
                    </li>
                  ))}
                </ul>
              </FadeIn>

              <FadeIn delay={0.16}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-xs tracking-[0.18em] uppercase hover:bg-pupa-dark transition-colors"
                  >
                    <Phone size={14} />
                    Call {c.gc_phone}
                  </a>
                  <a
                    href={`mailto:${c.gc_email}?subject=Gift Card Enquiry`}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-pupa-brown/25 text-pupa-brown font-sans text-xs tracking-[0.18em] uppercase hover:bg-pupa-brown hover:text-pupa-cream transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-pupa-dark py-12 sm:py-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <p className="font-sans text-pupa-gold text-xs tracking-[0.3em] uppercase mb-2">
                {c.gc_store_label}
              </p>
              <h3 className="font-serif text-2xl text-pupa-cream font-semibold mb-2">
                {c.gc_store_title}
              </h3>
              <p className="font-sans text-pupa-warm/70 text-sm leading-relaxed flex items-start gap-2">
                <MapPin size={14} className="text-pupa-gold shrink-0 mt-0.5" />
                {c.gc_store_text}
              </p>
            </div>
            <Link
              href="/#reservation"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs tracking-[0.18em] uppercase hover:bg-pupa-cream transition-colors shrink-0"
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
