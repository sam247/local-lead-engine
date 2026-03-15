# Groundworks vertical – SEO architecture (L1–L4)

## Route levels

- **L1 (root):** `/` (home).
- **L2 (service hubs):** `/services`, `/services/[serviceSlug]`. Services: groundworks-contractors, piling-contractors, mini-piling-contractors, excavation-contractors, site-clearance-contractors, foundation-contractors, concrete-foundations, enabling-works-contractors.
- **L3 (topic hubs):** Hub index and slug pages.
  - `/guides`, `/guides/[slug]`
  - `/foundation-problems`, `/foundation-problems/[slug]` (ProblemData)
  - `/ground-conditions`, `/ground-conditions/[slug]`
  - `/groundworks-costs`, `/groundworks-costs/[slug]`
  - `/site-preparation`, `/site-preparation/[slug]`
  - `/driveway-groundworks`, `/driveway-groundworks/[slug]`
  - `/construction-drainage`, `/construction-drainage/[slug]`
- **L4 (service×location):** `/[serviceSlug]/[locationSlug]` (e.g. `/groundworks-contractors/london`).

## Datasets

- **lib/data.ts:** `services`, `locations` (from engine), `hubPages`, `getCategoryPages`, `getHubData`, `categoryImages`, `categoryAltText`.
- **data/guides.ts:** `guidesPages` (InfoPageData[]) – category `guides`.
- **data/foundationProblems.ts:** `foundationProblems` (ProblemData[]), `getFoundationProblemBySlug` – category `foundation-problems`.
- **data/groundConditionsPages.ts:** `groundConditionsPages` (InfoPageData[]) – category `ground-conditions`.
- **data/groundworksCostsPages.ts:** `groundworksCostsPages` (InfoPageData[]) – category `groundworks-costs`.
- **data/sitePreparationPages.ts:** `sitePreparationPages` (InfoPageData[]) – category `site-preparation`.
- **data/drivewayGroundworksPages.ts:** `drivewayGroundworksPages` (InfoPageData[]) – category `driveway-groundworks`.
- **data/constructionDrainagePages.ts:** `constructionDrainagePages` (InfoPageData[]) – category `construction-drainage`.

Topic record shape: engine `InfoPageData` or `ProblemData`; `getCategoryPages(category)` returns the array for that hub (foundation-problems uses ProblemData mapped to InfoPageData for hub listing).
