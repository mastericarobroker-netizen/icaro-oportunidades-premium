import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as formatPostDate } from "./blog-DsWiX_ae.mjs";
import { R as Route$2 } from "./router-bnDK8NuN.mjs";
import "../_libs/seroval.mjs";
import "../_libs/gray-matter.mjs";
import "../_libs/marked.mjs";
import { A as ArrowRight, C as Calendar, e as Clock } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./client-YydkYU_u.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./server-BybmBoyu.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "fs";
import "../_libs/section-matter.mjs";
import "../_libs/kind-of.mjs";
import "../_libs/extend-shallow.mjs";
import "../_libs/is-extendable.mjs";
import "../_libs/js-yaml.mjs";
import "../_libs/strip-bom-string.mjs";
function PostCard({ post }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "group flex h-full flex-col rounded-[1.25rem] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-44px_rgba(16,16,16,0.18)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/blog/$slug",
      params: { slug: post.slug },
      className: "flex h-full flex-col",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/10] overflow-hidden rounded-t-[1.25rem] border-b border-border bg-muted", children: post.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: post.cover,
            alt: post.title,
            loading: "lazy",
            className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-foreground/5 via-foreground/10 to-gold/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl text-foreground/15", children: "Í" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-4 p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
              formatPostDate(post.publishedAt)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              post.readingTime,
              " min"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl leading-tight tracking-tight text-foreground", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-3 text-sm leading-relaxed text-muted-foreground", children: post.excerpt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex items-center gap-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-foreground", children: [
            "Ler artigo",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" })
          ] })
        ] })
      ]
    }
  ) });
}
function BlogIndex() {
  const posts = Route$2.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl tracking-tight text-foreground", children: "Ícaro" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.32em] text-muted-foreground", children: "Imóveis" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-background py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
          "Conteúdo & Curadoria"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 max-w-3xl font-display text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl", children: [
          "Blog ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold", children: "Ícaro" }),
          " Imóveis"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg", children: "Análises, métodos de curadoria e tendências do mercado imobiliário do Vale do Paraíba — escritos a partir da prática de quem está no campo toda semana." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background py-20 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: [
        posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card/40 px-8 py-20 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl text-foreground", children: "Em breve" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Novos artigos serão publicados em breve. Volte sempre!" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post }, post.slug)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 rounded-sm border border-foreground px-7 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background", children: [
          "Voltar para a página inicial",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] }) })
      ] }) })
    ] })
  ] });
}
export {
  BlogIndex as component
};
