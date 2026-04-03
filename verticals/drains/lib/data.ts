import type { InfoPageData } from "engine";
import { legalPages } from "@/data/legal";
import { buyerPages } from "@/data/buyer";
import { guidesPages } from "@/data/guides";

export type { InfoPageData };

// Services data
export const services = [
  {
    id: "drain-collapse-repair",
    slug: "drain-collapse-repair",
    title: "Drain Collapse Repair",
    titleSingular: "Drain Collapse Repair",
    shortDescription: "Fast, professional repair of collapsed and damaged drains.",
    description: "A collapsed drain can cause serious damage to your property if left untreated. Our drain collapse repair service provides a complete solution — from initial CCTV diagnosis through to full excavation and replacement of the damaged pipework. We work quickly to minimise disruption and restore proper drainage flow.",
    benefits: [
      "Prevents further structural damage to your property",
      "Eliminates foul odours and health hazards",
      "Restores full drainage capacity",
      "Insurance-backed work with full guarantees",
      "Minimal disruption to your home or business"
    ],
    process: [
      "Emergency assessment and CCTV drain survey",
      "Identify the location and extent of the collapse",
      "Excavation to expose the damaged section",
      "Removal of collapsed pipework and debris",
      "Installation of new pipes and connections",
      "Backfill, reinstatement and final CCTV check"
    ],
    icon: "AlertTriangle"
  },
  {
    id: "drain-relining",
    slug: "drain-relining",
    title: "Drain Relining",
    titleSingular: "Drain Relining",
    shortDescription: "No-dig drain repair using advanced relining technology.",
    description: "Drain relining is a trenchless repair method that creates a new pipe within the existing damaged drain. A resin-saturated liner is inserted into the pipe and cured in place, forming a seamless, jointless new pipe. This no-dig approach is faster, less disruptive, and often more cost-effective than traditional excavation.",
    benefits: [
      "No-dig solution — no excavation required",
      "Minimal disruption to gardens and driveways",
      "Seamless, jointless pipe with no root ingress points",
      "50+ year lifespan on relined pipes",
      "Cost-effective alternative to full replacement"
    ],
    process: [
      "CCTV survey to assess pipe condition",
      "High-pressure jetting to clean the drain",
      "Measure and prepare the resin liner",
      "Insert liner into the damaged pipe",
      "Cure the liner using UV or ambient methods",
      "Final CCTV inspection to verify quality"
    ],
    icon: "Layers"
  },
  {
    id: "cctv-drain-surveys",
    slug: "cctv-drain-surveys",
    title: "CCTV Drain Surveys",
    titleSingular: "CCTV Drain Survey",
    shortDescription: "Detailed camera inspections to diagnose drainage problems.",
    description: "Our CCTV drain surveys use state-of-the-art camera technology to inspect the interior of your drains and sewers. We provide detailed reports with footage showing the exact condition of your pipes, identifying blockages, cracks, root ingress, collapses, and other defects — essential for accurate diagnosis and repair planning.",
    benefits: [
      "Accurate diagnosis without excavation",
      "Full video report with detailed findings",
      "Identifies problems before they become emergencies",
      "Essential for homebuyer surveys and insurance claims",
      "Locates the exact position and depth of defects"
    ],
    process: [
      "Access the drainage system via manholes or rodding points",
      "Insert high-resolution CCTV camera into the drain",
      "Survey the full length of pipework",
      "Record and document all defects found",
      "Produce a detailed written and video report",
      "Recommend appropriate repair solutions"
    ],
    icon: "Camera"
  },
  {
    id: "drain-excavation",
    slug: "drain-excavation",
    title: "Drain Excavation",
    titleSingular: "Drain Excavation",
    shortDescription: "Full excavation and replacement of damaged drain runs.",
    description: "When a drain is too severely damaged for relining, excavation and replacement is the most effective solution. Our team carefully excavates to expose the damaged pipework, removes it completely, and installs brand-new drainage pipes. We handle all reinstatement work to leave your property looking as it did before.",
    benefits: [
      "Complete replacement of failed pipework",
      "Suitable for severely damaged or collapsed drains",
      "New pipes with full manufacturer guarantees",
      "Professional reinstatement of surfaces",
      "Resolves recurring drainage problems permanently"
    ],
    process: [
      "CCTV survey to map the damaged section",
      "Plan excavation route and depth",
      "Careful excavation to expose pipework",
      "Remove damaged pipes and clear the trench",
      "Install new pipes with correct falls and connections",
      "Backfill, compact and reinstate surfaces"
    ],
    icon: "Shovel"
  },
  {
    id: "emergency-drainage",
    slug: "emergency-drainage",
    title: "Emergency Drainage",
    titleSingular: "Emergency Drainage",
    shortDescription: "24/7 emergency response for urgent drainage problems.",
    description: "Drainage emergencies don't wait for business hours. Our emergency drainage service operates 24 hours a day, 7 days a week, providing rapid response to flooding, sewage backups, and critical drain failures. We arrive fast with fully equipped vehicles to diagnose and resolve your emergency quickly.",
    benefits: [
      "24/7 availability including weekends and bank holidays",
      "Rapid response — typically within 1-2 hours",
      "Fully equipped emergency response vehicles",
      "Immediate diagnosis with portable CCTV",
      "Temporary and permanent solutions available"
    ],
    process: [
      "Call our 24/7 emergency line",
      "Rapid dispatch of nearest available engineer",
      "On-site assessment and immediate action",
      "Emergency repair or temporary containment",
      "CCTV survey to identify the root cause",
      "Permanent repair scheduled if needed"
    ],
    icon: "Siren"
  },
  {
    id: "blocked-drains",
    slug: "blocked-drains",
    title: "Blocked Drains",
    titleSingular: "Blocked Drain",
    shortDescription: "Fast unblocking of drains using high-pressure jetting.",
    description: "Blocked drains are one of the most common drainage problems. Whether caused by fat, grease, wet wipes, tree roots, or debris buildup, we use high-pressure water jetting and specialist equipment to clear even the most stubborn blockages. We also investigate the cause to help prevent recurrence.",
    benefits: [
      "Fast clearance of all types of blockages",
      "High-pressure jetting cleans pipes thoroughly",
      "Removes tree roots, fat, grease and debris",
      "CCTV check included to identify the cause",
      "Advice to prevent future blockages"
    ],
    process: [
      "Assess the blockage via drainage access points",
      "Deploy high-pressure water jetting equipment",
      "Clear the blockage and flush the system",
      "CCTV survey to check for underlying damage",
      "Report findings and recommend prevention measures",
      "Provide a detailed invoice and guarantee"
    ],
    icon: "Ban"
  },
  {
    id: "drain-jetting",
    slug: "drain-jetting",
    title: "Drain Jetting",
    titleSingular: "Drain Jetting",
    shortDescription: "High-pressure water jetting to clear and clean drains.",
    description: "Our drain jetting service uses high-pressure water jets at up to 4,000 PSI to blast away blockages, grease, scale, and debris from inside your pipes. It's the most effective method for restoring full flow to blocked or slow-running drains, and leaves pipes cleaner than any other method. Ideal for both preventative maintenance and emergency unblocking.",
    benefits: [
      "Clears even the most stubborn blockages",
      "Removes grease, fat, scale and tree roots",
      "Cleans the full bore of the pipe",
      "Environmentally friendly — uses only water",
      "Ideal for regular preventative maintenance"
    ],
    process: [
      "Inspect access points and identify blockage location",
      "Set up high-pressure jetting equipment",
      "Jet through the pipework at up to 4,000 PSI",
      "Flush all debris through the system",
      "CCTV check to confirm pipe is clear",
      "Advise on maintenance schedule if needed"
    ],
    icon: "Droplets"
  },
  {
    id: "drain-root-removal",
    slug: "drain-root-removal",
    title: "Drain Root Removal",
    titleSingular: "Drain Root Removal",
    shortDescription: "Specialist removal of tree roots from drains and sewers.",
    description: "Tree roots are one of the most damaging forces affecting underground drainage. Roots seek out moisture and nutrients, penetrating pipe joints and cracks, eventually blocking or collapsing the pipe entirely. Our root removal service uses mechanical cutting and high-pressure jetting to clear root ingress, followed by relining to prevent regrowth.",
    benefits: [
      "Complete removal of root ingress from pipes",
      "Mechanical root cutting for heavy infestations",
      "High-pressure jetting to clear remaining debris",
      "Relining available to seal joints against regrowth",
      "CCTV survey to assess full extent of root damage"
    ],
    process: [
      "CCTV survey to locate and assess root ingress",
      "Mechanical root cutting using specialist equipment",
      "High-pressure jetting to clear debris",
      "Secondary CCTV survey to check results",
      "Recommend relining or repair for damaged sections",
      "Ongoing maintenance advice to prevent recurrence"
    ],
    icon: "TreeDeciduous"
  },
  {
    id: "drain-unblocking",
    slug: "drain-unblocking",
    title: "Drain Unblocking",
    titleSingular: "Drain Unblocking",
    shortDescription: "Professional drain unblocking for homes and businesses.",
    description: "Whether it's a slow-draining sink, an overflowing toilet, or a completely blocked outside drain, our engineers have the tools and experience to clear any blockage fast. We use a combination of rodding, high-pressure jetting, and electro-mechanical equipment depending on the nature of the blockage.",
    benefits: [
      "Fast response — often same-day service",
      "All types of blockages cleared",
      "Internal and external drains unblocked",
      "No call-out charge with repair",
      "CCTV diagnosis to prevent recurrence"
    ],
    process: [
      "Assess the blocked drain and access points",
      "Choose the right clearance method for the blockage",
      "Clear the blockage using jetting, rodding or mechanical tools",
      "Test the drain with water flow",
      "CCTV survey to check for underlying issues",
      "Provide report and prevention advice"
    ],
    icon: "Wrench"
  },
  {
    id: "drain-pipe-replacement",
    slug: "drain-pipe-replacement",
    title: "Drain Pipe Replacement",
    titleSingular: "Drain Pipe Replacement",
    shortDescription: "Full replacement of damaged, cracked or collapsed drain pipes.",
    description: "When a drain pipe is beyond repair — whether due to age, collapse, or severe cracking — full pipe replacement is the definitive solution. We excavate, remove the old pipework, and install new high-quality plastic drainage pipes with correct falls and connections. All surfaces are reinstated to their original condition.",
    benefits: [
      "Brand-new pipes with full guarantees",
      "Solves recurring problems permanently",
      "Modern materials resistant to root ingress",
      "Professional surface reinstatement included",
      "Suitable for all pipe materials and depths"
    ],
    process: [
      "CCTV survey and excavation planning",
      "Careful excavation to access damaged pipe",
      "Remove old pipework and prepare trench",
      "Install new pipes with correct gradient",
      "Connect to existing drainage system",
      "Backfill, compact and reinstate surfaces"
    ],
    icon: "Replace"
  },
  {
    id: "commercial-drainage",
    slug: "commercial-drainage",
    title: "Commercial Drainage",
    titleSingular: "Commercial Drainage",
    shortDescription: "Drainage services for businesses, restaurants and commercial properties.",
    description: "We provide comprehensive drainage solutions for commercial clients including offices, restaurants, retail premises, schools, and industrial sites. From planned maintenance contracts to emergency callouts, we keep your business running with minimal downtime. Our commercial team understands the urgency of business drainage issues.",
    benefits: [
      "Planned maintenance contracts available",
      "Priority emergency response for contract clients",
      "Minimal business disruption",
      "Compliance with health and safety regulations",
      "Detailed reporting for facilities managers"
    ],
    process: [
      "Site survey and drainage assessment",
      "Tailored maintenance or repair plan",
      "Scheduled works outside business hours where possible",
      "Full CCTV documentation of all work",
      "Detailed reports and compliance certificates",
      "Ongoing maintenance scheduling"
    ],
    icon: "Building2"
  }
];

// Locations: single source of truth in engine; do not redefine in verticals.
export { locations } from "../../../engine/data/locations";

// Stats
export const stats = [
  { value: "15,000+", label: "Drains Repaired" },
  { value: "24/7", label: "Emergency Response" },
  { value: "30+", label: "Expert Engineers" },
  { value: "99%", label: "Customer Satisfaction" }
];

// Testimonials
export const testimonials = [
  {
    quote: "Mainline Drains responded within an hour to our emergency. The collapsed drain under our kitchen was repaired the same day. Brilliant service.",
    author: "James Richardson",
    role: "Homeowner",
    company: "Chelsea"
  },
  {
    quote: "Their CCTV survey found the exact cause of our recurring damp problem. The drain relining was done without any digging — our garden was untouched. Highly recommended.",
    author: "Sarah Mitchell",
    role: "Property Manager",
    company: "Richmond"
  },
  {
    quote: "We use Mainline Drains across all our managed properties. Their reliability and professionalism is outstanding — they're our go-to drainage contractor.",
    author: "Michael Chen",
    role: "Facilities Manager",
    company: "Apex Property Management"
  }
];

// FAQ data
export const faqs = [
  {
    question: "What are the signs of a collapsed drain?",
    answer: "Common signs include slow-draining sinks and toilets, foul smells around your property, damp patches on walls or floors, sinkholes or depressions in your garden, and recurring blockages. If you notice any of these, a CCTV drain survey can confirm whether a collapse has occurred."
  },
  {
    question: "How much does drain collapse repair cost?",
    answer: "Costs vary depending on the depth, location, and extent of the damage. A straightforward repair can start from around £1,500, while more complex jobs may cost more. We provide free, no-obligation quotes after a CCTV survey so you know exactly what to expect."
  },
  {
    question: "Will my insurance cover drain repairs?",
    answer: "Many home insurance policies cover drain collapse repair, especially if the damage is sudden rather than gradual. We provide detailed CCTV reports and documentation to support your insurance claim and can liaise with your insurer directly."
  },
  {
    question: "What areas do you cover?",
    answer: "We operate across London and surrounding areas, including Richmond, Chiswick, Wimbledon, Kingston, Chelsea, Kensington, and many more. Contact us to confirm coverage in your specific location."
  },
  {
    question: "How quickly can you respond to an emergency?",
    answer: "Our emergency drainage team operates 24/7 and we typically arrive on-site within 1-2 hours of your call. We carry full diagnostic and repair equipment so we can often resolve the problem in a single visit."
  },
  {
    question: "What is drain relining and is it suitable for my property?",
    answer: "Drain relining is a no-dig repair method where a resin-coated liner is inserted into your existing pipe and cured in place, creating a brand-new pipe within the old one. It's suitable for most types of damage including cracks, fractures, and joint displacement, but not for fully collapsed sections."
  }
];

// Blog posts — imagePrompt must exactly match the blog topic for image regeneration
export const blogPosts = [
  {
    id: "signs-of-drain-collapse",
    title: "7 Warning Signs Your Drain Has Collapsed",
    excerpt: "Learn to spot the early warning signs of a collapsed drain before it causes serious damage to your property.",
    date: "2024-01-15",
    image: "/images/blog/signs-of-drain-collapse.jpg",
    imagePrompt: "Sinkhole or depression in a UK garden above a collapsed drain, cracked driveway, warning signs of drain collapse, residential property drainage problem, realistic photo",
    category: "Advice"
  },
  {
    id: "drain-relining-vs-excavation",
    title: "Drain Relining vs Excavation: Which Repair Is Better?",
    excerpt: "A detailed comparison of no-dig relining and traditional excavation to help you choose the best repair method.",
    date: "2024-01-08",
    image: "/images/blog/drain-relining-vs-excavation.jpg",
    imagePrompt: "Drain repair comparison: no-dig drain relining liner being inserted into pipe versus excavation trench with exposed damaged drain pipe, UK drainage contractor, realistic photo",
    category: "Technical"
  },
  {
    id: "cctv-drain-survey-guide",
    title: "What Happens During a CCTV Drain Survey",
    excerpt: "Everything you need to know about CCTV drain surveys — what they reveal and why they're essential before buying a property.",
    date: "2023-12-20",
    image: "/images/blog/cctv-drain-survey-guide.jpg",
    imagePrompt: "CCTV drain survey in progress: engineer with drain camera monitor and cable fed into manhole, inspecting underground pipe, UK drainage survey, realistic photo",
    category: "Guides"
  },
  {
    id: "preventing-blocked-drains",
    title: "How To Prevent Blocked Drains At Home",
    excerpt: "Simple steps you can take to keep your drains flowing freely and avoid costly emergency callouts.",
    date: "2023-12-12",
    image: "/images/blog/preventing-blocked-drains.jpg",
    imagePrompt: "Kitchen sink with strainer and fat in bin, bathroom drain guard, household preventing blocked drains, UK home drainage care, realistic photo",
    category: "Advice"
  },
  {
    id: "tree-root-drain-damage",
    title: "Tree Roots In Drains: Causes And Solutions",
    excerpt: "Why tree roots are one of the biggest threats to underground drainage and how to protect your pipes.",
    date: "2023-12-01",
    image: "/images/blog/tree-root-drain-damage.jpg",
    imagePrompt: "Tree roots growing into cracked clay drain pipe, root intrusion in underground drainage, drain damage from roots, UK property, realistic photo",
    category: "Technical"
  },
  {
    id: "emergency-drainage-what-to-do",
    title: "What To Do In A Drainage Emergency",
    excerpt: "A step-by-step guide on what to do when you have a drainage emergency to minimise damage and costs.",
    date: "2023-11-25",
    image: "/images/blog/emergency-drainage-what-to-do.jpg",
    imagePrompt: "Emergency drainage callout: drainage engineer at manhole with van, sewage backup or blocked drain emergency, UK 24/7 drainage service, realistic photo",
    category: "Guides"
  }
];

// Company info
export const companyInfo = {
  name: "Mainline Drains",
  phone: "+44 7455 493536",
  email: "info@mainlinedrains.co.uk",
  address: "128 City Road, London, EC1V 2NX",
  hours: "Mon–Fri 8am–6pm, 24/7 emergency callout support",
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#"
  }
};

// Why choose us
export const whyChooseUs = [
  {
    title: "24/7 Emergency Response",
    description: "Round-the-clock availability for urgent drainage emergencies across London.",
    icon: "Siren"
  },
  {
    title: "CCTV Technology",
    description: "State-of-the-art camera surveys for accurate diagnosis without excavation.",
    icon: "Camera"
  },
  {
    title: "No-Dig Solutions",
    description: "Advanced drain relining technology that avoids costly and disruptive excavation.",
    icon: "Layers"
  },
  {
    title: "Transparent Pricing",
    description: "Honest, upfront quotes with no hidden costs or surprise charges.",
    icon: "PoundSterling"
  },
  {
    title: "Insurance Backed",
    description: "All work fully guaranteed and insurance-backed for your peace of mind.",
    icon: "ShieldCheck"
  },
  {
    title: "Local Expertise",
    description: "Deep knowledge of London's drainage infrastructure and local regulations.",
    icon: "MapPin"
  }
];

// ==================== INFORMATIONAL PAGE DATA ====================

export interface HubData {
  category: string;
  basePath: string;
  title: string;
  subtitle: string;
  metaDescription: string;
}

export const hubPages: HubData[] = [
  {
    category: "problems",
    basePath: "/drain-problems",
    title: "Drain Problems",
    subtitle: "Recognise the signs of drainage issues and understand what causes them.",
    metaDescription: "Common drain problems explained — signs, causes and solutions for blocked, slow or damaged drains. Expert advice from Mainline Drains."
  },
  {
    category: "collapse",
    basePath: "/drain-collapse",
    title: "Collapsed Drain Scenarios",
    subtitle: "Collapsed drains under different parts of your property — what to expect and how we fix them.",
    metaDescription: "Collapsed drain repair for driveways, houses, patios, gardens and roads. Expert excavation and relining across London."
  },
  {
    category: "insurance",
    basePath: "/drain-insurance",
    title: "Drain Insurance & Responsibility",
    subtitle: "Understand who pays for drain repairs and how to make a successful insurance claim.",
    metaDescription: "Drain insurance claims, responsibility for collapsed drains, shared drains and sewer ownership explained by drainage experts."
  },
  {
    category: "costs",
    basePath: "/drain-costs",
    title: "Drain Repair Costs",
    subtitle: "Transparent pricing information for common drainage repairs and surveys.",
    metaDescription: "How much does drain repair cost? Pricing guides for collapsed drain repair, CCTV surveys, excavation and relining."
  },
  {
    category: "inspection",
    basePath: "/drain-inspection",
    title: "Drain Inspection & Diagnostics",
    subtitle: "How we investigate drainage problems using CCTV, tracing and mapping technology.",
    metaDescription: "Professional drain inspection services including CCTV surveys, drain tracing, mapping and condition reports across London."
  },
  {
    category: "causes",
    basePath: "/drain-causes",
    title: "Causes of Drain Damage",
    subtitle: "What damages drains and how to protect your property's drainage system.",
    metaDescription: "Common causes of drain damage including tree roots, ground movement, old clay pipes and building work. Prevention advice from experts."
  },
  {
    category: "commercial",
    basePath: "/commercial-drainage",
    title: "Commercial Drainage Services",
    subtitle: "Specialist drainage solutions for businesses, restaurants and commercial properties.",
    metaDescription: "Commercial drainage services including drain cleaning, jetting, grease trap cleaning and maintenance contracts for businesses in London."
  },
  {
    category: "emergency",
    basePath: "/emergency",
    title: "Emergency Drain Services",
    subtitle: "24/7 emergency drainage response when you need help fast.",
    metaDescription: "24/7 emergency drain repair and unblocking across London. Rapid response from qualified drainage engineers."
  },
  {
    category: "repair-methods",
    basePath: "/drain-repair-methods",
    title: "Drain Repair Methods",
    subtitle: "Compare repair approaches and understand which method is right for your drainage problem.",
    metaDescription: "Drain repair methods explained — relining vs excavation, how long repairs take, and which approach is best for your situation."
  },
  {
    category: "property",
    basePath: "/property-drainage",
    title: "Property Drainage Services",
    subtitle: "Drainage solutions for landlords, property managers, developers and commercial property owners.",
    metaDescription: "Drainage services for landlords, property managers, developers and commercial properties. Surveys, repairs and maintenance across London."
  },
  {
    category: "survey",
    basePath: "/drain-survey",
    title: "Drain Surveys",
    subtitle: "Professional drain surveys for homebuyers, property owners and developers.",
    metaDescription: "CCTV drain surveys for homebuyers, pre-purchase inspections, condition reports and developer surveys across London."
  },
  {
    category: "property-types",
    basePath: "/property-types",
    title: "Property Type Drainage",
    subtitle: "Drainage advice for specific property types — Victorian houses, new builds, flats and commercial buildings.",
    metaDescription: "Drainage guides for different property types. Common problems, survey recommendations and repair options for Victorian houses, new builds, flats and commercial properties."
  },
  {
    category: "legal",
    basePath: "/drain-responsibility",
    title: "Drain Responsibility & Legal",
    subtitle: "Understanding drainage responsibility, shared drains, neighbour disputes and legal obligations.",
    metaDescription: "Drain responsibility and legal guidance. Shared drains, boundary disputes, tree root liability and neighbour drainage issues explained."
  },
  {
    category: "buyer",
    basePath: "/homebuyer-drainage",
    title: "Homebuyer Drainage Guides",
    subtitle: "Essential drainage information for property buyers — surveys, costs, problems found and negotiation advice.",
    metaDescription: "Drainage guides for homebuyers. Pre-purchase drain surveys, common problems found, costs and how to negotiate when buying a property."
  },
  {
    category: "guides",
    basePath: "/drainage-guides",
    title: "Drainage Knowledge Guides",
    subtitle: "In-depth guides answering common drainage questions from UK homeowners.",
    metaDescription: "Comprehensive drainage guides covering surveys, repairs, costs, maintenance and prevention. Expert answers to common drainage questions."
  }
];

export const problemPages: InfoPageData[] = [
  {
    slug: "signs-of-collapsed-drain",
    title: "Signs of a Collapsed Drain",
    metaDescription: "How to tell if your drain has collapsed — warning signs, what to look for, and what to do next. Expert advice from Mainline Drains.",
    intro: "A collapsed drain can go undetected for weeks or even months, causing increasing damage to your property. Knowing the warning signs helps you act quickly and avoid costly repairs. Here's what to look for and when to call a drainage engineer.",
    signs: [
      "Slow-draining sinks, baths or toilets across the property",
      "Foul sewage smells inside or outside your home",
      "Damp patches on walls, floors or ceilings",
      "Sinkholes or depressions in the garden or driveway",
      "Recurring blockages that keep coming back after clearing",
      "Cracks appearing in walls or foundations",
      "Rat or insect activity near drains",
      "Unusually lush patches of grass over drain runs"
    ],
    diagnosis: "Our engineers use CCTV drain surveys to inspect the interior of your pipes and identify the exact location and severity of any collapse. The camera shows whether the pipe has partially or fully collapsed, and reveals the cause — whether it's root ingress, ground movement, or age-related deterioration.",
    resolution: "Depending on the severity, we repair collapsed drains using no-dig relining for partial collapses or full excavation and pipe replacement for complete failures. All work includes a final CCTV check and comes with an insurance-backed guarantee.",
    ctaText: "Think your drain may have collapsed? Book a CCTV survey today for a definitive answer.",
    relatedServices: ["drain-collapse-repair", "cctv-drain-surveys", "drain-excavation"]
  },
  {
    slug: "bad-smells-from-drains",
    title: "Bad Smells Coming From Drains",
    metaDescription: "Why your drains smell bad and how to fix it. Causes of foul drain odours and when to call a professional drainage engineer.",
    intro: "Persistent bad smells from drains are more than just unpleasant — they can indicate a serious problem with your drainage system. From broken seals to collapsed pipes, understanding the cause is the first step to fixing it.",
    signs: [
      "Sewage smell from kitchen or bathroom drains",
      "Rotten egg smell from outside drains",
      "Smells that worsen in warm weather",
      "Odours from multiple drains at once",
      "Smells that persist after cleaning traps and U-bends",
      "Gurgling sounds accompanying the smell"
    ],
    diagnosis: "We start with a visual inspection of traps, gullies and access points, then use CCTV camera surveys to check for broken pipes, blockages, collapsed sections, or disconnected joints that could be allowing sewer gases to escape.",
    resolution: "Solutions range from simple trap repairs and seal replacements to drain relining or pipe replacement for more serious damage. We also check for blocked vents that can cause pressure imbalances and odour problems.",
    ctaText: "Persistent drain smells? Let us diagnose the cause with a professional CCTV inspection.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "blocked-drains"]
  },
  {
    slug: "slow-draining-sinks-toilets",
    title: "Slow Draining Sinks and Toilets",
    metaDescription: "Why your sinks and toilets drain slowly. Common causes and professional solutions for slow drains in your home.",
    intro: "Slow-draining fixtures are one of the earliest signs of a developing drainage problem. While sometimes caused by a simple local blockage, persistent slow drainage often points to a deeper issue in your underground pipework.",
    signs: [
      "Water pooling in sinks or basins",
      "Toilets that flush slowly or incompletely",
      "Shower trays that don't empty during use",
      "Multiple fixtures draining slowly at the same time",
      "Water backing up when using the washing machine",
      "Gurgling noises from other drains when one is in use"
    ],
    diagnosis: "We test drainage flow rates at each fixture and use CCTV surveys to inspect the underground pipework. This reveals whether the problem is a localised blockage, a partial collapse, root ingress, or a gradient issue in the pipe run.",
    resolution: "Depending on the cause, we clear blockages with high-pressure jetting, remove root ingress, or repair damaged pipe sections using relining or excavation. We address the root cause, not just the symptom.",
    ctaText: "Slow drains could be a warning sign. Book a drainage inspection to find out what's going on.",
    relatedServices: ["blocked-drains", "drain-jetting", "cctv-drain-surveys"]
  },
  {
    slug: "recurring-drain-blockages",
    title: "Recurring Drain Blockages",
    metaDescription: "Why your drains keep blocking and how to stop it for good. Expert diagnosis and permanent solutions from Mainline Drains.",
    intro: "If your drains keep blocking despite being cleared, there's almost certainly an underlying structural problem. Repeated blockages are a symptom — not the disease. A proper investigation will reveal the root cause and allow us to fix it permanently.",
    signs: [
      "Blockages that return within weeks or months of clearing",
      "Multiple drains blocking at the same time",
      "Blockages in the same location every time",
      "Foul smells between blockage episodes",
      "Increasing frequency of blockages over time"
    ],
    diagnosis: "A CCTV drain survey reveals why blockages keep recurring. Common causes include partial pipe collapses creating snag points, displaced joints trapping debris, tree root ingress, incorrect pipe gradients, or bellied (dipped) pipe sections where waste accumulates.",
    resolution: "Once we identify the structural cause, we provide a permanent fix — whether that's relining cracked or displaced joints, cutting out roots and sealing the pipe, or replacing a section that has collapsed or lost its gradient.",
    ctaText: "Tired of recurring blockages? Get a CCTV survey to find the real cause.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "drain-root-removal"]
  },
  {
    slug: "drain-backing-up-garden",
    title: "Drain Backing Up Into Garden",
    metaDescription: "Why sewage is backing up into your garden and how to fix it. Emergency and permanent drainage solutions across London.",
    intro: "Sewage backing up into your garden is a serious health hazard that needs immediate attention. This usually indicates a major blockage or collapse in your underground drainage, and the waste has nowhere to go but up through the nearest access point.",
    signs: [
      "Sewage water pooling around manhole covers",
      "Overflowing gullies and drain access points",
      "Foul-smelling standing water in the garden",
      "Sewage smell around outdoor areas",
      "Soggy, waterlogged areas near drain runs",
      "Toilets and sinks backing up at the same time"
    ],
    diagnosis: "We attend as an emergency, contain the overflow, and then use CCTV cameras to inspect the drainage system. We identify the blockage point and determine whether it's caused by a collapse, root intrusion, fat buildup, or a problem in the public sewer.",
    resolution: "We clear the immediate blockage using high-pressure jetting, then repair any structural damage found. If the problem is in the public sewer, we help you report it to the water authority. All work is followed up with a CCTV verification survey.",
    ctaText: "Drain backing up? Call our 24/7 emergency line for immediate help.",
    relatedServices: ["emergency-drainage", "drain-jetting", "drain-collapse-repair"]
  },
  {
    slug: "sinkholes-garden-driveway",
    title: "Sinkholes in Garden or Driveway",
    metaDescription: "Why sinkholes appear in gardens and driveways. How collapsed drains cause ground subsidence and how we repair them.",
    intro: "A sinkhole or depression appearing in your garden, driveway, or patio is a serious warning sign of a collapsed drain beneath the surface. As a pipe collapses, the surrounding soil washes into the void, causing the ground above to subside.",
    signs: [
      "Depressions or dips appearing in the garden",
      "Paving or tarmac sinking on the driveway",
      "Cracks in patio slabs above drain runs",
      "Soft or spongy ground when walked on",
      "Visible voids or holes forming",
      "Cracking in nearby walls or foundations"
    ],
    diagnosis: "We use CCTV surveys to inspect the drain beneath the affected area and ground-probing techniques to assess the extent of soil washout. This tells us exactly how much pipe has collapsed and how much ground needs to be stabilised.",
    resolution: "We excavate the collapsed section, remove damaged pipework, install new pipes, and backfill with compacted material to stabilise the ground. Surface reinstatement — whether grass, paving, or tarmac — is included in our service.",
    ctaText: "Noticed a sinkhole? Don't wait — book an urgent drain inspection today.",
    relatedServices: ["drain-collapse-repair", "drain-excavation", "cctv-drain-surveys"]
  },
  {
    slug: "gurgling-drains-pipes",
    title: "Gurgling Drains and Pipes",
    metaDescription: "Why your drains are gurgling and what it means. Causes and solutions for noisy drains from professional drainage engineers.",
    intro: "Gurgling sounds from drains, pipes, and plugholes are caused by air being displaced in the drainage system. While sometimes minor, persistent gurgling often indicates a blockage, collapse, or ventilation problem that needs investigation.",
    signs: [
      "Gurgling from sink or bath drains after flushing a toilet",
      "Bubbling in the toilet bowl",
      "Gurgling sounds from outside drain covers",
      "Air bubbles coming up through water in traps",
      "Gurgling accompanied by slow drainage",
      "Sounds that have gradually worsened over time"
    ],
    diagnosis: "We check vent pipes and air admittance valves first, then use CCTV surveys to inspect the underground pipework for partial blockages, collapses, or gradient problems that restrict airflow through the system.",
    resolution: "Fixes range from clearing partial blockages and repairing vent pipes to relining or replacing damaged drain sections. Restoring correct airflow through the drainage system eliminates gurgling permanently.",
    ctaText: "Gurgling drains? Let us find out why with a professional drainage inspection.",
    relatedServices: ["cctv-drain-surveys", "blocked-drains", "drain-relining"]
  },
  {
    slug: "why-do-my-drains-smell",
    title: "Why Do My Drains Smell?",
    metaDescription: "Why do my drains smell? Common causes of drain odours and when to call a professional. Expert advice from Mainline Drains.",
    intro: "If you're asking 'why do my drains smell?', you're not alone — it's one of the most common drainage complaints. Drain smells can range from mildly unpleasant to genuinely nauseating, and the cause can be anything from a dry trap to a collapsed pipe. Understanding why helps you decide whether it's a DIY fix or a job for a professional.",
    signs: [
      "Rotten egg or sewage smell from sinks, showers or toilets",
      "Smell that comes and goes depending on weather",
      "Odour that persists after cleaning with bleach",
      "Multiple drains smelling at once",
      "Smell gets worse when running water",
      "Gurgling noises accompanying the smell"
    ],
    diagnosis: "Our engineers check traps, U-bends, and vent pipes first — these are the most common causes. If the smell persists, a CCTV drain survey checks for cracked pipes, broken seals, disconnected joints, or collapsed sections allowing sewer gas to escape.",
    resolution: "Simple fixes include refilling dry traps and repairing or replacing damaged U-bends. More serious causes require drain relining to seal cracked pipes, or pipe replacement for badly damaged sections. We fix the source, not just the symptom.",
    ctaText: "Drains smelling bad? Let us diagnose the cause with a professional inspection.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "blocked-drains"]
  },
  {
    slug: "why-do-drains-gurgle",
    title: "Why Do Drains Gurgle?",
    metaDescription: "Why do my drains gurgle? Causes of gurgling drain sounds and when to get professional help. Drainage experts explain.",
    intro: "Gurgling drains are caused by air being forced through water in your pipes' traps. This happens when there's a pressure imbalance in the drainage system — usually caused by a blockage, poor venting, or a structural defect. While occasionally harmless, persistent gurgling is a warning sign that shouldn't be ignored.",
    signs: [
      "Gurgling when you flush the toilet",
      "Bubbling in the sink when the bath drains",
      "Gurgling from outside drain covers",
      "Sounds that have gradually worsened over months",
      "Gurgling combined with slow drainage",
      "Air bubbles visible in toilet bowl"
    ],
    diagnosis: "We check vent pipes and air admittance valves, then use CCTV surveys to look for partial blockages, collapsed sections, or gradient problems restricting airflow. The location and pattern of gurgling helps us narrow down the cause quickly.",
    resolution: "Fixes range from clearing partial blockages with jetting to repairing blocked or damaged vent pipes. For structural issues like partial collapses causing air restriction, we use relining or targeted pipe replacement to restore proper flow and ventilation.",
    ctaText: "Drains gurgling? Book an inspection to find out what's causing it.",
    relatedServices: ["cctv-drain-surveys", "blocked-drains", "drain-relining"]
  },
  {
    slug: "why-is-my-drain-blocking",
    title: "Why Is My Drain Blocking?",
    metaDescription: "Why does my drain keep blocking? Common causes of recurring blockages and permanent solutions from professional drainage engineers.",
    intro: "If your drain keeps blocking, there's a reason — and it's rarely just about what you're putting down it. Recurring blockages almost always indicate an underlying structural problem in your pipework that traps debris and causes repeated buildup. Finding the root cause is the key to stopping it for good.",
    signs: [
      "Blockages that return within days or weeks of clearing",
      "The same drain always blocks",
      "Multiple drains blocking together",
      "Blockages getting more frequent over time",
      "Slow drainage between blockage episodes",
      "Bad smells even when drains are flowing"
    ],
    diagnosis: "A CCTV drain survey reveals the structural cause behind recurring blockages. Common findings include partial pipe collapses creating snag points, displaced joints catching debris, tree root ingress, belly (dip) in the pipe where waste pools, or incorrect gradient.",
    resolution: "Once we identify the structural issue, we fix it permanently — relining cracked joints, removing roots and sealing entry points, replacing collapsed sections, or correcting pipe gradient. No more repeated clearing bills.",
    ctaText: "Tired of your drain blocking? Get a CCTV survey to find the real cause.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "drain-root-removal"]
  },
  {
    slug: "why-is-my-garden-sinking",
    title: "Why Is My Garden Sinking?",
    metaDescription: "Why is my garden sinking? How collapsed drains cause ground subsidence and sinkholes. Professional diagnosis and repair.",
    intro: "If parts of your garden are sinking, dipping, or developing soft spots, a collapsed drain is one of the most common causes. When a pipe collapses underground, soil washes into the void through the broken pipe, and the ground above gradually subsides. This problem gets worse over time and needs professional investigation.",
    signs: [
      "Depressions or dips appearing in the lawn",
      "Paving slabs sinking or becoming uneven",
      "Soft, spongy ground when walked on",
      "Visible holes or voids forming",
      "Waterlogged patches in specific areas",
      "Unusually green or lush grass in one spot"
    ],
    diagnosis: "We use CCTV surveys to inspect drains running beneath the affected area and ground investigation to assess the extent of soil washout. Drain tracing confirms the exact pipe route under your garden so we know exactly where the problem is.",
    resolution: "We excavate the collapsed section, replace the damaged pipe, and backfill with compacted material to stabilise the ground. The garden surface is reinstated as part of the repair. For ongoing subsidence risk, we may recommend relining adjacent pipe sections.",
    ctaText: "Garden sinking? Book a drain survey to check for a collapse underneath.",
    relatedServices: ["drain-collapse-repair", "drain-excavation", "cctv-drain-surveys"]
  },
  {
    slug: "why-is-water-backing-up-in-drains",
    title: "Why Is Water Backing Up in My Drains?",
    metaDescription: "Why is water backing up in my drains? Causes of drain backflow and what to do. Emergency drainage advice from experts.",
    intro: "Water backing up through drains, toilets, or manholes is a sign of a serious blockage or failure in your drainage system. When wastewater can't flow away, it has nowhere to go but back up through the lowest access point. This is a health hazard that needs urgent attention.",
    signs: [
      "Toilets overflowing or filling when other fixtures are used",
      "Water rising in sinks when the washing machine runs",
      "Sewage coming up through shower or bath drains",
      "Manholes overflowing in the garden",
      "Water backing up only during heavy rain",
      "Multiple fixtures affected simultaneously"
    ],
    diagnosis: "We attend urgently to assess whether the problem is a main drain blockage, a collapsed pipe, or an issue with the public sewer. CCTV cameras locate the exact cause and position, and we determine whether it's your private drain or the water company's responsibility.",
    resolution: "We clear the immediate blockage with high-pressure jetting, then repair any structural damage found. If the issue is in the public sewer, we help you report it to the water authority with CCTV evidence. Emergency containment is provided while permanent repairs are arranged.",
    ctaText: "Drains backing up? Call our emergency line for immediate help.",
    relatedServices: ["emergency-drainage", "drain-jetting", "drain-collapse-repair"]
  },
  {
    slug: "sewage-smells-outside",
    title: "Sewage Smells Outside Property",
    metaDescription: "Why you can smell sewage outside your property. Common causes and how drainage engineers fix the problem permanently.",
    intro: "Sewage smells around the exterior of your property — near drains, manholes, or in the garden — are a clear sign of a drainage issue. The smell comes from sewer gases escaping through damaged pipes, broken seals, or blocked ventilation.",
    signs: [
      "Persistent sewage smell near manhole covers",
      "Foul odour around outside gullies or drain covers",
      "Smell that worsens in hot or dry weather",
      "Odour concentrated around specific areas of the garden",
      "Neighbours also noticing similar smells",
      "Smell accompanied by flies or insects near drains"
    ],
    diagnosis: "We inspect all external drainage access points, check for damaged or missing covers, and use CCTV surveys to find broken pipes, disconnected joints, or collapsed sections that are releasing sewer gases into the ground around your property.",
    resolution: "We repair or replace damaged pipe sections, reseal manholes and inspection chambers, clear any blockages preventing proper flow, and ensure all ventilation is working correctly to keep sewer gases contained within the system.",
    ctaText: "Sewage smells outside? Book a drain inspection to identify and fix the source.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  },
  // New symptom pages
  {
    slug: "slow-draining-sinks",
    title: "Slow Draining Sinks",
    metaDescription: "Why is my sink draining slowly? Common causes and professional solutions for slow-draining kitchen and bathroom sinks.",
    intro: "A slow-draining sink is one of the most common early signs of a developing drainage problem. While a single slow sink might be a local blockage in the trap or waste pipe, multiple slow sinks suggest a deeper issue in your underground drainage system that needs professional investigation.",
    signs: [
      "Water pooling in the kitchen sink during washing up",
      "Bathroom basin taking minutes to empty",
      "Water draining slower than it used to",
      "Gurgling sounds when water finally drains",
      "Multiple sinks draining slowly at the same time",
      "Slow drainage that returns after cleaning the trap"
    ],
    diagnosis: "We first check the trap and waste pipe for local blockages, then use CCTV drain surveys to inspect the underground pipework. Common causes include partial pipe collapses, tree root ingress, fat and grease buildup, or incorrect pipe gradients creating low points where water pools.",
    resolution: "Local blockages are cleared quickly with rodding or jetting. For underground causes, we use high-pressure jetting to clear buildup, relining to repair cracked or root-damaged pipes, or excavation for collapsed sections. We fix the root cause so your sinks drain properly long-term.",
    ctaText: "Sinks draining slowly? Book a drainage inspection to find out why.",
    relatedServices: ["blocked-drains", "drain-jetting", "cctv-drain-surveys"],
    relatedPages: [
      { slug: "blocked-drains", category: "service", title: "Blocked Drains Service" },
      { slug: "tree-roots-in-drains", category: "causes", title: "Tree Roots in Drains" },
      { slug: "cctv-drain-survey-cost", category: "costs", title: "CCTV Drain Survey Cost" },
      { slug: "drain-relining-vs-excavation", category: "repair-methods", title: "Relining vs Excavation" },
      { slug: "drain-repair-cost", category: "costs", title: "Drain Repair Cost" }
    ]
  },
  {
    slug: "drain-backflow",
    title: "Drain Backflow",
    metaDescription: "What causes drain backflow and how to fix it. Professional solutions for sewage backing up through drains, toilets and manholes.",
    intro: "Drain backflow occurs when wastewater reverses direction and comes back up through your drains, toilets, or manholes. This is both a health hazard and a sign of a serious blockage or structural failure in your drainage system. Immediate professional attention is essential.",
    signs: [
      "Sewage coming up through floor drains or shower trays",
      "Toilet water rising when other fixtures are used",
      "Manholes overflowing in the garden",
      "Foul water appearing in sinks or baths",
      "Backflow that worsens during heavy rainfall",
      "Multiple fixtures affected simultaneously"
    ],
    diagnosis: "We attend as an emergency to contain the backflow, then use CCTV cameras to locate the blockage or failure point. Common causes include main drain collapses, severe root blockages, fat buildup, or problems in the public sewer system causing backflow into private drains.",
    resolution: "We clear the immediate blockage with high-pressure jetting, then repair any structural damage found. For properties prone to backflow from the public sewer, we can install non-return valves to prevent future incidents. All work includes a CCTV verification survey.",
    ctaText: "Experiencing drain backflow? Call our 24/7 emergency line immediately.",
    relatedServices: ["emergency-drainage", "drain-jetting", "drain-collapse-repair"],
    relatedPages: [
      { slug: "emergency-drainage", category: "service", title: "Emergency Drainage" },
      { slug: "old-clay-drain-pipes", category: "causes", title: "Old Clay Drain Pipes" },
      { slug: "drain-tracing", category: "inspection", title: "Drain Tracing" },
      { slug: "drain-relining-vs-excavation", category: "repair-methods", title: "Relining vs Excavation" },
      { slug: "collapsed-drain-repair-cost", category: "costs", title: "Collapsed Drain Repair Cost" }
    ]
  },
  {
    slug: "drain-water-coming-up-in-shower",
    title: "Drain Water Coming Up in Shower",
    metaDescription: "Why is water or sewage coming up through my shower drain? Causes and professional solutions for shower drain backflow.",
    intro: "Water or sewage coming up through your shower drain is a distressing and unhygienic problem that indicates a significant blockage or failure somewhere downstream in your drainage system. The shower is often the lowest drain point in the house, making it the first place backflow appears.",
    signs: [
      "Dirty water rising through the shower tray when the toilet is flushed",
      "Sewage smell from the shower drain",
      "Water bubbling up through the shower plughole",
      "Problem worsens when the washing machine drains",
      "Other drains in the bathroom also affected",
      "Water rising even when the shower isn't in use"
    ],
    diagnosis: "We inspect the shower waste connection first, then use CCTV to survey the underground drainage from the nearest external access point. The backflow pattern tells us whether the blockage is local to the bathroom or in the main drain run. We check for collapses, root blockages, and fat buildup.",
    resolution: "We clear the blockage causing the backflow, then investigate and repair the underlying cause. This may involve jetting, root removal, relining, or excavation depending on what the CCTV survey reveals. We ensure all fixtures drain correctly before leaving.",
    ctaText: "Sewage coming up in your shower? Call us now for emergency help.",
    relatedServices: ["emergency-drainage", "blocked-drains", "cctv-drain-surveys"],
    relatedPages: [
      { slug: "blocked-drains", category: "service", title: "Blocked Drains Service" },
      { slug: "tree-roots-in-drains", category: "causes", title: "Tree Roots in Drains" },
      { slug: "cctv-drain-survey-cost", category: "costs", title: "CCTV Survey Cost" },
      { slug: "how-drain-relining-works", category: "repair-methods", title: "How Drain Relining Works" },
      { slug: "drain-repair-cost", category: "costs", title: "Drain Repair Cost" }
    ]
  },
  {
    slug: "sinkhole-in-garden",
    title: "Sinkhole in Garden",
    metaDescription: "Sinkhole appearing in your garden? How collapsed drains cause garden sinkholes and how we repair them safely.",
    intro: "A sinkhole appearing in your garden is alarming and almost always indicates a collapsed drain beneath the surface. As the pipe breaks, surrounding soil washes into the void through the broken sections, and the ground above gradually collapses. The sinkhole will continue to grow until the underlying drain is repaired.",
    signs: [
      "Circular depression or hole appearing in the lawn",
      "Ground suddenly giving way when walked on",
      "Gradually deepening dip in a specific area",
      "Sinkhole aligned with the route of a drain run",
      "Foul smell near the sinkhole",
      "Waterlogging around the edges of the depression"
    ],
    diagnosis: "We use CCTV drain surveys to inspect the pipe beneath the sinkhole, confirming whether a collapse has occurred. Drain tracing maps the full pipe route so we can assess whether other sections are also at risk. We evaluate the extent of soil washout to plan the repair.",
    resolution: "We excavate the collapsed drain section, remove damaged pipework, install new pipes with correct falls, and backfill with compacted aggregate to stabilise the ground. The garden surface is reinstated as part of the repair. For large sinkholes, additional ground stabilisation may be needed.",
    ctaText: "Sinkhole in your garden? Don't wait — book an urgent drain inspection today.",
    relatedServices: ["drain-collapse-repair", "drain-excavation", "cctv-drain-surveys"],
    relatedPages: [
      { slug: "drain-collapse-repair", category: "service", title: "Drain Collapse Repair" },
      { slug: "ground-movement", category: "causes", title: "Ground Movement" },
      { slug: "drain-tracing", category: "inspection", title: "Drain Tracing" },
      { slug: "when-drain-excavation-is-needed", category: "repair-methods", title: "When Excavation Is Needed" },
      { slug: "collapsed-drain-repair-cost", category: "costs", title: "Collapsed Drain Repair Cost" }
    ]
  },
  {
    slug: "cracks-in-driveway-near-drain",
    title: "Cracks in Driveway Near Drain",
    metaDescription: "Cracks appearing in your driveway near a drain? How collapsed drains cause driveway damage and professional repair solutions.",
    intro: "Cracks appearing in your driveway, particularly near manhole covers or along the line of a drain run, are a strong indicator of a collapsed or collapsing drain beneath the surface. As the pipe fails, the ground above loses support and the driveway surface begins to crack and subside.",
    signs: [
      "Cracks radiating outward from a manhole cover",
      "Linear cracks following the route of a drain pipe",
      "Driveway surface sinking in one area",
      "Block paving becoming uneven near drain access points",
      "Cracks that are getting wider or longer over time",
      "Sewage smell or damp patches near the cracked area"
    ],
    diagnosis: "We use CCTV surveys to inspect the drain beneath the affected area of your driveway. Drain tracing confirms the exact pipe route, helping us understand the relationship between the pipe failure and the surface damage. We assess both the drainage and structural implications.",
    resolution: "We excavate the collapsed drain section, replace the damaged pipe, and backfill with properly compacted material to restore ground support. Your driveway surface — whether tarmac, block paving, or concrete — is reinstated to match the existing finish.",
    ctaText: "Driveway cracking near a drain? Book a CCTV survey to check for a collapse.",
    relatedServices: ["drain-collapse-repair", "drain-excavation", "cctv-drain-surveys"],
    relatedPages: [
      { slug: "drain-collapse-repair", category: "service", title: "Drain Collapse Repair" },
      { slug: "ground-movement", category: "causes", title: "Ground Movement" },
      { slug: "drain-tracing", category: "inspection", title: "Drain Tracing" },
      { slug: "when-drain-excavation-is-needed", category: "repair-methods", title: "When Excavation Is Needed" },
      { slug: "collapsed-drain-repair-cost", category: "costs", title: "Collapsed Drain Repair Cost" }
    ]
  }
];

export const collapseScenarios: InfoPageData[] = [
  {
    slug: "under-driveway",
    title: "Collapsed Drain Under Driveway",
    metaDescription: "Collapsed drain under your driveway? Expert repair and replacement with full surface reinstatement. Serving London 24/7.",
    intro: "A collapsed drain under a driveway is a common but serious problem. The weight of vehicles combined with ground movement can crack and collapse drainage pipes, leading to sinkholes, driveway subsidence, and sewage issues. Our team specialises in driveway drain repairs with minimal disruption.",
    signs: [
      "Driveway surface sinking or cracking",
      "Tarmac or block paving becoming uneven",
      "Puddles forming in unusual places on the driveway",
      "Sewage smells near the driveway",
      "Visible cracks or gaps in the driveway surface",
      "Recurring drain blockages traced to the driveway area"
    ],
    diagnosis: "We use CCTV cameras to survey the drain run beneath your driveway, pinpointing the exact location and extent of the collapse without needing to dig up the entire surface. Drain tracing confirms the pipe route if no plans are available.",
    resolution: "For partial collapses, we may be able to reline the pipe using no-dig technology. For full collapses, we carefully excavate just the affected section, replace the pipe, and reinstate your driveway surface — whether that's tarmac, block paving, or concrete.",
    ctaText: "Driveway sinking? Book a CCTV drain survey to check for a collapse underneath.",
    relatedServices: ["drain-collapse-repair", "drain-excavation", "drain-relining"]
  },
  {
    slug: "under-house",
    title: "Collapsed Drain Under House",
    metaDescription: "Collapsed drain under your house? Specialist repair including internal excavation and no-dig relining. Expert drainage engineers.",
    intro: "A collapsed drain running beneath your house is one of the most challenging drainage repairs. These pipes are difficult to access, and a collapse can cause serious structural issues including subsidence, damp, and persistent foul odours inside the property.",
    signs: [
      "Persistent damp or wet patches on ground floor walls",
      "Foul smells inside the property, especially at ground level",
      "Cracks in internal walls or floors",
      "Floor tiles lifting or laminate flooring warping",
      "Mould growth in rooms above drain runs",
      "Increased rat or insect activity inside the home"
    ],
    diagnosis: "CCTV surveys access the drain from external manholes and inspect the full run beneath the building. We use drain tracing to map the exact route under the house and sonar technology to identify voids caused by soil washout around the collapsed pipe.",
    resolution: "Where possible, we use no-dig relining to repair the pipe from inside, avoiding the need to break through floors. When excavation is necessary, we work carefully through the property with dust sheets and protective measures, reinstating all surfaces after the repair.",
    ctaText: "Suspect a collapsed drain under your house? A CCTV survey will give you a definitive answer.",
    relatedServices: ["drain-collapse-repair", "drain-relining", "cctv-drain-surveys"]
  },
  {
    slug: "under-patio",
    title: "Collapsed Drain Under Patio",
    metaDescription: "Collapsed drain under your patio? Expert repair with full patio reinstatement. CCTV surveys and no-dig solutions available.",
    intro: "Drains running beneath patios are susceptible to collapse from ground movement, tree root damage, and the weight of heavy paving. A collapse can cause patio slabs to sink, crack, or become unstable, and may allow sewage to leak into the surrounding ground.",
    signs: [
      "Patio slabs sinking or becoming uneven",
      "Cracks appearing between or through patio slabs",
      "Foul smells around the patio area",
      "Waterlogged areas around the patio edge",
      "Ants or insects emerging between slabs",
      "Green algae growth in specific areas indicating moisture"
    ],
    diagnosis: "We use CCTV drain cameras to inspect the pipe beneath the patio and determine the type and extent of damage. Drain tracing helps us pinpoint the exact position without unnecessary excavation.",
    resolution: "We lift only the slabs needed to access the collapsed section, replace or reline the damaged pipe, and carefully reinstate the patio. Where possible, no-dig relining avoids the need to disturb the surface at all.",
    ctaText: "Patio slabs sinking? Get a CCTV survey to check for a drain collapse underneath.",
    relatedServices: ["drain-collapse-repair", "drain-relining", "drain-excavation"]
  },
  {
    slug: "under-road",
    title: "Collapsed Drain Under Road",
    metaDescription: "Collapsed drain under a road? We handle council liaison, road permits and professional repair. London drainage specialists.",
    intro: "A collapsed drain beneath a public or private road requires specialist handling including traffic management, council permits, and careful excavation. Our team has extensive experience working on road drainage repairs, liaising with highways authorities and utility companies.",
    signs: [
      "Road surface subsiding or developing potholes",
      "Manholes sitting proud of the road surface",
      "Standing water in the road after rain",
      "Sewage smell from road gullies or manholes",
      "Tarmac cracking along the line of a drain run",
      "Reports from the water company about sewer issues"
    ],
    diagnosis: "We conduct a full CCTV survey from the nearest access points and use drain tracing and GPS mapping to identify the collapse location precisely. This information is used to plan the most efficient excavation with minimal road disruption.",
    resolution: "We obtain all necessary road opening permits, set up traffic management, excavate to the collapsed section, replace the damaged pipework, and reinstate the road surface to highways standards. We coordinate with utility companies if other services are affected.",
    ctaText: "Need a drain repaired under a road? Contact us for expert advice and planning.",
    relatedServices: ["drain-collapse-repair", "drain-excavation", "drain-pipe-replacement"]
  },
  {
    slug: "under-garden",
    title: "Collapsed Drain Under Garden",
    metaDescription: "Collapsed drain under your garden? Signs to look for and expert repair solutions. Serving London and surrounding areas.",
    intro: "Garden drain collapses are often caused by tree root damage, ground movement, or ageing clay pipes. They can create sinkholes, waterlogged areas, and persistent foul smells. The good news is that garden drains are usually the most accessible and straightforward to repair.",
    signs: [
      "Sinkholes or depressions appearing in the lawn",
      "Unusually lush or green patches of grass",
      "Waterlogged or boggy areas in the garden",
      "Foul smells in specific areas of the garden",
      "Tree roots visibly penetrating drain access points",
      "Recurring blockages from garden drain runs"
    ],
    diagnosis: "CCTV surveys reveal the condition of pipes running through your garden, showing collapses, root ingress, and other damage. We trace the drain route to map all pipes and identify which sections need attention.",
    resolution: "Garden collapses are typically repaired by excavating the affected section, replacing the pipe, and backfilling with compacted material. For partial damage, no-dig relining is often possible. We reinstate lawns, flower beds, and pathways as part of the repair.",
    ctaText: "Sinkhole in your garden? Book a CCTV survey to check for a collapsed drain.",
    relatedServices: ["drain-collapse-repair", "drain-root-removal", "drain-relining"]
  },
  {
    slug: "under-extension",
    title: "Collapsed Drain Under Extension",
    metaDescription: "Collapsed drain under your extension? Specialist repair with minimal disruption to your home. Expert engineers across London.",
    intro: "Extensions built over existing drain runs are a common source of collapsed drain problems. The weight of the new structure, foundation work, and changes to ground conditions can damage pipes that were never designed to bear the load.",
    signs: [
      "Drainage problems that started after an extension was built",
      "Damp or wet patches on the extension floor",
      "Cracks in the extension walls or floor slab",
      "Sewage smells inside the extension",
      "Slow drainage from extension kitchen or bathroom",
      "Original drains were not diverted during construction"
    ],
    diagnosis: "We use CCTV surveys from external access points to inspect the drain running beneath the extension. Drain tracing maps the exact route under the building, and we assess whether the collapse was caused by construction loading, vibration, or direct damage.",
    resolution: "Where possible, we use no-dig relining from external access points. When excavation is necessary, we work carefully through the internal floor, replacing the damaged section and reinstating the surface. We coordinate with structural engineers if needed.",
    ctaText: "Drain collapsed under your extension? Book a CCTV survey to assess the damage.",
    relatedServices: ["drain-collapse-repair", "drain-relining", "cctv-drain-surveys"]
  },
  {
    slug: "under-conservatory",
    title: "Collapsed Drain Under Conservatory",
    metaDescription: "Collapsed drain under your conservatory? No-dig and excavation solutions with full reinstatement. London drainage experts.",
    intro: "Conservatories are frequently built over existing drain runs, and the added weight and foundation work can damage ageing pipes. A collapsed drain under a conservatory causes damp, bad smells, and can undermine the conservatory's foundations.",
    signs: [
      "Damp or musty smell in the conservatory",
      "Condensation problems beyond normal levels",
      "Cracks in the conservatory base or dwarf walls",
      "Wet patches on the conservatory floor",
      "Drainage problems coinciding with conservatory construction",
      "Soft ground or subsidence around conservatory edges"
    ],
    diagnosis: "CCTV surveys from external manholes inspect the drain beneath the conservatory. We trace the pipe route to confirm its exact position and assess the type and extent of collapse.",
    resolution: "No-dig relining is the preferred method as it avoids disturbing the conservatory. The liner is inserted from external access points and cured in place. If excavation is unavoidable, we work through the floor with protective measures and reinstate all surfaces.",
    ctaText: "Suspect a drain collapse under your conservatory? Get a CCTV survey for answers.",
    relatedServices: ["drain-collapse-repair", "drain-relining", "drain-excavation"]
  }
];

export const insurancePages: InfoPageData[] = [
  {
    slug: "collapsed-drain-insurance-claims",
    title: "Collapsed Drain Insurance Claims",
    metaDescription: "How to claim on your home insurance for a collapsed drain. Step-by-step guide with expert advice from Mainline Drains.",
    intro: "Many home insurance policies cover collapsed drain repairs, but navigating the claims process can be confusing. We help hundreds of customers every year with their drain insurance claims, providing the evidence and documentation insurers require.",
    signs: [
      "Your home insurance may cover drain collapse if the event is sudden",
      "Gradual deterioration may not be covered under standard policies",
      "Buildings insurance (not contents) is the relevant policy",
      "Some policies have specific drainage exclusions — check your documents",
      "Excess amounts typically apply to drainage claims"
    ],
    diagnosis: "We provide a comprehensive CCTV drain survey report that clearly shows the collapse, its cause, and its extent. This report, along with photographs and a written assessment, gives your insurer the evidence they need to process your claim.",
    resolution: "We work directly with your insurer or their appointed loss adjusters, providing quotes, reports, and any additional information requested. Once the claim is approved, we carry out the repair and provide completion certificates and post-repair CCTV footage.",
    ctaText: "Need help with a drain insurance claim? We provide all the evidence your insurer needs.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "who-is-responsible",
    title: "Who Is Responsible For a Collapsed Drain?",
    metaDescription: "Who pays for a collapsed drain? Understanding responsibility for drain repairs — private vs shared vs public sewers explained.",
    intro: "Determining who is responsible for repairing a collapsed drain depends on where the pipe is located and whether it serves just your property or multiple properties. Since 2011, the rules changed significantly, transferring many private sewers to water company ownership.",
    signs: [
      "Pipes within your property boundary serving only your property are your responsibility",
      "Shared drains serving multiple properties transferred to water companies in 2011",
      "Public sewers and lateral drains are the water company's responsibility",
      "Building over public sewers requires water company consent",
      "Your property deeds or a drainage map can clarify pipe ownership"
    ],
    diagnosis: "We conduct a CCTV survey and drain trace to map the full drainage system, clearly showing which pipes are private (your responsibility) and which are shared or public (water company responsibility). This eliminates confusion and ensures repairs are done by the right party.",
    resolution: "If the drain is your responsibility, we provide a quote for repair. If it's the water company's responsibility, we help you report the issue and provide supporting CCTV evidence. For shared drains, we advise on the best course of action.",
    ctaText: "Not sure who's responsible for your drain repair? We'll map it out and advise you.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "shared-drain-responsibility",
    title: "Shared Drain Responsibility UK",
    metaDescription: "Who is responsible for shared drains in the UK? Understanding the 2011 transfer of private sewers and your rights.",
    intro: "Since October 2011, most shared drains and private sewers in England and Wales transferred to the ownership of local water and sewerage companies. This means that if a drain serves more than one property, it's likely the water company's responsibility to repair.",
    signs: [
      "A shared drain serves two or more properties",
      "Pre-2011, shared drains were the joint responsibility of connected properties",
      "Post-2011 transfer applies to drains that were shared before July 2011",
      "New shared drains built after 2011 may have different rules",
      "The water company maintains a sewer map showing adopted drains"
    ],
    diagnosis: "We use CCTV surveys and drain tracing to determine whether a drain is shared or private. We can reference water company sewer maps and provide a clear diagram showing which drains are yours and which belong to the water authority.",
    resolution: "If the problem is in a shared/transferred drain, we help you report it to your water company with CCTV evidence. If it's in a private section, we provide repair options. We can also advise on disputes between neighbours about drainage responsibility.",
    ctaText: "Unsure about shared drain responsibility? Let us survey and advise.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "sewer-responsibility-uk",
    title: "Sewer Responsibility UK",
    metaDescription: "Who is responsible for sewers in the UK? Private drains vs public sewers — understand your responsibilities and rights.",
    intro: "Understanding sewer responsibility in the UK can be confusing. The key distinction is between private drains (your responsibility), shared drains (usually the water company's since 2011), and public sewers (always the water company's). Getting this right can save you thousands.",
    signs: [
      "Private drains serve only your property and are within your boundary",
      "Lateral drains connect your property to the public sewer — water company's responsibility",
      "Public sewers serve the wider community — always water company maintained",
      "Highway drains are the local council's responsibility",
      "The water company must fix problems in their sewers free of charge"
    ],
    diagnosis: "A CCTV drain survey combined with drain tracing clearly maps your entire drainage system, showing where private drains end and public/shared sewers begin. We reference official sewer maps and provide a clear, annotated report.",
    resolution: "We handle the repair if the drain is your private responsibility. For water company sewers, we assist with reporting the issue and provide supporting CCTV evidence. We can also arrange for water company pre-surveys if building work is planned near public sewers.",
    ctaText: "Need to understand your sewer responsibilities? Book a drain mapping survey.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "does-home-insurance-cover-collapsed-drains",
    title: "Does Home Insurance Cover Collapsed Drains?",
    metaDescription: "Does home insurance cover collapsed drains? What's covered, what's not, and how to check your policy. Expert guidance.",
    intro: "One of the first questions homeowners ask when they discover a collapsed drain is whether their insurance will cover the repair cost. The answer depends on your policy, the cause of the collapse, and how the damage is classified — sudden event vs gradual deterioration.",
    signs: [
      "Most buildings insurance policies cover sudden drain collapse",
      "Gradual wear and tear is usually excluded",
      "Accidental damage cover may extend protection",
      "Some policies have specific drainage endorsements",
      "Excess typically ranges from £250–£1,000 for drainage claims",
      "Check your policy schedule for drainage exclusions"
    ],
    diagnosis: "We provide a detailed CCTV report that clearly documents the collapse, its cause, and its severity. This professional evidence helps your insurer determine whether the damage qualifies for a claim under your policy terms.",
    resolution: "If your claim is accepted, we work directly with your insurer or their loss adjusters. We provide competitive repair quotes, carry out the approved work, and supply completion certificates and post-repair CCTV footage for the claim file.",
    ctaText: "Need to check if your drain collapse is covered? Start with a CCTV survey for evidence.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "how-to-claim-for-drain-collapse",
    title: "How to Claim for a Drain Collapse",
    metaDescription: "Step-by-step guide to making a drain collapse insurance claim. What evidence you need and how the process works.",
    intro: "Making a successful insurance claim for a collapsed drain requires the right evidence, presented in the right way. Many claims are delayed or rejected because homeowners don't provide sufficient documentation. Here's how to get it right first time.",
    signs: [
      "Step 1: Document the problem with photos and notes",
      "Step 2: Report the issue to your insurer immediately",
      "Step 3: Get a professional CCTV drain survey",
      "Step 4: Obtain repair quotes from qualified contractors",
      "Step 5: Submit all evidence to your insurer",
      "Step 6: Wait for approval before starting major work"
    ],
    diagnosis: "Our CCTV survey report is specifically formatted for insurance purposes — it includes time-stamped HD footage, annotated screenshots, a written assessment of the damage, and a clear statement of the cause. This is exactly what insurers need to process your claim.",
    resolution: "Once your insurer approves the claim, we carry out the repair work, liaising with loss adjusters throughout. We provide staged invoices if required, and issue completion certificates and post-repair CCTV verification for the claim closure.",
    ctaText: "Starting a drain collapse claim? We provide all the evidence you need.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "drain-collapse-insurance-process",
    title: "Drain Collapse Insurance Process",
    metaDescription: "The drain collapse insurance process explained. Timelines, documentation and what to expect from your insurer.",
    intro: "The insurance process for a collapsed drain typically takes 2–6 weeks from initial claim to approved repair. Understanding each stage helps you prepare the right documentation and avoid common delays that can extend the timeline.",
    signs: [
      "Initial claim notification: 1–3 days",
      "Insurer may appoint their own loss adjuster to inspect",
      "CCTV survey evidence is almost always required",
      "Insurer reviews quotes and may negotiate costs",
      "Approval to proceed with repairs: 1–4 weeks",
      "Payment typically follows completion of approved work"
    ],
    diagnosis: "Having a professional CCTV drain survey ready when you submit your claim significantly speeds up the process. Our reports meet insurer requirements and pre-empt the questions loss adjusters typically ask, reducing back-and-forth delays.",
    resolution: "We manage the repair process from start to finish, keeping your insurer informed at every stage. We provide progress updates, handle loss adjuster site visits, and supply all documentation needed to close the claim promptly.",
    ctaText: "Need help navigating your drain insurance claim? Contact us for expert support.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "who-pays-for-collapsed-drains",
    title: "Who Pays for Collapsed Drains?",
    metaDescription: "Who pays for collapsed drain repairs? Insurance, water companies, landlords and shared responsibility explained.",
    intro: "Who pays for a collapsed drain depends on several factors: where the pipe is located, whether it's private or shared, your insurance cover, and whether a third party caused the damage. Understanding your options can save you thousands of pounds.",
    signs: [
      "Private drains within your boundary: your responsibility",
      "Shared/adopted drains: water company pays since 2011",
      "Public sewers: always the water company's responsibility",
      "Building work damage: builder's liability insurance may cover it",
      "Home insurance: may cover sudden collapse events",
      "Landlords: responsible for drainage in rental properties"
    ],
    diagnosis: "We survey and trace your drainage system to determine exactly which pipes are private (your responsibility) and which are shared or public (water company responsibility). This clarity is essential before spending money on repairs that someone else should be paying for.",
    resolution: "If the drain is your responsibility, we provide a competitive repair quote and assist with insurance claims. If it's the water company's, we help you report it with CCTV evidence. If a builder caused the damage, our report supports your claim against their insurance.",
    ctaText: "Not sure who should pay? Let us survey your drains and advise you.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "insurance-drain-survey-requirements",
    title: "Insurance Drain Survey Requirements",
    metaDescription: "What drain survey evidence do insurers need? CCTV report requirements for drainage insurance claims explained.",
    intro: "Most insurance companies require a professional CCTV drain survey report before they'll process a drainage claim. Understanding exactly what evidence your insurer needs helps you avoid delays, rejected claims, and unnecessary back-and-forth with loss adjusters.",
    signs: ["HD video footage of the damage with time stamps", "Written report identifying the cause and severity", "Annotated screenshots of key defects", "Drainage plan showing pipe routes and damage location", "Clear distinction between sudden damage and wear and tear", "Repair specification and cost estimate from a qualified contractor"],
    diagnosis: "Our insurance-grade CCTV reports are specifically formatted to meet insurer requirements. We include cause-and-effect analysis, severity classification, and all supporting evidence in one comprehensive document that pre-empts the questions loss adjusters ask.",
    resolution: "We produce your report within 24-48 hours of the survey, allowing you to submit your claim quickly. If the insurer's loss adjuster requires a site visit, we attend and explain our findings. We work with all major UK insurers regularly.",
    ctaText: "Need a survey for an insurance claim? Our reports meet all insurer requirements.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "how-to-make-a-drain-insurance-claim",
    title: "How to Make a Drain Insurance Claim",
    metaDescription: "Step-by-step guide to making a successful drain insurance claim. Evidence needed, timelines and how to avoid common pitfalls.",
    intro: "Making a successful drain insurance claim requires the right evidence, submitted at the right time, in the right format. Many claims are delayed or rejected because homeowners don't follow the correct process. This guide walks you through each step to maximise your chances of a successful outcome.",
    signs: ["Step 1: Document the problem immediately with photos and dates", "Step 2: Report to your insurer within 24-48 hours of discovery", "Step 3: Commission a professional CCTV drain survey", "Step 4: Obtain at least two repair quotes from qualified contractors", "Step 5: Submit all evidence to your insurer together", "Step 6: Do not start major repairs until the insurer approves the work"],
    diagnosis: "The most common reason for claim delays is insufficient evidence. Our CCTV survey reports provide everything insurers need in one document — HD footage, written assessment, cause analysis, and repair recommendations. This gets your claim processed faster.",
    resolution: "Once approved, we carry out the repair work and liaise with loss adjusters throughout. We provide staged invoices if required, completion certificates, and post-repair CCTV verification. We aim to make the claims process as painless as possible.",
    ctaText: "Starting a drain insurance claim? Get the right evidence with our CCTV survey.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "shared-drain-insurance-responsibility",
    title: "Shared Drain Insurance Responsibility",
    metaDescription: "Who insures shared drains? Insurance responsibility for shared and transferred drains between neighbouring properties.",
    intro: "Insurance responsibility for shared drains depends on whether the drain has been adopted by the water company under the 2011 Private Sewer Transfer. If it has, the water company repairs it at no cost to you. If it hasn't, responsibility — and insurance — falls on the connected property owners jointly.",
    signs: ["Adopted shared drains: water company's responsibility — no insurance needed", "Non-adopted shared drains: joint responsibility of connected properties", "Your buildings insurance may cover your share of repair costs", "Some policies exclude shared drainage entirely", "Check your policy schedule for drainage exclusions and limits", "Neighbour disputes about shared drain costs are common"],
    diagnosis: "We survey and trace the drainage system to determine whether the shared drain has been adopted. Our report clearly shows pipe ownership, which helps resolve disputes between neighbours and determine whose insurance should cover the repair.",
    resolution: "If the drain is adopted, we help you report it to the water company with CCTV evidence — they fix it free. If non-adopted, we provide quotes and help each property owner understand their share. Our reports support insurance claims from either party.",
    ctaText: "Shared drain problem? Let us clarify responsibility with a professional survey.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  }
];

export const costPages: InfoPageData[] = [
  {
    slug: "drain-repair-cost",
    title: "Drain Repair Cost",
    metaDescription: "How much does drain repair cost in the UK? Price guide for common drainage repairs including relining, excavation and jetting.",
    intro: "Drain repair costs in the UK depend on the type of damage, the repair method required, and the depth and accessibility of the pipe. Here's a realistic guide to what you can expect to pay for the most common drainage repairs.",
    signs: [
      "Drain jetting and unblocking: £100–£300",
      "CCTV drain survey: £150–£400",
      "Drain relining (per metre): £80–£200",
      "Patch repair: £300–£800",
      "Excavation and pipe replacement: £1,000–£5,000+",
      "Full drain system replacement: £3,000–£15,000+",
      "Prices vary by depth, location and access"
    ],
    diagnosis: "We always recommend a CCTV drain survey before quoting for repairs. This ensures you get an accurate price based on the actual condition of your drains, not an estimate. Surveys typically cost £150–£400 depending on the system size.",
    resolution: "We provide transparent, fixed-price quotes after the CCTV survey. There are no hidden charges. If the repair is covered by insurance, we provide all documentation needed for your claim. We also offer finance options for larger repairs.",
    ctaText: "Want an accurate drain repair quote? Book a CCTV survey and we'll give you a fixed price.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "drain-excavation"]
  },
  {
    slug: "collapsed-drain-repair-cost",
    title: "Collapsed Drain Repair Cost",
    metaDescription: "How much does collapsed drain repair cost? Price ranges for excavation, relining and pipe replacement across London.",
    intro: "Collapsed drain repair is one of the more expensive drainage fixes, as it often involves excavation. However, costs vary hugely depending on the depth of the pipe, what surface it's under, and whether no-dig methods can be used.",
    signs: [
      "Shallow collapse under garden: £1,500–£3,000",
      "Collapse under driveway with reinstatement: £2,500–£5,000",
      "Collapse under house (internal excavation): £3,000–£8,000",
      "Deep collapse (3m+ depth): £5,000–£12,000+",
      "No-dig relining (if suitable): £1,000–£3,000",
      "CCTV survey required first: £150–£400"
    ],
    diagnosis: "A CCTV survey is essential before any collapsed drain repair. It determines the exact location, depth, and extent of the collapse, which directly affects the cost. We provide a detailed, itemised quote based on the survey findings.",
    resolution: "We offer both excavation and no-dig relining options where appropriate, always recommending the most cost-effective solution. All quotes are fixed-price with no hidden extras. We also assist with insurance claims to help cover the cost.",
    ctaText: "Need a collapsed drain repair quote? Book a CCTV survey for a fixed-price estimate.",
    relatedServices: ["drain-collapse-repair", "cctv-drain-surveys", "drain-relining"]
  },
  {
    slug: "cctv-drain-survey-cost",
    title: "CCTV Drain Survey Cost",
    metaDescription: "How much does a CCTV drain survey cost? Pricing for homebuyer surveys, condition reports and insurance surveys in London.",
    intro: "A CCTV drain survey is one of the most valuable investments you can make in your property's drainage. It reveals the true condition of your pipes without any digging. Here's what you can expect to pay.",
    signs: [
      "Standard residential survey: £150–£300",
      "Detailed homebuyer survey with report: £250–£400",
      "Insurance claim survey with documentation: £200–£350",
      "Large property or commercial survey: £300–£600+",
      "Drain tracing and mapping add-on: £100–£200",
      "Post-repair verification survey: often included free"
    ],
    diagnosis: "Our CCTV surveys use professional-grade camera equipment that records HD footage of the inside of your drains. The survey identifies blockages, cracks, root ingress, collapses, displaced joints, and any other defects.",
    resolution: "After the survey, you receive a full written report with annotated CCTV footage, a drainage plan showing pipe routes, and clear recommendations for any repairs needed. This report is suitable for insurance claims, property transactions, and building regulations.",
    ctaText: "Book a CCTV drain survey today. Prices from £150 with a full written report.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  },
  {
    slug: "drain-excavation-cost",
    title: "Drain Excavation Cost",
    metaDescription: "How much does drain excavation cost? Price guide for pipe replacement, reinstatement and deep excavations in London.",
    intro: "Drain excavation costs depend primarily on depth, length of pipe to replace, what's above the pipe (garden, driveway, building), and access for machinery. Here's a realistic breakdown of what drain excavation typically costs.",
    signs: [
      "Shallow excavation (under 1m): £1,000–£2,500",
      "Medium depth (1–2m): £2,000–£5,000",
      "Deep excavation (2m+): £4,000–£10,000+",
      "Under driveway with tarmac reinstatement: £2,500–£6,000",
      "Under building (internal work): £3,000–£8,000+",
      "Surface reinstatement is usually included in the quote"
    ],
    diagnosis: "Before any excavation, a CCTV survey maps the exact location and depth of the problem. This allows us to plan the most efficient excavation route, minimise the amount of digging required, and provide an accurate quote.",
    resolution: "We excavate only as much as necessary, replace the damaged pipework with modern materials, and reinstate all surfaces. Machine excavation is used where possible for efficiency, with hand-digging in sensitive areas. All work comes with a full guarantee.",
    ctaText: "Need a drain excavation quote? Start with a CCTV survey for an accurate price.",
    relatedServices: ["drain-excavation", "cctv-drain-surveys", "drain-pipe-replacement"]
  },
  {
    slug: "drain-relining-cost",
    title: "Drain Relining Cost",
    metaDescription: "How much does drain relining cost? Price guide for no-dig drain repair including patch repairs and full relining in London.",
    intro: "Drain relining is often significantly cheaper than excavation because it avoids the cost of digging, surface reinstatement, and the longer labour time involved in traditional repairs. Here's what you can realistically expect to pay for drain relining.",
    signs: [
      "Patch relining (single defect): £300–£800",
      "Full relining per metre: £80–£200",
      "Typical residential reline (5–15m): £800–£3,000",
      "Junction cuts and reconnections: £200–£500 extra",
      "Pre-reline jetting and CCTV: often included",
      "Multiple pipe runs may qualify for package pricing"
    ],
    diagnosis: "A CCTV survey determines whether relining is suitable — the pipe must be structurally sound enough to accept a liner. We measure the pipe diameter, length, and number of bends to provide an accurate fixed-price quote.",
    resolution: "We provide transparent, all-inclusive relining quotes with no hidden extras. The price covers pre-cleaning, liner material, installation, curing, and a post-reline CCTV verification survey. Relining comes with a 50+ year guarantee.",
    ctaText: "Want a drain relining quote? Book a CCTV survey for an accurate fixed price.",
    relatedServices: ["drain-relining", "cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "drain-unblocking-cost",
    title: "Drain Unblocking Cost",
    metaDescription: "How much does drain unblocking cost in the UK? Price guide for jetting, rodding and emergency unblocking services.",
    intro: "Drain unblocking costs in the UK depend on the severity of the blockage, the method required to clear it, and whether it's a routine or emergency callout. Here's a realistic guide to what professional drain unblocking typically costs.",
    signs: ["Simple rodding (accessible blockage): £80–£150", "High-pressure jetting: £150–£300", "Emergency callout (out of hours): £200–£400", "Stubborn blockage requiring mechanical cutting: £250–£500", "CCTV survey to diagnose cause: £150–£300 (often included)", "Recurring blockage investigation and repair: £500–£2,000+"],
    diagnosis: "We always investigate the cause of a blockage, not just clear it. A CCTV survey after unblocking reveals whether there's an underlying structural problem causing recurring issues — this prevents you paying for repeated clearances.",
    resolution: "We provide transparent pricing with no hidden charges. Emergency and out-of-hours callouts cost more, but we never charge a separate call-out fee when repair work is carried out. All unblocking includes a CCTV check and report.",
    ctaText: "Need a drain unblocked? Get a fixed price with no hidden charges.",
    relatedServices: ["blocked-drains", "drain-jetting", "cctv-drain-surveys"]
  },
  {
    slug: "soakaway-repair-cost",
    title: "Soakaway Repair Cost",
    metaDescription: "How much does soakaway repair or replacement cost? UK price guide for failed soakaways and drainage field replacement.",
    intro: "Soakaway repair and replacement costs vary depending on the type of soakaway, the size of your property's roof catchment area, ground conditions, and access for excavation machinery. Here's what you can realistically expect to pay.",
    signs: ["Soakaway inspection and testing: £200–£400", "Soakaway clearance and rejuvenation: £300–£800", "New crate soakaway installation (standard): £1,500–£3,000", "Large property soakaway replacement: £3,000–£5,000", "Drainage field replacement: £3,000–£8,000", "Percolation testing for planning: £300–£500"],
    diagnosis: "We inspect the existing soakaway, perform percolation tests to assess ground drainage capacity, and determine whether repair or full replacement is needed. Our report includes calculations for the correct soakaway size based on your property's requirements.",
    resolution: "We install modern crate-type soakaways that provide greater capacity and longevity than old brick or rubble designs. All installations meet current building regulations and include proper connections to your existing surface water drainage system.",
    ctaText: "Soakaway failing? Get a survey and fixed-price quote for repair or replacement.",
    relatedServices: ["drain-excavation", "cctv-drain-surveys", "drain-pipe-replacement"]
  }
];

export const inspectionPages: InfoPageData[] = [
  {
    slug: "drain-inspection",
    title: "Drain Inspection",
    metaDescription: "Professional drain inspection services across London. Visual and CCTV inspections for homes and commercial properties.",
    intro: "A professional drain inspection is the first step in understanding the condition of your drainage system. Whether you're investigating a problem, buying a property, or planning building work, our engineers provide thorough, detailed inspections.",
    signs: [
      "Recommended before purchasing a property",
      "Essential when planning building work near drains",
      "Required for insurance claims involving drainage",
      "Advisable when experiencing any drainage symptoms",
      "Useful as a periodic health check on older properties"
    ],
    diagnosis: "Our drain inspections combine visual checks of all accessible manholes, gullies, and access points with CCTV camera surveys of underground pipework. We check flow rates, pipe condition, joint integrity, and look for blockages, damage, and defects.",
    resolution: "You receive a comprehensive report detailing the condition of every section of your drainage system, with recommendations ranging from 'no action needed' to 'urgent repair required'. This report is your roadmap for maintaining healthy drains.",
    ctaText: "Book a professional drain inspection. Know the true condition of your drains.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  },
  {
    slug: "cctv-drain-inspection",
    title: "CCTV Drain Inspection",
    metaDescription: "CCTV drain inspection with HD camera footage and detailed reports. Accurate diagnosis without digging. London-wide service.",
    intro: "CCTV drain inspection is the gold standard for diagnosing drainage problems. Our high-definition cameras travel through your pipes, providing real-time footage that reveals the exact condition of your drainage system without any need for excavation.",
    signs: [
      "Identifies cracks, fractures and pipe deformation",
      "Reveals root ingress and joint displacement",
      "Locates blockages and their exact position",
      "Shows pipe material, diameter and condition grade",
      "Detects collapses, bellies and gradient issues",
      "Records everything on HD video for evidence"
    ],
    diagnosis: "We insert a specialist pan-and-tilt CCTV camera into your drainage system via manholes or access points. The camera travels the full length of each pipe run, and our engineer monitors the footage in real time, noting every defect found.",
    resolution: "After the inspection, you receive a detailed written report with annotated screenshots, a full video recording, and a drainage plan. We explain each finding in plain English and recommend the most appropriate and cost-effective repair options.",
    ctaText: "Book a CCTV drain inspection for a clear picture of your drainage system.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  },
  {
    slug: "drain-condition-reports",
    title: "Drain Condition Reports",
    metaDescription: "Professional drain condition reports for property purchases, insurance claims and building projects. Detailed CCTV reports.",
    intro: "A drain condition report is a formal document detailing the state of a property's drainage system. Based on a comprehensive CCTV survey, it's used for property transactions, insurance claims, building regulation compliance, and maintenance planning.",
    signs: [
      "Required by solicitors during property conveyancing",
      "Needed for insurance claim documentation",
      "Essential for planning applications near drains",
      "Used by landlords for property management records",
      "Required before and after building works affecting drains"
    ],
    diagnosis: "We conduct a thorough CCTV survey of the entire drainage system and produce a report conforming to WRc (Water Research Centre) standards where required. Each defect is coded, located, and assessed for severity.",
    resolution: "The completed report includes pipe schedules, defect codes, severity assessments, annotated images, video footage, and a drainage plan. We provide repair recommendations with priority ratings, giving you a clear action plan.",
    ctaText: "Need a drain condition report? Contact us for a professional CCTV survey and report.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "drain-tracing",
    title: "Drain Tracing",
    metaDescription: "Professional drain tracing to locate and map hidden drain pipes. Essential for building work and property purchases.",
    intro: "Drain tracing uses electronic sonde transmitters and signal receivers to locate and map the route of underground drain pipes. It's essential when you need to know exactly where drains run — for building work, extensions, or when drainage plans aren't available.",
    signs: [
      "No drainage plans available for the property",
      "Planning a building extension or renovation",
      "Need to locate a drain before excavation work",
      "Investigating the route of a drain causing problems",
      "Required for building over sewer applications"
    ],
    diagnosis: "We insert a sonde (electronic transmitter) into the drainage system via a CCTV camera or push rod. Above ground, we use a signal receiver to trace the pipe's route, marking it on the surface and recording the depth at regular intervals.",
    resolution: "You receive an accurate drainage plan showing pipe routes, depths, and connections overlaid on a property plan. This information is invaluable for architects, builders, and planners, and can prevent costly damage to drains during construction work.",
    ctaText: "Need to locate hidden drains? Book a professional drain tracing service.",
    relatedServices: ["cctv-drain-surveys", "drain-excavation"]
  },
  {
    slug: "drain-mapping",
    title: "Drain Mapping",
    metaDescription: "Comprehensive drain mapping services for properties in London. Accurate plans of your entire drainage system.",
    intro: "Drain mapping creates a complete, accurate plan of your property's drainage system — showing every pipe run, manhole, connection, and outlet. It's essential for property management, building projects, and resolving drainage responsibility disputes.",
    signs: [
      "Property has no existing drainage plans",
      "Multiple building extensions over the years",
      "Disputes about drainage responsibility with neighbours",
      "Required for facilities management of commercial properties",
      "Needed for planning applications and building regulations"
    ],
    diagnosis: "We combine CCTV surveys with drain tracing technology to map every pipe run, junction, and connection in your system. We record pipe diameters, materials, depths, and flow directions, and identify which pipes are private and which are public.",
    resolution: "The completed drain map is a scaled, annotated plan of your entire drainage system, suitable for architects, planners, and building control. We provide both digital and paper copies, and can overlay the drainage plan onto OS maps or site plans.",
    ctaText: "Need your drains mapped? Get a complete drainage plan for your property.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "cctv-drain-survey-for-house-buyers",
    title: "CCTV Drain Survey for House Buyers",
    metaDescription: "CCTV drain survey for house buyers. Protect your investment with a pre-purchase drain inspection before buying a property.",
    intro: "A CCTV drain survey before buying a property can save you thousands in unexpected repair bills. Standard homebuyer surveys don't inspect underground drains, yet drainage problems are one of the most expensive defects to fix after purchase.",
    signs: [
      "Standard surveys don't cover underground drainage",
      "Drain repairs can cost £1,000–£15,000+",
      "Problems may not be visible from above ground",
      "Sellers are not obliged to disclose drainage issues",
      "A drain survey provides negotiating leverage on price",
      "Essential for older properties with clay pipes"
    ],
    diagnosis: "We insert HD CCTV cameras into the drainage system to survey every pipe run. We check for cracks, collapses, root ingress, displaced joints, and other defects. The survey is non-invasive and typically takes 1–2 hours.",
    resolution: "You receive a detailed report with condition ratings for each pipe section, along with HD video footage and a drainage plan. If defects are found, we provide repair cost estimates you can use to negotiate the purchase price or request the seller fixes issues before completion.",
    ctaText: "Buying a property? Book a pre-purchase drain survey and buy with confidence.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  },
  {
    slug: "drain-survey-before-buying-house",
    title: "Drain Survey Before Buying a House",
    metaDescription: "Should you get a drain survey before buying a house? Why it's essential and what it covers. Expert advice from drainage engineers.",
    intro: "Getting a drain survey before buying a house is one of the smartest investments you can make during the conveyancing process. Hidden drainage problems are common in UK properties, especially older homes, and discovering them after you've exchanged contracts can be devastating.",
    signs: [
      "Properties over 30 years old are higher risk",
      "Houses with large trees near drain runs",
      "Properties that have had extensions or alterations",
      "Any signs of damp at ground level during viewings",
      "Previous drainage problems mentioned in property searches",
      "Properties in areas with clay soil or known subsidence"
    ],
    diagnosis: "A pre-purchase drain survey uses CCTV cameras to inspect all accessible drain runs. We produce a report that your solicitor can use in the conveyancing process, clearly flagging any defects that could affect the property's value or require future repair.",
    resolution: "If problems are found, you have options: negotiate a price reduction, ask the seller to repair before completion, factor repair costs into your offer, or in serious cases, reconsider the purchase. Our report gives you the information to make an informed decision.",
    ctaText: "Don't buy blind. Book a pre-purchase drain survey today.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "pre-purchase-drain-survey",
    title: "Pre-Purchase Drain Survey",
    metaDescription: "Pre-purchase drain survey for property buyers. Comprehensive CCTV inspection with detailed report for solicitors and buyers.",
    intro: "A pre-purchase drain survey is a comprehensive CCTV inspection of a property's drainage system, carried out before you commit to buying. It's designed to uncover hidden problems that could cost thousands to repair and that standard homebuyer surveys completely miss.",
    signs: [
      "Covers all accessible drain runs on the property",
      "Identifies defects that standard surveys miss",
      "Report is suitable for solicitors and mortgage lenders",
      "Typically completed in 1–2 hours",
      "Non-invasive — no digging or disruption",
      "Results available within 24–48 hours"
    ],
    diagnosis: "Our pre-purchase survey follows a systematic inspection protocol, checking every pipe section for structural defects, blockages, root ingress, and compliance with current building regulations. Each defect is coded and classified by severity.",
    resolution: "The report includes a clear pass/fail assessment for each section, repair cost estimates for any defects found, and priority recommendations. This gives you and your solicitor everything needed to make informed decisions about the purchase.",
    ctaText: "Protect your property investment. Book a pre-purchase drain survey.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "drain-collapse-repair"]
  },
  {
    slug: "homebuyer-drain-inspection",
    title: "Homebuyer Drain Inspection",
    metaDescription: "Homebuyer drain inspection service. Essential drainage checks before purchasing a property. Professional CCTV reports.",
    intro: "Our homebuyer drain inspection is tailored specifically for property purchasers. It goes beyond a basic survey to provide the detailed information that solicitors, mortgage lenders, and insurers require during the conveyancing process.",
    signs: [
      "Recommended by solicitors and conveyancers",
      "Accepted by mortgage lenders as supporting documentation",
      "Covers foul drainage, surface water and shared drains",
      "Includes drain tracing to map pipe routes",
      "Identifies potential future maintenance needs",
      "Provides repair cost estimates for budgeting"
    ],
    diagnosis: "We conduct a full CCTV survey of the property's drainage system, supplemented by drain tracing to map pipe routes and identify shared/public connections. Our homebuyer report is formatted for professional use in property transactions.",
    resolution: "You receive a comprehensive report that clearly states the condition of the drainage system, highlights any defects requiring attention, estimates repair costs, and provides recommendations. We're available to discuss findings with your solicitor or surveyor.",
    ctaText: "Buying a home? Get a professional drain inspection for peace of mind.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "drain-collapse-repair"]
  }
];

export const causePages: InfoPageData[] = [
  {
    slug: "tree-roots-in-drains",
    title: "Tree Roots in Drains",
    metaDescription: "How tree roots damage drains and what to do about it. Root removal, relining and prevention advice from drainage experts.",
    intro: "Tree roots are one of the most common causes of drain damage in the UK. Roots naturally seek out moisture and nutrients, and the joints and cracks in older drain pipes provide the perfect entry point. Once inside, roots grow rapidly, blocking the pipe and eventually causing it to collapse.",
    signs: [
      "Recurring blockages, especially in autumn and spring",
      "Slow drainage that gradually worsens",
      "Gurgling sounds from drains",
      "Sewage smells near trees or large shrubs",
      "Sinkholes near established trees",
      "CCTV shows fibrous material in the pipe"
    ],
    diagnosis: "A CCTV drain survey clearly shows root ingress — you can see the roots penetrating joints and cracks on camera. We assess the extent of the intrusion and whether the roots have caused structural damage to the pipe beyond simply blocking it.",
    resolution: "We remove roots using mechanical cutting equipment and high-pressure jetting, then reline the affected pipe sections to seal all joints against future root entry. For severe cases where the pipe has been structurally compromised, excavation and replacement may be needed.",
    ctaText: "Tree roots in your drains? We'll remove them and stop them coming back.",
    relatedServices: ["drain-root-removal", "drain-relining", "cctv-drain-surveys"]
  },
  {
    slug: "ground-movement",
    title: "Ground Movement Damaging Pipes",
    metaDescription: "How ground movement damages drain pipes. Causes, signs and repair solutions for drains affected by subsidence and clay shrinkage.",
    intro: "Ground movement — whether from clay soil shrinkage, subsidence, heavy traffic, or nearby construction — puts enormous stress on underground drain pipes. Rigid clay and concrete pipes are particularly vulnerable, cracking and displacing at joints under ground pressure.",
    signs: [
      "Cracks in walls or foundations (indicating ground movement)",
      "Drain problems that appeared after a dry summer",
      "Issues following nearby building or roadworks",
      "Properties on clay soil are especially vulnerable",
      "Displaced pipe joints visible on CCTV surveys",
      "Pipe deformation (ovality) showing ground pressure"
    ],
    diagnosis: "CCTV surveys reveal the telltale signs of ground movement damage — displaced joints, cracks along the pipe length, pipe deformation, and fractures. We assess whether the movement is ongoing or historic, which affects the repair approach.",
    resolution: "For displaced joints and cracks, drain relining is highly effective as the flexible liner accommodates minor future movement. For severely crushed or deformed pipes, excavation and replacement with flexible plastic pipes provides a long-term solution resistant to further ground movement.",
    ctaText: "Ground movement damaged your drains? Get a CCTV survey to assess the damage.",
    relatedServices: ["drain-relining", "drain-excavation", "cctv-drain-surveys"]
  },
  {
    slug: "old-clay-drain-pipes",
    title: "Old Clay Drain Pipes",
    metaDescription: "Problems with old clay drain pipes. Why Victorian clay drains fail and modern repair solutions including relining.",
    intro: "Many London properties still rely on the original Victorian clay drain pipes installed 80–150 years ago. While clay is durable, these old pipes have vulnerabilities — mortar joints that crack and separate, walls that erode over time, and a brittle nature that doesn't tolerate ground movement.",
    signs: [
      "Property built before 1960 with original drainage",
      "Recurring blockages at the same point",
      "Root ingress through deteriorated mortar joints",
      "Visible damage at manholes — cracked, chipped clay pipes",
      "Slow drainage that's gradually worsened over years",
      "CCTV survey showing joint displacement and erosion"
    ],
    diagnosis: "A CCTV survey of old clay pipes typically reveals multiple defects — displaced joints, root ingress, erosion, and often partial collapses. We assess each section and provide a condition rating to prioritise repairs.",
    resolution: "Drain relining is ideal for old clay pipes — the seamless liner seals all joints, covers cracks, and creates a smooth new bore inside the old pipe. For sections that have fully collapsed or are too deformed, targeted excavation replaces just the worst sections while relining handles the rest.",
    ctaText: "Old clay drains causing problems? A CCTV survey will reveal their true condition.",
    relatedServices: ["drain-relining", "cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "building-work-damage",
    title: "Building Work Damaging Drains",
    metaDescription: "How building work damages drains. Protect your drainage during construction and repair damage caused by builders.",
    intro: "Building work — from extensions and loft conversions to landscaping and driveway installations — is a common cause of drain damage. Heavy machinery, excavation near pipe runs, and increased load from new structures can crack, crush, or displace underground pipes.",
    signs: [
      "Drainage problems that appeared during or after building work",
      "New extension or structure built over drain runs",
      "Heavy machinery was used near known drain routes",
      "Piling or deep foundations installed near drains",
      "New paving or structures adding weight above drain pipes",
      "Builders accidentally broke into a drain during excavation"
    ],
    diagnosis: "We use CCTV surveys to assess damage caused by building work, documenting all defects with footage and location data. This evidence is essential if you need to make a claim against a builder's insurance or your own policy.",
    resolution: "We repair building work damage using the most appropriate method — relining for cracked or displaced joints, excavation for crushed or collapsed sections. We also advise on drain protection measures for ongoing building projects to prevent further damage.",
    ctaText: "Building work damaged your drains? Let us assess and repair the damage.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-pipe-replacement"]
  }
];

export const commercialDrainagePages: InfoPageData[] = [
  {
    slug: "commercial-drain-cleaning",
    title: "Commercial Drain Cleaning",
    metaDescription: "Professional commercial drain cleaning for offices, retail and industrial premises. Planned maintenance and emergency services.",
    intro: "Commercial properties generate more drainage demand than residential homes, and blockages can cause costly business disruption. Our commercial drain cleaning service provides both scheduled maintenance and emergency response to keep your business drainage flowing.",
    signs: [
      "Slow-draining sinks in staff kitchens or washrooms",
      "Foul smells from floor drains or gullies",
      "Overflowing external drains or car park gullies",
      "Health inspector recommendations for drain maintenance",
      "Repeated callouts for the same drainage issue"
    ],
    diagnosis: "We survey your commercial drainage system to identify problem areas and create a maintenance plan. Regular CCTV inspections track pipe condition over time and catch developing problems before they cause emergencies.",
    resolution: "Our commercial cleaning service includes high-pressure jetting of all drain runs, gully cleaning, interceptor maintenance, and CCTV verification surveys. We work outside business hours to minimise disruption and provide detailed maintenance records.",
    ctaText: "Keep your business drains flowing. Contact us about commercial maintenance contracts.",
    relatedServices: ["commercial-drainage", "drain-jetting", "cctv-drain-surveys"]
  },
  {
    slug: "restaurant-drain-cleaning",
    title: "Restaurant Drain Cleaning",
    metaDescription: "Specialist restaurant drain cleaning and grease trap maintenance. Prevent blockages and stay compliant with hygiene regulations.",
    intro: "Restaurant and food service drains are under constant attack from fat, oil, and grease (FOG). Without regular professional cleaning, these substances solidify in pipes, causing blockages that can shut down your kitchen and create health hazard risks.",
    signs: [
      "Slow-draining kitchen sinks and floor drains",
      "Grease buildup visible in drain gullies",
      "Foul smells from kitchen drainage",
      "Drain flies appearing in the kitchen",
      "Environmental health concerns about drainage",
      "Grease trap overflowing or not functioning properly"
    ],
    diagnosis: "We inspect kitchen drainage systems including grease traps, waste pipes, and underground drains. We assess the level of FOG buildup and check compliance with food hygiene regulations and environmental discharge requirements.",
    resolution: "Our restaurant drain service includes hot-water jetting to dissolve and remove grease buildup, grease trap emptying and cleaning, and bio-dosing to break down residual fat. We set up a regular maintenance schedule to prevent blockages and keep you compliant.",
    ctaText: "Keep your restaurant drains clean and compliant. Set up a maintenance plan today.",
    relatedServices: ["commercial-drainage", "drain-jetting", "blocked-drains"]
  },
  {
    slug: "commercial-drain-jetting",
    title: "Commercial Drain Jetting",
    metaDescription: "High-pressure commercial drain jetting for businesses and industrial sites. Clear blockages and maintain drainage systems.",
    intro: "Commercial drain jetting uses industrial-grade high-pressure water equipment to clear blockages and clean drains in commercial and industrial settings. With higher pressures and flow rates than domestic equipment, it handles the toughest commercial drainage challenges.",
    signs: [
      "Large-diameter pipes requiring industrial equipment",
      "Heavy grease, scale or sediment buildup",
      "Blockages that domestic jetting can't clear",
      "Preventative maintenance for high-use drainage systems",
      "Pre-CCTV cleaning to enable accurate surveys"
    ],
    diagnosis: "We assess the pipe sizes, materials, and blockage types to determine the correct jetting pressure and nozzle configuration. Different commercial situations require different approaches — from high-pressure cutting heads for root removal to specialised grease-dissolving nozzles.",
    resolution: "Our commercial jetting vehicles carry tanks up to 2,000 litres and pumps delivering up to 4,000 PSI. We clear blockages, descale pipes, remove root intrusion, and leave drains cleaner than any other method. Regular jetting schedules prevent problems before they start.",
    ctaText: "Need commercial-grade drain jetting? Contact us for a quote or maintenance plan.",
    relatedServices: ["commercial-drainage", "drain-jetting", "blocked-drains"]
  },
  {
    slug: "grease-trap-cleaning",
    title: "Grease Trap Cleaning",
    metaDescription: "Professional grease trap cleaning and maintenance for restaurants and commercial kitchens. Stay compliant and prevent blockages.",
    intro: "Grease traps are essential for commercial kitchens, separating fats, oils, and grease from wastewater before it enters the drainage system. Without regular cleaning, grease traps overflow, lose effectiveness, and cause blockages, odours, and regulatory non-compliance.",
    signs: [
      "Grease trap approaching full capacity",
      "Foul smells coming from the grease trap",
      "Grease bypassing the trap into the drainage system",
      "Slow drainage from kitchen fixtures",
      "Environmental health inspection due",
      "More than 3 months since last grease trap service"
    ],
    diagnosis: "We inspect the grease trap, assess its capacity and condition, and check whether it's appropriately sized for your kitchen's output. We also inspect downstream drainage to check for grease that may have bypassed the trap.",
    resolution: "We pump out and clean the grease trap, removing all accumulated FOG. We inspect the baffles and seals, make any necessary repairs, and dispose of the waste in compliance with environmental regulations. We set up a regular schedule based on your kitchen's usage.",
    ctaText: "Due a grease trap clean? Book a service and stay compliant.",
    relatedServices: ["commercial-drainage", "drain-jetting", "blocked-drains"]
  }
];

export const emergencyServicePages: InfoPageData[] = [
  {
    slug: "emergency-drain-repair",
    title: "Emergency Drain Repair",
    metaDescription: "24/7 emergency drain repair across London. Fast response for collapsed drains, flooding and sewage emergencies.",
    intro: "When a drain fails catastrophically — causing flooding, sewage backup, or structural concerns — you need immediate professional help. Our emergency drain repair service operates around the clock, every day of the year, with engineers on standby across London.",
    signs: [
      "Sewage flooding into your property",
      "Complete drainage failure — nothing draining at all",
      "Ground collapsing above a drain run",
      "Sewage backing up through toilets or drains",
      "Sudden severe damp or water damage",
      "Foul sewage odour requiring immediate investigation"
    ],
    diagnosis: "Our emergency engineers arrive with portable CCTV equipment to quickly diagnose the cause. Whether it's a collapse, a major blockage, or a pipe failure, we identify the problem and explain your options within minutes of arriving.",
    resolution: "We carry out immediate emergency repairs to stop flooding and contain the problem. Depending on the situation, this may include emergency jetting, temporary pipe repairs, or same-day excavation for critical collapses. We then schedule permanent repairs if additional work is needed.",
    ctaText: "Drainage emergency? Call our 24/7 line now for immediate help.",
    relatedServices: ["emergency-drainage", "drain-collapse-repair", "drain-excavation"]
  },
  {
    slug: "emergency-drain-unblocking",
    title: "Emergency Drain Unblocking",
    metaDescription: "Emergency drain unblocking 24/7 across London. Fast response for overflowing drains, blocked toilets and sewage emergencies.",
    intro: "A completely blocked drain can cause sewage to back up into your property within hours, creating a health hazard and causing damage. Our emergency unblocking service provides rapid response to clear blockages before they escalate into serious problems.",
    signs: [
      "Toilet completely blocked and overflowing",
      "All drains in the property backing up simultaneously",
      "Sewage coming up through shower or bath drains",
      "External drains overflowing onto the property",
      "Water rising in manholes",
      "Multiple fixtures blocked at the same time"
    ],
    diagnosis: "We quickly assess where the blockage is located — whether it's a local issue in one fixture or a main drain blockage affecting the whole property. High-pressure jetting equipment and CCTV cameras are used to locate and diagnose the cause.",
    resolution: "We clear the blockage using high-pressure jetting, then carry out a CCTV survey to check whether the blockage was caused by an underlying problem like a collapse or root ingress. If structural damage is found, we provide a quote for permanent repair.",
    ctaText: "Blocked drain emergency? Call us 24/7 for fast unblocking.",
    relatedServices: ["emergency-drainage", "blocked-drains", "drain-jetting"]
  },
  {
    slug: "24-hour-drain-engineer",
    title: "24 Hour Drain Engineer",
    metaDescription: "24-hour drain engineer service across London. Qualified drainage engineers available day and night for emergencies.",
    intro: "Our qualified drain engineers are available 24 hours a day, 7 days a week, 365 days a year. Whether it's a blocked drain at midnight, a collapsed pipe on Christmas Day, or a sewage emergency on a bank holiday, we're here to help.",
    signs: [
      "Drainage problem outside normal business hours",
      "Emergency that can't wait until morning",
      "Weekend or bank holiday drainage failure",
      "Commercial premises needing immediate drainage assistance",
      "Tenants reporting urgent drainage issues",
      "Insurance company requiring emergency attendance"
    ],
    diagnosis: "Our 24-hour engineers carry full diagnostic equipment including CCTV cameras, drain rods, and pressure testing gear. They can diagnose most problems on the first visit and provide clear recommendations for resolution.",
    resolution: "Most emergency callouts are resolved in a single visit. Our engineers carry common parts and have access to jetting equipment for immediate blockage clearing. For complex repairs, we provide temporary containment and schedule permanent work for the earliest available slot.",
    ctaText: "Need a drain engineer now? Call our 24/7 hotline for immediate dispatch.",
    relatedServices: ["emergency-drainage", "blocked-drains", "drain-collapse-repair"]
  }
];

export const repairMethodPages: InfoPageData[] = [
  {
    slug: "drain-relining-vs-excavation",
    title: "Drain Relining vs Excavation",
    metaDescription: "Drain relining vs excavation — which is right for your drain repair? Compare costs, timelines and suitability. Expert advice.",
    intro: "When a drain needs repairing, the two main options are no-dig relining and traditional excavation. Both are effective, but they suit different situations. Understanding the pros and cons of each helps you make an informed decision — and potentially save thousands.",
    signs: [
      "Relining: no digging, faster, less expensive for suitable pipes",
      "Excavation: necessary for fully collapsed or severely damaged pipes",
      "Relining suits cracks, displaced joints, root damage, partial collapse",
      "Excavation suits full collapse, crushed pipes, gradient correction",
      "Relining: typically £800–£3,000 for residential jobs",
      "Excavation: typically £1,500–£10,000+ depending on depth and location"
    ],
    diagnosis: "A CCTV survey determines which method is appropriate. We assess pipe condition, diameter, access, and the type of damage to recommend the most cost-effective solution. In some cases, a combination of both methods is the best approach.",
    resolution: "We always recommend the least disruptive, most cost-effective option. If relining is suitable, we use it. If excavation is necessary, we keep it targeted. Many jobs use relining for most of the pipe run with a short excavation for the worst section.",
    ctaText: "Not sure which method you need? Book a CCTV survey and we'll advise you.",
    relatedServices: ["drain-relining", "drain-excavation", "cctv-drain-surveys"]
  },
  {
    slug: "how-drain-relining-works",
    title: "How Drain Relining Works",
    metaDescription: "How drain relining works — step-by-step guide to no-dig drain repair. The process, materials and results explained by experts.",
    intro: "Drain relining creates a brand-new pipe inside your existing damaged drain without any digging. A resin-saturated felt liner is inserted into the pipe, inflated against the pipe walls, and cured to form a seamless, jointless new pipe. Here's exactly how the process works.",
    signs: [
      "Step 1: CCTV survey to assess pipe condition and suitability",
      "Step 2: High-pressure jetting to clean the pipe thoroughly",
      "Step 3: Measure and prepare the resin-impregnated liner",
      "Step 4: Insert the liner into the pipe using air pressure",
      "Step 5: Inflate the liner against the pipe walls",
      "Step 6: Cure using UV light or ambient temperature, then verify with CCTV"
    ],
    diagnosis: "Not all pipes are suitable for relining. The pipe must retain enough of its circular shape to accept a liner, and there must be sufficient access points. Our CCTV survey determines suitability and identifies any preparation work needed.",
    resolution: "The finished reline creates a smooth, jointless pipe within your existing drain. It seals cracks, bridges displaced joints, and prevents root re-entry. The liner has a 50+ year design life and comes with a full guarantee.",
    ctaText: "Interested in no-dig drain repair? Book a CCTV survey to check if relining is suitable.",
    relatedServices: ["drain-relining", "cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "how-long-do-drain-repairs-take",
    title: "How Long Do Drain Repairs Take?",
    metaDescription: "How long do drain repairs take? Timelines for relining, excavation, jetting and emergency repairs. Plan your drainage work.",
    intro: "The duration of a drain repair depends on the method used, the extent of damage, and the accessibility of the pipe. Here's a realistic guide to how long different types of drain repair take, so you can plan accordingly.",
    signs: [
      "Drain unblocking/jetting: 1–3 hours",
      "CCTV drain survey: 1–2 hours",
      "Drain relining (residential): half day to full day",
      "Simple excavation repair: 1–2 days",
      "Complex excavation (deep/under building): 2–5 days",
      "Full drainage system replacement: 1–2 weeks"
    ],
    diagnosis: "We provide accurate timescales after the initial CCTV survey, because the survey reveals exactly what work is needed. We schedule work to minimise disruption and can often complete residential repairs in a single day.",
    resolution: "We work efficiently to complete repairs as quickly as possible without compromising quality. For emergency situations, we provide same-day service. For planned repairs, we schedule at a time that suits you and keep you informed of progress throughout.",
    ctaText: "Need to know how long your repair will take? Book a survey for an accurate timeline.",
    relatedServices: ["drain-relining", "drain-excavation", "emergency-drainage"]
  },
  {
    slug: "is-drain-relining-worth-it",
    title: "Is Drain Relining Worth It?",
    metaDescription: "Is drain relining worth it? Costs, benefits, lifespan and when relining is the right choice. Honest advice from drainage engineers.",
    intro: "Drain relining is often presented as the modern, superior alternative to excavation — but is it always worth it? The honest answer is: usually yes, but not always. Here's a balanced assessment to help you decide whether relining is the right investment for your situation.",
    signs: [
      "Relining costs 30–60% less than excavation for equivalent repairs",
      "No surface disruption — gardens, driveways and patios are untouched",
      "50+ year lifespan with manufacturer guarantees",
      "Completed in hours rather than days",
      "Not suitable for fully collapsed or severely deformed pipes",
      "Quality depends heavily on the contractor's skill and equipment"
    ],
    diagnosis: "We always conduct a CCTV survey first and give you an honest assessment. If relining is suitable, we recommend it. If it's not — for example, if the pipe has fully collapsed — we'll tell you and suggest the right alternative.",
    resolution: "When relining is suitable, it offers excellent value: lower cost, faster completion, less disruption, and a long-lasting result. We use high-quality epoxy resin liners and UV curing technology for the most durable results.",
    ctaText: "Want honest advice about relining? Book a CCTV survey and we'll tell you straight.",
    relatedServices: ["drain-relining", "cctv-drain-surveys", "drain-excavation"]
  },
  {
    slug: "drain-repair-methods-explained",
    title: "Drain Repair Methods Explained",
    metaDescription: "Drain repair methods explained — relining, excavation, patch repair, pipe bursting and more. Which method is right for you?",
    intro: "Modern drainage engineering offers several repair methods, each suited to different types of damage and situations. Understanding the options available helps you ask the right questions and make informed decisions when your drainage engineer recommends a repair approach.",
    signs: [
      "Drain relining: no-dig repair creating a new pipe inside the old one",
      "Excavation and replacement: digging up and replacing damaged sections",
      "Patch relining: targeted repair of a single defect without full relining",
      "Pipe bursting: breaking the old pipe while pulling a new one through",
      "Drain jetting: high-pressure cleaning for blockages and maintenance",
      "Root cutting: mechanical removal of tree roots from inside pipes"
    ],
    diagnosis: "The correct repair method depends on the type of damage, pipe material, diameter, depth, and what's above the pipe. A CCTV survey provides all this information, allowing us to recommend the most appropriate and cost-effective method.",
    resolution: "We're equipped for every repair method and always recommend the best approach for your specific situation — not just the one we prefer. We explain the options clearly, including pros, cons, and costs, so you can make an informed choice.",
    ctaText: "Need drain repair advice? Book a CCTV survey and we'll recommend the best approach.",
    relatedServices: ["drain-relining", "drain-excavation", "cctv-drain-surveys"]
  },
  {
    slug: "patch-repair-vs-relining",
    title: "Patch Repair vs Relining",
    metaDescription: "Patch repair vs full drain relining — when to use each method, cost comparison and which gives the best long-term result.",
    intro: "When a CCTV survey reveals damage to your drain, two no-dig options are often available: a targeted patch repair or a full-length reline. Both avoid excavation, but they suit different situations and budgets. Understanding the differences helps you make the right choice.",
    signs: [
      "Patch repair: fixes a single defect (crack, displaced joint, small hole)",
      "Full relining: repairs the entire pipe length in one go",
      "Patch repair cost: £300–£800 per patch",
      "Full relining cost: £800–£3,000 for typical residential pipe",
      "Patch is faster (1–2 hours) but only addresses one problem",
      "Full reline provides a seamless, jointless pipe with 50+ year lifespan"
    ],
    diagnosis: "A CCTV survey determines which approach is best. If there's a single isolated defect in otherwise good pipe, a patch repair is cost-effective. If the pipe has multiple defects, deteriorating joints, or widespread cracking, full relining is the better investment.",
    resolution: "We recommend patch repairs when there's genuinely only one problem point. For pipes with multiple defects — common in older clay drainage — full relining provides better value and a longer-lasting result. We always explain both options and let you choose.",
    ctaText: "Not sure which repair you need? Book a CCTV survey for honest, expert advice.",
    relatedServices: ["drain-relining", "cctv-drain-surveys", "drain-collapse-repair"]
  },
  {
    slug: "when-drain-excavation-is-needed",
    title: "When Drain Excavation Is Needed",
    metaDescription: "When is drain excavation necessary? Situations where no-dig methods won't work and traditional excavation is the only option.",
    intro: "While no-dig methods like relining have transformed drain repair, there are situations where traditional excavation remains the only viable solution. Understanding when excavation is necessary helps you plan for the cost, timeline, and disruption involved.",
    signs: [
      "Complete pipe collapse where the bore is fully blocked",
      "Severely deformed or crushed pipes that can't accept a liner",
      "Pipe gradient correction — relining can't fix a belly or dip",
      "Pipe diameter needs increasing for building regulations",
      "New connections required to the drainage system",
      "Contaminated ground requiring removal around the pipe"
    ],
    diagnosis: "A CCTV survey reveals whether excavation is necessary. If the camera can't pass through a section, it usually indicates a full collapse requiring excavation. We also assess pipe deformation — if ovality exceeds 10%, relining may not be suitable.",
    resolution: "When excavation is needed, we plan the work carefully to minimise disruption. We use machine excavation where possible for speed, hand-dig in sensitive areas, and reinstate all surfaces to their original condition. Excavation comes with a full guarantee on materials and workmanship.",
    ctaText: "Need to know if excavation is required? A CCTV survey gives you a definitive answer.",
    relatedServices: ["drain-excavation", "drain-collapse-repair", "cctv-drain-surveys"]
  }
];

export const propertyPages: InfoPageData[] = [
  {
    slug: "collapsed-drains-for-landlords",
    title: "Collapsed Drains for Landlords",
    metaDescription: "Landlord guide to collapsed drains. Your responsibilities, repair options and how to manage tenant drainage issues.",
    intro: "As a landlord, you're legally responsible for maintaining the structural integrity of your rental property — and that includes the drainage system. A collapsed drain can make a property uninhabitable, creating legal obligations to your tenants and potential liability issues.",
    signs: [
      "Tenants reporting persistent drainage problems",
      "Multiple callouts for the same drainage issue",
      "Damp complaints at ground floor level",
      "Sewage smells reported by tenants",
      "Property failing HMO licensing inspections due to drainage",
      "Insurance claims related to drainage defects"
    ],
    diagnosis: "We provide landlord-specific drainage surveys that document the condition of your property's drainage system. Our reports include priority ratings for any defects found, repair cost estimates, and recommendations for planned maintenance vs urgent repair.",
    resolution: "We offer flexible scheduling to minimise tenant disruption, provide detailed reports for your property management records, and can set up planned maintenance contracts to prevent emergency situations. All work is guaranteed and insured.",
    ctaText: "Landlord with drainage problems? Get a professional survey and repair plan.",
    relatedServices: ["cctv-drain-surveys", "drain-collapse-repair", "drain-relining"]
  },
  {
    slug: "drainage-problems-commercial-properties",
    title: "Drainage Problems in Commercial Properties",
    metaDescription: "Commercial property drainage problems. Specialist diagnosis and repair for offices, retail and industrial premises.",
    intro: "Drainage problems in commercial properties can cause business interruption, health and safety issues, and regulatory non-compliance. The scale and complexity of commercial drainage systems requires specialist knowledge and equipment that goes beyond residential services.",
    signs: [
      "Recurring blockages disrupting business operations",
      "Sewage smells affecting customers or staff",
      "Drainage failing environmental health inspections",
      "Insurance requirements for drainage maintenance records",
      "Flooding affecting stock, equipment or premises",
      "Multiple units or tenants affected by shared drainage"
    ],
    diagnosis: "We conduct comprehensive commercial drainage surveys covering all foul and surface water systems. Our reports meet the requirements of facilities managers, landlords, and regulatory bodies, with coded defect schedules and priority recommendations.",
    resolution: "We provide both emergency repairs and planned maintenance for commercial properties. Our commercial team works outside business hours to minimise disruption, and we offer maintenance contracts with priority response guarantees.",
    ctaText: "Commercial drainage problems? Contact our commercial team for specialist support.",
    relatedServices: ["commercial-drainage", "cctv-drain-surveys", "drain-jetting"]
  },
  {
    slug: "drain-repairs-for-property-managers",
    title: "Drain Repairs for Property Managers",
    metaDescription: "Drainage services for property managers. Surveys, repairs and maintenance across multiple properties with detailed reporting.",
    intro: "Property managers need reliable, responsive drainage contractors who can handle multiple properties, provide detailed reporting, and work within managed service frameworks. We work with property management companies across London, providing consistent, documented drainage services.",
    signs: [
      "Managing drainage across a portfolio of properties",
      "Need for consistent reporting across all sites",
      "Tenant complaints about drainage requiring fast response",
      "Planned maintenance schedules for drainage systems",
      "Compliance requirements for drainage documentation",
      "Budget planning requiring accurate cost forecasting"
    ],
    diagnosis: "We provide portfolio-wide drainage surveys with standardised reporting, allowing you to compare conditions across properties and prioritise spending. Our reports integrate with common property management systems and meet compliance requirements.",
    resolution: "We offer dedicated account management for property portfolios, with agreed response times, standardised pricing, and consolidated invoicing. Regular maintenance schedules prevent emergency callouts and help you plan budgets accurately.",
    ctaText: "Managing multiple properties? Set up a drainage maintenance contract.",
    relatedServices: ["cctv-drain-surveys", "commercial-drainage", "drain-relining"]
  },
  {
    slug: "drain-surveys-for-developers",
    title: "Drain Surveys for Developers",
    metaDescription: "Drain surveys for property developers. Pre-development surveys, condition reports and drainage design support.",
    intro: "Property developers need accurate drainage information before, during, and after construction. From pre-purchase due diligence to final handover surveys, our services support every stage of the development process.",
    signs: [
      "Acquiring a site and need drainage due diligence",
      "Planning an application requiring drainage impact assessment",
      "Need to locate existing drains before construction",
      "Building over or near public sewers requiring approvals",
      "Post-construction drainage sign-off required",
      "Adoption applications for new drainage systems"
    ],
    diagnosis: "We provide developer-grade drainage surveys including full CCTV inspection, drain tracing and mapping, flow testing, and connection surveys. Our reports meet planning authority and building control requirements.",
    resolution: "We support developers throughout the project lifecycle — from initial site surveys through to post-construction CCTV and adoption applications. We liaise with water companies on your behalf for build-over agreements and new connections.",
    ctaText: "Developer needing drainage surveys? Contact us for specialist support.",
    relatedServices: ["cctv-drain-surveys", "drain-excavation", "drain-pipe-replacement"]
  }
];

// Property type drainage pages
export const propertyTypePages: InfoPageData[] = [
  {
    slug: "drains-in-victorian-houses",
    title: "Drains in Victorian Houses",
    metaDescription: "Common drainage problems in Victorian houses. Old clay pipes, root damage and repair solutions for period properties.",
    intro: "Victorian houses — built between 1837 and 1901 — typically have original clay drainage systems that are now 120–180 years old. These ageing pipes are prone to joint displacement, root ingress, and collapse. If you own a Victorian property, understanding your drainage system helps you plan maintenance and avoid expensive emergencies.",
    signs: [
      "Original clay pipes with lime mortar joints that crack and separate",
      "Tree roots penetrating through deteriorated pipe joints",
      "Recurring blockages caused by debris catching on displaced joints",
      "Shallow pipe runs vulnerable to ground movement and frost",
      "Undersized pipes that don't meet modern flow requirements",
      "Brick-built manholes and inspection chambers deteriorating with age"
    ],
    diagnosis: "We conduct a comprehensive CCTV survey of your Victorian drainage system, assessing every pipe section and joint. Our report includes a condition rating for each section and highlights priority repairs. For Victorian properties, we also check for redundant cesspits and soakaways that may still be connected.",
    resolution: "Drain relining is ideal for Victorian clay pipes — the seamless liner seals all joints, covers cracks, and creates a smooth new bore. For collapsed sections, targeted excavation replaces the worst areas. We can modernise your Victorian drainage system without disturbing period features.",
    ctaText: "Own a Victorian house? Get a drainage health check with a CCTV survey.",
    relatedServices: ["cctv-drain-surveys", "drain-relining", "drain-collapse-repair"],
    relatedPages: [
      { slug: "old-clay-drain-pipes", category: "causes", title: "Old Clay Drain Pipes" },
      { slug: "tree-roots-in-drains", category: "causes", title: "Tree Roots in Drains" },
      { slug: "cctv-drain-survey-cost", category: "costs", title: "CCTV Survey Cost" },
      { slug: "how-drain-relining-works", category: "repair-methods", title: "How Drain Relining Works" },
      { slug: "drain-relining-cost", category: "costs", title: "Drain Relining Cost" }
    ]
  },
  {
    slug: "drainage-problems-in-new-builds",
    title: "Drainage Problems in New Builds",
    metaDescription: "Common drainage problems in new build homes. Construction defects, poor installation and warranty claims for new properties.",
    intro: "New build homes should have perfect drainage, but construction defects are surprisingly common. Rushed installations, inadequate supervision, and poor workmanship can leave you with drainage problems within months of moving in. Knowing your rights and identifying issues early protects your investment.",
    signs: [
      "Slow drainage from multiple fixtures despite new pipework",
      "Gurgling sounds from drains — often a sign of poor venting",
      "Sewage smells that shouldn't exist in a new property",
      "Standing water in the garden near drainage routes",
      "Damp patches at ground floor level",
      "Drainage problems appearing within the first 1–2 years"
    ],
    diagnosis: "We conduct an independent CCTV drain survey to identify construction defects. Common findings include pipes installed at incorrect gradients, poorly sealed joints, pipes damaged during backfill operations, and connections that don't meet building regulations. Our report provides evidence for warranty claims.",
    resolution: "If your new build is within its NHBC or equivalent warranty period, our report supports your claim against the builder. We document all defects to building regulation standards and can liaise with the builder, warranty provider, or building control on your behalf. For urgent issues, we carry out repairs directly.",
    ctaText: "New build drainage problems? Get an independent CCTV survey for warranty evidence.",
    relatedServices: ["cctv-drain-surveys", "drain-pipe-replacement", "drain-jetting"],
    relatedPages: [
      { slug: "building-work-damage", category: "causes", title: "Building Work Damage" },
      { slug: "drain-mapping", category: "inspection", title: "Drain Mapping" },
      { slug: "cctv-drain-survey-cost", category: "costs", title: "CCTV Survey Cost" },
      { slug: "drain-repair-methods-explained", category: "repair-methods", title: "Repair Methods Explained" },
      { slug: "drain-repair-cost", category: "costs", title: "Drain Repair Cost" }
    ]
  },
  {
    slug: "drains-in-flats",
    title: "Drains in Flats",
    metaDescription: "Drainage problems in flats and apartments. Shared drains, responsibility and repair solutions for flat owners and tenants.",
    intro: "Drainage in flats and apartments is more complex than in houses because multiple properties share the same drainage infrastructure. Understanding which drains are your responsibility, which belong to the freeholder, and which are the water company's is essential when problems arise.",
    signs: [
      "Blockages caused by other residents in your building",
      "Shared waste stacks serving multiple flats",
      "Confusion about who is responsible for repairs",
      "Drainage problems in ground floor flats from upper floor waste",
      "Communal drainage that nobody maintains",
      "Service charges that don't adequately cover drainage maintenance"
    ],
    diagnosis: "We survey the drainage system serving your flat and the wider building, clearly mapping which pipes serve your property exclusively and which are shared. This determines responsibility and helps resolve disputes between leaseholders, freeholders, and managing agents.",
    resolution: "For pipes within your flat, we carry out repairs directly. For shared drainage, we provide reports and quotes that your managing agent or freeholder can act on. We work with management companies across London, providing planned maintenance for blocks of flats.",
    ctaText: "Drainage problems in your flat? Let us survey and clarify responsibility.",
    relatedServices: ["cctv-drain-surveys", "drain-jetting", "blocked-drains"],
    relatedPages: [
      { slug: "shared-drain-responsibility", category: "insurance", title: "Shared Drain Responsibility" },
      { slug: "who-is-responsible", category: "insurance", title: "Who Is Responsible?" },
      { slug: "cctv-drain-survey-cost", category: "costs", title: "CCTV Survey Cost" },
      { slug: "drain-repair-methods-explained", category: "repair-methods", title: "Repair Methods Explained" },
      { slug: "drain-repair-cost", category: "costs", title: "Drain Repair Cost" }
    ]
  },
  {
    slug: "drains-in-commercial-properties",
    title: "Drains in Commercial Properties",
    metaDescription: "Commercial property drainage guide. Common problems, maintenance requirements and repair solutions for business premises.",
    intro: "Commercial properties face unique drainage challenges due to higher usage volumes, grease and chemical waste, complex pipe networks, and strict regulatory requirements. Whether you're a business owner, facilities manager, or commercial landlord, maintaining your drainage system is essential for business continuity and compliance.",
    signs: [
      "Higher drainage volumes than residential systems are designed for",
      "Grease, fat and food waste from commercial kitchens",
      "Chemical waste from industrial or cleaning processes",
      "Multiple tenants sharing drainage infrastructure",
      "Regulatory requirements for drainage maintenance records",
      "Business interruption risk from drainage failures"
    ],
    diagnosis: "We conduct comprehensive commercial drainage surveys covering all foul and surface water systems. Our reports include coded defect schedules, priority ratings, and compliance assessments. We provide surveys suitable for facilities managers, landlords, and regulatory bodies.",
    resolution: "We offer planned maintenance contracts with scheduled jetting, CCTV inspections, and grease trap servicing. Emergency response is available 24/7 with priority for contract clients. All work is documented with detailed reports for your compliance records.",
    ctaText: "Need commercial drainage support? Contact our commercial team today.",
    relatedServices: ["commercial-drainage", "drain-jetting", "cctv-drain-surveys"],
    relatedPages: [
      { slug: "commercial-drain-cleaning", category: "commercial", title: "Commercial Drain Cleaning" },
      { slug: "grease-trap-cleaning", category: "commercial", title: "Grease Trap Cleaning" },
      { slug: "cctv-drain-survey-cost", category: "costs", title: "CCTV Survey Cost" },
      { slug: "drain-repair-methods-explained", category: "repair-methods", title: "Repair Methods Explained" },
      { slug: "drain-repair-cost", category: "costs", title: "Drain Repair Cost" }
    ]
  }
];

// Programmatic alt text for hero images per category
export const categoryAltText: Record<string, string> = {
  problems: "Drainage engineer inspecting a damaged drain pipe with CCTV camera",
  collapse: "Excavation of a collapsed drain pipe by professional drainage engineers",
  insurance: "CCTV drain survey camera being used for insurance claim documentation",
  costs: "Drain relining equipment being prepared for no-dig pipe repair",
  inspection: "Collapsed drain inspection camera inside a damaged drainage pipe",
  causes: "Tree roots growing into and blocking a clay drain pipe underground",
  commercial: "Commercial drainage maintenance engineer servicing a business property",
  emergency: "Emergency drainage engineer responding to a sewage flooding incident at night",
  "repair-methods": "Professional drain relining resin liner being cured inside a pipe",
  property: "Drainage CCTV survey being conducted on a residential property garden",
  survey: "CCTV drain survey camera equipment ready for pre-purchase inspection",
  "property-types": "Drainage engineer surveying Victorian clay pipes under a period property",
  legal: "Drainage engineer consulting with homeowner about shared drain responsibility",
  buyer: "CCTV drain survey camera being used during pre-purchase property inspection",
  guides: "Professional drainage engineer explaining drain repair options to customer"
};

// Category-to-image mapping for programmatic hero images
export const categoryImages: Record<string, string> = {
  problems: "drain-collapse-repair",
  collapse: "drain-excavation",
  insurance: "cctv-drain-surveys",
  costs: "drain-relining",
  inspection: "cctv-drain-surveys",
  causes: "drain-root-removal",
  commercial: "commercial-drainage",
  emergency: "emergency-drainage",
  "repair-methods": "drain-relining",
  property: "cctv-drain-surveys",
  survey: "cctv-drain-surveys",
  "property-types": "cctv-drain-surveys",
};

// Helper to get all pages for a category
export const getCategoryPages = (category: string): InfoPageData[] => {
  const map: Record<string, InfoPageData[]> = {
    problems: problemPages,
    collapse: collapseScenarios,
    insurance: insurancePages,
    costs: costPages,
    inspection: inspectionPages,
    causes: causePages,
    commercial: commercialDrainagePages,
    emergency: emergencyServicePages,
    "repair-methods": repairMethodPages,
    property: propertyPages,
    survey: inspectionPages,
    "property-types": propertyTypePages,
    legal: legalPages,
    buyer: buyerPages,
    guides: guidesPages
  };
  return map[category] || [];
};

export const getHubData = (category: string): HubData | undefined => {
  return hubPages.find((h) => h.category === category);
};

const DRAINS_SERVICE_TO_TOPIC_CATEGORIES: Record<string, string[]> = {
  "drain-collapse-repair": ["problems", "collapse", "repair-methods", "costs"],
  "drain-relining": ["repair-methods", "problems", "costs"],
  "cctv-drain-surveys": ["inspection", "costs", "survey", "guides"],
  "drain-excavation": ["repair-methods", "collapse", "costs"],
  "emergency-drainage": ["emergency", "problems", "repair-methods"],
  "blocked-drains": ["problems", "repair-methods", "emergency"],
  "drain-jetting": ["repair-methods", "problems"],
  "drain-root-removal": ["causes", "repair-methods", "problems"],
  "drain-unblocking": ["problems", "emergency", "repair-methods"],
  "drain-pipe-replacement": ["repair-methods", "collapse", "costs"],
  "commercial-drainage": ["commercial", "problems", "repair-methods"],
};

const MAX_TOPIC_LINKS = 6;
const MAX_PER_CATEGORY = 2;

export function getRelevantTopicsForService(serviceSlug: string): { title: string; href: string }[] {
  const categories = DRAINS_SERVICE_TO_TOPIC_CATEGORIES[serviceSlug];
  if (!categories?.length) return [];
  const out: { title: string; href: string }[] = [];
  for (const category of categories) {
    const hub = getHubData(category);
    const pages = getCategoryPages(category);
    if (!hub || !pages.length) continue;
    const taken = pages.slice(0, MAX_PER_CATEGORY);
    for (const page of taken) {
      out.push({ title: page.title, href: `${hub.basePath}/${page.slug}` });
      if (out.length >= MAX_TOPIC_LINKS) return out;
    }
  }
  return out;
}
