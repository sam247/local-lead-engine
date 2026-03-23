import { notFound } from "next/navigation";
import { accessProblems, getAccessProblemBySlug } from "@/data/problems";
import {
  buildAccessCommercialGuidePageProps,
  getAccessCommercialGuideBySlug,
  getAllAccessCommercialGuideSlugs,
} from "@/data/commercialGuides";
import { locations, services } from "@/lib/data";
import { ProblemPage, GuidePage } from "engine";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateStaticParams() {
  const commercialParams = getAllAccessCommercialGuideSlugs().map((slug) => ({ slug }));
  return [...accessProblems.map((p) => ({ slug: p.slug })), ...commercialParams];
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
  const problem = getAccessProblemBySlug(params.slug);
  if (!problem) return { title: "Not Found" };
  return {
    title: `${problem.title} – Causes and Repair | ${verticalConfig.siteName}`,
    description: `${problem.causes.slice(0, 155)}...`,
    alternates: { canonical: `${verticalConfig.baseUrl}/access-problems/${problem.slug}` },
  };
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

  const problem = getAccessProblemBySlug(params.slug);
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
    />
  );
}
