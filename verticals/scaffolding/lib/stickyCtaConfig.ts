export type StickyCtaConfig = {
  defaultText: string;
  issueMap: Record<string, string>;
  ctaPrimary: string;
};

export const stickyCtaConfig: StickyCtaConfig = {
  defaultText: "Need scaffolding? Get a free quote today",
  issueMap: {
    "domestic-scaffolding": "Need house scaffolding? Get a fast quote",
    "roof-scaffolding": "Roof scaffolding needed? Call us today",
    "chimney-scaffolding": "Chimney works? Get a scaffolding quote",
    "emergency-scaffolding": "Emergency scaffolding — call now 24/7",
    "temporary-roofing": "Temporary roofing needed? We can help",
    "commercial-scaffolding": "Commercial scaffolding quote — fast response",
  },
  ctaPrimary: "Call Now",
};
