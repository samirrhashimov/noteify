import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/legacy_backup/**']
    }
  },
  build: {
    rollupOptions: {
      external: [
        '**/legacy_backup/**'
      ]
    }
  }
})
