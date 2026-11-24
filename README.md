# Lochana Thilakarathne — portfolio

A personal portfolio modelled as a small system architecture:
Visitor → Gateway → Services (About, Projects, Experience, Contact) → Data stores.
Clicking a service on the landing map "deploys" its page.

## Status

- Landing system map, routing and all pages (About, Projects, project case
  study, Experience, Contact) are in place.
- Home, header, About, Projects and Contact copy is final; a few details are
  still placeholder text in `[square brackets]` (search the data files).
- `/accessibility` was removed and now redirects to the home page.
- The contact form sends through Web3Forms once `VITE_WEB3FORMS_KEY` is set.
- SPA rewrites are configured for Vercel (`vercel.json`) and Netlify
  (`public/_redirects`).
- `typescript` is aliased to `@typescript/typescript6` so typescript-eslint
  can run; `tsc` itself is TypeScript 7 via `@typescript/native`.

## Structure

- `src/data/` — content config. `system.ts` defines the map's services and
  data stores (add a node by adding one object), `projects.ts` the project
  case studies, `experience.ts` roles and education as releases.
- `src/components/` — `Shell` (top bar and layout), `SystemMap` (the
  landing SVG map with a mobile list fallback), `ProjectCard` (projects
  list), the case-study parts `StatusHeader`, `QuickFacts`, `ScreensGallery`
  (with lightbox), `ProjectNav` and `ProjectDiagram`, `ReleaseEntry` (Experience
  timeline), and `StatusBar` /
  `DeployStrip`.
- `src/hooks/` — `usePageTitle` (per-route document title and focus).
- `src/pages/` — one component per route: `Home`, `About`, `Projects`,
  `CaseStudy` (`/projects/:slug`), `Experience`, `Contact`.

## Editing content

Page copy lives in plain TypeScript files, so most edits never touch a
component. Typed fields mean a misspelled key or a link to a route that
doesn't exist fails `npm run build`.

| Content | File |
|---|---|
| Name, home headline, the whole About page (intro, bio, skills, links) | `src/data/profile.ts` (field guide at the top of the file) |
| Experience "at a glance" panel (location, domain, stack) | `src/data/profile.ts` (`glance`); role, company and shipped count come from `src/data/experience.ts` |
| Downloadable CV | `public/cv.pdf`: the "Download CV" button appears only when this file exists at build time |
| Header status line ("open to opportunities") and its on/off switch | `src/data/availability.ts` |
| Services and data stores on the landing map | `src/data/system.ts` |
| Projects list and project case studies | `src/data/projects.ts` |
| Experience page (work with project changelogs, and education, as a release timeline) | `src/data/experience.ts` |
| Search and social preview text (meta description, `og:*`) | `index.html` — keep in sync with the home headline |
| Contact page copy, response messages and endpoint links (GitHub, LinkedIn, email) | `src/data/contact.ts` |
| Colours for the dark and light themes | `src/styles.css`: the `:root` tokens (dark) and `:root[data-theme='light']`. The theme follows the system setting until a visitor uses the header toggle; logic in `src/theme.ts`, mirrored by the inline script in `index.html` |

The contact form sends through [Web3Forms](https://web3forms.com); see
[Environment variables](#environment-variables) for its key.

Pushing to `main` redeploys the site on Vercel. Run `npm run lint` and
`npm run build` first; a build error there will also fail the deploy.

## Environment variables

| Variable | Used for |
|---|---|
| `VITE_WEB3FORMS_KEY` | Web3Forms access key for the contact form |

1. Create `.env` in the project root (next to `package.json`, not in `src/`)
   from the template: `cp .env.example .env`, then fill in the value. `.env` is
   git-ignored; only `.env.example` is committed.
2. Restart `npm run dev` after any change to `.env`. Vite reads it only at
   startup.
3. Before deploying, add `VITE_WEB3FORMS_KEY` in the hosting provider's
   environment settings (Vercel: Project Settings → Environment Variables) and
   redeploy, because the value is built into the site.

Without a key (or with the `PASTE_KEY_HERE` placeholder) the form sends nothing,
shows its 500 state, and in development logs a warning in the browser console.

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
