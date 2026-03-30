import type { MainlineGroupLinkItem } from "../../data/mainline-group";
import { cn } from "../../utils/cn";

export interface GroupFooterProps {
  items: MainlineGroupLinkItem[];
  className?: string;
  /** `onPrimary`: light text on dark footer. `default`: muted text on light section (e.g. About page). */
  variant?: "onPrimary" | "default";
  /** Optional short trust copy shown above badge row (footer, right column). */
  trustLine?: string;
  /** Optional trust mark image URL (e.g. `/dbs.png` from each vertical `public/`). */
  dbsLogoSrc?: string;
  /** Optional second trust mark (e.g. `/citb.png`), same height as DBS. */
  citbLogoSrc?: string;
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
export function GroupFooter({
  items,
  className,
  variant = "onPrimary",
  trustLine,
  dbsLogoSrc,
  citbLogoSrc,
}: GroupFooterProps) {
  if (!items.length) return null;

  const onPrimary = variant === "onPrimary";
  const showBadges = Boolean(dbsLogoSrc || citbLogoSrc);
  const showRightColumn = Boolean(trustLine || showBadges);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
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
      {showRightColumn ? (
        <div className="flex shrink-0 flex-col items-end gap-2 sm:ml-4">
          {trustLine ? (
            <p
              className={cn(
                "max-w-[min(100%,22rem)] text-right text-[10px] leading-snug sm:text-xs",
                onPrimary ? "text-primary-foreground/75" : "text-muted-foreground"
              )}
            >
              {trustLine}
            </p>
          ) : null}
          {showBadges ? (
            <div className="flex items-center justify-end gap-3">
              {citbLogoSrc ? (
                <img
                  src={citbLogoSrc}
                  alt="CITB"
                  width={120}
                  height={40}
                  className={cn(
                    "h-8 w-auto max-w-[140px] object-contain object-center",
                    onPrimary ? "opacity-90" : ""
                  )}
                />
              ) : null}
              {dbsLogoSrc ? (
                <img
                  src={dbsLogoSrc}
                  alt="DBS disclosure check"
                  width={120}
                  height={40}
                  className={cn(
                    "h-8 w-auto max-w-[140px] object-contain object-right",
                    onPrimary ? "opacity-90" : ""
                  )}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
