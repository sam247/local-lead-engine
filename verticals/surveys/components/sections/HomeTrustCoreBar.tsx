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
    <section className="border-b border-border bg-background py-4 sm:py-5" aria-label="Trust signals">
      <div className="container">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 text-xs text-muted-foreground/90 sm:justify-between">
          {TRUST_ITEMS.map(({ label, icon: Icon }, i) => (
            <li key={`${label}-${i}`} className="flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
