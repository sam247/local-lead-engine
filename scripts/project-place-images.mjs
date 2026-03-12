#!/usr/bin/env node
/**
 * Copies generated project images from a source dir into each vertical's public/images/projects.
 * Projects use 6 images per vertical (by imageIndex). Source files must be named:
 *   {vertical}-1.jpg through {vertical}-6.jpg  (e.g. drains-1.jpg, surveys-3.jpg)
 *
 * Usage:
 *   node scripts/project-image-manifest.mjs > manifest.json
 *   node scripts/project-place-images.mjs --source=./assets --manifest=manifest.json
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const args = process.argv.slice(2);
const sourceArg = args.find((a) => a.startsWith("--source="));
const manifestArg = args.find((a) => a.startsWith("--manifest="));

const sourceDir = sourceArg ? path.resolve(root, sourceArg.replace("--source=", "")) : path.join(root, "assets");
const manifestPath = manifestArg ? path.resolve(root, manifestArg.replace("--manifest=", "")) : null;

async function main() {
  if (!manifestPath || !fs.existsSync(manifestPath)) {
    console.error("Usage: node scripts/project-place-images.mjs --source=./assets --manifest=manifest.json");
    process.exit(1);
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  if (!Array.isArray(manifest)) {
    console.error("Manifest must be a JSON array.");
    process.exit(1);
  }

  let copied = 0;
  let missing = 0;
  for (const entry of manifest) {
    const { vertical, id, imagePath, imageIndex } = entry;
    const slot = (Number(imageIndex) % 6) + 1;
    const src = path.join(sourceDir, `${vertical}-${slot}.jpg`);
    const dest = path.join(root, "verticals", vertical, "public", imagePath.replace(/^\//, ""));
    if (!fs.existsSync(src)) {
      if (missing < 5) console.warn("Missing:", src);
      missing++;
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    copied++;
  }
  console.log("Copied:", copied, "Missing:", missing);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
