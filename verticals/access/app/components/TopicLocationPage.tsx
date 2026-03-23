import Link from "next/link";
import { Button } from "engine/components/ui/button";
import type { ProgrammaticTopic } from "@/data/programmaticTopicTypes";
import type { Location } from "engine";
import { TOPIC_HUB_PATH, TOPIC_PAGE_SERVICES } from "@/lib/topicLocationConfig";
import { verticalConfig } from "@/config";

type Props = {
  topic: ProgrammaticTopic;
  location: Location;
  topicSlug: string;
  locationSlug: string;
  topicHubPath: string;
};

export function TopicLocationPage({
  topic,
  location,
  topicSlug,
  locationSlug,
  topicHubPath,
}: Props) {
  const primaryServiceSlug = topic.relatedServiceSlugs[0];
  const primaryServiceLocationPath = primaryServiceSlug ? `/${primaryServiceSlug}/${locationSlug}` : null;

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href={topicHubPath} className="hover:underline">
          {topic.title}
        </Link>
        <span className="mx-2">/</span>
        <span>{topic.title} in {location.name}</span>
      </nav>

      <h1 className="mb-4 font-display text-3xl font-bold">
        {topic.title} in {location.name}
      </h1>

      <p className="mb-6 max-w-3xl text-lg text-muted-foreground">
        {topic.intro} Businesses in {location.name} and {location.area} often look for {topic.title.toLowerCase()} to support security, operations and compliance. This page summarises what you need to know and how we can help in your area.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">About {topic.title}</h2>
        <p className="max-w-3xl text-muted-foreground">{topic.explanation}</p>
      </section>

      {topic.commonProblems.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Common problems businesses face</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {topic.commonProblems.map((problem, i) => (
              <li key={i}>{problem}</li>
            ))}
          </ul>
        </section>
      )}

      {topic.sectorUseCases.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Sector use cases</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {topic.sectorUseCases.map((useCase, i) => (
              <li key={i}>{useCase}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <p className="max-w-3xl text-muted-foreground">
          We provide {topic.title.toLowerCase()} and related security solutions across {location.name} and {location.area}. Our team designs and installs systems for commercial and public-sector sites, with free no-obligation site surveys and quotes.
        </p>
      </section>

      <section className="mb-8 flex flex-wrap gap-4">
        <Link href={topicHubPath}>
          <Button variant="outline">View topic guide: {topic.title}</Button>
        </Link>
        {primaryServiceLocationPath && (
          <Link href={primaryServiceLocationPath}>
            <Button>{topic.ctaText}</Button>
          </Link>
        )}
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 font-display text-2xl font-bold">
          Security services in {location.name}
        </h2>
        <p className="mb-4 text-muted-foreground">
          We offer the following security and access services in {location.name} and {location.area}. Each links to the service page for your area.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {TOPIC_PAGE_SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/${service.slug}/${locationSlug}`}
                className="text-primary hover:underline"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <Link href="/contact" className="text-primary hover:underline">
          Contact {verticalConfig.companyInfo.name} for a quote
        </Link>
      </section>
    </main>
  );
}
