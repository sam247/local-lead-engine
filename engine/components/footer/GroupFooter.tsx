import type { MainlineGroupLinkItem } from "../../data/mainline-group";
import { cn } from "../../utils/cn";

export interface GroupFooterProps {
  items: MainlineGroupLinkItem[];
  className?: string;
  /** `onPrimary`: light text on dark footer. `default`: muted text on light section (e.g. About page). */
  variant?: "onPrimary" | "default";
}

const LINK_TITLES: Record<string, string> = {
  "Mainline Drains": "Drainage services across the UK",
  "Mainline Surveys": "Land and drone surveying services across the UK",
  "Mainline Access": "Commercial security and access control services across the UK",
  "Mainline Groundworks": "Commercial groundworks services across the UK",
};

/**
 * Mainline Group division links: separate anchors, no pipe-concatenated text.
 */
export function GroupFooter({ items, className, variant = "onPrimary" }: GroupFooterProps) {
  if (!items.length) return null;

  const onPrimary = variant === "onPrimary";

  return (
    <div className={cn(className)}>
      <p
        className={cn(
          "mb-3 text-xs font-semibold uppercase tracking-wide",
          onPrimary ? "text-primary-foreground/60" : "text-muted-foreground"
        )}
      >
        Part of the Mainline Group
      </p>
      <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              title={LINK_TITLES[item.name] ?? `${item.name} website`}
              aria-current={item.isCurrent ? "page" : undefined}
              className={cn(
                "inline-block text-sm font-medium underline-offset-2 transition-colors hover:underline",
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
          </li>
        ))}
      </ul>
    </div>
  );
}
