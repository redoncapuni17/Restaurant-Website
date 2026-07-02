"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/motion/PageHero";
import FadeIn from "@/components/motion/FadeIn";
import { EASE_OUT } from "@/components/motion/constants";

import { SITE_IMAGES } from "@/lib/siteConfig";

const features = [
  { icon: "🍽", title: "Exclusive Dining", desc: "The entire restaurant is yours for a truly private experience." },
  { icon: "🥩", title: "Bespoke Menu", desc: "Work with our chefs to create a custom Mediterranean menu." },
  { icon: "🍷", title: "Curated Drinks", desc: "From Mediterranean wines to signature cocktails." },
  { icon: "✨", title: "Event Planning", desc: "Our team will help coordinate every detail of your event." },
];

export default function PrivateHireView() {
  return (
    <>
      <PageHero
        eyebrow="Celebrate in Style"
        title="Private Hire"
        subtitle="Host your special occasion at Pupa. Whether it's a birthday, anniversary, corporate dinner, or celebration — we create unforgettable Mediterranean experiences."
        cta={{
          label: "Enquire Now",
          href: "mailto:info@puparestaurant.com?subject=Private Hire Enquiry",
          external: true,
        }}
        backgroundImage={SITE_IMAGES.privateHire}
        tall
      />

      <section className="py-14 sm:py-20 bg-pupa-beige">
        <div className="max-w-5xl mx-auto px-5 sm:px-6">
          <FadeIn className="text-center mb-10 sm:mb-14">
            <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3 sm:mb-4">What We Offer</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-pupa-brown font-medium">The Pupa Experience</h2>
            <div className="w-12 h-px bg-pupa-gold mx-auto mt-4" />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE_OUT }}
                className="flex gap-4 sm:gap-5 p-5 sm:p-6 bg-white border border-pupa-warm rounded-sm hover:border-pupa-gold/50 hover:shadow-md transition-all duration-300"
              >
                <span className="text-2xl sm:text-3xl shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-serif text-pupa-brown text-lg sm:text-xl mb-1.5 sm:mb-2">{f.title}</h3>
                  <p className="font-sans text-pupa-brown/60 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <FadeIn>
            <div className="bg-pupa-brown text-center p-8 sm:p-10 md:p-14 rounded-sm">
              <h3 className="font-serif text-pupa-cream text-2xl sm:text-3xl mb-3">Ready to Plan Your Event?</h3>
              <p className="font-sans text-pupa-warm text-sm mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
                Get in touch with us to discuss your requirements. We&apos;ll create a bespoke package just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="mailto:info@puparestaurant.com?subject=Private Hire Enquiry"
                  className="px-6 sm:px-8 py-3.5 bg-pupa-gold text-pupa-dark font-sans text-xs sm:text-sm tracking-widest uppercase hover:bg-pupa-cream transition-colors duration-300"
                >
                  Email Us
                </a>
                <a
                  href="tel:01614004830"
                  className="px-6 sm:px-8 py-3.5 border border-pupa-cream text-pupa-cream font-sans text-xs sm:text-sm tracking-widest uppercase hover:bg-pupa-cream hover:text-pupa-dark transition-colors duration-300"
                >
                  0161 400 4830
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
