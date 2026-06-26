import { Link } from "@tanstack/react-router";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

type PostCardProps = {
  post: BlogPostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[1.25rem] border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-44px_rgba(16,16,16,0.18)]">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="flex h-full flex-col"
      >
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[1.25rem] border-b border-border bg-foreground/[0.06]">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-foreground/5 via-foreground/10 to-gold/10">
              <span className="font-display text-5xl text-foreground/15">Í</span>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-7">
          <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {formatPostDate(post.publishedAt)}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </span>
          </div>
          <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center gap-2 pt-4 text-[11px] uppercase tracking-[0.22em] text-foreground">
            Ler artigo
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
