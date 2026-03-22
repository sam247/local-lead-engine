#!/usr/bin/env node
/**
 * Compress JPGs under vertical public folders (and optionally ./assets) for faster loads.
 * Uses a soft byte target: picks the highest JPEG quality that fits under the budget,
 * down to --min-quality. Files that stay above the target are still written (at min quality)
 * and listed as "above target" — no hard failure.
 *
 * Usage:
 *   npm run images:compress
 *   node scripts/compress-public-images.mjs --target-kb=100 --max-width=1600 --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const VERTICALS = ["drains", "access", "surveys", "groundworks"];

function parseArgs(argv) {
  const out = {
    targetKb: 100,
    maxWidth: 1600,
    minQuality: 48,
    maxQuality: 88,
    dryRun: false,
    verbose: false,
    includeAssets: false,
  };
  for (const a of argv) {
    if (a === "--dry-run") out.dryRun = true;
    else if (a === "--verbose" || a === "-v") out.verbose = true;
    else if (a === "--include-assets") out.includeAssets = true;
    else if (a.startsWith("--target-kb=")) out.targetKb = Number(a.split("=")[1]);
    else if (a.startsWith("--max-width=")) out.maxWidth = Number(a.split("=")[1]);
    else if (a.startsWith("--min-quality=")) out.minQuality = Number(a.split("=")[1]);
    else if (a.startsWith("--max-quality=")) out.maxQuality = Number(a.split("=")[1]);
  }
  return out;
}

function* walkJpg(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) yield* walkJpg(full);
    else if (e.isFile() && /\.jpe?g$/i.test(e.name)) yield full;
  }
}

function collectPaths(opts) {
  const paths = [];
  for (const v of VERTICALS) {
    const base = path.join(root, "verticals", v, "public", "images");
    for (const p of walkJpg(base)) paths.push(p);
  }
  if (opts.includeAssets) {
    const assetsDir = path.join(root, "assets");
    for (const p of walkJpg(assetsDir)) paths.push(p);
  }
  return paths.sort();
}

function encodeJpeg(sharp, inputBuffer, maxWidth, quality) {
  return sharp(inputBuffer)
    .rotate()
    .resize(maxWidth, null, { fit: "inside", withoutEnlargement: true })
    .jpeg({
      quality: Math.round(quality),
      mozjpeg: true,
      progressive: true,
      chromaSubsampling: "4:2:0",
    })
    .toBuffer();
}

/**
 * Highest quality in [minQ, maxQ] such that size <= targetBytes; if none, returns minQ buffer.
 */
async function tuneQuality(sharp, inputBuffer, maxWidth, targetBytes, minQ, maxQ) {
  let bestBuf = null;
  let bestQ = minQ;
  let lo = minQ;
  let hi = maxQ;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const buf = await encodeJpeg(sharp, inputBuffer, maxWidth, mid);
    if (buf.length <= targetBytes) {
      bestBuf = buf;
      bestQ = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  if (!bestBuf) {
    bestBuf = await encodeJpeg(sharp, inputBuffer, maxWidth, minQ);
    bestQ = minQ;
  }
  return { buffer: bestBuf, quality: bestQ };
}

function fmtKb(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const targetBytes = Math.round(opts.targetKb * 1024);
  if (!Number.isFinite(targetBytes) || targetBytes < 5000) {
    console.error("Invalid --target-kb");
    process.exit(1);
  }

  let sharp;
  try {
    sharp = (await import("sharp")).default;
  } catch {
    console.error("Missing dependency: install with `yarn add -D -W sharp` (or npm equivalent at repo root).");
    process.exit(1);
  }

  const paths = collectPaths(opts);
  if (paths.length === 0) {
    console.log("compress-public-images: no JPGs found.");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;
  let written = 0;
  let skipped = 0;
  const aboveTarget = [];

  for (const filePath of paths) {
    const inputBuffer = fs.readFileSync(filePath);
    const before = inputBuffer.length;
    totalBefore += before;

    const { buffer: outBuf, quality: qUsed } = await tuneQuality(
      sharp,
      inputBuffer,
      opts.maxWidth,
      targetBytes,
      opts.minQuality,
      opts.maxQuality
    );
    const after = outBuf.length;
    const over = after > targetBytes;
    if (over) aboveTarget.push({ filePath, bytes: after, quality: qUsed });

    if (after >= before) {
      skipped += 1;
      totalAfter += before;
      if (opts.verbose) console.log(`skip (no savings): ${path.relative(root, filePath)}`);
      continue;
    }

    totalAfter += after;

    if (opts.dryRun) {
      written += 1;
      console.log(
        `${path.relative(root, filePath)}  ${fmtKb(before)} → ${fmtKb(after)}  q≈${qUsed}${over ? "  (above target)" : ""}`
      );
      continue;
    }

    fs.writeFileSync(filePath, outBuf);
    written += 1;
    if (opts.verbose) {
      console.log(
        `${path.relative(root, filePath)}  ${fmtKb(before)} → ${fmtKb(after)}  q≈${qUsed}${over ? "  (above target)" : ""}`
      );
    }
  }

  console.log(
    `compress-public-images: ${paths.length} file(s), target ~${opts.targetKb} KB, max width ${opts.maxWidth}px`
  );
  console.log(`  Total: ${fmtKb(totalBefore)} → ${fmtKb(totalAfter)} (${written} processed, ${skipped} unchanged)`);
  if (opts.dryRun) console.log("  (dry-run: no files written)");

  if (aboveTarget.length > 0) {
    console.log(`  Soft target: ${aboveTarget.length} file(s) still above ~${opts.targetKb} KB (min quality ${opts.minQuality}):`);
    for (const { filePath, bytes, quality } of aboveTarget.slice(0, 15)) {
      console.log(`    ${fmtKb(bytes)} @ q${quality}  ${path.relative(root, filePath)}`);
    }
    if (aboveTarget.length > 15) console.log(`    … and ${aboveTarget.length - 15} more`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
