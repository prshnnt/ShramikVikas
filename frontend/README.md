# Shramik Vikas Frontend

Phase 1 provides application shell and design system only; labour‑market analytics not included.

## Development

```bash
npm ci
npm run dev
```

Open printed Vite URL. Requires Node 20+ (Vite) – tested with Node 26.

### Backend (optional check connection)

Run backend in separate terminal:

```bash
python -m uvicorn src.main:app --host 127.0.0.1 --port 8000
```

Backend uses Python 3.13+; create a virtual env and install pinned requirements.

Vite proxies `/api` → `http://127.0.0.1:8000`. Override with `API_PROXY_TARGET` or `VITE_API_BASE_URL` (no secrets).

## CI Checks

```bash
npm run build
npm run lint
npm run check:browser
```

`check:browser` runs Playwright tests (requires Playwright installed). Results stored in `docs/phase-1/verification/`.

## Project Structure

- `src/app/` – entry point, router, shared navigation metadata
- `src/pages/` – route pages, minimal content
- `src/components/layout/` – shell, header, sidebar
- `src/components/navigation/` – links, command palette
- `src/components/ui/` – panels, buttons, dialogs, loading/error states
- `src/components/dashboard/` – KPI display
- `src/components/charts/` – `ChartCard` container
- `src/features/overview/` – demo fixtures, service‑health panel
- `src/hooks/`, `src/services/` – cancellable health requests, fetch boundary with runtime validation
- `src/types/` – metric, evidence‑kind, page contracts
- `src/styles/` – design tokens, typography, component styles

Routing uses React Router. Font: self‑hosted Inter variable WOFF2 with `font-display: swap`. Recharts installed but not imported until data available.

## Product Scope

Available routes: `/`, `/skills`, `/regions`, `/occupations`, `/industries`, `/forecast`.

Only overview shows static demo data; other pages are placeholders. No real data source; search limited to known page names.

## Future Work (Phase 2)

Add real India‑focused dataset, validation, API, and typed Recharts view.

## References

- [React Router](https://reactrouter.com/start/declarative/installation)
- [Fontsource Inter](https://fontsource.org/fonts/inter)
