import { notFound } from "next/navigation";
import {
  buildAccessCommercialGuidePageProps,
  getAccessCommercialGuideBySlug,
  getAllAccessCommercialGuideSlugs,
} from "@/data/commercialGuides";
import { accessControlProblemPages } from "@/data/problemPages";
import { locations, services } from "@/lib/data";
import { ProblemPage, GuidePage, buildProblemMetadata } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const commercialParams = getAllAccessCommercialGuideSlugs().map((slug) => ({ slug }));
  return [...accessControlProblemPages.map((p) => ({ slug: p.slug })), ...commercialParams];
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const commercial = getAccessCommercialGuideBySlug(params.slug);
  if (commercial) {
    return {
      title: `${commercial.title} | ${verticalConfig.siteName}`,
      description: commercial.metaDescription,
      alternates: { canonical: `${verticalConfig.baseUrl}/access-problems/${commercial.slug}` },
    };
  }
  const problem = accessControlProblemPages.find((p) => p.slug === params.slug);
  if (!problem) return { title: "Not Found" };
  const base = verticalConfig.baseUrl.replace(/\/$/, "");
  return buildProblemMetadata(problem, verticalConfig, `${base}/access-problems/${problem.slug}`);
}

export default function AccessProblemSlugPage({ params }: Props) {
  const commercial = getAccessCommercialGuideBySlug(params.slug);
  if (commercial) {
    const guideProps = buildAccessCommercialGuidePageProps(commercial, services, locations);
    return (
      <GuidePage
        {...guideProps}
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
      />
    );
  }

  const problem = accessControlProblemPages.find((p) => p.slug === params.slug);
  if (!problem) notFound();

  return (
    <ProblemPage
      problem={problem}
      services={services}
      companyInfo={verticalConfig.companyInfo}
      baseUrl={verticalConfig.baseUrl}
      contactPath="/contact"
      basePath="/services"
      problemsBasePath="/access-problems"
      problemsBreadcrumbLabel={verticalConfig.problemLabel ?? "Problems"}
      allProblems={accessControlProblemPages}
      relatedProblemsTitle="Related access control issues"
      diagnosisSectionTitle="Access control problem diagnosis"
      causesSectionTitle="What causes this access control issue"
      whenToCallSectionTitle="When to call a security specialist"
      featuredLocations={locations.slice(0, 1).map((loc) => ({ id: loc.id, name: loc.name }))}
      primaryServiceSlug={problem.primaryServiceSlug}
      primaryServiceLabel={problem.primaryServiceLabel}
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      servicesNearYouTitle="Access control services near you"
      servicesNearYouIntro="Our teams deliver access control and security integration across the area. Find a local service option below."
    />
  );
}
