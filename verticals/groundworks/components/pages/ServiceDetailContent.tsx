import Link from "next/link";
import { services, locations, relatedGuideLinksByService, relatedCostGuideLinksByService, serviceFaqsBySlug } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig, partnerBaseUrl, partnerTopographicalSurveyPath } from "@/config";
import { ServiceDetailContent as EngineServiceDetailContent } from "engine";

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

function ServiceCrossLinks({ slug }: { slug: string }) {
  if (slug === "groundworks-contractors") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For early site preparation and spoil management, see{" "}
        <Link href="/site-preparation-services" className="text-primary hover:underline">
          site preparation services
        </Link>
        . Where the job needs larger cut and fill or bulk excavation,{" "}
        <Link href="/bulk-earthworks" className="text-primary hover:underline">
          bulk earthworks
        </Link>{" "}
        and{" "}
        <Link href="/excavation-contractors" className="text-primary hover:underline">
          excavation contractors
        </Link>{" "}
        are usually the next steps.
      </p>
    );
  }
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
  if (slug === "foundation-contractors") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For shallow or uncertain foundation questions, see{" "}
        <Link href="/foundation-depth-issues" className="text-primary hover:underline">
          foundation depth issues
        </Link>
        . If you&apos;re checking an existing building,{" "}
        <Link href="/foundation-problems/foundations-too-shallow" className="text-primary hover:underline">
          foundations too shallow
        </Link>{" "}
        and{" "}
        <Link href="/foundation-problems/house-foundation-advice" className="text-primary hover:underline">
          house foundation advice
        </Link>{" "}
        are the best starting points.
      </p>
    );
  }
  if (slug === "foundation-depth-issues") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For deeper support where shallow founding is confirmed, see{" "}
        <Link href="/underpinning" className="text-primary hover:underline">
          underpinning
        </Link>{" "}
        and{" "}
        <Link href="/foundation-remedial-work" className="text-primary hover:underline">
          foundation remedial work
        </Link>
        . If you&apos;re unsure why the foundations are insufficient, read{" "}
        <Link href="/foundation-problems/foundations-too-shallow" className="text-primary hover:underline">
          foundations too shallow
        </Link>
        .
      </p>
    );
  }
  if (slug === "building-regs-foundation-compliance") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        Where compliance issues are affecting an extension or alteration, see{" "}
        <Link href="/foundation-problems/extension-not-building-regs-compliant" className="text-primary hover:underline">
          extension not building regs compliant
        </Link>
        . For wider project review,{" "}
        <Link href="/structural-groundworks-consultation" className="text-primary hover:underline">
          structural groundworks consultation
        </Link>{" "}
        can help define the next step.
      </p>
    );
  }
  if (slug === "clay-soil-foundation-problems") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For clay-related movement close to trees, see{" "}
        <Link href="/foundation-problems/foundation-near-tree-clay-soil" className="text-primary hover:underline">
          foundation near tree clay soil
        </Link>
        . If the ground response needs checking first,{" "}
        <Link href="/soil-bearing-capacity-testing" className="text-primary hover:underline">
          soil bearing capacity testing
        </Link>{" "}
        and{" "}
        <Link href="/ground-investigation-services" className="text-primary hover:underline">
          ground investigation services
        </Link>{" "}
        are common next steps.
      </p>
    );
  }
  if (slug === "tree-impact-foundations") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        Where tree influence is already affecting the structure, see{" "}
        <Link href="/foundation-problems/foundation-near-tree-clay-soil" className="text-primary hover:underline">
          foundation near tree clay soil
        </Link>
        . For stabilisation,{" "}
        <Link href="/underpinning" className="text-primary hover:underline">
          underpinning
        </Link>{" "}
        and{" "}
        <Link href="/foundation-remedial-work" className="text-primary hover:underline">
          foundation remedial work
        </Link>{" "}
        are often relevant.
      </p>
    );
  }
  if (slug === "foundation-remedial-work") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For foundation support that has dropped out because of depth or movement, see{" "}
        <Link href="/foundation-problems/foundations-too-shallow" className="text-primary hover:underline">
          foundations too shallow
        </Link>
        . Where deeper stabilisation is needed,{" "}
        <Link href="/foundation-depth-issues" className="text-primary hover:underline">
          foundation depth issues
        </Link>{" "}
        and{" "}
        <Link href="/underpinning-advice" className="text-primary hover:underline">
          underpinning advice
        </Link>{" "}
        are usually the next steps.
      </p>
    );
  }
  if (slug === "underpinning-advice") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        If the issue is still being diagnosed,{" "}
        <Link href="/foundation-problems/foundations-too-shallow" className="text-primary hover:underline">
          foundations too shallow
        </Link>{" "}
        and{" "}
        <Link href="/foundation-problems/house-foundation-advice" className="text-primary hover:underline">
          house foundation advice
        </Link>{" "}
        are useful starting points. We can then move to{" "}
        <Link href="/foundation-remedial-work" className="text-primary hover:underline">
          foundation remedial work
        </Link>{" "}
        if underpinning is confirmed.
      </p>
    );
  }
  if (slug === "structural-groundworks-consultation") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For early-stage review before a build starts, see{" "}
        <Link href="/foundation-problems/house-foundation-advice" className="text-primary hover:underline">
          house foundation advice
        </Link>
        . If the site needs testing or investigation,{" "}
        <Link href="/ground-investigation-services" className="text-primary hover:underline">
          ground investigation services
        </Link>{" "}
        can help define the route.
      </p>
    );
  }
  if (slug === "excavation-contractors") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For large-volume cut, fill and formation work, see{" "}
        <Link href="/bulk-earthworks" className="text-primary hover:underline">
          bulk earthworks
        </Link>
        . If the project needs early site set-up first,{" "}
        <Link href="/site-preparation-services" className="text-primary hover:underline">
          site preparation services
        </Link>{" "}
        and{" "}
        <Link href="/muck-away-services" className="text-primary hover:underline">
          muck away services
        </Link>{" "}
        are often part of the same package.
      </p>
    );
  }
  if (slug === "site-clearance-contractors") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For spoil removal and disposal during clearance, see{" "}
        <Link href="/muck-away-services" className="text-primary hover:underline">
          muck away services
        </Link>
        . For broader early works,{" "}
        <Link href="/site-preparation-services" className="text-primary hover:underline">
          site preparation services
        </Link>{" "}
        and{" "}
        <Link href="/bulk-earthworks" className="text-primary hover:underline">
          bulk earthworks
        </Link>{" "}
        are often linked.
      </p>
    );
  }
  if (slug === "muck-away-services") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For a broader early-works package, see{" "}
        <Link href="/site-preparation-services" className="text-primary hover:underline">
          site preparation services
        </Link>
        . If the job also includes large cut and fill,{" "}
        <Link href="/bulk-earthworks" className="text-primary hover:underline">
          bulk earthworks
        </Link>{" "}
        and{" "}
        <Link href="/site-clearance-contractors" className="text-primary hover:underline">
          site clearance contractors
        </Link>{" "}
        are the usual next pages.
      </p>
    );
  }
  if (slug === "bulk-earthworks") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For early site set-up and spoil handling, see{" "}
        <Link href="/site-preparation-services" className="text-primary hover:underline">
          site preparation services
        </Link>{" "}
        and{" "}
        <Link href="/muck-away-services" className="text-primary hover:underline">
          muck away services
        </Link>
        . Where the scheme also needs trenching or formation work,{" "}
        <Link href="/excavation-contractors" className="text-primary hover:underline">
          excavation contractors
        </Link>{" "}
        fit naturally alongside it.
      </p>
    );
  }
  if (slug === "site-preparation-services") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For spoil removal and waste handling, see{" "}
        <Link href="/muck-away-services" className="text-primary hover:underline">
          muck away services
        </Link>
        . Where the project needs major cut and fill,{" "}
        <Link href="/bulk-earthworks" className="text-primary hover:underline">
          bulk earthworks
        </Link>{" "}
        and{" "}
        <Link href="/enabling-works-contractors" className="text-primary hover:underline">
          enabling works contractors
        </Link>{" "}
        are the usual companion services.
      </p>
    );
  }
  if (slug === "enabling-works-contractors") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For early site clearance and spoil handling, see{" "}
        <Link href="/site-preparation-services" className="text-primary hover:underline">
          site preparation services
        </Link>
        . If the programme includes large excavation or disposal,{" "}
        <Link href="/muck-away-services" className="text-primary hover:underline">
          muck away services
        </Link>{" "}
        and{" "}
        <Link href="/bulk-earthworks" className="text-primary hover:underline">
          bulk earthworks
        </Link>{" "}
        are usually relevant.
      </p>
    );
  }
  if (slug === "ground-investigation-services") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For load-related checks after an investigation, see{" "}
        <Link href="/soil-bearing-capacity-testing" className="text-primary hover:underline">
          soil bearing capacity testing
        </Link>{" "}
        and{" "}
        <Link href="/plate-load-testing" className="text-primary hover:underline">
          plate load testing
        </Link>
        . For early advice on what the findings mean,{" "}
        <Link href="/structural-groundworks-consultation" className="text-primary hover:underline">
          structural groundworks consultation
        </Link>{" "}
        is a good next step.
      </p>
    );
  }
  if (slug === "soil-bearing-capacity-testing") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        If the ground needs direct testing under load, see{" "}
        <Link href="/plate-load-testing" className="text-primary hover:underline">
          plate load testing
        </Link>
        . Where results need a staged approach,{" "}
        <Link href="/incremental-plate-load-testing" className="text-primary hover:underline">
          incremental plate load testing
        </Link>{" "}
        may be the better fit.
      </p>
    );
  }
  if (slug === "plate-load-testing") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For a more detailed staged test, see{" "}
        <Link href="/incremental-plate-load-testing" className="text-primary hover:underline">
          incremental plate load testing
        </Link>
        . If the aim is to understand the site before design is fixed,{" "}
        <Link href="/ground-investigation-services" className="text-primary hover:underline">
          ground investigation services
        </Link>{" "}
        may be the better first step.
      </p>
    );
  }
  if (slug === "incremental-plate-load-testing") {
    return (
      <p className="mb-4 text-sm text-muted-foreground">
        For a quicker bearing check, see{" "}
        <Link href="/plate-load-testing" className="text-primary hover:underline">
          plate load testing
        </Link>
        . Where the ground model still needs confirming,{" "}
        <Link href="/soil-bearing-capacity-testing" className="text-primary hover:underline">
          soil bearing capacity testing
        </Link>{" "}
        is often used alongside it.
      </p>
    );
  }
  return null;
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const guideLinks = relatedGuideLinksByService[service.slug] ?? [];
  const costGuideLinks = relatedCostGuideLinksByService[service.slug] ?? [];
  const symptomLinks = [...guideLinks, ...costGuideLinks];
  const faqs = serviceFaqsBySlug[service.slug] ?? [];
  const heroImageSrc = getHeroImage({ serviceSlug: service.slug });
  const displayTitle = service.titleSingular ?? service.title;
  const sortedLocations = [...locations].sort((a, b) => a.id.localeCompare(b.id));
  const areasWeCoverCount = Math.min(sortedLocations.length, 50);
  const areasWeCoverLinks = sortedLocations.slice(0, areasWeCoverCount).map((loc) => ({
    href: `/${service.slug}/${loc.id}`,
    label: `${displayTitle} in ${loc.name}`,
  }));

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
      areasWeCoverLinks={areasWeCoverLinks}
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
