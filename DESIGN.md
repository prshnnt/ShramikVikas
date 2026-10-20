MASTER PROMPT: Rebuild the ShramikVikas frontend in a glass-and-coral design system (English and Hindi)

ROLE
You are a senior product designer and React engineer. Rebuild the frontend UI of ShramikVikas, a labour-market intelligence web app for India's skilling ecosystem, using Material UI (MUI). Match the visual language of the reference below. Keep every feature, route, API call and data rule.

REFERENCE DESIGN (match its look and feel)
- Layout: a large rounded panel on a soft, blurred backdrop, with a glowing coral-red light source behind the centre of the hero.
- Surfaces: frosted glass cards (translucent white or near-black, background blur 16–20 px, 1 px light border, 20 px radius, very soft shadow). Glass sits on a gradient background; text never sits directly on a blur without a solid or near-solid surface behind it.
- Navigation (public site): a floating glass pill containing the links, with a solid coral pill CTA on the right. The logo sits to the left of the pill.
- Hero: a small status pill at the top ("● Official data · Updated on each release"), a two-line display headline, a short grey lead paragraph, and two pill buttons side by side: a solid coral primary button with a white circular arrow chip, and a white secondary button.
- Floating cards: four translucent cards around the hero, two on each side, slightly rotated and fading toward the edges. The outer cards are blurred and faded; the inner cards are sharp. They are decorative (aria-hidden) and carry real facts from the project, never invented quotes.
- Trust row: a small uppercase label ("TRUSTED SOURCES") above a row of official source names set as text wordmarks (PLFS, PMKVY, NCS, NIC). Do not use third-party logos.
- Motion: cards drift up and down by about 6 px on a 6-second loop; buttons lift 2 px on hover. Turn all motion off under prefers-reduced-motion.

WHAT NOT TO COPY
- The reference brand name, logo, testimonials, client logos, and copy. Use ShramikVikas's own name, logo and content.
- Any content not supported by the project's data (no testimonials, no made-up client names, no invented statistics).

DATA RULES (non-negotiable)
1. Never invent a number. Missing values show "Not published" or "Not in public sources" with a one-line reason.
2. Every figure shows its source and date (for example "PLFS 2025 · Jan–Dec 2025").
3. Ranks are labelled "indicative pressure", not validated gaps. Show the indicator definition on the same screen.
4. Sample or demo data carries a visible "Sample" chip. Demo accounts never appear in production builds.
5. Status is never colour-only: every status has an icon and a word.

FEATURES TO KEEP (every route must still work)
Public site (glass top bar, footer):
- /product, /how-it-works: product overview and method
- /auth/signin, /auth/signup, /auth/reset, /auth/verify: email one-time code sign-in, sign-up, password reset, verification; optional phone one-time code; optional Google and GitHub sign-in
- /onboarding: first-run setup (role, state or sector interest)
- Home page: hero, three views (Demand, Supply, Skill gaps), the four-step "How each number is built" flow, a trust line, and a closing call to action. Keep this content structure; the visual design follows the reference.

Workspace (glass vertical sidebar; see NAVIGATION):
- /intelligence: overview with national indicators and an evidence panel
- /skills, /occupations, /industries: tables and filters
- /regions: state and UT ranking, with a Leaflet map and a list view
- /demand: vacancies and employers by region (NCS data)
- /supply: certified candidates, training centres and sector output (PMKVY data)
- /skill-gaps: ranked mismatch, with indicator definitions
- /forecast: projections with uncertainty bands, labelled "Indicative"
- /early-warning: flags for trades or regions approaching shortage or saturation
- /scenarios: what-if controls and comparison charts
- /spatial: spatial view, lazy-loaded
- /reports: CSV and JSON export, and a print view
- /my-intelligence, /profile, /settings, /help: saved views, account, preferences (theme, language, notifications), help and glossary
- *: not-found page linking back to the workspace

Global features:
- Command palette (Ctrl/Cmd+K): search and jump to any page, with arrow-key navigation.
- Preferences: light and dark theme; English (en-IN) and Hindi (hi-IN).
- Workspace filters (state, sector, period) that persist across pages.
- API health indicator with clear error and empty states.
- Keyboard navigation and screen-reader labels on every control.

NAVIGATION
- Public pages: glass pill top bar (MUI AppBar, transparent, with a Toolbar styled as a pill). Collapse to a drawer below 900 px.
- Workspace pages: a glass vertical sidebar (MUI Drawer, variant="permanent" on desktop).
  - Collapsed width 72 px, showing icons only, each with an aria-label.
  - On hover or keyboard focus, expand to 248 px as an overlay so content does not jump. Labels fade in over 180 ms.
  - A pin button at the bottom keeps the sidebar expanded and shrinks the content area.
  - Groups with dividers and small headings: Overview (/intelligence); Data (/regions, /skills, /occupations, /industries); Signals (/demand, /supply, /skill-gaps, /early-warning); Planning (/forecast, /scenarios, /spatial, /reports); Account (/my-intelligence, /profile, /settings, /help).
  - Active item: a coral pill highlight with a white label.
  - Below 900 px: a glass bottom navigation bar with the four most-used items and a "More" sheet for the rest.

DESIGN TOKENS
- Light theme: background gradient from #EEF0F3 to #E4E7EC, with a radial glow of rgba(201, 55, 42, 0.18) behind the hero. Glass surface rgba(255, 255, 255, 0.72). Border rgba(255, 255, 255, 0.75). Text primary #111827, text secondary #5B6270.
- Dark theme: background #111113, glass surface rgba(28, 28, 32, 0.72), border rgba(255, 255, 255, 0.08), text primary #F3F4F6, text secondary #A1A7B3, glow rgba(255, 107, 87, 0.16).
- Accent: primary #C9372A (white text contrast about 5.8:1), hover #A92B20. Dark theme primary #FF6B57. Secondary #111827 for dark pills.
- Status colours, each with an icon and a word: undersupply #0F766E; oversupply #B45309; balanced #15803D; low base #64748B; unavailable: dashed outline with "Not published".
- Chart series (maximum five): #C9372A, #0F766E, #F59E0B, #7C3AED, #64748B. Beyond five, group as "Other".
- Shape: pill buttons and chips (999 px radius); cards 20 px; inputs 12 px. Spacing on an 8 px grid.

TYPOGRAPHY
- Latin (English): Poppins, self-hosted with @fontsource/poppins (weights 400, 500, 600, 700). Do not load it from Google Fonts; the app's Content Security Policy blocks external fonts.
  - Display (hero headline): 56–64 px, weight 600, line-height 1.1, letter-spacing -0.02em.
  - H2: 36–40 px, weight 600. H3: 22–24 px, weight 600. Body: 16–18 px, weight 400, line-height 1.6. Labels: 14 px, weight 500. Uppercase labels: 12 px, weight 600, letter-spacing 0.08em.
  - KPI numbers: 32–40 px, weight 600, tabular figures.
- Hindi (hi-IN): Noto Sans Devanagari, self-hosted with @fontsource/noto-sans-devanagari (weights 400, 600, 700). When lang="hi":
  - Headings: line-height 1.3 (not 1.1), weight 600 or 700, no letter-spacing changes.
  - Body: line-height 1.75–1.8.
  - Never use italics. Make sure matras (vowel marks) do not collide with the line above.
- Numbers: Indian grouping (1,00,000) in both locales, via Intl.NumberFormat('en-IN').

HERO CONTENT (English; Hindi uses the existing hi-IN locale keys)
- Status pill: "Official data · Updated on each release"
- Headline: "Plan training where the jobs are."
- Lead: "Compare official vacancy, training and labour data for every state and union territory, and see where skill supply and demand do not match."
- Buttons: "Open the workspace" (coral pill with a white arrow chip) and "How it works" (white pill).
- Floating cards (real facts only): "37 regions in the labour snapshot"; "1,341 labour records"; "9 official sources, each checksummed"; "0 quality errors in the latest data report".
- Trust row: "TRUSTED SOURCES" with the text wordmarks PLFS, PMKVY, NCS, NIC.

MATERIAL UI
- Install @mui/material, @mui/icons-material, @emotion/react, @emotion/styled. For data: @mui/x-data-grid (community edition only; no Pro or Premium features) and @mui/x-charts. Keep Leaflet for the map, wrapped in a glass Paper.
- Theme: one theme module exporting light and dark themes, with overrides for MuiAppBar, MuiButton (pill shape; trailing arrow chip variant), MuiCard (glass), MuiChip, MuiDrawer, MuiDataGrid, MuiTextField.
- Glass recipe: backdrop-filter blur(16px) saturate(140%); fallback to a solid surface when backdrop-filter is unsupported.
- Map every element to MUI: Button/IconButton; Switch and ToggleButtonGroup for language and theme; TextField, Select, Autocomplete, Checkbox, Radio, Slider; Box, Stack, Grid, Container, Paper, Card; AppBar, Toolbar, Drawer, List, Tabs, Breadcrumbs, BottomNavigation, Menu; Alert, Snackbar, Dialog, Tooltip, LinearProgress, Skeleton; DataGrid, Chip, Badge, Avatar; Stepper for onboarding; Dialog with Autocomplete for the command palette.

ACCESSIBILITY (WCAG 2.1 AA)
- Body text contrast at least 4.5:1 against the surface behind it, including glass surfaces. Check the glow area in particular.
- Decorative floating cards are aria-hidden and do not take focus.
- Visible focus ring (2 px, offset 2 px) on every control.
- Skip-to-content link; logical focus order; no keyboard traps.
- Every icon-only control has an aria-label, including collapsed sidebar items.
- Every chart has a table alternative.
- Respect prefers-reduced-motion and prefers-color-scheme on first load.

INTERNATIONALISATION
- Reuse the existing locale keys in en-IN.js and hi-IN.js. Add keys only for new UI pieces.
- Set lang on the root element; switch fonts and line-heights from it.
- Allow 30% text expansion in buttons and table headers.

PERFORMANCE AND SECURITY
- Route-level code splitting (React.lazy). Load Leaflet and Three.js only on pages that use them.
- Self-host all fonts. Do not load fonts or scripts from CDNs.
- Do not store tokens in localStorage. Use the existing cookie-based session.
- Target Lighthouse performance and accessibility scores of 90 or above on the home page. Keep blur effects to the hero and the sidebar; avoid blur behind long text.

ACCEPTANCE CHECKLIST
- [ ] Every route in AppRoutes works.
- [ ] Hero, glass nav, floating cards and trust row match the reference layout and feel.
- [ ] Sidebar shows icons only when collapsed, reveals labels on hover and focus, and can be pinned.
- [ ] Hindi renders in Noto Sans Devanagari with the taller line-height, no italics, and no clipped matras.
- [ ] English and Hindi switch on every page with no hard-coded strings.
- [ ] Light and dark themes both pass contrast checks.
- [ ] Missing data shows the unavailable state; no invented numbers or testimonials.
- [ ] Every figure shows its source and date.
- [ ] Reduced motion disables the float and hover animations.
- [ ] Mobile (360–430 px) works with the bottom navigation.
- [ ] Playwright tests cover sign-in, navigation, language switch, theme switch and one export.

DELIVERABLES
1. The frontend project (React, Vite, MUI) with theme/, layouts/ (public and workspace), and pages, features and components as before.
2. theme/ with light and dark themes, the glass recipes, and the Poppins and Noto Sans Devanagari setup.
3. A short README: setup, scripts, fonts, MUI X community licence, and how to add a page.
4. A change log listing each route and what changed in its UI.

DO NOT
- Change backend endpoints, response shapes or data snapshots.
- Copy the reference brand, logo, testimonials or client logos.
- Add features beyond this list.
- Use Google Fonts or any other external CDN.
- Use MUI X Pro or Premium features.
- Invent statistics, quotes or client names.