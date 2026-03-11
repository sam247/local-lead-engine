#!/usr/bin/env node
/**
 * Outputs a JSON manifest of all blog posts across verticals for image regeneration.
 * Each post has: vertical, id, title, imagePath, imagePrompt.
 * Save generated images to: verticals/{vertical}/public{imagePath}
 *
 * Usage: node scripts/blog-image-manifest.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const verticals = ["drains", "surveys", "access", "groundworks"];

function extractBlogPosts(content, vertical) {
  const posts = [];
  const blogMatch = content.match(/export const blogPosts[^=]*=\s*\[([\s\S]*?)\n\];/);
  if (!blogMatch) return posts;
  const arrayBody = blogMatch[1];
  // Split into object strings (each starts with { and we split on }, {)
  const objectStr = arrayBody.split(/\}\s*,\s*\{/);
  for (let i = 0; i < objectStr.length; i++) {
    let block = objectStr[i].trim();
    if (!block.startsWith("{")) block = "{" + block;
    if (!block.endsWith("}")) block = block + "}";
    const id = block.match(/id:\s*"([^"]*)"/)?.[1];
    const title = block.match(/title:\s*"([^"]*)"/)?.[1];
    const image = block.match(/image:\s*"([^"]*)"/)?.[1];
    const imagePrompt = block.match(/imagePrompt:\s*"([^"]*)"/)?.[1];
    if (id && image) {
      posts.push({
        vertical,
        id,
        title: title ?? "",
        imagePath: image,
        imagePrompt: imagePrompt ?? "",
      });
    }
  }
  return posts;
}

const all = [];
for (const v of verticals) {
  const dataPath = path.join(root, "verticals", v, "lib", "data.ts");
  if (!fs.existsSync(dataPath)) continue;
  const content = fs.readFileSync(dataPath, "utf8");
  const posts = extractBlogPosts(content, v);
  all.push(...posts);
}

console.log(JSON.stringify(all, null, 2));
