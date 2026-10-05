import EventsView from "@/components/events/EventsView";
import { getUpcomingEvents } from "@/lib/events";
import { SITE_IMAGES } from "@/lib/siteConfig";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | PUPA Restaurant & Bar",
  description:
    "Upcoming wine evenings, tasting menus, live music and special events at PUPA Restaurant & Bar, Manchester.",
};

export default function EventsPage() {
  return (
    <EventsView events={getUpcomingEvents()} heroUrl={SITE_IMAGES.events} />
  );
}
