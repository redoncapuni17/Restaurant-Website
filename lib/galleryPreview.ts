export interface GalleryImage {
  url: string;
  alt: string;
}

/** First 5 photos — only these load on the homepage until the user clicks Load more. */
export const GALLERY_PREVIEW: GalleryImage[] = [
  { url: "/images/gallery/01.jpg", alt: "Charcoal-grilled steak at Pupa" },
  { url: "/images/gallery/02.png", alt: "Mediterranean dining at Pupa" },
  { url: "/images/gallery/03.jpg", alt: "Pupa signature steak" },
  { url: "/images/gallery/04.jpg", alt: "Freshly grilled dishes" },
  { url: "/images/gallery/05.jpg", alt: "Pupa Restaurant atmosphere" },
];
