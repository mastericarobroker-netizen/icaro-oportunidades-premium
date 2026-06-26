// Server-side Supabase client (service role key) - bypasses RLS.
// Use this for admin operations in server functions and server routes only.
//
// IMPORTANT: The `@supabase/supabase-js` package may not be installed.
// We lazy-load it inside the factory so the module import itself never throws.
// If it's missing or env vars are absent, we return a safe fallback client.

import type { Database } from "./types";

const SUPABASE_NOT_INSTALLED =
  "Supabase client package not installed. Run `npm i @supabase/supabase-js` if you need it.";
const SUPABASE_MISSING_ENV = (missing: string[]) =>
  `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;

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
    rpc: () => ({
      then: (resolve: any) =>
        resolve({ data: null, error: new Error(message) }),
    }),
  };
}

async function createSupabaseAdminClient(): Promise<any> {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["SUPABASE_URL"] : []),
      ...(!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []),
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

  return createClientFn<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

// Lazy singleton: only created when first accessed.
let _adminPromise: Promise<any> | undefined;
const _adminProxy: any = new Proxy(
  {},
  {
    get(_t, prop) {
      if (!_adminPromise) _adminPromise = createSupabaseAdminClient();
      return async (...args: any[]) => {
        const client = await _adminPromise!;
        const v = (client as any)[prop];
        return typeof v === "function" ? v.apply(client, args) : v;
      };
    },
  },
);

export const supabaseAdmin = _adminProxy;
