import { CheckCircle } from "lucide-react";

interface TrustReassuranceStripProps {
  points: string[];
  title?: string;
  className?: string;
}

export function TrustReassuranceStrip({
  points,
  title = "Why clients choose us",
  className,
}: TrustReassuranceStripProps) {
  if (!points.length) return null;

  return (
    <div className={className ?? "mb-8 rounded-lg border border-border bg-secondary/50 p-6"}>
      <h3 className="mb-3 font-display text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        We focus on clear communication, reliable delivery, and practical outcomes from first contact through completion.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
            <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
