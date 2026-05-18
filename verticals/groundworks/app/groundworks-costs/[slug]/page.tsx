import { notFound } from "next/navigation";
import { getHubData, getCategoryPages } from "@/lib/data";
import { InfoPage } from "engine";
import { buildInfoMetadata } from "engine";
import { verticalConfig } from "@/config";
import { getInfoPageProps } from "@/lib/infoPageProps";
import { resolveCanonicalInfoSlug, resolveInfoSlugForMetadata } from "@/lib/infoSlugPage";
import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const category = "groundworks-costs";

export async function generateStaticParams() {
  return getCategoryPages(category).map((page) => ({ slug: page.slug }));
}

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hub = getHubData(category);
  if (!hub) return { title: "Not Found" };
  const slug = resolveInfoSlugForMetadata(params.slug, (canonical) =>
    getCategoryPages(category).some((p) => p.slug === canonical)
  );
  const page = getCategoryPages(category).find((p) => p.slug === slug);
  if (!page) return { title: "Not Found" };
  return buildInfoMetadata(hub, page, verticalConfig);
}

export default function GroundworksCostSlugPage({ params }: Props) {
  const hub = getHubData(category);
  if (!hub) notFound();
  const slug = resolveCanonicalInfoSlug(hub.basePath, params.slug, (canonical) =>
    getCategoryPages(category).some((p) => p.slug === canonical)
  );
  const props = getInfoPageProps(category, slug);
  if (!props) notFound();
  return <InfoPage {...props} />;
}
