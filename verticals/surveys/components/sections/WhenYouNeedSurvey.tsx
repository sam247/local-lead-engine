import Link from "next/link";
import { ArrowRight, FileCheck, Home, Map, Camera } from "lucide-react";

const scenarios = [
  {
    icon: FileCheck,
    title: "Planning Permission",
    description: "Most planning applications need an up-to-date topographical survey and often a measured building survey of existing structures.",
    link: "/drainage-guides/survey-for-planning-permission",
  },
  {
    icon: Home,
    title: "Extension or Refurbishment",
    description: "Accurate existing drawings reduce design risk and avoid costly surprises on site. Measured building and topographical surveys give your architect a reliable base.",
    link: "/drainage-guides/survey-before-building-extension",
  },
  {
    icon: Map,
    title: "Development or Feasibility",
    description: "Before committing to design and planning, developers need site levels, utilities and existing structures mapped. We help scope the right survey package.",
    link: "/drainage-guides/survey-before-property-development",
  },
  {
    icon: Camera,
    title: "Drone Survey",
    description: "Ideal for large sites, roof inspections and progress monitoring. Drone surveys deliver orthophotos, contours and 3D data quickly.",
    link: "/drainage-guides/when-to-use-drone-surveys",
  },
];

const WhenYouNeedSurvey = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Survey Types for Construction and Property
          </span>
          <h2 className="mb-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            When You Need a Survey
          </h2>
          <p className="text-muted-foreground">
            From planning applications to extensions and development — when to commission a land or drone survey.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.title}
              href={scenario.link}
              className="group rounded-lg border border-border bg-background p-6 transition-colors hover:border-primary hover:shadow-md"
            >
              <scenario.icon className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-2 font-display text-lg font-bold text-foreground">{scenario.title}</h3>
              <p className="mb-3 text-sm text-muted-foreground">{scenario.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:underline">
                Learn more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-sm font-medium text-muted-foreground">
          Not sure which survey you need? Speak with a survey specialist for tailored advice.
        </p>
      </div>
    </section>
  );
};

export default WhenYouNeedSurvey;
