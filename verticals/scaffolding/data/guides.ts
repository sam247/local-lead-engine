import type { InfoPageData } from "engine";

export const guidesPages: InfoPageData[] = [
  // --- Commercial / high-intent pages (5) ---
  {
    slug: "domestic-scaffolding-for-extensions",
    title: "Domestic scaffolding for home extensions",
    metaDescription: "When do you need scaffolding for a house extension? What's involved, how long it takes and what it costs.",
    intro:
      "A house extension almost always requires scaffolding — to give builders safe access to the new roof, upper walls and the junction with the existing structure. The scaffold needs to go up before the brickwork reaches height, and usually stays until the roof is tiled and the external walls are finished.",
    signs: [
      "Scaffolding is needed once walls reach above safe ladder height — typically one to two courses above the ground-floor ceiling",
      "Roof work and ridge details require edge protection and a working platform",
      "The junction between old and new roof often needs detailed scaffold access",
      "Chimney or stack works adjacent to the extension may need additional scaffold lifts",
      "Building control may require documented scaffold inspection records before sign-off",
    ],
    diagnosis:
      "Your builder or architect should specify when scaffolding is required during the extension programme. We assess the structure, design the appropriate scaffold and agree erection timing with the main contractor.",
    resolution:
      "We erect domestic extension scaffolding to TG20 standards, provide scaffold tags and inspection records, and adapt the structure if the scope changes during the project. We strike on completion and leave the site clean.",
    ctaText: "Planning an extension? Get a scaffolding quote from our team.",
    relatedServices: ["domestic-scaffolding", "scaffolding-contractors"],
    relatedPages: [
      { slug: "scaffolding-hire-vs-full-service", category: "guides", title: "Scaffolding hire vs full service" },
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
    ],
  },
  {
    slug: "scaffolding-hire-vs-full-service",
    title: "Scaffolding hire vs full scaffolding service — which do you need",
    metaDescription: "Should you hire scaffold equipment or use a full design-and-erect scaffolding service? How to choose.",
    intro:
      "Most homeowners and main contractors use a full design-and-erect scaffolding service, where the contractor handles design, erection, inspection and strike. Scaffold hire — where you rent the equipment and erect it yourself — is only suitable for contractors with qualified CISRS scaffolders on their own team.",
    signs: [
      "Scaffold hire is for qualified contractors who supply their own scaffolders",
      "Full design-and-erect is the right choice for most homeowners, builders and main contractors",
      "Hiring equipment without qualified scaffolders is a working at height compliance issue",
      "The Scaffold (Safety) Regulations and TG20 require scaffolding to be erected by competent persons",
      "Insurance policies often require scaffolding to be erected and certified by a competent contractor",
    ],
    diagnosis:
      "If you have CISRS-trained scaffolders on your team and need equipment only, hire may be suitable. For all other clients, a full design-and-erect service is the right approach.",
    resolution:
      "We offer both scaffold hire for qualified contractors and full design-and-erect services for all project types. Contact us to discuss your requirements.",
    ctaText: "Need scaffold hire or a full scaffolding service? Contact us.",
    relatedServices: ["scaffolding-hire", "scaffolding-contractors"],
    relatedPages: [
      { slug: "domestic-scaffolding-for-extensions", category: "guides", title: "Domestic scaffolding for extensions" },
      { slug: "scaffolding-hire-pricing-guide", category: "costs", title: "Scaffolding hire pricing guide" },
    ],
  },
  {
    slug: "commercial-scaffold-access-for-maintenance",
    title: "Commercial scaffold access for maintenance and refurbishment",
    metaDescription: "How commercial scaffolding works for building maintenance, cladding, window replacement and facade refurbishment.",
    intro:
      "Commercial scaffolding for maintenance and refurbishment differs from new-build scaffolding in a few important ways — the building is usually occupied, programme disruption must be minimised, and the scaffold often needs to be managed for an extended period rather than struck immediately after a one-off task.",
    signs: [
      "Facade access for window, cladding or rendering replacement",
      "Planned maintenance contracts where access is required periodically over months",
      "Works to occupied buildings requiring protection sheeting and debris netting",
      "Phased scaffold erection to allow partial access throughout the contract",
      "Documented inspection schedule required throughout the contract period",
    ],
    diagnosis:
      "We review the maintenance programme, building type and access constraints to design a scaffold solution that minimises operational disruption and provides safe, compliant access throughout the works.",
    resolution:
      "We provide commercial scaffold design, erection, ongoing inspection management and full documentation for maintenance and refurbishment contracts of any duration.",
    ctaText: "Planning a maintenance contract? Get a commercial scaffolding quote.",
    relatedServices: ["commercial-scaffolding", "scaffolding-contractors"],
    relatedPages: [
      { slug: "commercial-scaffolding-costs", category: "costs", title: "Commercial scaffolding costs" },
      { slug: "scaffold-inspection-requirements", category: "safety", title: "Scaffold inspection requirements" },
    ],
  },
  {
    slug: "choosing-a-scaffolding-contractor",
    title: "Choosing a scaffolding contractor — what to look for",
    metaDescription: "How to choose a scaffolding contractor. NASC accreditation, insurance, CISRS qualifications and handover documentation explained.",
    intro:
      "Choosing the right scaffolding contractor is not just about price. Scaffold failures cause deaths and serious injuries every year in the UK. The right contractor will be NASC accredited, employ CISRS-trained scaffolders, carry adequate insurance and provide full documentation on every job.",
    signs: [
      "NASC accreditation — contractors should be able to show their NASC membership",
      "CISRS-trained operatives — all scaffolders should hold current CISRS cards",
      "Public liability insurance minimum £5 million — ask to see the certificate",
      "Scaffold tags and inspection records on every job — not optional",
      "Handover certificates issued before the scaffold is used",
      "TG20 compliance declarations where relevant",
    ],
    diagnosis:
      "Ask any scaffolding contractor for their NASC membership number, CISRS card holders on the team, and copies of their public liability insurance. A reputable contractor will provide all of this without hesitation.",
    resolution:
      "We are NASC accredited, employ CISRS-trained operatives and provide full documentation as standard. Contact us for a free quote with no obligation.",
    ctaText: "Looking for a compliant, accredited scaffolding contractor? Contact us.",
    relatedServices: ["scaffolding-contractors", "domestic-scaffolding"],
    relatedPages: [
      { slug: "scaffolding-safety-standards-tg20", category: "safety", title: "Scaffolding safety standards and TG20" },
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
    ],
  },
  {
    slug: "when-is-scaffolding-required-by-regulation",
    title: "When is scaffolding required by regulation",
    metaDescription: "When are you legally required to use scaffolding? Working at Height Regulations and HSE guidance explained.",
    intro:
      "UK law does not specifically require scaffolding in all situations, but the Work at Height Regulations 2005 require employers and the self-employed to ensure that work at height is carried out safely with appropriate access equipment. For many tasks, scaffolding is the only practical way to comply.",
    signs: [
      "Any work that cannot be done safely from a ladder or mobile access equipment requires a working platform",
      "Roofing, facade and chimney work almost always requires scaffolding for edges and sustained working positions",
      "Building regulations may require scaffold inspection records for sign-off on notifiable works",
      "CDM Regulations require principal designers and contractors to plan access for maintenance during the building's life",
      "Insurance policies may be invalidated if works were carried out without proper access equipment",
    ],
    diagnosis:
      "Your principal contractor or H&S advisor should assess access requirements during pre-construction planning. For domestic works, your builder or roofer should specify when scaffolding is required.",
    resolution:
      "We provide scaffolding designed and erected to TG20 with full inspection records and handover documentation, so your project meets all regulatory requirements.",
    ctaText: "Need scaffolding that meets all regulatory requirements? Contact us.",
    relatedServices: ["scaffolding-contractors", "domestic-scaffolding"],
    relatedPages: [
      { slug: "working-at-height-regulations", category: "safety", title: "Working at height regulations for scaffolding" },
      { slug: "scaffold-inspection-requirements", category: "safety", title: "Scaffold inspection requirements" },
    ],
  },
  // --- Informational pages (3) ---
  {
    slug: "how-scaffolding-is-designed-and-erected",
    title: "How scaffolding is designed and erected",
    metaDescription: "How scaffolding is designed, erected and inspected — a guide to the scaffolding process from survey to strike.",
    intro:
      "Scaffolding design starts with a survey of the structure, access constraints and the programme of works. The scaffolder designs the structure to carry the expected loads, using either TG20 standard configurations or a bespoke design for complex or non-standard situations. Erection follows the design drawing, with inspection and tagging before the scaffold is used.",
    signs: [
      "Survey: scaffolder assesses the structure, loading requirements and access constraints",
      "Design: TG20 standard or bespoke design produced; drawings required for complex structures",
      "Foundation: base plates, sole boards or anchoring to the structure",
      "Standards, ledgers and transoms erected to the design",
      "Boards, guard rails, toe boards and access fitted",
      "Pre-use inspection by a competent person; scaffold tag issued",
    ],
    diagnosis:
      "A competent scaffolder will identify any non-standard requirements — bay widths, loading levels, tie patterns, fan protection — during the survey and incorporate these into the design.",
    resolution:
      "We provide survey, design and erection as a single service, with all documentation provided before the scaffold is handed over for use.",
    ctaText: "Discuss your scaffolding requirements with our team.",
    relatedServices: ["scaffolding-contractors", "domestic-scaffolding"],
    relatedPages: [
      { slug: "choosing-a-scaffolding-contractor", category: "guides", title: "Choosing a scaffolding contractor" },
      { slug: "scaffold-inspection-requirements", category: "safety", title: "Scaffold inspection requirements" },
    ],
  },
  {
    slug: "types-of-scaffolding-structures",
    title: "Types of scaffolding structures",
    metaDescription: "Tube and fitting, system scaffold, birdcage, cantilever and mobile towers — types of scaffolding explained.",
    intro:
      "Different scaffolding structures suit different applications. Tube and fitting scaffolding is the most versatile but labour-intensive. System scaffolding is faster to erect for standard configurations. Birdcage scaffolding provides internal access platforms. Cantilever and suspended scaffolding solves specific access problems where ground-based standards are not possible.",
    signs: [
      "Tube and fitting: maximum flexibility, suitable for any structure or load",
      "System scaffolding (e.g. Layher, Haki): faster erection for standard bay sizes",
      "Birdcage scaffolding: internal platforms for ceiling and roof work",
      "Cantilever scaffolding: where ground conditions prevent standard standards",
      "Suspended scaffolding: for high-level facade work from roof-mounted outriggers",
      "Mobile towers: for short-duration, low-height access",
    ],
    diagnosis:
      "The structure type is chosen by the scaffolder based on the application, loading requirements and access constraints. We select the most appropriate system for each job.",
    resolution:
      "We work with tube and fitting and system scaffolding across all project types. Contact us to discuss the right approach for your project.",
    ctaText: "Not sure what type of scaffolding you need? Contact us.",
    relatedServices: ["scaffolding-contractors", "access-scaffolding"],
    relatedPages: [
      { slug: "how-scaffolding-is-designed-and-erected", category: "guides", title: "How scaffolding is designed and erected" },
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
    ],
  },
  {
    slug: "what-to-expect-during-scaffolding-installation",
    title: "What to expect during scaffolding installation",
    metaDescription: "What happens when scaffolding is erected? What homeowners and contractors should expect during installation.",
    intro:
      "Most domestic scaffolding erections take one to two days. Your scaffolding contractor will arrive with a van and trailer or lorry, set up base plates or sole boards, and work upwards from the ground. Scaffolding is usually erected by a team of two to four operatives.",
    signs: [
      "The scaffolding team will need access to the property boundary and a clear loading area",
      "Neighbours may be notified if scaffolding crosses a boundary or is erected on public land",
      "A scaffold licence from the local council may be required if the scaffold extends onto the highway",
      "The erection is normally quiet work — no heavy machinery, just manual handling of tubes and boards",
      "The finished scaffold is tagged before being handed over for use",
      "You will receive a scaffold inspection record and handover certificate",
    ],
    diagnosis:
      "We handle all licence applications and neighbour liaison where required. We advise you in advance of any access requirements so you can prepare the site.",
    resolution:
      "Contact us before booking your tradesperson to allow time for the scaffold to be erected and tagged before works begin.",
    ctaText: "Planning a project? Discuss scaffolding timing with our team.",
    relatedServices: ["domestic-scaffolding", "scaffolding-contractors"],
    relatedPages: [
      { slug: "how-scaffolding-is-designed-and-erected", category: "guides", title: "How scaffolding is designed and erected" },
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
    ],
  },
];
