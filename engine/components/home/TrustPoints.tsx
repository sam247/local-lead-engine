import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Clock,
  Headphones,
  Shield,
  Users,
  Wrench,
  type LucideProps,
} from "lucide-react";
import type { HomepageTrustPointsSix } from "../../types";
import { cn } from "../../utils/cn";

const ICON_MAP: Record<string, LucideIcon> = {
  BadgeCheck,
  Clock,
  Headphones,
  Shield,
  Users,
  Wrench,
};

function IconByName({ name, className }: { name: string } & LucideProps) {
  const Icon = ICON_MAP[name] ?? Shield;
  return <Icon className={className} aria-hidden />;
}

export interface TrustPointsProps {
  items: HomepageTrustPointsSix;
  className?: string;
}

export function TrustPoints({ items, className }: TrustPointsProps) {
  if (items.length !== 6) {
    throw new Error("TrustPoints requires exactly 6 items");
  }
  return (
    <section className={cn("section-padding bg-secondary/40", className)}>
      <div className="container">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconByName name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
