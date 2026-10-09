import GalleryPageView from "@/components/gallery/GalleryPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | PUPA Restaurant & Bar",
  description:
    "Photos of the charcoal grill, wine, and dining room at PUPA Restaurant & Bar in Manchester.",
};

export default function GalleryPage() {
  return <GalleryPageView />;
}
