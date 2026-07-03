export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time_start: string;
  time_end: string;
  image_url?: string;
  tag?: string;
  featured?: boolean;
  created_at?: string;
}

export interface OpeningHours {
  day: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
}
