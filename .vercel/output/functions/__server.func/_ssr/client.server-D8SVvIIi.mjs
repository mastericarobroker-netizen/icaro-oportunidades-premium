let createClient;
try {
  createClient = require("@supabase/supabase-js").createClient;
} catch (e) {
  createClient = void 0;
}
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    const missing = [
      ...!SUPABASE_URL ? ["SUPABASE_URL"] : [],
      ...!SUPABASE_SERVICE_ROLE_KEY ? ["SUPABASE_SERVICE_ROLE_KEY"] : []
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}. Connect Supabase in Lovable Cloud.`;
    console.error(`[Supabase] ${message}`);
    const queryFallback = {
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
      then(resolve) {
        return resolve({ data: null, error: new Error(message) });
      },
      catch() {
        return this;
      }
    };
    const fallback = {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: new Error(message) }),
        signUp: async () => ({ data: null, error: new Error(message) }),
        getUser: async () => ({ data: { user: null }, error: null })
      },
      from: () => queryFallback,
      rpc: () => ({ then: (resolve) => resolve({ data: null, error: new Error(message) }) })
    };
    return fallback;
  }
  if (!createClient) {
    const message = `Supabase client package not installed.`;
    console.error(`[Supabase] ${message}`);
    const queryFallback = {
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
      then(resolve) {
        return resolve({ data: null, error: new Error(message) });
      },
      catch() {
        return this;
      }
    };
    const fallback = {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: new Error(message) }),
        signUp: async () => ({ data: null, error: new Error(message) }),
        getUser: async () => ({ data: { user: null }, error: null })
      },
      from: () => queryFallback,
      rpc: () => ({ then: (resolve) => resolve({ data: null, error: new Error(message) }) })
    };
    return fallback;
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
export {
  supabaseAdmin
};
