// Client-side (and SSR-safe) Supabase stub.
//
// Supabase is not configured in this project. This module exports a
// safe no-op fallback for any operation. It never tries to load the
// @supabase/supabase-js package, so the app can build and run without
// the dependency.

const NOT_CONFIGURED =
  "Supabase is not configured in this project. Auth and database features are disabled.";

function buildFallback(): any {
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
      return resolve({ data: null, error: new Error(NOT_CONFIGURED) });
    },
    catch() {
      return this;
    },
  };
  return {
    auth: {
      getSession: async () => ({
        data: { session: null },
        error: new Error(NOT_CONFIGURED),
      }),
      signInWithPassword: async () => ({
        data: null,
        error: new Error(NOT_CONFIGURED),
      }),
      signUp: async () => ({ data: null, error: new Error(NOT_CONFIGURED) }),
      getUser: async () => ({
        data: { user: null },
        error: new Error(NOT_CONFIGURED),
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: () => queryFallback,
  };
}

const _client = buildFallback();

export const supabase = _client;
