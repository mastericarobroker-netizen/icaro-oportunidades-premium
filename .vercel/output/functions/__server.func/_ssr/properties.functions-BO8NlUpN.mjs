import { c as createServerRpc } from "./createServerRpc-CdETA5OW.mjs";
import { c as createServerFn } from "./server-BybmBoyu.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DYmhNa5j.mjs";
import { s as supabase } from "./client-YydkYU_u.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { _ as _enum, o as object, b as boolean, n as number, s as string, l as literal } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const offerEnum = _enum(["primeiro_leilao", "segundo_leilao", "licitacao_aberta", "venda_online", "venda_direta"]);
const propertyInput = object({
  title: string().trim().min(2).max(140),
  address: string().trim().max(200).optional().nullable(),
  city: string().trim().max(80).optional().nullable(),
  description: string().trim().max(2e3).optional().nullable(),
  image_url: string().trim().url().max(500).optional().nullable().or(literal("")),
  offer_type: offerEnum,
  appraisal_value: number().nonnegative().nullable().optional(),
  price: number().nonnegative(),
  active: boolean().optional(),
  featured: boolean().optional()
});
const listFeaturedProperties_createServerFn_handler = createServerRpc({
  id: "addd376039e3a24ebf829cce249140afd5a8c0d8a344f48bf44db3fbf3379cee",
  name: "listFeaturedProperties",
  filename: "src/lib/properties.functions.ts"
}, (opts) => listFeaturedProperties.__executeServer(opts));
const listFeaturedProperties = createServerFn({
  method: "GET"
}).handler(listFeaturedProperties_createServerFn_handler, async () => {
  try {
    const {
      data,
      error
    } = await supabase.from("properties").select("id,title,address,city,description,image_url,offer_type,appraisal_value,price,active,featured,created_at,updated_at").eq("active", true).order("featured", {
      ascending: false
    }).order("created_at", {
      ascending: false
    }).limit(3);
    if (error) {
      console.error(`[Supabase] Failed to load featured properties: ${error.message}`);
      return {
        properties: []
      };
    }
    return {
      properties: data ?? []
    };
  } catch (error) {
    console.error("[Supabase] Unexpected error loading featured properties:", error);
    return {
      properties: []
    };
  }
});
async function ensureAdmin(context) {
  const {
    data,
    error
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin"
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin only");
}
const listAllProperties_createServerFn_handler = createServerRpc({
  id: "cad61ffb3d9079dcbfd0e18f0c282eb196dacf445495b00a645ace68243a63aa",
  name: "listAllProperties",
  filename: "src/lib/properties.functions.ts"
}, (opts) => listAllProperties.__executeServer(opts));
const listAllProperties = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listAllProperties_createServerFn_handler, async ({
  context
}) => {
  await ensureAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data,
    error
  } = await supabaseAdmin.from("properties").select("*").order("created_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return {
    properties: data ?? []
  };
});
const createProperty_createServerFn_handler = createServerRpc({
  id: "619526cbde28e94a562fc50dceb0e32525822dc6afcee34179675bfe73a44eb5",
  name: "createProperty",
  filename: "src/lib/properties.functions.ts"
}, (opts) => createProperty.__executeServer(opts));
const createProperty = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => propertyInput.parse(input)).handler(createProperty_createServerFn_handler, async ({
  data,
  context
}) => {
  await ensureAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    data: row,
    error
  } = await supabaseAdmin.from("properties").insert({
    title: data.title,
    address: data.address ?? null,
    city: data.city ?? null,
    description: data.description ?? null,
    image_url: data.image_url || null,
    offer_type: data.offer_type,
    appraisal_value: data.appraisal_value ?? null,
    price: data.price,
    active: data.active ?? true,
    featured: data.featured ?? false,
    created_by: context.userId
  }).select().single();
  if (error) throw new Error(error.message);
  return {
    property: row
  };
});
const updateProperty_createServerFn_handler = createServerRpc({
  id: "9df3dd3cbd2f1730624b2df425a61ed753eaa0ab538af16f0f692e1fce63fcd3",
  name: "updateProperty",
  filename: "src/lib/properties.functions.ts"
}, (opts) => updateProperty.__executeServer(opts));
const updateProperty = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => propertyInput.extend({
  id: string().uuid()
}).parse(input)).handler(updateProperty_createServerFn_handler, async ({
  data,
  context
}) => {
  await ensureAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    id,
    ...patch
  } = data;
  const {
    data: row,
    error
  } = await supabaseAdmin.from("properties").update({
    ...patch,
    image_url: patch.image_url || null,
    address: patch.address ?? null,
    city: patch.city ?? null,
    description: patch.description ?? null,
    appraisal_value: patch.appraisal_value ?? null
  }).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return {
    property: row
  };
});
const deleteProperty_createServerFn_handler = createServerRpc({
  id: "c99808efb321bc30567e74ff512f26d3b4722dbb401173cb2130f52a674941ce",
  name: "deleteProperty",
  filename: "src/lib/properties.functions.ts"
}, (opts) => deleteProperty.__executeServer(opts));
const deleteProperty = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  id: string().uuid()
}).parse(input)).handler(deleteProperty_createServerFn_handler, async ({
  data,
  context
}) => {
  await ensureAdmin(context);
  const {
    supabaseAdmin
  } = await import("./client.server-D5ro3rAQ.mjs");
  const {
    error
  } = await supabaseAdmin.from("properties").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const checkIsAdmin_createServerFn_handler = createServerRpc({
  id: "43a8a8954d4316cf6f20a05d8d6344510e824f94e53a66565d59cc4f5a9313b3",
  name: "checkIsAdmin",
  filename: "src/lib/properties.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(checkIsAdmin_createServerFn_handler, async ({
  context
}) => {
  const {
    data,
    error
  } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin"
  });
  if (error) throw new Error(error.message);
  return {
    isAdmin: Boolean(data)
  };
});
export {
  checkIsAdmin_createServerFn_handler,
  createProperty_createServerFn_handler,
  deleteProperty_createServerFn_handler,
  listAllProperties_createServerFn_handler,
  listFeaturedProperties_createServerFn_handler,
  updateProperty_createServerFn_handler
};
