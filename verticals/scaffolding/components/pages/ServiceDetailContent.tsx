import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig } from "@/config";
import { ServiceDetailContent as EngineServiceDetailContent } from "engine";

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const heroImageSrc = getHeroImage({ serviceSlug: service.slug });

  return (
    <EngineServiceDetailContent
      service={service}
      services={services}
      locations={locations}
      verticalConfig={verticalConfig}
      heroImageSrc={heroImageSrc}
      contactPath="/contact"
      servicesPath="/services"
      servicePageHref={(slug) => `/${slug}`}
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      symptomLinks={[]}
      faqs={[]}
      overviewImage={{ src: heroImageSrc, alt: `${service.title} – ${verticalConfig.siteName}` }}
      firstCtaMessage="Not sure which scaffolding service you need? Contact us for free advice and a no-obligation quote."
      firstCtaButtonText="Get Scaffolding Advice"
      firstCtaButtonLink="/contact"
      secondCtaHeading="Need a Scaffolding Quote?"
      secondCtaBody="Contact us for a no-obligation quote for domestic, commercial or specialist scaffolding. We'll design the right structure for your project."
      secondCtaButtonText="Get a Quote"
    />
  );
}
