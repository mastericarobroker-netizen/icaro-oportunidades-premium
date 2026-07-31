import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PostHeader } from "@/components/blog/PostHeader";
import { fetchPostBySlug, fetchListPosts } from "@/lib/blog.server";
import type { BlogPostMeta } from "@/lib/blog";

type LoaderData = {
  post: NonNullable<Awaited<ReturnType<typeof fetchPostBySlug>>>;
  related: BlogPostMeta[];
};

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }): Promise<LoaderData> => {
    const post = await fetchPostBySlug({ data: { slug: params.slug } });
    if (!post) throw notFound();
    const allPosts = await fetchListPosts();
    const related = allPosts
      .filter((p) => p.slug !== post.slug)
      .slice(0, 3);
    return { post, related };
  },
  head: ({ loader }) => {
    const post = (loader as LoaderData | undefined)?.post;
    if (!post)
      return {
        meta: [{ title: "Artigo · Ícaro Imóveis" }],
      };

    let imageUrl = "https://icaroimoveis.com.br/assets/icaro-hero.jpeg";
    if (post.cover) {
      if (post.cover.startsWith("http")) {
        imageUrl = post.cover;
      } else {
        // Prefer generated OG image: /blog/og-<basename>-1200x630.jpg
        const basename = post.cover.split("/").pop() ?? "cover";
        const nameNoExt = basename.replace(/\.[^.]+$/, "");
        imageUrl = `https://icaroimoveis.com.br/blog/og-${nameNoExt}-1200x630.jpg`;
      }
    }

    return {
      meta: [
        { title: `${post.title} · Ícaro Imóveis` },
        { name: "description", content: post.excerpt ?? "" },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://icaroimoveis.com.br/blog/${post.slug}` },
        { property: "og:image", content: imageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: `https://icaroimoveis.com.br/blog/${post.slug}` }],
    };
  },
  notFoundComponent: () => <PostNotFound />,
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post, related } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-6 lg:px-10">
          <Link to="/" className="inline-flex items-baseline gap-3">
            <span className="font-display text-2xl tracking-tight text-foreground">Ícaro</span>
            <span className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">Imóveis</span>
          </Link>
        </div>
      </header>

      <PostHeader post={post} />

      {post.cover ? (
        <div className="mx-auto max-w-4xl px-6 pt-2 lg:px-0">
          <div className="overflow-hidden rounded-[1.5rem] border border-border bg-foreground/[0.04]">
            <img
              src={post.cover}
              alt={post.title}
              width={1600}
              height={900}
              loading="lazy"
              className="block h-auto w-full object-cover"
              style={{ maxHeight: "420px" }}
            />
          </div>
        </div>
      ) : null}

      <article
        className="prose-blog mx-auto max-w-3xl px-6 pt-12 pb-20 lg:px-0 lg:pt-16 lg:pb-28"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {related.length > 0 ? (
        <section className="border-t border-border bg-foreground/[0.02] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-10 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite">
              <span className="h-px w-8 bg-gold" />
              Continue lendo
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-44px_rgba(16,16,16,0.18)]"
                >
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {p.tags[0] ?? "Artigo"}
                  </div>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-foreground">
                    Ler
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PostNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div className="max-w-md">
        <p className="text-[11px] uppercase tracking-[0.32em] text-graphite">
          404 · Artigo
        </p>
        <h1 className="mt-4 font-display text-5xl tracking-tight text-foreground">
          Não encontramos esse artigo
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Talvez ele tenha sido movido ou nunca tenha existido. Confira a lista
          completa no blog.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-background transition hover:bg-graphite"
        >
          Voltar para o blog
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
