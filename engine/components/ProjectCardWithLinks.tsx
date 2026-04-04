import Link from "next/link";
import type { Service } from "../types";

export interface ProjectForCard {
  id: string;
  slug?: string;
  title: string;
  description: string;
  location: string;
  locationId?: string;
  service: string;
  serviceSlug: string;
}

export interface ProjectCardWithLinksProps {
  project: ProjectForCard;
  imageSrc: string;
  imageAlt?: string;
  services: Service[];
  locationLinkPath: (serviceSlug: string, locationId: string) => string;
  servicesPath: string;
  projectHref?: string;
}

export function ProjectCardWithLinks({
  project,
  imageSrc,
  imageAlt,
  services,
  locationLinkPath,
  servicesPath,
  projectHref,
}: ProjectCardWithLinksProps) {
  const relatedServices = services
    .filter((s) => s.slug !== project.serviceSlug)
    .slice(0, 3);

  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={imageSrc}
          alt={imageAlt ?? project.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium text-muted-foreground">
          Service:{" "}
          <Link
            href={`${servicesPath}/${project.serviceSlug}`}
            className="text-primary hover:underline"
          >
            {project.service}
          </Link>
        </p>
        <h3 className="mt-1 font-display font-semibold">
          {projectHref ? (
            <Link href={projectHref} className="hover:text-primary">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
        {project.locationId ? (
          <p className="text-sm text-muted-foreground">
            Area:{" "}
            <Link
              href={locationLinkPath(project.serviceSlug, project.locationId)}
              className="text-primary hover:underline"
            >
              {project.location}
            </Link>
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">{project.location}</p>
        )}
        {project.description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
        )}
        {relatedServices.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Related:{" "}
            {relatedServices.map((s, i) => (
              <span key={s.id}>
                {i > 0 && ", "}
                <Link href={`${servicesPath}/${s.slug}`} className="text-primary hover:underline">
                  {s.title}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
