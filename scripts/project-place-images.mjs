#!/usr/bin/env node
/**
 * Copies generated project images from a source dir into each vertical's public/images/projects.
 * One source file per project row: {vertical}-N.jpg where N matches project-{vertical}-N.jpg in imagePath
 * (N = 1..30 from engine generateProjects).
 *
 * Usage:
 *   node scripts/project-image-manifest.mjs > manifest.json
 *   node scripts/project-place-images.mjs --source=./assets --manifest=manifest.json
 */

function slotFromImagePath(imagePath) {
  const m = String(imagePath).match(/project-[a-z]+-(\d+)\.jpg$/i);
  if (!m) return null;
  const n = Number(m[1], 10);
  return Number.isFinite(n) && n >= 1 ? n : null;
}

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
    const { vertical, imagePath, imageIndex } = entry;
    const fromPath = slotFromImagePath(imagePath);
    const slot =
      fromPath ?? (Number.isFinite(Number(imageIndex)) ? (Number(imageIndex) % 30) + 1 : 1);
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
