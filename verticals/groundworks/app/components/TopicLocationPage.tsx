import Link from "next/link";
import { Button } from "engine";
import type { TopicLocationTopic } from "@/lib/topicLocationConfig";
import type { Location } from "engine";
import { TOPIC_PAGE_SERVICES } from "@/lib/topicLocationConfig";
import { verticalConfig } from "@/config";

type Props = {
  topic: TopicLocationTopic;
  location: Location;
  topicSlug: string;
  locationSlug: string;
};

export function TopicLocationPage({
  topic,
  location,
  topicSlug,
  locationSlug,
}: Props) {
  const primaryServiceLocationPath = `/${topic.primaryServiceSlug}/${locationSlug}`;

  return (
    <main className="container mx-auto px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:underline">
          Groundworks Guides
        </Link>
        <span className="mx-2">/</span>
        <span>
          {topic.title} in {location.name}
        </span>
      </nav>

      <h1 className="mb-4 font-display text-3xl font-bold">
        {topic.title} in {location.name}
      </h1>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">Introduction</h2>
        <p className="max-w-3xl text-muted-foreground">
          {topic.intro} In {location.name} and {location.area}, developers, self-builders and
          property owners often look for {topic.title.toLowerCase()} to support construction,
          renovation and repair. This page summarises what you need to know and how we can help in
          your area.
        </p>
      </section>

      {topic.commonProblems.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-xl font-semibold">Common problems</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {topic.commonProblems.map((problem, i) => (
              <li key={i}>{problem}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold">How groundworks solve the issue</h2>
        <p className="max-w-3xl text-muted-foreground">{topic.howSolved}</p>
      </section>

      {topic.typicalScenarios.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-3 font-display text-xl font-semibold">
            Typical construction scenarios
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {topic.typicalScenarios.map((scenario, i) => (
              <li key={i}>{scenario}</li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <p className="max-w-3xl text-muted-foreground">
          We provide {topic.title.toLowerCase()} and related groundworks across {location.name} and{" "}
          {location.area}. Our team delivers piling, excavation, foundations, site clearance and
          drainage for commercial and residential projects, with free no-obligation quotes.
        </p>
      </section>

      <section className="mb-8 flex flex-wrap gap-4">
        <Link href={primaryServiceLocationPath}>
          <Button>{topic.ctaText}</Button>
        </Link>
        <Link href="/contact">
          <Button variant="outline">Contact us for a quote</Button>
        </Link>
      </section>

      <section className="border-t pt-8">
        <h2 className="mb-4 font-display text-2xl font-bold">
          Groundworks services in {location.name}
        </h2>
        <p className="mb-4 text-muted-foreground">
          We offer the following groundworks services in {location.name} and {location.area}. Each
          links to the service page for your area.
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
