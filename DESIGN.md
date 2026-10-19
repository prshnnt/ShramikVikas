# DESIGN.md: KaushalIQ

Visual and interaction system for KaushalIQ, a labour-market intelligence tool for skill planners.

**Direction:** minimal structure, bohemian warmth. Generous space, quiet typography, earthy colour, and a few hand-made touches (arches, dotted rules, block-print borders). Decoration supports the data and never competes with it.

---

## 1. Principles

1. **Data first.** Numbers and rankings are the hero. Ornament sits at the edges of a page, never inside a chart or table.
2. **One warm accent.** Terracotta is the only action colour. Other colours appear only to encode categories or states.
3. **Calm over clever.** Flat surfaces, hairline borders, no drop shadows, no gradients, no glass.
4. **Honest about missing data.** Unavailable values are drawn as a dashed outline with a plain label. Never a blank cell, never an invented number.
5. **Labels, not colour alone.** Every status has a word and an icon or shape, not only a colour.
6. **Plain language for planners.** Short sentences, state and district names in full, units written out.

---

## 2. Motifs (use sparingly)

Bohemian character comes from three motifs. Each page uses at most two.

| Motif | Where | How |
|---|---|---|
| **Arch** | Hero card, empty-state frame, avatar and logo mark | Top corners fully rounded, bottom corners 16px. Never on data tables or charts. |
| **Dotted rule** | Section dividers | 1px dotted line in `--border-control`, 4px dot spacing. Replaces solid rules between sections. |
| **Block-print border** | Footer and report cover only | Single row of small repeated dots or diamonds in `--accent-fill`, 6px tall. Never on content cards. |

Do not use: patterned backgrounds, illustrations of people, floral clip-art, or more than one motif per card.

---

## 3. Colour

All colours are defined as tokens in `tokens.css`. Components reference tokens, never hex values.

### 3.1 Light theme (default)

| Token | Hex | Use |
|---|---|---|
| `--bg-canvas` | `#FAF6EE` | Page background (warm linen) |
| `--bg-surface` | `#FFFDF8` | Cards, tables, panels |
| `--bg-subtle` | `#F3ECDF` | Table header, input background, chips |
| `--bg-hover` | `#EDE4D3` | Hover on rows and buttons |
| `--text-primary` | `#2B2420` | Headings and body (espresso) |
| `--text-secondary` | `#6B5E55` | Supporting text |
| `--text-meta` | `#72655C` | Captions, timestamps (AA on canvas) |
| `--border-subtle` | `#E4D9C8` | Card and table borders |
| `--border-control` | `#8A7C70` | Input borders, dotted rules |
| `--accent-fill` | `#B5562E` | Primary button, active tab marker, focus base |
| `--accent-on-fill` | `#FFFFFF` | Text on accent fill |
| `--accent-text` | `#9E4A26` | Links and accent text on light |
| `--accent-subtle` | `#F6E3D8` | Selected row, active filter chip |
| `--focus-ring` | `#2F6F6A` | Focus outline (2px, offset 2px). Teal, so focus stands apart from the accent. |

### 3.2 Semantic and category colours

| Role | Text | Surface | Use |
|---|---|---|---|
| Undersupply pressure | `#2F6F6A` (teal) | `#E1EFEC` | Ranking indicator |
| Oversupply risk | `#9E4A26` (terracotta) | `#F6E3D8` | Ranking indicator |
| Balanced | `#4E6B50` (sage) | `#E3ECE1` | Ranking indicator |
| Trained high vs vacancies | `#7A6A1F` (ochre) | `#F5E9CC` | Ranking indicator |
| Low base, not ranked | `#5B5B5B` | `#ECEAE6` | Small samples |
| Unavailable | `#6B5E55` | dashed border only | Missing data |
| Danger | `#A23B2C` | `#F7E1DC` | Errors |
| Success | `#3E6B45` | `#E3ECE1` | Confirmations |

### 3.3 Chart series (in order)

`#B5562E` terracotta, `#2F6F6A` teal, `#C8922E` ochre, `#6F8F72` sage, `#7A4E6B` plum.
Use at most five series. Beyond five, group the rest as "Other" in grey `#8A7C70`.

### 3.4 Dark theme (optional, same token names)

| Token | Hex |
|---|---|
| `--bg-canvas` | `#1E1A16` |
| `--bg-surface` | `#27221D` |
| `--bg-subtle` | `#312A23` |
| `--text-primary` | `#F3ECDF` |
| `--text-secondary` | `#C9BBA9` |
| `--accent-fill` | `#E08A5E` (accent-on-fill `#1E1A16`) |
| `--border-subtle` | `#3F372F` |

Verify all text pairs with a contrast checker before release.

---

## 4. Typography

| Role | Family | Source | Weights |
|---|---|---|---|
| **Display** (page titles, arch-card headings, wordmark) | Fraunces (variable, optical size) | `@fontsource-variable/fraunces`, self-hosted | 400, 500 |
| **Body and UI** | Inter (variable) | `@fontsource-variable/inter`, already in the repo | 400, 500, 600 |
| **Numerals in tables** | Inter with `font-variant-numeric: tabular-nums` | same | 500 |
| **Hindi and other Indic scripts** | Noto Sans Devanagari | `@fontsource/noto-sans-devanagari`, self-hosted | 400, 600 |

Fraunces is used only for display. Never for table content, buttons, or form labels.

### 4.1 Scale

| Token | Size / line height | Use |
|---|---|---|
| `--text-display` | 40 / 46 px (Fraunces 500) | Page title on landing and cover |
| `--text-h1` | 30 / 36 px (Fraunces 500) | Page title in the app |
| `--text-h2` | 22 / 28 px (Fraunces 500) | Section title |
| `--text-h3` | 17 / 24 px (Inter 600) | Card title |
| `--text-body` | 16 / 26 px (Inter 400) | Body text, minimum size |
| `--text-small` | 14 / 20 px (Inter 400) | Table cells, helper text |
| `--text-meta` | 13 / 18 px (Inter 500) | Labels, captions, sources |
| `--text-kpi` | 36 / 40 px (Fraunces 500, tabular for numbers) | Headline numbers |

Rules:
- Body text never goes below 16px. Table text may use 14px.
- Line length for prose: 60 to 72 characters.
- Use sentence case for headings. Use uppercase only for `--text-meta` labels, with 0.08em letter spacing.
- Hindi text uses 1.1 times the line height of the Latin equivalent.

---

## 5. Space, grid, and shape

- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96. Use 96 only between major landmarks.
- **Grid:** 12 columns, 24px gutter on desktop, 16px on mobile. Max content width 1200px.
- **Radius:** 4px for inputs and chips, 10px for cards and tables, 999px for pills and buttons. Arch frames: `999px 999px 16px 16px`.
- **Borders:** 1px `--border-subtle` for containers. Never a thick accent border or a left-side colour bar.
- **Elevation:** none by default. Hover on interactive cards may use `0 1px 2px rgba(43,36,32,0.06)`. No other shadows.
- **Touch targets:** at least 44 by 44px.

---

## 6. Components

### 6.1 Buttons
- **Primary:** `--accent-fill` background, `--accent-on-fill` text, pill shape, 44px height, 600 weight. One per view.
- **Secondary:** transparent background, 1px `--border-control` border, `--text-primary` text.
- **Ghost:** text only in `--accent-text`, underline on hover.
- Hover: `--bg-hover` (secondary and ghost) or a darker accent (primary, use `--accent-hover`).
- Disabled: 50% opacity and `cursor: not-allowed`, plus `aria-disabled`.

### 6.2 Cards
- Surface `--bg-surface`, 1px `--border-subtle`, radius 10px, padding 24px.
- Card title in `--text-h3`, optional meta line in `--text-meta`.
- Arch variant (hero and empty states only): radius `999px 999px 16px 16px`, top padding 40px.

### 6.3 KPI tiles
- No background fill. A thin top dotted rule, then the value in `--text-kpi`, then the label in `--text-meta`.
- Show the source and date on the same tile, as `--text-meta`.
- Never place a KPI tile in a coloured box.

### 6.4 Tables (ranking and data)
- Header row: `--bg-subtle`, `--text-meta` uppercase labels, sticky on scroll.
- Rows: 48px height, 1px `--border-subtle` between rows, no zebra striping.
- Numbers right-aligned, `tabular-nums`. Text left-aligned.
- Rank column first, using Fraunces numerals.
- Row hover: `--bg-hover`. Selected row: `--accent-subtle` with a 3px left inset marker (this is a state marker, not a decorative stripe).
- Mobile: columns collapse to a card per row, with label and value pairs.

### 6.5 Status indicators (ranking)
A pill with an icon, a word, and a tint. Example: `◐ Undersupply pressure` in teal.

| Status | Icon | Label |
|---|---|---|
| Undersupply pressure | ▼ | Undersupply pressure |
| Oversupply risk | ▲ | Oversupply risk |
| Balanced | ● | Balanced |
| Trained high vs vacancies | ◆ | Trained high vs vacancies |
| Low vacancy base | ○ | Low vacancy base (not ranked) |
| Unranked | – | Unranked (missing data) |

Icons are inline SVG with `aria-hidden`. The word always carries the meaning.

### 6.6 Unavailable data (signature element)
When a value is not in the sources:
- Dashed 1px `--border-control` outline, arch top corners.
- Text: "Not published" or "Not in public sources", then one sentence on why.
- No icon of an error or warning. This is a fact, not a fault.

### 6.7 Charts
- Axes and labels: `--chart-label`, 13px, tabular numerals.
- Gridlines: 1px `--border-subtle`, horizontal only.
- Bars: 4px top radius, 40% of category width maximum.
- Lines: 2px, round caps, markers only on data points.
- Confidence bands: `--accent-subtle` at 70% opacity, labelled in the legend.
- Always provide a text alternative and the underlying table below or behind a toggle.

### 6.8 Forms and filters
- Inputs: 44px height, `--bg-surface` fill, 1px `--border-control`, radius 4px, label above, helper text below.
- Filter chips: pill, `--bg-subtle` when off, `--accent-subtle` with a check mark when on.
- Select menus use native `<select>` where possible for accessibility.

### 6.9 Navigation
- Top bar on `--bg-canvas` with a bottom dotted rule, not a filled bar.
- Wordmark: "KaushalIQ" in Fraunces 500 with a small arch glyph before it.
- Active item: text in `--text-primary` with a 2px underline in `--accent-fill`.
- Language switcher: a segmented control (English | हिन्दी | and other locales).

### 6.10 Alerts and toasts
- Inline alerts: `--bg-subtle` surface, icon, bold title, one-sentence body. No coloured full-width banners.
- Toasts: bottom-centre, `--bg-surface`, 1px border, auto-dismiss after 6s, never for errors that need action.

---

## 7. Page patterns

### 7.1 Indicators dashboard (`/indicators`)
1. **Header:** H1 "Training and vacancies, state by state". One sentence on what the ranking means and what it does not show.
2. **Sources line:** "PLFS 2025 · PMKVY releases · NCS vacancies (14 Jul 2025)" in `--text-meta`, with a link to the methodology.
3. **KPI row:** four tiles (unemployment 15+, LFPR 15+, NCS active vacancies, PMKVY certified FY 2025-26).
4. **Filter row:** indicator chips and a search field for state names.
5. **Ranking table:** the main content, with the chart as a secondary toggle.
6. **Capacity panel:** centres and NAPS establishments. Seats shown as an unavailable element.
7. **Workforce panel:** NCO-2015 division shares as horizontal bars, labelled "Employment, not postings".
8. **Checks and limitations:** collapsed by default, with the reconciliation status visible in the header.

### 7.2 Landing page
- Large Fraunces headline, two sentences of plain-language description, one primary and one ghost button.
- Hero: a single arch frame containing a simple line illustration of a village skill centre and a city (monoline, `--accent-text` on `--bg-surface`). No stock photos.
- No feature grid of icons in coloured tiles. Use three short text blocks with dotted dividers.

### 7.3 Empty and error states
- Arch frame, one line of plain text, one suggested next step.
- Example: "No states match this filter. Clear the filter to see all 36."

---

## 8. Imagery and illustration
- Monoline illustrations only, 2px strokes in `--text-secondary` with optional single-colour fills in `--accent-subtle`.
- Real photographs of training centres allowed only with permission and a credit line. Use a sepia-leaning grade and an arch crop.
- No photos of identifiable people without consent.

---

## 9. Motion
- Duration: 180ms for hover and focus, 220ms for overlays, 120ms for micro-feedback.
- Easing: `cubic-bezier(0.2, 0, 0, 1)`.
- Allowed: fade and 4px slide for panels, bar-chart growth on first render.
- Forbidden: bouncing, parallax, looping animation, scroll-jacking.
- Respect `prefers-reduced-motion`: disable all non-essential motion.

---

## 10. Accessibility (WCAG 2.1 AA)
- Text contrast at least 4.5:1, large text at least 3:1, non-text UI at least 3:1.
- Focus visible on every interactive element, using `--focus-ring`.
- Keyboard: every control reachable, logical tab order, no keyboard traps.
- Status is never colour-only. Every chart has a table alternative.
- Hindi and English both pass a screen-reader check. Set `lang` on each block of text when mixing scripts.
- Minimum body size 16px, zoom to 200% without loss of content.

---

## 11. Localisation
- English and Hindi first, then regional languages as they are added.
- Numbers: Indian grouping (1,00,000) in Hindi and English locales. Use `Intl.NumberFormat('en-IN')`.
- Allow 30% text expansion. Test the longest translation in every button and table header.
- Right-to-left is not required at this stage.

---

## 12. What must change from the current app

The current app is dark-first, uses a gold accent, an Inter-only type system, and a teal and violet chart palette. Replace the following.

| Current | New |
|---|---|
| Dark canvas `#191C19` as default | Light linen `#FAF6EE` as default; warm dark theme optional |
| Gold accent `#E4B76B` on dark | Terracotta `#B5562E` on light |
| Inter for everything | Fraunces for display, Inter for UI and body |
| Teal and violet series as default | Terracotta, teal, ochre, sage, plum series |
| Filled coloured status boxes | Pill with icon and word, tinted |
| Gradients and glow in hero areas (where present) | Flat surfaces and the arch motif |
| Tall dark shadows | No shadows, hairline borders |

Migration steps:
1. Update `tokens.css`: change values, keep token names where possible.
2. Add `@fontsource-variable/fraunces` and `@fontsource/noto-sans-devanagari`. Remove any CDN font loads.
3. Replace hard-coded hex values in component CSS with tokens. Search with `grep -rn "#[0-9A-Fa-f]\{6\}" src`.
4. Rebuild the status pills and chart palette.
5. Check contrast on every changed pair.

---

## 13. Do and do not

**Do**
- Use one arch or dotted-rule motif per card or section.
- Leave whitespace around the ranking table.
- Show the source and date next to every number.
- Write labels in full sentences that a planner can read aloud.

**Do not**
- Use more than one accent colour in a view.
- Put numbers inside coloured boxes or on gradients.
- Use shadows, glass, neon, or dark-mode-only effects.
- Add decorative icons next to every heading.
- Use Fraunces for small text or table content.
- Fill a missing value with zero, a dash, or an estimate without a label.

---

## 14. Review checklist
- [ ] Light theme is the default, and dark theme (if shipped) passes contrast.
- [ ] Only terracotta is used as the action colour.
- [ ] Every status has text and an icon, not only colour.
- [ ] Missing data uses the dashed "Not published" element.
- [ ] Fraunces appears only on display text.
- [ ] Body text is 16px or larger.
- [ ] Hindi renders with Noto Sans Devanagari at the right line height.
- [ ] Focus ring is visible on all controls.
- [ ] Reduced-motion setting removes non-essential animation.
- [ ] No CDN font or script loads, in line with the CSP.
- [ ] Each page uses at most two motifs.

---

## 15. Token reference (drop into `tokens.css`)

```css
:root {
  --bg-canvas: #FAF6EE;
  --bg-surface: #FFFDF8;
  --bg-subtle: #F3ECDF;
  --bg-hover: #EDE4D3;
  --text-primary: #2B2420;
  --text-secondary: #6B5E55;
  --text-meta: #72655C;
  --border-subtle: #E4D9C8;
  --border-control: #8A7C70;
  --accent-fill: #B5562E;
  --accent-hover: #9E4A26;
  --accent-on-fill: #FFFFFF;
  --accent-text: #9E4A26;
  --accent-subtle: #F6E3D8;
  --focus-ring: #2F6F6A;

  --chart-series-1: #B5562E;
  --chart-series-2: #2F6F6A;
  --chart-series-3: #C8922E;
  --chart-series-4: #6F8F72;
  --chart-series-5: #7A4E6B;

  --font-display: "Fraunces Variable", Georgia, serif;
  --font-family: "Inter Variable", "Segoe UI", system-ui, sans-serif;
  --font-indic: "Noto Sans Devanagari", "Inter Variable", sans-serif;

  --radius-sm: 4px;
  --radius-md: 10px;
  --radius-pill: 999px;
  --radius-arch: 999px 999px 16px 16px;

  --motion-fast: 120ms;
  --motion-base: 180ms;
  --motion-overlay: 220ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}

:root[data-theme="dark"] {
  --bg-canvas: #1E1A16;
  --bg-surface: #27221D;
  --bg-subtle: #312A23;
  --bg-hover: #3A3229;
  --text-primary: #F3ECDF;
  --text-secondary: #C9BBA9;
  --text-meta: #B3A593;
  --border-subtle: #3F372F;
  --border-control: #7E7065;
  --accent-fill: #E08A5E;
  --accent-hover: #EA9E78;
  --accent-on-fill: #1E1A16;
  --accent-text: #E9A482;
  --accent-subtle: #3D2C22;
}

@media (prefers-reduced-motion: reduce) {
  :root { --motion-fast: 0ms; --motion-base: 0ms; --motion-overlay: 0ms; }
}
```

Note: the dark theme block is written as an explicit override. If the app follows the system setting, duplicate the variables inside `@media (prefers-color-scheme: dark)` as well, guarded by `:root:not([data-theme="light"])`.

---

## 16. Changelog
- **1.0:** First version. Light-first minimal and bohemian system, replacing the dark gold design.
