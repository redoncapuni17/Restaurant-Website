export interface GalleryImage {
  url: string;
  alt: string;
}

/** First 6 photos — only these load until the user clicks Load more. */
export const GALLERY_PREVIEW: GalleryImage[] = [
  { url: "/images/gallery/001.jpg", alt: "Charcoal-grilled steak at Pupa" },
  { url: "/images/gallery/002.jpg", alt: "Pupa Restaurant exterior in the evening" },
  { url: "/images/gallery/003.jpg", alt: "Mediterranean mixed grill at Pupa" },
  { url: "/images/gallery/004.jpg", alt: "Pupa Mediterranean Charcoal Grill storefront" },
  { url: "/images/gallery/005.jpg", alt: "Wine poured at a Pupa tasting" },
  { url: "/images/gallery/006.jpg", alt: "Wine and dining at Pupa" },
];

export const GALLERY_EXTRA_COUNT = 44;
export const GALLERY_LOAD_BATCH = 6;
export const GALLERY_TOTAL =
  GALLERY_PREVIEW.length + GALLERY_EXTRA_COUNT;
