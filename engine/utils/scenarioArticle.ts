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
  audience?: string;
  faq?: ArticleFaq[];
}

function intentHeadings(intent: ArticleIntent) {
  switch (intent) {
    case "diagnostic":
      return {
        one: "What the signs usually point to",
        two: "How to check it properly",
        three: "When to get specialist input",
      };
    case "explanatory":
      return {
        one: "What causes this",
        two: "Why it matters on real sites",
        three: "What usually happens next",
      };
    case "cost-related":
      return {
        one: "What actually changes the cost",
        two: "Where quotes usually widen",
        three: "How to scope it properly",
      };
    case "decision-making":
      return {
        one: "What the decision depends on",
        two: "Where one route fits better than another",
        three: "How to choose the right scope",
      };
    default:
      return {
        one: "What this article covers",
        two: "How to assess it",
        three: "What to do next",
      };
  }
}

function joinConstraintList(constraints: string[]): string {
  if (constraints.length === 0) return "site constraints";
  if (constraints.length === 1) return constraints[0];
  if (constraints.length === 2) return `${constraints[0]} and ${constraints[1]}`;
  return `${constraints.slice(0, -1).join(", ")}, and ${constraints[constraints.length - 1]}`;
}

function buildAudience(definition: ScenarioArticleDefinition): string {
  if (definition.audience) return definition.audience;

  switch (definition.intent) {
    case "diagnostic":
      return "Owners, managers, and project teams trying to confirm what the signs mean";
    case "explanatory":
      return "Clients and consultants who need the issue explained in practical terms";
    case "cost-related":
      return "Clients budgeting early and comparing scope before instruction";
    case "decision-making":
      return "Project teams choosing between methods, scopes, or next steps";
    default:
      return "Clients and project teams researching the right next step";
  }
}

export function buildIntentArticle(definition: ScenarioArticleDefinition): ArticleDetailData {
  const constraintsText = joinConstraintList(definition.constraints);
  const headings = intentHeadings(definition.intent);
  const exactLink = `[${definition.serviceTitle} in ${definition.locationName}](/${definition.serviceSlug}/${definition.locationId})`;
  const sameLocationLinks = definition.relatedServiceLinks
    .map((link) => `[${link.label}](${link.href})`)
    .join(", ");
  const guideLink = `[${definition.guideLink.label}](${definition.guideLink.href})`;
  const projectLink = definition.projectLink ? ` If you want to compare it with a live job, [${definition.projectLink.label}](${definition.projectLink.href}) shows how the issue played out on site.` : "";
  const audience = buildAudience(definition);

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
    audience,
    scenario: {
      propertyType: definition.propertyType,
      specificIssue: definition.specificIssue,
      constraints: definition.constraints,
    },
    sections: [
      {
        heading: headings.one,
        paragraphs: [
          `${definition.issueSummary} A common example is a ${definition.propertyType.toLowerCase()} where ${definition.specificIssue.toLowerCase()} and the next decision has to be made around ${constraintsText}.`,
          `Used properly, this kind of example clarifies the decision without turning the whole article into a single case study.`,
        ],
      },
      {
        heading: headings.two,
        paragraphs: [
          `${definition.handledSummary} For a local route, start with ${exactLink}.`,
          `The practical value is in checking the issue against the real site conditions instead of relying on generic assumptions about the service or scope.`,
        ],
      },
      {
        heading: headings.three,
        paragraphs: [
          `${definition.resultSummary} The aim is to make the next decision clearer before time, cost, or disruption widen unnecessarily.`,
          `That usually means confirming whether the issue needs a survey, a repair route, a tighter scope, or a more informed quote.`,
        ],
      },
      {
        heading: "Related services and guides",
        paragraphs: [
          `${definition.whenNeededSummary} If you need a local service page, start with ${exactLink}. For the same area, the most relevant supporting pages are ${sameLocationLinks}.`,
          `For broader reading, use ${guideLink}.${projectLink}`.trim(),
        ],
      },
    ],
    sidebarLinks: [
      definition.guideLink,
      ...definition.relatedServiceLinks,
      ...(definition.projectLink ? [definition.projectLink] : []),
    ],
    faq: definition.faq,
    endCtaLead: `If this article matches the issue you are planning around, the next step is a scoped quote that reflects the real site constraints and the right service route.`,
  };
}

export { buildIntentArticle as buildScenarioArticle };
