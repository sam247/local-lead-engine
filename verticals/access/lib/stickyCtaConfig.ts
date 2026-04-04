/** Homepage cards: accessProblemPages.slice(0, 6) — keys must match slugs exactly. */
export type StickyCtaConfig = {
  defaultText: string;
  issueMap: Record<string, string>;
  ctaPrimary: string;
};

export const stickyCtaConfig: StickyCtaConfig = {
  defaultText: "Security issue? Get fast access control support",
  issueMap: {
    "cctv-blind-spots": "CCTV blind spots? Improve coverage fast",
    "poor-cctv-night-vision": "Poor CCTV at night? Fix visibility issues",
    "cctv-storage-full": "CCTV storage full? Get support before you lose footage",
    "cctv-remote-access-issues": "Can't access your system remotely? Get support now",
    "access-control-system-cost": "Need access control costs? Speak to a specialist",
    "commercial-cctv-installation-cost": "Planning CCTV? Get a clear quote today",
  },
  ctaPrimary: "Call Now",
};
