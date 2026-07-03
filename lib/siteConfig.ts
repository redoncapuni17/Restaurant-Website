/** Local images live in public/images/ — replace files there to update the site. */
export const SITE_IMAGES = {
  hero: "/images/heroes/home.jpg",
  about1: "/images/about/about-1.jpg",
  about2: "/images/about/about-2.jpg",
  about3: "/images/about/about-3.jpg",
  menus: "/images/heroes/menus.jpg",
  mainMenu: "/images/heroes/main-menu.jpg",
  dessert: "/images/heroes/dessert.jpg",
  drink: "/images/heroes/drink.jpg",
  lunch: "/images/heroes/lunch.jpg",
  wine: "/images/heroes/wine.jpg",
  privateHire: "/images/heroes/private-hire.jpg",
  events: "/images/heroes/events.jpg",
  giftCardsHero: "/images/gift-cards/hero.jpg",
  giftCardsCard: "/images/gift-cards/card.png",
} as const;

export const ABOUT_IMAGES = [
  { key: "about_1", url: SITE_IMAGES.about1, alt: "Pupa Restaurant interior" },
  { key: "about_2", url: SITE_IMAGES.about2, alt: "Charcoal grill at Pupa" },
  { key: "about_3", url: SITE_IMAGES.about3, alt: "Mediterranean dining at Pupa" },
];

export const OPENING_HOURS = [
  { day: "Monday", open_time: "17:00", close_time: "22:00", is_closed: false },
  { day: "Tuesday", open_time: null, close_time: null, is_closed: true },
  { day: "Wednesday", open_time: "17:00", close_time: "22:00", is_closed: false },
  { day: "Thursday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Friday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Saturday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Sunday", open_time: "13:30", close_time: "22:00", is_closed: false },
];
