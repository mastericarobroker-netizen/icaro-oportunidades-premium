import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Acesso · Ícaro Imóveis" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link to="/" className="mb-10 flex items-baseline gap-2">
          <span className="font-display text-2xl">Ícaro</span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            Imóveis
          </span>
        </Link>

        <p className="text-[11px] uppercase tracking-[0.32em] text-graphite">
          Acesso desabilitado
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-foreground">
          Login temporariamente indisponível
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          A área autenticada está desabilitada nesta versão do site. Em
          breve, novos artigos e oportunidades serão publicados no blog.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-sm bg-foreground px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-background transition hover:bg-graphite"
          >
            Ir para o Blog
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-sm border border-border px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-foreground transition hover:bg-accent"
          >
            Voltar para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
