import { existsSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Read by StatusBar for "last deploy …"
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    // Read by AtAGlance: show "Download CV" only when public/cv.pdf exists (restart dev after adding it)
    __HAS_CV__: JSON.stringify(existsSync(new URL('./public/cv.pdf', import.meta.url))),
  },
})
