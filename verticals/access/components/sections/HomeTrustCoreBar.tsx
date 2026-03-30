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
      className="border-b border-border/60 bg-muted/40 py-5 sm:py-6"
      aria-label="Trust signals"
    >
      <div className="container flex flex-col items-center gap-3">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:gap-x-7">
          {TRUST_ITEMS.map(({ label, icon: Icon }, i) => (
            <li key={`${label}-${i}`} className="flex items-center gap-1.5">
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground/90" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          aria-label="Accreditation marks"
        >
          <img
            src="/citb.png"
            alt="CITB"
            width={88}
            height={28}
            className="h-6 w-auto max-w-[88px] object-contain"
          />
          <img
            src="/dbs.png"
            alt="DBS disclosure check"
            width={88}
            height={28}
            className="h-6 w-auto max-w-[88px] object-contain"
          />
          <img
            src="/trustmark.png"
            alt="TrustMark"
            width={88}
            height={28}
            className="h-6 w-auto max-w-[88px] object-contain"
          />
          <img
            src="/fmb.png"
            alt="Federation of Master Builders"
            width={88}
            height={28}
            className="h-6 w-auto max-w-[88px] object-contain"
          />
        </div>
      </div>
    </section>
  );
}
