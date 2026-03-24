import { notFound } from "next/navigation";
import { getHubData, getCategoryPages, services, locations } from "@/lib/data";
import { InfoPage, ProblemPage } from "engine";
import { buildInfoMetadata } from "engine";
import { verticalConfig } from "@/config";
import { getInfoPageProps } from "@/lib/infoPageProps";
import { surveyProblemPages, getSurveyProblemPageBySlug } from "@/data/problemPages";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "problems";

export async function generateStaticParams() {
  const hubSlugs = getCategoryPages(category).map((page) => ({ slug: page.slug }));
  const problemSlugs = surveyProblemPages.map((page) => ({ slug: page.slug }));
  return [...problemSlugs, ...hubSlugs];
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const problem = getSurveyProblemPageBySlug(params.slug);
  if (problem) {
    return {
      title: `${problem.title} – Causes and Next Steps | ${verticalConfig.siteName}`,
      description: `${problem.causes.slice(0, 155)}...`,
      alternates: { canonical: `${verticalConfig.baseUrl}/drain-problems/${problem.slug}` },
    };
  }
  const hub = getHubData(category);
  const page = getCategoryPages(category).find((p) => p.slug === params.slug);
  if (!hub || !page) return { title: "Not Found" };
  return buildInfoMetadata(hub, page, verticalConfig);
}

export default function DrainProblemsInfoPage({ params }: Props) {
  const problem = getSurveyProblemPageBySlug(params.slug);
  if (problem) {
    return (
      <ProblemPage
        problem={problem}
        services={services}
        companyInfo={verticalConfig.companyInfo}
        baseUrl={verticalConfig.baseUrl}
        contactPath="/contact"
        basePath="/services"
        problemsBasePath="/drain-problems"
        problemsBreadcrumbLabel={verticalConfig.problemLabel ?? "Problems"}
        allProblems={surveyProblemPages}
        relatedProblemsTitle="Related survey issues"
        diagnosisSectionTitle="Survey problem diagnosis"
        causesSectionTitle="What causes this site issue"
        whenToCallSectionTitle="When to call a survey specialist"
        featuredLocations={locations.slice(0, 1).map((loc) => ({ id: loc.id, name: loc.name }))}
        primaryServiceSlug={problem.primaryServiceSlug}
        primaryServiceLabel={problem.primaryServiceLabel}
        locationLinkPath={(slug, id) => `/${slug}/${id}`}
        servicesNearYouTitle="Survey services near you"
        servicesNearYouIntro="Our teams deliver survey services across the area. Compare the main service route below."
      />
    );
  }
  const props = getInfoPageProps(category, params.slug);
  if (!props) notFound();
  return <InfoPage {...props} />;
}
