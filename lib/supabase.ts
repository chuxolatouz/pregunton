import { createClient, type SupabaseClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const accountConfigured = Boolean(url && key);
let client: SupabaseClient | undefined;
export function getSupabase(): SupabaseClient {
  if (!url || !key)
    throw new Error(
      "La cuenta todavía no está disponible. Tus cartas se guardan en este dispositivo.",
    );
  client ??= createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  return client;
}
