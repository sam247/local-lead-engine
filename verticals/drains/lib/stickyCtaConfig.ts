/** Homepage cards: drainProblemPages.slice(0, 6) — keys must match slugs exactly. */
export type StickyCtaConfig = {
  defaultText: string;
  issueMap: Record<string, string>;
  ctaPrimary: string;
};

export const stickyCtaConfig: StickyCtaConfig = {
  defaultText: "Emergency drainage issue? Speak to a local engineer now",
  issueMap: {
    "blocked-outside-drain": "Blocked drain? Speak to an engineer now",
    "drain-smell-in-garden": "Drain smell issue? Get it checked today",
    "collapsed-drain-repair": "Collapsed drain? Urgent repair needed",
    "slow-draining-outside-pipe": "Slow drainage? Fix it before it worsens",
    "drain-overflow-in-garden": "Drain overflow? Get emergency help now",
    "blocked-drains": "Blocked drains? Speak to an engineer now",
  },
  ctaPrimary: "Call Now",
};
