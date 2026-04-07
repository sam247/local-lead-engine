import { Briefcase, Phone, Shield, Star } from "lucide-react";
import { cn } from "../utils/cn";

export type TrustStripIcon = "shield" | "briefcase" | "star" | "phone";

export interface TrustStripItem {
  label: string;
  icon?: TrustStripIcon;
}

const DEFAULT_ITEMS: TrustStripItem[] = [
  { label: "Fully Insured", icon: "shield" },
  { label: "Commercial & Site Work Specialists", icon: "briefcase" },
  { label: "5 Star Rated", icon: "star" },
  { label: "Emergency Callout", icon: "phone" },
];

const ICONS: Record<TrustStripIcon, typeof Shield> = {
  shield: Shield,
  briefcase: Briefcase,
  star: Star,
  phone: Phone,
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
        const kind = item.icon ?? "shield";
        const Icon = ICONS[kind] ?? Shield;
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
