import { SITE_CONTACT, SITE_IMAGES } from "@/lib/siteConfig";

export const GIFT_CARD_CONTENT = {
  gc_hero_eyebrow: "Give the Gift of",
  gc_title: "Gift Cards",
  gc_eyebrow: "Mediterranean Dining",
  gc_heading: "The perfect present",
  gc_body:
    "A night at Pupa — charcoal grill, a warm room, and the Northern Quarter.",
  gc_store_label: "Available In Store",
  gc_store_title: "Purchase at the restaurant",
  gc_store_text:
    `Visit us at ${SITE_CONTACT.addressLine1.replace(",", "")}, Northern Quarter to pick up a physical gift card. Choose your amount and we'll prepare it ready to gift.`,
  gc_phone: SITE_CONTACT.phone,
  gc_email: SITE_CONTACT.email,
};

export const GIFT_CARD_PERKS = [
  "Food & drink",
  "A card to hand over",
  "Valid 6 months",
  "Birthdays & thank-yous",
];

export const GIFT_CARD_IMAGES = {
  giftcards_hero: SITE_IMAGES.giftCardsHero,
};
