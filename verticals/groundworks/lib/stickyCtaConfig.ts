/** Homepage cards: groundworksProblemPages.slice(0, 6) — keys must match slugs exactly. */
export type StickyCtaConfig = {
  defaultText: string;
  issueMap: Record<string, string>;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const stickyCtaConfig: StickyCtaConfig = {
  defaultText: "Need groundwork support? Get a fast quote today",
  issueMap: {
    "foundation-subsidence": "Subsidence concerns? Get specialist groundwork support",
    "foundation-cracking": "Foundation cracking? Get an engineer-led plan",
    "inadequate-foundation-design": "Foundation design issues? Speak to a specialist",
    "soft-ground-affecting-foundations": "Soft ground under foundations? Get expert advice",
    "waterlogged-soil-building-plot": "Waterlogged plot? Sort groundwork before you build",
    "high-water-table-during-excavation": "High water table? Get excavation support today",
  },
  ctaPrimary: "Call Now",
  ctaSecondary: "Get Quote",
};
