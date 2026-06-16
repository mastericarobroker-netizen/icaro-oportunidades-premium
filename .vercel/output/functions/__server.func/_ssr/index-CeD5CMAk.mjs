import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useForm } from "../_libs/react-hook-form.mjs";
import { u } from "../_libs/hookform__resolvers.mjs";
import { u as useServerFn, l as listFeaturedProperties, O as OFFER_LABEL, f as formatBRL } from "./properties.shared-CubjyeWh.mjs";
import "../_libs/seroval.mjs";
import { X, M as Menu, a as MessageCircle, B as Building2, G as Gavel, b as Banknote, R as Repeat, c as MapPin, U as User, P as Phone, d as Mail, A as ArrowRight, I as Instagram, L as Linkedin } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./server-CCzWw-QQ.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-DWM_ucBr.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const corpoImage = "/assets/icaro-corpo-inteiro2-ZrgfwBGi.jpg";
const heroImage = "/assets/icaro-foto-perfil-C5sF9CmI.jpg";
const regionMap = "/assets/mapa-vale-do-paraiba-CvwlwTHW.png";
const WHATSAPP_NUMBER = "5512991968709";
const WHATSAPP_MSG = encodeURIComponent("Olá Ícaro, gostaria de conhecer as oportunidades de investimento imobiliário.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const nav = [{
  label: "Início",
  href: "#inicio"
}, {
  label: "Sobre",
  href: "#sobre"
}, {
  label: "Imóveis",
  href: "#imoveis"
}, {
  label: "Oportunidades",
  href: "#oportunidades"
}, {
  label: "Benefícios",
  href: "#beneficios"
}, {
  label: "Contato",
  href: "#contato"
}];
const fadeUp = {
  initial: {
    opacity: 0,
    y: 24
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  viewport: {
    once: true,
    margin: "-80px"
  },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }
};
const leadSchema = object({
  nome: string().trim().min(2, "Informe seu nome").max(80),
  telefone: string().trim().min(8, "Telefone inválido").max(20),
  email: string().trim().email("E-mail inválido").max(120)
});
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Authority, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Properties, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Benefits, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Opportunities, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Region, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FinalCTA, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppFloat, {})
  ] });
}
function Header() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-foreground text-background text-[10px] uppercase tracking-[0.28em]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-9 max-w-7xl items-center justify-between px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Curadoria de oportunidades Caixa e leilões · Vale do Paraíba" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden items-center gap-2 text-background/80 sm:flex", children: "Resposta em até 24h" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `border-b border-border bg-background/95 transition-all duration-500 ${scrolled ? "backdrop-blur-xl shadow-sm" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#inicio", className: "group flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl tracking-tight text-foreground", children: "Ícaro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.32em] text-muted-foreground", children: "Imóveis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-8 lg:flex", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, className: "text-sm uppercase tracking-[0.18em] text-graphite transition-colors hover:text-foreground", children: n.label }, n.href)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: WHATSAPP_URL, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-background transition hover:bg-graphite", children: "Falar com Especialista" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { "aria-label": "Abrir menu", className: "lg:hidden", onClick: () => setOpen((v) => !v), children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5 text-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5 text-foreground" }) })
      ] }),
      open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-background lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1 px-6 py-4", children: [
        nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, onClick: () => setOpen(false), className: "border-b border-border py-3 text-sm text-graphite", children: n.label }, n.href)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: WHATSAPP_URL, target: "_blank", rel: "noreferrer", className: "mt-3 inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background", children: "Falar com Especialista" })
      ] }) })
    ] })
  ] });
}
function Eyebrow({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
    children
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "inicio", className: "relative overflow-hidden bg-background py-24 lg:py-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.36em] text-muted-foreground", children: "Investimentos imobiliários · Vale do Paraíba" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-8 text-[3.8rem] leading-[0.94] tracking-[-0.04em] text-foreground sm:text-[4.5rem] lg:text-[5.5rem]", children: [
        "Invista em imóveis com ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold", children: "inteligência" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "e ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold", children: "segurança" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-xl text-base leading-8 text-muted-foreground lg:text-lg", children: "Especialista em imóveis Caixa, oportunidades abaixo do valor de mercado e investimentos imobiliários no Vale do Paraíba." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contato", className: "inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition hover:bg-graphite", children: "Quero receber oportunidades" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center gap-2 rounded-sm border border-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition hover:bg-foreground hover:text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
          " Falar no WhatsApp"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "mt-16 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-8 text-left", children: [["+10", "Cidades atendidas"], ["100%", "Análise consultiva"], ["24h", "Resposta ágil"]].map(([k, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-display text-3xl text-foreground", children: k }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground", children: v })
      ] }, v)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 1.04
    }, animate: {
      opacity: 1,
      scale: 1
    }, transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1]
    }, className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_40px_120px_-80px_rgba(16,16,16,0.16)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: "Ícaro — Especialista em Investimentos Imobiliários", width: 1600, height: 1200, className: "h-full w-full object-cover object-top" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-6 right-4 hidden w-56 rounded border border-border bg-background/95 px-4 py-3 text-xs shadow-xl sm:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] uppercase tracking-[0.32em] text-muted-foreground", children: "Especialista" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-medium text-foreground", children: "Imóveis Caixa" })
      ] })
    ] })
  ] }) }) });
}
function Authority() {
  const indicators = ["Imóveis abaixo do mercado", "Oportunidades Caixa", "Análise de investimento", "Atendimento personalizado"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sobre", className: "border-t border-border bg-background py-28 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp, className: "relative overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_40px_80px_-44px_rgba(16,16,16,0.16)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: corpoImage, alt: "Ícaro — Especialista em Investimentos Imobiliários", loading: "lazy", className: "h-full w-full object-cover" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "relative flex flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.32em] text-gold", children: "Sobre" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: [
        "Seu especialista em ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold", children: "investimentos" }),
        " imobiliários."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg", children: "Atuo auxiliando investidores e compradores a encontrar imóveis com alto potencial de valorização, oportunidades Caixa e imóveis de leilão — com foco em geração de patrimônio e rentabilidade." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-4 sm:grid-cols-2", children: indicators.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[0.75rem] border border-border bg-white p-5 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 text-sm text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 h-4 w-4 rounded border border-gold bg-gold/10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
      ] }) }, item)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-10 max-w-xl text-sm italic text-graphite", children: "“Patrimônio se constrói com critério, dados e oportunidades certas.”" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-0 top-0 text-[9rem] font-display font-light text-foreground/5", children: "01" })
    ] })
  ] }) });
}
function Benefits() {
  return BenefitsImpl();
}
function PropertyCard({
  p
}) {
  const waMsg = encodeURIComponent(`Olá Ícaro! Tenho interesse no imóvel: ${p.title}${p.city ? ` (${p.city})` : ""}.`);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
    opacity: 0,
    y: 24
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true
  }, transition: {
    duration: 0.6
  }, className: "group flex flex-col border border-border bg-background transition-colors hover:border-gold", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden bg-secondary", children: [
      p.image_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image_url, alt: p.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-full w-full place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-10 w-10", strokeWidth: 1.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-4 bg-background/95 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground", children: OFFER_LABEL[p.offer_type] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl leading-snug", children: p.title }),
      (p.address || p.city) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-gold" }),
        [p.address, p.city].filter(Boolean).join(" · ")
      ] }),
      p.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 line-clamp-2 text-sm text-muted-foreground", children: p.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-border pt-4", children: [
        p.appraisal_value && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Avaliação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-through", children: formatBRL(p.appraisal_value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-end justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.22em] text-graphite", children: "Por" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl text-foreground", children: formatBRL(p.price) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, target: "_blank", rel: "noreferrer", className: "mt-6 inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5", children: [
        "Tenho interesse ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] })
  ] });
}
function Properties() {
  const fetcher = useServerFn(listFeaturedProperties);
  const [items, setItems] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetcher().then((r) => setItems(r.properties)).catch(() => setItems([]));
  }, [fetcher]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "imoveis", className: "border-t border-border py-28 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp, className: "flex flex-wrap items-end justify-between gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Imóveis disponíveis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: [
        "Oportunidades ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "selecionadas" }),
        " agora."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground", children: "Imóveis com curadoria — leilões, licitações e venda direta — abaixo do valor de mercado." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: [
      items === null && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[480px] animate-pulse border border-border bg-secondary/40" }, i)) }),
      items && items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full border border-dashed border-border p-16 text-center text-sm text-muted-foreground", children: "Em breve novas oportunidades. Cadastre-se para receber em primeira mão." }),
      items && items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PropertyCard, { p }, p.id))
    ] })
  ] }) });
}
function BenefitsImpl() {
  const items = [{
    title: "Curadoria Especializada",
    text: "Seleção das melhores oportunidades."
  }, {
    title: "Análise de Potencial",
    text: "Avaliação de valorização e retorno."
  }, {
    title: "Segurança Jurídica",
    text: "Acompanhamento completo do processo."
  }, {
    title: "Atendimento Consultivo",
    text: "Suporte do início ao fim."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "beneficios", className: "border-t border-border bg-background py-28 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.32em] text-gold", children: "Benefícios" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: "Por que investir com a Ícaro Imóveis?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_30px_80px_-44px_rgba(16,16,16,0.12)]", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.6,
      delay: idx * 0.08
    }, className: `grid gap-4 px-8 py-7 ${idx < items.length - 1 ? "border-b border-border" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-gold", children: [
            "0",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl text-foreground", children: item.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm uppercase tracking-[0.18em] text-muted-foreground", children: [
          "0",
          idx + 1
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: item.text })
    ] }, item.title)) })
  ] }) });
}
function Opportunities() {
  const items = [{
    icon: Building2,
    title: "Imóveis Caixa",
    text: "Acesso a imóveis com condições especiais e descontos da Caixa Econômica."
  }, {
    icon: Gavel,
    title: "Leilões Imobiliários",
    text: "Análise e seleção de imóveis em leilão com alto potencial."
  }, {
    icon: Banknote,
    title: "Imóveis para Renda",
    text: "Ativos selecionados para rentabilidade mensal consistente."
  }, {
    icon: Repeat,
    title: "Imóveis para Revenda",
    text: "Oportunidades de curto prazo com margem de valorização."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "oportunidades", className: "relative overflow-hidden bg-foreground py-28 text-background lg:py-36", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_32%)]" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-gold-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-8 bg-gold" }),
          " Oportunidades"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: [
          "Oportunidades que podem ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold", children: "gerar patrimônio" }),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: items.map((it, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6,
        delay: idx * 0.08
      }, className: "group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-background transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(it.icon, { className: "h-7 w-7 text-gold-soft", strokeWidth: 1.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm text-gold/60", children: [
            "0",
            idx + 1
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-10 text-xl", children: it.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-background/75", children: it.text })
      ] }, it.title)) })
    ] })
  ] });
}
function Region() {
  const cities = ["Estado de São Paulo", "São José dos Campos", "Jacareí", "Taubaté", "Caçapava", "Pindamonhangaba", "Vale do Paraíba"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border py-28 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Região de atuação" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: [
        "Atuação em todo o",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "Estado de São Paulo" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base text-muted-foreground", children: "Conectando investidores às melhores oportunidades imobiliárias do estado, com presença estratégica em São José dos Campos e Vale do Paraíba." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-relaxed text-muted-foreground", children: "Atuamos na prospecção e análise de oportunidades imobiliárias em todo o Estado de São Paulo, com especialização em imóveis Caixa, imóveis abaixo do valor de mercado, leilões e investimentos patrimoniais. Nossa atuação possui forte presença em São José dos Campos e em toda a região do Vale do Paraíba — um dos polos econômicos mais relevantes do país." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-wrap gap-2", children: cities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 border border-border bg-secondary/50 px-4 py-2 text-xs tracking-wide text-graphite", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-gold" }),
        " ",
        c
      ] }, c)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 font-display text-lg italic text-graphite", children: "“Identificamos oportunidades com potencial de valorização em todo o Estado de São Paulo.”" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp, className: "relative flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StateMap, {}) })
  ] }) });
}
function StateMap() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-square w-full max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: regionMap, alt: "Região de atuação — Vale do Paraíba", className: "h-full w-full object-contain", loading: "lazy" }) });
}
function Testimonials() {
  const items = [{
    quote: "Consegui adquirir um imóvel abaixo do valor de mercado com total segurança.",
    name: "Investidor",
    role: "São José dos Campos"
  }, {
    quote: "Excelente suporte durante todo o processo de compra.",
    name: "Cliente Caixa",
    role: "Jacareí"
  }, {
    quote: "Atendimento consultivo e oportunidades que realmente fazem sentido.",
    name: "Empresário",
    role: "Taubaté"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border bg-secondary/40 py-28 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eyebrow, { children: "Depoimentos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: "Resultados que falam por si." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid gap-6 md:grid-cols-3", children: items.map((t, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.figure, { initial: {
      opacity: 0,
      y: 20
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.6,
      delay: idx * 0.1
    }, className: "flex h-full flex-col justify-between border border-border bg-background p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl leading-none text-gold", children: "“" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mt-4 text-base leading-relaxed text-foreground", children: t.quote }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-8 border-t border-border pt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: t.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground", children: t.role })
      ] })
    ] }, t.quote)) })
  ] }) });
}
function FinalCTA() {
  const {
    register,
    handleSubmit,
    formState,
    reset
  } = useForm({
    resolver: u(leadSchema)
  });
  const [sent, setSent] = reactExports.useState(false);
  const onSubmit = (data) => {
    const msg = encodeURIComponent(`Olá Ícaro! Sou ${data.nome} (${data.telefone} · ${data.email}) e gostaria de receber oportunidades de investimento imobiliário.`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contato", className: "bg-background py-28 lg:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.95fr_0.85fr] lg:gap-20 lg:px-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "flex flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.32em] text-gold", children: "Cadastre-se" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 text-4xl leading-tight lg:text-5xl", children: [
        "Receba oportunidades imobiliárias ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold", children: "antes do mercado" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-base text-muted-foreground", children: "Cadastre-se para receber oportunidades selecionadas diretamente no WhatsApp, com curadoria e análise de potencial." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-8 space-y-4 text-sm text-graphite", children: ["Sem spam — apenas oportunidades reais", "Análise de valorização incluída", "Atendimento humano e consultivo"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 h-px w-8 flex-shrink-0 bg-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { ...fadeUp, onSubmit: handleSubmit(onSubmit), className: "rounded-[1.75rem] border border-border bg-white p-10 shadow-[0_40px_90px_-70px_rgba(16,16,16,0.25)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 border-b border-border pb-6 text-sm uppercase tracking-[0.28em] text-muted-foreground", children: "Preencha seus dados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }), label: "Nome", error: formState.errors.nome?.message, ...register("nome") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }), label: "Telefone", type: "tel", placeholder: "(12) 99999-9999", error: formState.errors.telefone?.message, ...register("telefone") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }), label: "E-mail", type: "email", error: formState.errors.email?.message, ...register("email") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5", children: [
        "Quero receber oportunidades",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
      ] }),
      sent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-xs text-gold", children: "Quase lá — finalize o envio pelo WhatsApp." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-center text-[11px] text-muted-foreground", children: "Seus dados são tratados com confidencialidade." })
    ] })
  ] }) });
}
const Field = ({
  icon,
  label,
  error,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-6 block", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground", children: [
    icon,
    " ",
    label
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...props, className: "w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-gold" }),
  error && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 block text-xs text-destructive", children: error })
] });
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "border-t border-border bg-foreground py-16 text-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl", children: "Ícaro" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] uppercase tracking-[0.28em] text-gold-soft", children: "Imóveis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-sm text-sm text-background/65", children: "Especialista em investimentos imobiliários, imóveis Caixa e oportunidades imobiliárias no Vale do Paraíba." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] uppercase tracking-[0.28em] text-gold-soft", children: "Navegação" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2 text-sm text-background/75", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, className: "hover:text-gold-soft", children: n.label }) }, n.href)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] uppercase tracking-[0.28em] text-gold-soft", children: "Contato" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3 text-sm text-background/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 hover:text-gold-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://instagram.com", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 hover:text-gold-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }),
            " Instagram"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://linkedin.com", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 hover:text-gold-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "h-4 w-4" }),
            " LinkedIn"
          ] }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-12 flex max-w-7xl flex-col items-start gap-2 border-t border-background/10 px-6 pt-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Ícaro Imóveis. Todos os direitos reservados."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vale do Paraíba · São Paulo · Brasil" })
    ] })
  ] });
}
function WhatsAppFloat() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: WHATSAPP_URL, target: "_blank", rel: "noreferrer", "aria-label": "Falar no WhatsApp", className: "group fixed bottom-6 right-6 z-40 flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-[0.18em] text-background opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block", children: "Falar com especialista" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-105", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 animate-ping rounded-full bg-gold/40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "relative h-6 w-6" })
    ] })
  ] });
}
export {
  Index as component
};
