# Portfolio design system

Existing identity: dark terminal surfaces, green accents, Inter for reading, JetBrains Mono for metadata. Extend the shipping system.

- Background #0c0d10; surface #131620; foreground #e8eaed; muted #a1a7b3; border #20242c; accent #4ade80.
- Spacing follows Tailwind's 4px scale. Content width 1024px; case-study prose capped at 65ch.
- Radius: 6px chips, 8px controls, 12px cards. Borders define surfaces.
- Heading hierarchy: 48/36/24/20px with responsive scaling. Body 16px at 1.65 line height.
- Motion: 140ms press, 240ms response, 380ms entrance, ease-out. Honor prefers-reduced-motion; touch receives no cursor decoration.
- Project cards are complete semantic links. Hover previews stay within the card and work on keyboard focus. Project detail routes use the same shell and tokens.
- The broad green field is an advected fluid simulation. Pointer momentum pushes dye through a pressure-projected velocity grid; small eddies change the shape along the gesture. Stopping fades it within roughly 250ms and stops the animation loop. No fixed shape follows the pointer.
- Color roles: green for property research, sky blue for the CRM assistant, coral for travel, amber for bakery operations. Use restrained tinted surfaces, headings, and link accents across the page. New color tokens use OKLCH.
- Repository links appear on cards and case studies, separate from each card's main link. Private source is explicitly labeled and requires existing access.
- Each project's actual website is the prominent action on its card and case study, with its hostname visible. Source links are secondary. Bakelytics uses the user-confirmed custom domain, bakelytics.com.
- The user's CNBC/NYSE photo has no caption overlay. Project cards use the supplied app captures, framed with a full tinted border. Case studies include screenshot selectors and an accessible native-dialog enlarged view.
- Stratos keeps the globe as its main image. Roam uses upright phone proportions. Bakery captures retain the Simargi mark with anonymous sample figures and no bakery name. Raw browser captures stay outside public assets and Git.
- Lightning uses displaced, branching channels with white-hot mint cores, layered bloom, and a brief page-wide illumination. A first strike arrives after 4.5-8 seconds; later strikes wait 8-16 seconds after the afterglow. The four edges and four corners have equal chances as entry points; branches and the illumination follow the entry direction. Each strike has one illumination pulse and a fading afterglow. Reduced motion hides the bolts and flash. Hover glows apply to interactive elements and keyboard focus remains visible.
- Other sections carry the project-card gradient treatment through shared surface tokens: blue experience, coral skills and skill pills, amber education/honors, mint connect links. Section numbers, slashes, rules, and small accents use their section's color. Reading text retains the neutral contrast palette.
- The identity card uses dark translucent glass, an 8px backdrop blur, a subtle rim highlight, and a darker text-area backing so lightning can show through. The portrait remains an uncaptioned photograph. Unsupported backdrop filters receive an opaque fallback.
- About copy stays in Brandon's first-person voice, with three readable paragraphs covering his current role, useful AI-assisted software and analytics work, and broad technical curiosity. No em dashes in the About section.
- The CRM project is temporarily Real Estate CRM Agent. PLACE is the intended integration; shadow evaluation and locked sends describe the present stage. The existing repository and hosted URL still have legacy names.
