# Portfolio Development Notes

## Architecture Decisions

### Why React + Vite?
- **Vite**: Ultra-fast builds (~10x faster than webpack), perfect for development experience
- **React 18**: Modern hooks API, fast refresh for hot reloading, component composition

### Why Tailwind CSS?
- Utility-first CSS framework
- Built-in dark mode support (matches our dark theme requirement)
- Professional, consistent design system
- No need for separate component library

### Why Groq API for LLM?
- Free tier: 12,500 tokens/day (sufficient for demo)
- No credit card required
- Extremely fast inference (best-in-class speed)
- Perfect for production-like performance demonstration

### Why GitHub Pages?
- Free static hosting
- Automatic CI/CD with GitHub Actions
- No backend infrastructure needed
- Custom domain support

### RAG Strategy (Retrieval-Augmented Generation)
Instead of fine-tuning the LLM, we:
1. Store Nakul's experience in JSON knowledge base
2. When user asks a question, search the knowledge base
3. Send relevant context + question to Groq
4. Generate grounded, accurate answer

**Benefits:**
- No hallucinations (answers grounded in real data)
- Easy to update (just edit JSON)
- Transparent (hiring managers see the sources)
- Educational (demonstrates RAG pattern)

## Environment Setup

```bash
npm install
npm run dev          # Local development
npm run build        # Production build
npm run deploy       # Deploy to GitHub Pages
```

## Phase 1 Completed ✅
- [x] Initialize React + Vite project
- [x] Setup Tailwind CSS + dark theme
- [x] Create basic component structure
- [x] Setup GitHub Pages config

## Next Steps
1. Phase 2: Create knowledge base from resume + markdown
2. Phase 3: Build Resume/Projects sections with data
3. Phase 4: Integrate Groq API
4. Phase 5: Add interactive demos
5. Phase 6: GitHub Pages deployment

## Important Files
- `vite.config.js`: Build configuration
- `tailwind.config.js`: Dark theme colors
- `src/App.jsx`: Main app orchestration
- `src/components/*`: Reusable UI components
