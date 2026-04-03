export interface ScaffoldingProject {
  id: string;
  title: string;
  location: string;
  description: string;
  serviceSlug: string;
  imageIndex: number;
}

export const projects: ScaffoldingProject[] = [
  {
    id: "proj-1",
    title: "Domestic re-roof scaffold — Richmond",
    location: "Richmond, Surrey",
    description: "Full perimeter scaffold for a detached Victorian property undergoing complete roof replacement including new ridge tiles and lead valley work.",
    serviceSlug: "roof-scaffolding",
    imageIndex: 0,
  },
  {
    id: "proj-2",
    title: "Commercial facade access — London",
    location: "Central London",
    description: "Multi-level facade scaffold for a five-storey commercial building undergoing full window and cladding replacement over a six-week programme.",
    serviceSlug: "commercial-scaffolding",
    imageIndex: 1,
  },
  {
    id: "proj-3",
    title: "Chimney scaffold — Chiswick",
    location: "Chiswick, London",
    description: "Chimney-head scaffold for a shared terrace chimney stack requiring full repointing, new flaunching and pot replacement.",
    serviceSlug: "chimney-scaffolding",
    imageIndex: 2,
  },
  {
    id: "proj-4",
    title: "Extension scaffold — Guildford",
    location: "Guildford, Surrey",
    description: "Two-storey extension scaffold for a rear house extension including roof scaffolding and edge protection for the new timber frame roof structure.",
    serviceSlug: "domestic-scaffolding",
    imageIndex: 3,
  },
  {
    id: "proj-5",
    title: "Temporary roof — Kingston upon Thames",
    location: "Kingston upon Thames",
    description: "Full temporary roof structure over a detached house during a complete strip and re-roof in winter, protecting the building throughout the works.",
    serviceSlug: "temporary-roofing",
    imageIndex: 4,
  },
  {
    id: "proj-6",
    title: "Emergency scaffold — Twickenham",
    location: "Twickenham",
    description: "Out-of-hours emergency scaffold erected following storm damage to a semi-detached roof, providing immediate protection and access for the loss adjuster.",
    serviceSlug: "emergency-scaffolding",
    imageIndex: 5,
  },
];
