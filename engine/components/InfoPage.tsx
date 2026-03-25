import Link from "next/link";
import { Button } from "./ui/button";
import { CheckCircle, Phone } from "lucide-react";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import { FAQSchema, type FAQItem } from "../schema/FAQSchema";
import { InspectionCTA } from "./InspectionCTA";
import { MidContentCTA } from "./MidContentCTA";
import { RelatedLinks } from "./RelatedLinks";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { CTABanner } from "./CTABanner";
import { TrackablePhoneLink } from "./TrackablePhoneLink";
import { getVariantIndex } from "../lib/contentVariants";
import { getPageTier, pageSeoDataAttrs, type PageType } from "../lib/pageWeighting";
import { getServiceUrl } from "../utils/serviceUrls";
import type { HubData, InfoPageData, Service, Location, CompanyInfo } from "../types";

export interface RelatedPageLink {
  title: string;
  href: string;
}

const INFO_H2_WHEN_NEEDED = [
  "When you might need this",
  "Situations where this applies",
  "When to consider this guidance",
] as const;

const INFO_H2_SIGNS = [
  "Signs and common situations",
  "Common warning signs",
  "What often triggers action",
] as const;

const INFO_H2_WORK_INVOLVES = [
  "What the work typically involves",
  "How this is usually carried out",
  "What to expect from the work",
] as const;

const INFO_H2_FIX = [
  "How we approach the fix",
  "How this gets resolved",
  "Practical steps to a reliable outcome",
] as const;

const INFO_H2_COST = [
  "What affects cost and complexity",
  "Cost and complexity factors",
  "What drives programme and budget",
] as const;

const INFO_H2_PROCESS = [
  "How we work through the job",
  "How delivery is structured",
  "What the process looks like",
] as const;

export interface InfoPageProps {
  hub: HubData;
  page: InfoPageData;
  otherPages: InfoPageData[];
  heroImage: string;
  heroAlt: string;
  pageFaqs: FAQItem[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  contactPath?: string;
  relatedPageLinks?: RelatedPageLink[];
  services: Service[];
  locations: Location[];
  hubPages: HubData[];
  getCategoryPages: (category: string) => InfoPageData[];
  /** Title for the related guides block in sidebar. Default "Related Articles". */
  relatedGuidesTitle?: string;
  callTrackVertical: string;
  /** Optional internal link count for page tiering (future crawl/analytics feed). */
  inlinkCount?: number | null;
}

export function InfoPage({
  hub,
  page,
  otherPages,
  heroImage,
  heroAlt,
  pageFaqs,
  companyInfo,
  baseUrl,
  contactPath = "/contact",
  relatedPageLinks = [],
  services,
  locations,
  hubPages,
  getCategoryPages,
  relatedGuidesTitle = "Related Articles",
  callTrackVertical,
  inlinkCount,
}: InfoPageProps) {
  const seoPageType: PageType = "topic";
  const pageTier = getPageTier({ inlinks: inlinkCount ?? null, pageType: seoPageType });
  const rootSeoAttrs = pageSeoDataAttrs(pageTier, seoPageType);
  const relatedGuides = otherPages.slice(0, 5);
  const signs = page.signs.slice(0, 5);
  const shouldUseSignsList = signs.length >= 4;
  const signsNarrative =
    signs.length > 0
      ? signs.join(signs.length > 2 ? ", " : " and ")
      : "early warning signs affecting reliability, compliance, or project pace";
  const openingVariant = getVariantIndex(`info-opening:${hub.category}:${page.slug}`, 3);
  const openingLead = [
    `Most teams review ${page.title.toLowerCase()} when live project risk needs turning into a clear technical decision with practical next steps.`,
    `${page.title} usually becomes urgent when recurring symptoms begin affecting programme confidence, compliance, or delivery reliability.`,
    `The commercial value of resolving ${page.title.toLowerCase()} early is fewer delays, clearer budgeting, and reduced repeat disruption.`,
  ][openingVariant];
  const primaryOpening = (page.contextualOpening ?? page.intro)?.trim() ?? "";
  const firstRelatedServiceSlug = page.relatedServices?.[0];
  const firstRelatedService = firstRelatedServiceSlug
    ? services.find((s) => s.slug === firstRelatedServiceSlug)
    : undefined;
  const earlyServiceHubLink =
    page.topicLocationLink || page.serviceLocationLink
      ? null
      : (firstRelatedService ?? services[0] ?? null);
  const h2Seed = `info-h2:${hub.category}:${page.slug}`;
  const h2When = INFO_H2_WHEN_NEEDED[getVariantIndex(`${h2Seed}:when`, INFO_H2_WHEN_NEEDED.length)];
  const h2Signs = INFO_H2_SIGNS[getVariantIndex(`${h2Seed}:signs`, INFO_H2_SIGNS.length)];
  const h2Work = INFO_H2_WORK_INVOLVES[getVariantIndex(`${h2Seed}:work`, INFO_H2_WORK_INVOLVES.length)];
  const h2Fix = INFO_H2_FIX[getVariantIndex(`${h2Seed}:fix`, INFO_H2_FIX.length)];
  const h2Cost = INFO_H2_COST[getVariantIndex(`${h2Seed}:cost`, INFO_H2_COST.length)];
  const h2Process = INFO_H2_PROCESS[getVariantIndex(`${h2Seed}:process`, INFO_H2_PROCESS.length)];

  if (process.env.NODE_ENV !== "production") {
    const estimatedOpeningWords = `${primaryOpening} ${openingLead}`.trim().split(/\s+/).length;
    if (estimatedOpeningWords < 45) {
      console.warn("[page-quality-warning]", {
        pageType: "topic",
        variant: ["A", "B", "C"][openingVariant],
        slug: page.slug,
        estimatedOpeningWords,
      });
    }
  }
  return (
    <div className="contents" {...rootSeoAttrs}>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: page.title,
          description: page.metaDescription,
          url: `${hub.basePath}/${page.slug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          breadcrumbs: [
            { name: "Home", url: "/" },
            { name: hub.title, url: hub.basePath },
            { name: page.title, url: `${hub.basePath}/${page.slug}` },
          ],
        }}
      />
      <section className="relative bg-primary py-16 md:py-24">
        <div className="absolute inset-0">
          <img src={heroImage} alt={heroAlt} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <BreadcrumbNav
              items={[
                { name: "Home", url: "/" },
                { name: hub.title, url: hub.basePath },
                { name: page.title, url: `${hub.basePath}/${page.slug}` },
              ]}
              variant="inverse"
            />
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">
              {page.title}
            </h1>
          </div>
        </div>
      </section>
      <section className="section-padding" data-layout-variant={["A", "B", "C"][openingVariant]}>
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {primaryOpening ? (
                <p className="mb-6 text-lg text-muted-foreground">{primaryOpening}</p>
              ) : null}
              <p className="mb-6 text-muted-foreground">{openingLead}</p>
              {(page.topicLocationLink || page.serviceLocationLink) && (
                <p className="mb-8 text-muted-foreground">
                  {page.topicLocationLink && (
                    <>
                      For local or on-site context, see{" "}
                      <Link href={page.topicLocationLink.href} className="text-primary hover:underline">
                        {page.topicLocationLink.linkText}
                      </Link>
                      {page.serviceLocationLink ? ", or " : "."}
                    </>
                  )}
                  {page.serviceLocationLink && (
                    <>
                      review{" "}
                      <Link href={page.serviceLocationLink.href} className="text-primary hover:underline">
                        {page.serviceLocationLink.linkText}
                      </Link>
                      .
                    </>
                  )}
                </p>
              )}
              {earlyServiceHubLink && (
                <p className="mb-8 text-muted-foreground">
                  For how we deliver this work commercially, see the{" "}
                  <Link href={getServiceUrl(earlyServiceHubLink.slug)} className="text-primary hover:underline">
                    {earlyServiceHubLink.title} service overview
                  </Link>
                  .
                </p>
              )}
              <h2 className="mb-4 font-display text-2xl font-bold">{h2When}</h2>
              <p className="mb-8 text-muted-foreground">
                {page.whenNeeded ??
                  `Teams usually investigate ${page.title.toLowerCase()} when early warning signs start affecting reliability, compliance, or project timelines. This is often the point where decision makers move from observation into scoped technical action.`}
              </p>
              <h2 className="mb-4 font-display text-2xl font-bold">{h2Signs}</h2>
              <p className="mb-3 text-muted-foreground">
                The symptoms below are the most common triggers we see before diagnosis and repair planning.
              </p>
              {shouldUseSignsList ? (
                <ul className="mb-8 space-y-2">
                  {signs.map((sign) => (
                    <li key={sign} className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span>{sign}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mb-8 text-muted-foreground">
                  Typical triggers include {signsNarrative}, which is usually the point where teams move from
                  monitoring into scoped delivery planning.
                </p>
              )}
              <h2 className="mb-4 font-display text-2xl font-bold">{h2Work}</h2>
              <p className="mb-4 text-muted-foreground">{page.workInvolves ?? page.diagnosis}</p>
              <MidContentCTA
                companyInfo={companyInfo}
                message={`Think you might have ${page.title.toLowerCase()}? A professional inspection will confirm the diagnosis.`}
                buttonLink={contactPath}
                callTrackVertical={callTrackVertical}
                callTrackServiceSlug={page.relatedServices?.[0] ?? services[0]?.slug ?? null}
                callTrackLocationSlug={null}
                pageTier={pageTier}
                pageType={seoPageType}
              />
              <h2 className="mb-4 font-display text-2xl font-bold">{h2Fix}</h2>
              <p className="mb-8 text-muted-foreground">{page.resolution}</p>
              <h2 className="mb-4 font-display text-2xl font-bold">{h2Cost}</h2>
              <p className="mb-8 text-muted-foreground">
                {page.costComplexity ??
                  "Cost and complexity usually depend on access constraints, total scope, existing condition, and whether related works need to be coordinated in the same programme window."}
              </p>
              <h2 className="mb-4 font-display text-2xl font-bold">{h2Process}</h2>
              <p className="mb-3 text-muted-foreground">
                We keep delivery structured so scope, sequencing, and sign-off remain clear.
              </p>
              <ol className="mb-8 space-y-3">
                {(page.processStepsDetailed ?? [
                  { title: "Initial assessment", outcome: "Root cause and scope are confirmed." },
                  { title: "Method planning", outcome: "Practical repair strategy is agreed." },
                  { title: "Delivery and verification", outcome: "Work is completed and validated." },
                ]).slice(0, 5).map((step, idx) => (
                  <li key={`${step.title}-${idx}`} className="rounded-lg border border-border bg-secondary/40 p-4">
                    <p className="font-medium">
                      Step {idx + 1}: {step.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">What this step delivers: {step.outcome}</p>
                  </li>
                ))}
              </ol>
              {relatedPageLinks.length > 0 && (
                <div className="mb-8 rounded-lg border border-border bg-secondary/50 p-6">
                  <h3 className="mb-4 font-display text-lg font-bold">
                    How This Issue Is Normally Diagnosed and Repaired
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Follow the typical path from problem identification through to resolution:
                  </p>
                  <ol className="space-y-2">
                    {relatedPageLinks.map((rp, idx) => (
                      <li key={rp.href} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          {idx + 1}
                        </span>
                        <Link
                          href={rp.href}
                          className="text-sm text-primary hover:underline"
                        >
                          {rp.title}
                        </Link>
                      </li>
                    ))}
                    <li className="flex items-center gap-2">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {relatedPageLinks.length + 1}
                      </span>
                      <Link href={contactPath} className="text-sm text-primary hover:underline">
                        Get a Free Quote →
                      </Link>
                    </li>
                  </ol>
                </div>
              )}
              {locations.length > 0 && (page.relatedServices?.[0] || services[0]?.slug) && (
                <div className="mb-8">
                  <h3 className="mb-3 font-display text-lg font-bold">We provide these services across the UK, including</h3>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {locations.slice(0, 8).map((loc) => (
                      <Link
                        key={loc.id}
                        href={`/${page.relatedServices?.[0] || services[0]?.slug}/${loc.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="mb-8">
                <InspectionCTA
                  companyInfo={companyInfo}
                  contactPath={contactPath}
                  callTrackVertical={callTrackVertical}
                  callTrackServiceSlug={page.relatedServices?.[0] ?? services[0]?.slug ?? null}
                  callTrackLocationSlug={null}
                  pageTier={pageTier}
                  pageType={seoPageType}
                />
              </div>
              <div className="rounded-lg bg-primary p-6 text-center">
                <p className="mb-4 text-lg font-medium text-primary-foreground">{page.ctaText}</p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href={contactPath}>Discuss your project</Link>
                  </Button>
                  <TrackablePhoneLink
                    phone={companyInfo.phone}
                    vertical={callTrackVertical}
                    serviceSlug={page.relatedServices?.[0] ?? services[0]?.slug ?? null}
                    locationSlug={null}
                    className="flex items-center gap-2 text-primary-foreground"
                  >
                    <Phone className="h-5 w-5" /> {companyInfo.phone}
                  </TrackablePhoneLink>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <RelatedLinks
                relatedServices={page.relatedServices}
                category={hub.category}
                currentSlug={page.slug}
                services={services}
                locations={locations}
                hubPages={hubPages}
                getCategoryPages={getCategoryPages}
              />
              {relatedGuides.length > 0 && (
                <div className="rounded-lg bg-secondary p-6">
                  <h3 className="mb-4 font-display text-lg font-bold">{relatedGuidesTitle}</h3>
                  <div className="space-y-2">
                    {relatedGuides.map((p) => (
                      <Link
                        key={p.slug}
                        href={`${hub.basePath}/${p.slug}`}
                        className="block text-sm text-primary hover:underline"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="rounded-lg bg-secondary p-6">
                <h3 className="mb-4 font-display text-lg font-bold">Contact Us</h3>
                <TrackablePhoneLink
                  phone={companyInfo.phone}
                  vertical={callTrackVertical}
                  serviceSlug={page.relatedServices?.[0] ?? services[0]?.slug ?? null}
                  locationSlug={null}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-4 w-4" /> {companyInfo.phone}
                </TrackablePhoneLink>
                <Button asChild className="mt-4 w-full">
                  <Link href={contactPath}>Get a Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSchema items={pageFaqs} title={`${page.title} FAQ`} />
      <CTABanner
        companyInfo={companyInfo}
        contactPath={contactPath}
        pageTier={pageTier}
        pageType={seoPageType}
      />
    </div>
  );
}
