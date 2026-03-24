import Link from "next/link";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { Button } from "./ui/button";
import type { Location } from "../types";

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
  const scenarioItems = clampItems(commonScenarios);
  const useCaseItems = clampItems(typicalUseCases);
  const processItems = processStepsDetailed.slice(0, 5);

  return (
    <main className="container mx-auto px-4 py-8">
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

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Contextual opening</h2>
        <p className="max-w-3xl text-muted-foreground">{contextualOpening}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">When this is needed</h2>
        <p className="max-w-3xl text-muted-foreground">{whenNeeded}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">What the work involves</h2>
        <p className="max-w-3xl text-muted-foreground">{workInvolves}</p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Common scenarios and problems</h2>
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

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Process and timeline</h2>
        <p className="mb-3 max-w-3xl text-muted-foreground">
          We keep delivery structured so decisions, dependencies, and handover remain clear from start to finish.
        </p>
        <ol className="space-y-3">
          {processItems.map((step, idx) => (
            <li key={`${step.title}-${idx}`} className="rounded-lg border border-border bg-secondary/40 p-4">
              <p className="font-medium">
                Step {idx + 1}: {step.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Outcome: {step.outcome}</p>
            </li>
          ))}
        </ol>
      </section>

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
