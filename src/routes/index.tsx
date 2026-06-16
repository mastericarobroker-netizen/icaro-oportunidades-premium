import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Sparkles,
  ShieldCheck,
  LineChart,
  Handshake,
  Building2,
  Gavel,
  Banknote,
  Repeat,
  MapPin,
  Menu,
  X,
  Phone,
  Mail,
  User as UserIcon,
  Instagram,
  Linkedin,
  MessageCircle,
  ArrowRight,
  Check,
} from "lucide-react";
import corpoImage from "@/assets/icaro-corpo-inteiro2.jpg";
import heroImage from "@/assets/icaro-foto-perfil.jpg";
import regionMap from "@/assets/mapa-vale-do-paraiba.png";
import { useServerFn } from "@tanstack/react-start";
import { listFeaturedProperties } from "@/lib/properties.functions";
import { OFFER_LABEL, formatBRL, type Property } from "@/lib/properties.shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ícaro Imóveis — Investimentos Imobiliários no Vale do Paraíba" },
      {
        name: "description",
        content:
          "Especialista em imóveis Caixa, leilões e oportunidades abaixo do valor de mercado em São José dos Campos e Vale do Paraíba.",
      },
      { property: "og:title", content: "Ícaro Imóveis — Invista com Inteligência" },
      {
        property: "og:description",
        content:
          "Curadoria de imóveis Caixa, leilões e oportunidades para geração de patrimônio no Vale do Paraíba.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const WHATSAPP_NUMBER = "5512991968709";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá Ícaro, gostaria de conhecer as oportunidades de investimento imobiliário.",
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Imóveis", href: "#imoveis" },
  { label: "Oportunidades", href: "#oportunidades" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Contato", href: "#contato" },
];

const categories = [
  "Licitações",
  "Análise de investimento",
  "Abaixo do valor de mercado",
  "Imóveis Caixa",
  "Leilões Judiciais",
  "Venda direta",
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const leadSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(80),
  telefone: z.string().trim().min(8, "Telefone inválido").max(20),
  email: z.string().trim().email("E-mail inválido").max(120),
});
type LeadForm = z.infer<typeof leadSchema>;

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Authority />
        <Properties />
        <Benefits />
        <Opportunities />
        <Region />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border bg-foreground text-background text-[10px] uppercase tracking-[0.28em]">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 lg:px-10">
          <span>Curadoria de oportunidades Caixa e leilões · Vale do Paraíba</span>
          <span className="hidden items-center gap-2 text-background/80 sm:flex">
            Resposta em até 24h
          </span>
        </div>
      </div>
      <div className={`border-b border-border bg-background/95 transition-all duration-500 ${scrolled ? "backdrop-blur-xl shadow-sm" : ""}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#inicio" className="group flex items-baseline gap-3">
            <span className="font-display text-3xl tracking-tight text-foreground">Ícaro</span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Imóveis</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm uppercase tracking-[0.18em] text-graphite transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.18em] text-background transition hover:bg-graphite"
            >
              Falar com Especialista
            </a>
          </div>
          <button aria-label="Abrir menu" className="lg:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <nav className="flex flex-col gap-1 px-6 py-4">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-border py-3 text-sm text-graphite"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background"
              >
                Falar com Especialista
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite">
      <span className="h-px w-8 bg-gold" />
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <motion.div {...fadeUp} className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.36em] text-muted-foreground">
              Investimentos imobiliários · Vale do Paraíba
            </div>
            <h1 className="mt-8 text-[3.8rem] leading-[0.94] tracking-[-0.04em] text-foreground sm:text-[4.5rem] lg:text-[5.5rem]">
              Invista em imóveis com <span className="italic text-gold">inteligência</span>
              <br />e <span className="italic text-gold">segurança</span>.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground lg:text-lg">
              Especialista em imóveis Caixa, oportunidades abaixo do valor de mercado e
              investimentos imobiliários no Vale do Paraíba.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-background transition hover:bg-graphite"
              >
                Quero receber oportunidades
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-foreground px-8 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition hover:bg-foreground hover:text-background"
              >
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </div>
            <dl className="mt-16 grid max-w-xl grid-cols-3 gap-4 border-t border-border pt-8 text-left">
              {[
                ["+10", "Cidades atendidas"],
                ["100%", "Análise consultiva"],
                ["24h", "Resposta ágil"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="font-display text-3xl text-foreground">{k}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="overflow-hidden rounded-[2rem] border border-border bg-white shadow-[0_40px_120px_-80px_rgba(16,16,16,0.16)]">
              <img
                src={heroImage}
                alt="Ícaro — Especialista em Investimentos Imobiliários"
                width={1600}
                height={1200}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="absolute -top-6 right-4 hidden w-56 rounded border border-border bg-background/95 px-4 py-3 text-xs shadow-xl sm:block">
              <div className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground">
                Especialista
              </div>
              <div className="mt-1 font-medium text-foreground">Imóveis Caixa</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Authority() {
  const indicators = [
    "Imóveis abaixo do mercado",
    "Oportunidades Caixa",
    "Análise de investimento",
    "Atendimento personalizado",
  ];
  return (
    <section id="sobre" className="border-t border-border bg-background py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10">
        <motion.div
          {...fadeUp}
          className="relative overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_40px_80px_-44px_rgba(16,16,16,0.16)]"
        >
          <img
            src={corpoImage}
            alt="Ícaro — Especialista em Investimentos Imobiliários"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div {...fadeUp} className="relative flex flex-col justify-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Sobre</div>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Seu especialista em <span className="italic text-gold">investimentos</span> imobiliários.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Atuo auxiliando investidores e compradores a encontrar imóveis com
            alto potencial de valorização, oportunidades Caixa e imóveis de
            leilão — com foco em geração de patrimônio e rentabilidade.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {indicators.map((item) => (
              <div key={item} className="rounded-[0.75rem] border border-border bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1 h-4 w-4 rounded border border-gold bg-gold/10" />
                  <span>{item}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm italic text-graphite">
            “Patrimônio se constrói com critério, dados e oportunidades certas.”
          </p>
          <span className="pointer-events-none absolute right-0 top-0 text-[9rem] font-display font-light text-foreground/5">
            01
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  return BenefitsImpl();
}

function PropertyCard({ p }: { p: Property }) {
  const waMsg = encodeURIComponent(
    `Olá Ícaro! Tenho interesse no imóvel: ${p.title}${p.city ? ` (${p.city})` : ""}.`,
  );
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col border border-border bg-background transition-colors hover:border-gold"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-muted-foreground">
            <Building2 className="h-10 w-10" strokeWidth={1.2} />
          </div>
        )}
        <span className="absolute left-4 top-4 bg-background/95 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground">
          {OFFER_LABEL[p.offer_type]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl leading-snug">{p.title}</h3>
        {(p.address || p.city) && (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-gold" />
            {[p.address, p.city].filter(Boolean).join(" · ")}
          </p>
        )}
        {p.description && (
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
        )}
        <div className="mt-6 border-t border-border pt-4">
          {p.appraisal_value && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Avaliação</span>
              <span className="line-through">{formatBRL(p.appraisal_value)}</span>
            </div>
          )}
          <div className="mt-1 flex items-end justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.22em] text-graphite">Por</span>
            <span className="font-display text-3xl text-foreground">
              {formatBRL(p.price)}
            </span>
          </div>
        </div>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
        >
          Tenho interesse <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </motion.article>
  );
}

function Properties() {
  const fetcher = useServerFn(listFeaturedProperties);
  const [items, setItems] = useState<Property[] | null>(null);

  useEffect(() => {
    fetcher()
      .then((r) => setItems(r.properties as Property[]))
      .catch(() => setItems([]));
  }, [fetcher]);

  return (
    <section id="imoveis" className="border-t border-border py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>Imóveis disponíveis</Eyebrow>
            <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
              Oportunidades <span className="italic">selecionadas</span> agora.
            </h2>
            <p className="mt-5 text-base text-muted-foreground">
              Imóveis com curadoria — leilões, licitações e venda direta — abaixo
              do valor de mercado.
            </p>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items === null && (
            <>
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[480px] animate-pulse border border-border bg-secondary/40" />
              ))}
            </>
          )}
          {items && items.length === 0 && (
            <div className="col-span-full border border-dashed border-border p-16 text-center text-sm text-muted-foreground">
              Em breve novas oportunidades. Cadastre-se para receber em primeira mão.
            </div>
          )}
          {items && items.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function BenefitsImpl() {
  const items = [
    { title: "Curadoria Especializada", text: "Seleção das melhores oportunidades." },
    { title: "Análise de Potencial", text: "Avaliação de valorização e retorno." },
    { title: "Segurança Jurídica", text: "Acompanhamento completo do processo." },
    { title: "Atendimento Consultivo", text: "Suporte do início ao fim." },
  ];
  return (
    <section id="beneficios" className="border-t border-border bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Benefícios</div>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Por que investir com a Ícaro Imóveis?
          </h2>
        </motion.div>
        <div className="mt-16 overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_30px_80px_-44px_rgba(16,16,16,0.12)]">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`grid gap-4 px-8 py-7 ${idx < items.length - 1 ? "border-b border-border" : ""}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-display text-2xl text-gold">0{idx + 1}</span>
                  <h3 className="text-xl text-foreground">{item.title}</h3>
                </div>
                <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">0{idx + 1}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Opportunities() {
  const items = [
    { icon: Building2, title: "Imóveis Caixa", text: "Acesso a imóveis com condições especiais e descontos da Caixa Econômica." },
    { icon: Gavel, title: "Leilões Imobiliários", text: "Análise e seleção de imóveis em leilão com alto potencial." },
    { icon: Banknote, title: "Imóveis para Renda", text: "Ativos selecionados para rentabilidade mensal consistente." },
    { icon: Repeat, title: "Imóveis para Revenda", text: "Oportunidades de curto prazo com margem de valorização." },
  ];
  return (
    <section id="oportunidades" className="relative overflow-hidden bg-foreground py-28 text-background lg:py-36">
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),transparent_32%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-gold-soft">
            <span className="h-px w-8 bg-gold" /> Oportunidades
          </div>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Oportunidades que podem <span className="italic text-gold">gerar patrimônio</span>.
          </h2>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 p-8 text-background transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <it.icon className="h-7 w-7 text-gold-soft" strokeWidth={1.4} />
                <span className="font-display text-sm text-gold/60">0{idx + 1}</span>
              </div>
              <h3 className="mt-10 text-xl">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/75">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Region() {
  const cities = [
    "Estado de São Paulo",
    "São José dos Campos",
    "Jacareí",
    "Taubaté",
    "Caçapava",
    "Pindamonhangaba",
    "Vale do Paraíba",
  ];
  return (
    <section className="border-t border-border py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div {...fadeUp}>
          <Eyebrow>Região de atuação</Eyebrow>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Atuação em todo o{" "}
            <span className="italic">Estado de São Paulo</span>.
          </h2>
          <p className="mt-5 text-base text-muted-foreground">
            Conectando investidores às melhores oportunidades imobiliárias do
            estado, com presença estratégica em São José dos Campos e Vale do
            Paraíba.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Atuamos na prospecção e análise de oportunidades imobiliárias em
            todo o Estado de São Paulo, com especialização em imóveis Caixa,
            imóveis abaixo do valor de mercado, leilões e investimentos
            patrimoniais. Nossa atuação possui forte presença em São José dos
            Campos e em toda a região do Vale do Paraíba — um dos polos
            econômicos mais relevantes do país.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {cities.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 border border-border bg-secondary/50 px-4 py-2 text-xs tracking-wide text-graphite"
              >
                <MapPin className="h-3 w-3 text-gold" /> {c}
              </span>
            ))}
          </div>
          <p className="mt-8 font-display text-lg italic text-graphite">
            “Identificamos oportunidades com potencial de valorização em todo o
            Estado de São Paulo.”
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="relative flex items-center justify-center">
          <StateMap />
        </motion.div>
      </div>
    </section>
  );
}

function StateMap() {
  // Use a provided raster image for the State map. Place the image at src/assets/mapa-vale-do-paraiba.png
  return (
    <div className="relative aspect-square w-full max-w-lg">
      <img
        src={regionMap}
        alt="Região de atuação — Vale do Paraíba"
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Consegui adquirir um imóvel abaixo do valor de mercado com total segurança.",
      name: "Investidor",
      role: "São José dos Campos",
    },
    {
      quote: "Excelente suporte durante todo o processo de compra.",
      name: "Cliente Caixa",
      role: "Jacareí",
    },
    {
      quote:
        "Atendimento consultivo e oportunidades que realmente fazem sentido.",
      name: "Empresário",
      role: "Taubaté",
    },
  ];
  return (
    <section className="border-t border-border bg-secondary/40 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Depoimentos</Eyebrow>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Resultados que falam por si.
          </h2>
        </motion.div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {items.map((t, idx) => (
            <motion.figure
              key={t.quote}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex h-full flex-col justify-between border border-border bg-background p-8"
            >
              <span className="font-display text-5xl leading-none text-gold">“</span>
              <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.role}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { register, handleSubmit, formState, reset } = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
  });
  const [sent, setSent] = useState(false);

  const onSubmit = (data: LeadForm) => {
    const msg = encodeURIComponent(
      `Olá Ícaro! Sou ${data.nome} (${data.telefone} · ${data.email}) e gostaria de receber oportunidades de investimento imobiliário.`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    setSent(true);
    reset();
  };

  return (
    <section id="contato" className="bg-background py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[0.95fr_0.85fr] lg:gap-20 lg:px-10">
        <motion.div {...fadeUp} className="flex flex-col justify-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-gold">Cadastre-se</div>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Receba oportunidades imobiliárias <span className="italic text-gold">antes do mercado</span>.
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground">
            Cadastre-se para receber oportunidades selecionadas diretamente no
            WhatsApp, com curadoria e análise de potencial.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-graphite">
            {[
              "Sem spam — apenas oportunidades reais",
              "Análise de valorização incluída",
              "Atendimento humano e consultivo",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 h-px w-8 flex-shrink-0 bg-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[1.75rem] border border-border bg-white p-10 shadow-[0_40px_90px_-70px_rgba(16,16,16,0.25)]"
        >
          <div className="mb-8 border-b border-border pb-6 text-sm uppercase tracking-[0.28em] text-muted-foreground">
            Preencha seus dados
          </div>
          <Field
            icon={<UserIcon className="h-4 w-4" />}
            label="Nome"
            error={formState.errors.nome?.message}
            {...register("nome")}
          />
          <Field
            icon={<Phone className="h-4 w-4" />}
            label="Telefone"
            type="tel"
            placeholder="(12) 99999-9999"
            error={formState.errors.telefone?.message}
            {...register("telefone")}
          />
          <Field
            icon={<Mail className="h-4 w-4" />}
            label="E-mail"
            type="email"
            error={formState.errors.email?.message}
            {...register("email")}
          />
          <button
            type="submit"
            className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
          >
            Quero receber oportunidades
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
          {sent && (
            <p className="mt-4 text-center text-xs text-gold">
              Quase lá — finalize o envio pelo WhatsApp.
            </p>
          )}
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Seus dados são tratados com confidencialidade.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

const Field = ({
  icon,
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  label: string;
  error?: string;
}) => (
  <label className="mb-6 block">
    <span className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
      {icon} {label}
    </span>
    <input
      {...props}
      className="w-full border-b border-border bg-transparent py-3 text-sm outline-none transition-colors focus:border-gold"
    />
    {error && <span className="mt-2 block text-xs text-destructive">{error}</span>}
  </label>
);

function Footer() {
  return (
    <footer className="border-t border-border bg-foreground py-16 text-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl">Ícaro</span>
            <span className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
              Imóveis
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm text-background/65">
            Especialista em investimentos imobiliários, imóveis Caixa e
            oportunidades imobiliárias no Vale do Paraíba.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
            Navegação
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-background/75">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-gold-soft">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.28em] text-gold-soft">
            Contato
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-background/75">
            <li>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold-soft"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold-soft"
              >
                <Instagram className="h-4 w-4" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-gold-soft"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-start gap-2 border-t border-background/10 px-6 pt-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <span>© {new Date().getFullYear()} Ícaro Imóveis. Todos os direitos reservados.</span>
        <span>Vale do Paraíba · São Paulo · Brasil</span>
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
    >
      <span className="hidden rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-[0.18em] text-background opacity-0 transition-opacity group-hover:opacity-100 sm:inline-block">
        Falar com especialista
      </span>
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] transition-transform group-hover:scale-105">
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
    </a>
  );
}
