import type { Event } from "@/types";

/** Static events — edit dates and copy here. Shown on /events, newest first. */
export const EVENTS: Event[] = [
  {
    id: "autumn-tasting-menu",
    title: "Autumn Tasting Menu",
    tag: "Chef's Table",
    description:
      "A five-course journey through autumn flavours — fire, smoke, and Mediterranean herbs. Optional wine flight available.",
    date: "2026-09-19",
    time_start: "18:00",
    time_end: "22:00",
    image_url: "/images/events/ae7cf261-5c08-4985-b9dc-9ad012c8bf05-1-102-o.jpeg",
    featured: true,
  },
  {
    id: "mediterranean-wine-evening",
    title: "Mediterranean Wine Evening",
    tag: "Wine & Dine",
    description:
      "An evening of curated Mediterranean wines paired with charcoal-grilled small plates. Our team guides you through each pour with tasting notes and food matches.",
    date: "2026-08-29",
    time_start: "18:30",
    time_end: "22:00",
    image_url: "/images/events/img-8138.jpg",
  },
  {
    id: "live-jazz-supper",
    title: "Live Jazz & Supper",
    tag: "Live Music",
    description:
      "Smooth live jazz in the dining room while you enjoy our signature grill menu and seasonal cocktails. Perfect for a Saturday night out in the NQ.",
    date: "2026-08-08",
    time_start: "19:00",
    time_end: "23:00",
    image_url: "/images/events/pupa-20-jan---016.jpg",
  },
  {
    id: "sunday-roast-club",
    title: "Sunday Roast Supper Club",
    tag: "Supper Club",
    description:
      "A relaxed Sunday feast — slow-roasted meats, Mediterranean sides, and all the trimmings. Book early; tables fill quickly.",
    date: "2026-07-26",
    time_start: "13:30",
    time_end: "17:00",
    image_url: "/images/events/pupa-20-jan---013.jpg",
  },
  {
    id: "cocktail-masterclass",
    title: "Cocktail Masterclass",
    tag: "Masterclass",
    description:
      "Learn to shake, stir, and garnish like our bar team. Includes three cocktails, bar snacks, and a take-home recipe card.",
    date: "2026-07-11",
    time_start: "17:00",
    time_end: "19:30",
    image_url: "/images/events/whatsapp-image-2023-09-29-at-13.08.51.jpeg",
  },
];

export function getEvents(): Event[] {
  return [...EVENTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedEvent(events: Event[]): Event | undefined {
  return events.find((e) => e.featured) ?? events[0];
}
