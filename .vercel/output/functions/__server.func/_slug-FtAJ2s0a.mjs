import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { f as formatPostDate } from "./_ssr/blog-DsWiX_ae.mjs";
import { a as Route$1 } from "./_ssr/router-bnDK8NuN.mjs";
import "./_libs/seroval.mjs";
import "./_libs/gray-matter.mjs";
import "./_libs/marked.mjs";
import { A as ArrowRight, f as ArrowLeft, C as Calendar, e as Clock } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_ssr/client-YydkYU_u.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "tslib";
import "./_libs/supabase__functions-js.mjs";
import "./_ssr/server-BybmBoyu.mjs";
import "node:async_hooks";
import "./_libs/h3-v2.mjs";
import "./_libs/rou3.mjs";
import "./_libs/srvx.mjs";
import "./_libs/zod.mjs";
import "fs";
import "./_libs/section-matter.mjs";
import "./_libs/kind-of.mjs";
import "./_libs/extend-shallow.mjs";
import "./_libs/is-extendable.mjs";
import "./_libs/js-yaml.mjs";
import "./_libs/strip-bom-string.mjs";
function PostHeader({ post }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto max-w-3xl px-6 pt-16 pb-12 lg:px-0 lg:pt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/blog",
        className: "inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3 w-3" }),
          "Voltar para o blog"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
        formatPostDate(post.publishedAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        post.readingTime,
        " min de leitura"
      ] }),
      post.author ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "por ",
          post.author
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl", children: post.title }),
    post.excerpt ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground", children: post.excerpt }) : null,
    post.tags.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 flex flex-wrap gap-2", children: post.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "li",
      {
        className: "rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-graphite",
        children: tag
      },
      tag
    )) }) : null
  ] });
}
function BlogPostPage() {
  const {
    post,
    related
  } = Route$1.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-baseline gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl tracking-tight text-foreground", children: "Ícaro" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.32em] text-muted-foreground", children: "Imóveis" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PostHeader, { post }),
    post.cover ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-6 lg:px-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[1.5rem] border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover, alt: post.title, className: "h-full w-full object-cover" }) }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "prose-blog mx-auto max-w-3xl px-6 pt-12 pb-20 lg:px-0 lg:pt-16 lg:pb-28", dangerouslySetInnerHTML: {
      __html: post.contentHtml
    } }),
    related.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-foreground/[0.02] py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
        "Continue lendo"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: related.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
        slug: p.slug
      }, className: "group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-44px_rgba(16,16,16,0.18)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground", children: p.tags[0] ?? "Artigo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-2xl leading-tight text-foreground", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: p.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground", children: [
          "Ler",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
        ] })
      ] }, p.slug)) })
    ] }) }) : null
  ] });
}
export {
  BlogPostPage as component
};
