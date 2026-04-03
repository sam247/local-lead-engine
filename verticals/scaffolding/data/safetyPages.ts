import type { InfoPageData } from "engine";

export const safetyPages: InfoPageData[] = [
  // --- Commercial / high-intent pages (3) ---
  {
    slug: "when-chimney-scaffolding-is-needed",
    title: "When chimney scaffolding is needed and what it involves",
    metaDescription: "When do you need chimney scaffolding? Repointing, flaunching, pot replacement and chimney rebuilds — what's required.",
    intro:
      "Chimney scaffolding is a specialist requirement. Most chimney repair and maintenance work — repointing, flaunching, lead flashing repairs, pot and cowl replacement, liner installation — cannot be done safely from a ladder. You need a purpose-built scaffold that gives a stable working platform at chimney-head height without overloading the roof.",
    signs: [
      "Chimney repointing requires a stable platform at the chimney head — not a ladder",
      "Flaunching repair or replacement needs hands-free access around the chimney",
      "Lead flashing and soaker replacement requires multiple positions around the stack",
      "Pot and cowl replacement requires the ability to lift and manoeuvre heavy components",
      "Full chimney rebuilds require a platform capable of supporting bricklaying loads",
      "Building insurers may require scaffold inspection records before approving repair claims",
    ],
    diagnosis:
      "We survey the chimney, roof pitch, stack height and roof structure to design a chimney scaffold that provides safe access without damaging roof tiles or overloading the roof construction.",
    resolution:
      "We erect chimney scaffolding suitable for all chimney types — single stacks, multiple stacks, breast and shared party-wall stacks. We work alongside your chosen chimney contractor and provide full inspection documentation.",
    ctaText: "Need chimney scaffolding? Get a quote from our team.",
    relatedServices: ["chimney-scaffolding", "roof-scaffolding"],
    relatedPages: [
      { slug: "cost-of-roof-scaffolding", category: "costs", title: "Cost of roof scaffolding" },
      { slug: "scaffold-inspection-requirements", category: "safety", title: "Scaffold inspection requirements" },
    ],
  },
  {
    slug: "temporary-roofing-during-roof-repairs",
    title: "Temporary roofing during roof repairs — when scaffolding is required",
    metaDescription: "When do you need a temporary roof during roof works? What temporary roofing involves and when it's required.",
    intro:
      "Temporary roofing is a structural cover erected over an existing building to provide weathertight protection while the permanent roof is stripped, repaired or replaced. It is required when major roof works will leave the building exposed for more than a day or two — particularly for full re-roofs, structural rafter repairs and large areas of weatherproofing.",
    signs: [
      "Full strip and re-roof leaves the building completely exposed to weather",
      "Structural rafter or purlin work requires the roof covering to be removed for weeks",
      "Insurance may require a temporary roof where the permanent roof cannot be made watertight quickly",
      "Buildings in exposed locations or with historic or valuable contents need temporary roofing",
      "Occupied buildings where any rain ingress would cause disruption need temporary roofing",
    ],
    diagnosis:
      "We assess the roof structure, span, pitch and loading requirements to design a temporary roof system that provides full weather protection and allows works to proceed below.",
    resolution:
      "We design and install integrated scaffold and temporary roof packages — from simple plastic sheeting on a lightweight scaffold to structural aluminium temporary roofs for large commercial buildings.",
    ctaText: "Roof works planned? Ask about our temporary roofing service.",
    relatedServices: ["temporary-roofing", "roof-scaffolding"],
    relatedPages: [
      { slug: "when-chimney-scaffolding-is-needed", category: "safety", title: "When chimney scaffolding is needed" },
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
    ],
  },
  {
    slug: "scaffolding-for-insurance-funded-repairs",
    title: "Scaffolding for insurance-funded and insurance-backed repairs",
    metaDescription: "How scaffolding works for insurance claims — what insurers require, who arranges it and what documentation is needed.",
    intro:
      "When scaffolding is required as part of an insurance claim — following storm damage, a fall, structural movement or fire — the insurer's loss adjuster will typically assess the access requirements and agree costs. Getting the right scaffold in place quickly, with proper documentation, helps move the claim forward.",
    signs: [
      "Storm damage to the roof, chimney or facade often requires emergency scaffolding within hours",
      "Loss adjusters typically require a scaffold inspection record and certificate before approving access",
      "Insurers may specify NASC accredited contractors for insurance-backed works",
      "The scaffold cost is usually a separate line item in the insurance settlement",
      "Temporary protection (boards, sheeting) may also be required alongside the scaffold",
    ],
    diagnosis:
      "We work directly with insurers, loss adjusters and emergency contractors on insurance-backed scaffold requirements. We provide emergency callout, rapid mobilisation, and the documentation your insurer needs.",
    resolution:
      "Contact us directly or ask your loss adjuster to contact us. We provide rapid-response scaffolding, full inspection records and clear cost schedules for insurance purposes.",
    ctaText: "Insurance claim scaffolding? Contact us for rapid response.",
    relatedServices: ["emergency-scaffolding", "scaffolding-contractors"],
    relatedPages: [
      { slug: "when-chimney-scaffolding-is-needed", category: "safety", title: "When chimney scaffolding is needed" },
      { slug: "emergency-scaffolding-callout-costs", category: "costs", title: "Emergency scaffolding callout costs" },
    ],
  },
  // --- Informational pages (3) ---
  {
    slug: "scaffolding-safety-standards-tg20",
    title: "Scaffolding safety standards and TG20",
    metaDescription: "What is TG20? Scaffolding safety standards explained — NASC guidance, TG20 compliance and what it means for your project.",
    intro:
      "TG20 is the NASC technical guidance document for tube and fitting scaffolding in the UK. It provides standards for scaffold design, erection and inspection, and is used by the Health and Safety Executive as a benchmark for scaffolding safety. All scaffolding erected by NASC members is expected to comply with TG20.",
    signs: [
      "TG20 defines standards for scaffold design, loading, tie patterns and edge protection",
      "Scaffold structures that follow TG20 are considered compliant with current HSE guidance",
      "TG20 compliance is required by most main contractors and building control bodies",
      "A TG20 compliance declaration can be provided for standard configurations",
      "Non-standard structures require a bespoke design by a qualified scaffolding designer",
    ],
    diagnosis:
      "We design all our scaffolding structures to TG20 where applicable. For non-standard structures, we commission a bespoke engineering design.",
    resolution:
      "We provide TG20 compliance declarations for standard configurations and engineering-designed drawings for complex structures. All work is documented and certified.",
    ctaText: "Need TG20-compliant scaffolding? Contact us.",
    relatedServices: ["scaffolding-contractors", "commercial-scaffolding"],
    relatedPages: [
      { slug: "scaffold-inspection-requirements", category: "safety", title: "Scaffold inspection requirements" },
      { slug: "choosing-a-scaffolding-contractor", category: "guides", title: "Choosing a scaffolding contractor" },
    ],
  },
  {
    slug: "working-at-height-regulations",
    title: "Working at height regulations for scaffolding",
    metaDescription: "Work at Height Regulations 2005 and scaffolding — what employers and contractors need to know.",
    intro:
      "The Work at Height Regulations 2005 require all work at height to be properly planned, supervised and carried out by competent people. Where work at height cannot be avoided, suitable equipment must be provided and used correctly. For most construction and maintenance tasks, scaffolding is the most appropriate collective protection measure.",
    signs: [
      "Employers and the self-employed must plan work at height and ensure it is carried out safely",
      "The hierarchy of control requires collective protection (e.g. scaffolding) before personal protection (e.g. harnesses)",
      "Scaffolding must be erected, inspected and maintained by competent persons",
      "Inspection records must be kept and available for inspection",
      "Falls from height remain the most common cause of fatal injuries in construction",
    ],
    diagnosis:
      "For any work at height, your principal contractor or H&S advisor should confirm the required access equipment and inspection regime before work starts.",
    resolution:
      "We provide scaffolding designed and erected to comply with the Work at Height Regulations, with all required inspection records and documentation.",
    ctaText: "Need scaffolding that meets Work at Height Regulations? Contact us.",
    relatedServices: ["scaffolding-contractors", "domestic-scaffolding"],
    relatedPages: [
      { slug: "scaffolding-safety-standards-tg20", category: "safety", title: "Scaffolding safety standards and TG20" },
      { slug: "when-is-scaffolding-required-by-regulation", category: "guides", title: "When is scaffolding required by regulation" },
    ],
  },
  {
    slug: "scaffold-inspection-requirements",
    title: "Scaffold inspection requirements and frequency",
    metaDescription: "How often does scaffolding need to be inspected? Scaffold inspection requirements under the Work at Height Regulations.",
    intro:
      "The Work at Height Regulations 2005 require scaffolding to be inspected before first use, after any event that may have affected its stability (such as severe weather), and at intervals of no more than seven days. Inspection must be carried out by a competent person, and records must be kept.",
    signs: [
      "Pre-use inspection required before the scaffold is first used",
      "Re-inspection required after any event that may have affected stability",
      "Maximum seven-day interval between inspections for any scaffold in use",
      "Inspection by a competent person — typically a Scaffolding Advanced TG20 trained scaffolder",
      "Written inspection report must be kept and available for inspection",
      "Scaffold tags must be updated to reflect the current inspection status",
    ],
    diagnosis:
      "We provide pre-use inspection and regular inspection as part of our scaffolding service, and can provide a managed inspection schedule for longer-term scaffold structures.",
    resolution:
      "All our scaffolding is inspected before handover, tagged with the inspection date and re-inspected at the required intervals. Inspection records are provided throughout the project.",
    ctaText: "Need a managed scaffold inspection service? Contact us.",
    relatedServices: ["scaffolding-contractors", "commercial-scaffolding"],
    relatedPages: [
      { slug: "scaffolding-safety-standards-tg20", category: "safety", title: "Scaffolding safety standards and TG20" },
      { slug: "working-at-height-regulations", category: "safety", title: "Working at height regulations" },
    ],
  },
];
