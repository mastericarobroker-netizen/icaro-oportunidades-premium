// Tipos e helpers client-safe. Sem imports de gray-matter/marked/Buffer.
// Toda leitura de posts acontece via server fn em "./blog.server".

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
  contentRaw: string;
};

const MONTHS_PT = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export const formatPostDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const day = String(d.getDate()).padStart(2, "0");
    const month = MONTHS_PT[d.getMonth()] ?? "";
    return `${day} de ${month} de ${d.getFullYear()}`;
  } catch {
    return iso;
  }
};
