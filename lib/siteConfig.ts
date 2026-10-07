import type { OpeningHours } from "@/types";

/** Local images live in public/images/ — replace files there to update the site. */
export const SITE_IMAGES = {
  hero: "/images/heroes/home.jpg",
  about1: "/images/about/about-1.jpg",
  about2: "/images/about/about-2.jpg",
  about3: "/images/about/about-3.jpg",
  about4: "/images/about/about-4.jpg",
  menus: "/images/heroes/menus.jpg",
  mainMenu: "/images/heroes/main-menu.jpg",
  dessert: "/images/heroes/dessert.jpg",
  drink: "/images/heroes/drink.jpg",
  lunch: "/images/heroes/lunch.jpg",
  wine: "/images/menus/wine-glass.jpg",
  privateHire: "/images/heroes/private-hire.jpg",
  events: "/images/heroes/events.jpg",
  giftCardsHero: "/images/gift-cards/hero.jpg",
  giftCardsCard: "/images/gift-cards/card.png",
} as const;

export const ABOUT_IMAGES = [
  { key: "about_1", url: SITE_IMAGES.about1, alt: "Pupa Restaurant interior" },
  { key: "about_2", url: SITE_IMAGES.about2, alt: "Charcoal grill at Pupa" },
  { key: "about_3", url: SITE_IMAGES.about3, alt: "Mediterranean dining at Pupa" },
  { key: "about_4", url: SITE_IMAGES.about4, alt: "Charcoal-grilled steak at Pupa" },
];

export const SITE_CONTACT = {
  name: "Pupa Restaurant & Bar",
  phone: "0161 400 4830",
  phoneHref: "tel:01614004830",
  email: "info@puparestaurant.com",
  emailHref: "mailto:info@puparestaurant.com",
  addressLine1: "37 Turner Street,",
  addressLine2: "Manchester, NQ, M4 1DW",
  addressOneLine: "37 Turner Street, Manchester M4 1DW",
  website: "https://www.puparestaurant.com",
  websiteLabel: "www.puparestaurant.com",
} as const;

export const SITE_SOCIAL = [
  {
    href: "https://www.instagram.com/pupa.restaurant.bar",
    label: "Instagram",
  },
  {
    href: "https://twitter.com/PupaRestaurant",
    label: "Twitter",
  },
  {
    href: "https://www.facebook.com/pupa.restaurant",
    label: "Facebook",
  },
] as const;

export const OPENING_HOURS: OpeningHours[] = [
  { day: "Monday", open_time: "17:00", close_time: "22:00", is_closed: false },
  { day: "Tuesday", open_time: null, close_time: null, is_closed: true },
  { day: "Wednesday", open_time: "17:00", close_time: "22:00", is_closed: false },
  { day: "Thursday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Friday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Saturday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Sunday", open_time: "13:30", close_time: "22:00", is_closed: false },
];
