# Lochana Thilakarathne — portfolio

A personal portfolio modelled as a small system architecture:
Visitor → Gateway → Services (About, Projects, Experience, Contact) → Data stores.
Clicking a service on the landing map "deploys" its page.

## Status

- Landing system map, routing and all pages (About, Projects, project case
  study, Experience, Contact) are in place.
- All copy apart from the current role and degree is placeholder text in
  `[square brackets]`.
- The contact form is a demo: it shows a mock response and sends nothing.
- SPA rewrites are configured for Vercel (`vercel.json`) and Netlify
  (`public/_redirects`).
- `typescript` is aliased to `@typescript/typescript6` so typescript-eslint
  can run; `tsc` itself is TypeScript 7 via `@typescript/native`.

## Structure

- `src/data/` — content config. `system.ts` defines the map's services and
  data stores (add a node by adding one object), `projects.ts` the project
  case studies, `experience.ts` roles and education as releases.
- `src/components/` — `Shell` (top bar and layout), `SystemMap` (the
  landing SVG map with a mobile list fallback) and `BuildLog` (the deploy
  intro on project pages).
- `src/hooks/` — `usePageTitle` (per-route document title and focus).
- `src/pages/` — one component per route: `Home`, `About`, `Projects`,
  `Project` (`/projects/:slug`), `Experience`, `Contact`, `Accessibility`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
