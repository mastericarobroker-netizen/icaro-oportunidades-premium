// scripts/resize-cover.mjs
// Normaliza imagens de capa para o tamanho e proporção padrão do blog.
//
// Uso:
//   node scripts/resize-cover.mjs <input> [output]
//   node scripts/resize-cover.mjs --all   # processa todas em public/blog/
//
// Comportamento:
//   - Se a imagem for "larga demais" (> 16:9), recorta as laterais
//     priorizando o CENTRO (não corta o texto da manchete).
//   - Se for "alta demais" (como 4:5 ou vertical), recorta o rodapé
//     mantendo o TOPO visível (manchete/headline preservada).
//   - Saída: 1600x900 (16:9) JPEG q=82.

import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_BLOG = resolve(__dirname, "..", "public", "blog");

const TARGET_W = 1600;
const TARGET_H = 900; // 16:9
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
    // Imagem mais larga que 16:9 → corta laterais (posição central)
    const newW = Math.round(meta.height * target);
    const left = Math.floor((meta.width - newW) / 2);
    pipeline = pipeline.extract({
      left,
      top: 0,
      width: newW,
      height: meta.height,
    });
  } else if (ratio < target) {
    // Imagem mais alta que 16:9 → corta EMBAIXO (mantém topo/manchete)
    const newH = Math.round(meta.width / target);
    pipeline = pipeline.extract({
      left: 0,
      top: 0,
      width: meta.width,
      height: newH,
    });
  }
  // se ratio === target, só redimensiona

  await mkdir(dirname(output), { recursive: true });
  await pipeline
    .resize(TARGET_W, TARGET_H, { fit: "fill" })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(output);

  console.log(`✓ ${input} → ${output} (${TARGET_W}x${TARGET_H})`);
}

async function processAll() {
  const files = await readdir(PUBLIC_BLOG);
  const images = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  if (images.length === 0) {
    console.log(`Nenhuma imagem em ${PUBLIC_BLOG}`);
    return;
  }
  for (const name of images) {
    const input = join(PUBLIC_BLOG, name);
    const output = join(PUBLIC_BLOG, name);
    await processOne(input, output);
  }
}

const arg = process.argv[2];
if (!arg) {
  console.error(
    "Uso: node scripts/resize-cover.mjs <input> [output] | --all",
  );
  process.exit(1);
} else if (arg === "--all") {
  await processAll();
} else {
  const input = resolve(arg);
  const out = process.argv[3]
    ? resolve(process.argv[3])
    : input.replace(/\.(jpe?g|png|webp)$/i, "-1600x900.jpg");
  await processOne(input, out);
}
