import { services, locations } from "@/lib/data";
import { getHeroImage } from "@/lib/images";
import { verticalConfig, partnerBaseUrl, partnerTopographicalSurveyPath, partnerDrainsBaseUrl } from "@/config";
import { ServiceDetailContent as EngineServiceDetailContent } from "engine";

const serviceSymptomLinks: Record<string, { slug: string; path: string; title: string }[]> = {
  "access-control-systems": [
    { slug: "access-control-system-cost", path: "/access-problems/access-control-system-cost", title: "Access control system cost" },
    { slug: "hospital-security-system-requirements", path: "/access-problems/hospital-security-system-requirements", title: "Hospital security requirements" },
  ],
  "commercial-cctv-installation": [
    { slug: "commercial-cctv-installation-cost", path: "/access-problems/commercial-cctv-installation-cost", title: "Commercial CCTV installation cost" },
    { slug: "how-many-cameras-for-commercial-building", path: "/access-problems/how-many-cameras-for-commercial-building", title: "How many cameras for commercial building" },
  ],
  "ip-camera-systems": [
    { slug: "commercial-cctv-installation-cost", path: "/access-problems/commercial-cctv-installation-cost", title: "CCTV and IP camera costs" },
    { slug: "how-many-cameras-for-commercial-building", path: "/access-problems/how-many-cameras-for-commercial-building", title: "How many cameras do I need?" },
  ],
  "perimeter-security-systems": [
    { slug: "data-centre-perimeter-security", path: "/access-problems/data-centre-perimeter-security", title: "Data centre perimeter security" },
  ],
  "security-system-integration": [
    { slug: "hospital-security-system-requirements", path: "/access-problems/hospital-security-system-requirements", title: "Integrated security for healthcare" },
    { slug: "data-centre-perimeter-security", path: "/access-problems/data-centre-perimeter-security", title: "Integrated security for data centres" },
  ],
};

const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
  "access-control-systems": [
    { question: "How much does access control cost?", answer: "Costs depend on the number of doors, reader type (card, fob, biometric) and integration needs. We provide fixed-price quotes after a site survey." },
    { question: "Can you integrate with our existing system?", answer: "Yes. We integrate with major access and building management systems where possible and recommend upgrades when needed." },
    { question: "Do you offer maintenance?", answer: "Yes. We offer planned maintenance and 24/7 support for contract clients." },
  ],
  "commercial-cctv-installation": [
    { question: "How much does commercial CCTV cost?", answer: "Costs depend on camera count, resolution, recording and remote viewing. We quote after a site survey." },
    { question: "Do you provide remote viewing?", answer: "Yes. We configure secure remote viewing and can integrate with your existing network." },
    { question: "What areas do you cover?", answer: "We install CCTV across London and the UK for commercial and public-sector sites." },
  ],
  "ip-camera-systems": [
    { question: "What is the difference between IP and analogue CCTV?", answer: "IP cameras use your network and offer higher resolution, scalability and integration. We can specify the right option for your site." },
    { question: "Can IP cameras work with our existing system?", answer: "Yes. We integrate IP cameras with existing NVRs, VMS and access control where compatible." },
  ],
  "perimeter-security-systems": [
    { question: "What types of perimeter detection do you install?", answer: "We install PIR, beam detection, fence sensors and CCTV for boundaries and outdoor areas, tailored to your site." },
    { question: "Do you work with data centres?", answer: "Yes. We design and install perimeter and access security for data centres and critical sites." },
  ],
  "security-system-integration": [
    { question: "What can be integrated?", answer: "We integrate access control, CCTV, intruder alarms and monitoring into a single platform where appropriate." },
    { question: "Do you support existing systems?", answer: "Yes. We work with major brands and open protocols to integrate or upgrade existing security." },
  ],
};

interface ServiceDetailContentProps {
  service: (typeof services)[number];
}

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const symptomLinks = serviceSymptomLinks[service.slug] ?? [];
  const faqs = serviceFaqs[service.slug] ?? [];
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
      firstCtaMessage="Need a security system quote or site survey? We provide free, no-obligation consultations."
      firstCtaButtonText="Request Security Consultation"
      firstCtaButtonLink="/contact"
      overviewExtra={
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Large commercial security installations often require a{" "}
            <a
              href={`${partnerBaseUrl}${partnerTopographicalSurveyPath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              topographical survey
            </a>{" "}
            before installation begins.
          </p>
          <p className="mb-8 text-sm text-muted-foreground">
            Security systems are often installed during major construction projects alongside{" "}
            <a
              href={partnerDrainsBaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              drainage and other utilities
            </a>
            .
          </p>
        </>
      }
    />
  );
}
