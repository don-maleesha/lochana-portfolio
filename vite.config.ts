import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Read by StatusBar for "last deploy …"
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
})
