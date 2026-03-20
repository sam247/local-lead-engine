interface SectionIntroProps {
  title: string;
  description: string;
  className?: string;
}

export function SectionIntro({ title, description, className }: SectionIntroProps) {
  return (
    <div className={className}>
      <h3 className="mb-3 font-display text-xl font-bold">{title}</h3>
      <p className="mb-4 text-muted-foreground">{description}</p>
    </div>
  );
}
