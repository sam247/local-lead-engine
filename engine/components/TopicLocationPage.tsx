import Link from "next/link";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { Button } from "./ui/button";
import type { Location } from "../types";
import { getVariantIndex } from "../lib/contentVariants";

export interface TopicLocationProcessStep {
  title: string;
  outcome: string;
}

export interface TopicLocationPageProps {
  topicTitle: string;
  topicSlug: string;
  location: Location;
  locationSlug: string;
  topicHubPath: string;
  contextualOpening: string;
  whenNeeded: string;
  workInvolves: string;
  commonScenarios: string[];
  costComplexity: string;
  typicalUseCases: string[];
  processStepsDetailed: TopicLocationProcessStep[];
  bodyContextLine?: string;
  servicesHeading: string;
  servicesIntro: string;
  serviceLinks: Array<{ slug: string; title: string }>;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  contactQuoteText?: string;
  companyName?: string;
}

function clampItems(items: string[], max = 5): string[] {
  return items.slice(0, max);
}

const LAYOUT_VARIANTS = ["A", "B", "C"] as const;

export function TopicLocationPage({
  topicTitle,
  topicSlug,
  location,
  locationSlug,
  topicHubPath,
  contextualOpening,
  whenNeeded,
  workInvolves,
  commonScenarios,
  costComplexity,
  typicalUseCases,
  processStepsDetailed,
  bodyContextLine,
  servicesHeading,
  servicesIntro,
  serviceLinks,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  contactQuoteText,
  companyName,
}: TopicLocationPageProps) {
  const layoutVariantIndex = getVariantIndex(`layout:topic-location:${topicSlug}:${locationSlug}`, LAYOUT_VARIANTS.length);
  const layoutVariant = LAYOUT_VARIANTS[layoutVariantIndex];
  const scenarioItems = clampItems(commonScenarios);
  const useCaseItems = clampItems(typicalUseCases);
  const processItems = processStepsDetailed.slice(0, 5);
  const topicCategory = topicHubPath.replace(/^\//, "").split("/")[0] || undefined;
  const openingStructure = [
    `Most enquiries for ${topicTitle.toLowerCase()} in ${location.name} involve active project scopes where decisions on delivery method and timing affect overall outcomes.`,
    `Projects usually reach this stage when a practical issue becomes time-sensitive and teams need a clear, location-aware implementation route.`,
    `The best outcomes usually come when ${topicTitle.toLowerCase()} is scoped early enough to align risk, budget, and programme constraints.`,
  ][layoutVariantIndex];

  const whenNeededSection = (
    <section className="mb-8">
      <h2 className="mb-3 font-display text-xl font-semibold">When you might need this</h2>
      <p className="max-w-3xl text-muted-foreground">{whenNeeded}</p>
    </section>
  );

  const workInvolvesSection = (
    <section className="mb-8">
      <h2 className="mb-3 font-display text-xl font-semibold">What the work typically involves</h2>
      <p className="max-w-3xl text-muted-foreground">{workInvolves}</p>
    </section>
  );

  const processSection = (
    <section className="mb-8">
      <h2 className="mb-3 font-display text-xl font-semibold">How we work through the job</h2>
      <p className="mb-3 max-w-3xl text-muted-foreground">
        We keep delivery structured so decisions, dependencies, and handover remain clear from start to finish.
      </p>
      <ol className="space-y-3">
        {processItems.map((step, idx) => (
          <li key={`${step.title}-${idx}`} className="rounded-lg border border-border bg-secondary/40 p-4">
            <p className="font-medium">
              Step {idx + 1}: {step.title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">What this step delivers: {step.outcome}</p>
          </li>
        ))}
      </ol>
    </section>
  );

  if (process.env.NODE_ENV !== "production") {
    const estimatedOpeningWords = `${contextualOpening} ${openingStructure}`.trim().split(/\s+/).length;
    const estimatedPrimarySections = 7;
    if (estimatedOpeningWords < 45 || estimatedPrimarySections > 7) {
      console.warn("[page-quality-warning]", {
        pageType: "topic-location",
        variant: layoutVariant,
        topicSlug,
        locationSlug,
        estimatedOpeningWords,
        estimatedPrimarySections,
      });
    }
  }

  return (
    <main
      className="container mx-auto px-4 py-8"
      data-page-type="topic-location"
      data-layout-variant={layoutVariant}
      data-topic-category={topicCategory}
    >
      <BreadcrumbNav
        items={[
          { name: "Home", url: "/" },
          { name: topicTitle, url: topicHubPath },
          { name: `${topicTitle} in ${location.name}`, url: `/${topicSlug}/${locationSlug}` },
        ]}
      />

      <h1 className="mb-4 font-display text-3xl font-bold">
        {topicTitle} in {location.name}
      </h1>

      <section className="mb-8 max-w-3xl space-y-3">
        <p className="text-muted-foreground">{contextualOpening}</p>
        <p className="text-muted-foreground">{openingStructure}</p>
      </section>

      {layoutVariant === "B" ? (
        <>
          {whenNeededSection}
          {workInvolvesSection}
        </>
      ) : (
        <>
          {workInvolvesSection}
          {whenNeededSection}
        </>
      )}
      {layoutVariant === "C" && processSection}

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Signs and common situations</h2>
        <p className="mb-3 max-w-3xl text-muted-foreground">
          These are typical triggers we see across {location.name} and {location.area} before teams move to
          implementation.
        </p>
        {scenarioItems.length > 0 && (
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {scenarioItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">What affects cost and complexity</h2>
        <p className="max-w-3xl text-muted-foreground">{costComplexity}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Typical projects and use cases</h2>
        <p className="mb-3 max-w-3xl text-muted-foreground">
          Scope varies by building type, programme pressure, and operational constraints, so early planning usually
          improves delivery quality and speed.
        </p>
        {useCaseItems.length > 0 && (
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {useCaseItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </section>

      {layoutVariant !== "C" && processSection}

      {bodyContextLine && (
        <section className="mb-8">
          <p className="max-w-3xl text-muted-foreground">{bodyContextLine}</p>
        </section>
      )}

      <section className="mb-8 flex flex-wrap gap-4">
        <Link href={primaryCtaHref}>
          <Button>{primaryCtaText}</Button>
        </Link>
        {secondaryCtaText && secondaryCtaHref && (
          <Link href={secondaryCtaHref}>
            <Button variant="outline">{secondaryCtaText}</Button>
          </Link>
        )}
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 font-display text-2xl font-bold">
          {servicesHeading} in {location.name}
        </h2>
        <p className="mb-4 text-muted-foreground">{servicesIntro}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {serviceLinks.map((service) => (
            <li key={service.slug}>
              <Link href={`/${service.slug}/${locationSlug}`} className="text-primary hover:underline">
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <p className="text-muted-foreground">
          <Link href={topicHubPath} className="text-primary hover:underline">
            View full {topicTitle.toLowerCase()} guide
          </Link>{" "}
          for wider planning context, or{" "}
          <Link href="/contact" className="text-primary hover:underline">
            {contactQuoteText ?? `contact ${companyName ?? "our team"} for a quote`}
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
