# Portfolio Development Notes

## 🎯 Project Overview

This is an **AI-powered portfolio** showcasing distributed systems expertise through:
- Interactive React UI with Tailwind CSS
- RAG-based AI chatbot powered by Groq LLM
- Knowledge base extracted from resume + markdown
- GitHub Pages deployment with CI/CD

**Interview Hook**: "I built an AI-powered portfolio using React + Vite + Groq LLM with RAG to showcase my distributed systems and AI/ML expertise."

---

## 🏗 Architecture Decisions

### Frontend: React 18 + Vite
- **React 18**: Modern hooks, component composition, fast refresh
- **Vite**: 10x faster builds than webpack, instant dev server
- **Why Not Next.js?**: Overkill for static portfolio, adds complexity

### Styling: Tailwind CSS
- **Utility-first**: Fast to iterate, consistent design system
- **Dark mode**: Built-in, matches professional theme
- **No CSS files**: Keep styles inline and maintainable
- **Why Not Bootstrap?**: Too heavy, less customizable

### AI: Groq LLM + RAG
- **RAG**: Retrieval-Augmented Generation (knowledge base retrieval)
- **No fine-tuning**: Keep answers grounded in real data
- **Groq**: Free tier, ultra-fast inference, no credits
- **Why Not OpenAI?**: Groq free tier is better for demo

### Hosting: GitHub Pages
- **Cost**: Completely free
- **CI/CD**: GitHub Actions auto-deploys on push
- **Custom Domain**: Easy to configure
- **Why Not Vercel?**: GitHub Pages is simpler for static sites

### Knowledge Base: JSON (not database)
- **Simplicity**: Works on static GitHub Pages, no backend
- **Transparency**: Hiring managers can see sources
- **Version Control**: Changes tracked in git
- **Why Not VectorDB?**: Overcomplicated for this scale

---

## 📊 Data Architecture

### Knowledge Base (`src/data/knowledgeBase.js`)
Contains Nakul's complete experience:
- Professional summary & experience
- Technical skills by category
- 10 major projects with full details
- Key achievements and metrics
- Behavioral skills and principles

**Size**: ~2250 lines of structured data

**RAG Strategy**:
1. User asks question
2. Search KB for relevant content (6 categories)
3. Return top 3 matches by similarity score
4. Send context + question to Groq
5. Generate grounded answer

### Projects Data (`src/data/projects.js`)
For the Projects showcase section:
- 10 projects with metadata
- Each has: title, company, badge, description
- Highlights, technologies, learnings
- Challenge + impact statement

### Resume Data (`src/data/resume.js`)
For the Resume section:
- Skills organized by category
- Work experience timeline
- Key metrics (9B records, 2,500 tenants, etc.)
- Core engineering principles

---

## 🔧 Service Architecture

### RAG Service (`src/services/ragService.js`)
```javascript
retrieveContext(query)           // Search knowledge base
buildPromptContext(query)        // Build prompt with context
getSystemPrompt()                // System instructions for LLM
```

**Similarity Matching**:
- Split query and KB text into words
- Count common words
- Calculate relevance score
- Production would use vector embeddings

### Groq Service (`src/services/groqService.js`)
```javascript
isGroqConfigured()               // Check API key available
callGroqAPI(query, onChunk)      // Stream response from LLM
getFallbackResponse(query)       // Fallback when API unavailable
```

**Streaming Pattern**:
```
Fetch with stream: true
  ↓
Read response chunks
  ↓
Parse SSE (Server-Sent Events)
  ↓
Extract message content
  ↓
Call onChunk callback
  ↓
UI updates in real-time
```

---

## 🧠 React Components

### Navbar (`src/components/Navbar.jsx`)
- Sticky navigation with logo
- Chat toggle button
- Mobile responsive

### Hero (`src/components/Hero.jsx`)
- Welcome section with gradient text
- Key stats (10+ projects, billions of records)
- CTA buttons

### Resume (`src/components/Resume.jsx`)
- Maps through resume.skills data
- Shows work experience timeline
- Displays impact metrics with gradients
- Lists engineering principles

### Projects (`src/components/Projects.jsx`)
- Grid of project cards
- Interactive modal on click
- Shows challenge + learning outcomes
- Technology badges

### Chat (`src/components/Chat.jsx`)
- Real-time streaming message display
- Input with Enter support
- Loading animations
- Graceful fallback mode

---

## 🚀 Deployment

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)
1. Trigger: Push to main branch
2. Setup: Node 18 + npm cache
3. Install: `npm ci` (clean install)
4. Build: `npm run build` → `dist/`
5. Deploy: Push to `gh-pages` branch

**Live URL**: `github.com/nakuldesh2/portfolio`

### Environment Variables
- **Development**: `.env.local` (not committed)
- **CI/CD**: Secrets in GitHub settings
- **Production**: GitHub Pages (no env vars needed, API key in browser)

---

## 📈 Phases Completed

✅ **Phase 1**: React + Vite + Tailwind foundation  
✅ **Phase 2**: Knowledge base + data structures  
✅ **Phase 3**: React components displaying data  
✅ **Phase 4**: RAG + Groq LLM integration  
✅ **Phase 5**: Documentation + GitHub Pages deployment  

---

## 🎓 Key Learning Points

### React Patterns
- Functional components with hooks
- useState for message state
- useRef for auto-scroll
- useEffect for side effects
- map() for dynamic rendering
- Conditional rendering with ternary

### AI/LLM Integration
- RAG pattern (retrieval + generation)
- API calls with fetch()
- Streaming responses (SSE)
- Prompt engineering
- Fallback strategies
- Error handling

### Production Patterns
- Separation of concerns (data/UI/services)
- Environment variables for secrets
- Graceful degradation
- Performance optimization
- Responsive design
- Accessibility

---

## 🔐 Security Considerations

**API Key Security**:
- Groq API key in browser (safe, has rate limits)
- `.env.local` never committed to git
- `.env.example` shows template
- `.gitignore` prevents accidents

**XSS Protection**:
- React auto-escapes text content
- No dangerouslySetInnerHTML used
- Tailwind prevents style injection

**Data Privacy**:
- Knowledge base is public information
- No sensitive data in portfolio
- Chat conversations not logged

---

## 📝 Development Workflow

```bash
# Setup
npm install

# Development
npm run dev
# Open http://localhost:5173
# Edit files, hot reload works instantly

# Testing
# Manual testing in browser
# Test chatbot with/without API key

# Build
npm run build
# Creates optimized dist/

# Deploy
git push origin main
# GitHub Actions auto-deploys to gh-pages

# Preview production build
npm run preview
```

---

## 🎯 Interview Talking Points

**"I built an AI-powered portfolio demonstrating:"**

1. **Full-Stack Development**
   - React frontend with Tailwind CSS
   - Responsive design, dark theme
   - Component composition and state management

2. **AI/LLM Integration**
   - Groq API for ultra-fast inference
   - RAG pattern for grounded answers
   - Streaming for real-time UX

3. **Production Engineering**
   - Vite for optimized builds
   - GitHub Pages deployment
   - Environment configuration
   - Graceful fallback modes

4. **System Design**
   - Separation of concerns (data/UI/services)
   - Service layer architecture
   - Error handling and retry logic
   - Performance considerations

---

## 📚 Resources Used

- [React Docs](https://react.dev/)
- [Vite Guide](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Groq API](https://console.groq.com/docs/)
- [RAG Pattern](https://www.anthropic.com/research/rag)

---

## 🚀 Next Iterations

**Could be added:**
- Analytics tracking (Google Analytics)
- Dark/Light theme toggle
- Multiple language support
- Email integration
- CMS for content updates
- Vector embeddings for better RAG
- Custom Groq prompt templates

**Keep it simple for now** - focus on demonstrating current skills!
