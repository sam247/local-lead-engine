import { notFound } from "next/navigation";
import { getHubData, getCategoryPages } from "@/lib/data";
import InfoPageContent from "@/components/pages/InfoPageContent";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "property-types";

export async function generateStaticParams() {
  return getCategoryPages(category).map((page) => ({ slug: page.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = getHubData(category);
  const page = getCategoryPages(category).find((p) => p.slug === params.slug);
  if (!hub || !page) return { title: "Not Found" };
  return { title: `${page.title} | Mainline Drains`, description: page.metaDescription, alternates: { canonical: `https://mainlinedrains.co.uk${hub.basePath}/${page.slug}` } };
}

export default function InfoPage({ params }: Props) {
  const hub = getHubData(category);
  const page = getCategoryPages(category).find((p) => p.slug === params.slug);
  if (!hub || !page) notFound();
  return <InfoPageContent category={category} slug={params.slug} />;
}
