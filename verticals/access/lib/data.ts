import type { HubData, InfoPageData } from "engine";

// Services data
export const services = [
  {
    id: "access-control-systems",
    slug: "access-control-systems",
    title: "Access Control Systems",
    titleSingular: "Access Control System",
    shortDescription: "Professional access control design, installation and maintenance for commercial and public-sector sites.",
    description: "We design and install access control systems for offices, hospitals, data centres, warehouses and commercial buildings. From door entry and keypads to biometrics and integrated building management, we deliver solutions that secure premises and streamline access for staff and visitors.",
    benefits: [
      "Tailored to your site and risk profile",
      "Integration with CCTV and alarm systems",
      "Audit trails and reporting",
      "Scalable for multi-site and future expansion",
      "Ongoing support and maintenance"
    ],
    process: [
      "Site survey and requirements review",
      "System design and specification",
      "Installation and commissioning",
      "Staff training and handover",
      "Ongoing maintenance and support"
    ],
    icon: "Lock"
  },
  {
    id: "commercial-cctv-installation",
    slug: "commercial-cctv-installation",
    title: "Commercial CCTV Installation",
    titleSingular: "Commercial CCTV Installation",
    shortDescription: "HD and IP CCTV systems for monitoring, evidence and remote viewing.",
    description: "Our commercial CCTV installation service covers HD and IP camera systems for retail, offices, industrial sites and public buildings. We specify, install and maintain systems that meet your surveillance needs and comply with relevant standards.",
    benefits: [
      "HD and 4K options with remote viewing",
      "Recording, playback and export for evidence",
      "Integration with access control",
      "Indoor and outdoor coverage",
      "Maintenance and upgrades"
    ],
    process: [
      "Site survey and camera placement design",
      "Equipment selection and quote",
      "Installation and cabling",
      "Configuration and remote access setup",
      "Training and documentation"
    ],
    icon: "Camera"
  },
  {
    id: "ip-camera-systems",
    slug: "ip-camera-systems",
    title: "IP Camera Systems",
    titleSingular: "IP Camera System",
    shortDescription: "Network-based IP camera systems for scalable, high-quality surveillance.",
    description: "IP camera systems provide high-resolution video over your network with flexible recording, analytics and integration options. We design and install IP-based systems for single sites and multi-site estates.",
    benefits: [
      "High resolution and scalability",
      "Network-based recording and storage",
      "Integration with VMS and access control",
      "Remote viewing and management",
      "Future-proof and expandable"
    ],
    process: [
      "Network and bandwidth assessment",
      "Camera and NVR/VMS specification",
      "Installation and network configuration",
      "Recording and retention setup",
      "Handover and support"
    ],
    icon: "Video"
  },
  {
    id: "perimeter-security-systems",
    slug: "perimeter-security-systems",
    title: "Perimeter Security Systems",
    titleSingular: "Perimeter Security System",
    shortDescription: "Perimeter intrusion detection and surveillance for boundaries and outdoor areas.",
    description: "We design and install perimeter security systems including PIR, beam detection, fence sensors and CCTV for boundaries, yards and external areas. Ideal for data centres, warehouses, hospitals and commercial sites.",
    benefits: [
      "Early detection of intrusion",
      "Reduced false alarms with smart detection",
      "Integration with CCTV and access control",
      "Suitable for harsh outdoor environments",
      "Compliance with site requirements"
    ],
    process: [
      "Perimeter survey and risk assessment",
      "Detection and camera specification",
      "Installation and commissioning",
      "Integration with control room or VMS",
      "Testing and handover"
    ],
    icon: "Shield"
  },
  {
    id: "security-system-integration",
    slug: "security-system-integration",
    title: "Security System Integration",
    titleSingular: "Security System Integration",
    shortDescription: "Unified security platforms linking access, CCTV, alarms and monitoring.",
    description: "We integrate access control, CCTV, intruder alarms and monitoring into a single platform where appropriate. Integration improves visibility, reduces response times and simplifies management for facilities and security teams.",
    benefits: [
      "Single platform for access, CCTV and alarms",
      "Unified reporting and audit trails",
      "Faster response to incidents",
      "Easier management and training",
      "Scalable and upgradeable"
    ],
    process: [
      "Audit of existing systems",
      "Integration design and specification",
      "Installation and configuration",
      "Testing and commissioning",
      "Training and documentation"
    ],
    icon: "Network"
  }
];

// Locations data
export const locations = [
  { id: "london", name: "London", area: "Central London", lat: 51.5074, lng: -0.1278, nearbyTowns: ["Westminster", "Southwark", "Camden", "Islington"], propertyTypes: "Georgian terraces, Victorian conversions, modern apartments and commercial premises" },
  { id: "richmond", name: "Richmond", area: "South West London", lat: 51.4613, lng: -0.3037, nearbyTowns: ["Twickenham", "Kew", "Mortlake", "Petersham"], propertyTypes: "Georgian and Victorian houses, riverside properties, 1930s semis and modern developments" },
  { id: "chiswick", name: "Chiswick", area: "West London", lat: 51.4927, lng: -0.2687, nearbyTowns: ["Acton", "Brentford", "Hammersmith", "Gunnersbury"], propertyTypes: "Edwardian terraces, 1930s semis, Victorian villas and modern flats" },
  { id: "wimbledon", name: "Wimbledon", area: "South West London", lat: 51.4214, lng: -0.2064, nearbyTowns: ["Merton", "Raynes Park", "Colliers Wood", "Southfields"], propertyTypes: "Victorian and Edwardian houses, 1930s semis, modern apartments" },
  { id: "kingston", name: "Kingston", area: "South West London", lat: 51.4085, lng: -0.3064, nearbyTowns: ["Surbiton", "New Malden", "Hampton Wick", "Norbiton"], propertyTypes: "Victorian terraces, post-war estates, riverside apartments and commercial properties" },
  { id: "fulham", name: "Fulham", area: "West London", lat: 51.4828, lng: -0.1950, nearbyTowns: ["Parsons Green", "Putney Bridge", "Chelsea", "Hammersmith"], propertyTypes: "Victorian terraces, Edwardian houses, mansion flats and modern conversions" },
  { id: "hammersmith", name: "Hammersmith", area: "West London", lat: 51.4928, lng: -0.2229, nearbyTowns: ["Shepherd's Bush", "Ravenscourt Park", "Fulham", "Chiswick"], propertyTypes: "Victorian terraces, post-war flats, modern riverside developments" },
  { id: "ealing", name: "Ealing", area: "West London", lat: 51.5130, lng: -0.3089, nearbyTowns: ["Acton", "Hanwell", "Northolt", "Greenford"], propertyTypes: "Edwardian houses, 1930s semis, Victorian villas and modern apartments" },
  { id: "kensington", name: "Kensington", area: "Central London", lat: 51.4990, lng: -0.1987, nearbyTowns: ["Notting Hill", "Earl's Court", "Holland Park", "Chelsea"], propertyTypes: "Georgian and Victorian townhouses, mansion flats, period conversions" },
  { id: "chelsea", name: "Chelsea", area: "Central London", lat: 51.4875, lng: -0.1687, nearbyTowns: ["Fulham", "Kensington", "Pimlico", "Battersea"], propertyTypes: "Georgian terraces, Victorian townhouses, luxury apartments and mews houses" },
  { id: "wandsworth", name: "Wandsworth", area: "South London", lat: 51.4571, lng: -0.1818, nearbyTowns: ["Battersea", "Tooting", "Balham", "Clapham"], propertyTypes: "Victorian terraces, Edwardian semis, post-war estates and new-build apartments" },
  { id: "putney", name: "Putney", area: "South West London", lat: 51.4610, lng: -0.2154, nearbyTowns: ["Wandsworth", "Barnes", "Fulham", "Roehampton"], propertyTypes: "Edwardian houses, Victorian terraces, 1930s semis and modern flats" },
  { id: "barnes", name: "Barnes", area: "South West London", lat: 51.4680, lng: -0.2452, nearbyTowns: ["Mortlake", "Putney", "Hammersmith", "Chiswick"], propertyTypes: "Georgian cottages, Victorian villas, Edwardian houses and riverside properties" },
  { id: "twickenham", name: "Twickenham", area: "South West London", lat: 51.4491, lng: -0.3370, nearbyTowns: ["St Margarets", "Whitton", "Teddington", "Richmond"], propertyTypes: "Edwardian terraces, 1930s semis, Victorian houses and modern developments" },
  { id: "isleworth", name: "Isleworth", area: "West London", lat: 51.4731, lng: -0.3254, nearbyTowns: ["Hounslow", "Brentford", "Twickenham", "Osterley"], propertyTypes: "Victorian terraces, 1930s semis, post-war houses and modern apartments" },
  // Expanded locations
  { id: "croydon", name: "Croydon", area: "South London", lat: 51.3762, lng: -0.0982, nearbyTowns: ["Purley", "Thornton Heath", "South Norwood", "Addiscombe"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern apartments" },
  { id: "bromley", name: "Bromley", area: "South East London", lat: 51.4039, lng: 0.0198, nearbyTowns: ["Beckenham", "Orpington", "Chislehurst", "Petts Wood"], propertyTypes: "Edwardian semis, 1930s detached, Victorian terraces and modern estates" },
  { id: "greenwich", name: "Greenwich", area: "South East London", lat: 51.4769, lng: -0.0005, nearbyTowns: ["Blackheath", "Woolwich", "Charlton", "Deptford"], propertyTypes: "Georgian terraces, Victorian conversions, riverside apartments and modern builds" },
  { id: "lewisham", name: "Lewisham", area: "South East London", lat: 51.4415, lng: -0.0117, nearbyTowns: ["Catford", "Brockley", "Hither Green", "Lee"], propertyTypes: "Victorian terraces, Edwardian semis, post-war flats and modern developments" },
  { id: "sutton", name: "Sutton", area: "South London", lat: 51.3618, lng: -0.1945, nearbyTowns: ["Cheam", "Carshalton", "Wallington", "Belmont"], propertyTypes: "1930s semis, Victorian terraces, post-war estates and modern apartments" },
  { id: "hounslow", name: "Hounslow", area: "West London", lat: 51.4668, lng: -0.3614, nearbyTowns: ["Heston", "Cranford", "Feltham", "Whitton"], propertyTypes: "1930s semis, Victorian terraces, post-war houses and modern flats" },
  { id: "brentford", name: "Brentford", area: "West London", lat: 51.4872, lng: -0.3089, nearbyTowns: ["Isleworth", "Chiswick", "Kew", "Gunnersbury"], propertyTypes: "Victorian terraces, modern riverside apartments, warehouse conversions" },
  { id: "teddington", name: "Teddington", area: "South West London", lat: 51.4249, lng: -0.3326, nearbyTowns: ["Hampton Wick", "Twickenham", "Kingston", "Bushy Park"], propertyTypes: "Edwardian houses, Victorian cottages, 1930s semis and modern family homes" },
  { id: "surbiton", name: "Surbiton", area: "South West London", lat: 51.3940, lng: -0.3040, nearbyTowns: ["Kingston", "Tolworth", "Long Ditton", "Thames Ditton"], propertyTypes: "Victorian terraces, 1930s semis, Art Deco flats and modern apartments" },
  { id: "epsom", name: "Epsom", area: "Surrey", lat: 51.3360, lng: -0.2685, nearbyTowns: ["Ewell", "Ashtead", "Leatherhead", "Banstead"], propertyTypes: "Edwardian houses, 1930s semis, Victorian villas and modern estates" },
  { id: "woking", name: "Woking", area: "Surrey", lat: 51.3162, lng: -0.5570, nearbyTowns: ["Byfleet", "Horsell", "Knaphill", "Pyrford"], propertyTypes: "Victorian terraces, 1930s semis, modern town centre apartments and detached houses" },
  { id: "guildford", name: "Guildford", area: "Surrey", lat: 51.2362, lng: -0.5704, nearbyTowns: ["Godalming", "Cranleigh", "Shalford", "Merrow"], propertyTypes: "Georgian townhouses, Victorian villas, period cottages and modern family homes" },
  { id: "reading", name: "Reading", area: "Berkshire", lat: 51.4543, lng: -0.9781, nearbyTowns: ["Caversham", "Woodley", "Tilehurst", "Earley"], propertyTypes: "Victorian terraces, Edwardian semis, modern apartments and commercial premises" },
  { id: "slough", name: "Slough", area: "Berkshire", lat: 51.5105, lng: -0.5950, nearbyTowns: ["Langley", "Colnbrook", "Farnham Royal", "Iver"], propertyTypes: "1930s semis, post-war estates, modern apartments and commercial properties" },
  { id: "watford", name: "Watford", area: "Hertfordshire", lat: 51.6565, lng: -0.3903, nearbyTowns: ["Bushey", "Rickmansworth", "Abbots Langley", "Garston"], propertyTypes: "Victorian terraces, 1930s semis, modern town centre flats and detached houses" },
  { id: "st-albans", name: "St Albans", area: "Hertfordshire", lat: 51.7520, lng: -0.3366, nearbyTowns: ["Harpenden", "Hatfield", "London Colney", "Redbourn"], propertyTypes: "Georgian townhouses, Victorian villas, Edwardian semis and modern estates" },
  { id: "enfield", name: "Enfield", area: "North London", lat: 51.6538, lng: -0.0799, nearbyTowns: ["Southgate", "Winchmore Hill", "Palmers Green", "Edmonton"], propertyTypes: "1930s semis, Edwardian terraces, post-war estates and modern apartments" },
  { id: "barnet", name: "Barnet", area: "North London", lat: 51.6444, lng: -0.1997, nearbyTowns: ["Finchley", "Edgware", "Mill Hill", "Whetstone"], propertyTypes: "1930s semis, Victorian villas, Edwardian houses and modern developments" },
  { id: "harrow", name: "Harrow", area: "North West London", lat: 51.5898, lng: -0.3346, nearbyTowns: ["Pinner", "Stanmore", "Wealdstone", "Kenton"], propertyTypes: "1930s semis, Victorian terraces, Edwardian houses and modern flats" },
  { id: "uxbridge", name: "Uxbridge", area: "West London", lat: 51.5404, lng: -0.4778, nearbyTowns: ["Hillingdon", "Ickenham", "Ruislip", "Hayes"], propertyTypes: "1930s semis, post-war estates, Victorian terraces and modern apartments" },
  { id: "ilford", name: "Ilford", area: "East London", lat: 51.5588, lng: 0.0700, nearbyTowns: ["Barking", "Redbridge", "Gants Hill", "Seven Kings"], propertyTypes: "Victorian terraces, 1930s semis, Edwardian houses and modern flats" },
  { id: "romford", name: "Romford", area: "East London", lat: 51.5768, lng: 0.1801, nearbyTowns: ["Hornchurch", "Upminster", "Gidea Park", "Harold Wood"], propertyTypes: "1930s semis, Victorian terraces, post-war estates and modern developments" },
  { id: "dartford", name: "Dartford", area: "Kent", lat: 51.4462, lng: 0.2149, nearbyTowns: ["Bexley", "Erith", "Crayford", "Swanley"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern new-builds" },
  { id: "gravesend", name: "Gravesend", area: "Kent", lat: 51.4415, lng: 0.3685, nearbyTowns: ["Northfleet", "Meopham", "Higham", "Shorne"], propertyTypes: "Victorian terraces, Edwardian semis, 1930s houses and modern estates" },
  { id: "maidstone", name: "Maidstone", area: "Kent", lat: 51.2720, lng: 0.5220, nearbyTowns: ["Bearsted", "Loose", "Barming", "Penenden Heath"], propertyTypes: "Georgian townhouses, Victorian terraces, 1930s semis and modern estates" },
  { id: "sevenoaks", name: "Sevenoaks", area: "Kent", lat: 51.2782, lng: 0.1868, nearbyTowns: ["Otford", "Westerham", "Riverhead", "Bat & Ball"], propertyTypes: "Period cottages, Victorian villas, Edwardian houses and executive new-builds" },
  { id: "tunbridge-wells", name: "Tunbridge Wells", area: "Kent", lat: 51.1320, lng: 0.2630, nearbyTowns: ["Southborough", "Pembury", "Langton Green", "Bidborough"], propertyTypes: "Georgian townhouses, Victorian villas, Edwardian terraces and modern apartments" },
  { id: "crawley", name: "Crawley", area: "West Sussex", lat: 51.1092, lng: -0.1872, nearbyTowns: ["Horsham", "East Grinstead", "Redhill", "Gatwick"], propertyTypes: "Post-war new town housing, modern estates, Victorian cottages and commercial premises" },
  { id: "brighton", name: "Brighton", area: "East Sussex", lat: 50.8225, lng: -0.1372, nearbyTowns: ["Hove", "Portslade", "Rottingdean", "Shoreham"], propertyTypes: "Regency terraces, Victorian houses, Edwardian villas and modern flats" },
  { id: "oxford", name: "Oxford", area: "Oxfordshire", lat: 51.7520, lng: -1.2577, nearbyTowns: ["Headington", "Cowley", "Abingdon", "Kidlington"], propertyTypes: "Georgian townhouses, Victorian terraces, period colleges and modern developments" },
  { id: "swindon", name: "Swindon", area: "Wiltshire", lat: 51.5558, lng: -1.7797, nearbyTowns: ["Wroughton", "Highworth", "Stratton", "Old Town"], propertyTypes: "Victorian railway terraces, 1930s semis, modern estates and new-build developments" },
  { id: "bristol", name: "Bristol", area: "Bristol", lat: 51.4545, lng: -2.5879, nearbyTowns: ["Clifton", "Redland", "Bedminster", "Fishponds"], propertyTypes: "Georgian terraces, Victorian houses, Edwardian villas and modern waterfront apartments" },
  { id: "bath", name: "Bath", area: "Somerset", lat: 51.3811, lng: -2.3590, nearbyTowns: ["Batheaston", "Combe Down", "Weston", "Larkhall"], propertyTypes: "Georgian townhouses, Victorian villas, period cottages and modern developments" },
  { id: "luton", name: "Luton", area: "Bedfordshire", lat: 51.8787, lng: -0.4200, nearbyTowns: ["Dunstable", "Harpenden", "Hitchin", "Leagrave"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern apartments" },
  { id: "milton-keynes", name: "Milton Keynes", area: "Buckinghamshire", lat: 52.0406, lng: -0.7594, nearbyTowns: ["Bletchley", "Wolverton", "Newport Pagnell", "Stony Stratford"], propertyTypes: "Modern grid-plan housing, new-build estates, converted farmhouses and apartments" },
  { id: "cambridge", name: "Cambridge", area: "Cambridgeshire", lat: 52.2053, lng: 0.1218, nearbyTowns: ["Trumpington", "Cherry Hinton", "Girton", "Histon"], propertyTypes: "Georgian townhouses, Victorian terraces, college properties and modern developments" },
  { id: "chelmsford", name: "Chelmsford", area: "Essex", lat: 51.7356, lng: 0.4685, nearbyTowns: ["Writtle", "Broomfield", "Great Baddow", "Springfield"], propertyTypes: "Victorian terraces, 1930s semis, Edwardian houses and modern estates" },
  { id: "colchester", name: "Colchester", area: "Essex", lat: 51.8860, lng: 0.8920, nearbyTowns: ["Wivenhoe", "West Mersea", "Marks Tey", "Stanway"], propertyTypes: "Georgian townhouses, Victorian terraces, period cottages and modern estates" },
  { id: "southend", name: "Southend-on-Sea", area: "Essex", lat: 51.5459, lng: 0.7077, nearbyTowns: ["Westcliff", "Leigh-on-Sea", "Shoeburyness", "Prittlewell"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and seafront apartments" },
  { id: "canterbury", name: "Canterbury", area: "Kent", lat: 51.2802, lng: 1.0789, nearbyTowns: ["Whitstable", "Herne Bay", "Sturry", "Bridge"], propertyTypes: "Medieval and Georgian townhouses, Victorian terraces, period cottages and modern developments" },
  { id: "birmingham", name: "Birmingham", area: "West Midlands", lat: 52.4862, lng: -1.8904, nearbyTowns: ["Solihull", "Sutton Coldfield", "Edgbaston", "Moseley"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern city apartments" },
  { id: "manchester", name: "Manchester", area: "Greater Manchester", lat: 53.4808, lng: -2.2426, nearbyTowns: ["Salford", "Stockport", "Trafford", "Didsbury"], propertyTypes: "Victorian terraces, converted warehouses, modern apartments and suburban semis" },
  { id: "leeds", name: "Leeds", area: "West Yorkshire", lat: 53.8008, lng: -1.5491, nearbyTowns: ["Headingley", "Roundhay", "Horsforth", "Pudsey"], propertyTypes: "Victorian back-to-backs, Edwardian semis, stone-built terraces and modern developments" },
  { id: "sheffield", name: "Sheffield", area: "South Yorkshire", lat: 53.3811, lng: -1.4701, nearbyTowns: ["Rotherham", "Dronfield", "Chapeltown", "Hillsborough"], propertyTypes: "Victorian terraces, stone-built semis, post-war estates and modern apartments" },
  { id: "liverpool", name: "Liverpool", area: "Merseyside", lat: 53.4084, lng: -2.9916, nearbyTowns: ["Birkenhead", "Bootle", "Crosby", "Woolton"], propertyTypes: "Georgian terraces, Victorian houses, post-war estates and waterfront apartments" },
  { id: "newcastle", name: "Newcastle", area: "Tyne and Wear", lat: 54.9783, lng: -1.6178, nearbyTowns: ["Gateshead", "Jesmond", "Gosforth", "Whitley Bay"], propertyTypes: "Georgian terraces, Victorian flats, Edwardian houses and modern developments" },
  { id: "nottingham", name: "Nottingham", area: "Nottinghamshire", lat: 52.9548, lng: -1.1581, nearbyTowns: ["West Bridgford", "Beeston", "Arnold", "Hucknall"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern city apartments" },
  { id: "leicester", name: "Leicester", area: "Leicestershire", lat: 52.6369, lng: -1.1398, nearbyTowns: ["Oadby", "Wigston", "Birstall", "Glenfield"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and modern estates" },
  { id: "coventry", name: "Coventry", area: "West Midlands", lat: 52.4068, lng: -1.5197, nearbyTowns: ["Kenilworth", "Bedworth", "Tile Hill", "Earlsdon"], propertyTypes: "Post-war rebuilds, Victorian suburbs, modern estates and converted buildings" },
  { id: "derby", name: "Derby", area: "Derbyshire", lat: 52.9225, lng: -1.4746, nearbyTowns: ["Allestree", "Mickleover", "Spondon", "Littleover"], propertyTypes: "Victorian terraces, 1930s semis, Georgian townhouses and modern estates" },
  { id: "norwich", name: "Norwich", area: "Norfolk", lat: 52.6309, lng: 1.2974, nearbyTowns: ["Thorpe St Andrew", "Costessey", "Sprowston", "Eaton"], propertyTypes: "Medieval buildings, Georgian townhouses, Victorian terraces and modern developments" },
  { id: "ipswich", name: "Ipswich", area: "Suffolk", lat: 52.0567, lng: 1.1482, nearbyTowns: ["Felixstowe", "Woodbridge", "Stowmarket", "Kesgrave"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and modern estates" },
  { id: "peterborough", name: "Peterborough", area: "Cambridgeshire", lat: 52.5695, lng: -0.2405, nearbyTowns: ["Yaxley", "Eye", "Whittlesey", "Stanground"], propertyTypes: "Victorian terraces, post-war estates, modern new-builds and converted properties" },
  { id: "exeter", name: "Exeter", area: "Devon", lat: 50.7184, lng: -3.5339, nearbyTowns: ["Topsham", "Heavitree", "Alphington", "Pinhoe"], propertyTypes: "Georgian terraces, Victorian villas, period cottages and modern developments" },
  { id: "plymouth", name: "Plymouth", area: "Devon", lat: 50.3755, lng: -4.1427, nearbyTowns: ["Plymstock", "Plympton", "Saltash", "Ivybridge"], propertyTypes: "Post-war rebuilds, Victorian terraces, naval housing and modern estates" },
  { id: "southampton", name: "Southampton", area: "Hampshire", lat: 50.9097, lng: -1.4044, nearbyTowns: ["Eastleigh", "Totton", "Romsey", "Hedge End"], propertyTypes: "Victorian terraces, 1930s semis, post-war estates and modern waterfront apartments" },
  { id: "portsmouth", name: "Portsmouth", area: "Hampshire", lat: 50.8198, lng: -1.0880, nearbyTowns: ["Gosport", "Fareham", "Havant", "Southsea"], propertyTypes: "Victorian terraces, Edwardian houses, naval housing and modern apartments" },
  { id: "bournemouth", name: "Bournemouth", area: "Dorset", lat: 50.7192, lng: -1.8808, nearbyTowns: ["Poole", "Christchurch", "Ferndown", "Westbourne"], propertyTypes: "Victorian villas, Edwardian houses, 1930s bungalows and modern apartments" },
  { id: "worcester", name: "Worcester", area: "Worcestershire", lat: 52.1936, lng: -2.2216, nearbyTowns: ["Malvern", "Droitwich", "Pershore", "Upton"], propertyTypes: "Georgian townhouses, Victorian terraces, period cottages and modern estates" },
  { id: "gloucester", name: "Gloucester", area: "Gloucestershire", lat: 51.8642, lng: -2.2382, nearbyTowns: ["Cheltenham", "Tewkesbury", "Stroud", "Quedgeley"], propertyTypes: "Medieval buildings, Georgian terraces, Victorian houses and modern estates" },
  { id: "northampton", name: "Northampton", area: "Northamptonshire", lat: 52.2405, lng: -0.9027, nearbyTowns: ["Weston Favell", "Duston", "Kingsthorpe", "Moulton"], propertyTypes: "Victorian terraces, 1930s semis, shoe industry conversions and modern estates" },
  { id: "bedford", name: "Bedford", area: "Bedfordshire", lat: 52.1356, lng: -0.4685, nearbyTowns: ["Kempston", "Biddenham", "Goldington", "Elstow"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s semis and modern estates" },
  { id: "basingstoke", name: "Basingstoke", area: "Hampshire", lat: 51.2667, lng: -1.0876, nearbyTowns: ["Tadley", "Overton", "Hook", "Old Basing"], propertyTypes: "1960s new town housing, Victorian cottages, modern estates and business parks" },
  { id: "winchester", name: "Winchester", area: "Hampshire", lat: 51.0632, lng: -1.3080, nearbyTowns: ["Kings Worthy", "Littleton", "Twyford", "Chandlers Ford"], propertyTypes: "Medieval buildings, Georgian townhouses, Victorian villas and modern family homes" },
  { id: "salisbury", name: "Salisbury", area: "Wiltshire", lat: 51.0688, lng: -1.7945, nearbyTowns: ["Amesbury", "Wilton", "Downton", "Laverstock"], propertyTypes: "Medieval buildings, Georgian terraces, Victorian houses and modern estates" },
  { id: "taunton", name: "Taunton", area: "Somerset", lat: 51.0148, lng: -3.1029, nearbyTowns: ["Wellington", "Bishops Lydeard", "Norton Fitzwarren", "Creech St Michael"], propertyTypes: "Georgian townhouses, Victorian terraces, period cottages and modern developments" },
  { id: "eastbourne", name: "Eastbourne", area: "East Sussex", lat: 50.7688, lng: 0.2906, nearbyTowns: ["Polegate", "Hailsham", "Pevensey", "Seaford"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s bungalows and seafront apartments" },
  { id: "hastings", name: "Hastings", area: "East Sussex", lat: 50.8554, lng: 0.5731, nearbyTowns: ["St Leonards", "Bexhill", "Battle", "Ore"], propertyTypes: "Victorian terraces, Regency houses, fishermen's cottages and modern apartments" },
  { id: "folkestone", name: "Folkestone", area: "Kent", lat: 51.0816, lng: 1.1664, nearbyTowns: ["Hythe", "Sandgate", "Cheriton", "Hawkinge"], propertyTypes: "Victorian terraces, Edwardian villas, period seafront properties and modern developments" },
  { id: "dover", name: "Dover", area: "Kent", lat: 51.1295, lng: 1.3089, nearbyTowns: ["Deal", "Whitfield", "River", "Temple Ewell"], propertyTypes: "Victorian terraces, Georgian townhouses, post-war housing and modern estates" },
  { id: "ashford", name: "Ashford", area: "Kent", lat: 51.1468, lng: 0.8736, nearbyTowns: ["Kennington", "Willesborough", "Kingsnorth", "Great Chart"], propertyTypes: "Victorian terraces, 1930s semis, modern new-build estates and converted oast houses" },
  { id: "tonbridge", name: "Tonbridge", area: "Kent", lat: 51.1958, lng: 0.2742, nearbyTowns: ["Hildenborough", "Hadlow", "East Peckham", "Paddock Wood"], propertyTypes: "Victorian villas, Edwardian houses, 1930s semis and modern family homes" },
  { id: "rochester", name: "Rochester", area: "Kent", lat: 51.3886, lng: 0.5048, nearbyTowns: ["Chatham", "Strood", "Gillingham", "Rainham"], propertyTypes: "Georgian townhouses, Victorian terraces, medieval buildings and modern estates" },
  { id: "staines", name: "Staines", area: "Surrey", lat: 51.4333, lng: -0.5085, nearbyTowns: ["Ashford", "Sunbury", "Shepperton", "Laleham"], propertyTypes: "Victorian terraces, 1930s semis, modern apartments and riverside properties" },
  { id: "weybridge", name: "Weybridge", area: "Surrey", lat: 51.3719, lng: -0.4571, nearbyTowns: ["Walton-on-Thames", "Hersham", "Addlestone", "Byfleet"], propertyTypes: "Edwardian houses, 1930s detached, executive homes and modern apartments" },
  { id: "esher", name: "Esher", area: "Surrey", lat: 51.3695, lng: -0.3651, nearbyTowns: ["Claygate", "Thames Ditton", "Hinchley Wood", "Oxshott"], propertyTypes: "Victorian villas, Edwardian houses, 1930s homes and executive new-builds" },
  { id: "leatherhead", name: "Leatherhead", area: "Surrey", lat: 51.2961, lng: -0.3287, nearbyTowns: ["Fetcham", "Bookham", "Ashtead", "Cobham"], propertyTypes: "Victorian terraces, 1930s semis, period cottages and modern estates" },
  { id: "reigate", name: "Reigate", area: "Surrey", lat: 51.2375, lng: -0.2042, nearbyTowns: ["Redhill", "Merstham", "Betchworth", "Leigh"], propertyTypes: "Georgian townhouses, Victorian villas, 1930s semis and modern family homes" },
  { id: "horsham", name: "Horsham", area: "West Sussex", lat: 51.0626, lng: -0.3254, nearbyTowns: ["Broadbridge Heath", "Southwater", "Billingshurst", "Storrington"], propertyTypes: "Victorian terraces, period cottages, 1930s semis and modern estates" },
  { id: "chichester", name: "Chichester", area: "West Sussex", lat: 50.8365, lng: -0.7792, nearbyTowns: ["Selsey", "Bognor Regis", "Midhurst", "Lavant"], propertyTypes: "Georgian terraces, Victorian houses, period flint cottages and modern developments" },
  { id: "worthing", name: "Worthing", area: "West Sussex", lat: 50.8148, lng: -0.3725, nearbyTowns: ["Lancing", "Findon", "Goring", "Broadwater"], propertyTypes: "Victorian terraces, Edwardian houses, 1930s bungalows and seafront apartments" },
  { id: "maidenhead", name: "Maidenhead", area: "Berkshire", lat: 51.5218, lng: -0.7176, nearbyTowns: ["Cookham", "Marlow", "Taplow", "Bray"], propertyTypes: "Victorian villas, Edwardian houses, 1930s semis and modern riverside apartments" },
  { id: "high-wycombe", name: "High Wycombe", area: "Buckinghamshire", lat: 51.6292, lng: -0.7482, nearbyTowns: ["Beaconsfield", "Marlow", "Hazlemere", "Hughenden Valley"], propertyTypes: "Victorian terraces, 1930s semis, period cottages and modern estates" },
  { id: "aylesbury", name: "Aylesbury", area: "Buckinghamshire", lat: 51.8168, lng: -0.8084, nearbyTowns: ["Wendover", "Haddenham", "Stoke Mandeville", "Bierton"], propertyTypes: "Georgian market town houses, Victorian terraces, 1930s semis and modern estates" },
  { id: "hemel-hempstead", name: "Hemel Hempstead", area: "Hertfordshire", lat: 51.7526, lng: -0.4692, nearbyTowns: ["Berkhamsted", "Kings Langley", "Bovingdon", "Leverstock Green"], propertyTypes: "1950s new town housing, Victorian cottages, modern estates and converted properties" },
  { id: "stevenage", name: "Stevenage", area: "Hertfordshire", lat: 51.9022, lng: -0.2027, nearbyTowns: ["Hitchin", "Letchworth", "Knebworth", "Walkern"], propertyTypes: "1950s new town housing, Victorian old town, modern estates and business parks" },
  { id: "hertford", name: "Hertford", area: "Hertfordshire", lat: 51.7960, lng: -0.0778, nearbyTowns: ["Ware", "Hoddesdon", "Bengeo", "Hertford Heath"], propertyTypes: "Georgian townhouses, Victorian terraces, period cottages and modern developments" },
  { id: "bishops-stortford", name: "Bishops Stortford", area: "Hertfordshire", lat: 51.8720, lng: 0.1607, nearbyTowns: ["Sawbridgeworth", "Much Hadham", "Stansted Mountfitchet", "Thorley"], propertyTypes: "Georgian market town houses, Victorian terraces, modern estates and converted properties" }
];

// Stats
export const stats = [
  { value: "500+", label: "Sites Secured" },
  { value: "24/7", label: "Support Available" },
  { value: "30+", label: "Expert Engineers" },
  { value: "99%", label: "Customer Satisfaction" }
];

// Testimonials
export const testimonials = [
  {
    quote: "Mainline Access designed and installed our access control and CCTV across three buildings. Professional from start to finish and the system has been fault-free.",
    author: "James Richardson",
    role: "Facilities Manager",
    company: "London"
  },
  {
    quote: "We needed perimeter security and CCTV for our data centre. Mainline Access delivered on time and integrated everything with our existing systems.",
    author: "Sarah Mitchell",
    role: "Site Manager",
    company: "Reading"
  },
  {
    quote: "We use Mainline Access across our commercial portfolio. Their engineers are knowledgeable and the support is excellent.",
    author: "Michael Chen",
    role: "Property Manager",
    company: "Apex Property Management"
  }
];

// FAQ data
export const faqs = [
  {
    question: "What is included in an access control system?",
    answer: "Access control typically includes door controllers, readers (card, fob or biometric), door strikes or locks, and software for managing users and permissions. We design systems to suit your site size, risk level and integration needs."
  },
  {
    question: "How much does commercial CCTV installation cost?",
    answer: "Costs depend on the number of cameras, resolution, recording storage and any integration with access control or alarms. We provide free, no-obligation quotes after a site survey so you know exactly what to expect."
  },
  {
    question: "Can you integrate with our existing security systems?",
    answer: "Yes. We integrate access control, CCTV and alarms with existing systems where possible, and can recommend upgrades or replacement when needed. We work with major brands and open protocols."
  },
  {
    question: "What areas do you cover?",
    answer: "We operate across London and surrounding areas, including Richmond, Chiswick, Wimbledon, Kingston, Manchester, Birmingham and many more. Contact us to confirm coverage in your location."
  },
  {
    question: "Do you offer maintenance and support?",
    answer: "Yes. We offer planned maintenance contracts and 24/7 support for critical sites. Our engineers can attend for faults, upgrades and expansion as your requirements change."
  },
  {
    question: "What industries do you work with?",
    answer: "We work with hospitals, data centres, warehouses, offices, retail, education and public-sector sites. Each sector has specific requirements and we tailor our solutions accordingly."
  }
];

// Blog posts
export const blogPosts = [
  {
    id: "access-control-buying-guide",
    title: "Access Control Buying Guide for Commercial Buildings",
    excerpt: "What to consider when specifying access control for offices, warehouses and multi-site premises.",
    date: "2024-01-15",
    image: "/placeholder.svg",
    category: "Advice"
  },
  {
    id: "cctv-vs-ip-cameras",
    title: "CCTV vs IP Cameras: Which Is Right for Your Site?",
    excerpt: "A comparison of analogue HD and IP camera systems to help you choose the right solution.",
    date: "2024-01-08",
    image: "/placeholder.svg",
    category: "Technical"
  },
  {
    id: "hospital-security-requirements",
    title: "Hospital Security Systems: Requirements and Best Practice",
    excerpt: "Key considerations for access control and CCTV in healthcare environments.",
    date: "2023-12-20",
    image: "/placeholder.svg",
    category: "Guides"
  },
  {
    id: "perimeter-security-guide",
    title: "Perimeter Security for Data Centres and Warehouses",
    excerpt: "How to protect boundaries with detection and CCTV integration.",
    date: "2023-12-12",
    image: "/placeholder.svg",
    category: "Advice"
  },
  {
    id: "security-system-integration",
    title: "Integrating Access Control, CCTV and Alarms",
    excerpt: "Benefits of a unified security platform and what to plan for.",
    date: "2023-12-01",
    image: "/placeholder.svg",
    category: "Technical"
  },
  {
    id: "commercial-cctv-compliance",
    title: "CCTV Compliance and Data Protection",
    excerpt: "What you need to know about signage, retention and data protection for business CCTV.",
    date: "2023-11-25",
    image: "/placeholder.svg",
    category: "Guides"
  }
];

// Company info
export const companyInfo = {
  name: "Mainline Access",
  phone: "020 1234 5678",
  email: "leads@mainlineaccess.co.uk",
  address: "123 Security Way, London, SW1A 1AA",
  hours: "Mon–Fri 8am–6pm, 24/7 support for contract clients",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#"
  }
};

// Why choose us
export const whyChooseUs = [
  {
    title: "24/7 Support",
    description: "Round-the-clock support for contract clients and critical sites.",
    icon: "Siren"
  },
  {
    title: "Integrated Systems",
    description: "Access control, CCTV and alarms designed to work together.",
    icon: "Camera"
  },
  {
    title: "Industry Experience",
    description: "Specialist experience across healthcare, data centres, warehouses and commercial.",
    icon: "Shield"
  },
  {
    title: "Transparent Pricing",
    description: "Honest, upfront quotes with no hidden costs.",
    icon: "PoundSterling"
  },
  {
    title: "Fully Guaranteed",
    description: "All work guaranteed and backed for your peace of mind.",
    icon: "ShieldCheck"
  },
  {
    title: "Local Expertise",
    description: "Experienced across London and the UK for commercial and public-sector sites.",
    icon: "MapPin"
  }
];

export const hubPages: HubData[] = [];

export const getCategoryPages = (_category: string): InfoPageData[] => [];

export const getHubData = (_category: string): HubData | undefined => undefined;

export const categoryImages: Record<string, string> = {
  "access-control-systems": "access-control-systems",
  "commercial-cctv-installation": "commercial-cctv-installation",
  "ip-camera-systems": "ip-camera-systems",
  "perimeter-security-systems": "perimeter-security-systems",
  "security-system-integration": "security-system-integration",
};

export const categoryAltText: Record<string, string> = {
  "access-control-systems": "Access control system installation for commercial premises",
  "commercial-cctv-installation": "Commercial CCTV installation",
  "ip-camera-systems": "IP camera system for surveillance",
  "perimeter-security-systems": "Perimeter security systems",
  "security-system-integration": "Integrated security system",
};

// End of access lib/data - drain-only category data removed
