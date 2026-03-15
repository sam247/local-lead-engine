import type { InfoPageData } from "engine";

export const drivewayGroundworksPages: InfoPageData[] = [
  {
    slug: "driveway-sub-base-and-drainage",
    title: "Driveway sub-base and drainage",
    metaDescription: "Driveway sub-base and drainage: construction layers and drainage for domestic driveways.",
    intro: "A lasting driveway needs a proper sub-base and drainage. The sub-base distributes load and prevents settlement; drainage prevents water pooling and damage. This guide covers typical construction layers and how we build driveways to resist frost and traffic.",
    signs: ["Type 1 or similar sub-base compacted in layers", "Adequate fall for surface water", "Drainage to soakaway or main drain where needed", "Membrane to separate sub-base from subsoil", "Correct depth for vehicle loads"],
    diagnosis: "We assess the existing ground and any drainage constraints, then specify sub-base depth and drainage. We follow best practice and building control where applicable.",
    resolution: "We excavate, install sub-base and drainage, and prepare the formation for your chosen surface (block, tarmac, resin, etc.). We work with surfacing contractors or deliver a complete package.",
    ctaText: "Need driveway groundworks? We can prepare the sub-base and drainage.",
    relatedServices: ["groundworks-contractors", "excavation-contractors"],
    relatedPages: [
      { slug: "driveway-access-and-construction", category: "driveway-groundworks", title: "Driveway access and construction" },
    ],
  },
  {
    slug: "driveway-access-and-construction",
    title: "Driveway access and construction",
    metaDescription: "Driveway access and construction: planning, groundworks and surfacing for domestic driveways.",
    intro: "Driveway construction involves planning (including dropped kerb and drainage consent where needed), groundworks for the sub-base and drainage, and then the chosen surfacing. We deliver the groundworks so your driveway is built on a stable, drained base.",
    signs: ["Dropped kerb consent if crossing pavement", "Drainage consent if connecting to main drain", "Excavation and sub-base to specification", "Drainage runs and connections", "Ready for surfacing contractor"],
    diagnosis: "We advise on consent requirements and programme. We then excavate, install sub-base and drainage, and leave the site ready for surfacing.",
    resolution: "We deliver driveway groundworks to programme with proper compaction and drainage. We can work with your surfacing contractor or recommend one.",
    ctaText: "Planning a new driveway? We can handle the groundworks and drainage.",
    relatedServices: ["groundworks-contractors", "excavation-contractors"],
    relatedPages: [
      { slug: "driveway-sub-base-and-drainage", category: "driveway-groundworks", title: "Driveway sub-base and drainage" },
    ],
  },
];
