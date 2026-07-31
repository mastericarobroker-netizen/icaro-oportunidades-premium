import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { fetchListPosts } from "@/lib/blog.server";
import { PostCard } from "@/components/blog/PostCard";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog · Ícaro Imóveis — Mercado, Caixa e Investimentos" },
      {
        name: "description",
        content:
          "Artigos sobre investimentos imobiliários, imóveis Caixa, leilões e o mercado do Vale do Paraíba.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:url", content: "https://icaroimoveis.com.br/blog/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@icaroimoveis" },
      { property: "og:title", content: "Blog · Ícaro Imóveis" },
      {
        property: "og:description",
        content:
          "Conteúdo sobre mercado imobiliário, curadoria Caixa e estratégias de investimento.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "https://icaroimoveis.com.br/blog/" },
    ],
  }),
  loader: () => fetchListPosts(),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-baseline gap-3"
          >
            <span className="font-display text-2xl tracking-tight text-foreground">Ícaro</span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Imóveis</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="border-b border-border bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite">
              <span className="h-px w-8 bg-gold" />
              Conteúdo & Curadoria
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[0.98] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Blog <span className="italic text-gold">Ícaro</span> Imóveis
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Análises, métodos de curadoria e tendências do mercado imobiliário
              do Vale do Paraíba — escritos a partir da prática de quem está no
              campo toda semana.
            </p>
          </div>
        </section>

        {/* Listagem */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border bg-card/40 px-8 py-20 text-center">
                <p className="font-display text-2xl text-foreground">Em breve</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Novos artigos serão publicados em breve. Volte sempre!
                </p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            )}

            <div className="mt-16 flex justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-sm border border-foreground px-7 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground transition hover:bg-foreground hover:text-background"
              >
                Voltar para a página inicial
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
