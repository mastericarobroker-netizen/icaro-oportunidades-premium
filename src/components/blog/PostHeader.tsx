import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

type PostHeaderProps = {
  post: BlogPostMeta;
};

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-6 pt-16 pb-12 lg:px-0 lg:pt-24">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Voltar para o blog
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <Calendar className="h-3 w-3" />
          {formatPostDate(post.publishedAt)}
        </span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-2">
          <Clock className="h-3 w-3" />
          {post.readingTime} min de leitura
        </span>
        {post.author ? (
          <>
            <span aria-hidden>·</span>
            <span>por {post.author}</span>
          </>
        ) : null}
      </div>

      <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
        {post.title}
      </h1>

      {post.excerpt ? (
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      ) : null}

      {post.tags.length > 0 ? (
        <ul className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-graphite"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
