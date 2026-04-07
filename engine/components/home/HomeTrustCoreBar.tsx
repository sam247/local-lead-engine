import { Briefcase, Phone, Shield, Star } from "lucide-react";

const TRUST_ITEMS = [
  { label: "Fully Insured", icon: Shield },
  { label: "Commercial & Site Work Specialists", icon: Briefcase },
  { label: "5 Star Rated", icon: Star },
  { label: "Emergency Callout", icon: Phone },
] as const;

/** Lightweight trust row directly under the homepage hero (four items). Shared across all verticals. */
export function HomeTrustCoreBar() {
  return (
    <section
      className="border-b border-border/60 bg-muted/40 py-5 sm:py-6"
      aria-label="Trust signals"
    >
      <div className="container">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:gap-x-7">
          {TRUST_ITEMS.map(({ label, icon: Icon }, i) => (
            <li key={`${label}-${i}`} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground/90" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
