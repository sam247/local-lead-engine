/** Run from vertical root: npx tsx export-projects.mts */
const { projects } = await import("./data/projects");
console.log(JSON.stringify(projects));
