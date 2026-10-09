import { GALLERY_EXTRA } from "@/lib/galleryExtra";
import { GALLERY_PREVIEW, type GalleryImage } from "@/lib/galleryPreview";

/** Every gallery photo, in filename order (001 … 050). */
export const GALLERY_ALL: GalleryImage[] = [...GALLERY_PREVIEW, ...GALLERY_EXTRA];
