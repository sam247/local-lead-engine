import type { InfoPageData } from "engine";

export const constructionDrainagePages: InfoPageData[] = [
  {
    slug: "build-over-drains-and-sewers",
    title: "Build over drains and sewers",
    metaDescription: "Building over drains and sewers: consent, design and construction for extensions and new build.",
    intro: "Building over a drain or sewer usually requires consent from the water company and compliance with building regulations. The drain may need to be surveyed, repaired or diverted. We work with drainage and structural requirements so your build can proceed safely.",
    signs: ["Build Over Agreement from water company for public/sewer", "CCTV survey of existing drain condition", "Design for support or diversion if needed", "Building control compliance", "We coordinate with drainage and structural design"],
    diagnosis: "We advise on the consent process and what surveys or design are needed. We can carry out or coordinate drainage surveys and support design for build-over.",
    resolution: "We deliver groundworks and drainage in line with consent and design. We work with structural engineers and drainage contractors so the build-over is done correctly.",
    ctaText: "Building over a drain? We can advise and deliver the groundworks to consent.",
    relatedServices: ["groundworks-contractors", "excavation-contractors", "foundation-contractors"],
    relatedPages: [
      { slug: "drainage-connections-and-surveys", category: "construction-drainage", title: "Drainage connections and surveys" },
    ],
  },
  {
    slug: "drainage-connections-and-surveys",
    title: "Drainage connections and surveys",
    metaDescription: "Drainage connections and surveys for construction. When you need a survey and how connections are made.",
    intro: "New builds and extensions often need a connection to the main drain or sewer. A drainage survey can map existing runs and confirm connection points. We coordinate groundworks with drainage design so connections are in the right place and built correctly.",
    signs: ["Drainage survey to locate existing runs and connections", "Connection design from engineer or drainage contractor", "Excavation for new runs and connection point", "Building control and water company compliance", "We deliver excavation and support connection work"],
    diagnosis: "We work from your drainage design and building layout. We excavate for new drainage runs and connection points and leave ready for the drainage contractor to make the connection.",
    resolution: "We deliver the groundworks for drainage connections and work with your drainage and structural team. We ensure formation levels and positions match the design.",
    ctaText: "Need drainage connection groundworks? We can excavate and prepare for connection.",
    relatedServices: ["groundworks-contractors", "excavation-contractors"],
    relatedPages: [
      { slug: "build-over-drains-and-sewers", category: "construction-drainage", title: "Build over drains and sewers" },
    ],
  },
];
