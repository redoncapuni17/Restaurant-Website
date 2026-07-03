"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import PrivateHireForm from "@/components/private-hire/PrivateHireForm";
import { EASE_OUT } from "@/components/motion/constants";
import {
  PRIVATE_HIRE_CONTENT,
  PRIVATE_HIRE_HIGHLIGHTS,
  PRIVATE_HIRE_IMAGES,
} from "@/lib/privateHire";
import { SITE_IMAGES } from "@/lib/siteConfig";

export default function PrivateHireView() {
  return (
    <>
      <PageHero
        eyebrow={PRIVATE_HIRE_CONTENT.heroEyebrow}
        title={PRIVATE_HIRE_CONTENT.heroTitle}
        subtitle={PRIVATE_HIRE_CONTENT.heroSubtitle}
        cta={{ label: "Enquire Now", href: "#enquire" }}
        backgroundImage={SITE_IMAGES.privateHire}
        imageOpacity={0.35}
      />

      {/* Capacity */}
      <section className="py-10 sm:py-12 bg-pupa-beige border-b border-pupa-brown/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="flex justify-center">
            <div className="inline-flex items-center gap-5 px-8 py-5 bg-white rounded-xl ring-1 ring-pupa-brown/8 shadow-[0_12px_40px_-20px_rgba(15,44,34,0.2)]">
              <div className="w-14 h-14 rounded-full bg-pupa-gold/15 flex items-center justify-center shrink-0">
                <Users className="text-pupa-gold" size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-pupa-brown font-semibold leading-none">
                  {PRIVATE_HIRE_CONTENT.capacity}
                </p>
                <p className="font-sans text-pupa-brown/50 text-xs sm:text-sm tracking-wider uppercase mt-2">
                  Private dining · NQ, Manchester
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Dining room + gallery */}
      <section className="py-14 sm:py-20 bg-pupa-beige">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-12 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl text-pupa-brown font-semibold mb-4">
              {PRIVATE_HIRE_CONTENT.roomTitle}
            </h2>
            <div className="w-12 h-px bg-pupa-gold mx-auto mb-5" />
            <p className="font-sans text-pupa-brown/65 text-sm sm:text-base leading-relaxed">
              {PRIVATE_HIRE_CONTENT.roomDescription}
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="col-span-2 row-span-2 relative aspect-square md:aspect-auto md:min-h-[22rem] rounded-xl overflow-hidden ring-1 ring-pupa-brown/10"
            >
              <Image
                src={PRIVATE_HIRE_IMAGES[0].src}
                alt={PRIVATE_HIRE_IMAGES[0].alt}
                fill
                loading="lazy"
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {PRIVATE_HIRE_IMAGES.slice(1, 5).map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_OUT }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden ring-1 ring-pupa-brown/10"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  loading="lazy"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-14 sm:py-16 bg-pupa-dark">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-10">
            <p className="font-sans text-pupa-gold text-xs tracking-[0.35em] uppercase mb-3">
              What we offer
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-pupa-cream font-semibold">
              The Pupa experience
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {PRIVATE_HIRE_HIGHLIGHTS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="h-full border-t border-pupa-gold/30 pt-5">
                  <h3 className="font-serif text-lg text-pupa-cream font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-pupa-warm/65 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry form — bottom */}
      <section id="enquire" className="py-14 sm:py-20 md:py-24 bg-pupa-beige scroll-mt-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="font-sans text-pupa-gold text-xs tracking-[0.35em] uppercase mb-3">
                  {PRIVATE_HIRE_CONTENT.formEyebrow}
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl text-pupa-brown font-semibold leading-tight mb-4">
                  {PRIVATE_HIRE_CONTENT.formTitle}
                </h2>
                <div className="w-12 h-px bg-pupa-gold mb-5" />
                <p className="font-sans text-pupa-brown/70 text-sm sm:text-base leading-relaxed mb-6">
                  {PRIVATE_HIRE_CONTENT.formDescription}
                </p>
                <div className="space-y-3 font-sans text-sm text-pupa-brown/60">
                  <p>
                    <span className="text-pupa-brown/40 text-xs tracking-wider uppercase block mb-1">
                      Phone
                    </span>
                    <a
                      href={`tel:${PRIVATE_HIRE_CONTENT.phone.replace(/\s/g, "")}`}
                      className="text-pupa-brown hover:text-pupa-gold transition-colors"
                    >
                      {PRIVATE_HIRE_CONTENT.phone}
                    </a>
                  </p>
                  <p>
                    <span className="text-pupa-brown/40 text-xs tracking-wider uppercase block mb-1">
                      Email
                    </span>
                    <a
                      href={`mailto:${PRIVATE_HIRE_CONTENT.email}`}
                      className="text-pupa-brown hover:text-pupa-gold transition-colors"
                    >
                      {PRIVATE_HIRE_CONTENT.email}
                    </a>
                  </p>
                  <p>
                    <span className="text-pupa-brown/40 text-xs tracking-wider uppercase block mb-1">
                      Address
                    </span>
                    37 Turner Street, Manchester M4 1DW
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-3">
              <FadeIn delay={0.08}>
                <PrivateHireForm />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
