// scripts/generate-og-images.mjs
// Gera imagens Open Graph otimizadas (1200x630) a partir das capas em public/blog/
// Saída: public/blog/og-<basename>-1200x630.jpg
// Uso:
//   node scripts/generate-og-images.mjs --all
//   node scripts/generate-og-images.mjs <input-file>

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_BLOG = resolve(__dirname, "..", "public", "blog");

const TARGET_W = 1200;
const TARGET_H = 630; // ~1.90476
const QUALITY = 82;

async function processOne(input, output) {
  const meta = await sharp(input).metadata();
  if (!meta.width || !meta.height) {
    console.error(`✗ ${input}: sem metadados`);
    return;
  }
  const ratio = meta.width / meta.height;
  const target = TARGET_W / TARGET_H;
  let pipeline = sharp(input);

  if (ratio > target) {
    // imagem mais larga → corta laterais (centro)
    const newW = Math.round(meta.height * target);
    const left = Math.floor((meta.width - newW) / 2);
    pipeline = pipeline.extract({ left, top: 0, width: newW, height: meta.height });
  } else if (ratio < target) {
    // imagem mais alta → corta embaixo (mantém topo)
    const newH = Math.round(meta.width / target);
    pipeline = pipeline.extract({ left: 0, top: 0, width: meta.width, height: newH });
  }

  await mkdir(dirname(output), { recursive: true });
  await pipeline
    .resize(TARGET_W, TARGET_H, { fit: "fill" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(output);

  console.log(`✓ ${input} → ${output} (${TARGET_W}x${TARGET_H})`);
}

async function processAll() {
  const files = await readdir(PUBLIC_BLOG);
  const images = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !/^og-/i.test(f));
  if (images.length === 0) {
    console.log(`Nenhuma imagem em ${PUBLIC_BLOG}`);
    return;
  }
  for (const name of images) {
    const input = join(PUBLIC_BLOG, name);
    const base = name.replace(/\.[^.]+$/, "");
    const output = join(PUBLIC_BLOG, `og-${base}-1200x630.jpg`);
    await processOne(input, output);
  }
}

const arg = process.argv[2];
if (!arg) {
  console.error("Uso: node scripts/generate-og-images.mjs <input> | --all");
  process.exit(1);
} else if (arg === "--all") {
  await processAll();
} else {
  const input = resolve(arg);
  const base = input.split(/[\\/]/).pop().replace(/\.[^.]+$/, "");
  const out = process.argv[3]
    ? resolve(process.argv[3])
    : join(PUBLIC_BLOG, `og-${base}-1200x630.jpg`);
  await processOne(input, out);
}
