let createClient;
try {
  createClient = require("@supabase/supabase-js").createClient;
} catch (e) {
  createClient = void 0;
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://iddwvbbeyplcwccobeak.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_fcps6zSkyiuvCGSY5optaA_YVoqCO_v";
  if (!createClient) {
    const message = `Supabase client package not installed.`;
    console.error(`[Supabase] ${message}`);
    return fallback;
  }
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
export {
  supabase as s
};
