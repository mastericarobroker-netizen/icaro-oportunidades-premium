import { createFileRoute, useNavigate, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  listAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  checkIsAdmin,
} from "@/lib/properties.functions";
import {
  OFFER_TYPES,
  OFFER_LABEL,
  formatBRL,
  type OfferType,
  type Property,
} from "@/lib/properties.shared";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Painel · Ícaro Imóveis" }] }),
  component: Dashboard,
});

type FormState = {
  id?: string;
  title: string;
  address: string;
  city: string;
  description: string;
  image_url: string;
  offer_type: OfferType;
  appraisal_value: string;
  price: string;
  active: boolean;
  featured: boolean;
};

const emptyForm: FormState = {
  title: "",
  address: "",
  city: "",
  description: "",
  image_url: "",
  offer_type: "venda_direta",
  appraisal_value: "",
  price: "",
  active: true,
  featured: false,
};

function Dashboard() {
  const navigate = useNavigate();
  const router = useRouter();
  const fetchAll = useServerFn(listAllProperties);
  const fetchAdmin = useServerFn(checkIsAdmin);
  const create = useServerFn(createProperty);
  const update = useServerFn(updateProperty);
  const remove = useServerFn(deleteProperty);

  const [items, setItems] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = async () => {
    setLoading(true);
    try {
      const res = await fetchAll();
      setItems(res.properties as Property[]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.invalidate();
    navigate({ to: "/auth", replace: true });
  };

  const openCreate = () => {
    setError(null);
    setForm({ ...emptyForm });
  };

  const openEdit = (p: Property) => {
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
      featured: p.featured,
    });
  };

  const saveForm = async (e: React.FormEvent) => {
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
        featured: form.featured,
      };
      if (form.id) {
        await update({ data: { id: form.id, ...payload } });
      } else {
        await create({ data: payload });
      }
      setForm(null);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Excluir este imóvel?")) return;
    try {
      await remove({ data: { id } });
      await reload();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao excluir");
    }
  };

  const summary = useMemo(
    () => ({
      total: items.length,
      active: items.filter((p) => p.active).length,
      featured: items.filter((p) => p.featured).length,
    }),
    [items],
  );

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="text-3xl">Sem permissão</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Esta conta não possui acesso de administrador.
          </p>
          <button
            onClick={handleSignOut}
            className="mt-6 inline-flex items-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] hover:bg-foreground hover:text-background"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-baseline gap-2">
              <span className="font-display text-xl">Ícaro</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Painel
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-2 border border-border px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-graphite hover:border-foreground hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 border border-foreground px-4 py-2 text-[11px] uppercase tracking-[0.18em] hover:bg-foreground hover:text-background"
            >
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl">Imóveis</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {summary.total} cadastrados · {summary.active} ativos · {summary.featured} em destaque
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background hover:-translate-y-0.5 transition-transform"
          >
            <Plus className="h-4 w-4" /> Novo imóvel
          </button>
        </div>

        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary/60 text-left text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Cidade</th>
                <th className="px-4 py-3">Oferta</th>
                <th className="px-4 py-3">Avaliação</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                    Nenhum imóvel cadastrado ainda.
                  </td>
                </tr>
              )}
              {items.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="px-4 py-4 font-medium">{p.title}</td>
                  <td className="px-4 py-4 text-muted-foreground">{p.city ?? "—"}</td>
                  <td className="px-4 py-4">
                    <span className="inline-block border border-gold/50 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-gold">
                      {OFFER_LABEL[p.offer_type]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground line-through">
                    {formatBRL(p.appraisal_value)}
                  </td>
                  <td className="px-4 py-4 font-display text-lg">{formatBRL(p.price)}</td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">
                    {p.active ? "Ativo" : "Inativo"}
                    {p.featured ? " · Destaque" : ""}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="grid h-8 w-8 place-items-center border border-border hover:border-foreground"
                        aria-label="Editar"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(p.id)}
                        className="grid h-8 w-8 place-items-center border border-border text-destructive hover:border-destructive"
                        aria-label="Excluir"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {form && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4"
          onClick={() => !saving && setForm(null)}
        >
          <form
            onSubmit={saveForm}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-2xl overflow-auto bg-background p-8 shadow-2xl"
          >
            <h2 className="text-2xl">{form.id ? "Editar imóvel" : "Novo imóvel"}</h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <FormInput
                label="Título *"
                value={form.title}
                onChange={(v) => setForm({ ...form, title: v })}
                required
              />
              <FormInput
                label="Cidade"
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
              />
              <div className="sm:col-span-2">
                <FormInput
                  label="Endereço"
                  value={form.address}
                  onChange={(v) => setForm({ ...form, address: v })}
                />
              </div>
              <div className="sm:col-span-2">
                <FormInput
                  label="URL da imagem"
                  value={form.image_url}
                  onChange={(v) => setForm({ ...form, image_url: v })}
                  placeholder="https://..."
                />
              </div>
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  Tipo de oferta *
                </span>
                <select
                  value={form.offer_type}
                  onChange={(e) =>
                    setForm({ ...form, offer_type: e.target.value as OfferType })
                  }
                  className="w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-gold"
                >
                  {OFFER_TYPES.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
              <div />
              <FormInput
                label="Valor de avaliação (R$)"
                value={form.appraisal_value}
                onChange={(v) => setForm({ ...form, appraisal_value: v.replace(/[^\d.]/g, "") })}
                placeholder="450000"
              />
              <FormInput
                label="Preço (R$) *"
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v.replace(/[^\d.]/g, "") })}
                placeholder="320000"
                required
              />
              <div className="sm:col-span-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    Descrição
                  </span>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-gold"
                  />
                </label>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                />
                Visível no site
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Destaque (página inicial)
              </label>
            </div>

            {error && <p className="mt-4 text-xs text-destructive">{error}</p>}

            <div className="mt-8 flex justify-end gap-2">
              <button
                type="button"
                disabled={saving}
                onClick={() => setForm(null)}
                className="border border-border px-5 py-3 text-xs uppercase tracking-[0.18em] hover:border-foreground"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background disabled:opacity-60"
              >
                {saving ? "Salvando..." : form.id ? "Salvar alterações" : "Cadastrar imóvel"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full border border-border bg-background px-3 py-3 text-sm outline-none focus:border-gold"
      />
    </label>
  );
}