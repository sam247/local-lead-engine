import Link from "next/link";
import { services, locations, relatedGuideLinksByService, serviceFaqsBySlug } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig, partnerBaseUrl, partnerDrainSurveyPath } from "@/config";
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
      symptomLinksSectionTitle="Related guides"
      faqs={faqs}
      overviewImage={{ src: heroImageSrc, alt: `${service.title} – ${verticalConfig.siteName}` }}
      firstCtaMessage="Need a survey for your project? Request a quote and we'll match you with a survey specialist."
      firstCtaButtonText="Request a Survey Quote"
      firstCtaButtonLink="/contact"
      secondCtaHeading="Get a Survey Quote"
      secondCtaBody="Contact us for a no-obligation quote or to discuss your project. We'll advise on the right survey type, deliverables and programme."
      secondCtaButtonText="Request a Quote"
      overviewExtra={
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Drain surveys are often required before construction or utility mapping work.{" "}
            <a
              href={`${partnerBaseUrl}${partnerDrainSurveyPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Find out more about drain surveys
            </a>
            .
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            Explore our{" "}
            <Link href="/services/topographical-survey" className="text-primary hover:underline">
              topographical
            </Link>
            ,{" "}
            <Link href="/services/measured-building-survey" className="text-primary hover:underline">
              measured building
            </Link>
            , and{" "}
            <Link href="/services/utility-survey" className="text-primary hover:underline">
              utility surveys
            </Link>{" "}
            for planning and construction projects.
          </p>
        </>
      }
    />
  );
}
