import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectDetailPage } from "engine";
import { verticalConfig } from "@/config";
import { services, locations, getRelevantTopicsForService } from "@/lib/data";
import { projects } from "@/data/projects";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return { title: "Not Found" };

  const service = services.find((entry) => entry.slug === project.serviceSlug);
  const location = locations.find((entry) => entry.id === project.locationId);
  if (!service || !location) return { title: "Not Found" };

  return {
    title: `${service.title} in ${location.name} - Project Overview`,
    description: project.metaDescription,
    alternates: { canonical: `${verticalConfig.baseUrl}/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const service = services.find((entry) => entry.slug === project.serviceSlug);
  const location = locations.find((entry) => entry.id === project.locationId);
  if (!service || !location) notFound();

  const guideLinks = getRelevantTopicsForService(service.slug).slice(0, 2).map((link) => ({
    href: link.href,
    label: link.title,
  }));
  const relatedServiceLinks = services
    .filter((entry) => entry.slug !== service.slug)
    .slice(0, 3)
    .map((entry) => ({
      href: `/${entry.slug}/${location.id}`,
      label: `${entry.title} in ${location.name}`,
    }));

  return (
    <ProjectDetailPage
      project={project}
      service={service}
      location={location}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      verticalId={verticalConfig.verticalId}
      ctaVariants={verticalConfig.ctaVariants}
      guideLinks={guideLinks}
      relatedServiceLinks={relatedServiceLinks}
      sidebarCtaHeading={verticalConfig.projectPageSidebar?.ctaHeading ?? "Get a quote"}
      sidebarCtaSupportText={verticalConfig.projectPageSidebar?.ctaSupportText ?? "Tell us about the project and we will price the right scope."}
      sidebarTrustLine={verticalConfig.projectPageSidebar?.trustLine ?? ""}
    />
  );
}
