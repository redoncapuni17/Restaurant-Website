import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import BookingWidget from "@/components/BookingWidget";
import IframeLoadOverlay from "@/components/IframeLoadOverlay";
import ReservationIframe from "@/components/ReservationIframe";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <BookingWidget>
        <IframeLoadOverlay>
          <ReservationIframe />
        </IframeLoadOverlay>
      </BookingWidget>
    </>
  );
}
