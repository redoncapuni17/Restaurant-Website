import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import BookingWidget from "@/components/BookingWidget";
import IntroLoader from "@/components/IntroLoader";
import { supabase } from "@/lib/supabase";

// Rifresko URL-në e imazhit kryesor çdo 60s (ndryshimet nga admini dalin shpejt)
export const revalidate = 60;

async function getHeroUrl(): Promise<string | null> {
  const { data } = await supabase
    .from("site_images")
    .select("url")
    .eq("key", "hero")
    .maybeSingle();
  return data?.url ?? null;
}

export default async function HomePage() {
  const heroUrl = await getHeroUrl();

  return (
    <>
      {heroUrl && (
        <link rel="preload" as="image" href={heroUrl} fetchPriority="high" />
      )}
      <IntroLoader />
      <Hero initialBgUrl={heroUrl} />
      <About />
      <Gallery />
      <BookingWidget />
    </>
  );
}
