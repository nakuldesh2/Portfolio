import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This config tells Vite how to build our React app
// - react(): Uses Fast Refresh for hot module reloading
// - base: '/Portfolio/' matches GitHub repository name (case-sensitive for asset paths)
export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
})
