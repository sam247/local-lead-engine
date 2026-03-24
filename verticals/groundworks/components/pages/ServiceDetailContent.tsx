import Link from "next/link";
import { services, locations, relatedGuideLinksByService, serviceFaqsBySlug } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig, partnerBaseUrl, partnerTopographicalSurveyPath } from "@/config";
import { ServiceDetailContent as EngineServiceDetailContent } from "engine";

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

function ServiceCrossLinks({ slug }: { slug: string }) {
  if (slug === "piling-contractors") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For continuous flight auger work on vibration-sensitive or tight sites, see{" "}
        <Link href="/cfa-piling" className="text-primary hover:underline">
          CFA piling
        </Link>
        . Where existing foundations need stabilising,{" "}
        <Link href="/underpinning" className="text-primary hover:underline">
          underpinning
        </Link>{" "}
        may be specified alongside or instead of new piling.
      </p>
    );
  }
  if (slug === "cfa-piling") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For driven, bored and sheet piling options, see our wider{" "}
        <Link href="/piling-contractors" className="text-primary hover:underline">
          piling contractors
        </Link>{" "}
        service.
      </p>
    );
  }
  if (slug === "underpinning") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For localised foundation defects without full underpinning, see{" "}
        <Link href="/foundation-repair" className="text-primary hover:underline">
          foundation repair
        </Link>
        .
      </p>
    );
  }
  if (slug === "foundation-repair") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        Where the scheme requires deepening or widening support to the whole footprint,{" "}
        <Link href="/underpinning" className="text-primary hover:underline">
          underpinning
        </Link>{" "}
        may be more appropriate — we work to structural design. For concrete element reinstatement only, see{" "}
        <Link href="/concrete-repair" className="text-primary hover:underline">
          concrete repair
        </Link>
        .
      </p>
    );
  }
  if (slug === "concrete-repair") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        Wider foundation movement or bearing issues are usually handled under{" "}
        <Link href="/foundation-repair" className="text-primary hover:underline">
          foundation repair
        </Link>{" "}
        or{" "}
        <Link href="/underpinning" className="text-primary hover:underline">
          underpinning
        </Link>
        , depending on the engineer&apos;s scheme.
      </p>
    );
  }
  return null;
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
      servicePageHref={(slug) => `/${slug}`}
      locationLinkPath={(slug, id) => `/${slug}/${id}`}
      symptomLinks={symptomLinks}
      faqs={faqs}
      overviewImage={{ src: heroImageSrc, alt: `${service.title} – ${verticalConfig.siteName}` }}
      firstCtaMessage="Not sure what you need? Request a site assessment or quote and we'll advise on the best approach for your project."
      firstCtaButtonText="Request a Site Assessment"
      firstCtaButtonLink="/contact"
      secondCtaHeading="Need a Groundworks Quote?"
      secondCtaBody="Contact us for a no-obligation quote for piling, underpinning, foundation repair, concrete work, excavation or full groundworks. We'll outline the scope and programme for your site."
      secondCtaButtonText="Get a Quote"
      overviewExtra={
        <>
          <ServiceCrossLinks slug={service.slug} />
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
        </>
      }
    />
  );
}
