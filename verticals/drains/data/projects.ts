import {
  generateProjects,
  mergeProjectScenarioContent,
  type ProjectScenarioDefinition,
} from "engine";
import { verticalConfig } from "@/config";
import { locations, services } from "@/lib/data";

const generatedProjects = generateProjects(verticalConfig, locations, services);

const projectDefinitions: ProjectScenarioDefinition[] = [
  {
    id: "project-drains-1",
    slug: "collapsed-clay-pipe-london-townhouse",
    title: "Collapsed clay pipe beneath townhouse forecourt",
    scenario: {
      propertyType: "Victorian townhouse with basement office",
      specificIssue: "a collapsed clay foul pipe beneath the front forecourt",
      constraints: ["neighbouring utility runs", "weekday access for deliveries"],
      jobType: "commercial",
      urgency: "urgent",
      complexityLevel: "complex",
    },
    summary:
      "This London job centred on a Victorian townhouse with a basement office where a collapsed clay foul pipe had started backing up during weekday trading.",
    problem: [
      "The pipe run sat beneath the forecourt and crossed close to neighbouring services, so the failure could not be dealt with as a simple dig-and-replace job. Wastewater was starting to surcharge into the basement WC, and the client needed the building kept open while we worked.",
      "We confirmed the exact failure point with a [drain collapse repair in London](/drain-collapse-repair/london) inspection, then marked out a narrow excavation zone that would avoid the adjacent utility corridor.",
    ],
    solution: [
      "We isolated the affected section, carried out a controlled breakout, and removed the collapsed clay section by hand around the service crossings. The repair used a new pipe section with bedding rebuilt to suit the tight trench width rather than a broad open excavation.",
      "Because the access window was limited to working hours between deliveries, the crew staged the reinstatement in the same shift and kept spoil movement tight to the front boundary.",
    ],
    outcome: [
      "The surcharge stopped as soon as the new section was commissioned, and the client avoided a longer closure of the basement office. The forecourt was reinstated on the same programme, with the CCTV record showing a continuous fall through the repaired run.",
    ],
    whenNeeded: [
      "Jobs like this usually start when an older clay run gives way beneath hardstanding and the issue begins affecting occupied space below ground level. If the defect sits near other buried services, controlled excavation matters as much as the repair itself.",
    ],
    relatedServicesSection: [
      "For similar failures, the most relevant next step is the matching [drain collapse repair in London](/drain-collapse-repair/london) page, then same-location services such as [CCTV drain surveys in London](/cctv-drain-surveys/london) where the line still needs tracing after the repair.",
    ],
    equipmentOrMethod: "CCTV tracing and controlled excavation",
    timeTaken: "one working day plus same-day reinstatement",
    metaDescription:
      "Drain collapse repair in London for a Victorian townhouse forecourt, including CCTV tracing, controlled excavation, and same-day reinstatement.",
  },
  {
    id: "project-drains-2",
    slug: "richmond-basement-flat-drain-relining",
    title: "Drain relining for basement flat in Richmond",
    scenario: {
      propertyType: "basement flat in a Richmond conversion",
      specificIssue: "repeated foul smells from a cracked branch drain",
      constraints: ["shared access hallway", "drain run beneath neighbouring properties"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Richmond project involved a basement flat where a cracked branch drain was causing repeat odours, but excavation was ruled out because the line passed beneath neighbouring properties.",
    problem: [
      "The occupier had recurring smells and periodic slow discharge, but there was no room for open excavation through the shared hallway route. CCTV footage showed cracking and minor displacement rather than a full collapse, which made trenchless repair the practical option.",
      "Because the run served multiple parts of the conversion, the work had to be staged around access for other residents and kept clean through a narrow internal route.",
    ],
    solution: [
      "We cleaned the line, trimmed the defective section back to sound pipe, and carried out [drain relining in Richmond](/drain-relining/richmond) with a short liner sized to the cracked branch rather than lining the full run unnecessarily.",
      "The liner installation was completed from existing access points, which avoided opening floors or disturbing the neighbouring property boundary line.",
    ],
    outcome: [
      "Odours stopped once the branch was sealed, and the client kept the original finishes intact. The final survey showed a continuous internal surface through the repaired section without the disruption that excavation would have caused.",
    ],
    whenNeeded: [
      "This type of work is usually needed where the pipe is still structurally open but cracking, displaced joints, or root ingress keep causing repeat symptoms. It is especially useful when the affected run sits beneath finished floors or shared areas.",
    ],
    relatedServicesSection: [
      "For similar trenchless repairs, see [drain relining in Richmond](/drain-relining/richmond) and [CCTV drain surveys in Richmond](/cctv-drain-surveys/richmond) before deciding whether excavation is actually necessary.",
    ],
    equipmentOrMethod: "mechanical clean and short structural liner",
    timeTaken: "half a day on site",
    metaDescription:
      "Drain relining in Richmond for a basement flat with a cracked branch drain, completed without excavation through the shared conversion hallway.",
  },
  {
    id: "project-drains-3",
    slug: "chiswick-prepurchase-cctv-drain-survey",
    title: "Pre-purchase CCTV survey on Edwardian house in Chiswick",
    scenario: {
      propertyType: "Edwardian family house",
      specificIssue: "a pre-purchase drainage check before exchange",
      constraints: ["limited vendor access window"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "We were asked to complete a pre-purchase drainage survey in Chiswick for an Edwardian house where the buyer needed a fast answer before exchange.",
    problem: [
      "The concern was not an active blockage but the risk of hidden defects in an older run before the buyer committed. Access to the property was limited to a short vendor-approved slot, so the survey needed to be completed cleanly and reported the same day.",
      "Older properties in this part of Chiswick often still have mixed materials and previous patch repairs, so a visual check above ground would not have been enough.",
    ],
    solution: [
      "We carried out a [CCTV drain survey in Chiswick](/cctv-drain-surveys/chiswick), traced the main foul run, and recorded the condition of the chambers, joints, and any changes in pipe material.",
      "The report separated minor maintenance items from anything that would affect immediate purchase risk, which gave the buyer a practical basis for renegotiation rather than a generic list of observations.",
    ],
    outcome: [
      "The client had a same-day record of the system condition and a clear view of the items worth pricing before completion. That kept the purchase moving without relying on assumptions about the age of the drainage.",
    ],
    whenNeeded: [
      "This sort of survey is usually worth doing where a period property has limited drainage history or signs of patch repair, especially if a buyer needs evidence quickly rather than a full invasive investigation.",
    ],
    relatedServicesSection: [
      "If a survey shows defects that need follow-up, the next relevant pages are [CCTV drain surveys in Chiswick](/cctv-drain-surveys/chiswick) and [drain relining in Chiswick](/drain-relining/chiswick) for contained structural faults.",
    ],
    equipmentOrMethod: "push-rod CCTV survey and drain tracing",
    timeTaken: "a same-day inspection and report turnaround",
  },
  {
    id: "project-drains-4",
    slug: "wimbledon-driveway-drain-excavation",
    title: "Driveway excavation for failed drain section in Wimbledon",
    scenario: {
      propertyType: "1930s semi with front driveway",
      specificIssue: "a failed drain section causing voiding beneath block paving",
      constraints: ["vehicle crossover", "tight spoil storage"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "complex",
    },
    summary:
      "This Wimbledon project involved excavation through a front driveway where a failed drain section had started to undermine the block paving near the vehicle crossover.",
    problem: [
      "The defect was not just a drainage issue; the failed pipe had started to wash material out from below the paving. That meant the repair had to address both the drain and the formation beneath the driveway before the surface could be safely reinstated.",
      "Because spoil storage was tight and the client still needed evening access, the trench had to be opened, repaired, and backfilled on a tight sequence.",
    ],
    solution: [
      "We carried out [drain excavation in Wimbledon](/drain-excavation/wimbledon), removed the failed run, rebuilt the bedding, and reinstated the pipe with the correct fall through the crossover zone.",
      "The block paving was lifted in a contained section so the surface could be reset over compacted fill rather than patched back onto disturbed ground.",
    ],
    outcome: [
      "The driveway was left with a stable formation and the drainage run was brought back into service without a second visit. The client avoided further settlement at the crossover and had a CCTV-confirmed repair before the paving went back.",
    ],
    whenNeeded: [
      "This type of excavation is usually needed when the defect has already started affecting the hardstanding above, or when the pipe is too badly damaged for trenchless repair to hold long term.",
    ],
    relatedServicesSection: [
      "For similar hardstanding failures, start with [drain excavation in Wimbledon](/drain-excavation/wimbledon), then compare [drain collapse repair in Wimbledon](/drain-collapse-repair/wimbledon) if the defect still needs a broader structural review.",
    ],
    equipmentOrMethod: "targeted driveway breakout and pipe replacement",
    timeTaken: "one day for repair and reinstatement sequencing",
  },
  {
    id: "project-drains-5",
    slug: "kingston-emergency-flooded-kitchen-drainage",
    title: "Emergency drainage response for flooded kitchen in Kingston",
    scenario: {
      propertyType: "restaurant unit with rear kitchen",
      specificIssue: "a rear kitchen flood caused by a blocked foul line",
      constraints: ["same-day trading pressure", "rear alley access only"],
      jobType: "commercial",
      urgency: "urgent",
      complexityLevel: "simple",
    },
    summary:
      "We attended this Kingston job as an emergency callout after a restaurant kitchen flooded during service because the rear foul line had blocked in the alley behind the unit.",
    problem: [
      "The immediate issue was operational rather than investigative: the kitchen needed the line cleared quickly so the business could keep trading. Access was limited to the rear alley, which meant all equipment had to be moved through a narrow service route without obstructing neighbouring units.",
      "Grease build-up had been worsening for some time, but the failure point only became obvious once the system surcharged during a busy service period.",
    ],
    solution: [
      "We used [emergency drainage in Kingston](/emergency-drainage/kingston) support to isolate the worst standing water, then cleared the line with high-pressure jetting from the rear access chamber.",
      "Once flow was restored, we ran a check camera through the cleaned section so the manager could see whether the issue was purely maintenance-related or hiding a structural defect.",
    ],
    outcome: [
      "The kitchen was back in use the same shift, and the manager left with a clear maintenance recommendation rather than a vague emergency note. Because the line was checked after jetting, the site avoided repeating the same emergency a week later.",
    ],
    whenNeeded: [
      "Reactive work like this is usually needed when a live commercial unit cannot wait for a planned appointment and the first priority is restoring safe drainage without widening the disruption.",
    ],
    relatedServicesSection: [
      "For similar urgent failures, see [emergency drainage in Kingston](/emergency-drainage/kingston) first, then [drain jetting in Kingston](/drain-jetting/kingston) if the line needs planned follow-up cleaning.",
    ],
    equipmentOrMethod: "high-pressure jetting and post-clearance CCTV check",
    timeTaken: "same-shift emergency attendance",
  },
  {
    id: "project-drains-6",
    slug: "fulham-blocked-drain-mansion-flat",
    title: "Blocked drain clearance for mansion flat in Fulham",
    scenario: {
      propertyType: "mansion flat with shared stack connection",
      specificIssue: "a repeated blockage affecting kitchen and bathroom discharge",
      constraints: ["shared resident access", "noise-sensitive morning slot"],
      jobType: "domestic",
      urgency: "planned",
      complexityLevel: "simple",
    },
    summary:
      "This Fulham job involved a mansion flat where repeated slow discharge in the kitchen and bathroom was being traced back to a blockage on the shared branch connection.",
    problem: [
      "The occupier had already tried basic clearing, but the symptoms kept returning because the restriction sat further into the shared branch. Access needed to be quiet and controlled because the flat was on a managed block with limited morning working windows.",
      "The key question was whether the problem was just accumulated debris or the start of a structural defect on the shared line.",
    ],
    solution: [
      "We cleared the obstruction as part of [blocked drains in Fulham](/blocked-drains/fulham) work, then followed with a short camera run to confirm the branch condition and rule out a displaced joint.",
      "Because the blockage was localised and the pipe condition remained serviceable, the client only needed maintenance advice rather than immediate structural repair.",
    ],
    outcome: [
      "Discharge returned to normal on the same visit, and the building manager had a clean record showing the branch was still structurally usable. That avoided a larger shared-works conversation until there was evidence it was genuinely needed.",
    ],
    whenNeeded: [
      "This kind of visit is common in mansion flats and conversions where repeated slow discharge points to a restriction deeper in the shared branch than occupants can reach themselves.",
    ],
    relatedServicesSection: [
      "For similar repeat restrictions, compare [blocked drains in Fulham](/blocked-drains/fulham) with [CCTV drain surveys in Fulham](/cctv-drain-surveys/fulham) if the same branch keeps failing after clearance.",
    ],
    equipmentOrMethod: "mechanical clearance and short camera check",
    timeTaken: "a single morning visit",
  },
];

export const projects = mergeProjectScenarioContent(generatedProjects, projectDefinitions);
export const publishedProjects = projects;
export const homepageProjects = publishedProjects.slice(0, 6);
