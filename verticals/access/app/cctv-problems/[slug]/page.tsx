import { notFound } from "next/navigation";
import { services, locations } from "@/lib/data";
import { cctvProblems, getCctvProblemBySlug } from "@/data/cctvProblems";
import { ProblemPage } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const SERVICES_NEAR_YOU_INTRO =
  "We provide commercial CCTV installation, IP camera systems and security integration across the area. Find a local service below.";

export async function generateStaticParams() {
  return cctvProblems.map((p) => ({ slug: p.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getCctvProblemBySlug(params.slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} – Causes and Fix | ${verticalConfig.siteName}`,
    description: `${problem.causes.slice(0, 155)}...`,
    alternates: { canonical: `${verticalConfig.baseUrl}/cctv-problems/${problem.slug}` },
  };
}

export default function CctvProblemSlugPage({ params }: Props) {
  const problem = getCctvProblemBySlug(params.slug);
  if (!problem) notFound();

  return (
    <ProblemPage
      problem={problem}
      services={services}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      contactPath="/contact"
      basePath="/services"
      problemsBasePath="/cctv-problems"
      problemsBreadcrumbLabel="CCTV Problems"
      allProblems={cctvProblems}
      relatedProblemsTitle="Related CCTV issues"
      diagnosisSectionTitle="CCTV problem diagnosis"
      causesSectionTitle="What causes this CCTV problem"
      whenToCallSectionTitle="When to call a security professional"
      featuredLocations={locations.slice(0, 8).map((loc) => ({ id: loc.id, name: loc.name }))}
      primaryServiceSlug="commercial-cctv-installation"
      primaryServiceLabel="Commercial CCTV installation"
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      servicesNearYouTitle="CCTV services near you"
      servicesNearYouIntro={SERVICES_NEAR_YOU_INTRO}
    />
  );
}
