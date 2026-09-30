import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This config tells Vite how to build our React app
// - react(): Uses Fast Refresh for hot module reloading
// - base: '/portfolio/' for GitHub Pages subdirectory deployment
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
