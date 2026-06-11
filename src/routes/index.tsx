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
import corpoAsset from "@/assets/icaro-corpo.asset.json";
import heroAsset from "@/assets/icaro-hero.jpeg.asset.json";
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#inicio" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-tight">Ícaro</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Imóveis
          </span>
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-graphite transition-colors hover:text-foreground"
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
            className="group inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-background transition-all hover:bg-transparent hover:text-foreground"
          >
            Falar com Especialista
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
        <button
          aria-label="Abrir menu"
          className="lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
              className="mt-3 inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-xs uppercase tracking-[0.18em] text-background"
            >
              Falar com Especialista
            </a>
          </nav>
        </div>
      )}
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
    <section id="inicio" className="relative isolate overflow-hidden pt-32 lg:pt-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-32">
        <motion.div {...fadeUp} className="flex flex-col justify-center">
          <Eyebrow>Investimentos imobiliários · Vale do Paraíba</Eyebrow>
          <h1 className="mt-7 text-balance text-5xl leading-[1.03] tracking-tight lg:text-[4.25rem]">
            Invista em imóveis com{" "}
            <span className="italic text-graphite">inteligência</span>
            <br />e <span className="italic text-graphite">segurança</span>.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            Especialista em imóveis Caixa, oportunidades abaixo do valor de
            mercado e investimentos imobiliários no Vale do Paraíba.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
            >
              Quero receber oportunidades
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-foreground/80 px-7 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
            </a>
          </div>
          <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8 text-left">
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
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <img
              src={heroAsset.url}
              alt="Ícaro — Especialista em Investimentos Imobiliários"
              width={1600}
              height={1200}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-64 bg-background p-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] sm:block">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-gold">
              <Sparkles className="h-3 w-3" /> Curadoria
            </div>
            <p className="mt-3 font-display text-xl leading-snug">
              Oportunidades antes do mercado.
            </p>
          </div>
        </motion.div>
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
    <section id="sobre" className="border-t border-border bg-secondary/40 py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-10">
        <motion.div {...fadeUp} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <img
              src={corpoAsset.url}
              alt="Ícaro — Especialista em Investimentos Imobiliários"
              loading="lazy"
              className="h-full w-full object-cover grayscale-[15%]"
            />
          </div>
        </motion.div>

        <motion.div {...fadeUp} className="flex flex-col justify-center">
          <Eyebrow>Sobre</Eyebrow>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Seu especialista em <span className="italic">investimentos</span>{" "}
            imobiliários.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Atuo auxiliando investidores e compradores a encontrar imóveis com
            alto potencial de valorização, oportunidades Caixa e imóveis de
            leilão — com foco em geração de patrimônio e rentabilidade.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {indicators.map((i) => (
              <div
                key={i}
                className="group flex items-center gap-3 border border-border bg-background px-5 py-5 transition-colors hover:border-gold"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center border border-gold/40 text-gold">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm tracking-wide">{i}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 font-display text-lg italic text-graphite">
            “Patrimônio se constrói com critério, dados e oportunidades certas.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { icon: Sparkles, title: "Curadoria Especializada", text: "Seleção das melhores oportunidades." },
    { icon: LineChart, title: "Análise de Potencial", text: "Avaliação de valorização e retorno." },
    { icon: ShieldCheck, title: "Segurança Jurídica", text: "Acompanhamento completo do processo." },
    { icon: Handshake, title: "Atendimento Consultivo", text: "Suporte do início ao fim." },
  ];
  return (
    <section id="beneficios" className="py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-2xl">
          <Eyebrow>Benefícios</Eyebrow>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Por que investir com a Ícaro Imóveis?
          </h2>
        </motion.div>
        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group relative bg-background p-10 transition-colors hover:bg-secondary/60"
            >
              <it.icon className="h-7 w-7 text-gold" strokeWidth={1.4} />
              <h3 className="mt-8 text-xl">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {it.text}
              </p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
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
    <section id="oportunidades" className="relative bg-foreground py-28 text-background lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-2xl">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-gold-soft">
            <span className="h-px w-8 bg-gold" /> Oportunidades
          </div>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Oportunidades que podem{" "}
            <span className="italic text-gold-soft">gerar patrimônio</span>.
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
              className="group relative overflow-hidden border border-background/15 bg-background/[0.03] p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:bg-background/[0.06]"
            >
              <div className="flex items-center justify-between">
                <it.icon className="h-7 w-7 text-gold-soft" strokeWidth={1.4} />
                <span className="font-display text-sm text-background/40">
                  0{idx + 1}
                </span>
              </div>
              <h3 className="mt-10 text-xl text-background">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/65">
                {it.text}
              </p>
              <ArrowRight className="mt-8 h-4 w-4 text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
  // Stylized minimalist SP state silhouette
  return (
    <div className="relative aspect-square w-full max-w-lg">
      <svg viewBox="0 0 500 500" className="h-full w-full">
        <defs>
          <radialGradient id="glow" cx="58%" cy="48%" r="18%">
            <stop offset="0%" stopColor="oklch(0.86 0.12 80)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.86 0.12 80)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M70,210 C90,170 130,140 180,135 C220,130 250,110 290,115 C340,120 380,100 420,130 C450,155 460,210 445,255 C430,300 440,340 410,370 C375,400 320,395 280,380 C240,370 210,385 170,375 C130,365 95,350 80,310 C68,275 60,250 70,210 Z"
          fill="oklch(0.96 0 0)"
          stroke="var(--graphite)"
          strokeWidth="1.2"
        />
        <circle cx="295" cy="245" r="60" fill="url(#glow)" />
        {/* Vale do Paraíba region */}
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 1 }}
          d="M270,225 C295,215 325,220 345,235 C355,250 350,265 335,272 C310,285 285,280 268,265 C258,250 258,235 270,225 Z"
          fill="var(--gold)"
          fillOpacity="0.18"
          stroke="var(--gold)"
          strokeWidth="1"
        />
        {/* SJC marker */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <circle cx="298" cy="248" r="6" fill="var(--gold)" />
          <circle cx="298" cy="248" r="14" fill="none" stroke="var(--gold)" strokeOpacity="0.4" />
          <circle cx="298" cy="248" r="22" fill="none" stroke="var(--gold)" strokeOpacity="0.2" />
          <line x1="298" y1="248" x2="370" y2="190" stroke="var(--graphite)" strokeWidth="0.8" />
          <text x="376" y="188" fontSize="12" fill="var(--graphite)" fontFamily="Inter">
            São José dos Campos
          </text>
          <text x="376" y="204" fontSize="9" fill="var(--gold)" letterSpacing="2" fontFamily="Inter">
            VALE DO PARAÍBA
          </text>
        </motion.g>
      </svg>
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
    <section id="contato" className="py-28 lg:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div {...fadeUp}>
          <Eyebrow>Cadastre-se</Eyebrow>
          <h2 className="mt-6 text-4xl leading-tight lg:text-5xl">
            Receba oportunidades imobiliárias{" "}
            <span className="italic">antes do mercado</span>.
          </h2>
          <p className="mt-6 text-base text-muted-foreground">
            Cadastre-se para receber oportunidades selecionadas diretamente no
            WhatsApp, com curadoria e análise de potencial.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-graphite">
            {["Sem spam — apenas oportunidades reais", "Análise de valorização incluída", "Atendimento humano e consultivo"].map(
              (i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-px w-6 bg-gold" /> {i}
                </li>
              ),
            )}
          </ul>
        </motion.div>

        <motion.form
          {...fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          className="border border-border bg-background p-8 lg:p-10"
        >
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
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 bg-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] text-background transition-transform hover:-translate-y-0.5"
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
