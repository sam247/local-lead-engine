import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
  /** When true, last item is rendered as text (current page). Default true. */
  lastIsCurrent?: boolean;
  /** Use "inverse" for hero sections with dark background (light text). */
  variant?: "default" | "inverse";
}

export function BreadcrumbNav({
  items,
  className,
  lastIsCurrent = true,
  variant = "default",
}: BreadcrumbNavProps) {
  if (!items.length) return null;
  const isInverse = variant === "inverse";
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5 text-sm sm:gap-2",
          isInverse
            ? "text-primary-foreground/80 [&_a]:text-primary-foreground/80 [&_a:hover]:text-primary-foreground [&_span]:text-primary-foreground"
            : "text-muted-foreground [&_a]:transition-colors [&_a:hover]:text-foreground [&_span]:font-medium [&_span]:text-foreground"
        )}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const isCurrent = isLast && lastIsCurrent;
          return (
            <li key={`${item.url}-${i}`} className="inline-flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
              )}
              {isCurrent ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.url}>{item.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
