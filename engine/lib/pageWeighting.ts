/**
 * Page tier / type for monetisation and analytics scaffolding.
 * Emergency monetisation is gated behind EMERGENCY_MODE_ENABLED (always false until product enables it).
 */

export type PageTier = "tier1" | "tier2" | "tier3";

export type PageType = "service" | "service_location" | "problem" | "topic";

/** When true, emergency contractor CTAs / numbers may swap in eligible pages. */
export const EMERGENCY_MODE_ENABLED = false;

export type GetPageTierInput = {
  inlinks?: number | null;
  pageType: PageType;
};

/**
 * Tier 1: service hubs always, or inlinks >= 100.
 * Tier 2: inlinks 20–99 (when numeric data exists).
 * Tier 3: inlinks < 20.
 * Without inlink data: service → tier1, service_location → tier2, problem/topic → tier3.
 */
export function getPageTier({ inlinks, pageType }: GetPageTierInput): PageTier {
  if (pageType === "service") {
    return "tier1";
  }

  if (inlinks == null || Number.isNaN(inlinks)) {
    if (pageType === "service_location") return "tier2";
    return "tier3";
  }

  if (inlinks >= 100) return "tier1";
  if (inlinks >= 20) return "tier2";
  return "tier3";
}

export type GetPageTypeInput = {
  route: string;
  /** When set, wins over pathname heuristics (e.g. Access topic×location). */
  explicitPageType?: PageType;
};

function normalizePath(route: string): string {
  const path = route.split("?")[0]?.split("#")[0] ?? "";
  if (!path.startsWith("/")) return `/${path}`;
  return path.replace(/\/+$/, "") || "/";
}

/**
 * Best-effort classification from path. Prefer explicitPageType from the route handler when
 * the URL shape is ambiguous (e.g. two-segment paths on Access).
 */
export function getPageType({ route, explicitPageType }: GetPageTypeInput): PageType {
  if (explicitPageType) return explicitPageType;

  const path = normalizePath(route);

  if (path === "/services" || path.startsWith("/services/")) {
    return "service";
  }

  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2) {
    return "service_location";
  }

  return "topic";
}

export function computeEmergencyEligible(pageTier: PageTier, pageType: PageType): boolean {
  return pageTier === "tier1" || pageType === "problem";
}

/** Hook for future emergency banner / alternate dial targets; no-op while EMERGENCY_MODE_ENABLED is false. */
export function maybeApplyEmergencyMonetisation(eligible: boolean): void {
  if (!EMERGENCY_MODE_ENABLED || !eligible) return;
  // Future: swap number, show emergency strip, etc.
}

/** Non-visual `data-*` for CTAs and wrappers when tier/type are known. */
export function pageSeoDataAttrs(
  pageTier: PageTier | undefined,
  pageType: PageType | undefined
): Record<string, string> {
  if (pageTier == null || pageType == null) return {};
  const emergencyEligible = computeEmergencyEligible(pageTier, pageType);
  maybeApplyEmergencyMonetisation(emergencyEligible);
  return {
    "data-page-tier": pageTier,
    "data-page-type": pageType,
    "data-emergency-eligible": emergencyEligible ? "true" : "false",
  };
}
