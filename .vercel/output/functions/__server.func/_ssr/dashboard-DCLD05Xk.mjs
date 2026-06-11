import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, O as OFFER_LABEL, f as formatBRL, a as OFFER_TYPES, c as checkIsAdmin, b as listAllProperties, d as deleteProperty, e as updateProperty, g as createProperty } from "./properties.shared-cjEusVvi.mjs";
import { s as supabase } from "./client-YydkYU_u.mjs";
import "../_libs/seroval.mjs";
import { g as LogOut, h as ArrowLeft, i as Plus, j as Pencil, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./server-LIwUN2EI.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./auth-middleware-BKrlstJM.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/zod.mjs";
const emptyForm = {
  title: "",
  address: "",
  city: "",
  description: "",
  image_url: "",
  offer_type: "venda_direta",
  appraisal_value: "",
  price: "",
  active: true,
  featured: false
};
function Dashboard() {
  const navigate = useNavigate();
  const router = useRouter();
  const fetchAll = useServerFn(listAllProperties);
  const fetchAdmin = useServerFn(checkIsAdmin);
  const create = useServerFn(createProperty);
  const update = useServerFn(updateProperty);
  const remove = useServerFn(deleteProperty);
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [isAdmin, setIsAdmin] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(null);
  const [saving, setSaving] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const reload = async () => {
    setLoading(true);
    try {
      const res = await fetchAll();
      setItems(res.properties);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    (async () => {
      try {
        const a = await fetchAdmin();
        setIsAdmin(a.isAdmin);
        if (a.isAdmin) await reload();
        else setLoading(false);
      } catch {
        setIsAdmin(false);
        setLoading(false);
      }
    })();
  }, []);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({
      to: "/auth",
      replace: true
    });
  };
  const openCreate = () => {
    setError(null);
    setForm({
      ...emptyForm
    });
  };
  const openEdit = (p) => {
    setError(null);
    setForm({
      id: p.id,
      title: p.title,
      address: p.address ?? "",
      city: p.city ?? "",
      description: p.description ?? "",
      image_url: p.image_url ?? "",
      offer_type: p.offer_type,
      appraisal_value: p.appraisal_value != null ? String(p.appraisal_value) : "",
      price: String(p.price),
      active: p.active,
      featured: p.featured
    });
  };
  const saveForm = async (e) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        address: form.address || null,
        city: form.city || null,
        description: form.description || null,
        image_url: form.image_url || null,
        offer_type: form.offer_type,
        appraisal_value: form.appraisal_value ? Number(form.appraisal_value) : null,
        price: Number(form.price),
        active: form.active,
        featured: form.featured
      };
      if (form.id) {
        await update({
          data: {
            id: form.id,
            ...payload
          }
        });
      } else {
        await create({
          data: payload
        });
      }
      setForm(null);
      await reload();
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };
  const onDelete = async (id) => {
    if (!confirm("Excluir este imóvel?")) return;
    try {
      await remove({
        data: {
          id
        }
      });
      await reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao excluir");
    }
  };
  const summary = reactExports.useMemo(() => ({
    total: items.length,
    active: items.filter((p) => p.active).length,
    featured: items.filter((p) => p.featured).length
  }), [items]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center text-sm text-muted-foreground", children: "Carregando..." });
  }
  if (isAdmin === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-screen place-items-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Sem permissão" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Esta conta não possui acesso de administrador." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "mt-6 inline-flex items-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Sair"
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl", children: "Ícaro" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-[0.28em] text-muted-foreground", children: "Painel" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "hidden items-center gap-2 border border-border px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-graphite hover:border-foreground hover:text-foreground sm:inline-flex", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
          " Site"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSignOut, className: "inline-flex items-center gap-2 border border-foreground px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-foreground hover:text-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3.5 w-3.5" }),
          " Sair"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-6 py-10 lg:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl", children: "Imóveis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
            summary.total,
            " cadastrados · ",
            summary.active,
            " ativos · ",
            summary.featured,
            " em destaque"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: openCreate, className: "inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background hover:-translate-y-0.5 transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " Novo imóvel"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 overflow-x-auto border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-secondary/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Título" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Cidade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Oferta" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Avaliação" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Preço" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          items.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-muted-foreground", children: "Nenhum imóvel cadastrado ainda." }) }),
          items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-medium", children: p.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-muted-foreground", children: p.city ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block border border-gold/50 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-gold", children: OFFER_LABEL[p.offer_type] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-muted-foreground line-through", children: formatBRL(p.appraisal_value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 font-display text-lg", children: formatBRL(p.price) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-4 text-xs text-muted-foreground", children: [
              p.active ? "Ativo" : "Inativo",
              p.featured ? " · Destaque" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => openEdit(p), className: "grid h-8 w-8 place-items-center border border-border hover:border-foreground", "aria-label": "Editar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onDelete(p.id), className: "grid h-8 w-8 place-items-center border border-border text-destructive hover:border-destructive", "aria-label": "Excluir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }) })
            ] }) })
          ] }, p.id))
        ] })
      ] }) })
    ] }),
    form && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4", onClick: () => !saving && setForm(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: saveForm, onClick: (e) => e.stopPropagation(), className: "max-h-[90vh] w-full max-w-2xl overflow-auto bg-background p-8 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl", children: form.id ? "Editar imóvel" : "Novo imóvel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormInput, { label: "Título *", value: form.title, onChange: (v) => setForm({
          ...form,
          title: v
        }), required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormInput, { label: "Cidade", value: form.city, onChange: (v) => setForm({
          ...form,
          city: v
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormInput, { label: "Endereço", value: form.address, onChange: (v) => setForm({
          ...form,
          address: v
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormInput, { label: "URL da imagem", value: form.image_url, onChange: (v) => setForm({
          ...form,
          image_url: v
        }), placeholder: "https://..." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground", children: "Tipo de oferta *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: form.offer_type, onChange: (e) => setForm({
            ...form,
            offer_type: e.target.value
          }), className: "w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-gold", children: OFFER_TYPES.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, children: o.label }, o.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormInput, { label: "Valor de avaliação (R$)", value: form.appraisal_value, onChange: (v) => setForm({
          ...form,
          appraisal_value: v.replace(/[^\d.]/g, "")
        }), placeholder: "450000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormInput, { label: "Preço (R$) *", value: form.price, onChange: (v) => setForm({
          ...form,
          price: v.replace(/[^\d.]/g, "")
        }), placeholder: "320000", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground", children: "Descrição" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }), rows: 3, className: "w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-gold" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.active, onChange: (e) => setForm({
            ...form,
            active: e.target.checked
          }) }),
          "Visível no site"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: form.featured, onChange: (e) => setForm({
            ...form,
            featured: e.target.checked
          }) }),
          "Destaque (página inicial)"
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-destructive", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: saving, onClick: () => setForm(null), className: "border border-border px-5 py-3 text-xs uppercase tracking-[0.18em] hover:border-foreground", children: "Cancelar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: saving, className: "bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background disabled:opacity-60", children: saving ? "Salvando..." : form.id ? "Salvar alterações" : "Cadastrar imóvel" })
      ] })
    ] }) })
  ] });
}
function FormInput({
  label,
  value,
  onChange,
  placeholder,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), placeholder, required, className: "w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-gold" })
  ] });
}
export {
  Dashboard as component
};
