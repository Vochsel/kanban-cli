import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dir, "..");
const svgPath = resolve(root, "public/og.svg");
const pngPath = resolve(root, "public/og.png");

const svg = await readFile(svgPath);
const png = await sharp(svg, { density: 192 })
  .resize(1200, 630, { fit: "contain", background: { r: 250, g: 250, b: 250 } })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(pngPath, png);
console.log(`Rendered ${pngPath} (${png.byteLength.toLocaleString()} bytes)`);
