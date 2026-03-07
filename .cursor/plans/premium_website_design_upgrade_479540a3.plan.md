---
name: Premium website design upgrade
overview: "Upgrade the entire HypeOn site to match the reference (Marketer.com-style) premium aesthetic: light off-white theme, single sans-serif typography, black CTAs with arrow, dark footer with rounded top, restrained colors, and refined animations—while keeping all existing content."
todos: []
isProject: false
---

# Premium Website Design Upgrade Plan

## Design direction (from reference)

- **Layout**: Full-width navbar (solid, not floating pill), logo left / nav center / Login + “Book demo” right; hero with headline + single CTA; centered content with generous whitespace; footer as a dark block with rounded top corners and multi-column links.
- **Theme**: Light off-white/cream (`#F9F7F4` / `#FDFDFC`) for main backgrounds; dark charcoal text (`#1F2937`, `#333`); black primary buttons; optional green accent for badges only.
- **Typography**: One modern sans-serif (e.g. Inter) for everything—no Playfair Display; clear hierarchy via size/weight only.
- **CTAs**: “Book demo” (or equivalent) as black, rounded button with white text and optional right-arrow icon; no pink/indigo gradients on primary actions.
- **Footer**: Dark grey/black background, rounded top-left/right, white/light grey text, multi-column link groups, optional “Download on App Store” style and social links.

---

## Section layout and structure (match image UI)

Every section on every page must follow these **layout and structure** patterns from the reference. Content stays; structure changes to match.

### Reference section patterns


| Pattern                       | Layout / structure                                                                                                                                                                                                                                                                    | Use for                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **Hero**                      | (1) Optional badge top-left. (2) Large headline, left-aligned. (3) Single “Book demo” CTA below. (4) Two-column row below CTA: left = short statement (e.g. “It’s one connected system.”), right = longer paragraph. No centered dashboard block unless it’s a single focused visual. | Home hero; page intros that act as hero                         |
| **Partners row**              | One line: small muted label centered (“Official partners”). Next line: horizontal row of logos, evenly spaced, same height. No grid of cards.                                                                                                                                         | Partners, any “backed by” / “partners” blocks                   |
| **Problem / value card**      | One contained block (max-width, centered). Heading, then body copy. Subtle card shadow/border, no multi-column comparison inside.                                                                                                                                                     | “The growth stack is broken” style; single-message value blocks |
| **Two-column: image + steps** | Two columns: left = image (or visual); right = headline + numbered list (1, 2, 3) with **large numbers** and description text per step. Vertical rhythm between steps.                                                                                                                | “It’s easy to start growing”; any “how it works” / steps        |
| **Three-column features**     | Centered section heading. Under it: 3-column grid. Each column: icon in small colored rounded box → title → short description → optional “Explore X” text link. Equal column width, no featured “pill” in the middle.                                                                 | “One platform. Three products.”; feature grids                  |
| **Two-column + three-column** | First row: two columns (e.g. logo + text left, image card right). Second row: three-column grid of feature blocks (icon, title, description).                                                                                                                                         | Partnership/feature combo sections                              |
| **Testimonials**              | Centered section heading. Grid of testimonial cards (e.g. 3–4 columns or responsive grid). Each card: star rating, quote text, name, location. Same card style for all.                                                                                                               | Testimonials, social proof                                      |
| **Footer**                    | Full-width dark block, **rounded top corners**. Inside: one row with multiple columns. First column: logo + tagline + optional “App Store” button. Next columns: each a bold title + list of links. Bottom row: copyright + legal/social.                                             | All pages                                                       |


### Page-by-page section structure

- **Home**
  - **Hero**: Badge → headline → one CTA → two-column supporting copy (left: one line; right: paragraph). Remove or simplify large centered dashboard/typewriter block; if kept, use as a single visual below the two-column row.
  - **ValueProp**: Prefer **problem card** (one block, heading + body) or **two-column comparison** only if reference shows it; no floating badges; structure = clear left “Old” / right “New” with same card treatment.
  - **Partners**: **Partners row** — label + single row of logos.
  - **Features**: **Three-column features** — section title, then 3 equal columns (icon box, title, description, “Explore” link).
  - **AboutCTA**: Centered heading + subcopy + one CTA button (same as reference CTA blocks).
- **About**
  - Each section restructured to one of: **problem card**, **two-column image + steps**, **three-column features**, or **partners row**. No mixed/complex layouts that don’t match these.
- **Products**
  - **Products intro**: Hero-style (headline, CTA, optional two-column copy).
  - **Product sections**: Use **two-column (image + steps)** or **three-column features** or **two-column + three-column** where appropriate. Single block for “problem” messaging.
- **Solutions**
  - Same as Products: intro = hero pattern; rest = **problem card**, **two-column**, or **three-column features**.
- **Privacy**
  - Single column, same navbar/footer; no special section layout.

Apply these structures so **every section’s layout and structure** matches the image UI; then apply the design system (colors, fonts, buttons) consistently.

---

## 1. Design system and global styles

**Files:** [src/app/globals.css](src/app/globals.css), [tailwind.config.js](tailwind.config.js)

- **Colors**
  - Replace current pink/indigo brand with a neutral palette: background `#F9F7F4` (or `#FDFDFC`), text `#0f172a` / `#1e293b` / `#64748b`, primary CTA black `#0f172a` or `#222`.
  - Add a single accent (e.g. green `#16a34a` or similar) for badges only (“Join 1500+ …”, “New”, etc.).
  - In Tailwind: new `theme.extend.colors` (e.g. `surface`, `ink`, `ink-muted`, `accent`) and keep one `brand` shade for minimal accent use if needed.
- **Typography**
  - Use one font stack (e.g. Inter) for body and headings; remove Playfair Display and `.font-display` from headings in `globals.css`.
  - In Tailwind: set `fontFamily.sans` to Inter (or chosen font); remove or repurpose `display` so headings use the same sans.
- **Remove or repurpose**
  - Glassmorphism (`.glass-nav`, `.glass-nav-pill`, `.glass-card`): replace with solid backgrounds (white navbar, light cards) and subtle borders/shadows.
  - Gradient text (`.text-gradient`, `.text-gradient-animated`): replace with solid dark text or a single, subtle accent.
  - Pink/indigo orbs and gradient orbs in Background: use very subtle neutral tones or remove.
- **Keep and tune**
  - Scroll reveal classes (`.reveal`, `.reveal-scale`, `.reveal-left`, etc.): keep; optionally adjust easing/duration for a calmer feel.
  - Button shine (e.g. `.btn-shine`): keep for primary CTA hover; ensure it works on black buttons.
- **Primary button**
  - New or updated class for “Book demo”: black bg, white text, rounded (e.g. `rounded-full` or `rounded-xl`), optional right arrow in circle; hover: slight brightness/scale or arrow slide.

---

## 2. Tailwind config

**File:** [tailwind.config.js](tailwind.config.js)

- Extend `colors` with surface, ink, ink-muted, accent (green for badges).
- Set `fontFamily` so one sans-serif is default; remove or alias `display` to same.
- Add/keep animation keyframes for subtle hover (e.g. arrow slide) and any scroll reveal if defined here.
- Ensure `tailwindcss-animate` remains for transitions.

---

## 3. Background

**File:** [src/components/Background.tsx](src/components/Background.tsx)

- Replace pink/indigo/purple blobs with very subtle neutral blobs (e.g. grey/beige, low opacity) or a single soft gradient; reduce visual noise to match “premium minimal” reference.
- Optionally simplify or remove grid overlay for a cleaner look.

---

## 4. Navbar

**File:** [src/components/Navbar.tsx](src/components/Navbar.tsx)

- **Layout**: Full-width bar; logo left, nav links in center, “Login” + “Book demo” right. No floating pill: solid white (or very light) background, optional thin bottom border.
- **Styling**: Remove glass pill; use `bg-white` (or `bg-[#FDFDFC]`), `border-b border-slate-200/60`, full width with constrained inner `max-w-7xl mx-auto`.
- **CTA**: Replace “Try HypeOn” + Beta badge with “Book demo” (or keep “Try HypeOn” but style as reference): black button, white text, optional right-arrow icon; same style as hero CTA.
- **Links**: Products (dropdown), Pricing, Company, Success Stories (or map “Solutions” to one of these), then Login + Book demo. Typography: medium weight, dark grey; hover: darker or underline.
- **Dropdown**: Products dropdown with smooth height/opacity transition; card style with subtle shadow and no heavy gradients.
- **Mobile**: Same structure in a slide-out or full-screen menu; “Book demo” prominent; dropdown behavior with clear open/close animation.

---

## 5. Hero

**File:** [src/components/Hero.tsx](src/components/Hero.tsx)

- **Background**: Section bg `#F9F7F4` or `#FDFDFC`; remove or soften pink/indigo orbs; keep section simple.
- **Content**: Keep headline and subcopy; optionally add a small green (accent) badge above headline (e.g. “Join 1500+ Leading Shopify brands” or your equivalent). Remove gradient from headline text; use solid dark color.
- **CTA**: Single primary CTA: “Book demo” (or “Try HypeOn”) as black button with white text and right-arrow icon (optionally in a small circle). Reuse the same button class as navbar. Remove Beta badge or make it a small, subtle pill.
- **Trust line**: Keep “FREE TO START…” in muted grey below CTA.
- **Dashboard / typewriter block**: If kept, style card with subtle shadow and border only; no pink/indigo glow. 3D tilt is optional; if kept, use subtle values.
- **Animation**: Hero content can keep fade-up on load; ensure timing is smooth and not flashy.

---

## 6. Footer

**File:** [src/components/Footer.tsx](src/components/Footer.tsx)

- **Block**: Dark background (`#1e293b` or `#0f172a`); full width; **rounded top corners** (e.g. `rounded-t-3xl`).
- **Content**: Logo + short tagline; then multi-column link groups (e.g. Product, Resources, Company, Our App, Follow us) with bold column titles and light grey links.
- **Links**: White or light grey text; hover state subtle (e.g. white or lighter). Keep “Contact” opening the existing contact modal.
- **Bottom bar**: Copyright and social/App Store links in a row; subtle top border if needed.
- **Typography**: All sans-serif, consistent with the rest of the site.

---

## 7. Home page sections — layout + structure + style

- **Hero** [src/components/Hero.tsx](src/components/Hero.tsx): **Structure** = badge → headline → one CTA → two-column row (short line left, paragraph right). Remove or shrink large centered dashboard/typewriter; if kept, one visual below. **Style** = off-white bg, black CTA, no gradient text.
- **ValueProp** [src/components/ValueProp.tsx](src/components/ValueProp.tsx): **Structure** = either one **problem card** (heading + body) or two-column “Old way” / “New way” with same card treatment (no floating badge). **Style** = light cards, subtle shadow/border, ink/ink-muted text.
- **Partners** [src/components/Partners.tsx](src/components/Partners.tsx): **Structure** = **partners row**: one centered muted label (“Official partners”), then single horizontal row of logos, evenly spaced. **Style** = grayscale or low-opacity logos optional.
- **Features** [src/components/Features.tsx](src/components/Features.tsx): **Structure** = **three-column features**: centered section title, then 3 equal columns (icon in colored box → title → description → “Explore X” link). No middle “featured” pill. **Style** = restrained icon colors, subtle card hover.
- **AboutCTA** [src/components/AboutCTA.tsx](src/components/AboutCTA.tsx): **Structure** = centered heading + subcopy + one primary CTA. **Style** = light background, black “Book demo”/Contact button; form modal styling (see Forms below).

---

## 8. Buttons and forms

- **Primary button**: One reusable style—black bg, white text, rounded, optional arrow icon; hover: slight scale or brightness + arrow slide; focus ring for a11y. Use in Navbar, Hero, AboutCTA, and any “Book demo” / “Contact” CTAs.
- **Forms** (contact modal and any inline forms): Inputs with light bg, subtle border, dark text; labels in muted; focus state with neutral ring; submit button = primary black button. Match [src/components/AboutCTA.tsx](src/components/AboutCTA.tsx) modal and any form in the app to this.

---

## 9. Animations and micro-interactions

- **Scroll reveal**: Keep [src/components/ScrollRevealSetup.tsx](src/components/ScrollRevealSetup.tsx); ensure `.reveal`* classes use the new palette (no pink). Optionally reduce motion or duration for a calmer feel.
- **Navbar**: Dropdown open/close with `transition` (height/opacity); link hover underline or color change.
- **Buttons**: Primary CTA hover: slight scale (e.g. `scale-[1.02]`), optional arrow translate; keep shine effect if it fits.
- **Cards**: Features, ValueProp, etc.: subtle `translateY` and shadow on hover; no colored glow.
- **Footer**: No heavy animation; optional subtle fade-in when in view.

---

## 10. About, Products, Solutions, Privacy pages — layout + structure + style

For **every section** on each page, first apply the **section layout and structure** from the table above (Hero, partners row, problem card, two-column image+steps, three-column features, two+three combo, testimonials, footer). Then apply the design system (colors, fonts, buttons).

- **About** [src/app/about/page.tsx](src/app/about/page.tsx): AboutIntro (hero pattern), AboutStory / AboutVision / AboutImpact (problem card or two-column image+steps), AboutDataSources / AboutCoreLayers (three-column features or two+three), AboutWhatWeDo (problem or steps), AboutDecisionLayer (two-column or problem card), GrowthTimeline (steps or list), BUILDING, TeamGlobalMap, AboutCTA (centered CTA block). Restructure each so layout matches one of the reference patterns; then same typography, light cards, black CTAs.
- **Products** [src/app/products/page.tsx](src/app/products/page.tsx): ProductsIntro (hero); HypeScoreSection, TrendingProducts, HighValueKeywords, WinningAdCreatives (two-column or three-column or problem card as appropriate); CopilotSection, HypeOnAnalytics, MarketingDecisioning (same); ProductsCTA (centered CTA). Match section structure to reference; then light sections, dark text, black CTAs.
- **Solutions** [src/app/solutions/page.tsx](src/app/solutions/page.tsx): SolutionsIntro (hero); SolutionsProblems (problem card); SolutionsSolutions / SolutionsFeatures / SolutionsIntelligence / SolutionsAnalytics (three-column or two-column+three-column). Align layout and structure with reference; then design system.
- **Privacy** [src/app/privacy-policy/page.tsx](src/app/privacy-policy/page.tsx): Single-column content; same navbar/footer, body bg, typography. No special section layout.

Use a single Background and Navbar/Footer across pages; ensure every section component follows one of the defined layout patterns and shared design tokens.

---

## 11. Component inventory (for consistency)

After global and shared component updates, sweep these for any remaining glass, gradient, or Playfair usage and replace with the new system:

- [AboutIntro](src/components/AboutIntro.tsx), [AboutStory](src/components/AboutStory.tsx), [AboutDataSources](src/components/AboutDataSources.tsx), [AboutVision](src/components/AboutVision.tsx), [AboutImpact](src/components/AboutImpact.tsx), [AboutWhatWeDo](src/components/AboutWhatWeDo.tsx), [AboutCoreLayers](src/components/AboutCoreLayers.tsx), [AboutDecisionLayer](src/components/AboutDecisionLayer.tsx)
- [GrowthTimeline](src/components/GrowthTimeline.tsx), [BUILDING](src/components/BUILDING.tsx), [TeamGlobalMap](src/components/TeamGlobalMap.tsx)
- [ProductsIntro](src/components/ProductsIntro.tsx), [HypeScoreSection](src/components/HypeScoreSection.tsx), [TrendingProducts](src/components/TrendingProducts.tsx), [HighValueKeywords](src/components/HighValueKeywords.tsx), [WinningAdCreatives](src/components/WinningAdCreatives.tsx), [CopilotSection](src/components/CopilotSection.tsx), [HypeOnAnalytics](src/components/HypeOnAnalytics.tsx), [MarketingDecisioning](src/components/MarketingDecisioning.tsx), [ProductsCTA](src/components/ProductsCTA.tsx)
- [SolutionsIntro](src/components/SolutionsIntro.tsx), [SolutionsProblems](src/components/SolutionsProblems.tsx), [SolutionsSolutions](src/components/SolutionsSolutions.tsx), [SolutionsFeatures](src/components/SolutionsFeatures.tsx), [SolutionsIntelligence](src/components/SolutionsIntelligence.tsx), [SolutionsAnalytics](src/components/SolutionsAnalytics.tsx)
- [ScrollReveal](src/components/ScrollReveal.tsx) (if used): ensure it doesn’t force old colors/fonts.

---

## Implementation order

1. **Design system**: Update [globals.css](src/app/globals.css) and [tailwind.config.js](tailwind.config.js) (colors, fonts, remove gradient/glass; add primary button style).
2. **Background**, **Navbar**, **Footer** — new shell (layout + style) for every page.
3. **Hero** — restructure to badge → headline → CTA → two-column copy; then apply style + primary CTA component.
4. **Home sections**: For each (ValueProp, Partners, Features, AboutCTA), **change layout/structure first** to match the section patterns above, then apply styles.
5. **Forms and modals**: Contact modal and forms in AboutCTA (structure + style).
6. **About, Products, Solutions**: For **every section component**, restructure to one of the reference section patterns (hero, partners row, problem card, two-column image+steps, three-column features, two+three, testimonials), then apply design system.
7. **Privacy**: Navbar/footer + single-column content + typography.
8. **Animation pass**: Scroll reveal, dropdown, button hovers, card hovers.
9. **Final pass**: Remove any remaining gradient/glass/serif; verify contrast and accessibility.

---

## Summary


| Area                 | Change                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Section layout**   | Every section follows reference patterns (hero, partners row, problem card, two-col image+steps, three-col features, footer); restructure first, then style. |
| **Theme**            | Light off-white bg, dark text, black CTAs, one green accent for badges                                                                                       |
| **Typography**       | Single sans-serif (e.g. Inter); no Playfair                                                                                                                  |
| **Navbar**           | Solid bar, “Book demo” black button with arrow                                                                                                               |
| **Hero**             | Off-white section, optional green badge, single black CTA                                                                                                    |
| **Footer**           | Dark block, rounded top, multi-column, white/light links                                                                                                     |
| **Cards / sections** | Solid light cards, subtle shadows; no glass or gradient                                                                                                      |
| **Animations**       | Refined scroll reveal; hover on buttons and cards; smooth dropdown/modal                                                                                     |


All content stays; **layout and structure** of every section and page are aligned to the image UI, then theme, fonts, colors, and animations are applied for a premium, minimal look.