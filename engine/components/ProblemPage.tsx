import Link from "next/link";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { ProblemCTA } from "./ProblemCTA";
import { SchemaMarkup } from "../schema/SchemaMarkup";
import type { ProblemData, Service, CompanyInfo } from "../types";

export interface FeaturedLocation {
  id: string;
  name: string;
}

export interface ProblemPageProps {
  problem: ProblemData;
  services: Service[];
  companyInfo: CompanyInfo;
  baseUrl: string;
  contactPath?: string;
  basePath?: string;
  problemsBasePath?: string;
  /** Breadcrumb label for the problems hub (e.g. "Drain Problems", "Access Problems"). Default "Problems". */
  problemsBreadcrumbLabel?: string;
  /** Full list of problems for "Related issues" section. When provided, 3–5 other problems (excluding current) are linked. */
  allProblems?: ProblemData[];
  /** Heading for the related problems section (e.g. "Related drain issues"). */
  relatedProblemsTitle?: string;
  /** Optional title for diagnosis nav block at top (e.g. "Drain problem diagnosis"). When set with allProblems, block is shown. */
  diagnosisSectionTitle?: string;
  /** Optional heading for causes section (default "What causes this problem"). */
  causesSectionTitle?: string;
  /** Optional heading for when-to-call section (default "When to call a professional"). */
  whenToCallSectionTitle?: string;
  /** Optional locations for "Drain repair services near you" section. */
  featuredLocations?: FeaturedLocation[];
  /** Service slug for location links (e.g. "drain-collapse-repair"). */
  primaryServiceSlug?: string;
  /** Label for location link text (e.g. "Drain collapse repair"). */
  primaryServiceLabel?: string;
  /** Build path for service + location (e.g. (slug, id) => `/${slug}/${id}`). */
  locationLinkPath?: (serviceSlug: string, locationId: string) => string;
  /** Title for "services near you" section (e.g. "Drain repair services near you"). */
  servicesNearYouTitle?: string;
  /** Intro copy for "services near you" section. */
  servicesNearYouIntro?: string;
}

const RELATED_PROBLEMS_MAX = 5;

const DEFAULT_CAUSES_TITLE = "What causes this problem";
const DEFAULT_WHEN_TO_CALL_TITLE = "When to call a professional";

export function ProblemPage({
  problem,
  services,
  companyInfo,
  baseUrl,
  contactPath = "/contact",
  basePath = "/services",
  problemsBasePath = "/drain-problems",
  problemsBreadcrumbLabel,
  allProblems = [],
  relatedProblemsTitle,
  diagnosisSectionTitle,
  causesSectionTitle = DEFAULT_CAUSES_TITLE,
  whenToCallSectionTitle = DEFAULT_WHEN_TO_CALL_TITLE,
  featuredLocations = [],
  primaryServiceSlug,
  primaryServiceLabel,
  locationLinkPath,
  servicesNearYouTitle,
  servicesNearYouIntro,
}: ProblemPageProps) {
  const relatedServices = problem.relatedServiceSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => s != null);

  const serviceLinks = relatedServices.map((s) => ({
    slug: s.slug,
    label: s.title,
  }));

  const breadcrumbLabel = problemsBreadcrumbLabel ?? "Problems";
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: breadcrumbLabel, url: problemsBasePath },
    { name: `${problem.title} – Causes and Repair`, url: `${problemsBasePath}/${problem.slug}` },
  ];

  return (
    <>
      <SchemaMarkup
        type="Article"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{
          title: `${problem.title} – Causes and Repair`,
          description: `${problem.causes.slice(0, 155)}...`,
          url: `${baseUrl}${problemsBasePath}/${problem.slug}`,
        }}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        companyInfo={companyInfo}
        baseUrl={baseUrl}
        data={{ breadcrumbs }}
      />
      <section className="section-padding">
        <div className="container max-w-3xl">
          <BreadcrumbNav items={breadcrumbs} />
          <h1 className="mb-6 font-display text-3xl font-bold md:text-4xl">
            {problem.title} – Causes and Repair
          </h1>

          <h2 className="mb-2 font-display text-xl font-bold">Contextual opening</h2>
          <p className="mb-8 text-muted-foreground">
            {problem.contextualOpening ??
              `${problem.title} is usually investigated when visible symptoms begin affecting reliability, safety, or project delivery. Early diagnosis helps confirm whether this is an isolated issue or part of a wider condition.`}
          </p>

          {allProblems.length > 0 && diagnosisSectionTitle && (
            <>
              <h2 className="mb-2 font-display text-xl font-bold">{diagnosisSectionTitle}</h2>
              <ul className="mb-8 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                {allProblems.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`${problemsBasePath}/${p.slug}`}
                      className="text-primary hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mb-2 font-display text-xl font-bold">{causesSectionTitle}</h2>
          <p className="mb-8 text-muted-foreground">{problem.causes}</p>

          <h2 className="mb-2 font-display text-xl font-bold">When this is needed</h2>
          <p className="mb-8 text-muted-foreground">
            {problem.whenNeeded ??
              "This is typically needed when recurring symptoms, project risk, or compliance concerns mean a patch repair is no longer a reliable option."}
          </p>

          {problem.quickChecks && (
            <>
              <h2 className="mb-2 font-display text-xl font-bold">Quick checks you can try</h2>
              <p className="mb-8 text-muted-foreground">{problem.quickChecks}</p>
            </>
          )}

          {problem.seriousSigns && (
            <>
              <h2 className="mb-2 font-display text-xl font-bold">Signs of a serious drainage issue</h2>
              <p className="mb-8 text-muted-foreground">{problem.seriousSigns}</p>
            </>
          )}

          <h2 className="mb-2 font-display text-xl font-bold">How it is normally fixed</h2>
          <p className="mb-8 text-muted-foreground">{problem.workInvolves ?? problem.howFixed}</p>

          <h2 className="mb-2 font-display text-xl font-bold">What affects cost and complexity</h2>
          <p className="mb-8 text-muted-foreground">
            {problem.costComplexity ??
              "Cost and complexity usually depend on access, scale of remedial work, existing condition, and whether supporting works are needed to complete the fix safely."}
          </p>

          {problem.typicalUseCases && problem.typicalUseCases.length > 0 && (
            <>
              <h2 className="mb-2 font-display text-xl font-bold">Typical scenarios</h2>
              <p className="mb-3 text-muted-foreground">
                These are the most common project contexts where this issue is resolved.
              </p>
              <ul className="mb-8 list-inside list-disc space-y-1 text-muted-foreground">
                {problem.typicalUseCases.slice(0, 5).map((scenario) => (
                  <li key={scenario}>{scenario}</li>
                ))}
              </ul>
            </>
          )}

          {(problem.processStepsDetailed?.length ?? 0) > 0 && (
            <>
              <h2 className="mb-2 font-display text-xl font-bold">Process and timeline</h2>
              <p className="mb-3 text-muted-foreground">
                Work is delivered in stages so decisions, safety, and outcomes stay clear.
              </p>
              <ol className="mb-8 space-y-3">
                {problem.processStepsDetailed!.slice(0, 5).map((step, idx) => (
                  <li key={`${step.title}-${idx}`} className="rounded-lg border border-border bg-secondary/40 p-4">
                    <p className="font-medium">
                      Step {idx + 1}: {step.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">Outcome: {step.outcome}</p>
                  </li>
                ))}
              </ol>
            </>
          )}

          <h2 className="mb-2 font-display text-xl font-bold">{whenToCallSectionTitle}</h2>
          <p className="mb-8 text-muted-foreground">{problem.whenToCall}</p>

          <h2 className="mb-2 font-display text-xl font-bold">Related services</h2>
          <ul className="mb-8 list-inside list-disc space-y-1 text-muted-foreground">
            {relatedServices.map((s) => (
              <li key={s.id}>
                <Link href={`${basePath}/${s.slug}`} className="text-primary hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

          {allProblems.length > 0 && relatedProblemsTitle && (
            <>
              <h2 className="mb-2 font-display text-xl font-bold">{relatedProblemsTitle}</h2>
              <ul className="mb-8 list-inside list-disc space-y-1 text-muted-foreground">
                {allProblems
                  .filter((p) => p.slug !== problem.slug)
                  .slice(0, RELATED_PROBLEMS_MAX)
                  .map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`${problemsBasePath}/${p.slug}`}
                        className="text-primary hover:underline"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </>
          )}

          {featuredLocations.length > 0 &&
            primaryServiceSlug &&
            primaryServiceLabel &&
            locationLinkPath &&
            servicesNearYouTitle && (
              <>
                <h2 className="mb-2 font-display text-xl font-bold">{servicesNearYouTitle}</h2>
                {servicesNearYouIntro && (
                  <p className="mb-4 text-muted-foreground">{servicesNearYouIntro}</p>
                )}
                <ul className="mb-8 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                  {featuredLocations.map((loc) => (
                    <li key={loc.id}>
                      <Link
                        href={locationLinkPath(primaryServiceSlug, loc.id)}
                        className="text-primary hover:underline"
                      >
                        {primaryServiceLabel} {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

          <ProblemCTA
            message={problem.ctaMessage}
            serviceLinks={serviceLinks}
            basePath={basePath}
            contactPath={contactPath}
          />
        </div>
      </section>
    </>
  );
}
