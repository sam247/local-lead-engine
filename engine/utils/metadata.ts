import type { Metadata } from "next";
import type { Service, Location, HubData, InfoPageData, VerticalConfig } from "../types";

export function buildLocationMetadata(
  service: Service,
  location: Location,
  config: VerticalConfig
): Metadata {
  const title = `${service.title} in ${location.name} | ${config.siteName}`;
  const description = `Professional ${service.title.toLowerCase()} services in ${location.name}, ${location.area}. Trusted local drainage experts. 24/7 emergency response. Free quotes available.`;
  return {
    title,
    description,
    alternates: { canonical: `${config.baseUrl}/${service.slug}/${location.id}` },
  };
}

export function buildHubMetadata(hub: HubData, config: VerticalConfig): Metadata {
  return {
    title: `${hub.title} | ${config.siteName}`,
    description: hub.metaDescription,
    alternates: { canonical: `${config.baseUrl}${hub.basePath}` },
  };
}

export function buildInfoMetadata(
  hub: HubData,
  page: InfoPageData,
  config: VerticalConfig
): Metadata {
  return {
    title: `${page.title} | ${config.siteName}`,
    description: page.metaDescription,
    alternates: { canonical: `${config.baseUrl}${hub.basePath}/${page.slug}` },
  };
}
