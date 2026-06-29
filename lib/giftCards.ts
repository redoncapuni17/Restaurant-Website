export const GIFT_CARDS_DEFAULTS: Record<string, string> = {
  gc_hero_eyebrow: "Give the Gift of",
  gc_title: "Gift Cards",
  gc_eyebrow: "Mediterranean Dining",
  gc_heading: "The Perfect Gift for Food Lovers",
  gc_body:
    "Give someone special the experience of Pupa Restaurant — freshly grilled Mediterranean meats, warm atmosphere, and unforgettable flavours in the heart of Manchester's Northern Quarter.",
  gc_store_label: "Available In Store",
  gc_store_title: "Physical Gift Cards",
  gc_store_text:
    "Visit us at 37 Turner Street, Manchester NQ to purchase a physical gift card — the perfect present for any occasion.",
  gc_phone: "0161 400 4830",
  gc_email: "info@puparestaurant.com",
};

export const GIFT_CARDS_TEXT_FIELDS: { key: string; label: string; type: "text" | "textarea" }[] = [
  { key: "gc_hero_eyebrow", label: "Hero — Eyebrow (teksti i vogël sipër)", type: "text" },
  { key: "gc_title", label: "Hero — Titulli", type: "text" },
  { key: "gc_eyebrow", label: "Seksioni — Eyebrow", type: "text" },
  { key: "gc_heading", label: "Seksioni — Titulli", type: "text" },
  { key: "gc_body", label: "Seksioni — Përshkrimi", type: "textarea" },
  { key: "gc_store_label", label: "In Store — Eyebrow", type: "text" },
  { key: "gc_store_title", label: "In Store — Titulli", type: "text" },
  { key: "gc_store_text", label: "In Store — Teksti", type: "textarea" },
  { key: "gc_phone", label: "Numri i telefonit", type: "text" },
  { key: "gc_email", label: "Email-i", type: "text" },
];

export const GIFT_CARDS_IMAGE_DEFAULTS: Record<string, string> = {
  giftcards_hero:
    "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/74b2cf5f-39bf-474b-a9bb-e7231a1bc82f/IMG_9196.jpg",
  giftcards_card:
    "https://images.squarespace-cdn.com/content/v1/63750e9f0d23390c9402c839/532ae05f-75cd-4ca3-92df-c6d449fe43ce/Untitled+%28500+x+100+px%29-2.png",
};
