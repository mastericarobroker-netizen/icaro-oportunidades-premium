// Optional Supabase auth middleware for protected server functions.
//
// If Supabase env vars are not set, this middleware is a no-op pass-through.
// When Supabase is configured, it verifies the bearer token via Supabase.

import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const SUPABASE_URL =
  typeof process !== "undefined" ? process.env?.SUPABASE_URL : undefined;
const SUPABASE_KEY =
  typeof process !== "undefined"
    ? process.env?.SUPABASE_PUBLISHABLE_KEY
    : undefined;
const SUPABASE_ENABLED = Boolean(SUPABASE_URL && SUPABASE_KEY);

export const requireSupabaseAuth = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    if (!SUPABASE_ENABLED) {
      // No auth backend configured — allow the request through.
      return next();
    }

    const request = getRequest();
    const authHeader = request?.headers?.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized: No bearer token provided");
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      throw new Error("Unauthorized: Empty token");
    }

    try {
      const mod = await import("@supabase/supabase-js");
      const { createClient } = mod;
      const { default: types } = await import("./types");
      const supabase = createClient(types as any, SUPABASE_URL!, SUPABASE_KEY!, {
        global: { headers: { Authorization: `Bearer ${token}` } },
        auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      });

      const { data, error } = await (supabase.auth as any).getClaims(token);
      if (error || !data?.claims) {
        throw new Error("Unauthorized: Invalid token");
      }
      if (!data.claims.sub) {
        throw new Error("Unauthorized: No user ID found in token");
      }

      return next({
        context: {
          supabase,
          userId: data.claims.sub,
          claims: data.claims,
        },
      });
    } catch (err) {
      throw new Error(
        `Unauthorized: Failed to verify token (${(err as Error).message})`,
      );
    }
  },
);
