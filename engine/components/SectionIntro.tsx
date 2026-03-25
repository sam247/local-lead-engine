interface SectionIntroProps {
  title: string;
  description: string;
  className?: string;
  /** Main content sections should use h2 under the page h1; use h3 for nested subsections. */
  headingLevel?: "h2" | "h3";
}

export function SectionIntro({ title, description, className, headingLevel = "h2" }: SectionIntroProps) {
  const HeadingTag = headingLevel;
  return (
    <div className={className}>
      <HeadingTag className="mb-3 font-display text-xl font-bold">{title}</HeadingTag>
      <p className="mb-4 text-muted-foreground">{description}</p>
    </div>
  );
}
