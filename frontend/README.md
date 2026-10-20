# Shramik Vikas Frontend — Glass & Coral Design System

Official Labour Market Intelligence Web Application for India's Skilling Ecosystem. Built with React 19, Vite, and Material UI (MUI).

---

## 🎨 Visual System & Design Tokens

- **Light Theme**:
  - Background gradient: `#EEF0F3` to `#E4E7EC` with radial glow of `rgba(201, 55, 42, 0.18)` behind the hero.
  - Frosted glass cards: `rgba(255, 255, 255, 0.72)`, backdrop blur `18px`, `1px` light border, `20px` radius, soft shadow.
  - Primary Accent: Coral Red `#C9372A` (contrast ratio > 5.8:1 against white), hover `#A92B20`.
  - Secondary Accent: `#111827`.
- **Dark Theme**:
  - Background: `#111113` with glow `rgba(255, 107, 87, 0.16)`.
  - Glass surface: `rgba(28, 28, 32, 0.72)`, border `rgba(255, 255, 255, 0.08)`.
  - Primary Accent: `#FF6B57`.
- **Status Colors (with paired icon and word)**:
  - Undersupply: `#0F766E` (TrendingDown icon)
  - Oversupply: `#B45309` (TrendingUp icon)
  - Balanced: `#15803D` (CheckCircle icon)
  - Low base: `#64748B` (RemoveCircleOutline icon)
  - Unavailable / Missing: Dashed outline with "Not published" and one-line reason.
- **Chart Series Palette** (max 5):
  `#C9372A`, `#0F766E`, `#F59E0B`, `#7C3AED`, `#64748B`. Remainder grouped as "Other".

---

## 🔤 Self-Hosted Typography

No external CDNs or Google Fonts are used; fonts are self-hosted via `@fontsource` to comply with strict Content Security Policies (CSP):
- **English / Latin**: Poppins (`@fontsource/poppins`, weights 400, 500, 600, 700).
  - Display headline: 56–64px, weight 600, line-height 1.1, letter-spacing -0.02em.
  - KPI numbers: 32–40px, weight 600, tabular figures.
- **Hindi (hi-IN)**: Noto Sans Devanagari (`@fontsource/noto-sans-devanagari`, weights 400, 600, 700).
  - Headings: line-height 1.3, weight 600/700, normal letter spacing.
  - Body: line-height 1.75–1.8. Never uses italics; matras do not collide.
- **Number Formatting**: Indian numbering format (`1,00,000`) applied via `Intl.NumberFormat('en-IN')` in both locales.

---

## 📦 MUI X Community Licence Notice

This application exclusively uses the **free, open-source Community Edition** of MUI X components:
- `@mui/x-data-grid` (Community Edition only)
- `@mui/x-charts` (Community Edition only)

No commercial Pro or Premium license keys or features are required or imported.

---

## 🛠 Setup & Scripts

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
cd frontend
npm install --legacy-peer-deps
```

### Available Scripts
```bash
# Start local development server
npm run dev

# Compile production bundle
npm run build

# Preview production build locally
npm run preview

# Run Oxlint linter
npm run lint

# Run Playwright end-to-end verification
npm run test:glass-coral
```

---

## 🧭 How to Add a New Page

1. **Create the Page Component**:
   Create `src/pages/workspace/NewFeaturePage.jsx`:
   ```jsx
   import React from 'react';
   import Box from '@mui/material/Box';
   import Typography from '@mui/material/Typography';
   import Card from '@mui/material/Card';
   import { tokens } from '../../theme';

   export function NewFeaturePage() {
     return (
       <Card sx={{ p: 4, borderRadius: tokens.radius.card }}>
         <Typography variant="h2">New Intelligence Feature</Typography>
       </Card>
     );
   }
   ```

2. **Add Navigation Metadata**:
   In `src/app/config/navigation.js`, register the route:
   ```javascript
   { path: "/new-feature", label: t("common.newFeature"), title: t("newFeature.title"), description: t("newFeature.description"), icon: NewIcon, availability: "sample" }
   ```

3. **Register Route in AppRoutes**:
   In `src/app/routes/AppRoutes.jsx`, add lazy import and Route inside `<Route element={<AppShell />}>`:
   ```jsx
   const NewFeaturePage = lazy(() => import('../../pages/workspace/NewFeaturePage').then(m => ({ default: m.NewFeaturePage })));
   // Inside AppShell children:
   <Route path="/new-feature" element={<Suspense fallback={<LoadingFallback />}><NewFeaturePage /></Suspense>} />
   ```

4. **Add Translations**:
   In `src/app/i18n/locales/en-IN.js` and `hi-IN.js`, add `common.newFeature`, `newFeature.title`, and `newFeature.description`.

5. **Ensure Data Rules**:
   - Provide source and publication date on all figures.
   - Use `StatusBadge` (with paired icon and word) for any status indication.
   - Missing data shows "Not published" with a reason.
