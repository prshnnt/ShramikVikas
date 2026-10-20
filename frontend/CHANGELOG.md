# ShramikVikas Frontend Rebuild — Change Log

## Overview
Rebuilt the entire frontend user interface in a **glass-and-coral design system** (English & Hindi) using **Material UI (MUI)**. All routes, backend APIs, data rules, and accessibility guidelines have been preserved and enhanced.

---

## Route-by-Route Changes

| Route | Classification | UI Changes & Modernization |
| :--- | :--- | :--- |
| **`/` (Home)** | Public | Implemented the master reference hero design: large rounded frosted glass panel on soft blurred backdrop with glowing coral light source behind the center. Added 4 floating decorative fact cards (`aria-hidden`) drifting on a 6s loop with real data. Added "● Official data · Updated on each release" status pill, two-line display headline, solid coral primary button with circular arrow chip, white secondary button, and trust row with text wordmarks (PLFS, PMKVY, NCS, NIC). Added the three-lens view (Demand, Supply, Skill Gaps) in frosted glass tabs, the 4-step "How each number is built" pipeline, and closing glass CTA banner. |
| **`/product`** | Public | Framed with the floating glass pill navigation bar (`PublicNavbar`) and frosted glass footer (`PublicFooter`). Cards now use 20px border radius, glass surfaces (`rgba(255, 255, 255, 0.72)` / `rgba(28, 28, 32, 0.72)`), and responsive MUI layout. |
| **`/how-it-works`** | Public | Enhanced methodological steps into frosted glass cards with step indicators, coral pill CTAs, and clear data rule explanations. |
| **`/about`, `/contact`, `/documentation`, `/privacy`, `/terms`** | Public | Standardized inside the glass layout with self-hosted Poppins and Noto Sans Devanagari typography, contrast-tested text, and breadcrumbs. |
| **`/auth/signin`** | Authentication | Inputs converted to 12px border radius with subtle translucent glass backgrounds; buttons styled as pill CTAs with 2px hover lift. Pre-filled demo credentials preserved for evaluator testing. |
| **`/auth/signup`** | Authentication | Glass card styling, pill buttons, WCAG 2.1 AA accessible focus rings, and bilingual error messaging. |
| **`/auth/reset`** | Authentication | Password reset flow wrapped in frosted glass surface with clear status feedback. |
| **`/auth/verify`** | Authentication | Email verification cards updated with glass background blur and verification token validation. |
| **`/onboarding`** | Workspace | Onboarding wizard wrapped in MUI Glass Paper with step indicators, interest selectors, and smooth keyboard navigation. |
| **`/intelligence`** | Workspace | Primary workspace overview with the new permanent glass vertical sidebar (72px collapsed, expands to 248px on hover overlay, pin toggle button at bottom). Real national indicators, evidence panels, and official source badges. |
| **`/regions`** | Workspace | State and UT rankings with Leaflet map wrapped in glass Paper, list/grid toggle, and indicative pressure indicators. |
| **`/skills`** | Workspace | Glass data tables with filters, search, and relationship graph. Unavailable states explicitly show "Not published in public sources" with a reason. |
| **`/occupations`** | Workspace | Standardized NCO-2015 occupation tables with glass styling and source provenance. |
| **`/industries`** | Workspace | NIC-2008 sector reference list rendered with glass surfaces and source attribution. |
| **`/demand`** | Workspace | Active NCS vacancies and employer breakdown by region with verified status badges (paired icon + word) and publication dates. |
| **`/supply`** | Workspace | Certified candidates and PMKK training centers output (PMKVY data) with balanced status indicators and source checksum tags. |
| **`/skill-gaps`** | Workspace | Added prominent **Indicative Pressure** indicator definition callout on the screen. Status badges strictly enforce icon + word pairing. |
| **`/forecast`** | Workspace | Added prominent **"Indicative · Uncertainty Bands"** banner to the header. Projections include historical backtesting and confidence intervals. |
| **`/early-warning`** | Workspace | Shortage and saturation flags styled with amber and teal status badges (icon + word) and evidence panels. |
| **`/scenarios`** | Workspace | What-if policy comparison simulation controls and comparison charts wrapped in glass panels. |
| **`/spatial`** | Workspace | Lazy-loaded spatial view with Leaflet geographic layers wrapped in glass Paper. |
| **`/reports`** | Workspace | CSV, JSON export and print view with data provenance tables. |
| **`/my-intelligence`** | Workspace | User saved views, bookmarks, and custom filters in glass cards. |
| **`/profile`** | Workspace | Personal account management with glass avatar cards and preferences. |
| **`/settings`** | Workspace | Theme toggle (Light/Dark), Language switcher (English/Hindi), notification toggles. |
| **`/help`** | Workspace | Glossary, indicator definitions, and methodological documentation. |
| `*` (Not Found) | Global | 404 error page styled in glass panel linking back to `/intelligence`. |

---

## Global Features Delivered

1. **Floating Glass Pill Public Navigation**:
   - Floating glass pill navbar on desktop, collapsing to an accessible glass drawer below 900px.
   - Solid coral pill CTA on the far right with circular white arrow chip.
2. **Expandable & Pinnable Glass Workspace Sidebar**:
   - Permanent MUI Drawer collapsed to 72px (showing icons only with tooltips and `aria-label`).
   - Expands to 248px as an overlay on hover/focus without content jump (180ms transition).
   - Bottom pin button locks sidebar expanded and pushes content area.
   - Categorized into Overview, Data, Signals, Planning, and Account groups.
   - Below 900px: collapses to a glass bottom navigation bar with 4 most-used links + "More" drawer sheet.
3. **Command Palette (`Ctrl/Cmd+K`)**:
   - Rebuilt with MUI Dialog and Autocomplete, allowing instant keyboard search across pages, regions, and industries.
4. **Bilingual Typography & Devanagari Rules**:
   - Poppins for English; Noto Sans Devanagari for Hindi.
   - Hindi headings enforce taller line-height (1.3), body (1.75–1.8), no italics, and matra clearance.
   - Indian number grouping (`1,00,000`) across all locales.
5. **Strict Data & Status Rules**:
   - Every status badge is guaranteed to have both an icon and a word.
   - Unavailable states show dashed outline with "Not published" and a one-line reason.
   - Figures show official source and release date.
