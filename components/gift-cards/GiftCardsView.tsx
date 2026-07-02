"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import { EASE_OUT } from "@/components/motion/constants";

interface GiftCardsViewProps {
  content: Record<string, string>;
  images: Record<string, string>;
}

export default function GiftCardsView({ content: c, images: img }: GiftCardsViewProps) {
  const phoneHref = `tel:${c.gc_phone.replace(/\s+/g, "")}`;

  return (
    <>
      <PageHero
        eyebrow={c.gc_hero_eyebrow}
        title={c.gc_title}
        backgroundImage={img.giftcards_hero}
        imageOpacity={0.15}
      />

      <section className="py-14 sm:py-20 bg-pupa-beige">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 text-center">
          <FadeIn>
            <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3 sm:mb-4">{c.gc_eyebrow}</p>
            <h2 className="font-serif text-2xl sm:text-3xl text-pupa-brown font-medium mb-5 sm:mb-6 text-balance">
              {c.gc_heading}
            </h2>
            <div className="w-12 h-px bg-pupa-gold mx-auto mb-6 sm:mb-8" />
            <p className="font-sans text-pupa-brown/70 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 whitespace-pre-line">
              {c.gc_body}
            </p>
          </FadeIn>

          {img.giftcards_card && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: EASE_OUT }}
              className="max-w-xs sm:max-w-sm mx-auto mb-10 sm:mb-12"
            >
              <Image
                src={img.giftcards_card}
                alt="Pupa Gift Card"
                width={500}
                height={200}
                loading="lazy"
                className="w-full h-auto drop-shadow-xl"
              />
            </motion.div>
          )}

          <FadeIn delay={0.1}>
            <div className="bg-pupa-brown text-pupa-cream py-7 sm:py-8 px-6 sm:px-10 mb-6 sm:mb-8 rounded-sm">
              <p className="font-sans text-pupa-gold text-xs tracking-widest uppercase mb-2 sm:mb-3">
                {c.gc_store_label}
              </p>
              <p className="font-serif text-xl sm:text-2xl mb-2">{c.gc_store_title}</p>
              <p className="font-sans text-pupa-warm text-sm whitespace-pre-line leading-relaxed">
                {c.gc_store_text}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href={phoneHref}
                className="px-6 sm:px-8 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-xs sm:text-sm tracking-widest uppercase hover:bg-pupa-dark transition-colors duration-300"
              >
                Call: {c.gc_phone}
              </a>
              <a
                href={`mailto:${c.gc_email}?subject=Gift Card Enquiry`}
                className="px-6 sm:px-8 py-3.5 border border-pupa-brown text-pupa-brown font-sans text-xs sm:text-sm tracking-widest uppercase hover:bg-pupa-brown hover:text-pupa-cream transition-colors duration-300"
              >
                Email Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
