import type { InfoPageData } from "engine";

export const costsPages: InfoPageData[] = [
  // --- Commercial / high-intent pages (5) ---
  {
    slug: "how-much-does-scaffolding-cost",
    title: "How much does scaffolding cost in the UK",
    metaDescription: "Scaffolding costs UK — typical prices for domestic, commercial and specialist scaffolding explained.",
    intro:
      "Scaffolding costs in the UK vary widely depending on the structure size, height, complexity, duration, location and access requirements. A simple domestic scaffold for a standard two-storey house typically costs between £500 and £1,500. Larger commercial structures and specialist work such as chimney scaffolding or temporary roofing will cost more. This guide explains what drives scaffolding costs.",
    signs: [
      "Domestic house scaffold: typically £500–£1,500 depending on size",
      "Chimney scaffolding: typically £600–£1,500 depending on height and chimney type",
      "Roof scaffolding for re-roof: typically £700–£2,000 depending on area",
      "Commercial facade access: priced per m² of scaffold face — contact for a quote",
      "Temporary roofing: significant additional cost above scaffold — quoted per job",
      "Location affects pricing — inner-city access and congestion zones can increase costs",
    ],
    diagnosis:
      "The most accurate way to get a scaffolding price is to request a site survey and quote. We provide free, no-obligation quotes for all domestic and commercial scaffolding work.",
    resolution:
      "Contact us with your address, type of works and your tradesperson's requirements for a fast, accurate quote. We aim to provide same-day quotes for standard domestic scaffolding.",
    ctaText: "Get a free, no-obligation scaffolding quote from our team.",
    relatedServices: ["scaffolding-contractors", "domestic-scaffolding"],
    relatedPages: [
      { slug: "scaffolding-hire-pricing-guide", category: "costs", title: "Scaffolding hire pricing guide" },
      { slug: "cost-of-roof-scaffolding", category: "costs", title: "Cost of roof scaffolding" },
    ],
  },
  {
    slug: "scaffolding-hire-pricing-guide",
    title: "Scaffolding hire pricing guide",
    metaDescription: "How much does scaffold hire cost? Equipment hire rates and what's included in a scaffold hire package.",
    intro:
      "Scaffold equipment hire — where a contractor rents tubes, fittings, boards and standards to erect their own scaffolding — is priced per tonne of equipment per week. Hire packages are typically suitable only for qualified scaffolding contractors who supply their own CISRS-trained operatives. This guide covers typical hire rates and what's included.",
    signs: [
      "Tube and fitting hire: typically priced per tonne per week — contact for current rates",
      "System scaffold hire: typically priced per m² or per bay per week",
      "Delivery and collection charges apply — distance and access affect pricing",
      "Minimum hire periods typically apply — usually four to eight weeks",
      "Equipment is inspected, load-tested and compliant with BS standards",
      "Replacement components available during the hire period at additional cost",
    ],
    diagnosis:
      "We provide scaffold hire to qualified contractors on flexible terms. Contact us with your required quantities, hire duration and delivery location for a hire quote.",
    resolution:
      "We supply tube and fitting and system scaffold equipment for hire with delivery and collection. All equipment is inspected and certified before dispatch.",
    ctaText: "Need scaffold equipment for hire? Contact our hire team.",
    relatedServices: ["scaffolding-hire", "scaffolding-contractors"],
    relatedPages: [
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
      { slug: "scaffolding-hire-vs-full-service", category: "guides", title: "Scaffolding hire vs full service" },
    ],
  },
  {
    slug: "cost-of-roof-scaffolding",
    title: "Cost of roof scaffolding for extensions and repairs",
    metaDescription: "How much does roof scaffolding cost? Prices for extension roofs, re-roofs, flat roofs and chimney access.",
    intro:
      "Roof scaffolding costs depend on the roof area, pitch, height and the extent of edge protection required. A standard semi-detached house re-roof scaffold typically costs between £700 and £1,500, including erection, inspection, maintenance during works and strike. More complex roof profiles — particularly those with dormers, valleys and chimney stacks — cost more.",
    signs: [
      "Standard semi-detached re-roof scaffold: approximately £700–£1,500",
      "Detached house full perimeter: approximately £1,000–£2,500",
      "Chimney scaffold in addition: approximately £600–£1,200 depending on type",
      "Flat roof access scaffold: approximately £500–£1,000 depending on area",
      "Complex roofs with dormers and valleys: additional cost — quoted on survey",
      "Duration affects cost — longer programmes may be charged on weekly hire rates after the initial period",
    ],
    diagnosis:
      "We provide free roof scaffolding surveys and quotes. Contact us with your address and the roofer's requirements for an accurate price.",
    resolution:
      "We erect roof scaffolding to TG20, provide edge protection and loading platforms as required, and adapt the structure if the roofing scope changes during works.",
    ctaText: "Get a roof scaffolding quote — free, no obligation.",
    relatedServices: ["roof-scaffolding", "domestic-scaffolding"],
    relatedPages: [
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
      { slug: "when-chimney-scaffolding-is-needed", category: "safety", title: "When chimney scaffolding is needed" },
    ],
  },
  {
    slug: "commercial-scaffolding-costs",
    title: "Commercial scaffolding costs for maintenance contracts",
    metaDescription: "How much does commercial scaffolding cost? Pricing for maintenance contracts, facade access and industrial scaffolding.",
    intro:
      "Commercial scaffolding costs are typically quoted per job based on scaffold area, height, complexity, access restrictions and contract duration. For ongoing maintenance contracts, scaffolding may be priced as a monthly management fee plus erection and strike costs at the start and end of the contract.",
    signs: [
      "Commercial facade access is typically priced per m² of scaffold face",
      "Multi-storey structures, complex access and congestion zones increase costs",
      "Scaffold management fee applies for contracts where the scaffold is maintained over a long period",
      "Inspection costs are typically included in our commercial quotes",
      "Sheeting, debris netting and protective fans are additional to base scaffold cost",
      "Night working, weekend erection or restricted access windows affect pricing",
    ],
    diagnosis:
      "We provide commercial scaffolding surveys and estimates before committing to a fixed price. Contact us with your programme requirements and site address.",
    resolution:
      "We deliver commercial scaffolding to programme, with inspection management throughout and full documentation on completion. Contact us for a commercial scaffolding estimate.",
    ctaText: "Planning a commercial maintenance contract? Get a scaffolding estimate.",
    relatedServices: ["commercial-scaffolding", "scaffolding-contractors"],
    relatedPages: [
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
      { slug: "commercial-scaffold-access-for-maintenance", category: "guides", title: "Commercial scaffold access for maintenance" },
    ],
  },
  {
    slug: "emergency-scaffolding-callout-costs",
    title: "Emergency scaffolding callout costs",
    metaDescription: "How much does emergency scaffolding cost? Callout rates, out-of-hours pricing and insurance scaffolding explained.",
    intro:
      "Emergency scaffolding costs more than planned work due to out-of-hours mobilisation, rapid response requirements and the premium materials sometimes needed for temporary protection. Costs depend on the extent of the emergency, time of day, access and duration. For insurance claims, emergency scaffold costs are typically a recoverable expense.",
    signs: [
      "Standard business hours emergency: 20–40% premium over normal rates",
      "Out-of-hours (evenings, weekends, bank holidays): 50–100% premium",
      "Temporary protection boarding and sheeting: additional to scaffold cost",
      "Rapid mobilisation may require additional labour",
      "Insurance claims: cost schedule provided for loss adjuster review",
      "For major incidents, costs are typically covered under building insurance",
    ],
    diagnosis:
      "Call us directly for emergency scaffolding. We will mobilise as quickly as possible and provide a cost schedule for your insurer if required.",
    resolution:
      "We operate 24/7 emergency callout with rapid mobilisation. We work with insurers, loss adjusters and emergency contractors to get access in place safely and quickly.",
    ctaText: "Emergency scaffolding needed? Call us now — available 24/7.",
    relatedServices: ["emergency-scaffolding", "scaffolding-contractors"],
    relatedPages: [
      { slug: "scaffolding-for-insurance-funded-repairs", category: "safety", title: "Scaffolding for insurance-funded repairs" },
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
    ],
  },
  // --- Informational page (1) ---
  {
    slug: "factors-that-affect-scaffolding-costs",
    title: "Factors that affect scaffolding costs",
    metaDescription: "What makes scaffolding more expensive? Factors including height, complexity, duration and access explained.",
    intro:
      "Scaffolding costs are affected by many factors beyond the basic size of the structure. Understanding what drives cost helps you plan your budget more accurately and compare quotes from different contractors.",
    signs: [
      "Height: taller structures require more materials and more labour to erect safely",
      "Complexity: dormers, bays, chimneys and non-standard profiles add time and materials",
      "Duration: longer hire periods are typically charged on a weekly basis after the initial period",
      "Location: congestion zones, restricted access and city centre sites increase delivery costs",
      "Type: tube and fitting takes longer to erect than system scaffold — affects labour cost",
      "Protective measures: sheeting, netting, fans and hoarding all add to the base cost",
    ],
    diagnosis:
      "A site survey allows us to assess all the factors that affect cost for your specific project and provide an accurate fixed quote rather than an estimate.",
    resolution:
      "We provide free site surveys and fixed-price quotes for all scaffolding work. Contact us to arrange a survey.",
    ctaText: "Get a fixed-price scaffolding quote — free site survey included.",
    relatedServices: ["scaffolding-contractors", "domestic-scaffolding"],
    relatedPages: [
      { slug: "how-much-does-scaffolding-cost", category: "costs", title: "How much does scaffolding cost" },
      { slug: "cost-of-roof-scaffolding", category: "costs", title: "Cost of roof scaffolding" },
    ],
  },
];
