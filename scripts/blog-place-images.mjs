#!/usr/bin/env node
/**
 * Copies generated blog images from a source dir into each vertical's public/images/blog.
 * Reads manifest from stdin (pipe from blog:image-manifest) or from --manifest=path.
 * Usage:
 *   npm run blog:image-manifest | node scripts/blog-place-images.mjs --source=./assets
 *   node scripts/blog-place-images.mjs --source=./assets --manifest=manifest.json
 *
 * --source: directory containing {id}.jpg files (default: ./assets)
 * --manifest: optional path to JSON manifest file (default: read from stdin)
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

function getStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) resolve("");
    else {
      let data = "";
      process.stdin.on("data", (chunk) => (data += chunk));
      process.stdin.on("end", () => resolve(data));
    }
  });
}

async function main() {
  let manifestJson;
  if (manifestPath && fs.existsSync(manifestPath)) {
    manifestJson = fs.readFileSync(manifestPath, "utf8");
  } else {
    manifestJson = await getStdin();
  }
  if (!manifestJson.trim()) {
    console.error("No manifest. Pipe from: npm run blog:image-manifest | node scripts/blog-place-images.mjs --source=./assets");
    process.exit(1);
  }
  const manifest = JSON.parse(manifestJson);
  if (!Array.isArray(manifest)) {
    console.error("Manifest must be a JSON array.");
    process.exit(1);
  }

  let copied = 0;
  let missing = 0;
  for (const entry of manifest) {
    const { vertical, id, imagePath } = entry;
    const src = path.join(sourceDir, `${id}.jpg`);
    const dest = path.join(root, "verticals", vertical, "public", imagePath.replace(/^\//, ""));
    if (!fs.existsSync(src)) {
      console.warn("Missing:", src);
      missing++;
      continue;
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    console.log("OK", path.relative(root, dest));
    copied++;
  }
  console.log("\nCopied:", copied, "Missing:", missing);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
