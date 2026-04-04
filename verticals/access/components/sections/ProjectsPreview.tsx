import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { homepageProjects } from "@/data/projects";
import { getProjectImage } from "@/lib/images";

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
          <p className="mt-2 text-muted-foreground">Recent security work across the UK</p>
          <p className="text-muted-foreground">
            These live project examples cover access control, CCTV and integrated upgrades across a range of operational site types.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageProjects.map((project, index) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-lg bg-card animate-fade-in opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/projects/${project.slug}`} className="block aspect-[4/3] overflow-hidden">
                <img
                  src={getProjectImage(project, index)}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <h3 className="font-display font-semibold text-foreground">
                  <Link href={`/projects/${project.slug}`} className="hover:text-primary">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                  {project.service} · {project.location}
                </p>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-3 inline-flex items-center text-xs font-medium text-primary transition-colors hover:underline"
                >
                  View Project
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button asChild>
            <Link href="/contact">Get a similar security quote</Link>
          </Button>
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
