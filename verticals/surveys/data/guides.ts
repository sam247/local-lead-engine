import type { InfoPageData } from "./types";

export const guidesPages: InfoPageData[] = [
  // PLANNING & DEVELOPMENT CLUSTER
  {
    slug: "survey-for-planning-permission",
    title: "What Survey Do I Need for Planning Permission?",
    metaDescription:
      "Which land and building surveys are needed for UK planning applications. Topographical, measured building and boundary survey requirements explained for architects and developers.",
    intro:
      "Most planning applications in the UK require accurate survey information to show how your proposals relate to the existing site. Submitting drawings based on outdated OS maps or rough measurements is a common cause of delays and refusals. This guide explains which surveys planners expect to see, and when you need a professional land surveyor involved.",
    signs: [
      "You are submitting a planning application for a new-build, extension or change of use",
      "Your architect has requested an up-to-date topographical survey before designing",
      "The site includes level changes, retaining walls or complex boundaries",
      "Trees, neighbouring buildings or utilities could constrain the design",
      "The planning authority has asked for accurate existing drawings or sections",
      "You need to coordinate drainage, access and visibility splays on one plan"
    ],
    diagnosis:
      "For most projects you will need a topographical survey of the site, and measured building surveys of any existing structures that will be altered or tied into. Boundary surveys may also be required where proposed works are close to the property line. The appropriate mix depends on project scale, local authority requirements and design ambition.",
    resolution:
      "Our survey partners provide planning-ready survey packs with CAD drawings, PDF plots and, where required, 3D models. We coordinate with your architect so the survey captures all essential information in one visit, reducing rework and delays. If you already have planning in place but only rough base drawings, a survey can still de-risk the build phase.",
    ctaText: "Planning a project and not sure which survey you need? Request a survey quote and we’ll advise the right scope for your planning application.",
    relatedServices: ["topographical-survey", "measured-building-survey", "boundary-survey"],
    relatedPages: [
      { slug: "topographical-survey-cost", category: "costs", title: "Topographical Survey Cost" },
      { slug: "survey-for-architectural-design", category: "guides", title: "Surveys for Architectural Design" }
    ]
  },
  {
    slug: "survey-before-building-extension",
    title: "Do I Need a Survey Before Building an Extension?",
    metaDescription:
      "Do you need a survey before building an extension? When topographical, measured building and boundary surveys are required for extensions and loft conversions.",
    intro:
      "Extensions and loft conversions often look straightforward on paper, but small site errors can quickly turn into expensive on-site changes. Surveying the existing building and garden before detailed design gives your architect reliable information on levels, structure and boundaries, reducing risk for everyone involved.",
    signs: [
      "Your proposed extension is close to the boundary or neighbouring buildings",
      "There are retaining walls, steep level changes or complex garden layouts",
      "Existing drawings are based on old estate agents’ plans or rough sketches",
      "You plan to alter roof structure, dormers or chimney positions",
      "Party wall surveyors have requested accurate existing sections",
      "Contractors are asking for verified dimensions before pricing"
    ],
    diagnosis:
      "A measured building survey provides accurate floor plans, elevations and sections of the existing property, while a topographical survey captures garden levels, drainage covers and access. Together these give your design team a robust base to work from and avoid dimensional surprises once work starts on site.",
    resolution:
      "Our survey partners capture the whole property in one visit using total stations and laser scanning where appropriate. Deliverables include CAD files and PDFs that your architect and structural engineer can plug straight into their workflow. Where boundaries or neighbour relations are sensitive, we can add a focused boundary survey to the same visit.",
    ctaText: "Planning an extension or loft conversion? Speak with a survey specialist about the right survey scope before you finalise designs.",
    relatedServices: ["measured-building-survey", "topographical-survey", "boundary-survey"],
    relatedPages: [
      { slug: "survey-before-property-development", category: "guides", title: "Surveys Before Property Development" },
      { slug: "measured-building-survey-cost", category: "costs", title: "Measured Building Survey Cost" }
    ]
  },
  {
    slug: "survey-before-property-development",
    title: "Surveys Required Before Property Development",
    metaDescription:
      "Surveys required before property development in the UK. Overview of topographical, utility, ground and measured building surveys for developers.",
    intro:
      "Successful developments are built on reliable site information. Before committing to design fees, planning applications and contractor appointments, developers need to understand the site’s constraints in three key areas: ground levels, buried services and existing structures. This guide outlines the core surveys that de‑risk early-stage feasibility and planning.",
    signs: [
      "You are considering purchasing land or a building for redevelopment",
      "Site constraints such as utilities, slopes or access are unclear",
      "You need to test multiple layout options or massing studies",
      "Local policy references flood risk, drainage or visibility requirements",
      "There are existing buildings to be retained, extended or demolished",
      "Funders or JV partners are asking for independent survey information"
    ],
    diagnosis:
      "Typical pre‑development survey packages combine topographical surveys, utility or GPR surveys, and measured building surveys where structures are retained. On some sites, additional ground investigation and drainage assessments are required to understand capacity, contamination or foundation design constraints.",
    resolution:
      "We help you scope an appropriate survey package for the development stage you are at — from light‑touch feasibility through to full planning submissions. Our partners deliver coordinated survey outputs in CAD and BIM formats so designers, engineers and planners are all working from the same trusted base information.",
    ctaText: "Looking at a new development site? Request a survey quote tailored to your planning and feasibility needs.",
    relatedServices: ["topographical-survey", "utility-mapping-survey", "measured-building-survey"],
    relatedPages: [
      { slug: "survey-for-planning-permission", category: "guides", title: "Survey for Planning Permission" },
      { slug: "utility-survey-cost", category: "costs", title: "Utility Survey Cost" }
    ]
  },
  {
    slug: "survey-for-architectural-design",
    title: "Surveys for Architectural Design and BIM",
    metaDescription:
      "Which land and building surveys support architectural design and BIM workflows. How topographical, measured building and laser scanning surveys feed into Revit and CAD.",
    intro:
      "Architects increasingly design in 3D and coordinate projects in BIM, but the quality of the model still depends on the quality of the survey data it is built on. This guide explains how topographical, measured building and laser scanning surveys can be structured to reduce modelling time, improve coordination and support better design decisions.",
    signs: [
      "You are working in Revit or another BIM platform and need accurate base models",
      "The site includes complex geometry, heritage fabric or irregular structures",
      "Multiple consultants require access to the same underlying survey data",
      "Clash detection is a priority for services, structure and envelope",
      "Previous projects have suffered from poor existing-condition information",
      "You want survey deliverables aligned with your office CAD/BIM standards"
    ],
    diagnosis:
      "For BIM‑led projects, a combination of laser scanning, topographical surveys and detailed measured building surveys is often appropriate. Laser scans generate dense point clouds that can be modelled to the level of detail the project requires, while conventional observations capture key control and check shots.",
    resolution:
      "We brief survey partners to deliver structured point clouds, CAD files and, where required, basic Revit shells that align with your template standards. This reduces the time your team spends cleaning and re‑working survey data, and ensures everyone is working from a consistent, well‑documented starting point.",
    ctaText: "Need survey data that plugs straight into your design workflow? Speak with a survey specialist about BIM‑ready survey deliverables.",
    relatedServices: ["laser-scanning-survey", "measured-building-survey", "topographical-survey"],
    relatedPages: [
      { slug: "what-is-a-total-station", category: "guides", title: "What Is a Total Station?" },
      { slug: "how-gnss-surveying-works", category: "guides", title: "How GNSS Surveying Works" }
    ]
  },

  // SURVEY TECHNOLOGY CLUSTER
  {
    slug: "what-is-a-total-station",
    title: "What Is a Total Station in Land Surveying?",
    metaDescription:
      "What is a total station in land surveying? How total stations measure angles and distances to produce accurate topographical and setting‑out data.",
    intro:
      "The total station is the core instrument used on most construction and land surveying projects. It combines an electronic theodolite with a distance meter and onboard software, allowing surveyors to measure angles and distances precisely and compute coordinates in real time.",
    signs: [
      "You are designing or building to tight dimensional tolerances",
      "The project requires accurate setting out of gridlines, foundations or steelwork",
      "Existing conditions must be recorded to centimetre or better accuracy",
      "You see surveyors using tripod‑mounted instruments on site",
      "You need confidence that drawings reflect what was actually built",
      "Your project uses local or national coordinate systems that must be respected"
    ],
    diagnosis:
      "Total stations measure the angle between the instrument and a target prism, plus the distance to that prism. Combined with instrument position and orientation, they calculate exact X, Y, Z coordinates. Modern robotic total stations can track a single operator and log points directly into survey software.",
    resolution:
      "Understanding how total stations work helps architects, engineers and contractors appreciate the precision — and limitations — of survey data. Our partners use calibrated instruments, robust control networks and QA procedures so your drawings, models and setting‑out all align on the same coordinate system.",
    ctaText: "Need high‑accuracy survey data for your project? Request a quote for total‑station based topographical or setting‑out surveys.",
    relatedServices: ["topographical-survey", "measured-building-survey"],
    relatedPages: [
      { slug: "how-gnss-surveying-works", category: "guides", title: "How GNSS Surveying Works" },
      { slug: "what-is-lidar-scanning", category: "guides", title: "What Is LiDAR Scanning?" }
    ]
  },
  {
    slug: "how-gnss-surveying-works",
    title: "How GNSS Surveying Works on Construction Sites",
    metaDescription:
      "How GNSS surveying works on UK construction sites. When GPS‑based surveying is appropriate and how it integrates with total station measurements.",
    intro:
      "GNSS surveying uses satellite signals to determine position on the Earth’s surface. On construction and infrastructure projects, it provides rapid positioning for control points, boundaries and large‑area topographical surveys. However, it must be used carefully and often in combination with total stations to meet design tolerances.",
    signs: [
      "Your project covers a large or linear site such as a road, pipeline or housing estate",
      "You need coordinates on OS grid or other national systems",
      "Traditional traverses would be slow or difficult to tie into a wider network",
      "You are working in relatively open areas with clear sky visibility",
      "Designers, utilities and authorities expect a georeferenced survey",
      "You have previously received survey data in OS grid / OSTN coordinates"
    ],
    diagnosis:
      "GNSS receivers track signals from multiple satellite constellations and use correction services to improve accuracy. On many projects they are used to establish primary control, which is then densified and checked with total stations. Urban canyons, tree cover and reflective surfaces can degrade GNSS performance.",
    resolution:
      "Our survey partners use GNSS as part of an integrated approach — not a one‑size‑fits‑all solution. Control networks are established and verified with both GNSS and total stations, and final drawings clearly state the coordinate system, vertical datum and accuracy achieved so design teams can rely on the data.",
    ctaText: "Need an OS‑grid referenced survey for your scheme? Request a GNSS‑enabled topographical survey quote.",
    relatedServices: ["topographical-survey"],
    relatedPages: [
      { slug: "what-is-a-total-station", category: "guides", title: "What Is a Total Station?" },
      { slug: "what-is-gpr-utility-mapping", category: "guides", title: "What Is GPR Utility Mapping?" }
    ]
  },
  {
    slug: "what-is-lidar-scanning",
    title: "What Is LiDAR Scanning in Surveying?",
    metaDescription:
      "What is LiDAR scanning in surveying? How terrestrial and drone‑based LiDAR capture 3D point clouds for engineering and planning.",
    intro:
      "LiDAR (Light Detection and Ranging) uses laser pulses to measure millions of distances per second, building a dense 3D point cloud of terrain, buildings and infrastructure. It is used both from tripod‑mounted scanners and from drones or aircraft, providing a powerful way to capture complex sites quickly.",
    signs: [
      "Your project involves complex structures, curved surfaces or heritage fabric",
      "Elevation or façade detail is critical to design or conservation",
      "Large sites must be modelled in 3D for design or visual impact assessment",
      "Traditional methods would be too slow or disruptive",
      "You need accurate as‑built records for handover or facilities management",
      "Stakeholders expect 3D visualisations or BIM models"
    ],
    diagnosis:
      "LiDAR scanners emit laser pulses and measure the time taken for light to return from surfaces, calculating distance. Combining many angles and observations produces a 3D point cloud. Registration aligns multiple scans into a single dataset, which can then be modelled into surfaces, meshes or BIM elements.",
    resolution:
      "Our partners specify LiDAR surveys where they add clear value over conventional methods. You receive point clouds, CAD drawings or models at an agreed level of detail, along with documentation of accuracy and limitations so designers and engineers can use the data appropriately.",
    ctaText: "Considering LiDAR or laser scanning for your project? Speak with a survey specialist about the most efficient capture method.",
    relatedServices: ["laser-scanning-survey", "drone-topographical-survey"],
    relatedPages: [
      { slug: "how-drone-mapping-works", category: "guides", title: "How Drone Mapping Works" },
      { slug: "how-drone-surveys-work", category: "guides", title: "How Drone Surveys Work" }
    ]
  },
  {
    slug: "what-is-gpr-utility-mapping",
    title: "What Is GPR Utility Mapping?",
    metaDescription:
      "What is GPR utility mapping? How ground penetrating radar helps detect buried pipes, cables and voids before excavation.",
    intro:
      "Ground Penetrating Radar (GPR) is a non‑invasive technique used to detect changes in material below the surface. In utility surveys it helps identify buried pipes, cables, ducts and voids that may not appear on existing records, reducing the risk of service strikes and unexpected ground conditions.",
    signs: [
      "You are planning excavation, piling or ground beams in an area with limited records",
      "Utility drawings are incomplete, historic or contradictory",
      "You suspect unmapped services or redundant infrastructure on site",
      "Ground conditions may include made ground, basements or voids",
      "You must comply with guidance on avoiding underground utility damage",
      "Designers want to understand where new services can be routed safely"
    ],
    diagnosis:
      "GPR units transmit radio waves into the ground and record reflections from interfaces between materials with different properties. Skilled interpretation of these signals, combined with electromagnetic locators and statutory records, produces a more complete picture of buried utilities than any single method on its own.",
    resolution:
      "Our utility mapping partners combine GPR with other detection methods to deliver coordinated utility drawings tied to your topographical survey. Outputs clearly mark confidence levels so designers and contractors know where extra caution or trial holes may be required.",
    ctaText: "Planning excavation or new services? Request a utility mapping survey to reduce risk before you break ground.",
    relatedServices: ["utility-mapping-survey", "utility-survey"],
    relatedPages: [
      { slug: "utility-survey-cost", category: "costs", title: "Utility Survey Cost" },
      { slug: "who-carries-out-drain-surveys", category: "guides", title: "Who Carries Out Drain Surveys?" }
    ]
  },
  {
    slug: "how-drone-mapping-works",
    title: "How Drone Mapping Works in Construction",
    metaDescription:
      "How drone mapping works for construction and development sites. From flight planning to orthophotos, point clouds and volume calculations.",
    intro:
      "Drone mapping uses overlapping aerial photographs and specialist software to reconstruct accurate 3D models and orthophotos of a site. When combined with ground control, the outputs can be accurate enough for design, earthworks planning and progress monitoring across large areas.",
    signs: [
      "Your site is large, remote or difficult to access on foot",
      "Earthworks volumes or stockpile measurements are required regularly",
      "Design teams want up‑to‑date aerial imagery on their CAD backgrounds",
      "Traditional survey methods would be slow or disruptive to operations",
      "Progress reporting and stakeholder communication rely on visuals",
      "You are considering using drones but are unsure how the data is processed"
    ],
    diagnosis:
      "Drones capture high‑overlap imagery along planned flight lines. Photogrammetry software identifies common points between images to reconstruct a 3D point cloud and surface model. Ground control points and quality checks ensure the model matches reality within agreed tolerances.",
    resolution:
      "Our drone survey partners design flight plans, install control and process the data into deliverables that integrate with your existing workflows: orthophotos, contours, digital terrain models and volume reports. Where higher accuracy or detail is required, drone data is combined with ground‑based survey measurements.",
    ctaText: "Interested in drone mapping for your site? Speak with a specialist about accuracy, permissions and deliverables.",
    relatedServices: ["drone-topographical-survey", "drone-construction-survey"],
    relatedPages: [
      { slug: "how-drone-surveys-work", category: "guides", title: "How Drone Surveys Work" },
      { slug: "drone-survey-cost", category: "costs", title: "Drone Survey Cost" }
    ]
  },

  // DRONE SURVEY CLUSTER
  {
    slug: "how-drone-surveys-work",
    title: "How Drone Surveys Work",
    metaDescription:
      "How drone surveys work for UK construction and land projects. Step‑by‑step overview from planning and permissions to flights, processing and deliverables.",
    intro:
      "Drone surveys combine qualified pilots, survey control and specialist processing to turn aerial images into measurable data. When used correctly, they can complement or replace some traditional survey tasks, particularly on large or hard‑to‑reach sites.",
    signs: [
      "You are considering a drone survey but are unsure what is involved",
      "The site includes roofs, embankments or structures that are unsafe to access on foot",
      "You need repeatable data at regular intervals for monitoring",
      "Planners or stakeholders are asking for visualisations or context imagery",
      "You have tight programmes and need rapid mobilisation",
      "You want to understand how accurate drone data really is"
    ],
    diagnosis:
      "A typical drone survey involves pre‑flight risk assessment and permissions, installation of survey control points, one or more flight plans, and rigorous data processing. The quality of the final outputs depends on airspace compliance, camera calibration, control strategy and processing settings.",
    resolution:
      "Our partners follow CAA rules, use insured commercial pilots and align every drone survey with a clear measurement brief. You receive documentation of methods, accuracy checks and limitations alongside the imagery and models, so that engineers and designers can use the data with confidence.",
    ctaText: "Thinking about using drones on your project? Request a drone survey quote and we’ll explain exactly how the workflow fits your scheme.",
    relatedServices: ["drone-survey", "drone-topographical-survey", "drone-construction-survey"],
    relatedPages: [
      { slug: "drone-surveys-vs-traditional-surveys", category: "guides", title: "Drone Surveys vs Traditional Surveys" },
      { slug: "are-drone-surveys-accurate", category: "guides", title: "Are Drone Surveys Accurate?" }
    ]
  },
  {
    slug: "drone-surveys-vs-traditional-surveys",
    title: "Drone Surveys vs Traditional Surveys",
    metaDescription:
      "Drone surveys vs traditional land surveying. Where drones add value, where they do not, and how to combine both methods on real projects.",
    intro:
      "Drone surveys are not a drop‑in replacement for all traditional survey methods, but they are a powerful addition to the toolbox. Understanding the strengths and limitations of each approach helps you choose the right mix for your project.",
    signs: [
      "You are weighing up drone surveys against conventional topographical surveys",
      "Accuracy requirements are high in some areas but more relaxed in others",
      "The site has both open land and constrained urban conditions",
      "You need frequent updates on earthworks or stockpile volumes",
      "Access, safety or programme constraints make traditional surveys difficult",
      "Stakeholders are questioning whether drones are ‘accurate enough’"
    ],
    diagnosis:
      "Traditional total‑station and GNSS surveys typically deliver the highest accuracy on hard detail and small urban sites. Drone surveys excel on large, open areas and for producing rich imagery and context. On many projects, the best results come from combining both: drones for coverage, total stations for critical checks and detail.",
    resolution:
      "We help you scope survey strategies that use each method where it performs best. Drone surveys handle wide‑area terrain and monitoring, while ground surveyors pick up control, critical levels and features where millimetre accuracy matters. Deliverables are coordinated into a single coherent dataset.",
    ctaText: "Unsure whether you need drones, traditional survey methods or both? Speak with a survey specialist for an honest recommendation.",
    relatedServices: ["drone-survey", "topographical-survey"],
    relatedPages: [
      { slug: "are-drone-surveys-accurate", category: "guides", title: "Are Drone Surveys Accurate?" },
      { slug: "how-long-does-a-drone-survey-take", category: "guides", title: "How Long Does a Drone Survey Take?" }
    ]
  },
  {
    slug: "are-drone-surveys-accurate",
    title: "Are Drone Surveys Accurate Enough for Construction?",
    metaDescription:
      "Are drone surveys accurate enough for construction and engineering design? Accuracy ranges, control strategies and when to rely on UAV data.",
    intro:
      "Drone surveys can achieve survey‑grade accuracy when they are properly controlled and used for appropriate tasks. However, the achievable accuracy always depends on flight height, camera quality, ground control strategy and site conditions. This guide sets realistic expectations for architects, engineers and contractors.",
    signs: [
      "You need to understand typical horizontal and vertical tolerances from drone data",
      "Design or setting‑out decisions will be based on drone‑derived models",
      "Stakeholders are challenging the reliability of UAV‑captured surveys",
      "The site includes features that are difficult to see clearly from the air",
      "You have seen conflicting claims about drone accuracy online",
      "You want to integrate drone data with existing survey control and drawings"
    ],
    diagnosis:
      "With good control and conditions, ground‑sample distance and error budgets can often be kept within 20–50mm for many construction applications. However, narrow features, steep façades and heavily vegetated areas are harder to model accurately. Understanding these limitations is essential before relying solely on drone outputs.",
    resolution:
      "Our partners specify flight plans, ground control and validation checks based on your tolerance requirements. Drone outputs are compared against independent check shots from total stations so any bias or distortion is identified. Where ultra‑high precision is needed, we supplement UAV data with targeted ground survey.",
    ctaText: "Need confidence in drone survey accuracy for your project? Request a drone survey quote that includes accuracy documentation and check results.",
    relatedServices: ["drone-topographical-survey", "drone-construction-survey"],
    relatedPages: [
      { slug: "how-drone-surveys-work", category: "guides", title: "How Drone Surveys Work" },
      { slug: "drone-survey-cost", category: "costs", title: "Drone Survey Cost" }
    ]
  },
  {
    slug: "how-long-does-a-drone-survey-take",
    title: "How Long Does a Drone Survey Take?",
    metaDescription:
      "How long a drone survey takes from mobilisation to deliverables. Typical timescales for small, medium and large UK sites.",
    intro:
      "Drone surveys are often significantly faster on site than traditional methods, but total project time still includes planning, permissions and data processing. This guide outlines realistic timescales so you can programme drone surveys alongside other project activities.",
    signs: [
      "You are scheduling a drone survey into a tight construction programme",
      "The site must remain operational during survey works",
      "You need to know when processed data will be available to designers",
      "Airspace or stakeholder approvals may add lead‑in time",
      "You are comparing drone survey times with conventional survey visits",
      "You anticipate repeat surveys during the build"
    ],
    diagnosis:
      "Most small to medium sites can be flown in under half a day, with processing typically completed within 2–5 working days depending on complexity. Larger or more complex schemes may require multiple visits or phased processing, particularly where earthworks or phasing constraints are involved.",
    resolution:
      "When you request a quote, our partners outline expected mobilisation times, on‑site duration and delivery dates for each type of output. For programmes that demand frequent updates, we can set up recurring survey slots and standardised reporting so data flows consistently into your project controls.",
    ctaText: "Working to a tight programme? Speak with a survey specialist about realistic drone survey timescales for your site.",
    relatedServices: ["drone-survey", "drone-construction-survey"],
    relatedPages: [
      { slug: "how-drone-surveys-work", category: "guides", title: "How Drone Surveys Work" },
      { slug: "drone-survey-cost", category: "costs", title: "Drone Survey Cost" }
    ]
  },
  {
    slug: "when-to-use-drone-surveys",
    title: "When to Use Drone Surveys on Projects",
    metaDescription:
      "When to use drone surveys on construction and infrastructure projects. Practical scenarios where drones add clear value for clients and consultants.",
    intro:
      "Drone surveys are most effective when they address a clear project need: safer access, faster coverage, richer context or more frequent monitoring. This guide highlights common scenarios where drones add value, and when traditional methods may still be the better choice.",
    signs: [
      "You need regular progress imagery and models over the life of a project",
      "Stockpile or earthworks volumes must be measured accurately and often",
      "Roof, façade or structure inspections are difficult or unsafe using traditional access",
      "Stakeholders benefit from aerial visuals in reports or consultations",
      "The site is large enough that traditional surveys would take multiple days",
      "You want to minimise time spent working near live plant, traffic or rail"
    ],
    diagnosis:
      "Drones are particularly suited to large, open or hazardous environments where access is challenging. They are less appropriate for heavily constrained urban sites with limited sky visibility, or where fine internal detail is the primary focus. Used alongside ground survey methods they can significantly reduce overall risk and time on site.",
    resolution:
      "We help project teams evaluate whether drones are the right tool for each phase. Where they are, we coordinate drone and ground surveys so deliverables line up in the same coordinate system and drop straight into your CAD, BIM or GIS environments.",
    ctaText: "Not sure whether your project is a good fit for drone surveys? Speak with a specialist and we’ll provide clear, practical guidance.",
    relatedServices: ["drone-survey", "drone-building-inspection", "drone-roof-inspection"],
    relatedPages: [
      { slug: "drone-surveys-vs-traditional-surveys", category: "guides", title: "Drone Surveys vs Traditional Surveys" },
      { slug: "drone-survey-for-construction", category: "guides", title: "Drone Surveys for Construction" }
    ]
  },
  {
    slug: "drone-survey-for-construction",
    title: "Drone Surveys for Construction",
    metaDescription:
      "How drone surveys support construction projects. Progress monitoring, volumetrics, as-built verification and stakeholder reporting.",
    intro:
      "Drone surveys are increasingly used throughout the construction lifecycle — from pre‑start site baselines and earthworks monitoring to as‑built verification and handover. They provide repeatable, georeferenced data that supports programme control, volume calculations and design compliance.",
    signs: [
      "You need regular progress imagery or models during the build",
      "Earthworks, stockpiles or cut‑and‑fill volumes must be measured",
      "Design vs as‑built checks are required at key stages",
      "Stakeholders or funders expect visual progress reporting",
      "The site is large or hazardous for frequent ground survey visits",
      "You want to reduce time on live carriageways or near plant"
    ],
    diagnosis:
      "Construction drone surveys typically follow a fixed control network and repeat flight plan so each visit is directly comparable. Processing produces orthophotos, surface models and volume reports that integrate with project controls and design models.",
    resolution:
      "Our partners set up construction survey programmes with clear cadence, deliverables and accuracy requirements. Outputs are aligned to your grid and coordinate system so designers and QS teams can use them for progress, payments and handover without rework.",
    ctaText: "Need a construction drone survey programme? Request a quote for repeat surveys tailored to your programme and deliverables.",
    relatedServices: ["drone-construction-survey", "drone-topographical-survey", "drone-survey"],
    relatedPages: [
      { slug: "when-to-use-drone-surveys", category: "guides", title: "When to Use Drone Surveys" },
      { slug: "drone-survey-cost", category: "costs", title: "Drone Survey Cost" }
    ]
  },

  // DRAINAGE OVERLAP & CROSS-VERTICAL EDUCATION
  {
    slug: "who-carries-out-drain-surveys",
    title: "Who Carries Out Drain Surveys – Drainage Companies or Surveyors?",
    metaDescription:
      "Who should carry out a drain survey in the UK? When to call a drainage contractor, land surveyor or civil engineer for drainage investigations.",
    intro:
      "Property owners are often unsure whether to call a drainage company, a land surveyor or a civil engineer when they need drains investigated. The answer depends on whether you are diagnosing a blockage or structural problem, or gathering information for design, planning or development.",
    signs: [
      "You have an active drainage problem such as blockage, flooding or foul smells",
      "You are buying a property and need a pre‑purchase drain report",
      "You are planning an extension or development that will alter drainage",
      "Insurers or lenders have asked for evidence about drain condition",
      "You need long‑term drainage capacity information for a new scheme",
      "You are not sure whether the issue is ‘maintenance’ or ‘design’"
    ],
    diagnosis:
      "CCTV drain surveys for blockages, collapses and everyday faults are usually carried out by specialist drainage contractors using dedicated CCTV equipment. Where drainage information is required for planning, design or capacity modelling, civil engineers and land surveyors become more involved, often working alongside drainage companies.",
    resolution:
      "As a rule of thumb, reactive issues such as blockages and emergency flooding should go to a drainage specialist first. For projects that involve new drainage design, diversions or adoption, your architect or engineer will typically coordinate survey requirements with both surveyors and drainage partners. If you need a pure drainage inspection rather than a land survey, visit our drainage partner at mainlinedrains.co.uk.",
    ctaText: "Not sure whether you need a drainage contractor or a land surveyor? Speak with a survey specialist and we’ll point you in the right direction.",
    relatedServices: ["utility-mapping-survey", "topographical-survey"],
    relatedPages: [
      { slug: "can-surveyors-inspect-drains", category: "guides", title: "Can Surveyors Inspect Drains?" },
      { slug: "drain-survey-vs-cctv-drain-survey", category: "guides", title: "Drain Survey vs CCTV Drain Survey" }
    ]
  },
  {
    slug: "drain-survey-vs-cctv-drain-survey",
    title: "Drain Survey vs CCTV Drain Survey",
    metaDescription:
      "Drain survey vs CCTV drain survey. Difference between simple CCTV inspections and wider drainage investigations for design and development.",
    intro:
      "The term “drain survey” is used loosely in the UK. Sometimes it means a simple CCTV camera run to identify a blockage; in other cases it refers to a full drainage investigation that maps pipe routes, depths and capacities for design. Understanding the difference helps you order the right level of service.",
    signs: [
      "You received quotes that vary widely for what is described as a ‘drain survey’",
      "One contractor refers to a quick CCTV check, another to full mapping and reports",
      "Your architect or engineer needs drainage information for design, not just repair",
      "Insurers have asked for a drain survey after subsidence or escape of water",
      "You need to know where drains run for new foundations or extensions",
      "There is confusion over what will actually be delivered on site"
    ],
    diagnosis:
      "A basic CCTV drain survey focuses on internal pipe condition along accessible runs and produces video and a short report. A full drainage survey combines CCTV, tracing, mapping and level checks to create drawings that show pipe locations, depths, sizes and gradients. Only the latter supports design and long‑term asset management.",
    resolution:
      "When you request support through this site we clarify your objective first: fault‑finding, insurance evidence, or design information. For reactive drainage issues we refer you to a drainage specialist such as mainlinedrains.co.uk. For development and design work, our survey partners provide integrated drainage and topographical survey packages.",
    ctaText: "Need more than a quick CCTV check? Request a drainage mapping and survey quote that supports your wider project goals.",
    relatedServices: ["utility-mapping-survey", "topographical-survey"],
    relatedPages: [
      { slug: "who-carries-out-drain-surveys", category: "guides", title: "Who Carries Out Drain Surveys?" },
      { slug: "can-surveyors-inspect-drains", category: "guides", title: "Can Surveyors Inspect Drains?" }
    ]
  },
  {
    slug: "can-surveyors-inspect-drains",
    title: "Can Land Surveyors Inspect Drains?",
    metaDescription:
      "Can land surveyors inspect drains? When surveyors are involved in drainage work and when you should call a dedicated drainage specialist instead.",
    intro:
      "Land surveyors are not a replacement for specialist drainage contractors, but they do play an important role in drainage‑related projects. Surveyors focus on location, levels and relationships between features; drainage companies focus on internal pipe condition and repair.",
    signs: [
      "You need drainage information for planning, SuDS design or capacity studies",
      "Engineers have requested levels to gulleys, manholes and outfalls",
      "You want a coordinated plan of drains alongside other site features",
      "There is uncertainty over where private drains become public sewers",
      "Drainage problems are linked to wider ground or boundary issues",
      "You are unsure how drainage information ties into your topographical survey"
    ],
    diagnosis:
      "Surveyors typically record manhole locations, cover levels, invert levels, pipe sizes and directions as part of a topographical or utility survey. Where internal condition is important, they work alongside drainage contractors who provide CCTV reports. Combining both datasets gives engineers a complete picture.",
    resolution:
      "If your immediate need is to unblock or repair a drain, a drainage specialist is the right first call. If you need drainage information to support planning, civil design or development decisions, our survey partners can combine topographical, utility and level surveys into a single package and coordinate with your chosen drainage contractor.",
    ctaText: "Need drainage information as part of a wider land survey? Request a combined survey quote and we’ll coordinate with drainage specialists where needed.",
    relatedServices: ["topographical-survey", "utility-mapping-survey"],
    relatedPages: [
      { slug: "who-carries-out-drain-surveys", category: "guides", title: "Who Carries Out Drain Surveys?" },
      { slug: "what-is-gpr-utility-mapping", category: "guides", title: "What Is GPR Utility Mapping?" }
    ]
  }
];
