// scripts/gen-doc-cover.mjs
// Gera a capa de Documentação Imobiliária do zero (1600x900).
// Usa <text> SVG nativo (sem foreignObject, que falha em renderizar
// HTML em algumas plataformas). Texto é quebrado manualmente em linhas
// para garantir que NENHUMA linha é cortada.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { rename, unlink } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 1600;
const H = 900;
const OUTPUT = resolve(__dirname, "..", "public", "blog", "capa-documentacao-imobiliaria.jpg");

const argImage = process.argv[2];
const baseImage = argImage
  ? resolve(argImage)
  : resolve(__dirname, "..", "public", "blog", "documentacao-base.jpg");

// Margem segura para o texto nunca encostar nas bordas
const PAD_LEFT = 80;
const PAD_TOP = 90;
const TEXT_COL_W = 820;      // coluna do texto (esquerda)
const IMAGE_X = 960;         // início da área da imagem
const IMAGE_W = 580;
const IMAGE_H = H - 200;

// Headline quebrada em linhas manualmente (cada linha cabe em TEXT_COL_W)
const headlineLines = [
  "A documentação de",
  "um imóvel pode definir",
  "o sucesso ou o fracasso",
  "da negociação",
];

const FONT_FAMILY = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONT_SIZE = 54;
const FONT_WEIGHT = 800;
const LINE_HEIGHT = 64;
const SUB_FONT_SIZE = 22;
const CTA_FONT_SIZE = 16;

// Calcula largura aproximada de uma linha em pixels (para centralizar / alinhar)
const approxTextWidth = (text, size, weight = 800) => {
  // Média: char ~0.55em para weight 800, ~0.5em para 500
  const factor = weight >= 700 ? 0.55 : 0.5;
  return text.length * size * factor;
};

let yCursor = PAD_TOP + FONT_SIZE; // baseline da primeira linha

const headlineSpans = headlineLines
  .map((line, i) => {
    const y = PAD_TOP + FONT_SIZE + i * LINE_HEIGHT;
    return `<text x="${PAD_LEFT}" y="${y}"
      font-family="${FONT_FAMILY}"
      font-size="${FONT_SIZE}"
      font-weight="${FONT_WEIGHT}"
      fill="#ffffff"
      letter-spacing="-1.5">${line}</text>`;
  })
  .join("\n  ");

// Subhead abaixo da headline (com espaço seguro)
const subY = PAD_TOP + FONT_SIZE + headlineLines.length * LINE_HEIGHT + 30;
const subSpan = `<text x="${PAD_LEFT}" y="${subY}"
  font-family="${FONT_FAMILY}"
  font-size="${SUB_FONT_SIZE}"
  font-weight="500"
  fill="#c9a961">O que verificar antes de vender ou comprar</text>`;

// CTA no rodapé
const ctaY = H - 70;
const ctaSpan = `<text x="${PAD_LEFT}" y="${ctaY}"
  font-family="${FONT_FAMILY}"
  font-size="${CTA_FONT_SIZE}"
  font-weight="600"
  letter-spacing="4"
  fill="rgba(255,255,255,0.55)">BLOG • ÍCARO OPORTUNIDADES</text>`;

const bgSvg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a1428"/>
      <stop offset="55%" stop-color="#0e1a32"/>
      <stop offset="100%" stop-color="#0a0f1f"/>
    </linearGradient>
    <radialGradient id="r" cx="30%" cy="50%" r="65%">
      <stop offset="0%" stop-color="rgba(25,45,90,0.45)"/>
      <stop offset="100%" stop-color="rgba(10,15,30,0)"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <!-- barra de destaque dourada -->
  <rect x="${PAD_LEFT}" y="${PAD_TOP - 30}" width="84" height="6" fill="#c9a961"/>
  ${headlineSpans}
  ${subSpan}
  ${ctaSpan}
</svg>`;

let pipeline = sharp(Buffer.from(bgSvg));

if (existsSync(baseImage)) {
  const composed = await sharp(baseImage)
    .resize(IMAGE_W, IMAGE_H, {
      fit: "contain",
      background: { r: 10, g: 20, b: 40, alpha: 1 },
    })
    .png()
    .toBuffer();
  pipeline = pipeline.composite([
    { input: composed, left: IMAGE_X, top: 100 },
  ]);
}

const tmp = OUTPUT + ".tmp.jpg";
await pipeline
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(tmp);

try {
  await unlink(OUTPUT);
} catch {}
await rename(tmp, OUTPUT);
console.log(`✓ capa regenerada: ${OUTPUT}`);
