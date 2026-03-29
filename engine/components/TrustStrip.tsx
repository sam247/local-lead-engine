import { Briefcase, Check, Shield } from "lucide-react";
import { cn } from "../utils/cn";

export type TrustStripIcon = "check" | "shield" | "briefcase";

export interface TrustStripItem {
  label: string;
  icon?: TrustStripIcon;
}

const DEFAULT_ITEMS: TrustStripItem[] = [
  { label: "Vetted contractors", icon: "check" },
  { label: "Fully insured", icon: "shield" },
  { label: "Commercial & site work specialists", icon: "briefcase" },
];

const ICONS: Record<TrustStripIcon, typeof Check> = {
  check: Check,
  shield: Shield,
  briefcase: Briefcase,
};

export interface TrustStripProps {
  items?: TrustStripItem[];
  className?: string;
}

export function TrustStrip({ items, className }: TrustStripProps) {
  const resolved = items && items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <ul
      className={cn(
        "flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-between",
        className
      )}
    >
      {resolved.map((item, i) => {
        const kind = item.icon ?? "check";
        const Icon = ICONS[kind] ?? Check;
        return (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon className="h-4 w-4 shrink-0 text-muted-foreground/80" aria-hidden />
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
