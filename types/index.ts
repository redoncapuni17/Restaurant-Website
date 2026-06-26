export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "starter" | "main" | "dessert" | "drink" | "wine";
  available: boolean;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  order: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time_start: string;
  time_end: string;
  image_url?: string;
  created_at: string;
}

export interface OpeningHours {
  id: string;
  day: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
}
