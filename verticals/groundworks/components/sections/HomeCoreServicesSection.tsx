import Link from "next/link";

export type HomeCoreServiceLink = { slug: string; title: string };

export interface HomeCoreServicesSectionProps {
  services: HomeCoreServiceLink[];
}

/** Full-width core services block with the same service URLs as the former post-hero strip. */
export function HomeCoreServicesSection({ services }: HomeCoreServicesSectionProps) {
  return (
    <section
      className="border-b border-border bg-background py-12 md:py-14"
      aria-labelledby="core-services-heading"
    >
      <div className="container">
        <h2
          id="core-services-heading"
          className="mb-8 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          Core services
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="block rounded-lg border border-border bg-card px-4 py-3 text-base font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-muted/50"
              >
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
