# Access vertical – SEO architecture (L1–L4)

## Route levels

- **L1 (root):** `/` (home).
- **L2 (service hubs):** `/services`, `/services/[serviceSlug]`. Services: access-control-systems, commercial-cctv-installation, ip-camera-systems, perimeter-security-systems, security-system-integration.
- **L3 (topic hubs):** Hub index and slug pages.
  - `/cctv-problems`, `/cctv-problems/[slug]` (ProblemData)
  - `/cctv-guides`, `/cctv-guides/[slug]`
  - `/access-control-guides`, `/access-control-guides/[slug]`
  - `/perimeter-security-guides`, `/perimeter-security-guides/[slug]`
  - `/data-cabling-guides`, `/data-cabling-guides/[slug]`
  - `/security-upgrades`, `/security-upgrades/[slug]`
  - `/access-problems/[slug]`, `/industries/[slug]` (existing, not in hubPages).
- **L4 (service×location):** `/[serviceSlug]/[locationSlug]` (e.g. `/commercial-cctv-installation/london`).

## Datasets

- **lib/data.ts:** `services`, `locations` (from engine), `hubPages`, `getCategoryPages`, `getHubData`, `categoryImages`, `categoryAltText`.
- **data/cctvProblems.ts:** `cctvProblems` (ProblemData[]), `getCctvProblemBySlug`.
- **data/cctvGuides.ts:** `cctvGuidesPages` (InfoPageData[]).
- **data/accessControlGuides.ts:** `accessControlGuidesPages` (InfoPageData[]).
- **data/perimeterSecurityGuides.ts:** `perimeterSecurityGuidesPages` (InfoPageData[]).
- **data/dataCablingGuides.ts:** `dataCablingGuidesPages` (InfoPageData[]).
- **data/securityUpgradesGuides.ts:** `securityUpgradesGuidesPages` (InfoPageData[]).
- **data/problems.ts:** `accessProblems` (ProblemData[]) – used by `/access-problems/[slug]`.
- **data/industries.ts:** `industries` – used by `/industries/[slug]`.

Topic record shape: engine `InfoPageData` (slug, title, metaDescription, intro, signs, diagnosis, resolution, ctaText, relatedServices, relatedPages?) or `ProblemData` (slug, title, causes, howFixed, whenToCall, relatedServiceSlugs, ctaMessage).

## Programmatic topic×location (deferred)

The 45 programmatic topics in `data/programmaticTopics/` are **not** used by any route in Phase 2. They are intended for a **later phase** (e.g. Phase 4): URL pattern `/{topicSlug}-{locationSlug}` or `/area/[topicLocationSlug]`, with static params = topic slugs × location ids. **Do not** implement topic×location generation until Access has topic hubs in place (e.g. cctv-problems, cctv-guides) so that internal linking and site hierarchy are consistent.
