import EventsView from "@/components/events/EventsView";
import { getUpcomingEvents, SITE_IMAGES } from "@/lib/siteConfig";

export default function EventsPage() {
  return <EventsView events={getUpcomingEvents()} heroUrl={SITE_IMAGES.events} />;
}
