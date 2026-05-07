export type CommercialOpportunityTier = "very_high" | "high" | "medium" | "lower";

const VERY_HIGH_PATTERNS = [
  "basement",
  "foundation",
  "underpin",
  "piling",
  "structural",
];

const HIGH_PATTERNS = [
  "retaining-wall",
  "retaining wall",
  "enabling",
  "development",
  "commercial groundworks",
  "package",
];

const MEDIUM_PATTERNS = [
  "bulk-excavation",
  "bulk excavation",
  "muck-away",
  "site-clearance",
  "site clearance",
];

const LOWER_PATTERNS = [
  "cost",
  "guide",
  "what is",
  "vs",
  "how to",
];

const TIER_SCORE: Record<CommercialOpportunityTier, number> = {
  very_high: 100,
  high: 70,
  medium: 45,
  lower: 20,
};

function normalizeInput(value: string) {
  return value.toLowerCase().trim();
}

function hasAnyPattern(input: string, patterns: string[]) {
  return patterns.some((pattern) => input.includes(pattern));
}

export function getCommercialOpportunityTier(input: string): CommercialOpportunityTier {
  const normalized = normalizeInput(input);
  if (hasAnyPattern(normalized, VERY_HIGH_PATTERNS)) return "very_high";
  if (hasAnyPattern(normalized, HIGH_PATTERNS)) return "high";
  if (hasAnyPattern(normalized, MEDIUM_PATTERNS)) return "medium";
  if (hasAnyPattern(normalized, LOWER_PATTERNS)) return "lower";
  return "lower";
}

export function getCommercialOpportunityScore(input: string): number {
  return TIER_SCORE[getCommercialOpportunityTier(input)];
}

export function deriveSourceQueryTheme(input: string): string {
  const normalized = normalizeInput(input);
  if (hasAnyPattern(normalized, ["basement"])) return "basement_excavation";
  if (hasAnyPattern(normalized, ["underpin"])) return "foundation_underpinning";
  if (hasAnyPattern(normalized, ["retaining-wall", "retaining wall"])) return "retaining_walls";
  if (hasAnyPattern(normalized, ["piling"])) return "piling_foundations";
  if (hasAnyPattern(normalized, ["foundation", "structural"])) return "foundations_structural";
  if (hasAnyPattern(normalized, ["enabling", "development"])) return "commercial_packages";
  if (hasAnyPattern(normalized, ["bulk-excavation", "bulk excavation"])) return "bulk_excavation";
  if (hasAnyPattern(normalized, ["muck-away", "site-clearance"])) return "site_clearance_muckaway";
  return "generic_informational";
}
