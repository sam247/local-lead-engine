import Link from "next/link";
import {
  FOOTER_LOCATION_LINK_MAX,
  getFooterAreaGroups,
} from "../data/uk-location-hierarchy";
import type { Location } from "../types";
import { cn } from "../utils/cn";

export type FooterServiceAreaGroupsProps = {
  primaryServiceSlug: string;
  locations: readonly Location[];
  /** When true, use light text for primary (footer on brand) background */
  variant?: "onPrimary" | "default";
};

export function FooterServiceAreaGroups({
  primaryServiceSlug,
  locations,
  variant = "onPrimary",
}: FooterServiceAreaGroupsProps) {
  const idToName = Object.fromEntries(locations.map((l) => [l.id, l.name]));
  const groups = getFooterAreaGroups(idToName, FOOTER_LOCATION_LINK_MAX);
  const onPrimary = variant === "onPrimary";

  return (
    <div className="space-y-5">
      <h4
        className={cn(
          "text-sm font-semibold",
          onPrimary ? "text-primary-foreground/60" : "text-muted-foreground"
        )}
      >
        Areas We Cover
      </h4>
      {groups.map((g) => (
        <div key={g.regionLabel}>
          <p
            className={cn(
              "mb-2 text-xs font-medium uppercase tracking-wide",
              onPrimary ? "text-primary-foreground/50" : "text-muted-foreground"
            )}
          >
            {g.regionLabel}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {g.links.map((link) => (
              <Link
                key={link.id}
                href={`/${primaryServiceSlug}/${link.id}`}
                className={cn(
                  "text-sm transition-colors",
                  onPrimary
                    ? "text-primary-foreground/75 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      ))}
      <div className="pt-1">
        <Link
          href="/service-areas"
          className={cn(
            "text-sm font-medium transition-colors",
            onPrimary
              ? "text-primary-foreground/80 hover:text-primary-foreground"
              : "text-primary hover:underline"
          )}
        >
          All service areas →
        </Link>
      </div>
    </div>
  );
}
