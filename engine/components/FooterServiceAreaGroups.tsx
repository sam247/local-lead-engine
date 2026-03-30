import Link from "next/link";
import { FOOTER_LOCATION_LINK_PRIORITY } from "../data/uk-location-hierarchy";
import type { Location } from "../types";
import { cn } from "../utils/cn";

const FOOTER_INLINE_MAX = 8;

export type FooterServiceAreaGroupsProps = {
  primaryServiceSlug: string;
  locations: readonly Location[];
  /** When true, use light text for primary (footer on brand) background */
  variant?: "onPrimary" | "default";
  /** Primary near-me hub (matches header "view all areas"), not `/service-areas` */
  viewAllAreasHref: string;
};

export function FooterServiceAreaGroups({
  primaryServiceSlug,
  locations,
  variant = "onPrimary",
  viewAllAreasHref,
}: FooterServiceAreaGroupsProps) {
  const idToName = Object.fromEntries(locations.map((l) => [l.id, l.name]));
  const picked: { id: string; name: string }[] = [];
  for (const id of FOOTER_LOCATION_LINK_PRIORITY) {
    if (picked.length >= FOOTER_INLINE_MAX) break;
    const name = idToName[id];
    if (name) picked.push({ id, name });
  }
  const onPrimary = variant === "onPrimary";

  return (
    <div>
      <h4
        className={cn(
          "mb-3 text-sm font-semibold",
          onPrimary ? "text-white/60" : "text-muted-foreground"
        )}
      >
        Areas We Cover
      </h4>
      <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2 p-0">
        {picked.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${primaryServiceSlug}/${link.id}`}
              className={cn(
                "inline-block text-sm transition-colors",
                onPrimary
                  ? "text-primary-foreground/80 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={viewAllAreasHref}
            className={cn(
              "inline-block text-sm font-medium transition-colors",
              onPrimary
                ? "text-white/80 hover:text-white"
                : "text-primary hover:underline"
            )}
          >
            All Areas →
          </Link>
        </li>
      </ul>
    </div>
  );
}
