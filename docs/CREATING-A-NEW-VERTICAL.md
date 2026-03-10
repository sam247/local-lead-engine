# Creating a New Vertical

This guide explains how to add a new vertical (e.g. "surveys", "plumbing") to the local-lead-engine monorepo so it behaves like a full, independent site while reusing the same architecture as an existing vertical (e.g. drains). The goal is a **structural clone**: same routing, templates, and components, with **only** topic, data, and copy replaced.

---

## 1. Clone the structure, not the content

- Copy an existing vertical folder (e.g. `verticals/drains`) to a new name (e.g. `verticals/surveys`).
- Add the new package to root `package.json` workspaces.
- Update the new vertical’s `package.json` name (e.g. `verticals-surveys`).
- **Do not** change route paths or template structure; keep URLs and layout identical so the clone stays maintainable.

---

## 2. Replace config and site identity

- **`config.ts`**: Set `siteName`, `baseUrl`, `primaryService`, `industry`, and `companyInfo` (name, phone, email, address, hours, social). These drive metadata, schema, and CTAs.
- **`app/layout.tsx`**: Update default `metadata.title` and `metadata.description`.
- **`app/globals.css`**: Adjust CSS variables only if you need a different accent colour (e.g. `--highlight`). Do not change layout-related classes.
- **Robots / sitemap**: In `app/robots.ts` and any sitemap logic, point to the new `baseUrl` and domain.

---

## 3. Replace all data in the new vertical

Every place that defines or reads content must use **the new vertical’s** data only. If you miss one, the site will still show the source vertical’s copy (e.g. drain text on a surveys site).

### 3.1 Core data (`lib/data.ts`)

- **`services`**: Replace with the new vertical’s services (slug, title, description, benefits, process, icon). All service pages and location pages are driven by this list.
- **`companyInfo`**: Name, phone, email, address, hours, social for the new brand.
- **`stats`**, **`testimonials`**, **`faqs`**, **`blogPosts`**: Replace with topic-specific content. Blog post `id`s must match keys in blog article content (see below).
- **`hubPages`**: Update `title`, `subtitle`, `metaDescription` for each hub; keep `category` and `basePath` if you are preserving URL structure.
- **`costPages`** (if used): Replace with the new vertical’s cost/price pages.
- **`getCategoryPages`**: Ensure every category returns the **new** vertical’s content (e.g. survey guides), not the source vertical’s (e.g. drain problems). Map each category to the appropriate array (e.g. `guidesPages` for all non-cost hubs).
- **`categoryAltText`**, **`categoryImages`**: Use slugs and labels that match the new vertical’s services/hubs.
- **`relatedGuideLinksByService`**: Build from the new vertical’s guides so service detail pages link to the right guides.
- **`serviceFaqsBySlug`**: FAQs per service slug for the new vertical.
- **`guidesIndexFeatured`**, **`guidesIndexNearMe`**: Featured guides and “near me” links for the guides index page.
- **`whyChooseUs`**: Replace with the new vertical’s value props.

Remove or avoid re-exporting source-vertical-only arrays (e.g. `problemPages` with drain content) if they are not used; otherwise they can leak into shared logic.

### 3.2 Guides and blog content

- **`data/guides.ts`** (or equivalent): Replace every guide with the new topic. Keep the same shape (slug, title, metaDescription, intro, signs, diagnosis, resolution, ctaText, relatedServices, relatedPages). If you keep cross-vertical guides (e.g. “when to call a drainage company vs surveyor”), keep those intentionally and link to the other vertical’s site.
- **`lib/blogArticleContent.ts`**: For each blog post `id` in `blogPosts`, add a matching entry in the article content map (sections, FAQs). If you don’t, blog post pages will have no or wrong body content.

### 3.3 Component-level copy

- **Hero**: Headline, subhead, form service options (must match the leads API schema), and image alt text.
- **Services grid**: Section heading, description, priority service slugs, and any hardcoded labels.
- **Projects / case studies**: Replace project list and descriptions with the new vertical’s examples; ensure links use valid service slugs from the new `services` array.
- **CTAs**: InspectionCTA, CTABanner, MidContentCTA, StickyEmergencyBar, etc. Replace every “drain”/“inspection” style message with the new vertical’s CTA (e.g. “Request a Survey Quote”).
- **Trust badges**: Update labels and copy to the new vertical.
- **Footer / Header**: Nav links, dropdowns, and labels; keep hrefs if they are shared route paths, but ensure link text and destinations match the new vertical.
- **Guides index**: Use data-driven featured and near-me lists (e.g. `guidesIndexFeatured`, `guidesIndexNearMe`) and survey (or new topic) hero copy. Do not hardcode the source vertical’s guide titles or descriptions.
- **Service detail page**: “Related” sections and sidebar titles (e.g. “Related survey services” not “Related drain services”). Use `relatedGuideLinksByService` and `serviceFaqsBySlug` from data.
- **Location page**: Intro paragraph, `trustSectionTitle`, `diagnosisGuidePath` (or equivalent), and any hardcoded trust points or FAQs.
- **Pillar guide / “complete guide” page**: Sections, intros, links, and FAQs must all come from the new vertical’s data (e.g. `getCollapsedDrainsGuideProps` or equivalent). Replace drain-specific tools (e.g. DiagnosisTool, CostEstimator) with the new vertical’s CTAs or links (e.g. “Do I need a survey?” and cost guides).
- **About / Projects**: Replace all body copy and project lists with the new vertical’s story and portfolio.

Do a **grep** for the source vertical’s topic (e.g. “drain”, “CCTV”, “blockage”) across the new vertical’s `.tsx` and `.ts` files and fix or remove any user-facing matches, except for intentional cross-vertical content (e.g. “visit mainlinedrains.co.uk for drainage”).

---

## 4. Leads API and email (Resend + Google Sheet)

The leads API must accept the new vertical’s form payload and write the correct **vertical** and identifiers to the same (or same-structure) Google Sheet.

- **Schema**: Update `SERVICE_OPTIONS` to match exactly what the front-end sends (e.g. Hero and ContactForm). Update `source_site` to `z.literal("surveys")` (or your vertical key).
- **Lead ID prefix**: Use a distinct prefix per vertical (e.g. `DRN-` for drains, `SRV-` for surveys) so the sheet can distinguish rows. Implement `formatLeadId` and `parseLeadId` for that prefix.
- **`getNextLeadId`**: When scanning the sheet for the next ID, only consider rows with your prefix (e.g. `parseLeadId` returns `null` for other prefixes).
- **Append row**: Set the `vertical` column (e.g. column C) to the new vertical’s value (e.g. `"surveys"`). Same sheet, same headers; only the vertical and lead_id prefix change.
- **Email**: Set `emailTo` and `emailFrom` to the new vertical’s address (e.g. `leads@mainlinesurveys.co.uk`). Update subject and body copy (e.g. “New Survey Lead”, “Description of project”).
- **Env**: Use the same pattern as the source vertical: `RESEND_API_KEY`, `GOOGLE_SHEETS_SHEET_ID`, `GOOGLE_SHEETS_CLIENT_EMAIL`, `GOOGLE_SHEETS_PRIVATE_KEY`. The new deployment (e.g. Vercel) needs these set; Resend domain verification is per sending domain.

---

## 5. Analytics (GA4) and events

Use the same GA4 setup and event names as the source vertical (e.g. drains) so behaviour and reporting stay consistent.

### 5.1 Base setup

- **`components/GoogleAnalytics.tsx`**: Include this in the root layout (`app/layout.tsx`). It loads `gtag.js` and runs `gtag('config', GA_ID)` with `strategy="beforeInteractive"`.
- **Measurement ID**: Set `NEXT_PUBLIC_GA_ID` in the project’s env (e.g. in Vercel). Optionally add a fallback in the component for the new vertical (e.g. `process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"`) so the site works before env is set.
- **`.env.example`**: Document the variable, e.g. `# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`.

### 5.2 Event tracking (same as drains)

Events are sent via the shared **`trackEvent`** helper from `engine` (see `engine/utils/trackEvent.ts`). It calls `window.gtag('event', eventName, params)`, so it uses whichever GA property is configured by the vertical’s `GoogleAnalytics` component.

Keep the **same event names** on the new vertical so GA4 reports and audiences stay comparable. Current events:

| Event name               | Where it fires |
|--------------------------|----------------|
| `lead_form_submit`       | Hero enquiry form and Contact page form, on valid submit before the API request. |
| `call_button_click`      | Clicks on phone/tel links in Hero, Header (desktop + mobile), and StickyEmergencyBar. |
| `cost_estimator_used`     | CostEstimator component when user submits the estimator (if the vertical uses it). |
| `diagnosis_started`      | DiagnosisTool when the user selects the first option (if the vertical uses it). |
| `diagnosis_completed`     | DiagnosisTool when the user completes the flow (if the vertical uses it). |

**Components that call `trackEvent` (clone these behaviour when adding a new vertical):**

- `components/sections/Hero.tsx` — `lead_form_submit`, `call_button_click` (on tel link).
- `components/sections/ContactForm.tsx` — `lead_form_submit`.
- `components/layout/Header.tsx` — `call_button_click` on both tel links.
- `components/sections/StickyEmergencyBar.tsx` — `call_button_click` on tel link.
- `components/sections/CostEstimator.tsx` — `cost_estimator_used` (if used).
- `components/sections/DiagnosisTool.tsx` — `diagnosis_started`, `diagnosis_completed` (if used).

No code changes are required for the new vertical if you cloned from a vertical that already has these calls; only ensure the new vertical has its own GA4 property and `NEXT_PUBLIC_GA_ID` (or default) set.

---

## 6. Near-me and special routes

- Any “near me” or special landing page that selects a **service** must use a **service slug that exists in the new vertical’s `services`** array. Otherwise the page can 404 or show the wrong service. Update the page’s `serviceSlug` (or equivalent) to a valid slug from the new vertical.

---

## 7. Vercel deployment rules (save build minutes)

To avoid building a vertical when only another vertical (or unrelated files) changed, set **Ignored Build Step** or **Skip deployment** in each Vercel project. See **[docs/VERCEL-DEPLOYMENT-RULES.md](VERCEL-DEPLOYMENT-RULES.md)** for options: folder-based skip, custom scripts (`scripts/vercel-ignore-build-*.sh`), or Vercel’s automatic “skip unaffected projects”. Configure once per project in the Vercel dashboard (the Vercel MCP does not expose project settings updates).

---

## 8. Checklist before launch

- [ ] All content in `lib/data.ts`, `data/guides.ts`, and `lib/blogArticleContent.ts` is for the new vertical only (no source-vertical copy).
- [ ] Grep for source-vertical keywords (e.g. drain, CCTV, blockage) shows no user-facing leaks except intentional cross-links.
- [ ] Hero and contact forms send a payload that the leads API accepts (`source_site` and `service` enum).
- [ ] Leads API writes the correct `vertical` and lead ID prefix to the sheet and sends email to the new vertical’s address.
- [ ] Config, metadata, and schema use the new site name and base URL.
- [ ] About, Projects, pillar guide, and guides index use the new vertical’s copy and data.
- [ ] GA4 measurement ID is set (env or default) for the new vertical; same GA4 events as source vertical (lead_form_submit, call_button_click, cost_estimator_used, diagnosis_started/completed) fire from Hero, ContactForm, Header, StickyEmergencyBar, and any CostEstimator/DiagnosisTool.
- [ ] Build succeeds and key routes (home, one service, one location, guides index, contact, lead submit) work end-to-end.

---

## 9. Summary

A new vertical is a **data and copy replacement** on top of a structural clone. Keep routing and components; replace every dataset, label, and CTA so that nothing from the source vertical appears. Pay special attention to the leads API (schema, vertical column, lead ID prefix, email copy) and to any hardcoded copy in layout, hero, CTAs, and index pages. A single missed reference can make hundreds of pages show the wrong vertical’s content.
