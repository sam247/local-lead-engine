# Vertical linking playbook

This document describes how verticals in the local-lead-engine monorepo should cross-link to each other. Cross-linking strengthens topical relevance, supports users who need multiple services, and improves discovery across mainlinedrains.co.uk, mainlinesurveys.co.uk, and mainlineaccess.co.uk.

---

## Rules

1. **Each vertical must link to at least two other verticals.** No vertical should be an island.
2. **Links must appear on service pages.** Prefer service detail or service overview content where the sentence fits naturally (e.g. after the main description or in an “Also relevant” paragraph).
3. **Links must be written as natural, contextual sentences.** Avoid standalone “Related sites” or “Partner links” blocks; weave the link into copy that explains why the user might need the other service.
4. **Use absolute URLs** for cross-domain links (e.g. `https://mainlinesurveys.co.uk/services/topographical-survey`).
5. **Store partner URLs in config** (e.g. `partnerBaseUrl`, `partnerTopographicalSurveyPath`) so links stay consistent and can be updated in one place.

---

## Example patterns

Use these patterns when adding or auditing cross-links. Adapt the sentence to the surrounding copy; the destination URL and intent should stay consistent.

### Drains → Surveys

- **When:** Drain excavation, repair, or construction context.
- **Example sentence:** “Drain excavation projects often require a [topographical survey](https://mainlinesurveys.co.uk/services/topographical-survey) before work begins.”
- **Destination:** mainlinesurveys.co.uk (e.g. `/services/topographical-survey`).

### Drains → Access

- **When:** Major construction, commercial, or multi-trade context.
- **Example sentence:** “Major construction and refurbishment projects often involve [access control and security systems](https://mainlineaccess.co.uk) alongside drainage and utilities.”
- **Destination:** mainlineaccess.co.uk (home or relevant service).

### Surveys → Drains

- **When:** Site surveys, mapping, or pre-construction context where drainage is relevant.
- **Example sentence:** “Drain surveys are often required before construction or utility mapping work. [Find out more about drain surveys](https://mainlinedrains.co.uk/services/cctv-drain-surveys).”
- **Destination:** mainlinedrains.co.uk (e.g. `/services/cctv-drain-surveys`).

### Surveys → Access

- **When:** Security or access planning after surveys.
- **Example sentence:** “Security infrastructure planning often follows detailed [site surveys and mapping](https://mainlinesurveys.co.uk). For access control and CCTV design, see [Mainline Access](https://mainlineaccess.co.uk).”
- **Destination:** mainlineaccess.co.uk (home or relevant service).

### Access → Surveys

- **When:** Large commercial security installations, site prep, or design context.
- **Example sentence:** “Large commercial security installations often require a [topographical survey](https://mainlinesurveys.co.uk/services/topographical-survey) before installation begins.”
- **Destination:** mainlinesurveys.co.uk (e.g. `/services/topographical-survey`).

### Access → Drains

- **When:** Construction, refurbishment, or utilities context.
- **Example sentence:** “Security systems are often installed during major construction projects alongside [drainage and other utilities](https://mainlinedrains.co.uk).”
- **Destination:** mainlinedrains.co.uk (home or services index).

---

## Implementation checklist for a new vertical

- [ ] Add `partnerBaseUrl` (and optional path constants) for at least two other verticals in this vertical’s `config.ts`.
- [ ] In service detail or overview content, add at least two contextual sentences that link to the other verticals (see example patterns above).
- [ ] Use config-driven URLs in the component so links stay correct if domains or paths change.
- [ ] Check that link text is descriptive (e.g. “topographical survey”, “drainage and other utilities”) and that the sentence reads naturally in context.

---

## Reference: vertical IDs and domains

| verticalId | Site name       | Domain                    |
|------------|-----------------|---------------------------|
| drains     | Mainline Drains | mainlinedrains.co.uk      |
| surveys    | Mainline Surveys| mainlinesurveys.co.uk     |
| access     | Mainline Access | mainlineaccess.co.uk      |

Use `verticalId` in analytics, reporting, and any logic that needs to distinguish verticals (e.g. lead source, sitemap filtering).
