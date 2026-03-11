import { generateProjects, getProjectsForHomepage } from "engine";
import { verticalConfig } from "@/config";
import { locations, services } from "@/lib/data";

const projects = generateProjects(verticalConfig, locations, services);

export { projects };
export const homepageProjects = getProjectsForHomepage(projects, 3);
