/** ISO timestamp of the build, injected by Vite `define` in vite.config.ts. */
declare const __BUILD_TIME__: string

/** true when public/cv.pdf exists at build time (vite.config.ts). */
declare const __HAS_CV__: boolean

interface ImportMetaEnv {
  /** Web3Forms access key for the contact form (see .env.example) */
  readonly VITE_WEB3FORMS_KEY?: string
}
