// Arquivo `.server.ts` → nunca bundlado para o client pelo TanStack Start.
// A lógica de parsing de Markdown acontece somente no servidor.
import matter from "gray-matter";
import { marked } from "marked";
import { createServerFn } from "@tanstack/react-start";

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  cardCover?: string;
  author: string;
  publishedAt: string; // ISO date (yyyy-mm-dd)
  tags: string[];
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
  contentRaw: string;
};

const POSTS_GLOB = import.meta.glob<string>("/src/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
};

const parsePost = (raw: string, slugFromPath: string): BlogPost => {
  const { data, content } = matter(raw);

  const slug = String(data.slug ?? slugFromPath);
  const title = String(data.title ?? slug);
  const excerpt = String(data.excerpt ?? "");
  const cover = String(data.cover ?? "");
  const cardCover = typeof data.cardCover === "string" ? data.cardCover : cover;
  const author = String(data.author ?? "Ícaro");
  const publishedAt = String(
    data.publishedAt ?? new Date().toISOString().slice(0, 10),
  );
  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
  const readingTime = Number(
    data.readingTime ??
      Math.max(1, Math.round(content.split(/\s+/).length / 200)),
  );

  const contentHtml = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title,
    excerpt,
    cover,
    cardCover,
    author,
    publishedAt,
    tags,
    readingTime,
    contentHtml,
    contentRaw: content,
  };
};

const collectPosts = (): BlogPost[] => {
  return Object.entries(POSTS_GLOB)
    .map(([path, raw]) => {
      const slugFromPath = path.split("/").pop()?.replace(/\.md$/, "") ?? "";
      return parsePost(raw, slugFromPath);
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
};

export const formatPostDate = formatDate;

export const fetchListPosts = createServerFn({ method: "GET" }).handler(
  (): BlogPostMeta[] => {
    return collectPosts().map(
      ({ contentHtml: _h, contentRaw: _r, ...meta }) => meta,
    );
  },
);

export const fetchPostBySlug = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    if (typeof input !== "object" || input === null)
      throw new Error("invalid input");
    const slug = (input as { slug?: unknown }).slug;
    if (typeof slug !== "string") throw new Error("slug must be a string");
    return { slug };
  })
  .handler(({ data }): BlogPost | null => {
    const target = collectPosts().find(
      (p) => p.slug === data.slug || p.slug.startsWith(`${data.slug}-`) ||
        // Slug opcional derivado do filename
        false,
    );
    // Estratégia: aceita tanto slug do frontmatter quanto do filename
    return (
      collectPosts().find((p) => {
        if (p.slug === data.slug) return true;
        // permite encontrar pelo slug do filename quando frontmatter não define slug
        return false;
      }) ?? null
    );
  });

/**
 * Lookup direto (server-side, fora de server fn). Usado em head() e loaders.
 */
export const getPostBySlugDirect = (slug: string): BlogPost | null => {
  return collectPosts().find((p) => p.slug === slug) ?? null;
};

export const listPostsDirect = (): BlogPostMeta[] => {
  return collectPosts().map(
    ({ contentHtml: _h, contentRaw: _r, ...meta }) => meta,
  );
};
