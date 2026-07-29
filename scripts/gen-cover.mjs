// scripts/gen-cover.mjs
// Gera capas de blog do zero (1600x900) para qualquer post.
// Usa @resvg/resvg-js para renderizar o SVG (com fontes e <text>)
// e sharp apenas para a composição final com imagem base opcional.
//
// Uso:
//   node scripts/gen-cover.mjs --output <path> --title "Título" --sub "Subtítulo" [--image <path>]
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { existsSync } from "node:fs";
import { rename, unlink } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 1600;
const H = 900;

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};

const OUTPUT = getArg("--output") ? resolve(getArg("--output")) : null;
const TITLE = getArg("--title") || "";
const SUB = getArg("--sub") || "";
const baseImagePath = getArg("--image");
const baseImage = baseImagePath ? resolve(baseImagePath) : null;

const wrapLines = (text, max = 30) => {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const w of words) {
    if ((current + " " + w).trim().length > max && current) {
      lines.push(current.trim());
      current = w;
    } else {
      current = (current + " " + w).trim();
    }
  }
  if (current) lines.push(current);
  return lines;
};

const headlineLines = wrapLines(TITLE, 30);

if (!OUTPUT) {
  console.error(
    "Uso: node scripts/gen-cover.mjs --output <path> --title \"Título\" [--sub \"Sub\"] [--image <path>]",
  );
  process.exit(1);
}

const PAD_LEFT = 80;
const PAD_TOP = 90;
const IMAGE_X = 960;
const IMAGE_W = 580;
const IMAGE_H = H - 200;

const FONT_FAMILY = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";
const baseSize = headlineLines.length <= 3 ? 68 : headlineLines.length <= 4 ? 54 : 44;
const FONT_SIZE = baseSize;
const FONT_WEIGHT = 800;
const LINE_HEIGHT = Math.round(baseSize * 1.18);
const SUB_FONT_SIZE = 22;
const CTA_FONT_SIZE = 16;

const escapeXml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const headlineSpans = headlineLines
  .map((line, i) => {
    const y = PAD_TOP + FONT_SIZE + i * LINE_HEIGHT;
    return `<text x="${PAD_LEFT}" y="${y}"
      font-family="${FONT_FAMILY}"
      font-size="${FONT_SIZE}"
      font-weight="${FONT_WEIGHT}"
      fill="#ffffff"
      letter-spacing="-1.5">${escapeXml(line)}</text>`;
  })
  .join("\n  ");

const subY = PAD_TOP + FONT_SIZE + headlineLines.length * LINE_HEIGHT + 36;
const subSpan = SUB
  ? `<text x="${PAD_LEFT}" y="${subY}"
  font-family="${FONT_FAMILY}"
  font-size="${SUB_FONT_SIZE}"
  font-weight="500"
  fill="#c9a961">${escapeXml(SUB)}</text>`
  : "";

const ctaY = H - 60;
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
  <rect x="${PAD_LEFT}" y="${PAD_TOP - 30}" width="84" height="6" fill="#c9a961"/>
  ${headlineSpans}
  ${subSpan}
  ${ctaSpan}
</svg>`;

// Renderiza o SVG com @resvg/resvg-js (suporta fontes e <text> corretamente)
const resvg = new Resvg(bgSvg, {
  fitTo: { mode: "width", value: W },
  font: { loadSystemFonts: true },
});
const rendered = resvg.render();
const pngBuffer = rendered.asPng();

let pipeline = sharp(pngBuffer);

if (baseImage && existsSync(baseImage)) {
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
console.log(`✓ capa gerada: ${OUTPUT}`);
