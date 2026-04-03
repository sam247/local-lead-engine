# AGENTS.md – Architecture guide for AI agents

This document is the **permanent architecture guide** for AI agents working in this codebase. It describes how the system works and defines **strict rules** to prevent architecture drift. Do not summarise lightly; follow the structure and constraints below.

---

## 1. System overview

### 1.1 Purpose of the platform

The repository is a **multi-vertical local lead generation platform**. Each vertical is a separate Next.js application (drains, surveys, access, groundworks) that:

- Targets location-based and service-based search intent.
- Generates programmatic **service × location** pages (e.g. `/commercial-cctv-installation/richmond`).
- Supports **topic hubs** (L3) and **topic pages** that link to services and locations.
- Optionally supports **topic × location** pages (Access and Groundworks, L5) for informational and commercial-intent searches.

The platform is built for **SEO**, **internal linking**, and **scalable programmatic page generation** without duplicating logic across verticals.

### 1.2 How verticals work

- Each **vertical** is a Yarn/npm **workspace** under `verticals/{name}` (drains, surveys, access, groundworks).
- Each vertical is a **standalone Next.js app** with its own `app/`, `lib/`, `data/`, and `config`.
- Verticals **do not** share routes or URLs; they are deployed separately (e.g. different domains or paths).
- Verticals **share**:
  - The **engine** package (components, types, utils, schema, shared data).
  - The **location dataset** (`engine/data/locations.ts`) — single source of truth; verticals must not redefine locations.

### 1.3 How programmatic pages are generated

- **Service × location (L4):** For each `(service, location)` pair, `generateStaticParams` in `app/[serviceSlug]/[locationSlug]/page.tsx` returns all combinations. Each vertical defines `services` and imports `locations` from the engine (or re-exports from engine). Pages are statically generated at build time.
- **Topic × location (L5, Access and Groundworks):** The same dynamic route `[serviceSlug]/[locationSlug]` is used. The first segment is resolved as either a **service slug** or a **topic slug**. A fixed list of topic slugs (`TOPIC_LOCATION_SLUGS`) is used; if the first segment is in that list, the page renders topic-location content (or redirects to topic-hub canonical pages for global-topic route slugs); otherwise it renders the standard `LocationPage` for service × location. No new route segments are added; route conflicts are avoided by **reserving** topic slugs that do not overlap with service slugs.

### 1.4 Role of the engine folder

The **engine** (`engine/`) is **shared infrastructure** consumed by all verticals:

- **Types:** `Service`, `Location`, `HubData`, `InfoPageData`, `ProblemData`, `CompanyInfo`, `VerticalConfig`, etc. (see `engine/types/index.ts`).
- **Components:** `LocationPage`, `HubPage`, `InfoPage`, `ProblemPage`, `ServiceDetailContent`, `BreadcrumbNav`, `NearbyAreas`, `MapEmbed`, UI primitives, etc. (see `engine/components/index.ts`).
- **Data:** `locations` (shared location list), `locationNeighbours`, `getNeighbourLocationIds` (see `engine/data/`).
- **Utils:** `buildLocationMetadata`, `buildLocationContextParagraph`, `buildSitemapEntries` (see `engine/utils/`).
- **Lib:** `getPageTier`, `getPageType`, `pageSeoDataAttrs`, call-click helpers (see `engine/lib/pageWeighting.ts`, `engine/lib/phone/handleCallClick.ts`).
- **Schema:** FAQ, LocalBusiness, and other structured data helpers (see `engine/schema/`).
- **Validation:** Shared Zod or validation utilities (see `engine/validation/`).

The engine is **agnostic** to vertical-specific URLs, topic sets, or content. Verticals pass data into engine components via props.

### 1.5 How verticals plug into the engine

- Verticals depend on the engine via workspace dependency: `"engine": "file:../../engine"` (or similar).
- Verticals **import** from `"engine"`: e.g. `LocationPage`, `getNeighbourLocationIds`, `buildLocationMetadata`, `locations`, types.
- Verticals **export** from their own `lib/data.ts`: `services`, `locations` (re-exported from engine), `hubPages`, `getCategoryPages`, `getRelevantTopicsForService`, etc.
- **Config:** Each vertical has a `config.ts` that exports `verticalConfig` implementing `VerticalConfig` (siteName, baseUrl, companyInfo, locationContextTemplate, etc.).

### 1.6 URL and content hierarchy

| Level | Description | Example URL | Exists in |
|-------|-------------|-------------|-----------|
| **L1** | Homepage | `/` | All verticals |
| **L2** | Service hubs | `/services`, `/services/commercial-cctv-installation` | All verticals |
| **L3** | Topic hubs | `/cctv-guides`, `/drain-problems`, `/foundation-problems` | All verticals (hub structure varies) |
| **L3** | Topic category pages | `/cctv-guides/cctv-planning-and-placement`, `/drain-problems/signs-of-collapsed-drain` | All verticals |
| **L4** | Service × location | `/commercial-cctv-installation/richmond`, `/drain-collapse-repair/london` | All verticals |
| **L5** | Topic × location | `/cctv-installation/richmond`, `/data-cabling-installation/richmond` | **Access and Groundworks** |

L1–L4 exist in all verticals. L5 (topic × location) currently exists in Access and Groundworks, using fixed topic slug sets and the shared location dataset.

### 1.7 Service areas and primary near-me hubs

- **`/service-areas`:** Regional browse page on every vertical, implemented with engine **`ServiceAreasHub`** (UK region/county grouping from `engine/data/uk-location-hierarchy`). Links resolve to `/{primaryServiceSlug}/{locationId}`.
- **Primary near-me route:** Exactly **one** richer local SEO / conversion hub per vertical, implemented with engine **`NearMePage`** (hero, trust/conversion blocks, **`NearMeLocationList`** with search and grouped location links). Paths are vertical-specific, e.g. drains `/drain-collapse-near-me`, groundworks `/groundworks-contractors-near-me`, access `/access-control-systems-near-me`, surveys `/topographical-survey-near-me`.
- **`browseMoreHref`** on each vertical’s `app/service-areas/page.tsx` must target that vertical’s **primary near-me URL**, not `/services`.
- **Header** “View all areas” and **`FooterServiceAreaGroups`** “All service areas →” must link to that vertical’s **primary near-me** route. The footer bottom bar may still include a separate “Service areas” link to **`/service-areas`** (regional browse).
- **Surveys:** Legacy **`/drain-*-near-me`** paths on the surveys app must **301 redirect** to `/topographical-survey-near-me`. Static sitemaps should list the **canonical** near-me path only, not the legacy URLs.
- **Do not merge** `ServiceAreasHub` and `NearMePage` into one component; roles stay separate unless product explicitly changes this.

---

## 2. Repository structure

### 2.1 Root

- **package.json:** Workspaces for `engine`, `verticals/drains`, `verticals/surveys`, `verticals/access`, `verticals/groundworks`. Scripts such as `dev`/`build`/`start` default to one workspace (e.g. drains) but each vertical can be built independently.
- **next-app:** A separate Next.js application in the repo; may be legacy or an alternate deployable. Primary deployables are the four verticals under `verticals/`.
- **JPEG compression (optional, soft target):** `npm run images:compress` re-encodes JPGs under `verticals/*/public/images/` with a **soft** size target (default ~100 KB via `--target-kb=100`), max width (`--max-width=1600`), and quality search between `--min-quality` / `--max-quality`. Files are only overwritten when the new file is **smaller** than the original (avoids bloat). Use `--dry-run` to preview; `--include-assets` also processes `./assets/*.jpg`. This is **not** a CI gate — it is a manual pass for faster loads.
- **Blog and project images (agent workflow):** The repo does **not** call OpenAI or other image APIs from **application** code. Illustrative JPGs are produced in the **Cursor chat / Composer session** using **built-in image generation** (the same flow used historically in this project): the agent generates images from each post’s `imagePrompt` (and themed prompts per project row), using filenames that match `./assets/` (see below). **Cursor save path:** the IDE may write files first under `.cursor/projects/<workspace-hash>/assets/`; if that path differs from the git repo root, **copy `*.jpg` into the repo’s `./assets/`** before running placement. **Manifests (prompts and targets):** `node scripts/blog-image-manifest.mjs` outputs blog posts with `id`, `imagePath`, and `imagePrompt`; `node scripts/project-image-manifest.mjs` outputs all project rows (requires workspace install so `npx tsx` can resolve `engine`). **Naming in `./assets/`:** blog images as `{id}.jpg` matching each post’s `id`; **project images** as `{vertical}-1.jpg` through `{vertical}-30.jpg` — one file per generated project card (`engine` maps `project-{vertical}-{n}.jpg` to `{vertical}-{n}.jpg` via `scripts/project-place-images.mjs`). `project-image-manifest.mjs` exports all four verticals including **groundworks** (`export-projects.mts` in each vertical). **Uniqueness check:** `npm run verify:unique-project-images` hashes each JPG under `verticals/*/public/images/projects/` and **fails the build** if any two files in the same vertical share identical bytes (prevents duplicate photos on project grids). **Deploy into each vertical’s `public/`:** with JPGs already in repo `./assets/`, run `npm run images:place-all` (blog + regenerate `project-manifest.json` + project copy), or individual `blog:place-images` / `project:place-images`. **Do not** run `images:sync-assets` immediately after chat generation — it overwrites `./assets/` from existing `public/`. Use `npm run images:roundtrip-from-public` only when re-exporting from `public/` back into `assets/` for editing or backup.

### 2.2 engine/

Shared infrastructure. **Do not** put vertical-specific routes, URLs, or content here.

- **engine/components/** – React components used by verticals (LocationPage, HubPage, InfoPage, ProblemPage, ServiceDetailContent, BreadcrumbNav, NearbyAreas, MapEmbed, UI components).
- **engine/data/** – `locations.ts` (shared location list), `location-neighbours.ts` (getNeighbourLocationIds), `projects` if shared. **`mainline-group.ts`** — sole exception for **corporate entity URLs** (the five Mainline division homepages — drains, surveys, access, groundworks, scaffolding — used for cross-site footers, About, and JSON-LD `sameAs`). Do not add other vertical marketing URLs here; service/topic URLs stay in verticals.
- **engine/types/** – TypeScript interfaces (Service, Location, HubData, InfoPageData, ProblemData, VerticalConfig, etc.).
- **engine/utils/** – Helpers (buildLocationMetadata, buildLocationContextParagraph, sitemap builder).
- **engine/schema/** – Structured data (FAQ, LocalBusiness, etc.).
- **engine/validation/** – Shared validation.
- **engine/tools/** – Optional shared tools (e.g. cost estimator, diagnosis tool).
- **engine/package.json** – Exposes `index.ts`, `./components`, `./data/locations`, etc. Verticals import from `"engine"` or `"engine/data/locations"`.

### 2.3 verticals/

One folder per vertical: **drains**, **surveys**, **access**, **groundworks**. Each is a full Next.js app.

### 2.4 verticals/{vertical}/data/

Vertical-specific **content datasets**: problem pages, guide pages, industry pages, programmatic topics, etc. Files are typically raw data (arrays of objects with slug, title, metaDescription, intro, etc.). **Not** for React components or route handlers.

- **Examples:** `verticals/drains/data/guides.ts`, `verticals/access/data/cctvProblems.ts`, `verticals/access/data/programmaticTopics/`, `verticals/groundworks/data/foundationProblems.ts`.

### 2.5 verticals/{vertical}/lib/

Vertical-specific **logic and data wiring**: `data.ts` (services, hubPages, getCategoryPages, getHubData, getRelevantTopicsForService), `topicLocationConfig.ts` (Access and Groundworks), `sitemapXml.ts` (Access and Groundworks), `hubPageProps.ts`, `infoPageProps.ts`, `pillarGuideProps.ts`, etc. This is where **service slug → topic category** mappings and **topic link generation** live.

- **data.ts:** Must export (at least) `services`, `locations` (from engine), and for topic-capable verticals: `hubPages`, `getCategoryPages`, `getRelevantTopicsForService`.

### 2.6 verticals/{vertical}/app/

Next.js App Router: routes, layouts, page components. Structure varies by vertical.

- **app/[serviceSlug]/[locationSlug]/page.tsx** – Dynamic route for **service × location** (all verticals) and, in Access/Groundworks, **topic × location** (same route, first segment resolved to service or topic).
- **app/services/[serviceSlug]/page.tsx** – Service hub (L2).
- **app/{hubBasePath}/page.tsx** and **app/{hubBasePath}/[slug]/page.tsx** – Topic hub index and topic category pages (L3).
- **app/sitemap.ts** – Single sitemap (Drains, Surveys only).
- **Access/Groundworks:** `app/sitemap.xml/route.ts` (sitemap index), `app/sitemap-services.xml/route.ts`, `app/sitemap-service-locations.xml/route.ts`, `app/sitemap-topics.xml/route.ts`, `app/sitemap-topic-locations.xml/route.ts` (where topic×location is implemented); `app/components/TopicLocationPage.tsx`.

### 2.7 verticals/{vertical}/config.ts

Exports `verticalConfig` (VerticalConfig): baseUrl, siteName, companyInfo, locationContextTemplate, sectionIntros, etc.

### 2.8 Shared vs vertical-specific

| Belongs in engine | Belongs in vertical |
|-------------------|---------------------|
| Location list, Location type | Services list, hub definitions, topic datasets |
| LocationPage, HubPage, InfoPage, ProblemPage | Page wrappers that pass vertical data into engine |
| getNeighbourLocationIds, buildLocationMetadata | getRelevantTopicsForService, getCategoryPages, topicLocationConfig |
| Shared types (Service, Location, HubData, InfoPageData) | Vertical config, programmatic topic types (e.g. ProgrammaticTopic in access/data) |

---

## 3. Vertical architecture

### 3.1 Drains

- **Service slugs (11):** drain-collapse-repair, drain-relining, cctv-drain-surveys, drain-excavation, emergency-drainage, blocked-drains, drain-jetting, drain-root-removal, drain-unblocking, drain-pipe-replacement, commercial-drainage.
- **Topic hubs:** Many; basePaths include `/drain-problems`, `/drain-collapse`, `/drain-insurance`, `/drain-costs`, `/drain-inspection`, `/drain-causes`, `/commercial-drainage`, `/emergency`, `/drain-repair-methods`, `/property-drainage`, `/drain-survey`, `/property-types`, `/drain-responsibility`, `/homebuyer-drainage`, `/drainage-guides`. Categories map to datasets (problemPages, collapseScenarios, costPages, inspectionPages, etc.).
- **Topic datasets:** problemPages, collapseScenarios, insurancePages, costPages, inspectionPages, causePages, commercialDrainagePages, emergencyServicePages, repairMethodPages, propertyPages, propertyTypePages, legalPages, buyerPages, guidesPages (from `lib/data.ts` and `data/*.ts`).
- **Routes:** L2 service hubs; L3 hub index + `[slug]` per hub; L4 `[serviceSlug]/[locationSlug]`; static and near-me paths.
- **Approximate page counts:** ~14 hub categories × multiple pages each (200+ topic pages), 11 × 100 = 1,100 service×location, plus static and hub index pages.
- **getRelevantTopicsForService:** Maps each service slug to 2–4 topic categories; takes up to 2 pages per category, max 6 links; href = `hub.basePath + "/" + page.slug`, title = page.title.

### 3.2 Surveys

- **Service slugs (11):** topographical-survey, measured-building-survey, utility-survey, utility-mapping-survey, boundary-survey, laser-scanning-survey, drone-survey, drone-roof-inspection, drone-building-inspection, drone-topographical-survey, drone-construction-survey.
- **Topic hubs:** Same **path structure** as drains (e.g. `/drain-problems`, `/drain-survey`, `/drain-costs`, `/homebuyer-drainage`, `/drainage-guides`) but content is survey-themed; hub definitions and getCategoryPages live in `verticals/surveys/lib/data.ts`. Categories map to survey-oriented datasets (e.g. guidesPages for many hubs).
- **Topic datasets:** Largely shared or survey-specific guide/problem datasets; getCategoryPages returns survey-relevant pages per category.
- **Routes:** Same pattern as drains (L2, L3, L4); no L5.
- **Approximate page counts:** Similar scale to drains (11 services × 100 locations, plus hub and topic pages).
- **getRelevantTopicsForService:** Maps survey service slugs to categories (e.g. survey, inspection, costs, guides); builds 4–6 links from hub basePath + page slug.

### 3.3 Access

- **Service slugs (5):** access-control-systems, commercial-cctv-installation, ip-camera-systems, perimeter-security-systems, security-system-integration.
- **Topic hubs:** basePaths `/cctv-problems`, `/cctv-guides`, `/access-control-guides`, `/perimeter-security-guides`, `/data-cabling-guides`, `/security-upgrades`. Each has index and `[slug]` topic pages.
- **Topic datasets:** cctvProblems, cctvGuidesPages, accessControlGuidesPages, perimeterSecurityGuidesPages, dataCablingGuidesPages, securityUpgradesGuidesPages; also industries and accessProblems (separate routes).
- **Programmatic topics (Phase 4):** 45 topics in `data/programmaticTopics/`; **10** are used for topic × location (L5): route slugs in `TOPIC_LOCATION_SLUGS` (e.g. cctv-installation, warehouse-cctv-systems, door-access-control, data-cabling-installation) mapped to programmatic topic slugs via `ROUTE_SLUG_TO_TOPIC_SLUG`.
- **Routes:** L2, L3, L4; L5 via same `[serviceSlug]/[locationSlug]` route (first segment: topic slug or service slug). Sitemap: **segmented** (index + sitemap-services, sitemap-service-locations, sitemap-topics, sitemap-topic-locations).
- **Approximate page counts:** 5 × 100 = 500 service×location; 10 × 100 = 1,000 topic×location; hub and topic pages; total static + L2 + L3 + L4 + L5.
- **getRelevantTopicsForService:** Maps Access service slugs to cctv/access/perimeter/data-cabling categories; returns 4–6 links; Access can pass `relatedTopicsSectionTitle` e.g. "Security advice for businesses in {location}".

### 3.4 Groundworks

- **Service slugs (8):** groundworks-contractors, piling-contractors, mini-piling-contractors, excavation-contractors, site-clearance-contractors, foundation-contractors, concrete-foundations, enabling-works-contractors.
- **Topic hubs:** basePaths `/guides`, `/foundation-problems`, `/ground-conditions`, `/groundworks-costs`, `/site-preparation`, `/driveway-groundworks`, `/construction-drainage`; each has index and `[slug]` pages.
- **Topic datasets:** guidesPages, foundationProblems, groundConditionsPages, groundworksCostsPages, sitePreparationPages, drivewayGroundworksPages, constructionDrainagePages.
- **Routes:** L2, L3, L4; topic×location is implemented via the shared dynamic route (`[serviceSlug]/[locationSlug]`) using Groundworks topic slugs; no separate topic×location route file.
- **Approximate page counts:** 8 × 100 = 800 service×location; fewer topic pages than drains.
- **getRelevantTopicsForService:** Maps groundworks service slugs to foundation-problems, ground-conditions, groundworks-costs, site-preparation, etc.; 4–6 links per service.

### 3.5 Service × location generation

- **URL pattern:** `/{serviceSlug}/{locationSlug}` (e.g. `/commercial-cctv-installation/richmond`, `/drain-collapse-repair/london`).
- **Data:** `services` from vertical `lib/data.ts`; `locations` from `engine/data/locations.ts` (imported or re-exported by the vertical).
- **Page component:** Engine `LocationPage`; vertical’s `app/[serviceSlug]/[locationSlug]/page.tsx` fetches service, location, sameAreaLocations, nearbyLocations, localFaqs, otherServices, and calls `getRelevantTopicsForService(service.slug)` to pass `relatedTopicLinks` (and optional title/intro).
- **generateStaticParams:** Returns `services.flatMap(s => locations.map(l => ({ serviceSlug: s.slug, locationSlug: l.id })))` (and in Access, appends topic×location params from `getTopicLocationStaticParams(locations)`).

---

## 4. Location system

### 4.1 Centralised dataset

- **File:** `engine/data/locations.ts`.
- **Rule:** All verticals MUST use this list. Verticals MUST NOT define their own location list; they **import** or **re-export** `locations` from the engine (e.g. `export { locations } from "../../../engine/data/locations"` or from `@/lib/data` which re-exports it).

### 4.2 Location object structure

Each location has:

- **id:** Unique slug (e.g. `london`, `richmond`, `chiswick`). Used in URLs as `locationSlug`.
- **name:** Display name (e.g. "London", "Richmond").
- **area:** Broader area or region (e.g. "Central London", "South West London", "Surrey").
- **lat, lng:** Numbers for map embed and schema.
- **nearbyTowns:** Optional string array; used for context and nearby-area linking.
- **propertyTypes:** Optional string; descriptive text for property types in the area.

### 4.3 What locations represent

Locations are **towns, cities, or distinct areas** (e.g. London, Richmond, Guildford), not counties or countries. The list is the same for every vertical so that service×location and topic×location URLs are consistent and shareable.

### 4.4 Nearby locations and neighbour logic

- **sameAreaLocations:** Locations with the same `area` as the current location (excluding current).
- **nearbyLocations:** Used for "Nearby Areas We Serve" and sidebar; typically same-area first, then others, capped (e.g. 8). Engine provides `getNeighbourLocationIds(currentLocationId, allLocationIds)` which uses optional `locationNeighbours` map in `engine/data/location-neighbours.ts` for a few key locations; otherwise falls back to first N other locations.
- **neighbourLocationsForContext:** Passed to LocationPage for the "Nearby service areas" / context block; derived from neighbour ids and location list.

### 4.5 How location pages are generated

For each `(service, location)` (and in Access/Groundworks, each `(topicSlug, location)`), the corresponding page is statically generated. The route receives `serviceSlug` and `locationSlug` (params); the vertical looks up `service` and `location` from `services` and `locations`; if not found, `notFound()`. Location pages render engine `LocationPage` with props built from that service and location (and related topics from `getRelevantTopicsForService`).

---

## 5. Programmatic page generation

### 5.1 generateStaticParams patterns

- **Service × location (all verticals):**  
  `return services.flatMap(s => locations.map(l => ({ serviceSlug: s.slug, locationSlug: l.id }))).`
- **Topic × location (Access/Groundworks):**  
  Additional params from `getTopicLocationStaticParams(locations)`: for each slug in `TOPIC_LOCATION_SLUGS` and each location, `{ serviceSlug: topicSlug, locationSlug: loc.id }`. Combined with service×location params so the same route handles both.

### 5.2 Topic × location (Access): how it works

- **Route:** Same dynamic segment: `app/[serviceSlug]/[locationSlug]/page.tsx`. No separate route for topic×location.
- **Resolution:** On request, the handler checks `isTopicLocationSlug(serviceSlug)`. If true, it loads the programmatic topic via `getTopicForRouteSlug(serviceSlug)` and the location by `locationSlug`; then renders `TopicLocationPage` (vertical-specific component). If false, it treats the first segment as a service slug and renders engine `LocationPage` (service×location).
- **Conflict avoidance:** Topic slugs used for L5 **must not** overlap with service slugs. Access uses 10 dedicated topic route slugs (e.g. `cctv-installation`, `data-cabling-installation`) that are not service slugs; service slugs (e.g. `commercial-cctv-installation`) continue to resolve to service×location.
- **Service-hub route guard:** In `/[serviceSlug]/page.tsx`, topic slugs are also accepted in `generateStaticParams`, but if requested as a hub URL they `permanentRedirect` to the related service hub (from topic `relatedServiceSlugs`) to avoid rendering topic routes as hub pages.

### 5.5 Topic × location (Groundworks): how it works

- **Route:** Same dynamic segment: `app/[serviceSlug]/[locationSlug]/page.tsx`, without a dedicated topic×location route.
- **Resolution:** Groundworks checks `isTopicLocationSlug(serviceSlug)` and resolves to local topic content via `getTopicForRouteSlug` for scalable topic slugs.
- **Global topic redirect:** Groundworks marks some route slugs as global-content; those route slugs redirect to canonical non-location topic pages via `getGlobalTopicCanonicalPath`.
- **Service-hub route guard:** Groundworks `/[serviceSlug]/page.tsx` includes topic slugs in static params and permanent-redirects topic-only URLs to the topic’s `primaryServiceSlug` when accessed without location.
- **Sitemap routing:** `sitemap-topic-locations.xml` is implemented and iterates `getLocationScalableTopicSlugs()`. Verify these entries are included in discovery via `sitemap.xml` where required.

### 5.6 Topic × location slug mapping (Groundworks)

- Route slugs are defined in `TOPIC_LOCATION_SLUGS` and each map to a local `TopicLocationTopic` object in `TOPIC_DATA` (`title`, `intro`, `commonProblems`, `howSolved`, `typicalScenarios`, `primaryServiceSlug`, `ctaText`).
- `getTopicForRouteSlug(routeSlug)` returns the inline topic payload used by `TopicLocationPage`.
- `getGlobalTopicCanonicalPath(routeSlug)` uses an explicit map (`GLOBAL_TOPIC_CANONICAL_PATH_BY_ROUTE_SLUG`) for global pages such as `foundation-cost-per-metre` and `groundworks-cost-new-build` to avoid topic×location duplicates.
- `getTopicScaleClassByRouteSlug` classifies route slugs as `GLOBAL_CONTENT`, `LOCATION_VALID`, or `GREY` from title/slug heuristic, which controls inclusion in `getLocationScalableTopicSlugs` for topic×location generation.

### 5.7 TopicLocationPage (Access)

- **Component:** `verticals/access/app/components/TopicLocationPage.tsx`.
- **Content:** Heading "{Topic Title} in {Location}"; intro; explanation; common problems; sector use cases; location-specific paragraph; link to topic hub; CTA to primary service×location; "Security services in {location}" with links to four services (commercial-cctv-installation, access-control-systems, perimeter-security-systems, ip-camera-systems) each linking to `/{serviceSlug}/{locationSlug}`.
- **Data:** Topic from `getTopicForRouteSlug` (programmatic topic); location from shared list; topic hub path from `TOPIC_HUB_PATH[topic.slug]`.

### 5.8 Topic slug mapping (Access)

- **Route slug → programmatic topic slug:** `ROUTE_SLUG_TO_TOPIC_SLUG` in `verticals/access/lib/topicLocationConfig.ts` (e.g. `cctv-installation` → `commercial-cctv-installation`, `cat6-network-cabling` → `cat6-cabling`). Programmatic topic content lives in `verticals/access/data/programmaticTopics/`.

---

## 6. Topic dataset structure

### 6.1 Engine types

- **HubData:** `category`, `basePath`, `title`, `subtitle`, `metaDescription`. Used to define topic hubs and their base URL.
- **InfoPageData:** `slug`, `title`, `metaDescription`, `intro`, `signs`, `diagnosis`, `resolution`, `ctaText`, `relatedServices` (service slugs), optional `relatedPages`. Used for guide/info topic pages.
- **ProblemData:** `slug`, `title`, `causes`, `howFixed`, `whenToCall`, `relatedServiceSlugs`, `ctaMessage`, optional `quickChecks`, `seriousSigns`. Converted to InfoPageData in some verticals via a mapper.

### 6.2 ProgrammaticTopic (Access)

- **File:** `verticals/access/data/programmaticTopicTypes.ts`.
- **Fields:** `slug`, `title`, `metaDescription`, `intro`, `explanation`, `commonProblems` (string[]), `sectorUseCases` (string[]), `relatedServiceSlugs`, `ctaText`.
- **Use:** Topic×location page content; links to topic hub and to service×location pages.

### 6.3 How topic datasets connect to hub pages

- Each **hub** in `hubPages` has a `category` and `basePath`. Topic pages under that hub are returned by `getCategoryPages(hub.category)` (array of InfoPageData or equivalent).
- **URL for a topic page:** `{hub.basePath}/{page.slug}` (e.g. `/cctv-guides/cctv-planning-and-placement`).
- **Internal links:** Topic pages and location pages link to these URLs; `getRelevantTopicsForService` builds such links from `hub.basePath` and `getCategoryPages(category)`.

---

## 7. Internal linking architecture

### 7.1 Location page links

- **Breadcrumb:** Home → Service (link to `/services/{serviceSlug}`) → "{Service} in {Location}" (current page).
- **Sidebar:** "View service overview" → `/services/{serviceSlug}`; "Nearby Areas We Cover" → `/{serviceSlug}/{neighbourId}`; "Other Services" → `/{otherService.slug}/{location.id}`.
- **Main content:** Optional "Helpful guidance" block (see below).
- **Bottom:** "Nearby Areas We Serve" → same pattern `/{serviceSlug}/{loc.id}`; "Other Services in {location}" → `/{otherService.slug}/{location.id}`.
- **Schema:** LocalBusiness, BreadcrumbList; service and location data.

### 7.2 Service hub links

- From location page: breadcrumb and sidebar link to `/services/{serviceSlug}`.
- From topic pages: `relatedServiceSlugs` or equivalent used to link to `/services/{slug}` (service hubs). Service detail pages (L2) link to location pages via "Areas we cover" or similar using `/{service.slug}/{location.id}`.

### 7.3 Topic hub links

- From location page: "Helpful guidance" block links to topic pages (hub basePath + page slug).
- From topic×location page (Access): "View topic guide" links to topic hub (e.g. `/cctv-guides`).

### 7.4 Topic → service and topic → location links

- Topic pages (L3) link to **service hubs** via `relatedServices` / `relatedServiceSlugs` (e.g. `/services/commercial-cctv-installation`). Some verticals add "Featured areas" or location links to `/{primaryServiceSlug}/{loc.id}`.
- Topic×location pages (Access) link to **service×location** in the "Security services in {location}" section and via the primary CTA.

### 7.5 "Helpful guidance" block on location pages

- **Component:** Rendered inside engine `LocationPage` when `relatedTopicLinks` is provided and non-empty.
- **Placement:** After main content section, **before** FAQ block and "Nearby Areas We Serve".
- **Content:** H2 (default "Helpful guidance related to this service", or vertical override e.g. "Security advice for businesses in {location}"); optional intro paragraph; list of internal links (title + href).
- **Data source:** Each vertical implements `getRelevantTopicsForService(serviceSlug)` returning 4–6 `{ title, href }` links to **existing** topic pages (hub basePath + page slug). No new routes; links must point to real topic URLs.
- **Purpose:** Strengthen crawl loop: topic page → service hub → location page → topic page.

### 7.6 How related topics are generated per service

- Each vertical defines a **mapping** from service slug to an ordered list of **topic categories** (e.g. drain-collapse-repair → problems, collapse, repair-methods, costs).
- For each category, the vertical gets the hub (`getHubData(category)`) and pages (`getCategoryPages(category)`), takes up to 1–2 pages per category, and builds `{ title: page.title, href: hub.basePath + "/" + page.slug }` until 4–6 links. No padding with non-existent URLs.

### 7.7 Nearby locations linking

- **Purpose:** Spread link equity and help users discover nearby service/location pages; supports local SEO.
- **Implementation:** `getNeighbourLocationIds` (engine) plus vertical logic for same-area and nearby lists; links are `/{serviceSlug}/{locationId}`.

---

## 8. Sitemap architecture

### 8.1 Verticals with a single sitemap (Drains, Surveys)

- **File:** `app/sitemap.ts` exporting a default function that returns `MetadataRoute.Sitemap`.
- **Source:** Engine `buildSitemapEntries` with vertical-specific `staticPaths`, `nearMePaths`, `services`, `locations`, `hubPages`, `getCategoryPages`, `serviceDetailPath`. No topic×location in these verticals.

### 8.2 Access: segmented sitemap

- **Root:** `/sitemap.xml` is a **sitemap index** (not a single urlset). Served by `app/sitemap.xml/route.ts` (Route Handler) returning XML that references five child sitemaps.
- **Child sitemaps (Route Handlers):**
  - **sitemap-services.xml** – Service hub URLs only: `{baseUrl}/services/{service.slug}`.
  - **sitemap-service-locations.xml** – All service×location: `{baseUrl}/{service.slug}/{location.id}`.
  - **sitemap-topics.xml** – Topic hub index URLs and all topic category pages: `{baseUrl}{hub.basePath}` and `{baseUrl}{hub.basePath}/{page.slug}`.
  - **sitemap-topic-locations.xml** – All topic×location: `{baseUrl}/{topicSlug}/{location.id}` for each `TOPIC_LOCATION_SLUGS` × location.
  - **sitemap-static.xml** – Static and high-value non-catalog pages like `/about`, `/projects`, `/contact`, near-me pages, and guide clusters.
- **Helpers:** `verticals/access/lib/sitemapXml.ts` provides `buildSitemapIndex` and `buildUrlset` for consistent XML with lastmod, changefreq, priority.
- **Why segmentation:** Improves crawl prioritisation and indexation speed; keeps each sitemap focused (services, service-locations, topics, topic-locations, static).

### 8.3 Groundworks: segmented sitemap

- **Root:** `/sitemap.xml` is currently a **sitemap index** served by `app/sitemap.xml/route.ts`, referencing child sitemaps for services, service-locations, topics, topic-locations and static pages. `sitemap-topic-locations.xml` exists and currently includes scalable topic×location URLs.
- **Child sitemaps (Route Handlers):**
  - `sitemap-services.xml`
  - `sitemap-service-locations.xml`
  - `sitemap-topics.xml`
  - `sitemap-topic-locations.xml`
  - `sitemap-static.xml`
- **Note:** Verify `sitemap.xml` references `sitemap-topic-locations.xml` so topic×location URLs are discoverable by indexers.

### 8.4 Metadata in sitemaps

- **lastmod:** ISO 8601 (e.g. build time or `new Date()`).
- **changefreq:** weekly for hub indexes; monthly for most service/topic/location pages; **weekly** for topic×location in Access/Groundworks (to encourage recrawl of large URL sets).
- **priority:** Optional but used (e.g. 0.8 hubs, 0.7 service hubs, 0.6 location/topic pages).

### 8.5 Robots

- Each vertical’s `robots.ts` (or equivalent) should reference the correct sitemap URL (e.g. `{baseUrl}/sitemap.xml`). For Access/Groundworks, the root sitemap is the index; crawlers follow it to the five segment sitemaps.

---

## 9. SEO architecture rules

Agents **must** follow these rules to avoid architecture drift:

1. **Do not rename or remove existing routes.** Existing URL patterns (e.g. `/{serviceSlug}/{locationSlug}`, `/services/{serviceSlug}`, hub basePaths) are fixed unless explicitly changed by product/SEO.
2. **Do not remove or bypass the service×location structure.** Every vertical must retain L4 (service×location) generation and linking.
3. **Topic hubs must exist before topic×location expansion.** Do not add topic×location pages for a vertical that does not have corresponding topic hubs (L3) and datasets.
4. **Location dataset must remain centralised.** All verticals MUST use `engine/data/locations.ts`. Do not create vertical-specific location lists or duplicate location data.
5. **Internal linking must maintain the intended flow:** topic → service hub → location page → topic (and topic×location → service×location where applicable). Do not remove the "Helpful guidance" block or break `getRelevantTopicsForService` contract.
6. **Topic links must point to existing pages only.** `getRelevantTopicsForService` and any similar helpers must only return hrefs that correspond to real routes (hub basePath + page slug from getCategoryPages). No placeholder or future URLs.
7. **Service slugs are reserved.** In verticals that have topic×location (Access, Groundworks), topic route slugs MUST NOT overlap with service slugs. Check `topicLocationConfig` and service list before adding new topic slugs.
8. **Sitemap coverage:** All public URLs that should be indexed must appear in the vertical’s sitemap(s). For Access/Groundworks, use the segmented sitemaps; do not drop segments or reintroduce a single monolithic sitemap without updating the index.
9. **Engine is vertical-agnostic.** Do not put vertical-specific URLs, topic lists, or content in the engine. Vertical-specific logic belongs in the vertical’s `lib/` or `data/`.
10. **Config and company info:** Use `verticalConfig` and vertical `companyInfo` for site name, base URL, and contact; do not hardcode these in the engine.

For Access and Groundworks, use the segmented sitemap architecture (sitemap index plus topic-aware child sitemaps). Drains and Surveys currently use single `app/sitemap.ts`. Additional sitemaps such as `sitemap-topic-locations.xml` may be added when a vertical introduces topic × location pages.

---

## 10. Expansion strategy

### 10.1 Adding new verticals

- Create `verticals/{name}/` with Next.js app structure; add workspace to root `package.json`.
- Implement `lib/data.ts` with `services`, `locations` (from engine), and optionally `hubPages`, `getCategoryPages`, `getRelevantTopicsForService`.
- Implement `config.ts` (VerticalConfig).
- Add routes for L2 (service hubs), L3 (topic hubs if applicable), L4 (service×location). Use engine components (LocationPage, HubPage, InfoPage, etc.).
- Add sitemap (single or segmented as appropriate).

### 10.2 Adding new locations

- **Only** add entries to `engine/data/locations.ts`. Update `locationNeighbours` in `engine/data/location-neighbours.ts` if needed. Rebuild all verticals; generateStaticParams will include the new location for all services (and for Access, topic×location).

### 10.3 Adding new services

- Add the service to the vertical’s `services` array in `lib/data.ts` (slug, title, description, etc.). Add a mapping for `getRelevantTopicsForService` if the vertical uses it. Rebuild; new service×location pages will be generated.

### 10.4 Adding topic hubs

- Add hub entry to `hubPages` (category, basePath, title, subtitle, metaDescription).
- Add or wire `getCategoryPages(category)` to return the topic pages for that category.
- Add routes: `app/{hubBasePath}/page.tsx` and `app/{hubBasePath}/[slug]/page.tsx` (or equivalent). Ensure sitemap includes hub and topic URLs.

### 10.5 Adding programmatic topics (e.g. topic×location)

- **Prerequisite:** Topic hubs (L3) and stable internal linking. Do not add topic×location for a vertical without topic hubs.
- Add or extend programmatic topic dataset; define route slugs that do **not** overlap with service slugs. Update topicLocationConfig (e.g. TOPIC_LOCATION_SLUGS, ROUTE_SLUG_TO_TOPIC_SLUG, TOPIC_HUB_PATH). Extend generateStaticParams and the [serviceSlug]/[locationSlug] handler to resolve topic slugs and render topic×location template. Add segment sitemap for topic×location if using segmentation.

### 10.6 Safe order for expansion

1. Locations (engine only).  
2. Services and service hubs (L2).  
3. Topic hubs and topic pages (L3).  
4. Topic linking from location pages (getRelevantTopicsForService).  
5. Topic×location (L5) only after L3 and linking are in place.

---

## 11. Known constraints

### 11.1 Next.js static generation

- **generateStaticParams** must return a finite list; all service×location (and topic×location for Access) combinations are pre-rendered at build time. Very large location or service counts can increase build time and output size.
- **force-static / revalidate:** Location and sitemap routes use static generation; no dynamic server rendering for these routes.

### 11.2 Sitemap scaling

- Single sitemap files have practical limits (e.g. 50,000 URLs). Access uses segmentation to keep each sitemap focused and smaller. Other verticals may need segmentation if URL count grows significantly.
- Next.js `sitemap.ts` returns a single urlset; sitemap **index** requires Route Handlers that return raw XML (as in Access).

### 11.3 Dataset sizes

- Topic datasets (getCategoryPages) and programmatic topic lists are in memory at build time. Very large datasets may need pagination or splitting for generateStaticParams or sitemap generation.

### 11.4 Routing conflicts

- **Single dynamic route for two concepts (Access/Groundworks):** The same `[serviceSlug]/[locationSlug]` route serves both service×location and topic×location. Resolution is by **first segment**: if it’s in the topic slug list, render topic×location; else treat as service slug. **Topic slugs must not overlap service slugs.**

### 11.5 Service slug protection

- When adding topic×location or new topic route slugs, always verify they are not already used as service slugs in that vertical. Overlap would make service×location pages unreachable for that slug.

### 11.6 Workspace and build

- Each vertical is a workspace; engine is a dependency. After changing the engine, verticals that depend on it must be rebuilt (and may need `yarn install` or clearing cached node_modules so they use the updated engine).

---

## 12. Future phases

The following are **planned or possible** evolutions; do not implement without explicit requirement and alignment with the rules above.

- **Topic×location expansion:** Roll out topic×location (L5) to additional verticals (Surveys, Drains) only after topic hubs and getRelevantTopicsForService are in place; use the same pattern (reserved topic slugs, same route, TopicLocationPage-style template).
- **Location mesh linking:** Enrich `locationNeighbours` or add more sophisticated “nearby” logic (e.g. by distance or region) for better cross-linking between location pages.
- **Additional verticals:** New verticals following the same L1–L4 (and optionally L5) structure and engine integration.
- **Lead routing:** Per-vertical or per-location lead capture and routing (not covered in this doc; would be separate services or APIs).
- **Content enrichment:** Deeper programmatic content (e.g. more ProgrammaticTopic fields, localised intros) or integration with CMS for non-programmatic pages.
- **Sitemap segmentation for other verticals:** If Drains or Surveys grow URL count significantly, consider introducing a sitemap index and segment sitemaps similar to Access/Groundworks.

---

## 13. Analytics, page weighting, call tracking, and SEO implementation

This section describes **implemented infrastructure** so agents can extend it without rediscovering files. **§9 SEO architecture rules** remain the binding constraints; subsections below are descriptive.

### 13.1 Page weighting and emergency CTA scaffolding

- **Module:** [`engine/lib/pageWeighting.ts`](engine/lib/pageWeighting.ts) (also `import { … } from "engine"`).
- **Types:** `PageTier` (`tier1` | `tier2` | `tier3`), `PageType` (`service` | `service_location` | `problem` | `topic`).
- **`getPageTier({ inlinks, pageType })`:** Service hubs (`pageType === "service"`) are always **tier1**. With no `inlinks` data: service → tier1, service_location → tier2, problem/topic → tier3. With counts: ≥100 → tier1, 20–99 → tier2, &lt;20 → tier3.
- **`getPageType({ route, explicitPageType })`:** Prefer **`explicitPageType`** from the route when URLs are ambiguous (e.g. Access two-segment paths). Heuristics: `/services` and `/services/*` → `service`; two path segments → `service_location`; otherwise → `topic`.
- **`computeEmergencyEligible`:** `true` when tier1 **or** `pageType === "problem"`.
- **`EMERGENCY_MODE_ENABLED`:** `false` until product enables emergency monetisation. **`maybeApplyEmergencyMonetisation`** is a no-op hook for future alternate numbers/banners.
- **`pageSeoDataAttrs(pageTier, pageType)`:** Returns `data-page-tier`, `data-page-type`, `data-emergency-eligible` for DevTools (used on page wrappers and CTAs when tier/type are passed).
- **Where wired:** Engine templates [`LocationPage`](engine/components/LocationPage.tsx), [`ServiceDetailContent`](engine/components/ServiceDetailContent.tsx), [`InfoPage`](engine/components/InfoPage.tsx), [`ProblemPage`](engine/components/ProblemPage.tsx), [`TopicLocationPage`](engine/components/TopicLocationPage.tsx) compute tier/type and wrap output in `<div className="contents" …>` (or `<main>` on topic×location) with those attrs. Optional prop **`inlinkCount`** on each accepts future crawl/analytics feeds.
- **CTAs:** [`InspectionCTA`](engine/components/InspectionCTA.tsx), [`MidContentCTA`](engine/components/MidContentCTA.tsx), [`ActionPanel`](engine/components/ActionPanel.tsx), [`CTABanner`](engine/components/CTABanner.tsx), [`ProblemCTA`](engine/components/ProblemCTA.tsx) accept optional `pageTier` / `pageType` and repeat attrs on their roots when provided.
- **Topic×location:** Classified as **`service_location`** for tiering (same fallback tier as L4 service×location without inlink data).
- **Vertical-local CTA duplicates** under `verticals/*/components/sections/` do **not** receive these props until refactored to use engine components or forwarding.

### 13.2 Call tracking infrastructure

- **[`engine/lib/phone/handleCallClick.ts`](engine/lib/phone/handleCallClick.ts):** `handleCallClick`, `digitsFromPhone`, `TrackCallClickContext` (`page_path`, `service_slug`, `location_slug`, `vertical`, `source`).
- **[`engine/components/TrackablePhoneLink.tsx`](engine/components/TrackablePhoneLink.tsx):** Client component; `tel:` href; on click runs `handleCallClick` (optional GA4 `call_click` when `gtag` exists; fire-and-forget `POST` to **`/api/track-call-click`**). Props include `phone`, `vertical`, optional slugs, `pagePath`, `source` (`cta` | `header` | `footer` | `inline`).
- **API route:** Implemented per vertical at `verticals/{vertical}/app/api/track-call-click/route.ts` (not in the engine package).
- **Convention:** New phone CTAs in shared engine code should use **`TrackablePhoneLink`** and pass **`callTrackVertical`** (and service/location slugs when relevant).

### 13.3 Shared SEO stack (metadata and on-page)

- **Metadata:** [`engine/utils/metadata.ts`](engine/utils/metadata.ts) — shared builders (e.g. location, service hub, problem, topic×location, hub/info). Use deterministic title patterns / clamping; avoid vertical-specific drainage-only copy on non-drain sites. Vertical `generateMetadata` should call these helpers rather than duplicating strings.
- **On-page:** Engine page components enforce heading discipline, section intros, first-paragraph and thin-content rules, and early contextual internal links where implemented.
- **Indexation helpers:** Title candidate pools and rotation for clamp collisions; homepage “Core services” link strips live in each vertical’s `app/page.tsx`; sitemap rules remain per **§8**.

---

## 14. New vertical deployment — lessons learned (scaffolding, April 2026)

These issues arose when deploying the scaffolding vertical to Vercel and are documented so future new-vertical builds can avoid them.

### 14.1 `pickRelatedServiceLocationLinks` signature mismatch

**Symptom:** TypeScript build error: `Object literal may only specify known properties, and 'relatedServiceSlugs' does not exist in type`.

**Cause:** The engine's `pickRelatedServiceLocationLinks` accepts `{ currentServiceSlug, services, location, priorityByService, maxLinks }` — it takes the **full `location` object** and the **full priority map**, not individual `relatedServiceSlugs` and `locationId`. The generated vertical used a stale API shape.

**Fix:** Remove `pickRelatedServiceLocationLinks` from the L4 page entirely. Build `otherServices: Service[]` directly by mapping `RELATED_SERVICE_SLUGS_BY_SERVICE[service.slug]` to `Service` objects then slicing to 5. Pass those to `LocationPage` as `otherServices`. The `pickRelatedServiceLocationLinks` utility returns `InternalLinkTarget[]`, not `Service[]`, so it cannot be passed directly to `LocationPage.otherServices`.

### 14.2 `buildLocationContextParagraph` wrong argument order

**Symptom:** TypeScript build error: `Expected 2 arguments, but got 3`.

**Cause:** The engine function signature is `buildLocationContextParagraph(template: string, params: BuildLocationContextParams)` — template first, params object second. The generated vertical called it as `(location, service, template)`.

**Fix:**
```typescript
const locationContextParagraph = verticalConfig.locationContextTemplate
  ? buildLocationContextParagraph(verticalConfig.locationContextTemplate, {
      serviceTitle: service.title,
      locationName: location.name,
      area: location.area,
      nearbyTowns: location.nearbyTowns ?? [],
    })
  : undefined;
```

### 14.3 `LocationPage` prop name mismatches

**Symptom:** Multiple TypeScript errors on the `<LocationPage>` JSX element — props not found in `LocationPageProps`.

**Cause:** Several props were named incorrectly. Correct names from `engine/components/LocationPage.tsx`:

| Wrong prop name used | Correct prop name |
|---|---|
| `heroImage` | `serviceImage` |
| `heroAlt` | *(no such prop — remove)* |
| `faqs` | `localFaqs` |
| `locationContext` | `locationContextParagraph` |
| `sectionIntros` | *(no such prop on LocationPage — remove)* |
| `relatedServicesIntro` | *(no such prop on LocationPage — remove)* |
| `relatedLocationsIntro` | *(no such prop on LocationPage — remove)* |

Also: `serviceSlug` and `locationSlug` are **required** on `LocationPage` and must be passed explicitly (the route params). `neighbourLocationsForContext` should also be passed.

**Rule:** Always read `engine/components/LocationPage.tsx` `LocationPageProps` interface before writing the JSX for a new vertical's L4 page. Do not assume props from another vertical or from memory.

### 14.4 `HubPage` missing required props

**Symptom:** TypeScript build error: `Type '{ hub: HubData; pages: InfoPageData[]; ... }' is missing the following properties from type 'HubPageProps': heroImage, heroAlt, crossSections, keyServices, callTrackVertical`.

**Cause:** `HubPage` requires `heroImage`, `heroAlt`, `crossSections` (links to other hubs), `keyServices` (service list), and `callTrackVertical`. The hub index pages were calling `<HubPage>` directly with only 4 props.

**Fix:** Create `lib/hubPageProps.ts` (mirroring `verticals/groundworks/lib/hubPageProps.ts`) and use `getHubPageProps(category)` in all hub index pages:
```typescript
export default function HubIndexPage() {
  const props = getHubPageProps(category);
  if (!props) notFound();
  return <HubPage {...props} />;
}
```

### 14.5 Per-vertical brand colour (`--highlight` CSS variable)

**Rule:** Each vertical defines its brand/CTA colour via the `--highlight` CSS variable in `app/globals.css`. Copy-pasting `globals.css` from another vertical copies that vertical's colour. **Always set `--highlight` explicitly per new vertical:**

| Vertical | `--highlight` | Hex |
|---|---|---|
| Drains | `32 95% 44%` | amber |
| Groundworks | `32 95% 44%` | amber |
| Access | `245 61% 40%` | indigo |
| Surveys | *(check surveys/app/globals.css)* | — |
| Scaffolding | `199 97% 48%` | `#03A7F0` sky blue |

The `--highlight` variable drives `bg-highlight` (used by `Button variant="highlight"`) and any utility that references `hsl(var(--highlight))`. Also add `--highlight-hover` for hover states.

### 14.6 Trust logos in footer missing

**Symptom:** The `GroupFooter` component renders with no trust badge images, unlike other verticals.

**Cause:** `GroupFooter` accepts optional `dbsLogoSrc`, `citbLogoSrc`, `trustmarkLogoSrc`, `fmbLogoSrc` props. These image files must exist in the vertical's `public/` folder **and** be passed as props. A new vertical created by copying the footer component will not pass these props.

**Fix:** Copy trust logo PNGs to `verticals/{new}/public/` and pass them to `GroupFooter`:
```typescript
<GroupFooter
  items={groupLinks}
  variant="onPrimary"
  trustLine="…"
  citbLogoSrc="/citb.png"
  dbsLogoSrc="/dbs.png"
  trustmarkLogoSrc="/trustmark.png"
/>
```

### 14.7 Logos not in `public/` folder

**Symptom:** Logo images referenced in Header (`/logo_black.svg`) and Footer (`/logo_white.svg`) return 404.

**Cause:** Logo SVGs were placed in the vertical root directory, not in `public/`. Next.js only serves static assets from `public/`.

**Fix:** Move all static assets to `verticals/{new}/public/` before first deploy. Also copy `placeholder.svg` from an existing vertical for `next/image` fallbacks.

---

*End of AGENTS.md. When in doubt, preserve existing URLs and data flow; extend via new data and optional new routes (e.g. L5) without breaking L1–L4 or the shared location system.*
