export interface ScaffoldingProject {
  id: string;
  title: string;
  location: string;
  description: string;
  serviceSlug: string;
  imagePrompt: string;
  image: string;
  imageIndex: number;
}

export const projects: ScaffoldingProject[] = [
  {
    id: "project-scaffolding-1",
    title: "Domestic re-roof scaffold — Richmond",
    location: "Richmond, Surrey",
    description: "Full perimeter scaffold for a detached Victorian property undergoing complete roof replacement including new ridge tiles and lead valley work.",
    serviceSlug: "roof-scaffolding",
    imagePrompt: "domestic roof scaffolding around detached Victorian house, full perimeter scaffold, roofing works underway, realistic daylight, UK residential street",
    image: "/images/projects/project-scaffolding-1.jpg",
    imageIndex: 0,
  },
  {
    id: "project-scaffolding-2",
    title: "Commercial facade access — London",
    location: "Central London",
    description: "Multi-level facade scaffold for a five-storey commercial building undergoing full window and cladding replacement over a six-week programme.",
    serviceSlug: "commercial-scaffolding",
    imagePrompt: "commercial facade scaffolding on five-storey city building, sheeting and access lifts, central London streetscape, realistic construction photography",
    image: "/images/projects/project-scaffolding-2.jpg",
    imageIndex: 1,
  },
  {
    id: "project-scaffolding-3",
    title: "Chimney scaffold — Chiswick",
    location: "Chiswick, London",
    description: "Chimney-head scaffold for a shared terrace chimney stack requiring full repointing, new flaunching and pot replacement.",
    serviceSlug: "chimney-scaffolding",
    imagePrompt: "chimney scaffold above London terraced houses, scaffold lift around chimney stack, roofline access for masonry repairs, realistic overcast daylight",
    image: "/images/projects/project-scaffolding-3.jpg",
    imageIndex: 2,
  },
  {
    id: "project-scaffolding-4",
    title: "Extension scaffold — Guildford",
    location: "Guildford, Surrey",
    description: "Two-storey extension scaffold for a rear house extension including roof scaffolding and edge protection for the new timber frame roof structure.",
    serviceSlug: "domestic-scaffolding",
    imagePrompt: "two-storey domestic extension scaffold at rear of house, timber frame roof build, edge protection, suburban UK property, realistic site photo",
    image: "/images/projects/project-scaffolding-4.jpg",
    imageIndex: 3,
  },
  {
    id: "project-scaffolding-5",
    title: "Temporary roof — Kingston upon Thames",
    location: "Kingston upon Thames",
    description: "Full temporary roof structure over a detached house during a complete strip and re-roof in winter, protecting the building throughout the works.",
    serviceSlug: "temporary-roofing",
    imagePrompt: "temporary roof scaffold covering detached house during reroof, shrink-wrap weather protection, winter light, realistic UK residential construction",
    image: "/images/projects/project-scaffolding-5.jpg",
    imageIndex: 4,
  },
  {
    id: "project-scaffolding-6",
    title: "Emergency scaffold — Twickenham",
    location: "Twickenham",
    description: "Out-of-hours emergency scaffold erected following storm damage to a semi-detached roof, providing immediate protection and access for the loss adjuster.",
    serviceSlug: "emergency-scaffolding",
    imagePrompt: "emergency roof scaffolding on storm-damaged semi-detached house, temporary protection, evening response scene, realistic UK scaffolding team",
    image: "/images/projects/project-scaffolding-6.jpg",
    imageIndex: 5,
  },
];
