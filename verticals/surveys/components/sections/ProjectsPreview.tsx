import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectImages } from "@/lib/images";

const projects = [
  { id: 1, title: "Topographical Site Survey", location: "Chelsea", image: projectImages[0], serviceType: "Topographical Survey", serviceSlug: "topographical-survey", description: "Full topographical survey for a residential redevelopment site to support planning and design." },
  { id: 2, title: "Measured Building Survey", location: "Canary Wharf", image: projectImages[1], serviceType: "Measured Building Survey", serviceSlug: "measured-building-survey", description: "As-built floor plans, elevations and sections for a commercial office refurbishment." },
  { id: 3, title: "Drone Survey for Development Site", location: "Richmond", image: projectImages[2], serviceType: "Drone Survey", serviceSlug: "drone-survey", description: "Drone survey and orthophoto for a multi-plot development site prior to planning submission." },
  { id: 4, title: "Utility Mapping Survey", location: "Wimbledon", image: projectImages[3], serviceType: "Utility Mapping Survey", serviceSlug: "utility-mapping-survey", description: "Underground utility detection and mapping before excavation and foundation works." },
  { id: 5, title: "Drone Roof Inspection", location: "Ealing", image: projectImages[4], serviceType: "Drone Roof Inspection", serviceSlug: "drone-roof-inspection", description: "Roof condition survey and imagery for a period property ahead of refurbishment." },
  { id: 6, title: "Boundary Survey", location: "Kensington", image: projectImages[5], serviceType: "Boundary Survey", serviceSlug: "boundary-survey", description: "Boundary survey to clarify the extent of the title for an extension and party wall matters." },
];

const ProjectsPreview = () => {
  return (
    <section className="section-padding bg-secondary">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-2 inline-block text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Our Work
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground md:text-4xl">
            Recent Projects
          </h2>
          <p className="text-muted-foreground">
            Take a look at some of our recently completed survey projects across London and the South East.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-lg bg-card animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <Link href={`/services/${project.serviceSlug}`}>
                    <Badge variant="secondary" className="transition-colors hover:bg-primary hover:text-primary-foreground">
                      {project.serviceType}
                    </Badge>
                  </Link>
                </div>
                <h3 className="font-display font-semibold text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground">{project.location}</p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <Link
                  href={`/services/${project.serviceSlug}`}
                  className="mt-3 inline-flex items-center text-xs font-medium text-primary transition-colors hover:underline"
                >
                  View Service
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild>
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsPreview;
