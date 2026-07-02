import type { Event } from "@/types";

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

export const GALLERY_IMAGES = [
  { url: "/images/gallery/01.jpg", alt: "Charcoal-grilled steak at Pupa" },
  { url: "/images/gallery/02.png", alt: "Mediterranean dining at Pupa" },
  { url: "/images/gallery/03.jpg", alt: "Pupa signature steak" },
  { url: "/images/gallery/04.jpg", alt: "Freshly grilled dishes" },
  { url: "/images/gallery/05.jpg", alt: "Pupa Restaurant atmosphere" },
  { url: "/images/gallery/06.jpg", alt: "Mediterranean flavours" },
  { url: "/images/gallery/07.jpg", alt: "Wine and dining at Pupa" },
  { url: "/images/gallery/08.png", alt: "Pupa Restaurant & Bar" },
  { url: "/images/gallery/09.jpg", alt: "Mediterranean tapas" },
  { url: "/images/gallery/10.jpg", alt: "Dining at Pupa Manchester" },
  { url: "/images/gallery/11.jpg", alt: "Restaurant interior" },
  { url: "/images/gallery/12.png", alt: "Evening at Pupa" },
  { url: "/images/gallery/13.jpg", alt: "Grilled meats" },
  { url: "/images/gallery/14.jpg", alt: "Pupa kitchen" },
  { url: "/images/gallery/15.png", alt: "Celebration at Pupa" },
  { url: "/images/gallery/16.png", alt: "Private dining" },
  { url: "/images/gallery/17.png", alt: "Manchester Northern Quarter" },
  { url: "/images/gallery/18.png", alt: "Mediterranean grill" },
  { url: "/images/gallery/19.jpg", alt: "Charcoal grill at Pupa" },
  { url: "/images/gallery/20.jpg", alt: "Seasonal dishes" },
  { url: "/images/gallery/21.jpg", alt: "Pupa Restaurant food" },
  { url: "/images/gallery/22.jpg", alt: "Lunch at Pupa" },
  { url: "/images/gallery/23.jpg", alt: "Meat selection" },
  { url: "/images/gallery/24.jpg", alt: "Party at Pupa" },
  { url: "/images/gallery/25.jpg", alt: "Private hire" },
  { url: "/images/gallery/26.jpg", alt: "Pupa outside restaurant" },
  { url: "/images/gallery/27.jpg", alt: "Steak carousel" },
  { url: "/images/gallery/28.jpg", alt: "Mediterranean tapas spread" },
  { url: "/images/gallery/29.jpg", alt: "Tapas selection" },
  { url: "/images/gallery/30.jpg", alt: "Pupa hero dining room" },
  { url: "/images/gallery/31.jpg", alt: "Restaurant ambience" },
  { url: "/images/gallery/32.jpg", alt: "Dining experience" },
  { url: "/images/gallery/33.jpg", alt: "Pupa evening service" },
  { url: "/images/gallery/34.jpg", alt: "Mediterranean evening" },
  { url: "/images/gallery/35.jpg", alt: "Pupa team and guests" },
  { url: "/images/gallery/36.jpg", alt: "Northern Quarter restaurant" },
  { url: "/images/gallery/37.jpg", alt: "Pupa signature dishes" },
  { url: "/images/gallery/38.jpg", alt: "Weekend dining" },
  { url: "/images/gallery/39.jpg", alt: "Dessert and coffee" },
];

/** How many gallery photos to show before "Load more". */
export const GALLERY_PREVIEW_COUNT = 5;

export const OPENING_HOURS = [
  { day: "Monday", open_time: "17:00", close_time: "22:00", is_closed: false },
  { day: "Tuesday", open_time: null, close_time: null, is_closed: true },
  { day: "Wednesday", open_time: "17:00", close_time: "22:00", is_closed: false },
  { day: "Thursday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Friday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Saturday", open_time: "12:00", close_time: "22:00", is_closed: false },
  { day: "Sunday", open_time: "13:30", close_time: "22:00", is_closed: false },
];

/** Add upcoming events here. Past dates are filtered out automatically on /events. */
export const EVENTS: Event[] = [
  // Example:
  // {
  //   id: "valentines-dinner",
  //   title: "Valentine's Dinner",
  //   description: "A special evening menu with live music.",
  //   date: "2026-02-14",
  //   time_start: "18:00",
  //   time_end: "22:00",
  //   image_url: "/images/events/valentines.jpg",
  //   created_at: "",
  // },
];

export function getUpcomingEvents(): Event[] {
  const today = new Date().toISOString().split("T")[0];
  return EVENTS.filter((event) => event.date >= today).sort((a, b) =>
    a.date.localeCompare(b.date)
  );
}
