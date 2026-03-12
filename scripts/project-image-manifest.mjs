#!/usr/bin/env node
/**
 * Outputs a JSON manifest of all projects across verticals for image regeneration.
 * Each entry: { vertical, id, title, imagePath, imagePrompt }.
 * Save generated images to: verticals/{vertical}/public{imagePath}
 *
 * Usage: node scripts/project-image-manifest.mjs
 */

import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const verticals = ["drains", "surveys", "access"];

const all = [];
for (const vertical of verticals) {
  const cwd = path.join(root, "verticals", vertical);
  const result = spawnSync("npx", ["tsx", "export-projects.mts"], {
    cwd,
    encoding: "utf8",
    maxBuffer: 2 * 1024 * 1024,
  });
  if (result.status !== 0) {
    console.error(vertical, result.stderr || result.error);
    continue;
  }
  let projects;
  try {
    projects = JSON.parse(result.stdout.trim());
  } catch (e) {
    console.error(vertical, "Invalid JSON", e.message);
    continue;
  }
  for (const p of projects) {
    all.push({
      vertical,
      id: p.id,
      title: p.title,
      imagePath: p.image,
      imagePrompt: p.imagePrompt || "",
      imageIndex: p.imageIndex ?? 0,
    });
  }
}
console.log(JSON.stringify(all, null, 2));
