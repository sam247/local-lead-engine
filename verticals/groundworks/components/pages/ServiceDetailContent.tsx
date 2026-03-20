import { services, locations, relatedGuideLinksByService, serviceFaqsBySlug } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig, partnerBaseUrl, partnerTopographicalSurveyPath } from "@/config";
import { ServiceDetailContent as EngineServiceDetailContent } from "engine";

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const symptomLinks = relatedGuideLinksByService[service.slug] ?? [];
  const faqs = serviceFaqsBySlug[service.slug] ?? [];
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
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      symptomLinks={symptomLinks}
      faqs={faqs}
      overviewImage={{ src: heroImageSrc, alt: `${service.title} – ${verticalConfig.siteName}` }}
      firstCtaMessage="Not sure what you need? Request a site assessment or quote and we'll advise on the best approach for your project."
      firstCtaButtonText="Request a Site Assessment"
      firstCtaButtonLink="/contact"
      secondCtaHeading="Need a Groundworks Quote?"
      secondCtaBody="Contact us for a no-obligation quote for piling, excavation, foundations or full groundworks. We'll outline the scope and programme for your site."
      secondCtaButtonText="Get a Quote"
      overviewExtra={
        <p className="mb-8 text-sm text-muted-foreground">
          Larger construction projects may require a{" "}
          <a
            href={`${partnerBaseUrl}${partnerTopographicalSurveyPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            topographical or utility survey
          </a>{" "}
          before groundworks begin.
        </p>
      }
    />
  );
}
