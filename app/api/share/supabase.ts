import { createClient } from "@supabase/supabase-js";

export const crestKeys = [
  "courage",
  "friendship",
  "purity",
  "love",
  "knowledge",
  "reliability",
  "hope",
  "light",
] as const;

export type CrestKey = (typeof crestKeys)[number];

export function isCrestKey(value: unknown): value is CrestKey {
  return typeof value === "string" && (crestKeys as readonly string[]).includes(value);
}

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !secretKey) {
    return null;
  }

  return createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
