import { notFound } from "next/navigation";
import { getCategoryPages } from "@/lib/data";
import { InfoPage, buildInfoMetadata } from "engine";
import { getInfoPageProps } from "@/lib/infoPageProps";
import { verticalConfig } from "@/config";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "safety";

export async function generateStaticParams() {
  return getCategoryPages(category).map((page) => ({ slug: page.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const props = getInfoPageProps(category, params.slug);
  if (!props) return { title: "Not Found" };
  return buildInfoMetadata(props.hub, props.page, verticalConfig);
}

export default function ScaffoldSafetyGuidePage({ params }: Props) {
  const props = getInfoPageProps(category, params.slug);
  if (!props) notFound();
  return <InfoPage {...props} />;
}
