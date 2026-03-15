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
  },

  // BUILDING SURVEY & INSPECTION CLUSTER
  {
    slug: "building-survey-vs-homebuyer-survey",
    title: "Building Survey vs Homebuyer Survey",
    metaDescription:
      "Building survey vs homebuyer survey in the UK. When to choose a full building survey or a homebuyer report before buying a property.",
    intro:
      "When buying a property, the right survey helps you understand condition and risk. A homebuyer report is a mid-level option; a full building survey goes deeper and is often recommended for older or non-standard properties. This guide explains the difference and when each is appropriate.",
    signs: [
      "You are buying a property and unsure which survey level to commission",
      "The property is over 50 years old or has visible signs of age",
      "You want to understand structural condition before exchange",
      "Your lender has requested a valuation but you want more detail",
      "The property has been extended, converted or is listed",
      "You are considering a homebuyer report vs a full building survey"
    ],
    diagnosis:
      "Surveyors assess the property type, age and your risk tolerance. A homebuyer report uses a standard format and traffic-light ratings; a building survey is more detailed and tailored, with a full description of construction and defects. We can advise which level fits your situation.",
    resolution:
      "Our survey partners deliver homebuyer reports and full building surveys to RICS standards. You receive a clear written report with condition ratings and recommendations. For complex or older buildings, a building survey typically provides the best value by identifying issues early.",
    ctaText: "Not sure which survey you need? Request a quote and we’ll recommend the right level for your purchase.",
    relatedServices: ["measured-building-survey", "topographical-survey"],
    relatedPages: [
      { slug: "when-you-need-structural-survey", category: "guides", title: "When You Need a Structural Survey" },
      { slug: "survey-inspections-buying-commercial-property", category: "guides", title: "Survey Inspections Before Buying Commercial Property" }
    ]
  },
  {
    slug: "when-you-need-structural-survey",
    title: "When You Need a Structural Survey",
    metaDescription:
      "When you need a structural survey in the UK. Signs that a structural or building survey is necessary before buying or renovating.",
    intro:
      "Structural concerns—subsidence, cracking, roof structure, damp—can be costly to put right. A structural or building survey identifies defects and helps you decide whether to proceed, renegotiate or walk away. This guide explains when a structural survey is recommended.",
    signs: [
      "Visible cracking, uneven floors or sticking doors",
      "The property is pre-1920, timber-framed or has had significant alterations",
      "You are buying at auction or without a full marketing history",
      "Neighbours or searches mention mining, clay or flood risk",
      "You plan major renovation and need to understand the structure",
      "Your solicitor or lender has flagged condition concerns"
    ],
    diagnosis:
      "A qualified surveyor inspects the structure, foundations, roof and drainage. They report on condition, identify causes of defects where possible and recommend further investigations (e.g. structural engineer) if needed. The report forms part of your due diligence.",
    resolution:
      "We work with RICS-registered surveyors who deliver building surveys and, where appropriate, coordinate with structural engineers. You get a clear report with condition ratings and advice on next steps before you commit to the purchase or works.",
    ctaText: "Worried about structural condition? Request a building or structural survey quote.",
    relatedServices: ["measured-building-survey", "drone-roof-inspection"],
    relatedPages: [
      { slug: "building-survey-vs-homebuyer-survey", category: "guides", title: "Building Survey vs Homebuyer Survey" },
      { slug: "what-structural-survey-includes", category: "guides", title: "What a Structural Survey Includes" }
    ]
  },
  {
    slug: "cost-building-survey-uk",
    title: "Cost of a Building Survey in the UK",
    metaDescription:
      "Cost of a building survey in the UK. What affects the price of a full building survey and what you can expect to pay.",
    intro:
      "Building survey costs depend on property size, type and location. A full building survey is typically more expensive than a homebuyer report but provides greater detail and is often worthwhile for older or complex properties. This guide outlines typical cost ranges and what influences the quote.",
    signs: [
      "You are budgeting for a purchase and want to allow for survey costs",
      "Comparing quotes from different surveyors",
      "The property is large, listed or has multiple buildings",
      "You need a survey quickly and want to understand premium options",
      "Your mortgage valuation is not enough and you want a full survey"
    ],
    diagnosis:
      "Surveyors quote based on property value band, size, complexity and location. Additional services (drainage, damp, timber) may be included or quoted separately. We can provide fixed-price quotes once property details are known.",
    resolution:
      "Our partners provide transparent quotes for building surveys and homebuyer reports. You receive a clear scope and price before instruction. Costs are typically in the hundreds to low thousands depending on the property; we’ll advise what to expect for your situation.",
    ctaText: "Need a building survey quote? Request a quote and we’ll provide a fixed price for your property.",
    relatedServices: ["measured-building-survey", "topographical-survey"],
    relatedPages: [
      { slug: "measured-building-survey-cost", category: "costs", title: "Measured Building Survey Cost" },
      { slug: "building-survey-vs-homebuyer-survey", category: "guides", title: "Building Survey vs Homebuyer Survey" }
    ]
  },
  {
    slug: "what-structural-survey-includes",
    title: "What a Structural Survey Includes",
    metaDescription:
      "What a structural survey includes in the UK. Scope of a full building survey and what the report covers.",
    intro:
      "A full building (structural) survey examines the condition of the property inside and out. It covers structure, damp, timber, drainage and services so you know what you are buying. This guide explains what is included in the survey and report.",
    signs: [
      "You have commissioned or are considering a full building survey",
      "You want to understand what the surveyor will inspect",
      "The report has arrived and you need to interpret sections",
      "You are comparing survey types and want to know the scope",
      "Your conveyancer has recommended a building survey"
    ],
    diagnosis:
      "The surveyor inspects accessible parts of the structure, roof, walls, floors, drainage and visible services. They note defects, causes where evident and recommend further investigations or repairs. The report is written in plain English with condition ratings.",
    resolution:
      "You receive a detailed report with sections on each element, condition ratings and a summary of urgent and non-urgent issues. Our partners follow RICS standards so the scope and format are consistent and recognised by lenders and solicitors.",
    ctaText: "Want to know what a building survey will cover? We can explain the scope and provide a quote.",
    relatedServices: ["measured-building-survey", "drone-roof-inspection"],
    relatedPages: [
      { slug: "when-you-need-structural-survey", category: "guides", title: "When You Need a Structural Survey" },
      { slug: "surveying-older-buildings-renovation", category: "guides", title: "Surveying Older Buildings Before Renovation" }
    ]
  },
  {
    slug: "when-get-measured-building-survey",
    title: "When to Get a Measured Building Survey",
    metaDescription:
      "When to get a measured building survey. Before extensions, refurbishment and change of use—why accurate as-built drawings matter.",
    intro:
      "A measured building survey produces accurate floor plans, elevations and sections of an existing building. Architects and designers use them for extensions, refurbishments and planning applications. This guide explains when a measured building survey is needed and what it delivers.",
    signs: [
      "You are planning an extension, refurbishment or change of use",
      "Your architect has requested accurate existing drawings",
      "Existing plans are outdated, incomplete or not to scale",
      "You need to coordinate structure, M&E and space planning",
      "Planning or building control requires as-existing drawings",
      "You are working in BIM and need a reliable base model"
    ],
    diagnosis:
      "Surveyors assess the building size, complexity and required deliverables (plans only, or plans plus elevations and sections). They recommend survey method—total station, laser scanning or both—and quote on that basis.",
    resolution:
      "We deliver measured building surveys as 2D CAD or 3D/BIM-ready data. Drawings are layered and annotated to your or industry standards. You get a single source of truth for the existing building so design and construction can proceed with confidence.",
    ctaText: "Planning a refurbishment or extension? Request a measured building survey quote.",
    relatedServices: ["measured-building-survey", "laser-scanning-survey", "topographical-survey"],
    relatedPages: [
      { slug: "measured-building-survey-renovations", category: "guides", title: "Measured Building Survey for Renovations" },
      { slug: "survey-for-planning-permission", category: "guides", title: "What Survey Do I Need for Planning Permission?" }
    ]
  },
  {
    slug: "measured-building-survey-renovations",
    title: "Measured Building Survey for Renovations",
    metaDescription:
      "Measured building survey for renovations. Accurate as-built drawings before refurbishment, conversion and extension projects.",
    intro:
      "Renovations and conversions depend on knowing what is already there. Guessing dimensions from old plans or site visits leads to costly changes on site. A measured building survey gives you accurate floor plans, elevations and sections so your design fits the building.",
    signs: [
      "You are refurbishing or converting an existing building",
      "Room dimensions, ceiling heights and openings need to be accurate",
      "You are designing kitchens, bathrooms or fitted furniture",
      "Party walls, staircases or irregular layouts complicate design",
      "You need to coordinate with structural or M&E designs",
      "Previous projects have suffered from poor existing information"
    ],
    diagnosis:
      "Surveyors capture internal and external dimensions using laser scanning and/or total stations. They produce plans, elevations and sections to the level of detail your project needs. For complex or heritage buildings, laser scanning is often the most efficient approach.",
    resolution:
      "Our partners deliver measured building surveys tailored to renovation projects. Outputs include CAD and, where required, point clouds or simple 3D models. You get a reliable base for design and a clear record of what was there before works started.",
    ctaText: "Starting a renovation? Get accurate existing drawings with a measured building survey.",
    relatedServices: ["measured-building-survey", "laser-scanning-survey"],
    relatedPages: [
      { slug: "when-get-measured-building-survey", category: "guides", title: "When to Get a Measured Building Survey" },
      { slug: "surveying-older-buildings-renovation", category: "guides", title: "Surveying Older Buildings Before Renovation" }
    ]
  },
  {
    slug: "topographical-survey-construction-projects",
    title: "Topographical Survey for Construction Projects",
    metaDescription:
      "Topographical survey for construction projects. Site levels, boundaries and features for design and setting out in the UK.",
    intro:
      "Construction projects need an accurate picture of the site—levels, boundaries, buildings, drainage and access. A topographical survey provides that base so architects, engineers and contractors can design and build with confidence. This guide explains how topographical surveys support construction.",
    signs: [
      "You are starting a new-build, extension or civil project",
      "Architects or engineers have requested a topographical survey",
      "Site levels, drainage or boundaries are unclear",
      "You need to set out foundations, roads or services",
      "Planning or design requires accurate existing drawings",
      "Multiple consultants need a shared site reference"
    ],
    diagnosis:
      "Surveyors capture ground levels, features and services to the accuracy your project requires. They use total stations, GNSS and sometimes laser scanning depending on site size and complexity. Deliverables are typically 2D or 3D CAD in your chosen coordinate system.",
    resolution:
      "We deliver topographical surveys for construction projects with clear CAD outputs and a survey report. Data can be tied to OS grid or local control. You get a single source of truth for the site so design, planning and construction stay aligned.",
    ctaText: "Need a topographical survey for your construction project? Request a quote.",
    relatedServices: ["topographical-survey", "utility-mapping-survey", "measured-building-survey"],
    relatedPages: [
      { slug: "survey-for-planning-permission", category: "guides", title: "What Survey Do I Need for Planning Permission?" },
      { slug: "survey-before-building-extension", category: "guides", title: "Do I Need a Survey Before Building an Extension?" }
    ]
  },
  {
    slug: "utility-mapping-survey-building-works",
    title: "Utility Mapping Survey for Building Works",
    metaDescription:
      "Utility mapping survey for building works. Locating buried services before excavation and construction in the UK.",
    intro:
      "Before digging or building, you need to know where underground services run. A utility mapping survey locates and maps pipes, cables and ducts so you can design foundations, drainage and access without striking services. This guide explains when and how utility mapping supports building works.",
    signs: [
      "You are excavating for foundations, drainage or landscaping",
      "Existing utility records are incomplete or conflicting",
      "You need to route new services and avoid existing ones",
      "CDM or safe system of work requires service location",
      "The site has multiple utility owners or unknown assets",
      "You want to reduce the risk of service strikes and delays"
    ],
    diagnosis:
      "Surveyors use electromagnetic location (EML), GPR and record research to map buried services. They classify findings by confidence level and produce drawings that designers and contractors can use for planning and excavation.",
    resolution:
      "Our partners deliver utility mapping surveys with CAD drawings and a report explaining methodology and limitations. You get a clear picture of subsurface constraints and can plan excavation and design accordingly.",
    ctaText: "Planning building works? Get a utility mapping survey to de-risk excavation.",
    relatedServices: ["utility-mapping-survey", "topographical-survey"],
    relatedPages: [
      { slug: "survey-before-property-development", category: "guides", title: "Surveys Required Before Property Development" },
      { slug: "survey-reports-planning-permission", category: "guides", title: "Survey Reports Required for Planning Permission" }
    ]
  },
  {
    slug: "drone-roof-inspection-commercial-buildings",
    title: "Drone Roof Inspections for Commercial Buildings",
    metaDescription:
      "Drone roof inspections for commercial buildings. Safe, detailed roof surveys without scaffolding for UK businesses.",
    intro:
      "Commercial roof inspections often require access at height. Drones can capture high-resolution imagery and video of roof surfaces, gutters and flashings without scaffolding or cherry pickers, reducing cost and disruption. This guide explains when drone roof inspections are appropriate for commercial premises.",
    signs: [
      "You need to inspect roof condition without full scaffolding",
      "Leaks, storm damage or ageing roofing need assessment",
      "You are buying or maintaining a commercial property",
      "Access is difficult or dangerous for traditional inspection",
      "You want a visual record for insurance or maintenance planning",
      "Flat roofs, gutters or high-level details need checking"
    ],
    diagnosis:
      "Operators fly drones over the roof to capture stills and video. Imagery is reviewed for defects, ponding, vegetation and damage. For some buildings, thermal or multispectral sensors can help identify moisture or insulation issues. We advise on the right level of inspection for your situation.",
    resolution:
      "You receive a report with annotated imagery and recommendations. Where needed, we can coordinate with roofing contractors or structural surveyors. Drone inspections are carried out by CAA-approved operators with appropriate insurance.",
    ctaText: "Need a roof inspection without scaffolding? Request a drone roof inspection quote.",
    relatedServices: ["drone-roof-inspection", "measured-building-survey"],
    relatedPages: [
      { slug: "drone-roof-inspection-vs-traditional", category: "guides", title: "Drone Roof Inspection vs Traditional Inspection" },
      { slug: "when-you-need-structural-survey", category: "guides", title: "When You Need a Structural Survey" }
    ]
  },
  {
    slug: "drone-roof-inspection-vs-traditional",
    title: "Drone Roof Inspection vs Traditional Inspection",
    metaDescription:
      "Drone roof inspection vs traditional inspection. When to use drones and when scaffolding or rope access is better for UK properties.",
    intro:
      "Roof inspections can be done by drone, scaffolding, cherry picker or rope access. Each has pros and cons in terms of cost, detail and access. This guide compares drone and traditional roof inspections so you can choose the right approach for your property.",
    signs: [
      "You need a roof survey and are comparing methods",
      "Scaffolding is expensive or impractical",
      "You need a quick visual assessment for insurance or sale",
      "Detailed close-up inspection of specific defects is required",
      "The building is high or access is restricted",
      "You want to minimise disruption to occupants or operations"
    ],
    diagnosis:
      "Drones suit large areas, first-pass assessments and hard-to-reach roofs. Traditional access may be better where close-up tactile inspection, sampling or repair work is needed. We can advise which method fits your building and objectives.",
    resolution:
      "Our partners offer both drone and traditional roof surveys. We recommend the most appropriate method and provide a clear scope and quote. For many commercial buildings, a drone survey is a cost-effective first step; we can arrange follow-up access if needed.",
    ctaText: "Not sure whether to use a drone or traditional roof inspection? We can advise and quote.",
    relatedServices: ["drone-roof-inspection", "measured-building-survey"],
    relatedPages: [
      { slug: "drone-roof-inspection-commercial-buildings", category: "guides", title: "Drone Roof Inspections for Commercial Buildings" },
      { slug: "what-structural-survey-includes", category: "guides", title: "What a Structural Survey Includes" }
    ]
  },
  {
    slug: "laser-scanning-surveys-large-buildings",
    title: "Laser Scanning Surveys for Large Buildings",
    metaDescription:
      "Laser scanning surveys for large buildings. 3D point clouds and as-built data for commercial and industrial premises in the UK.",
    intro:
      "Large or complex buildings are difficult to survey with traditional methods. Laser scanning captures millions of points to create a 3D point cloud, giving designers and operators an accurate as-built model. This guide explains when laser scanning is the right choice for large buildings.",
    signs: [
      "The building is large, complex or has irregular geometry",
      "You need as-built data for refurbishment, M&E or BIM",
      "Traditional measured survey would be slow or incomplete",
      "Multiple floors, atria or plant rooms need to be captured",
      "You want to avoid multiple site visits",
      "Clash detection or coordination with new design is critical"
    ],
    diagnosis:
      "Surveyors deploy static or mobile laser scanners to capture the building interior and exterior. Point clouds are registered, cleaned and can be modelled to the level of detail you need. We advise on scan density, control and deliverables for your project.",
    resolution:
      "You receive point clouds in standard formats (e.g. E57, LAS) and, where required, 2D/3D CAD or BIM elements. Our partners work to agreed accuracy and coverage so your design team has a reliable base for coordination and construction.",
    ctaText: "Need a laser scanning survey for a large building? Request a quote.",
    relatedServices: ["laser-scanning-survey", "measured-building-survey", "topographical-survey"],
    relatedPages: [
      { slug: "survey-for-architectural-design", category: "guides", title: "Surveys for Architectural Design and BIM" },
      { slug: "when-get-measured-building-survey", category: "guides", title: "When to Get a Measured Building Survey" }
    ]
  },
  {
    slug: "boundary-surveys-property-disputes",
    title: "Boundary Surveys for Property Disputes",
    metaDescription:
      "Boundary surveys for property disputes in the UK. When you need a boundary survey for disputes, conveyancing and Land Registry.",
    intro:
      "Boundary disputes often turn on where the legal boundary lies and where physical features sit relative to it. A boundary survey measures the position of fences, walls and other features and can be tied to title plans and the national grid. This guide explains when a boundary survey is needed for disputes.",
    signs: [
      "A neighbour or legal dispute involves boundary position",
      "You are buying or selling and the boundary is unclear",
      "You plan to build close to the boundary and need certainty",
      "Title plans are ambiguous or inconsistent with physical features",
      "Your solicitor has recommended a boundary survey",
      "You need evidence for court, mediation or Land Registry"
    ],
    diagnosis:
      "Surveyors measure the position of boundary features and compare them to title documents and, where available, historical evidence. They produce a plan and report that can be used by solicitors and the courts. Surveys are carried out to a standard that meets legal and professional expectations.",
    resolution:
      "You receive a plan showing measured positions and a report explaining how the survey was done and how it relates to the title. Our partners work with solicitors and can provide expert input where required. The survey gives you a clear factual base for resolving the dispute.",
    ctaText: "In a boundary dispute? Request a boundary survey quote and we’ll advise on scope.",
    relatedServices: ["boundary-survey", "topographical-survey"],
    relatedPages: [
      { slug: "survey-reports-planning-permission", category: "guides", title: "Survey Reports Required for Planning Permission" },
      { slug: "survey-before-building-extension", category: "guides", title: "Do I Need a Survey Before Building an Extension?" }
    ]
  },
  {
    slug: "survey-reports-planning-permission",
    title: "Survey Reports Required for Planning Permission",
    metaDescription:
      "Survey reports required for planning permission in the UK. Topographical, measured building and other surveys for planning applications.",
    intro:
      "Planning applications often need to be supported by accurate survey information. Councils expect to see existing site and building data that is up to date and properly prepared. This guide outlines which survey reports are commonly required for planning permission and when to commission them.",
    signs: [
      "You are preparing a planning application for new build, extension or change of use",
      "The local authority has requested existing drawings or levels",
      "Your architect has asked for a topographical or measured building survey",
      "Drainage, visibility or design constraints need to be shown accurately",
      "The site has level changes, trees or neighbouring buildings that affect the design",
      "You want to avoid delays or refusals due to inadequate survey information"
    ],
    diagnosis:
      "Requirements vary by authority and project type. Typically a topographical survey of the site and, where existing buildings are affected, a measured building survey are needed. Boundary and utility surveys may also be required. We can advise on the right package for your application.",
    resolution:
      "Our partners deliver planning-ready survey packs with CAD drawings and reports. We coordinate with your architect so the survey captures what planners need in one visit. You get a solid evidence base for your application and reduce the risk of requests for further information.",
    ctaText: "Applying for planning permission? Request a survey quote tailored to your application.",
    relatedServices: ["topographical-survey", "measured-building-survey", "utility-mapping-survey"],
    relatedPages: [
      { slug: "survey-for-planning-permission", category: "guides", title: "What Survey Do I Need for Planning Permission?" },
      { slug: "topographical-survey-construction-projects", category: "guides", title: "Topographical Survey for Construction Projects" }
    ]
  },
  {
    slug: "surveying-older-buildings-renovation",
    title: "Surveying Older Buildings Before Renovation",
    metaDescription:
      "Surveying older buildings before renovation in the UK. Measured surveys and condition assessments for period and listed properties.",
    intro:
      "Older and listed buildings need careful assessment before renovation. Inaccurate or incomplete information leads to surprises during strip-out and construction. A measured building survey and, where relevant, a condition or structural assessment give you a clear picture before you commit to design and cost.",
    signs: [
      "You are renovating a period, listed or pre-1900 building",
      "Existing drawings are missing or unreliable",
      "You need to understand construction, materials and condition",
      "Structural or conservation concerns have been raised",
      "You are designing services, insulation or damp proofing",
      "Funders or insurers require a survey or condition report"
    ],
    diagnosis:
      "Surveyors combine measured building survey with observation of construction type, defects and materials. For listed buildings, the level of detail and any intrusive investigation must be agreed with the conservation officer. We can scope a survey that balances information need with sensitivity.",
    resolution:
      "You receive accurate as-built drawings and a report on condition and construction. Where appropriate we coordinate with structural engineers or conservation specialists. The survey forms a baseline for design and helps avoid costly changes once work has started.",
    ctaText: "Renovating an older building? Get a measured building survey and condition assessment.",
    relatedServices: ["measured-building-survey", "laser-scanning-survey", "drone-roof-inspection"],
    relatedPages: [
      { slug: "measured-building-survey-renovations", category: "guides", title: "Measured Building Survey for Renovations" },
      { slug: "what-structural-survey-includes", category: "guides", title: "What a Structural Survey Includes" }
    ]
  },
  {
    slug: "survey-inspections-buying-commercial-property",
    title: "Survey Inspections Before Buying Commercial Property",
    metaDescription:
      "Survey inspections before buying commercial property in the UK. Building surveys, measured surveys and due diligence for investors.",
    intro:
      "Buying commercial property involves significant capital and risk. Survey inspections—building surveys, measured surveys, drainage and structural assessments—help you understand condition and liability before exchange. This guide outlines which surveys to consider when buying commercial premises.",
    signs: [
      "You are purchasing commercial property or a portfolio",
      "You need to understand building condition and repair liability",
      "The property is multi-let, mixed-use or has complex services",
      "You want to budget for immediate and future works",
      "Lenders or partners require independent survey advice",
      "You are comparing several properties and need consistent information"
    ],
    diagnosis:
      "Surveyors assess the building fabric, services, compliance and any specialist areas (e.g. drainage, asbestos). Measured building surveys support refurbishment or redevelopment plans. We can put together a survey package that matches your due diligence needs and timescale.",
    resolution:
      "You receive clear reports on condition, defects and recommendations. Where relevant we deliver measured surveys and utility information so you have a full picture for design and cost planning. Our partners work to RICS and industry standards so your advisers and lenders can rely on the output.",
    ctaText: "Buying commercial property? Request a survey package for your due diligence.",
    relatedServices: ["measured-building-survey", "topographical-survey", "utility-mapping-survey", "drone-roof-inspection"],
    relatedPages: [
      { slug: "building-survey-vs-homebuyer-survey", category: "guides", title: "Building Survey vs Homebuyer Survey" },
      { slug: "when-you-need-structural-survey", category: "guides", title: "When You Need a Structural Survey" }
    ]
  }
];
