import { r as reactExports } from "../_libs/react.mjs";
import { u as useRouter } from "../_libs/tanstack__react-router.mjs";
import { m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-kS519hlt.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BY2Ftwuo.mjs";
import { o as object, s as string, b as boolean, n as number, l as literal, _ as _enum } from "../_libs/zod.mjs";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
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
const listFeaturedProperties = createServerFn({
  method: "GET"
}).handler(createSsrRpc("addd376039e3a24ebf829cce249140afd5a8c0d8a344f48bf44db3fbf3379cee"));
const listAllProperties = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("cad61ffb3d9079dcbfd0e18f0c282eb196dacf445495b00a645ace68243a63aa"));
const createProperty = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => propertyInput.parse(input)).handler(createSsrRpc("619526cbde28e94a562fc50dceb0e32525822dc6afcee34179675bfe73a44eb5"));
const updateProperty = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => propertyInput.extend({
  id: string().uuid()
}).parse(input)).handler(createSsrRpc("9df3dd3cbd2f1730624b2df425a61ed753eaa0ab538af16f0f692e1fce63fcd3"));
const deleteProperty = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => object({
  id: string().uuid()
}).parse(input)).handler(createSsrRpc("c99808efb321bc30567e74ff512f26d3b4722dbb401173cb2130f52a674941ce"));
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("43a8a8954d4316cf6f20a05d8d6344510e824f94e53a66565d59cc4f5a9313b3"));
const OFFER_TYPES = [
  { value: "primeiro_leilao", label: "1º Leilão" },
  { value: "segundo_leilao", label: "2º Leilão" },
  { value: "licitacao_aberta", label: "Licitação Aberta" },
  { value: "venda_online", label: "Venda Online" },
  { value: "venda_direta", label: "Venda Direta" }
];
const OFFER_LABEL = OFFER_TYPES.reduce(
  (acc, o) => ({ ...acc, [o.value]: o.label }),
  {}
);
const formatBRL = (n) => n == null ? "—" : new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
}).format(Number(n));
export {
  OFFER_LABEL as O,
  OFFER_TYPES as a,
  listAllProperties as b,
  checkIsAdmin as c,
  deleteProperty as d,
  updateProperty as e,
  formatBRL as f,
  createProperty as g,
  listFeaturedProperties as l,
  useServerFn as u
};
