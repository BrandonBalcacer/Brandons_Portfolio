# Portfolio interaction update: verification

## Scope

The public portfolio links each project card to its case study, live app, and source repository. Case studies use local prepared captures, screenshot selection and enlargement, and keyboard-operable workflow tabs. Decorative motion runs independently of those navigation flows.

## Verified locally

- Production build and ESLint pass.
- Eight Node tests cover gesture direction, idle fade, repeated stationary input, resume after a pause, bounded history, fluid advection in four directions, reset, and finite values at boundaries and sharp turns.
- Home page: no horizontal overflow at 320, 375, 768, 1024, and 1440px. Case study checks include narrow phone, tablet, and desktop layouts.
- All four case-study routes load; Stratos starts with the globe. Screenshot selectors update the image and caption. Bakery and CRM secondary captures load; Roam retains portrait proportions.
- Enlarged screenshots open in a native modal dialog. Escape and the close button work; keyboard focus returns to the originating button. Roam's enlarged view was visually checked at 375px.
- Workflow tabs switch with ArrowRight; the active panel and its accessible label update together.
- Browser console: no errors observed during the local page and gallery checks.
- All four external app root URLs returned HTTP 200. Authenticated product flows were not exercised. Private source links are labeled as requiring access.
- Main-page metadata contains a title, description, viewport, generated Open Graph image, Twitter card, and favicon. Case studies define their own screenshot share images.

## Intentional design choices and limits

- Green glow, occasional lightning, tinted project surfaces, and image hover previews were explicitly requested. Static image scaling crops screenshots; hover changes that scale only slightly.
- The CSS radius aliases correspond to the existing 6/8/12px scale. Static scanner warnings about separate component titles and viewports are inherited-layout false positives.
- Fluid behavior is covered by engine tests. The native browser pointer driver selected page text during an attempted margin gesture, so the final cursor feel still needs Brandon's visual review. Reduced-motion and visibility handling are implemented in code; OS reduced-motion emulation was not available in this browser session.
- The CRM is temporarily called Real Estate CRM Agent. The existing repository and hosted address retain legacy names; no connected CRM, deployment, live lead processing, or customer sending was changed.
- Prepared app images are presentation edits of supplied captures; bakery figures are synthetic. See `project-image-preparation.md` for provenance and prompts.
- This change is prepared for a single pull request. It does not merge or deploy production.
