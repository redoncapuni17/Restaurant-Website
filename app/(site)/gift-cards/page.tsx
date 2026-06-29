import { supabase } from "@/lib/supabase";
import {
  GIFT_CARDS_DEFAULTS,
  GIFT_CARDS_IMAGE_DEFAULTS,
} from "@/lib/giftCards";

export const revalidate = 60;

async function getContent(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("site_content").select("key, value");
  const map: Record<string, string> = { ...GIFT_CARDS_DEFAULTS };
  if (error) {
    console.error("Failed to load gift card content:", error.message);
    return map;
  }
  data?.forEach((row) => {
    if (row.value?.trim()) map[row.key] = row.value;
  });
  return map;
}

async function getImages(): Promise<Record<string, string>> {
  const { data } = await supabase
    .from("site_images")
    .select("key, url")
    .in("key", ["giftcards_hero", "giftcards_card"]);
  const map: Record<string, string> = { ...GIFT_CARDS_IMAGE_DEFAULTS };
  data?.forEach((row) => {
    if (row.url) map[row.key] = row.url;
  });
  return map;
}

export default async function GiftCardsPage() {
  const [c, img] = await Promise.all([getContent(), getImages()]);
  const phoneHref = `tel:${c.gc_phone.replace(/\s+/g, "")}`;

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-pupa-brown" />
        {img.giftcards_hero && (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('${img.giftcards_hero}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
        <div className="relative h-full flex flex-col items-center justify-center text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-3">{c.gc_hero_eyebrow}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-pupa-cream font-medium">{c.gc_title}</h1>
          <div className="w-12 h-px bg-pupa-gold mt-4" />
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-pupa-beige">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="font-sans text-pupa-gold text-xs tracking-[0.4em] uppercase mb-4">{c.gc_eyebrow}</p>
          <h2 className="font-serif text-3xl text-pupa-brown font-medium mb-6">{c.gc_heading}</h2>
          <div className="w-12 h-px bg-pupa-gold mx-auto mb-8" />
          <p className="font-sans text-pupa-brown/70 leading-relaxed mb-10 whitespace-pre-line">{c.gc_body}</p>

          {/* Gift Card Visual */}
          {img.giftcards_card && (
            <div className="max-w-sm mx-auto mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.giftcards_card} alt="Pupa Gift Card" className="w-full" />
            </div>
          )}

          {/* In-store notice */}
          <div className="bg-pupa-brown text-pupa-cream py-8 px-10 mb-8">
            <p className="font-sans text-pupa-gold text-xs tracking-widest uppercase mb-3">{c.gc_store_label}</p>
            <p className="font-serif text-2xl mb-2">{c.gc_store_title}</p>
            <p className="font-sans text-pupa-warm text-sm whitespace-pre-line">{c.gc_store_text}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={phoneHref}
              className="px-8 py-3.5 bg-pupa-brown text-pupa-cream font-sans text-sm tracking-widest uppercase hover:bg-pupa-dark transition-all duration-300"
            >
              Call to Order: {c.gc_phone}
            </a>
            <a
              href={`mailto:${c.gc_email}?subject=Gift Card Enquiry`}
              className="px-8 py-3.5 border border-pupa-brown text-pupa-brown font-sans text-sm tracking-widest uppercase hover:bg-pupa-brown hover:text-pupa-cream transition-all duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
