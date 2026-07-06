# Shopfront Admin

A modern, responsive Ecommerce Admin Dashboard frontend built with **React 19, TypeScript, Vite, Tailwind CSS v4, and shadcn/ui**-style components. Uses mock data for now — designed to be wired up to a Spring Boot REST API later with minimal changes.

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

```bash
npm run build   # production build to dist/
npm run preview # preview the production build locally
```

## Tech stack

- **React 19 + TypeScript** — functional components and hooks throughout
- **Vite** — dev server and build tooling
- **Tailwind CSS v4** — CSS-first theme config in `src/index.css` (`@theme` block)
- **shadcn/ui-style primitives** — Radix UI under the hood, owned in `src/components/ui`
- **React Router v7** — client-side routing
- **Recharts** — the dashboard sales chart
- **Sonner** — toast notifications
- **lucide-react** — icons

## Project structure

```
src/
  components/
    ui/            Reusable primitives (Button, Input, Dialog, Table, ...)
    layout/        Sidebar, Navbar, nav config
    dashboard/     Stat cards, sales chart, recent products table
    products/      Product table, filters, add/edit form, view dialog
    categories/    Category grid, add/edit form
    common/        Shared bits: EmptyState, StatusBadge, DeleteConfirmDialog
  pages/           One file per route (Dashboard, Products, Categories, Settings)
  layouts/         AdminLayout (sidebar + navbar shell)
  hooks/           use-products, use-categories, use-debounce, use-media-query
  services/        productService / categoryService — swap these for real API calls
  types/           Shared TypeScript types
  data/            Mock JSON-like seed data
  utils/           cn() class helper, formatters
```

## Connecting to a real backend later

All reads/writes go through `src/services/productService.ts` and
`src/services/categoryService.ts`. Each exported function currently reads
from and mutates an in-memory array with a simulated network delay. To
connect a Spring Boot backend:

1. Replace the body of each function with a `fetch()` call to your REST
   endpoints (e.g. `GET /api/products`, `POST /api/products`,
   `PUT /api/products/:id`, `DELETE /api/products/:id`).
2. Keep the same function signatures — every hook and page already depends
   on the exported types, not the implementation.
3. Remove the mock seed imports from `src/data/`.

## Notes

- All product/category data lives in memory for the session (see the
  services above) — refreshing the page resets it back to the seed data,
  since there's no backend yet.
- Product images use placeholder URLs from `picsum.photos`.
