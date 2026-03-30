import { Briefcase, Check, Shield, Zap } from "lucide-react";

const TRUST_ITEMS = [
  { label: "Vetted contractors", icon: Check },
  { label: "Fully insured", icon: Shield },
  { label: "Commercial & site work specialists", icon: Briefcase },
  { label: "Fast response from local contractors", icon: Zap },
] as const;

/** Lightweight trust row directly under the homepage hero (four items). */
export function HomeTrustCoreBar() {
  return (
    <section
      className="border-y border-border/60 bg-muted/40 py-2.5 sm:py-3"
      aria-label="Trust signals"
    >
      <div className="container">
        <ul className="flex flex-wrap items-center justify-start gap-x-5 gap-y-2 text-xs text-muted-foreground sm:gap-x-7">
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
