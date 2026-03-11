import type { HubData, InfoPageData } from "engine";
import { guidesPages } from "@/data/guides";

// Company info – used by config and layout
export const companyInfo = {
  name: "Mainline Groundworks",
  phone: "020 1234 5678",
  email: "info@mainlinegroundworks.co.uk",
  address: "123 Construction Way, London, SW1A 1AA",
  hours: "Mon–Fri 8am–6pm, Sat 9am–1pm",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
  },
};

// Services
export const services = [
  {
    id: "groundworks-contractors",
    slug: "groundworks-contractors",
    title: "Groundworks Contractors",
    titleSingular: "Groundworks Contractor",
    shortDescription: "Full-service groundworks for commercial and residential construction.",
    description: "We deliver complete groundworks packages including piling, excavation, site clearance, foundations and enabling works. From housing developments to commercial and industrial projects across the UK.",
    benefits: ["Single point of contact for all groundworks", "Programme-driven delivery", "Fully insured and accredited", "Experienced teams and plant", "Quality assured work"],
    process: ["Site assessment and design coordination", "Setting out and excavation", "Piling and foundations as required", "Drainage and services", "Reinstatement and handover"],
    icon: "Shovel",
  },
  {
    id: "piling-contractors",
    slug: "piling-contractors",
    title: "Piling Contractors",
    titleSingular: "Piling Contractor",
    shortDescription: "Driven, bored and sheet piling for buildings and structures.",
    description: "Professional piling services for new-build and refurbishment projects. We install driven piles, bored piles and sheet piles to support buildings, retaining walls and infrastructure.",
    benefits: ["Suitable for restricted access", "Minimal vibration options", "Load-tested and certified", "Fast installation", "UK-wide coverage"],
    process: ["Ground investigation review", "Piling design or design-and-build", "Setting out and installation", "Testing and certification", "Handover documentation"],
    icon: "Layers",
  },
  {
    id: "mini-piling-contractors",
    slug: "mini-piling-contractors",
    title: "Mini Piling Contractors",
    titleSingular: "Mini Piling Contractor",
    shortDescription: "Section piles and CFA mini piling for low headroom and tight sites.",
    description: "Mini piling is ideal where access is limited or headroom is low. We install section piles and CFA mini piles for extensions, basements and constrained sites.",
    benefits: ["Low headroom capability", "Minimal spoil", "Quick to install", "Suitable for domestic and commercial", "Reduced disruption"],
    process: ["Site survey and access check", "Pile design and layout", "Installation with mini piling rig", "Pile caps and ground beams", "Testing and records"],
    icon: "CircleDot",
  },
  {
    id: "excavation-contractors",
    slug: "excavation-contractors",
    title: "Excavation Contractors",
    titleSingular: "Excavation Contractor",
    shortDescription: "Bulk excavation, strip excavation and trenching for construction.",
    description: "We carry out bulk excavation, strip excavation and trenching for foundations, drainage and services. Machine and hand dig to programme with proper support and reinstatement.",
    benefits: ["Programme-led excavation", "Support and temporary works", "Spoil management", "Quality formation levels", "Safe working practices"],
    process: ["Setting out and levels", "Excavation to design", "Support and edge protection", "Formation preparation", "Backfill and compaction"],
    icon: "Mountain",
  },
  {
    id: "site-clearance-contractors",
    slug: "site-clearance-contractors",
    title: "Site Clearance Contractors",
    titleSingular: "Site Clearance Contractor",
    shortDescription: "Vegetation clearance, demolition and waste removal to prepare sites.",
    description: "We clear sites for development: vegetation, structures, hardstanding and arisings. Waste is removed and disposed of responsibly with documentation.",
    benefits: ["Full site strip capability", "Waste removed and recycled where possible", "Safe demolition and clearance", "Site ready for groundworks", "Documented disposal"],
    process: ["Site survey and scope", "Clearance and demolition", "Vegetation and topsoil strip", "Waste removal and tickets", "Handover of clear site"],
    icon: "TreePine",
  },
  {
    id: "foundation-contractors",
    slug: "foundation-contractors",
    title: "Foundation Contractors",
    titleSingular: "Foundation Contractor",
    shortDescription: "Strip, pad, raft and piled foundations for all building types.",
    description: "We design and build strip foundations, pad foundations, raft foundations and piled foundations for housing, commercial and industrial projects.",
    benefits: ["Design or design-and-build", "All foundation types", "Engineered solutions", "Programme certainty", "Quality and compliance"],
    process: ["Ground review and design", "Setting out and excavation", "Reinforcement and concrete", "Curing and protection", "Handover and as-built"],
    icon: "Building2",
  },
  {
    id: "concrete-foundations",
    slug: "concrete-foundations",
    title: "Concrete Foundations",
    titleSingular: "Concrete Foundation",
    shortDescription: "Reinforced and mass concrete foundations and ground beams.",
    description: "We supply and place reinforced concrete foundations, mass concrete, blinding and ground beams. All work to specification with testing and records.",
    benefits: ["Reinforced and mass concrete", "Blinding and ground beams", "Quality concrete supply", "Testing and cube records", "Smooth handover"],
    process: ["Formation preparation", "Reinforcement fixing", "Concrete order and pour", "Curing and protection", "Testing and documentation"],
    icon: "Box",
  },
  {
    id: "enabling-works-contractors",
    slug: "enabling-works-contractors",
    title: "Enabling Works Contractors",
    titleSingular: "Enabling Works Contractor",
    shortDescription: "Access roads, temporary drainage and site set-up before main works.",
    description: "Enabling works prepare the site for main construction: access roads, temporary drainage, fencing, hoardings and temporary services so the project can start on programme.",
    benefits: ["Site access and logistics", "Temporary drainage and services", "Fencing and security", "Early programme certainty", "Main contractor ready"],
    process: ["Site logistics plan", "Access and hardstanding", "Temporary drainage", "Fencing and hoardings", "Handover to main works"],
    icon: "HardHat",
  },
];

// Locations (shared UK list – same as other verticals)
export const locations = [
  { id: "london", name: "London", area: "Central London", lat: 51.5074, lng: -0.1278, nearbyTowns: ["Westminster", "Southwark", "Camden", "Islington"], propertyTypes: "Georgian terraces, Victorian conversions, modern apartments and commercial premises" },
  { id: "richmond", name: "Richmond", area: "South West London", lat: 51.4613, lng: -0.3037, nearbyTowns: ["Twickenham", "Kew", "Mortlake", "Petersham"], propertyTypes: "Georgian and Victorian houses, riverside properties, 1930s semis and modern developments" },
  { id: "birmingham", name: "Birmingham", area: "West Midlands", lat: 52.4862, lng: -1.8904, nearbyTowns: ["Solihull", "Sutton Coldfield", "Edgbaston", "Moseley"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern city apartments" },
  { id: "manchester", name: "Manchester", area: "Greater Manchester", lat: 53.4808, lng: -2.2426, nearbyTowns: ["Salford", "Stockport", "Trafford", "Didsbury"], propertyTypes: "Victorian terraces, converted warehouses, modern apartments and suburban semis" },
  { id: "leeds", name: "Leeds", area: "West Yorkshire", lat: 53.8008, lng: -1.5491, nearbyTowns: ["Headingley", "Roundhay", "Horsforth", "Pudsey"], propertyTypes: "Victorian back-to-backs, Edwardian semis, stone-built terraces and modern developments" },
  { id: "bristol", name: "Bristol", area: "Bristol", lat: 51.4545, lng: -2.5879, nearbyTowns: ["Clifton", "Redland", "Bedminster", "Fishponds"], propertyTypes: "Georgian terraces, Victorian houses, Edwardian villas and modern waterfront apartments" },
  { id: "reading", name: "Reading", area: "Berkshire", lat: 51.4543, lng: -0.9781, nearbyTowns: ["Caversham", "Woodley", "Tilehurst", "Earley"], propertyTypes: "Victorian terraces, Edwardian semis, modern apartments and commercial premises" },
  { id: "watford", name: "Watford", area: "Hertfordshire", lat: 51.6565, lng: -0.3903, nearbyTowns: ["Bushey", "Rickmansworth", "Abbots Langley", "Garston"], propertyTypes: "Victorian terraces, 1930s semis, modern town centre flats and detached houses" },
  { id: "st-albans", name: "St Albans", area: "Hertfordshire", lat: 51.7520, lng: -0.3366, nearbyTowns: ["Harpenden", "Hatfield", "London Colney", "Redbourn"], propertyTypes: "Georgian townhouses, Victorian villas, Edwardian semis and modern estates" },
  { id: "brighton", name: "Brighton", area: "East Sussex", lat: 50.8225, lng: -0.1372, nearbyTowns: ["Hove", "Portslade", "Rottingdean", "Shoreham"], propertyTypes: "Regency terraces, Victorian houses, Edwardian villas and modern flats" },
  { id: "sheffield", name: "Sheffield", area: "South Yorkshire", lat: 53.3811, lng: -1.4701, nearbyTowns: ["Rotherham", "Dronfield", "Chapeltown", "Hillsborough"], propertyTypes: "Victorian terraces, stone-built semis, post-war estates and modern apartments" },
  { id: "liverpool", name: "Liverpool", area: "Merseyside", lat: 53.4084, lng: -2.9916, nearbyTowns: ["Birkenhead", "Bootle", "Crosby", "Woolton"], propertyTypes: "Georgian terraces, Victorian houses, post-war estates and waterfront apartments" },
  { id: "newcastle", name: "Newcastle", area: "Tyne and Wear", lat: 54.9783, lng: -1.6178, nearbyTowns: ["Gateshead", "Jesmond", "Gosforth", "Whitley Bay"], propertyTypes: "Georgian terraces, Victorian flats, Edwardian houses and modern developments" },
  { id: "nottingham", name: "Nottingham", area: "Nottinghamshire", lat: 52.9548, lng: -1.1581, nearbyTowns: ["West Bridgford", "Beeston", "Arnold", "Hucknall"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern city apartments" },
  { id: "cambridge", name: "Cambridge", area: "Cambridgeshire", lat: 52.2053, lng: 0.1218, nearbyTowns: ["Trumpington", "Cherry Hinton", "Girton", "Histon"], propertyTypes: "Georgian townhouses, Victorian terraces, college properties and modern developments" },
  { id: "southampton", name: "Southampton", area: "Hampshire", lat: 50.9097, lng: -1.4044, nearbyTowns: ["Eastleigh", "Totton", "Romsey", "Hedge End"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern waterfront apartments" },
  { id: "croydon", name: "Croydon", area: "South London", lat: 51.3762, lng: -0.0982, nearbyTowns: ["Purley", "Thornton Heath", "South Norwood", "Addiscombe"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern apartments" },
  { id: "greenwich", name: "Greenwich", area: "South East London", lat: 51.4769, lng: -0.0005, nearbyTowns: ["Blackheath", "Woolwich", "Charlton", "Deptford"], propertyTypes: "Georgian terraces, Victorian conversions, riverside apartments and modern builds" },
  { id: "woking", name: "Woking", area: "Surrey", lat: 51.3162, lng: -0.5570, nearbyTowns: ["Byfleet", "Horsell", "Knaphill", "Pyrford"], propertyTypes: "Victorian terraces, 1930s semis, modern town centre apartments and detached houses" },
  { id: "guildford", name: "Guildford", area: "Surrey", lat: 51.2362, lng: -0.5704, nearbyTowns: ["Godalming", "Cranleigh", "Shalford", "Merrow"], propertyTypes: "Georgian townhouses, Victorian villas, period cottages and modern family homes" },
  { id: "oxford", name: "Oxford", area: "Oxfordshire", lat: 51.7520, lng: -1.2577, nearbyTowns: ["Headington", "Cowley", "Abingdon", "Kidlington"], propertyTypes: "Georgian townhouses, Victorian terraces, period colleges and modern developments" },
  { id: "milton-keynes", name: "Milton Keynes", area: "Buckinghamshire", lat: 52.0406, lng: -0.7594, nearbyTowns: ["Bletchley", "Wolverton", "Newport Pagnell", "Stony Stratford"], propertyTypes: "Modern grid-plan housing, new-build estates, converted farmhouses and apartments" },
  { id: "northampton", name: "Northampton", area: "Northamptonshire", lat: 52.2405, lng: -0.9027, nearbyTowns: ["Weston Favell", "Duston", "Kingsthorpe", "Moulton"], propertyTypes: "Victorian terraces, 1930s semis, shoe industry conversions and modern estates" },
  { id: "luton", name: "Luton", area: "Bedfordshire", lat: 51.8787, lng: -0.4200, nearbyTowns: ["Dunstable", "Harpenden", "Hitchin", "Leagrave"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern apartments" },
  { id: "chelmsford", name: "Chelmsford", area: "Essex", lat: 51.7356, lng: 0.4685, nearbyTowns: ["Writtle", "Broomfield", "Great Baddow", "Springfield"], propertyTypes: "Victorian terraces, 1930s semis, Edwardian houses and modern estates" },
  { id: "norwich", name: "Norwich", area: "Norfolk", lat: 52.6309, lng: 1.2974, nearbyTowns: ["Thorpe St Andrew", "Costessey", "Sprowston", "Eaton"], propertyTypes: "Medieval buildings, Georgian townhouses, Victorian terraces and modern developments" },
  { id: "exeter", name: "Exeter", area: "Devon", lat: 50.7184, lng: -3.5339, nearbyTowns: ["Topsham", "Heavitree", "Alphington", "Pinhoe"], propertyTypes: "Georgian terraces, Victorian villas, period cottages and modern developments" },
  { id: "plymouth", name: "Plymouth", area: "Devon", lat: 50.3755, lng: -4.1427, nearbyTowns: ["Plymstock", "Plympton", "Saltash", "Ivybridge"], propertyTypes: "Post-war rebuilds, Victorian terraces, naval housing and modern estates" },
  { id: "portsmouth", name: "Portsmouth", area: "Hampshire", lat: 50.8198, lng: -1.0880, nearbyTowns: ["Gosport", "Fareham", "Havant", "Southsea"], propertyTypes: "Victorian terraces, Edwardian houses, naval housing and modern apartments" },
  { id: "bournemouth", name: "Bournemouth", area: "Dorset", lat: 50.7192, lng: -1.8808, nearbyTowns: ["Poole", "Christchurch", "Ferndown", "Westbourne"], propertyTypes: "Victorian villas, Edwardian houses, 1930s bungalows and modern apartments" },
  { id: "swindon", name: "Swindon", area: "Wiltshire", lat: 51.5558, lng: -1.7797, nearbyTowns: ["Wroughton", "Highworth", "Stratton", "Old Town"], propertyTypes: "Victorian railway terraces, 1930s semis, modern estates and new-build developments" },
  { id: "bath", name: "Bath", area: "Somerset", lat: 51.3811, lng: -2.3590, nearbyTowns: ["Batheaston", "Combe Down", "Weston", "Larkhall"], propertyTypes: "Georgian townhouses, Victorian villas, period cottages and modern developments" },
  { id: "chiswick", name: "Chiswick", area: "West London", lat: 51.4927, lng: -0.2687, nearbyTowns: ["Acton", "Brentford", "Hammersmith", "Gunnersbury"], propertyTypes: "Edwardian terraces, 1930s semis, Victorian villas and modern flats" },
  { id: "wandsworth", name: "Wandsworth", area: "South London", lat: 51.4571, lng: -0.1818, nearbyTowns: ["Battersea", "Tooting", "Balham", "Clapham"], propertyTypes: "Victorian terraces, Edwardian semis, post-war estates and new-build apartments" },
  { id: "ealing", name: "Ealing", area: "West London", lat: 51.5130, lng: -0.3089, nearbyTowns: ["Acton", "Hanwell", "Northolt", "Greenford"], propertyTypes: "Edwardian houses, 1930s semis, Victorian villas and modern apartments" },
  { id: "harrow", name: "Harrow", area: "North West London", lat: 51.5898, lng: -0.3346, nearbyTowns: ["Pinner", "Stanmore", "Wealdstone", "Kenton"], propertyTypes: "1930s semis, Victorian terraces, Edwardian houses and modern flats" },
  { id: "bromley", name: "Bromley", area: "South East London", lat: 51.4039, lng: 0.0198, nearbyTowns: ["Beckenham", "Orpington", "Chislehurst", "Petts Wood"], propertyTypes: "Edwardian semis, 1930s detached, Victorian terraces and modern estates" },
  { id: "enfield", name: "Enfield", area: "North London", lat: 51.6538, lng: -0.0799, nearbyTowns: ["Southgate", "Winchmore Hill", "Palmers Green", "Edmonton"], propertyTypes: "1930s semis, Edwardian terraces, post-war estates and modern apartments" },
  { id: "barnet", name: "Barnet", area: "North London", lat: 51.6444, lng: -0.1997, nearbyTowns: ["Finchley", "Edgware", "Mill Hill", "Whetstone"], propertyTypes: "1930s semis, Victorian villas, Edwardian houses and modern developments" },
  { id: "slough", name: "Slough", area: "Berkshire", lat: 51.5105, lng: -0.5950, nearbyTowns: ["Langley", "Colnbrook", "Farnham Royal", "Iver"], propertyTypes: "1930s semis, post-war estates, modern apartments and commercial properties" },
  { id: "colchester", name: "Colchester", area: "Essex", lat: 51.8860, lng: 0.8920, nearbyTowns: ["Wivenhoe", "West Mersea", "Marks Tey", "Stanway"], propertyTypes: "Georgian townhouses, Victorian terraces, period cottages and modern estates" },
  { id: "southend", name: "Southend-on-Sea", area: "Essex", lat: 51.5459, lng: 0.7077, nearbyTowns: ["Westcliff", "Leigh-on-Sea", "Shoeburyness", "Prittlewell"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and seafront apartments" },
  { id: "canterbury", name: "Canterbury", area: "Kent", lat: 51.2802, lng: 1.0789, nearbyTowns: ["Whitstable", "Herne Bay", "Sturry", "Bridge"], propertyTypes: "Medieval and Georgian townhouses, Victorian terraces, period cottages and modern developments" },
  { id: "leicester", name: "Leicester", area: "Leicestershire", lat: 52.6369, lng: -1.1398, nearbyTowns: ["Oadby", "Wigston", "Birstall", "Glenfield"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and modern estates" },
  { id: "coventry", name: "Coventry", area: "West Midlands", lat: 52.4068, lng: -1.5197, nearbyTowns: ["Kenilworth", "Bedworth", "Tile Hill", "Earlsdon"], propertyTypes: "Post-war rebuilds, Victorian suburbs, modern estates and converted buildings" },
  { id: "derby", name: "Derby", area: "Derbyshire", lat: 52.9225, lng: -1.4746, nearbyTowns: ["Allestree", "Mickleover", "Spondon", "Littleover"], propertyTypes: "Victorian terraces, 1930s semis, Georgian townhouses and modern estates" },
  { id: "ipswich", name: "Ipswich", area: "Suffolk", lat: 52.0567, lng: 1.1482, nearbyTowns: ["Felixstowe", "Woodbridge", "Stowmarket", "Kesgrave"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and modern estates" },
  { id: "peterborough", name: "Peterborough", area: "Cambridgeshire", lat: 52.5695, lng: -0.2405, nearbyTowns: ["Yaxley", "Eye", "Whittlesey", "Stanground"], propertyTypes: "Victorian terraces, post-war estates, modern new-builds and converted properties" },
  { id: "worcester", name: "Worcester", area: "Worcestershire", lat: 52.1936, lng: -2.2216, nearbyTowns: ["Malvern", "Droitwich", "Pershore", "Upton"], propertyTypes: "Georgian townhouses, Victorian terraces, period cottages and modern estates" },
  { id: "gloucester", name: "Gloucester", area: "Gloucestershire", lat: 51.8642, lng: -2.2382, nearbyTowns: ["Cheltenham", "Tewkesbury", "Stroud", "Quedgeley"], propertyTypes: "Medieval buildings, Georgian terraces, Victorian houses and modern estates" },
  { id: "winchester", name: "Winchester", area: "Hampshire", lat: 51.0632, lng: -1.3080, nearbyTowns: ["Kings Worthy", "Littleton", "Twyford", "Chandlers Ford"], propertyTypes: "Medieval buildings, Georgian townhouses, Victorian villas and modern family homes" },
  { id: "basingstoke", name: "Basingstoke", area: "Hampshire", lat: 51.2667, lng: -1.0876, nearbyTowns: ["Tadley", "Overton", "Hook", "Old Basing"], propertyTypes: "1960s new town housing, Victorian cottages, modern estates and business parks" },
  { id: "maidenhead", name: "Maidenhead", area: "Berkshire", lat: 51.5218, lng: -0.7176, nearbyTowns: ["Cookham", "Marlow", "Taplow", "Bray"], propertyTypes: "Victorian villas, Edwardian houses, 1930s semis and modern riverside apartments" },
  { id: "high-wycombe", name: "High Wycombe", area: "Buckinghamshire", lat: 51.6292, lng: -0.7482, nearbyTowns: ["Beaconsfield", "Marlow", "Hazlemere", "Hughenden Valley"], propertyTypes: "Victorian terraces, 1930s semis, period cottages and modern estates" },
  { id: "hemel-hempstead", name: "Hemel Hempstead", area: "Hertfordshire", lat: 51.7526, lng: -0.4692, nearbyTowns: ["Berkhamsted", "Kings Langley", "Bovingdon", "Leverstock Green"], propertyTypes: "1950s new town housing, Victorian cottages, modern estates and converted properties" },
  { id: "bishops-stortford", name: "Bishops Stortford", area: "Hertfordshire", lat: 51.8720, lng: 0.1607, nearbyTowns: ["Sawbridgeworth", "Much Hadham", "Stansted Mountfitchet", "Thorley"], propertyTypes: "Georgian market town houses, Victorian terraces, modern estates and converted properties" },
];

// Hub: guides only
export const hubPages: HubData[] = [
  {
    category: "guides",
    basePath: "/guides",
    title: "Groundworks Guides",
    subtitle: "Costs, processes and advice for piling, foundations, excavation and site preparation.",
    metaDescription:
      "Expert guides on piling costs, foundation types, excavation, site clearance and enabling works. UK groundworks advice from Mainline Groundworks.",
  },
];

export const getCategoryPages = (category: string): InfoPageData[] => {
  if (category === "guides") return guidesPages;
  return [];
};

export const getHubData = (category: string): HubData | undefined => {
  return hubPages.find((h) => h.category === category);
};

export const stats: { value: string; label: string }[] = [
  { value: "500+", label: "Projects Completed" },
  { value: "25+", label: "Years Experience" },
  { value: "UK-wide", label: "Coverage" },
  { value: "100%", label: "Client Focus" },
];

export const testimonials: { quote: string; author: string; role: string; company: string }[] = [
  { quote: "Mainline Groundworks delivered our piling and foundations on programme. Professional and easy to work with.", author: "David M.", role: "Project Manager", company: "Birmingham" },
  { quote: "Site clearance and enabling works were completed ahead of schedule. We use them on every project now.", author: "Sarah L.", role: "Developer", company: "Manchester" },
  { quote: "Mini piling in a tight access site — no issues. Clear communication and proper certification.", author: "James K.", role: "Contractor", company: "Leeds" },
];

export const faqs: { question: string; answer: string }[] = [
  { question: "What groundworks services do you offer?", answer: "We offer piling (including mini piling), excavation, site clearance, foundations, concrete foundations and enabling works for commercial and residential projects across the UK." },
  { question: "Do you work on housing developments?", answer: "Yes. We deliver groundworks packages for housing developments including site clearance, excavation, piling, strip and raft foundations, and drainage." },
  { question: "How do I get a quote?", answer: "Contact us with your site address, project type and any drawings or specifications. We will arrange a site visit and provide a detailed quote." },
  { question: "What areas do you cover?", answer: "We operate across the UK including London, Birmingham, Manchester, Leeds, Bristol and many other towns and cities. Contact us to confirm coverage for your area." },
  { question: "Do you need a survey before groundworks?", answer: "Many projects benefit from a topographical or utility survey before groundworks to map the site and avoid clashes. We can work with your surveyor or recommend one." },
];

export const blogPosts: Array<{ id: string; title: string; excerpt: string; date: string; image: string; imagePrompt?: string; category: string }> = [];

export const whyChooseUs: { title: string; description: string; icon: string }[] = [
  { title: "Experienced Teams", description: "Qualified operatives and modern plant for piling, excavation and foundations across the UK.", icon: "Users" },
  { title: "Programme Led", description: "We work to your programme with clear planning and communication from start to finish.", icon: "Calendar" },
  { title: "Fully Insured", description: "Comprehensive insurance and accreditation so your project is in safe hands.", icon: "Shield" },
  { title: "Quality Assured", description: "Testing, certification and handover documentation for every project.", icon: "CheckCircle" },
];

function buildRelatedGuideLinksByService(): Record<string, { slug: string; path: string; title: string }[]> {
  const map: Record<string, { slug: string; path: string; title: string }[]> = {};
  const serviceToGuides: Record<string, string[]> = {
    "groundworks-contractors": ["groundworks-process", "construction-site-preparation", "what-are-enabling-works"],
    "piling-contractors": ["piling-cost", "types-of-piling", "when-is-piling-required"],
    "mini-piling-contractors": ["mini-piling-cost", "types-of-piling", "when-is-piling-required"],
    "excavation-contractors": ["excavation-cost", "groundworks-process"],
    "site-clearance-contractors": ["site-clearance-cost", "construction-site-preparation"],
    "foundation-contractors": ["foundation-cost", "groundworks-process", "concrete-foundations-cost"],
    "concrete-foundations": ["concrete-foundations-cost", "foundation-cost"],
    "enabling-works-contractors": ["what-are-enabling-works", "construction-site-preparation"],
  };
  for (const [slug, guideSlugs] of Object.entries(serviceToGuides)) {
    map[slug] = guideSlugs
      .filter((s) => guidesPages.some((g) => g.slug === s))
      .map((s) => {
        const g = guidesPages.find((p) => p.slug === s);
        return g ? { slug: g.slug, path: `/guides/${g.slug}`, title: g.title } : null;
      })
      .filter((x): x is { slug: string; path: string; title: string } => x !== null);
  }
  return map;
}

export const relatedGuideLinksByService = buildRelatedGuideLinksByService();

export const serviceFaqsBySlug: Record<string, { question: string; answer: string }[]> = {
  "groundworks-contractors": [
    { question: "What is included in a groundworks package?", answer: "A full groundworks package typically includes site clearance, excavation, piling or foundations, drainage and enabling works such as access and temporary services. We tailor the scope to your project." },
  ],
  "piling-contractors": [
    { question: "When is piling required?", answer: "Piling is required when the ground cannot support conventional strip or pad foundations — for example on made ground, soft soils or where loads are high. A structural engineer will specify piling from the ground investigation." },
  ],
  "mini-piling-contractors": [
    { question: "What is mini piling?", answer: "Mini piling uses smaller rigs and section or CFA piles, ideal for low headroom, tight access or domestic projects. It provides the same load-bearing function as conventional piling where space is limited." },
  ],
  "excavation-contractors": [
    { question: "How deep can you excavate?", answer: "We carry out excavation to the depths required by your design, with appropriate support and edge protection. Bulk, strip and trench excavation are all within our capability." },
  ],
  "site-clearance-contractors": [
    { question: "Do you remove trees?", answer: "We can clear vegetation and remove trees as part of site clearance where required, subject to any tree preservation orders or planning conditions. We advise checking with your planning consultant first." },
  ],
  "foundation-contractors": [
    { question: "What types of foundations do you build?", answer: "We build strip foundations, pad foundations, raft foundations and piled foundations. The type is determined by the structural engineer and ground conditions." },
  ],
  "concrete-foundations": [
    { question: "Do you supply concrete?", answer: "Yes. We arrange quality-assured concrete supply and place reinforced and mass concrete for foundations, ground beams and blinding." },
  ],
  "enabling-works-contractors": [
    { question: "What are enabling works?", answer: "Enabling works prepare the site for main construction: access roads, temporary drainage, fencing, hoardings and temporary services so that the main contractor can start on programme." },
  ],
};

export const guidesIndexFeatured: { title: string; description: string; href: string; iconKey: "BookOpen" | "HelpCircle" }[] = [
  { title: "Piling cost guide", description: "What affects piling costs and how to budget.", href: "/guides/piling-cost", iconKey: "BookOpen" },
  { title: "Foundation costs", description: "Strip, pad, raft and piled foundation costs.", href: "/guides/foundation-cost", iconKey: "BookOpen" },
  { title: "Groundworks process", description: "How a typical groundworks project runs.", href: "/guides/groundworks-process", iconKey: "HelpCircle" },
];

export const guidesIndexNearMe: { title: string; href: string }[] = locations.slice(0, 8).map((loc) => ({
  title: `Groundworks in ${loc.name}`,
  href: `/groundworks-contractors/${loc.id}`,
}));

export const categoryAltText: Record<string, string> = {
  guides: "Groundworks guides and cost advice",
};

export const categoryImages: Record<string, string> = { guides: "groundworks-contractors" };
