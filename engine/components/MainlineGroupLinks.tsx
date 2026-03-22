import type { MainlineGroupLinkItem } from "../data/mainline-group";
import { cn } from "../utils/cn";

export interface MainlineGroupLinksProps {
  items: MainlineGroupLinkItem[];
  /** `footerOnPrimary`: compact strip on dark primary footer backgrounds */
  variant?: "footer" | "inline" | "footerOnPrimary";
  label?: string;
  className?: string;
}

/**
 * Subtle cross-links between Mainline Group divisions. Pass items from `mainlineGroupLinksForSite`.
 */
export function MainlineGroupLinks({
  items,
  variant = "footer",
  label = "Part of the Mainline Group",
  className,
}: MainlineGroupLinksProps) {
  if (!items.length) return null;

  const isFooter = variant === "footer" || variant === "footerOnPrimary";
  const onPrimary = variant === "footerOnPrimary";

  return (
    <div className={className}>
      <p
        className={cn(
          onPrimary && "mb-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground/60",
          !onPrimary &&
            isFooter &&
            "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
          !onPrimary && !isFooter && "mb-3 text-sm font-semibold text-foreground"
        )}
      >
        {label}
      </p>
      <ul
        className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-1",
          onPrimary && "text-xs text-primary-foreground/75",
          !onPrimary && isFooter && "text-xs text-muted-foreground",
          !onPrimary && !isFooter && "text-sm text-muted-foreground"
        )}
      >
        {items.map((item) => (
          <li key={item.href} className="inline-flex items-center">
            {item.isCurrent === true ? (
              <span
                className={cn(
                  "font-medium",
                  onPrimary ? "text-primary-foreground" : "text-foreground"
                )}
              >
                {item.name}
              </span>
            ) : (
              <a
                href={item.href}
                rel="noopener noreferrer"
                className={cn(
                  "underline-offset-2 transition-colors hover:underline",
                  onPrimary
                    ? "hover:text-primary-foreground text-primary-foreground/80"
                    : "hover:text-primary text-muted-foreground"
                )}
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
