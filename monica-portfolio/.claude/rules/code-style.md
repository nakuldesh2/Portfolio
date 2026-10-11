# Code style

- React 18 function components + hooks; one component per file in `src/components/`.
- Tailwind utility classes only; shared patterns live as `@layer components` classes in `src/index.css` (`card`, `chip`, `btn-primary`, `btn-ghost`, `sim-btn`, `section`).
- Theme colors come from `tailwind.config.js` (`ink-*` backgrounds, `accent*` highlights). Don't hardcode new hex colors in components; simulation kind colors live in `src/lib/simulation.js`.
- Content lives in `src/data/`, never hardcoded in components.
- Files imported by Node scripts (`src/data/*`, `src/ai/knowledge.js`, `src/ai/retriever.js`, `src/lib/*`) must stay plain ESM JS: no JSX, no `import.meta.env`, no asset imports.
- Comments explain *why*, and help Monica learn: a short note on the concept is welcome in the AI and simulation code.
- Respect `prefers-reduced-motion`.
