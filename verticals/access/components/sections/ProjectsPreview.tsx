import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectImages } from "@/lib/images";

const projects = [
  { id: 1, title: "Hospital Access Control & CCTV", location: "London", image: projectImages[0], serviceType: "Access Control Systems", serviceSlug: "access-control-systems", description: "Integrated access control and CCTV installation for a major London hospital, including card readers, biometrics and HD surveillance." },
  { id: 2, title: "Data Centre Perimeter Security", location: "Slough", image: projectImages[1], serviceType: "Perimeter Security Systems", serviceSlug: "perimeter-security-systems", description: "Perimeter intrusion detection, fence sensors and CCTV integration for a Tier III data centre." },
  { id: 3, title: "Commercial CCTV Upgrade", location: "Canary Wharf", image: projectImages[2], serviceType: "Commercial CCTV Installation", serviceSlug: "commercial-cctv-installation", description: "Full upgrade to IP cameras and NVR for a multi-tenant office building with remote viewing and retention compliance." },
  { id: 4, title: "Warehouse Access & Integration", location: "Reading", image: projectImages[3], serviceType: "Security System Integration", serviceSlug: "security-system-integration", description: "Unified access control, CCTV and intruder alarm platform for a logistics and warehouse facility." },
  { id: 5, title: "IP Camera System for Retail", location: "Richmond", image: projectImages[4], serviceType: "IP Camera Systems", serviceSlug: "ip-camera-systems", description: "Network-based IP camera system with analytics and remote management for a retail park." },
  { id: 6, title: "Multi-Site Access Control", location: "London", image: projectImages[5], serviceType: "Access Control Systems", serviceSlug: "access-control-systems", description: "Centralised access control and audit trails across five commercial sites with card and fob integration." },
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
            Take a look at some of our recently completed security and access control projects.
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
