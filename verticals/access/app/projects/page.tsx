import { projectImages } from "@/lib/images";
import CTABanner from "@/components/sections/CTABanner";
import SchemaMarkup from "@/components/seo/SchemaMarkup";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const projects = [
  { id: 1, title: "Hospital Access Control & CCTV", location: "London", category: "Access Control Systems", image: projectImages[0] },
  { id: 2, title: "Data Centre Perimeter Security", location: "Slough", category: "Perimeter Security Systems", image: projectImages[1] },
  { id: 3, title: "Commercial CCTV Upgrade", location: "Canary Wharf", category: "Commercial CCTV Installation", image: projectImages[2] },
  { id: 4, title: "Warehouse Access & Integration", location: "Reading", category: "Security System Integration", image: projectImages[3] },
  { id: 5, title: "IP Camera System for Retail", location: "Richmond", category: "IP Camera Systems", image: projectImages[4] },
  { id: 6, title: "Multi-Site Access Control", location: "London", category: "Access Control Systems", image: projectImages[5] },
  { id: 7, title: "Office Building Access & CCTV", location: "Hammersmith", category: "Commercial CCTV Installation", image: projectImages[1] },
  { id: 8, title: "Healthcare Site Security", location: "Fulham", category: "Security System Integration", image: projectImages[0] },
];

export const metadata: Metadata = {
  title: "Our Projects | Mainline Access",
  description: "Portfolio of access control, CCTV and security system projects across London and the UK — hospitals, data centres, warehouses and commercial sites.",
  alternates: { canonical: "https://mainlineaccess.co.uk/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <SchemaMarkup type="BreadcrumbList" data={{ breadcrumbs: [{ name: "Home", url: "/" }, { name: "Projects", url: "/projects" }] }} />
      <section className="bg-primary py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 font-display text-4xl font-bold text-primary-foreground md:text-5xl">Our Projects</h1>
            <p className="text-lg text-primary-foreground/80">A showcase of our completed security and access control projects across London and the UK.</p>
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="group overflow-hidden rounded-lg bg-card shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-primary">{project.category}</span>
                  <h3 className="mt-1 font-display font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
