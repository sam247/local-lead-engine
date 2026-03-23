import { buildGuideInternalLinksWithLocations, GuideInternalLinksBlock } from "engine";
import { services, locations } from "@/lib/data";

const PRIMARY_SERVICE_SLUG = "topographical-survey";

export function StandardGuideInternalLinks() {
  const model = buildGuideInternalLinksWithLocations(services, locations, PRIMARY_SERVICE_SLUG);
  return <GuideInternalLinksBlock model={model} />;
}
