import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectImages } from "@/lib/images";

const projects = [
  { id: 1, title: "Residential Drain Collapse Repair", location: "Chelsea", image: projectImages[0], serviceType: "Drain Collapse Repair", serviceSlug: "drain-collapse-repair", description: "Emergency excavation and replacement of a collapsed Victorian clay drain beneath a residential garden." },
  { id: 2, title: "Commercial CCTV Drain Survey", location: "Canary Wharf", image: projectImages[1], serviceType: "CCTV Drain Surveys", serviceSlug: "cctv-drain-surveys", description: "Full site drainage survey for a commercial office building prior to refurbishment works." },
  { id: 3, title: "Victorian Property Drain Relining", location: "Richmond", image: projectImages[2], serviceType: "Drain Relining", serviceSlug: "drain-relining", description: "No-dig relining of cracked and root-damaged clay pipes beneath a Grade II listed property." },
  { id: 4, title: "Emergency Sewer Repair", location: "Wimbledon", image: projectImages[3], serviceType: "Emergency Drainage", serviceSlug: "emergency-drainage", description: "Same-day emergency response to a sewage backup caused by a collapsed shared sewer." },
  { id: 5, title: "Blocked Drain Clearance", location: "Ealing", image: projectImages[4], serviceType: "Blocked Drains", serviceSlug: "blocked-drains", description: "High-pressure jetting to clear a severe fat and grease blockage in a restaurant's drainage system." },
  { id: 6, title: "Full Drain Excavation & Replacement", location: "Kensington", image: projectImages[5], serviceType: "Drain Excavation", serviceSlug: "drain-excavation", description: "Complete excavation and replacement of a 15-metre collapsed drain run beneath a driveway." },
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
            Take a look at some of our recently completed drainage projects across London.
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
