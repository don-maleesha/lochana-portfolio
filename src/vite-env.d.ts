/// <reference types="vite/client" />

/** Variables from .env in the project root (template: .env.example). Restart `npm run dev` after editing. */
interface ImportMetaEnv {
  /** Web3Forms access key for the contact form */
  readonly VITE_WEB3FORMS_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
