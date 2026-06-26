// Optional Supabase auth header attacher.
// If Supabase env vars are not set, this middleware is a no-op pass-through.
// This allows the app to run without a Supabase backend.

import { createMiddleware } from "@tanstack/react-start";

const SUPABASE_URL =
  (typeof process !== "undefined" && process.env?.SUPABASE_URL) ||
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_SUPABASE_URL);

const SUPABASE_KEY =
  (typeof process !== "undefined" && process.env?.SUPABASE_PUBLISHABLE_KEY) ||
  (typeof import.meta !== "undefined" &&
    (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY);

const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY);

async function tryAttachAuth(): Promise<Record<string, string>> {
  if (!SUPABASE_ENABLED) return {};
  try {
    const mod = await import("./client");
    const supabase = (mod as any).supabase;
    if (!supabase) return {};
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.warn(
      "[Supabase] Skipping auth header (not configured or failed to load):",
      error,
    );
    return {};
  }
}

export const attachSupabaseAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const headers = await tryAttachAuth();
    return next({ headers });
  },
);
