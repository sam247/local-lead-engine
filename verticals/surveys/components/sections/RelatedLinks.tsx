import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, locations, hubPages, getCategoryPages } from "@/lib/data";
import { getServiceUrl } from "engine";

interface RelatedLinksProps {
  relatedServices?: string[];
  category?: string;
  currentSlug?: string;
}

const RelatedLinks = ({ relatedServices = [], category, currentSlug }: RelatedLinksProps) => {
  const matchedServices = services.filter((s) => relatedServices.includes(s.slug));
  const firstServiceSlug = relatedServices[0] || "topographical-survey";
  const featuredLocations = locations.slice(0, 6);

  const relatedHubs = hubPages.filter(
    (h) => h.category !== category && getCategoryPages(h.category).length > 0
  ).slice(0, 4);

  return (
    <div className="space-y-6">
      {matchedServices.length > 0 && (
        <div className="rounded-lg bg-secondary p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Related Survey Services</h3>
          <div className="space-y-3">
            {matchedServices.map((service) => (
              <Link
                key={service.id}
                href={getServiceUrl(service.slug)}
                className="block rounded border border-border bg-background p-3 transition-colors hover:border-primary"
              >
                <span className="text-sm font-medium">{service.title}</span>
                <p className="mt-1 text-xs text-muted-foreground">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedHubs.length > 0 && (
        <div className="rounded-lg bg-secondary p-6">
          <h3 className="mb-4 font-display text-lg font-bold">Related Survey Guides</h3>
          <div className="space-y-2">
            {relatedHubs.map((hub) => (
              <Link
                key={hub.category}
                href={hub.basePath}
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {hub.title} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-lg bg-secondary p-6">
        <h3 className="mb-4 font-display text-lg font-bold">Local Survey Services</h3>
        <div className="grid grid-cols-2 gap-2">
          {featuredLocations.map((loc) => (
            <Link
              key={loc.id}
              href={`/${firstServiceSlug}/${loc.id}`}
              className="text-sm text-primary hover:underline"
            >
              {loc.name} <ArrowRight className="inline h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedLinks;
