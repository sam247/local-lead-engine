interface ProcessTimelineProps {
  steps: string[];
  className?: string;
}

export function ProcessTimeline({ steps, className }: ProcessTimelineProps) {
  if (!steps.length) return null;

  return (
    <ol className={className ?? "mb-8 space-y-3"}>
      {steps.map((step, i) => (
        <li key={`${i}-${step}`} className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {i + 1}
          </span>
          <span className="text-muted-foreground">{step}</span>
        </li>
      ))}
    </ol>
  );
}
