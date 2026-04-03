import type { MainlineGroupLinkItem } from "../../data/mainline-group";
import { cn } from "../../utils/cn";

/** Append GA-friendly UTMs so destination sites can attribute traffic to the referring vertical and placement. */
export function appendMainlineGroupFooterUtm(
  href: string,
  verticalSource: string
): string {
  const source = verticalSource.trim();
  if (!source) return href;
  try {
    const u = new URL(href);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", "footer");
    u.searchParams.set("utm_campaign", "mainline_group");
    return u.toString();
  } catch {
    return href;
  }
}

export interface GroupFooterProps {
  items: MainlineGroupLinkItem[];
  className?: string;
  /** `onPrimary`: light text on dark footer. `default`: muted text on light section (e.g. About page). */
  variant?: "onPrimary" | "default";
  /**
   * Vertical id of the site rendering the footer (e.g. `verticalConfig.verticalId`).
   * When set, division links get `utm_source={verticalId}&utm_medium=footer&utm_campaign=mainline_group`.
   */
  groupLinkUtmSource?: string;
  /** Optional short trust copy shown above badge row (footer, right column). */
  trustLine?: string;
  /** Optional trust mark image URL (e.g. `/dbs.png` from each vertical `public/`). */
  dbsLogoSrc?: string;
  /** Optional second trust mark (e.g. `/citb.png`). */
  citbLogoSrc?: string;
  /** TrustMark logo (e.g. `/trustmark.png`). */
  trustmarkLogoSrc?: string;
  /** FMB logo (e.g. `/fmb.png`). */
  fmbLogoSrc?: string;
}

const LINK_TITLES: Record<string, string> = {
  "Mainline Drains": "Drainage services across the UK",
  "Mainline Surveys": "Land and drone surveying services across the UK",
  "Mainline Access": "Commercial security and access control services across the UK",
  "Mainline Groundworks": "Commercial groundworks services across the UK",
  "Mainline Scaffolding": "NASC accredited scaffolding contractors across the UK",
};

/** Footer badge row: match hero trust strip scale; shrink-0 keeps all marks visible in flex layouts. */
const BADGE_IMG_CLASS =
  "h-5 w-auto max-w-[88px] shrink-0 object-contain object-center sm:h-[23px] sm:max-w-[101px]";

/**
 * Mainline Group division links: separate anchors, no pipe-concatenated text.
 */
export function GroupFooter({
  items,
  className,
  variant = "onPrimary",
  groupLinkUtmSource,
  trustLine,
  dbsLogoSrc,
  citbLogoSrc,
  trustmarkLogoSrc,
  fmbLogoSrc,
}: GroupFooterProps) {
  if (!items.length) return null;

  const onPrimary = variant === "onPrimary";
  const utmSource = groupLinkUtmSource?.trim() ?? "";
  const showBadges = Boolean(dbsLogoSrc || citbLogoSrc || trustmarkLogoSrc || fmbLogoSrc);
  const showRightColumn = Boolean(trustLine || showBadges);

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
        className
      )}
    >
      <div className="min-w-0 w-full sm:w-auto">
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-wide",
            onPrimary ? "text-white/60" : "text-muted-foreground"
          )}
        >
          Part of the Mainline Group
        </p>
        <ul className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1 md:gap-x-6">
          {items.map((item) => (
            <li key={item.name} className="min-w-0">
              <a
                href={utmSource ? appendMainlineGroupFooterUtm(item.href, utmSource) : item.href}
                title={LINK_TITLES[item.name] ?? `${item.name} website`}
                aria-current={item.isCurrent ? "page" : undefined}
                className={cn(
                  "-mx-1 inline-flex min-h-[44px] items-center px-1 text-sm font-medium underline-offset-2 transition-colors hover:underline sm:min-h-0 sm:py-0",
                  onPrimary
                    ? item.isCurrent
                      ? "text-white"
                      : "text-white/80 hover:text-white"
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
        <div
          className={cn(
            "flex w-full shrink-0 flex-col items-stretch gap-3 border-t pt-4 sm:ml-4 sm:w-auto sm:items-end sm:border-t-0 sm:pt-0",
            onPrimary ? "border-white/10" : "border-border"
          )}
        >
          {trustLine ? (
            <p
              className={cn(
                "max-w-none text-left text-[11px] leading-snug sm:max-w-[min(100%,22rem)] sm:text-right sm:text-xs",
                onPrimary ? "text-white/75" : "text-muted-foreground"
              )}
            >
              {trustLine}
            </p>
          ) : null}
          {showBadges ? (
            <div className="flex max-w-full flex-wrap items-center justify-start gap-2.5 sm:flex-nowrap sm:justify-end sm:overflow-x-auto">
              {citbLogoSrc ? (
                <img
                  src={citbLogoSrc}
                  alt="CITB"
                  width={100}
                  height={32}
                  className={cn(BADGE_IMG_CLASS, onPrimary ? "opacity-90" : "")}
                />
              ) : null}
              {dbsLogoSrc ? (
                <img
                  src={dbsLogoSrc}
                  alt="DBS disclosure check"
                  width={100}
                  height={32}
                  className={cn(BADGE_IMG_CLASS, onPrimary ? "opacity-90" : "")}
                />
              ) : null}
              {trustmarkLogoSrc ? (
                <img
                  src={trustmarkLogoSrc}
                  alt="TrustMark"
                  width={100}
                  height={32}
                  className={cn(BADGE_IMG_CLASS, onPrimary ? "opacity-90" : "")}
                />
              ) : null}
              {fmbLogoSrc ? (
                <img
                  src={fmbLogoSrc}
                  alt="Federation of Master Builders"
                  width={100}
                  height={32}
                  className={cn(BADGE_IMG_CLASS, onPrimary ? "opacity-90" : "")}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
