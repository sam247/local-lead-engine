/** Homepage cards: surveyProblemPages.slice(0, 6) — keys must match slugs exactly. */
export type StickyCtaConfig = {
  defaultText: string;
  issueMap: Record<string, string>;
  ctaPrimary: string;
};

export const stickyCtaConfig: StickyCtaConfig = {
  defaultText: "Need a survey? Speak to a specialist today",
  issueMap: {
    "boundary-dispute": "Boundary issue? Get accurate survey data",
    "unknown-utilities": "Unknown utilities? Map before you dig",
    "structural-movement": "Structural movement? Get measured survey support",
    "survey-required-planning": "Planning a project? Get the right survey",
    "drainage-layout-unknown": "Drainage unknown? Get layout and survey clarity",
    "pre-purchase-issues": "Buying before surveys? Get the right checks",
  },
  ctaPrimary: "Call Now",
};
