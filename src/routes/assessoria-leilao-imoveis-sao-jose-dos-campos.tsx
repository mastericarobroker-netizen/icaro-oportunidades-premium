import { createFileRoute } from "@tanstack/react-router";
import profileWebp from "@/assets/icaro-foto-perfil-768.webp";

const canonicalUrl =
  "https://www.icaroimoveis.com.br/assessoria-leilao-imoveis-sao-jose-dos-campos";
const pageTitle = "Assessoria em Leilão de Imóveis em São José dos Campos";
const pageDescription =
  "Assessoria em leilão extrajudicial de imóveis em São José dos Campos: análise de edital, riscos e lance seguro com corretor CRECI.";
const whatsappNumber = "5512991968709";
const whatsappMessage = encodeURIComponent(
  "Olá Ícaro, quero ajuda para analisar um imóvel de leilão",
);
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const faqItems = [
  {
    question: "Leilão extrajudicial é seguro?",
    answer:
      "É um procedimento previsto em lei, mas a segurança depende da análise do edital, da matrícula e da ocupação do imóvel. Por isso, a assessoria e a análise do caso vêm antes do lance.",
  },
  {
    question: "Qual a diferença entre leilão judicial e extrajudicial?",
    answer:
      "O leilão judicial ocorre em um processo conduzido pelo Poder Judiciário. O extrajudicial é promovido fora de um processo judicial, normalmente pelo credor, seguindo a legislação aplicável e as condições do edital.",
  },
  {
    question: "Preciso pagar à vista?",
    answer:
      "Depende do edital. Em geral, há previsão de pagamento à vista, mas alguns editais podem aceitar financiamento. Confira sempre as condições específicas do imóvel.",
  },
  {
    question: "O imóvel pode estar ocupado?",
    answer:
      "Sim. A ocupação deve ser avaliada antes do lance, pois a desocupação pode envolver custos, providências e prazos que variam conforme cada situação.",
  },
  {
    question: "Quanto custa a assessoria?",
    answer:
      "A assessoria é remunerada por comissão calculada sobre o valor da compra. O percentual e as condições são informados antes da contratação.",
  },
  {
    question: "Quais custos existem além do lance?",
    answer:
      "Podem existir comissão do leiloeiro, ITBI, despesas de escritura ou registro, débitos atribuídos ao comprador conforme o edital e eventuais custos de reforma. Os valores dependem do imóvel e das regras da venda.",
  },
];

const pageStructuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Assessoria em leilão extrajudicial de imóveis",
      serviceType: "Assessoria para análise e compra de imóveis em leilão extrajudicial",
      description: pageDescription,
      url: canonicalUrl,
      areaServed: [
        { "@type": "City", name: "São José dos Campos" },
        { "@type": "City", name: "Jacareí" },
        { "@type": "City", name: "Caçapava" },
      ],
      provider: {
        "@type": "RealEstateAgent",
        name: "Ícaro Imóveis",
        url: "https://www.icaroimoveis.com.br/",
        telephone: "+55-12-99196-8709",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
}).replace(/</g, "\\u003c");

export const Route = createFileRoute("/assessoria-leilao-imoveis-sao-jose-dos-campos")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { name: "robots", content: "index,follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ícaro Imóveis" },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:url", content: canonicalUrl },
      {
        property: "og:image",
        content: "https://www.icaroimoveis.com.br" + profileWebp,
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      {
        name: "twitter:image",
        content: "https://www.icaroimoveis.com.br" + profileWebp,
      },
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
    scripts: [
      {
        attrs: { type: "application/ld+json" },
        children: pageStructuredData,
      },
    ],
  }),
  component: AuctionAdvisoryPage,
});

function AuctionAdvisoryPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="/" className="flex items-baseline gap-2" aria-label="Ícaro Imóveis — início">
            <span className="font-display text-2xl">Ícaro</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              Imóveis
            </span>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-sm bg-foreground px-5 py-3 text-[10px] uppercase tracking-[0.16em] text-background transition hover:bg-graphite sm:inline-flex"
          >
            Falar no WhatsApp
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border bg-secondary/35 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-gold">
                <span className="h-px w-8 bg-gold" /> Assessoria imobiliária · Vale do Paraíba
              </div>
              <h1 className="mt-7 font-display text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Assessoria em Leilão Extrajudicial de Imóveis em São José dos Campos
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground lg:text-lg">
                Comprar um imóvel em leilão extrajudicial pode oferecer desconto, mas exige analisar
                edital, matrícula e ocupação antes do lance. Sou Ícaro, corretor de imóveis em São
                José dos Campos (CRECI/SP 324595-F), e acompanho essa análise, do edital à
                arrematação, em São José dos Campos, Jacareí, Caçapava e região.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex items-center justify-center rounded-sm bg-foreground px-7 py-4 text-[11px] uppercase tracking-[0.18em] text-background transition hover:bg-graphite"
              >
                Falar no WhatsApp
              </a>
              <p className="mt-4 text-xs text-muted-foreground">
                Atendimento consultivo. Cada oportunidade precisa ser avaliada individualmente.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
                Entenda o processo
              </p>
              <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                O que é leilão extrajudicial de imóveis
              </h2>
            </div>
            <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                É uma forma de venda promovida pelo credor quando há inadimplência de um
                financiamento garantido pelo próprio imóvel por alienação fiduciária. O procedimento
                ocorre fora de um processo judicial e segue a legislação aplicável e as regras
                descritas no edital.
              </p>
              <p>
                O edital informa as condições da venda e costuma indicar datas e valores mínimos
                diferentes para cada etapa. Os detalhes variam conforme o contrato, o imóvel e o
                edital — por isso, vale ler os documentos antes de decidir participar.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
                Do planejamento ao registro
              </p>
              <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                Como funciona a minha assessoria
              </h2>
            </div>
            <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                [
                  "Conversa inicial",
                  "Entendo seu objetivo — moradia, renda ou revenda —, orçamento e prazo para a compra.",
                ],
                [
                  "Seleção de oportunidades",
                  "Buscamos imóveis em São José dos Campos e região de acordo com o perfil e os critérios definidos.",
                ],
                [
                  "Edital e matrícula",
                  "Analisamos informações disponíveis sobre o imóvel, condições de pagamento, situação registral e responsabilidades indicadas nos documentos.",
                ],
                [
                  "Ocupação e riscos",
                  "Verificamos as informações de ocupação disponíveis e os riscos que podem afetar custo, prazo e decisão de compra.",
                ],
                [
                  "Cálculo de viabilidade",
                  "Estimamos custos e cenários para ajudar na decisão. Você também pode usar o simulador de viabilidade.",
                ],
                [
                  "Orientação no processo",
                  "Acompanho a participação e, após a arrematação, oriento os próximos passos documentais e de registro.",
                ],
              ].map(([title, text], index) => (
                <li key={title} className="rounded border border-border bg-background p-7">
                  <span className="font-display text-sm text-gold">0{index + 1}</span>
                  <h3 className="mt-4 font-display text-2xl">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
            <a
              href="https://calc.icaroimoveis.com.br"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs uppercase tracking-[0.16em] text-foreground hover:text-gold"
            >
              Acessar o simulador de viabilidade
            </a>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
                Análise antes do lance
              </p>
              <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                Riscos que analiso antes de dar o lance
              </h2>
            </div>
            <div>
              <ul className="space-y-4 text-sm leading-7 text-muted-foreground">
                <li className="border-b border-border pb-4">
                  <strong className="text-foreground">Ocupação:</strong> situação conhecida,
                  possíveis providências para desocupação, custos e prazos envolvidos.
                </li>
                <li className="border-b border-border pb-4">
                  <strong className="text-foreground">Condomínio e IPTU:</strong> débitos existentes
                  e quem pode responder por eles, conforme legislação aplicável e o edital.
                </li>
                <li className="border-b border-border pb-4">
                  <strong className="text-foreground">Matrícula:</strong> registros, ônus e
                  informações que possam influenciar a aquisição.
                </li>
                <li className="border-b border-border pb-4">
                  <strong className="text-foreground">Custos adicionais:</strong> comissão do
                  leiloeiro, ITBI, registro, eventuais débitos e reformas.
                </li>
                <li className="pb-4">
                  <strong className="text-foreground">Direito de preferência:</strong> possibilidade
                  de exercício pelo devedor, quando aplicável, e condições e prazo previstos no
                  edital e na legislação.
                </li>
              </ul>
              <p className="mt-7 border-l-2 border-gold pl-5 font-display text-xl italic leading-relaxed text-foreground">
                Leilão não é promessa de lucro. Cada caso depende do edital e do imóvel, por isso a
                análise vem antes do lance.
              </p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-foreground py-20 text-background lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.32em] text-gold-soft">
              Casos e análises
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">
              Vale a pena comprar imóvel em leilão? Veja casos reais
            </h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              <VideoEmbed
                id="JhHOpUfQ2vI"
                title="Análise de imóvel Caixa anunciado por R$ 280 mil e vendido por R$ 117 mil"
                context="Neste vídeo, acompanho um caso real de imóvel Caixa e os pontos que merecem atenção antes de avaliar uma oportunidade."
              />
              <VideoEmbed
                id="-ESoci64-RU"
                title="Análise de apartamento de R$ 350 mil por R$ 180 mil em São José dos Campos"
                context="Uma análise de apartamento em São José dos Campos para discutir preço, contexto e fatores a considerar na decisão."
              />
              <VideoEmbed
                id="Xlmifm7DDKA"
                title="Terreno em leilão no Urbanova VII, em São José dos Campos"
                context="Veja uma avaliação de terreno em leilão no Urbanova VII e os riscos e informações relevantes para examinar."
              />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10 lg:py-28">
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-secondary/30">
            <img
              src={profileWebp}
              alt="Ícaro, corretor de imóveis CRECI/SP 324595-F, atendendo clientes em São José dos Campos"
              width={768}
              height={1024}
              loading="lazy"
              decoding="async"
              className="h-full max-h-[560px] w-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-gold">
              Experiência e atendimento
            </p>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
              Sobre o corretor
            </h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Sou Ícaro, corretor de imóveis há 10 anos (CRECI/SP 324595-F). Ao longo da minha
              atuação, analisei diversos imóveis de leilão e oportunidades da Caixa, ajudando
              clientes a avaliar documentos, custos e riscos antes de tomar uma decisão.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.14em]">
              <a
                href="https://www.instagram.com/icarocorretordeimoveis/"
                target="_blank"
                rel="noreferrer"
                className="border-b border-border pb-1 hover:border-gold"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/@icarocorretordeimoveis_sjc"
                target="_blank"
                rel="noreferrer"
                className="border-b border-border pb-1 hover:border-gold"
              >
                YouTube
              </a>
              <a
                href="https://www.linkedin.com/in/%C3%ADcaro-carlos-ribeiro-silva-712056366/"
                target="_blank"
                rel="noreferrer"
                className="border-b border-border pb-1 hover:border-gold"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display text-3xl">Regiões atendidas</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Atendimento em São José dos Campos, Jacareí e Caçapava, com possibilidade de análise
              de oportunidades em outras cidades do Vale do Paraíba.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
          <p className="text-[10px] uppercase tracking-[0.32em] text-gold">Dúvidas comuns</p>
          <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
            Perguntas frequentes sobre assessoria em leilões
          </h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqItems.map(({ question, answer }) => (
              <article key={question} className="py-6">
                <h3 className="font-display text-xl sm:text-2xl">{question}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-secondary/30 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <h2 className="font-display text-2xl">Continue sua pesquisa</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Veja também o artigo sobre os cuidados para quem avalia o primeiro investimento em
              leilões judiciais.
            </p>
            <a
              href="/blog/leiloes-judiciais-primeiro-investimento"
              className="mt-5 inline-flex items-center gap-2 border-b border-gold pb-1 text-xs uppercase tracking-[0.16em] hover:text-gold"
            >
              Leilões judiciais: vale a pena para o primeiro investimento?
            </a>
          </div>
        </section>

        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.32em] text-gold">Próximo passo</p>
            <h2 className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
              Quer analisar um imóvel de leilão antes de decidir?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
              Converse comigo sobre o imóvel, o edital e os riscos que precisam ser considerados no
              seu caso.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-sm bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.18em] text-background transition hover:bg-graphite"
            >
              Falar com o especialista no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-foreground py-8 text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-background/65 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <a href="/" className="font-display text-lg text-background">
            Ícaro Imóveis
          </a>
          <a href="/blog/leiloes-judiciais-primeiro-investimento" className="hover:text-gold-soft">
            Artigo relacionado sobre leilões
          </a>
          <span>CRECI/SP 324595-F · Vale do Paraíba</span>
        </div>
      </footer>
    </div>
  );
}

function VideoEmbed({ id, title, context }: { id: string; title: string; context: string }) {
  return (
    <article>
      <p className="mb-4 text-sm leading-7 text-background/75">{context}</p>
      <div className="aspect-video overflow-hidden rounded border border-white/15 bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          width="560"
          height="315"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </article>
  );
}
