// Client-side (and SSR-safe) Supabase client.
// Lazy-loads `@supabase/supabase-js` inside the factory. If the package
// is missing or env vars are absent, returns a safe fallback client.

import type { Database } from "./types";

const SUPABASE_NOT_INSTALLED =
  "Supabase client package not installed. Run `npm i @supabase/supabase-js` if you need it.";
const SUPABASE_MISSING_ENV = (missing: string[]) =>
  `Missing Supabase environment variable(s): ${missing.join(", ")}. Set them in Vercel project settings.`;

function buildFallback(message: string): any {
  const queryFallback: any = {
    select() {
      return this;
    },
    eq() {
      return this;
    },
    order() {
      return this;
    },
    limit() {
      return this;
    },
    single() {
      return this;
    },
    then(resolve: (v: any) => any) {
      return resolve({ data: null, error: new Error(message) });
    },
    catch() {
      return this;
    },
  };
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({
        data: null,
        error: new Error(message),
      }),
      signUp: async () => ({ data: null, error: new Error(message) }),
      getUser: async () => ({ data: { user: null }, error: null }),
    },
    from: () => queryFallback,
  };
}

async function createSupabaseClient(): Promise<any> {
  const SUPABASE_URL =
    (typeof import.meta !== "undefined" &&
      (import.meta as any).env?.VITE_SUPABASE_URL) ||
    (typeof process !== "undefined" && process.env?.SUPABASE_URL);
  const SUPABASE_PUBLISHABLE_KEY =
    (typeof import.meta !== "undefined" &&
      (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY) ||
    (typeof process !== "undefined" && process.env?.SUPABASE_PUBLISHABLE_KEY);

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["VITE_SUPABASE_URL / SUPABASE_URL"] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY
        ? ["VITE_SUPABASE_PUBLISHABLE_KEY / SUPABASE_PUBLISHABLE_KEY"]
        : []),
    ];
    const msg = SUPABASE_MISSING_ENV(missing);
    console.error(`[Supabase] ${msg}`);
    return buildFallback(msg);
  }

  let createClientFn: any;
  try {
    const mod = await import("@supabase/supabase-js");
    createClientFn = mod?.createClient;
  } catch {
    console.error(`[Supabase] ${SUPABASE_NOT_INSTALLED}`);
    return buildFallback(SUPABASE_NOT_INSTALLED);
  }

  if (typeof createClientFn !== "function") {
    console.error(`[Supabase] ${SUPABASE_NOT_INSTALLED}`);
    return buildFallback(SUPABASE_NOT_INSTALLED);
  }

  return createClientFn<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

// Lazy singleton: created on first property access (proxy).
let _clientPromise: Promise<any> | undefined;
const _proxy: any = new Proxy(
  {},
  {
    get(_t, prop) {
      if (!_clientPromise) _clientPromise = createSupabaseClient();
      return async (...args: any[]) => {
        const client = await _clientPromise!;
        const v = (client as any)[prop];
        return typeof v === "function" ? v.apply(client, args) : v;
      };
    },
  },
);

export const supabase = _proxy;
