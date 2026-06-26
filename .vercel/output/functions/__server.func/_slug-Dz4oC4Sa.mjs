import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { A as ArrowRight } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
function PostNotFound() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-[0.32em] text-graphite", children: "404 · Artigo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl tracking-tight text-foreground", children: "Não encontramos esse artigo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Talvez ele tenha sido movido ou nunca tenha existido. Confira a lista completa no blog." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "mt-8 inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-background transition hover:bg-graphite", children: [
      "Voltar para o blog",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
    ] })
  ] }) });
}
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(PostNotFound, {});
export {
  SplitNotFoundComponent as notFoundComponent
};
