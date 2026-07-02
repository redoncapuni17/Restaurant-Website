import { createClient } from "@supabase/supabase-js";

const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_ANON_KEY = "placeholder-anon-key";
const PLACEHOLDER_SERVICE_KEY = "placeholder-service-key";

function isValidSupabaseUrl(value: string | undefined): value is string {
  if (!value?.trim()) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function resolveSupabaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return isValidSupabaseUrl(raw) ? raw.trim() : PLACEHOLDER_URL;
}

function resolveSupabaseKey(
  value: string | undefined,
  fallback: string
): string {
  const raw = value?.trim();
  if (!raw || raw.startsWith("your_")) return fallback;
  return raw;
}

const supabaseUrl = resolveSupabaseUrl();
const supabaseAnonKey = resolveSupabaseKey(
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  PLACEHOLDER_ANON_KEY
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client me service role (vetëm server-side)
export const supabaseAdmin = () => {
  const serviceKey = resolveSupabaseKey(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    PLACEHOLDER_SERVICE_KEY
  );
  return createClient(supabaseUrl, serviceKey);
};
