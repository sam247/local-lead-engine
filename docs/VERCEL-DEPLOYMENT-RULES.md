# Vercel deployment rules (monorepo verticals)

To avoid using deployment minutes on builds that don’t relate to each vertical, configure each Vercel project so it only builds when its code (or shared `engine`) has changed.

## Option A: “Only build if there are changes in a folder” (simplest)

1. **local-lead-engine-drains**  
   - **Settings → Build & Deployment → Ignored Build Step**  
   - Choose **“Only build if there are changes in a folder”**  
   - Enter: `verticals/drains`  
   - Save.

2. **local-lead-engine-surveys**  
   - Same steps, but enter: `verticals/surveys`  
   - Save.

**Note:** With this option, changes only under `engine/` will not trigger a build. If you need a build when `engine` changes, use Option B.

---

## Option B: Custom script (build when vertical or `engine` changes)

Use the scripts in `scripts/` so each project builds when **its vertical or `engine`** changes.

### 1. Root Directory

- **Drains:** Root Directory = `verticals/drains`
- **Surveys:** Root Directory = `verticals/surveys`

### 2. Ignored Build Step

- **Drains:**  
  **Settings → Build & Deployment → Ignored Build Step** → **“Run my Bash script”**  
  Script path (from repo root):  
  `bash scripts/vercel-ignore-build-drains.sh`  

  Because the build runs with the project root as the working directory (e.g. `verticals/drains`), run the script from the repo root. In the dashboard you can set the command to:

  ```bash
  bash ../../scripts/vercel-ignore-build-drains.sh
  ```

  (from `verticals/drains`, `../../` is the repo root).

- **Surveys:**  
  Same idea, but use:

  ```bash
  bash ../../scripts/vercel-ignore-build-surveys.sh
  ```

Result:

- **Drains** builds only when there are changes under `verticals/drains` or `engine`.
- **Surveys** builds only when there are changes under `verticals/surveys` or `engine`.

### 3. If your Root Directory is the repo root

If you deploy from repo root and override the build command per project, run the script from the project root:

- Drains: `bash scripts/vercel-ignore-build-drains.sh`
- Surveys: `bash scripts/vercel-ignore-build-surveys.sh`

---

## Option C: Skip unaffected projects (automatic)

If the repo uses npm/yarn/pnpm workspaces and each vertical’s `package.json` declares the `engine` workspace dependency, Vercel can **skip unaffected projects** automatically (no Ignored Build Step needed):

1. **Settings → Build & Deployment** for each project.
2. Under **Root Directory**, ensure **“Skip deployment when no changes are detected”** (or equivalent) is **enabled**.

Then each project only builds when Vercel detects changes in that project or its dependencies (e.g. `engine`). This does not use extra concurrent build slots.

---

## Summary

| Goal                               | Use |
|------------------------------------|-----|
| Only build when this vertical’s dir changes | Option A (folder path). |
| Build when this vertical or `engine` changes | Option B (script). |
| Use Vercel’s automatic skip when deps are declared | Option C (skip unaffected). |

Scripts: `scripts/vercel-ignore-build-drains.sh`, `scripts/vercel-ignore-build-surveys.sh`.
