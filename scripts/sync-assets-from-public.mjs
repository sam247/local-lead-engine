#!/usr/bin/env node
/**
 * Fills ./assets from existing vertical public/ images so blog:place-images and
 * project:place-images can run (round-trip or CI) without external generation.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assets = path.join(root, "assets");

function readBlogManifest() {
  const out = execSync("node scripts/blog-image-manifest.mjs", {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  return JSON.parse(out.trim());
}

fs.mkdirSync(assets, { recursive: true });

let blog = 0;
for (const e of readBlogManifest()) {
  const src = path.join(root, "verticals", e.vertical, "public", e.imagePath.replace(/^\//, ""));
  const dest = path.join(assets, `${e.id}.jpg`);
  if (!fs.existsSync(src)) {
    console.warn("Blog missing source:", src);
    continue;
  }
  fs.copyFileSync(src, dest);
  blog++;
}

const projectSlots = {
  drains: (n) => path.join(root, "verticals", "drains", "public", "images", "projects", `project-${n}.jpg`),
  access: (n) => path.join(root, "verticals", "access", "public", "images", "projects", `project-access-${n}.jpg`),
  surveys: (n) => path.join(root, "verticals", "surveys", "public", "images", "projects", `project-surveys-${n}.jpg`),
  groundworks: (n) =>
    path.join(root, "verticals", "groundworks", "public", "images", "projects", `project-groundworks-${n}.jpg`),
};

let proj = 0;
for (const vertical of Object.keys(projectSlots)) {
  for (let n = 1; n <= 6; n++) {
    const src = projectSlots[vertical](n);
    const dest = path.join(assets, `${vertical}-${n}.jpg`);
    if (!fs.existsSync(src)) {
      console.warn("Project missing source:", src);
      continue;
    }
    fs.copyFileSync(src, dest);
    proj++;
  }
}

console.log(`sync-assets-from-public: blog ${blog} files, project slots ${proj} files → ${path.relative(root, assets)}`);
