export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogArticleContent {
  sections: BlogSection[];
  faqs?: BlogFAQ[];
}

/** Parses [link text](url) in body and returns segments for rendering. */
export function parseBodyWithLinks(body: string): Array<{ type: "text"; value: string } | { type: "link"; text: string; href: string }> {
  const out: Array<{ type: "text"; value: string } | { type: "link"; text: string; href: string }> = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    if (m.index > lastIndex) out.push({ type: "text", value: body.slice(lastIndex, m.index) });
    out.push({ type: "link", text: m[1], href: m[2] });
    lastIndex = re.lastIndex;
  }
  if (lastIndex < body.length) out.push({ type: "text", value: body.slice(lastIndex) });
  return out.length ? out : [{ type: "text", value: body }];
}

const articleContent: Record<string, BlogArticleContent> = {
  "signs-of-drain-collapse": {
    sections: [
      {
        heading: "Introduction",
        body: "A collapsed drain is one of the most serious drainage problems a property can face. Often hidden underground, the damage can go unnoticed until it triggers sinkholes, sewage backups, or structural issues. Recognising the warning signs early can save you thousands of pounds in repair costs and prevent damage to your home or garden. In this guide we outline seven key signs that your drain may have collapsed, and what to do if you spot them. If you suspect a collapse, booking a [CCTV drain survey](/cctv-drain-surveys) is the first step to confirm the extent and location of the problem. Our team provides [drain collapse repair](/drain-collapse-repair) across the UK, including in [London](/drain-collapse-repair/london), [Harrow](/drain-collapse-repair/harrow), and [Reading](/drain-collapse-repair/reading).",
      },
      {
        heading: "1. Sinkholes or Depressions in Your Garden or Driveway",
        body: "One of the most obvious signs of a collapsed drain is a sinkhole or noticeable depression in the ground above the pipe. When a drain collapses, the soil around it can wash into the pipe or settle into the void, causing the surface to sink. This often appears first as a small dip that grows over time. Pay particular attention after heavy rain, when the ground may become saturated and more prone to subsidence. If you notice any new or growing depressions, especially in a line that might follow your drain run, arrange a survey as soon as possible.",
      },
      {
        heading: "2. Foul Smells From Drains or Manholes",
        body: "Persistent foul odours from drains, manholes, or inspection chambers can indicate that wastewater is escaping from a damaged or collapsed pipe. Cracks or collapses allow sewage to leak into the surrounding soil, and the smell can seep up through the ground or through gaps in paving. If the smell is localised to one area of your garden or driveway, it may point to a failure in that section of the system. A [CCTV drain survey](/cctv-drain-surveys) will identify the exact source so that targeted [drain repair](/drain-collapse-repair) can be planned.",
      },
      {
        heading: "3. Slow Draining Sinks, Toilets, or Baths",
        body: "Slow drainage across multiple fixtures often suggests a blockage or structural problem in the main run. While blockages can be cleared with [jetting](/drain-jetting) or [drain unblocking](/drain-unblocking), a collapse will cause a permanent restriction. If you have already tried clearing the drain and the problem returns, or if the slowdown is getting worse, a collapse is a strong possibility. A survey will show whether the pipe has collapsed, partially collapsed, or is simply blocked.",
      },
      {
        heading: "4. Gurgling Noises From Toilets or Plugholes",
        body: "Gurgling sounds when you flush the toilet or run taps usually indicate that air is trapped in the system because water cannot flow freely. This can be caused by a blockage, but it is also common when a pipe has collapsed or partially failed, creating an obstruction that disrupts the normal flow and venting of the drain. If gurgling is accompanied by slow drainage or smells, a structural fault is likely.",
      },
      {
        heading: "5. Water or Sewage Backing Up",
        body: "Water or sewage backing up into your property, garden, or gullies is a serious sign that the drain is blocked or collapsed. Backups often occur during heavy use or rainfall when the system cannot cope with the volume. Any backup should be treated as urgent: not only is it a health hazard, but it also suggests that the pipe is severely compromised. Emergency [drainage](/emergency-drainage) and a follow-up survey will identify whether the cause is a collapse and what repair is needed.",
      },
      {
        heading: "6. Cracks in Pavement or Driveway Along the Drain Line",
        body: "New or widening cracks in a driveway, path, or patio can be caused by ground movement resulting from a collapsed drain. As the pipe fails, the surrounding soil is undermined and the surface above can crack or sink. Cracks that follow the likely line of the drain are a strong indicator. A survey will confirm whether the drain beneath has collapsed and how far the damage extends.",
      },
      {
        heading: "7. Damp Patches or Lush Patches in the Garden",
        body: "Unexplained damp patches or areas of grass that stay unusually green (or grow faster than the rest of the lawn) can indicate a leaking or collapsed drain. Wastewater seeping into the soil acts as a fertiliser and a constant source of moisture. If you notice such patches in a line or near where you know the drain runs, it is worth having the pipe inspected. Early detection allows for [targeted repair](/drain-collapse-repair) before the problem spreads.",
      },
      {
        heading: "What to Do If You Spot These Signs",
        body: "If you notice one or more of these warning signs, do not ignore them. Book a [CCTV drain survey](/cctv-drain-surveys) so that we can inspect the pipe and provide a clear report. From there we can recommend the right solution—whether that is [relining](/drain-relining), [excavation](/drain-excavation), or another repair method—and give you a fixed quote. For urgent issues such as backups or flooding, our [emergency drainage](/emergency-drainage) team is available 24/7.",
      },
    ],
    faqs: [
      { question: "How do I know if my drain has collapsed?", answer: "Common signs include sinkholes or depressions in the garden or driveway, foul smells from drains or manholes, slow drainage from multiple fixtures, gurgling noises, water or sewage backing up, cracks in paving along the drain line, and damp or unusually lush patches in the garden. A CCTV drain survey will confirm whether the pipe has collapsed and where." },
      { question: "Can a collapsed drain be repaired without digging?", answer: "In some cases, yes. If the collapse is localised and the pipe is otherwise sound, drain relining can create a new pipe within the old one without excavation. For severe or full collapses, excavation and replacement are usually required. The survey report will recommend the best option." },
      { question: "How much does it cost to repair a collapsed drain?", answer: "Costs depend on the length and depth of the collapse, access, and whether relining or excavation is needed. We provide fixed-price quotes after a CCTV survey. Early detection and repair typically cost less than leaving the problem until it causes major damage." },
    ],
  },
  "drain-relining-vs-excavation": {
    sections: [
      {
        heading: "Introduction",
        body: "When a drain is damaged, two main repair options are usually considered: drain relining (a no-dig method) and excavation (digging up and replacing the pipe). Both have their place, and the right choice depends on the type and extent of the damage, access, and your budget. This article compares relining and excavation so you can understand which repair is better for your situation. If you are not yet sure of the condition of your drain, a [CCTV drain survey](/cctv-drain-surveys) will show the damage and help determine the best approach. We offer [drain relining](/drain-relining) and [drain excavation](/drain-excavation) across the UK, including in [Uxbridge](/drain-relining/uxbridge) and [Bristol](/drain-excavation/bristol).",
      },
      {
        heading: "What Is Drain Relining?",
        body: "Drain relining is a trenchless technique that creates a new pipe inside the existing one. A resin-coated liner is inserted into the damaged pipe and then cured (usually with hot water or UV light) so that it hardens and forms a seamless, jointless new pipe. No excavation is required, so gardens, driveways, and floors can stay intact. Relining is suitable for pipes that have cracks, fractures, root intrusion, or partial deformation, but the pipe must still be open enough for the liner to pass through. It is not suitable for fully collapsed sections where the bore is blocked.",
      },
      {
        heading: "What Is Drain Excavation?",
        body: "Excavation is the traditional method: the ground is dug up to expose the damaged pipe, the old pipe is removed, and a new pipe is installed. The trench is then backfilled and the surface reinstated. Excavation is used when the pipe has fully collapsed, is severely deformed, or is too damaged for relining. It is also used when the pipe needs to be re-routed or when other utilities or structures make relining impractical. [Drain excavation](/drain-excavation) allows a complete replacement with new materials and full visibility of the work.",
      },
      {
        heading: "Comparing Cost and Time",
        body: "Relining is often quicker and can be cheaper where access is difficult or reinstatement would be expensive. There is no need to dig up driveways or landscaping, so the overall disruption and cost of making good can be much lower. Excavation can be more expensive and time-consuming because of the digging, removal of material, and reinstatement, but it is sometimes the only option. The final cost for either method depends on length, depth, access, and site conditions. We provide fixed quotes after a [CCTV survey](/cctv-drain-surveys) so you know the cost upfront.",
      },
      {
        heading: "When Relining Is the Better Choice",
        body: "Relining is the better choice when the pipe is still structurally open, with damage such as cracks, holes, or root ingress, but no full collapse. It is ideal under buildings, under driveways, or in landscaped gardens where digging would be disruptive or costly. The result is a durable, jointless pipe that resists roots and can last for decades. Many [blocked drain](/blocked-drains) and root problems can be resolved with cleaning followed by relining.",
      },
      {
        heading: "When Excavation Is the Better Choice",
        body: "Excavation is the better choice when the pipe has fully collapsed, is severely displaced, or is so damaged that a liner cannot be passed through. It is also appropriate when you need to change the pipe layout or when the existing pipe is in such poor condition that relining would not be reliable. In these cases, [full replacement](/drain-excavation) gives a guaranteed new pipe and a clear long-term solution.",
      },
      {
        heading: "Making the Decision",
        body: "The decision is best made after a [CCTV drain survey](/cctv-drain-surveys). The survey footage will show the type and extent of the damage, and we can then recommend either [relining](/drain-relining) or [excavation](/drain-excavation)—or a combination, for example relining one section and excavating another. If you would like advice for your property, contact us for a survey and a clear, fixed-price quote.",
      },
    ],
    faqs: [
      { question: "Is drain relining as good as replacing the pipe?", answer: "Yes. A properly installed liner forms a new, seamless pipe within the old one and can last 50 years or more. It is often stronger than the original pipe and resists root ingress because there are no joints. Relining is approved by building regulations when installed to the correct standard." },
      { question: "How long does drain relining take compared to excavation?", answer: "Relining is usually completed in a day or two for a typical run, with no digging or reinstatement. Excavation can take several days or more depending on length, depth, and access, plus time for backfilling and surface reinstatement." },
      { question: "Can you reline a collapsed drain?", answer: "Not if the pipe is fully collapsed and the bore is blocked. The liner needs to be able to pass through the pipe. Partial collapses or deformed sections can sometimes be relined after clearing, but a full collapse typically requires excavation and replacement." },
    ],
  },
  "cctv-drain-survey-guide": {
    sections: [
      {
        heading: "Introduction",
        body: "A CCTV drain survey is an inspection of the inside of your drains using a high-resolution camera. It reveals blockages, cracks, collapses, root ingress, and other defects without any digging. Whether you are buying a property, dealing with recurring [blocked drains](/blocked-drains), or planning [drain repair](/drain-collapse-repair), a survey gives you the evidence you need to make informed decisions. This guide explains what happens during a CCTV drain survey from start to finish. We carry out [CCTV drain surveys](/cctv-drain-surveys) across the UK, including in [Harrow](/cctv-drain-surveys/harrow), [Wimbledon](/cctv-drain-surveys/wimbledon), and [Croydon](/cctv-drain-surveys/croydon).",
      },
      {
        heading: "Before the Survey",
        body: "We will need clear access to your drains, usually via manholes, rodding eyes, or an internal point such as a toilet or sink connection. Our team will confirm the best access points and explain any preparation needed, such as ensuring manhole covers are accessible. On the day we arrive with the CCTV unit and push the camera through the drain, so no excavation is required. The survey is non-destructive and can usually be completed within a few hours depending on the length of the run.",
      },
      {
        heading: "During the Survey",
        body: "A flexible cable with a camera head is fed through the drain. The camera sends live footage to a monitor so the engineer can see the condition of the pipe in real time. The system records the full survey and logs the position of any defects (often with distance from the access point). We look for blockages, cracks, fractures, displaced joints, root intrusion, collapses, and signs of wear or corrosion. The engineer may pause to inspect a particular area or to take still images for the report.",
      },
      {
        heading: "What the Survey Reveals",
        body: "The footage shows the internal condition of the pipe: its material, size, and any damage. Common findings include blockages (fat, roots, debris), cracks or fractures, broken or displaced joints, root growth through joints, partial or full collapses, and areas of erosion or deterioration. This information is used to recommend the right fix—whether that is [jetting](/drain-jetting), [root removal](/drain-root-removal), [relining](/drain-relining), or [excavation](/drain-excavation)—and to produce an accurate quote.",
      },
      {
        heading: "After the Survey: Your Report",
        body: "You will receive a written report and video footage of the survey. The report typically includes a summary of the condition, the location and description of defects, and recommendations for repair or maintenance. This is valuable for homebuyers (as part of a pre-purchase survey), for insurance claims, and for planning repair work. With the report in hand, you can get fixed-price quotes for any [repairs](/drain-collapse-repair) or [relining](/drain-relining) that are needed.",
      },
      {
        heading: "Why Book a Survey?",
        body: "Booking a [CCTV drain survey](/cctv-drain-surveys) before buying a property can reveal hidden drainage problems and save you from costly surprises. If you already have [slow drains](/blocked-drains) or [recurring blockages](/drain-unblocking), a survey will identify the cause so that it can be fixed properly rather than repeatedly cleared. For [emergency](/emergency-drainage) or planned repair work, a survey ensures we quote accurately and choose the right solution. Contact us to arrange a survey and a clear, detailed report.",
      },
    ],
    faqs: [
      { question: "How long does a CCTV drain survey take?", answer: "A typical survey of a single drain run takes one to two hours. Larger or more complex systems may take longer. We will give you an estimate when you book." },
      { question: "Do I need to do anything to prepare for a drain survey?", answer: "We need clear access to the drains via manholes, rodding eyes, or internal access points. Ensure these are accessible and that we can reach them with our equipment. We will advise on the day if anything else is needed." },
      { question: "Will I get a copy of the survey footage?", answer: "Yes. You receive a written report and the video footage, which you can keep for your records, for conveyancing, or for insurance purposes." },
    ],
  },
  "preventing-blocked-drains": {
    sections: [
      {
        heading: "Introduction",
        body: "Blocked drains are a common and often avoidable problem. From kitchen sinks to main runs, blockages cause bad smells, slow drainage, and sometimes backups that require [emergency drain unblocking](/drain-unblocking). The good news is that many blockages can be prevented with simple habits and occasional maintenance. This guide outlines practical steps you can take at home to keep your drains flowing and reduce the need for [professional unblocking](/blocked-drains). If you do run into a stubborn blockage, we offer [drain unblocking](/drain-unblocking) and [high-pressure jetting](/drain-jetting) across the UK, including in [Uxbridge](/blocked-drains/uxbridge) and [Kingston](/blocked-drains/kingston).",
      },
      {
        heading: "What Causes Blocked Drains?",
        body: "The main culprits are fat, oil, and grease (especially from kitchens), wet wipes and other non-flushable items, hair and soap in bathrooms, tree roots growing into pipes, and debris such as leaves or soil entering gullies. Once a partial blockage forms, it tends to get worse until the drain is fully blocked. Preventing these materials from entering the system, or dealing with roots and structural issues early, can avoid most blockages.",
      },
      {
        heading: "Kitchen: Avoid Pouring Fat and Grease Down the Sink",
        body: "Fat, oil, and grease solidify as they cool and stick to the inside of pipes. Over time they build up and restrict flow until the drain blocks. Wipe pans and plates with kitchen roll before washing, and put fat and grease in the bin or a sealed container rather than down the sink. Use a sink strainer to catch food scraps and empty it into the bin. These simple steps greatly reduce the risk of [kitchen drain blockages](/blocked-drains) and the need for [jetting](/drain-jetting) or [unblocking](/drain-unblocking).",
      },
      {
        heading: "Bathroom: Use Drain Guards and Only Flush the Right Things",
        body: "Hair and soap can combine to form stubborn blockages in shower and bath wastes. Fit drain guards or hair catchers and clean them regularly. Only flush toilet paper and human waste down the toilet; wet wipes, sanitary products, and other items should go in the bin even if they are labelled \"flushable.\" These products are a major cause of [blocked drains](/blocked-drains) and sewer problems. Teaching everyone in the household to follow these rules will cut down on blockages and callouts.",
      },
      {
        heading: "Outside: Keep Gullies and Gutters Clear",
        body: "Gullies and surface water drains can block with leaves, mud, and debris. Clear leaves from gratings and gutters regularly, and avoid washing soil or rubble into gullies. If you have trees near your drain runs, be aware that [roots](/drain-root-removal) can invade pipes and cause blockages; a periodic [CCTV survey](/cctv-drain-surveys) can spot root ingress before it becomes severe. Keeping external drains clear reduces the chance of backups and flooding.",
      },
      {
        heading: "When Prevention Isn't Enough",
        body: "If you already have a [blockage](/drain-unblocking), or if drains are slow despite good habits, the cause may be further down the line—a build-up of grease, roots, or a structural problem. In that case, a [CCTV survey](/cctv-drain-surveys) will identify the cause, and we can then [jet](/drain-jetting), [clear](/drain-unblocking), or recommend [repair](/drain-relining) as needed. For urgent blockages or backups, our [emergency drainage](/emergency-drainage) team is available 24/7.",
      },
    ],
    faqs: [
      { question: "What should I never put down the drain?", answer: "Never put fat, oil, or grease down the kitchen sink; avoid flushing wet wipes, sanitary products, or anything other than toilet paper and waste. Keep food scraps, hair, and debris out of drains where possible using strainers and bins." },
      { question: "How often should I have my drains cleaned?", answer: "For most homes, good daily habits are enough. If you have recurring blockages, an annual or biennial jetting or survey can help keep the system clear and catch problems early." },
      { question: "Can tree roots cause blocked drains?", answer: "Yes. Tree roots are a common cause of blockages and pipe damage. If you have trees near your drains and are experiencing slow drainage or blockages, a CCTV survey can confirm root ingress and we can offer root removal and relining to prevent recurrence." },
    ],
  },
  "tree-root-drain-damage": {
    sections: [
      {
        heading: "Introduction",
        body: "Tree roots are one of the most common causes of drain damage and [blocked drains](/blocked-drains). Roots are drawn to the moisture and nutrients inside pipes and can grow through small cracks or loose joints, eventually blocking the flow or breaking the pipe. In this article we look at why roots cause so much damage, how to spot the problem, and what solutions are available. If you suspect root ingress, a [CCTV drain survey](/cctv-drain-surveys) will confirm it, and we can then [remove the roots](/drain-root-removal) and [reline](/drain-relining) the pipe to prevent regrowth. We serve areas including [London](/drain-root-removal/london), [Ealing](/drain-relining/ealing), and [Watford](/drain-root-removal/watford).",
      },
      {
        heading: "Why Tree Roots Get Into Drains",
        body: "Drain pipes carry water and organic matter, so they are an attractive source of moisture and nutrients for tree roots. Older pipes—especially clay with mortar joints—have small gaps at the joints that roots can exploit. Once inside, roots grow quickly in the warm, moist environment and can fill the pipe, causing [blockages](/blocked-drains) and eventually cracking or displacing the pipe. Even a single tree some distance away can send roots many metres toward a leaking or damaged drain.",
      },
      {
        heading: "Signs of Root Damage",
        body: "Recurring [blockages](/drain-unblocking), slow drainage from multiple fixtures, gurgling sounds, and foul smells can all point to root intrusion. If you have trees near the line of your drain and these symptoms keep coming back after clearing, roots are a likely cause. A [CCTV survey](/cctv-drain-surveys) will show the roots inside the pipe and the extent of the damage, so that the right [repair](/drain-root-removal) can be planned.",
      },
      {
        heading: "Solutions: Root Removal and Relining",
        body: "Root removal involves cutting and clearing the roots from the pipe, usually with specialist equipment, and then [jetting](/drain-jetting) to flush the debris. This restores flow but does not stop roots from growing back unless the entry point is sealed. [Drain relining](/drain-relining) creates a seamless new pipe inside the old one, with no joints for roots to penetrate, and is the preferred long-term solution after root removal. In severe cases where the pipe is collapsed or too damaged, [excavation](/drain-excavation) and replacement may be needed.",
      },
      {
        heading: "Prevention and Long-Term Care",
        body: "If you are planting new trees, keep them away from known drain runs. For existing trees and drains, periodic [CCTV surveys](/cctv-drain-surveys) can detect root ingress early. Once roots have been removed and the pipe [relined](/drain-relining), the new liner greatly reduces the chance of regrowth. For advice specific to your property, contact us for a survey and a clear recommendation.",
      },
    ],
    faqs: [
      { question: "Can tree roots break a drain pipe?", answer: "Yes. Roots can grow through joints and cracks, and as they thicken they can displace or crack the pipe, leading to blockages, leaks, and in some cases collapse. Early detection and repair help avoid major damage." },
      { question: "Will removing the roots fix the problem permanently?", answer: "Removing the roots restores flow, but without sealing the pipe (e.g. with relining), roots can grow back. Relining creates a jointless barrier that prevents roots from re-entering and is the recommended long-term fix." },
      { question: "How do you remove roots from a drain?", answer: "We use specialist cutting equipment to clear roots from inside the pipe, followed by high-pressure jetting to remove debris. We then recommend relining to prevent regrowth and repair any damage to the pipe." },
    ],
  },
  "emergency-drainage-what-to-do": {
    sections: [
      {
        heading: "Introduction",
        body: "A drainage emergency—such as sewage backing up, flooding, or a burst or overflowing drain—can be alarming and pose a health risk. Acting quickly and in the right order can limit damage and get the problem under control. This guide outlines what to do in a drainage emergency and how to get professional help fast. Our [emergency drainage](/emergency-drainage) team is available 24/7 for urgent callouts across the UK, including [London](/emergency-drainage/london), [Richmond](/emergency-drainage/richmond), and [Slough](/emergency-drainage/slough).",
      },
      {
        heading: "Step 1: Stay Safe",
        body: "Avoid contact with sewage or floodwater, as it can contain harmful bacteria. Keep children and pets away from the affected area. If water is near electrical fittings, do not touch them; turn off power at the consumer unit if it is safe to do so. If the problem is inside the property, try to isolate the source (e.g. stop using the affected toilet or sink) to prevent more water entering the system.",
      },
      {
        heading: "Step 2: Call for Professional Help",
        body: "Drainage emergencies need professional [emergency drainage](/emergency-drainage) support. Call a drainage company that offers 24/7 callouts so that an engineer can attend as soon as possible. We will assess the situation, contain the immediate problem (e.g. clear a blockage or pump out water), and advise on next steps. Do not try to clear serious blockages or sewage yourself; the right equipment and expertise are needed to do it safely and effectively.",
      },
      {
        heading: "Step 3: Document the Situation",
        body: "If it is safe to do so, take photos or videos of the problem for insurance or warranty claims. Note the time the issue started and what you have done. This can help with [insurance](/drain-collapse-repair) or [warranty](/drain-relining) claims and give the engineer useful information when they arrive.",
      },
      {
        heading: "Step 4: Follow-Up Survey and Repair",
        body: "Once the emergency is contained, a [CCTV drain survey](/cctv-drain-surveys) will identify the cause—whether it is a [blockage](/blocked-drains), [collapse](/drain-collapse-repair), [root ingress](/drain-root-removal), or something else. From there we can recommend and quote for the right [repair](/drain-relining) or [replacement](/drain-excavation) so the problem does not recur. Many [emergency callouts](/emergency-drainage) are followed by a survey and a planned repair.",
      },
      {
        heading: "When to Treat It as an Emergency",
        body: "Treat it as an emergency if sewage or wastewater is backing up into your property, if there is flooding inside or outside, or if you have no working toilet or drainage and cannot wait for a normal appointment. Our [24/7 emergency team](/emergency-drainage) is on hand to respond quickly and get your drainage back under control, then arrange any follow-up [survey](/cctv-drain-surveys) and [repair](/drain-collapse-repair) you need.",
      },
    ],
    faqs: [
      { question: "What counts as a drainage emergency?", answer: "Sewage or wastewater backing up into your property, flooding from drains, or complete loss of drainage that cannot wait for a routine appointment are all emergencies. If in doubt, call and we can advise." },
      { question: "How quickly can an engineer attend?", answer: "We aim to respond to emergency callouts as quickly as possible, often within one to two hours depending on location and availability. Call our 24/7 number to log the job and get an estimated arrival time." },
      { question: "Will my insurance cover emergency drain work?", answer: "Many home insurance policies cover sudden drainage failures; gradual damage may be excluded. We can provide documentation and reports to support your claim. Check your policy or speak to your insurer for details." },
    ],
  },
};

export function getBlogArticleContent(id: string): BlogArticleContent | null {
  return articleContent[id] ?? null;
}
