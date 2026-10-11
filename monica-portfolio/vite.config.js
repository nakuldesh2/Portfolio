import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes every asset path relative, so the built site works under
// any GitHub Pages URL (username.github.io/<any-repo-name>/) without edits.
export default defineConfig({
  plugins: [react()],
  base: './',
})
