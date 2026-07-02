import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import BookingWidget from "@/components/BookingWidget";
import { SITE_IMAGES } from "@/lib/siteConfig";

export default function HomePage() {
  return (
    <>
      <link rel="preload" as="image" href={SITE_IMAGES.hero} />
      <Hero />
      <About />
      <Gallery />
      <BookingWidget />
    </>
  );
}
