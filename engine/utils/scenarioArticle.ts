import type { ArticleDetailData, ArticleFaq, ArticleIntent } from "../components/ArticleDetailPage";

export interface ScenarioArticleDefinition {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  category: string;
  intent: ArticleIntent;
  serviceSlug: string;
  serviceTitle: string;
  locationId: string;
  locationName: string;
  propertyType: string;
  specificIssue: string;
  constraints: string[];
  issueSummary: string;
  handledSummary: string;
  resultSummary: string;
  whenNeededSummary: string;
  relatedServiceLinks: Array<{ href: string; label: string }>;
  guideLink: { href: string; label: string };
  projectLink?: { href: string; label: string };
  faq?: ArticleFaq[];
}

function intentFraming(intent: ArticleIntent) {
  switch (intent) {
    case "diagnostic":
      return {
        sectionOne: "The job is useful because it shows what the early signs looked like before the issue turned into a wider repair.",
        sectionFour: "This is most useful when someone needs to decide whether the symptoms justify a site visit, survey, or immediate reactive work.",
      };
    case "explanatory":
      return {
        sectionOne: "The value in the example is that it shows the cause in context rather than describing the service in the abstract.",
        sectionFour: "This is most useful when the cause is still unclear and the client needs a practical explanation before choosing the right scope.",
      };
    case "cost-related":
      return {
        sectionOne: "The useful detail is not a generic price list but the factors on site that affected the eventual scope and cost decision.",
        sectionFour: "This is most useful when a client is budgeting and needs to understand what changes a quote before committing to works.",
      };
    case "decision-making":
      return {
        sectionOne: "The example helps because it shows how the decision was made on a live site rather than through a generic pros-and-cons list.",
        sectionFour: "This is most useful when two routes are possible and the right choice depends on access, programme, risk, or site constraints.",
      };
    default:
      return {
        sectionOne: "",
        sectionFour: "",
      };
  }
}

function joinConstraintList(constraints: string[]): string {
  if (constraints.length === 0) return "site constraints";
  if (constraints.length === 1) return constraints[0];
  if (constraints.length === 2) return `${constraints[0]} and ${constraints[1]}`;
  return `${constraints.slice(0, -1).join(", ")}, and ${constraints[constraints.length - 1]}`;
}

export function buildScenarioArticle(definition: ScenarioArticleDefinition): ArticleDetailData {
  const constraintsText = joinConstraintList(definition.constraints);
  const framing = intentFraming(definition.intent);
  const exactLink = `[${definition.serviceTitle} in ${definition.locationName}](/${definition.serviceSlug}/${definition.locationId})`;
  const sameLocationLinks = definition.relatedServiceLinks
    .map((link) => `[${link.label}](${link.href})`)
    .join(", ");
  const guideLink = `[${definition.guideLink.label}](${definition.guideLink.href})`;
  const projectLink = definition.projectLink ? ` You can also compare it with [${definition.projectLink.label}](${definition.projectLink.href}).` : "";

  return {
    slug: definition.slug,
    title: definition.title,
    excerpt: definition.excerpt,
    date: definition.date,
    image: definition.image,
    category: definition.category,
    intent: definition.intent,
    metaDescription: definition.excerpt,
    serviceSlug: definition.serviceSlug,
    serviceTitle: definition.serviceTitle,
    locationId: definition.locationId,
    scenario: {
      propertyType: definition.propertyType,
      specificIssue: definition.specificIssue,
      constraints: definition.constraints,
    },
    sections: [
      {
        heading: "The issue on this job",
        paragraphs: [
          `This scenario centred on a ${definition.propertyType.toLowerCase()} in ${definition.locationName} where ${definition.specificIssue.toLowerCase()}. The job had to be planned around ${constraintsText}, so the first step was understanding the problem in its real site context rather than guessing from the headline symptom.`,
          `${definition.issueSummary} ${framing.sectionOne}`.trim(),
        ],
      },
      {
        heading: "How we handled it",
        paragraphs: [
          `${definition.handledSummary} That is why the exact local route matters: ${exactLink}.`,
          `The work was scoped around the live conditions on site, not a generic template, which kept the response proportionate to the actual issue.`,
        ],
      },
      {
        heading: "What the result was",
        paragraphs: [
          definition.resultSummary,
          `The useful outcome was not just that the immediate issue was resolved, but that the next decision became clearer for the owner, site manager, or design team.`,
        ],
      },
      {
        heading: "When this kind of work is needed",
        paragraphs: [
          definition.whenNeededSummary,
          framing.sectionFour,
        ],
      },
      {
        heading: "Related services in this area",
        paragraphs: [
          `If your site has the same kind of issue, start with ${exactLink}. For the same location, the most relevant next pages are ${sameLocationLinks}. For supporting guidance, use ${guideLink}.${projectLink}`.trim(),
        ],
      },
    ],
    faq: definition.faq,
    endCtaLead: `If you are dealing with ${definition.specificIssue.toLowerCase()} in ${definition.locationName}, the next step is a scoped quote that reflects the actual constraints on site.`,
  };
}
