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

  const linkTitles: Record<string, string> = {
    "Mainline Drains": "Drainage services across the UK",
    "Mainline Surveys": "Land and drone surveying services across the UK",
    "Mainline Access": "Commercial security and access control services across the UK",
    "Mainline Groundworks": "Commercial groundworks services across the UK",
  };

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
          "flex flex-wrap items-center gap-x-2 gap-y-1",
          onPrimary && "text-xs text-primary-foreground/75",
          !onPrimary && isFooter && "text-xs text-muted-foreground",
          !onPrimary && !isFooter && "text-sm text-muted-foreground"
        )}
      >
        {items.map((item, index) => (
          <li key={item.href} className="inline-flex items-center">
            <a
              href={item.href}
              title={linkTitles[item.name] ?? `${item.name} website`}
              aria-current={item.isCurrent ? "page" : undefined}
              className={cn(
                "font-medium underline-offset-2 transition-colors hover:underline",
                onPrimary
                  ? item.isCurrent
                    ? "text-primary-foreground"
                    : "text-primary-foreground/80 hover:text-primary-foreground"
                  : item.isCurrent
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.name}
            </a>
            {index < items.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "mx-2 select-none",
                  onPrimary ? "text-primary-foreground/35" : "text-muted-foreground/50"
                )}
              >
                |
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
