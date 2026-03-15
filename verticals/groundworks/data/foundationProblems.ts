import type { ProblemData } from "engine";

export const foundationProblems: ProblemData[] = [
  {
    slug: "foundation-subsidence",
    title: "Foundation subsidence",
    causes:
      "Subsidence occurs when the ground beneath foundations moves or shrinks, often due to clay shrinkage in dry weather, soil washout from leaking drains, or mining. Trees close to the building can also cause localised subsidence by drawing moisture from the soil.",
    howFixed:
      "We work with structural engineers to stabilise foundations where needed — from underpinning and piling to repairing the cause (e.g. drain repairs). Ground investigation and monitoring determine the right solution. We deliver piling and foundation repairs to design.",
    whenToCall:
      "Call when you see new or worsening cracks, sticking doors or uneven floors. Early investigation (ground and drainage) helps identify the cause and the right fix before damage worsens.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "mini-piling-contractors"],
    ctaMessage:
      "For foundation subsidence, we can carry out ground investigation and deliver piling or underpinning to your engineer's specification.",
  },
  {
    slug: "foundation-cracking",
    title: "Foundation cracking",
    causes:
      "Cracks in foundations can be caused by ground movement, shrinkage of concrete, inadequate design for the ground conditions, or damage during excavation. Fine cracks may be cosmetic; wider or progressive cracks need assessment.",
    howFixed:
      "We assess the cause with reference to ground conditions and design. Repairs range from crack injection and local reinforcement to partial or full foundation replacement. We work to the structural engineer's specification and provide certification.",
    whenToCall:
      "Call when you notice new cracks, cracks that are widening, or before extending or loading the building further. A structural survey and ground investigation will define the remedy.",
    relatedServiceSlugs: ["foundation-contractors", "concrete-foundations", "piling-contractors"],
    ctaMessage:
      "Need foundation crack assessment or repair? We work with engineers to deliver the right solution.",
  },
  {
    slug: "inadequate-foundation-design",
    title: "Inadequate foundation design",
    causes:
      "Foundations can be inadequate when they were designed for different ground conditions, when the building has been extended or loaded beyond the original design, or when the ground investigation was insufficient. Made ground, soft soils or variable strata often require a revised design.",
    howFixed:
      "We work from a revised design from your structural engineer, often following a new ground investigation. Solutions include piling, raft foundations or localised underpinning. We deliver to design with testing and certification.",
    whenToCall:
      "Call when a structural survey or purchase report flags foundation adequacy, or when you are planning an extension or change of use. Updated ground investigation and design come first.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "mini-piling-contractors"],
    ctaMessage:
      "For inadequate or under-designed foundations, we deliver piling and foundation works to your engineer's specification.",
  },
  {
    slug: "soft-ground-affecting-foundations",
    title: "Soft ground affecting foundations",
    causes:
      "Soft or compressible soils reduce bearing capacity and can cause excessive settlement. Peat, silt, very soft clay or loose fill may not support strip or pad foundations. A ground investigation identifies the problem and the structural engineer will specify piling, raft or ground improvement.",
    howFixed:
      "We deliver the solution specified in the design: typically piling (driven, bored or mini piling) or a raft foundation. Ground improvement such as vibro or stone columns may be an option on some sites. We work to the structural engineer's specification with testing and certification.",
    whenToCall:
      "Call when a ground investigation report recommends piling or alternative foundations, or when you are building on known soft ground. Early engagement helps with design and programme.",
    relatedServiceSlugs: ["piling-contractors", "foundation-contractors", "mini-piling-contractors"],
    ctaMessage: "Building on soft ground? We deliver piling and foundations to your engineer's specification.",
  },
  {
    slug: "waterlogged-soil-building-plot",
    title: "Waterlogged soil on building plot",
    causes:
      "Waterlogged or saturated soil has reduced strength and can cause instability during excavation and construction. High water table, poor drainage or impermeable layers can keep the ground wet. Temporary dewatering or revised foundation design is often needed.",
    howFixed:
      "We work from the ground investigation and design. Solutions may include temporary dewatering, deeper foundations (piling through the wet layer), or drainage before and during works. We deliver excavation and foundations to the design with proper sequencing.",
    whenToCall:
      "Call when the site is persistently wet, the ground investigation shows high water table, or excavation is flooding. Early assessment avoids delays and design changes later.",
    relatedServiceSlugs: ["excavation-contractors", "foundation-contractors", "groundworks-contractors"],
    ctaMessage: "Dealing with waterlogged ground? We can advise and deliver foundations to design.",
  },
  {
    slug: "high-water-table-during-excavation",
    title: "High water table during excavation",
    causes:
      "A high water table fills excavations with water and can cause instability, flotation of structures and delay. Ground investigation should identify water levels; in some areas seasonal variation is significant. Dewatering or exclusion may be required.",
    howFixed:
      "We plan excavation and foundations around the water table. Options include sump pumping, wellpoint systems or sheet piling to exclude water. We work to the design and deliver formation levels suitable for foundations. Piling through the water-bearing layer is often specified.",
    whenToCall:
      "Call when boreholes or trial pits show water close to formation level, or when excavations are flooding. We can advise on dewatering and foundation options.",
    relatedServiceSlugs: ["excavation-contractors", "piling-contractors", "foundation-contractors"],
    ctaMessage: "High water table on your site? We deliver excavation and foundations with appropriate water management.",
  },
  {
    slug: "tree-roots-affecting-foundations",
    title: "Tree roots affecting building foundations",
    causes:
      "Tree roots can cause subsidence by extracting moisture from clay soils, leading to shrinkage and movement. Roots may also physically disturb shallow foundations. Species, distance and soil type all matter. A structural engineer and arboriculturist will advise on risk and mitigation.",
    howFixed:
      "We work from the structural engineer's specification. Solutions may include deeper foundations (piling below root influence), root barriers, or removal of the tree with a period of monitoring before building. We deliver piling and foundation works to design.",
    whenToCall:
      "Call when trees are close to the building or proposed build, when subsidence is suspected to be tree-related, or when planning an extension near trees. A ground investigation and tree survey inform the design.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "mini-piling-contractors"],
    ctaMessage: "Tree-related foundation issues? We deliver piling and foundations to your engineer's specification.",
  },
  {
    slug: "settlement-sloping-building-sites",
    title: "Settlement on sloping building sites",
    causes:
      "Sloping sites can have variable ground conditions, fill, and lateral loads that increase settlement risk. Cut and fill may leave soft or loose material under part of the building. Proper investigation and design are essential to avoid differential settlement.",
    howFixed:
      "We deliver foundations to the structural engineer's design, which may include piling, stepped foundations or ground improvement. We ensure proper compaction of fill and correct sequencing. Retaining structures may be needed; we work with the design team.",
    whenToCall:
      "Call when building on a slope, when the site has been cut and filled, or when a structural report flags settlement risk. Ground investigation and design come first.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "excavation-contractors"],
    ctaMessage: "Building on a slope? We deliver foundations and earthworks to design.",
  },
  {
    slug: "cracked-foundations-new-extension",
    title: "Cracked foundations on new extension",
    causes:
      "Cracks in new extension foundations can result from inadequate design for the ground conditions, poor construction, differential movement between existing and new build, or reactive clay. Early diagnosis prevents the problem from worsening.",
    howFixed:
      "We assess with reference to the design and ground conditions. Repairs may include local underpinning, piling or crack repair to the structural engineer's specification. We work with engineers to stabilise and prevent further movement.",
    whenToCall:
      "Call when you notice cracks in new extension foundations, or when building control or a structural survey raises concerns. Early intervention is important.",
    relatedServiceSlugs: ["foundation-contractors", "concrete-foundations", "mini-piling-contractors"],
    ctaMessage: "Cracks in a new extension? We can assess and deliver repairs to your engineer's specification.",
  },
  {
    slug: "contaminated-land-remediation",
    title: "Contaminated land and foundation design",
    causes:
      "Former industrial or landfill sites may contain contamination that affects foundation design and construction. Contamination can require encapsulation, removal or treatment. Ground investigation and a remediation strategy inform the foundation solution.",
    howFixed:
      "We work from the remediation strategy and structural design. We may excavate and remove contaminated material, install barriers, or found through the contamination on piling. We follow the design and ensure safe handling and disposal where required.",
    whenToCall:
      "Call when the ground investigation identifies contamination, or when you are developing a brownfield site. Early engagement with the design team is essential.",
    relatedServiceSlugs: ["excavation-contractors", "foundation-contractors", "piling-contractors"],
    ctaMessage: "Building on contaminated land? We deliver excavation and foundations to the remediation and structural design.",
  },
  {
    slug: "made-up-ground-poor-bearing-capacity",
    title: "Made-up ground and poor bearing capacity",
    causes:
      "Made ground (fill) is often variable, poorly compacted and unsuitable for conventional strip foundations. Bearing capacity may be low and settlement risk high. A ground investigation will recommend piling, raft or ground improvement.",
    howFixed:
      "We install the foundation type specified: typically piling to found in competent material below the fill, or a raft that spreads the load. We deliver to design with proper quality control and certification.",
    whenToCall:
      "Call when the site has known or suspected fill, when the ground investigation recommends piling or raft, or when you are building on a previously developed site.",
    relatedServiceSlugs: ["piling-contractors", "foundation-contractors", "groundworks-contractors"],
    ctaMessage: "Building on made ground? We deliver piling and foundations to design.",
  },
  {
    slug: "buried-obstructions-during-excavation",
    title: "Buried obstructions during excavation",
    causes:
      "Former foundations, cellars, tanks, services or rubble can be encountered during excavation. They may delay the job, require redesign or need removal. A utility survey and desktop study help, but obstructions are not always known in advance.",
    howFixed:
      "We assess obstructions and work with the design team. We may remove them, found around them, or adjust the foundation layout. We manage spoil and disposal and keep the programme on track where possible.",
    whenToCall:
      "Call when you hit something unexpected during excavation, or when developing a site with unknown history. We can excavate, advise and coordinate with the engineer.",
    relatedServiceSlugs: ["excavation-contractors", "foundation-contractors", "site-clearance-contractors"],
    ctaMessage: "Hit buried obstructions? We can excavate, remove and adapt to keep the project on track.",
  },
  {
    slug: "differential-settlement-extensions",
    title: "Differential settlement between house and extension",
    causes:
      "Extensions often settle differently from the existing building if foundations are not designed for the ground conditions or if the existing building is on different founding strata. Cracks at the junction and stepped floors are common signs.",
    howFixed:
      "We work from the structural engineer's specification. Solutions may include underpinning the existing building, piling under the extension, or a movement joint. We deliver the works with certification.",
    whenToCall:
      "Call when you see cracks at the junction of house and extension, or when planning an extension and the existing foundations are shallow or unknown. A structural survey and ground investigation inform the fix.",
    relatedServiceSlugs: ["foundation-contractors", "mini-piling-contractors", "concrete-foundations"],
    ctaMessage: "Differential settlement? We deliver underpinning and foundation works to your engineer's specification.",
  },
  {
    slug: "clay-shrinkage-subsidence",
    title: "Clay shrinkage and subsidence",
    causes:
      "Clay soils shrink in dry weather and swell when wet. This can cause cyclical movement and subsidence, especially where trees or vegetation remove moisture. Buildings on shallow foundations in clay are most at risk.",
    howFixed:
      "We work with the structural engineer to stabilise: often piling or underpinning to found below the active zone, or repair of the cause (e.g. tree removal, drainage). We deliver to design with monitoring if required.",
    whenToCall:
      "Call when you have cracking that worsens in dry weather, or when you are building on clay and the design requires piling or deep foundations.",
    relatedServiceSlugs: ["piling-contractors", "foundation-contractors", "mini-piling-contractors"],
    ctaMessage: "Clay shrinkage subsidence? We deliver piling and underpinning to your engineer's specification.",
  },
  {
    slug: "mining-subsidence-foundations",
    title: "Mining subsidence and foundation design",
    causes:
      "Former mining can leave cavities, shallow workings or compressible strata that cause subsidence. Coal Authority and historical records help, but ground investigation is usually needed. Foundations may need to be designed to accommodate or resist movement.",
    howFixed:
      "We deliver foundations to the structural engineer's design, which may include piling to competent strata, rafts that span localised weakness, or other solutions specified for the mining risk. We work to design with testing and certification.",
    whenToCall:
      "Call when the site is in a mining area, when a desktop study flags mining, or when the structural engineer has specified mining-resistant foundations.",
    relatedServiceSlugs: ["piling-contractors", "foundation-contractors", "groundworks-contractors"],
    ctaMessage: "Building in a mining area? We deliver foundations to your engineer's mining-resistant design.",
  },
  {
    slug: "heave-damage-foundations",
    title: "Heave damage to foundations",
    causes:
      "Heave is upward movement of the ground, often due to clay swelling when moisture increases (e.g. after tree removal) or when soil recovers from previous loading. It can lift foundations and cause cracking. Design and construction must allow for heave where the risk exists.",
    howFixed:
      "We work from the structural engineer's design. Solutions may include suspended floors, flexible joints or foundations designed to accommodate heave. We deliver to design and do not add load or constraint that would worsen the problem.",
    whenToCall:
      "Call when heave is suspected (e.g. after tree removal, or upward movement of floors), or when building on clay in an area of heave risk. The engineer will specify the approach.",
    relatedServiceSlugs: ["foundation-contractors", "concrete-foundations", "groundworks-contractors"],
    ctaMessage: "Heave damage or heave risk? We deliver foundations to your engineer's specification.",
  },
  {
    slug: "inadequate-depth-foundations",
    title: "Inadequate foundation depth",
    causes:
      "Foundations that are too shallow for the ground conditions, frost depth or adjacent trees can move or crack. Older buildings were often built to less rigorous standards. Extension or change of use may expose the problem.",
    howFixed:
      "We work from the structural engineer's specification. Solutions include underpinning to adequate depth, piling alongside or beneath existing foundations, or localised repair. We deliver to design with certification.",
    whenToCall:
      "Call when a survey flags shallow foundations, when you are extending and the existing depth is unclear, or when movement suggests inadequate depth.",
    relatedServiceSlugs: ["foundation-contractors", "mini-piling-contractors", "piling-contractors"],
    ctaMessage: "Shallow or inadequate foundations? We deliver underpinning and piling to your engineer's specification.",
  },
  {
    slug: "vibration-damage-adjacent-works",
    title: "Vibration damage from adjacent works",
    causes:
      "Piling, demolition or heavy plant can transmit vibration that damages nearby foundations or structures. Pre-existing weakness may be exposed. Assessment and monitoring may be needed; in some cases mitigation or repair is required.",
    howFixed:
      "We assess damage and work with the structural engineer. We can deliver localised repair, underpinning or piling to stabilise. We follow the specification and provide documentation for insurance or claims where relevant.",
    whenToCall:
      "Call when adjacent construction or piling has caused or may cause damage, or when you need vibration monitoring or mitigation. Early assessment helps.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "groundworks-contractors"],
    ctaMessage: "Vibration damage to foundations? We can assess and deliver repairs to your engineer's specification.",
  },
  {
    slug: "drainage-washout-under-foundations",
    title: "Drainage washout under foundations",
    causes:
      "Leaking or collapsed drains can wash soil from under foundations, causing settlement and cracking. The drain must be repaired and the foundation supported. Ground investigation and drainage survey identify the cause and extent.",
    howFixed:
      "We work with the structural engineer and drainage contractor. After the drain is repaired, we may underpin or pile to restore support. We deliver foundation repairs to design and coordinate with drainage works.",
    whenToCall:
      "Call when subsidence is suspected to be drain-related, when a drain survey shows collapse or leakage near the building, or when cracks align with the drain run.",
    relatedServiceSlugs: ["foundation-contractors", "excavation-contractors", "groundworks-contractors"],
    ctaMessage: "Drainage washout under foundations? We deliver underpinning and repair to your engineer's specification.",
  },
  {
    slug: "reactive-clay-foundation-design",
    title: "Reactive clay and foundation design",
    causes:
      "Highly reactive (plastic) clay shrinks and swells significantly with moisture change. Conventional strip foundations may crack or move. Design typically requires deeper foundations, piling or rafts, and sometimes movement joints.",
    howFixed:
      "We deliver the foundation type specified: often piling to below the active zone, or a raft. We follow the structural engineer's design and allow for movement where specified. We provide certification.",
    whenToCall:
      "Call when the ground investigation identifies reactive clay, when the engineer has specified piling or raft, or when you are building in a known clay area.",
    relatedServiceSlugs: ["piling-contractors", "foundation-contractors", "concrete-foundations"],
    ctaMessage: "Building on reactive clay? We deliver piling and foundations to your engineer's specification.",
  },
  {
    slug: "strip-vs-raft-foundation-cracks",
    title: "Cracks from inadequate strip vs raft choice",
    causes:
      "Strip foundations may be specified where a raft would have been more appropriate for variable or poor ground, leading to differential settlement and cracking. The reverse can also occur. Correct choice depends on ground investigation and design.",
    howFixed:
      "We work from a revised design. We may install piling, a raft or localised underpinning. We deliver to the structural engineer's specification and provide as-built and certification.",
    whenToCall:
      "Call when cracking suggests the wrong foundation type was used, or when a structural report recommends a change from strip to raft or piling.",
    relatedServiceSlugs: ["foundation-contractors", "concrete-foundations", "piling-contractors"],
    ctaMessage: "Wrong foundation type? We deliver the revised solution to your engineer's specification.",
  },
  {
    slug: "extension-foundation-tie-in",
    title: "Extension foundation tie-in and movement",
    causes:
      "Where an extension is tied into the existing building, differential movement can cause cracks at the junction. The extension may need independent movement joints or foundations designed to match the existing behaviour.",
    howFixed:
      "We deliver foundations to the structural engineer's design, which may include movement joints, piling under the extension only, or stepped foundations. We ensure correct detailing and leave the structure as specified.",
    whenToCall:
      "Call when planning an extension and the existing building has shallow or unknown foundations, or when cracks have appeared at the junction. A structural survey will inform the design.",
    relatedServiceSlugs: ["foundation-contractors", "mini-piling-contractors", "concrete-foundations"],
    ctaMessage: "Extension foundation tie-in? We deliver foundations to your engineer's specification.",
  },
  {
    slug: "frost-damage-shallow-foundations",
    title: "Frost damage to shallow foundations",
    causes:
      "Water in the ground can freeze and expand (frost heave), lifting shallow foundations. Foundations in the UK should be below the frost zone (typically 450–750 mm depending on region). Older or poorly designed foundations may be too shallow.",
    howFixed:
      "We deliver repairs to the structural engineer's specification: often underpinning to frost-free depth or localised replacement. We ensure proper drainage and avoid trapping water near the foundation.",
    whenToCall:
      "Call when frost heave is suspected (e.g. movement after cold winters), or when a survey flags shallow foundations in a frost-prone area.",
    relatedServiceSlugs: ["foundation-contractors", "concrete-foundations", "excavation-contractors"],
    ctaMessage: "Frost damage to foundations? We deliver underpinning and repair to design.",
  },
  {
    slug: "load-increase-foundation-inadequate",
    title: "Load increase and inadequate foundations",
    causes:
      "Adding storeys, heavy plant, or change of use can exceed the capacity of existing foundations. The structural engineer will assess and may specify strengthening, piling or underpinning.",
    howFixed:
      "We deliver the solution specified: piling beneath existing foundations, underpinning, or new foundations for the added load. We work to the structural engineer's design with testing and certification.",
    whenToCall:
      "Call when you are planning to add load to the building (extra storey, heavy use) or when a structural survey flags foundation capacity. Design and approval come first.",
    relatedServiceSlugs: ["piling-contractors", "foundation-contractors", "mini-piling-contractors"],
    ctaMessage: "Increasing load on the building? We deliver piling and foundation works to your engineer's specification.",
  },
  {
    slug: "bulging-walls-foundation-movement",
    title: "Bulging walls from foundation movement",
    causes:
      "Bulging or leaning walls can indicate foundation movement, often from subsidence, heave or lateral pressure. The cause must be identified before repair. A structural engineer will specify investigation and remedy.",
    howFixed:
      "We work from the structural engineer's specification. We may underpin, install piling or tie the structure, and repair or replace damaged sections. We deliver to design with certification.",
    whenToCall:
      "Call when walls are bulging or leaning, or when a structural survey links the defect to foundation movement. Early assessment prevents collapse risk.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "groundworks-contractors"],
    ctaMessage: "Bulging walls from foundation movement? We deliver stabilisation and repair to your engineer's specification.",
  },
  {
    slug: "new-build-foundation-failure",
    title: "New build foundation failure",
    causes:
      "New build foundations can fail due to design error, poor ground investigation, construction defect or unexpected ground conditions. Early signs include cracking, settlement or failed tests. The warranty provider and structural engineer will be involved.",
    howFixed:
      "We work with the structural engineer and warranty provider to remedy. We may underpin, pile or replace defective sections to the revised design. We provide certification and support the warranty process.",
    whenToCall:
      "Call when new build foundations show cracking, settlement or failed load tests. The designer and warranty provider should be informed; we can then deliver the remedial works.",
    relatedServiceSlugs: ["foundation-contractors", "piling-contractors", "concrete-foundations"],
    ctaMessage: "New build foundation failure? We deliver remedial works to your engineer's specification.",
  },
];

export function getFoundationProblemBySlug(slug: string): ProblemData | undefined {
  return foundationProblems.find((p) => p.slug === slug);
}
