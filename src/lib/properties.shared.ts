export const OFFER_TYPES = [
  { value: "primeiro_leilao", label: "1º Leilão" },
  { value: "segundo_leilao", label: "2º Leilão" },
  { value: "licitacao_aberta", label: "Licitação Aberta" },
  { value: "venda_online", label: "Venda Online" },
  { value: "venda_direta", label: "Venda Direta" },
] as const;

export type OfferType = (typeof OFFER_TYPES)[number]["value"];

export const OFFER_LABEL: Record<OfferType, string> = OFFER_TYPES.reduce(
  (acc, o) => ({ ...acc, [o.value]: o.label }),
  {} as Record<OfferType, string>,
);

export type Property = {
  id: string;
  title: string;
  address: string | null;
  city: string | null;
  description: string | null;
  image_url: string | null;
  offer_type: OfferType;
  appraisal_value: number | null;
  price: number;
  active: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export const formatBRL = (n: number | null | undefined) =>
  n == null
    ? "—"
    : new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      }).format(Number(n));