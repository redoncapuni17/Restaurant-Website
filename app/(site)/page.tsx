import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import About from "@/components/About";
import BookingWidget from "@/components/BookingWidget";

const Gallery = dynamic(() => import("@/components/Gallery"), {
  loading: () => (
    <section className="py-28 bg-pupa-brown">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-8 w-32 bg-pupa-dark/40 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-12 w-48 bg-pupa-dark/40 rounded mx-auto mb-16 animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-pupa-dark/30 animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  ),
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <BookingWidget />
    </>
  );
}
