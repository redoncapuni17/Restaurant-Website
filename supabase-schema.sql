-- ============================================
-- PUPA RESTAURANT - Supabase Database Schema
-- Ekzekuto këtë SQL në Supabase SQL Editor
-- ============================================

-- 1. Gallery Images
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Menu Items
CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  category TEXT CHECK (category IN ('starter', 'main', 'dessert', 'drink', 'wine')) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Events
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  date DATE NOT NULL,
  time_start TEXT NOT NULL,
  time_end TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Opening Hours
CREATE TABLE opening_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT NOT NULL,
  open_time TEXT,
  close_time TEXT,
  is_closed BOOLEAN DEFAULT FALSE
);

-- Insert default opening hours
INSERT INTO opening_hours (day, open_time, close_time, is_closed) VALUES
  ('Monday', '17:00', '22:00', FALSE),
  ('Tuesday', NULL, NULL, TRUE),
  ('Wednesday', '17:00', '22:00', FALSE),
  ('Thursday', '12:00', '22:00', FALSE),
  ('Friday', '12:00', '22:00', FALSE),
  ('Saturday', '12:00', '22:00', FALSE),
  ('Sunday', '13:30', '22:00', FALSE);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;

-- PUBLIC: mund të lexojë të gjitha (website publik)
CREATE POLICY "Public read gallery" ON gallery_images FOR SELECT USING (TRUE);
CREATE POLICY "Public read menu" ON menu_items FOR SELECT USING (TRUE);
CREATE POLICY "Public read events" ON events FOR SELECT USING (TRUE);
CREATE POLICY "Public read hours" ON opening_hours FOR SELECT USING (TRUE);

-- AUTHENTICATED (Admin): mund të bëjë gjithçka
CREATE POLICY "Admin full access gallery" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access menu" ON menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access events" ON events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access hours" ON opening_hours FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Storage Bucket për Gallery
-- ============================================
-- Shko te Storage në Supabase dhe krijo bucket me emrin "gallery"
-- Vendos bucket si PUBLIC për të shfaqur fotot
