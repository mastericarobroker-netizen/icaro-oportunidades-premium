import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const publicDir = path.resolve(process.cwd(), 'public');
const candidates = ['favicon-source.png', 'favicon-original.png', 'favicon.png'];
const src = candidates.map(f => path.join(publicDir, f)).find(fs.existsSync);
if (!src) {
  console.error('No source image found. Place your favicon image as public/favicon-source.png or ensure public/favicon.png exists.');
  process.exit(1);
}

const sizes = [16, 32, 48];
try {
  await Promise.all(
    sizes.map(async (s) => {
      const out = path.join(publicDir, `favicon-${s}.png`);
      // Use 'cover' to fill the canvas and reduce empty padding so the logo appears larger
      await sharp(src).resize(s, s, { fit: 'cover', position: 'centre' }).png().toFile(out);
      console.log('Written', out);
    })
  );

  const pngPaths = sizes.map((s) => path.join(publicDir, `favicon-${s}.png`));
  const icoBuffer = await pngToIco(pngPaths);
  const outIco = path.join(publicDir, 'favicon.ico');
  fs.writeFileSync(outIco, icoBuffer);
  console.log('Wrote', outIco);
  console.log('Favicons generated successfully.');
} catch (err) {
  console.error('Error generating favicons:', err);
  process.exit(1);
}
