-- ============================================
-- EKZEKUTO KËTË NË SUPABASE SQL EDITOR
-- Krijon tabelën site_images + rregullon RLS
-- Rregullon: "new row violates row-level security policy"
--            "relation site_images does not exist"
-- ============================================

-- Sigurohu që bucket "gallery" ekziston (Storage → New bucket → emri: gallery → Public)

-- 0. Krijo tabelën site_images nëse nuk ekziston
CREATE TABLE IF NOT EXISTS site_images (
  key TEXT PRIMARY KEY,
  url TEXT NOT NULL,
  alt TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- 1. Storage policies për bucket "gallery"
DROP POLICY IF EXISTS "Public read gallery storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload gallery storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin update gallery storage" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete gallery storage" ON storage.objects;

CREATE POLICY "Public read gallery storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admin upload gallery storage"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admin update gallery storage"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery')
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Admin delete gallery storage"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery');

-- 2. Politikat e tabelave (lexim publik + akses i plotë për admin)
DROP POLICY IF EXISTS "Public read site images" ON site_images;
DROP POLICY IF EXISTS "Admin full access site images" ON site_images;
DROP POLICY IF EXISTS "Admin full access gallery" ON gallery_images;

CREATE POLICY "Public read site images" ON site_images
FOR SELECT USING (true);

CREATE POLICY "Admin full access site images" ON site_images
FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin full access gallery" ON gallery_images
FOR ALL TO authenticated USING (true) WITH CHECK (true);
