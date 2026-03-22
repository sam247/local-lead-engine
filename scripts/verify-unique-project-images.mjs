#!/usr/bin/env node
/**
 * Fails if any two JPGs under a vertical's public/images/projects share identical file bytes.
 * Scope: each vertical is checked independently (same binary may exist on two verticals).
 */
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const verticals = ["drains", "access", "surveys", "groundworks"];

function hashFile(absPath) {
  const buf = fs.readFileSync(absPath);
  return crypto.createHash("sha256").update(buf).digest("hex");
}

let failed = false;

for (const v of verticals) {
  const dir = path.join(root, "verticals", v, "public", "images", "projects");
  if (!fs.existsSync(dir)) continue;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".jpg"))
    .map((f) => path.join(dir, f));
  const byHash = new Map();
  for (const abs of files) {
    const h = hashFile(abs);
    if (!byHash.has(h)) byHash.set(h, []);
    byHash.get(h).push(path.relative(root, abs));
  }
  for (const [h, paths] of byHash) {
    if (paths.length > 1) {
      failed = true;
      console.error(`[${v}] duplicate image content (${paths.length} files, sha256 ${h.slice(0, 12)}…):`);
      for (const p of paths) console.error("  ", p);
    }
  }
}

if (failed) {
  console.error("\nverify-unique-project-images: failed (duplicate binaries in a vertical).");
  process.exit(1);
}

console.log("verify-unique-project-images: no duplicate project JPGs within any vertical.");
