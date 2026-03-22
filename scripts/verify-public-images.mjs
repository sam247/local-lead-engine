#!/usr/bin/env node
/**
 * Ensures every local /images/... path referenced in each vertical's lib/images.ts
 * exists under that vertical's public/ folder.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const verticals = ["drains", "access", "surveys", "groundworks"];

/** Collect /images/... paths from images.ts source (template ${base}/... and quoted literals). */
function extractLocalImagePaths(content) {
  const out = new Set();
  const reTemplate = /\$\{base\}(\/[^`'"]+)/g;
  let m;
  while ((m = reTemplate.exec(content))) {
    out.add("/images" + m[1]);
  }
  const reQuoted = /"(\/images\/[^"]+\.(?:jpg|jpeg|png|webp|svg))"/g;
  while ((m = reQuoted.exec(content))) {
    out.add(m[1]);
  }
  return [...out];
}

let failed = false;

for (const v of verticals) {
  const tsPath = path.join(root, "verticals", v, "lib", "images.ts");
  const publicRoot = path.join(root, "verticals", v, "public");
  if (!fs.existsSync(tsPath)) {
    console.error(`Missing ${tsPath}`);
    failed = true;
    continue;
  }
  const content = fs.readFileSync(tsPath, "utf8");
  const paths = extractLocalImagePaths(content).filter((p) => !p.includes("${"));
  for (const urlPath of paths) {
    const rel = urlPath.replace(/^\//, "");
    const abs = path.join(publicRoot, rel);
    if (!fs.existsSync(abs)) {
      console.error(`[${v}] missing file for ${urlPath} (expected ${abs})`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("verify-public-images: all referenced local image paths exist.");
