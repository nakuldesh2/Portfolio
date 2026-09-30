# 🚀 Nakul's AI-Powered Portfolio

An intelligent portfolio website built with React, Vite, and Groq LLM showcasing distributed systems architecture, AI/ML, and production engineering expertise.

**Live Demo:** *Will be deployed to GitHub Pages*

---

## ✨ Features

### 🎨 Professional Portfolio
- **Dark theme** with smooth animations
- **Responsive design** for all devices
- **Interactive project showcase** with detailed modals
- **Skills & experience** dynamically displayed
- **Impact metrics** highlighting major achievements

### 🤖 AI-Powered Chatbot
- **RAG (Retrieval-Augmented Generation)** powered by Groq LLM
- **Real-time streaming** responses
- **Context-aware** answers grounded in real experience
- **Fallback mode** when API not configured
- **Zero hallucinations** through retrieval approach

### 📊 Technical Demonstration
- Shows understanding of **distributed systems** architecture
- Demonstrates **AI/ML integration** patterns
- Exhibits **production engineering** best practices
- Displays **full-stack** development capabilities
- Proves **DevOps** and **deployment** knowledge

---

## 🛠 Technology Stack

| Layer | Technology | Why? |
|-------|-----------|------|
| **Frontend** | React 18 + Vite | Modern, fast, component-based |
| **Styling** | Tailwind CSS | Professional, consistent, dark mode |
| **LLM** | Groq API | Free tier, ultra-fast, no credits |
| **Knowledge** | JSON + RAG | Simple, transparent, updatable |
| **Hosting** | GitHub Pages | Free, auto-deployed, custom domain |
| **Build** | Vite | 10x faster than webpack |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Navigate to project
cd portfolio

# Install dependencies
npm install
```

### 2. Setup Groq API (Optional)

1. Get free API key: https://console.groq.com
2. Copy `.env.example` to `.env.local`
3. Paste your API key in `.env.local`

```bash
VITE_GROQ_API_KEY=your_key_here
```

### 3. Run Locally

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

### 4. Build for Production

```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview
```

---

## 🧠 How RAG Works

**RAG = Retrieval-Augmented Generation**

When you ask the AI chatbot a question:

```
1. User asks: "Tell me about SmartScanner"
           ↓
2. RAG searches knowledge base for relevant content
   - Projects: matches SmartScanner, scanner selection, ML
   - Skills: matches AI, ML, Python
   - Experience: matches Amazon, optimization
           ↓
3. Retrieve: Top 3 most relevant results
   - SmartScanner project details
   - ML skills and techniques
   - Amazon experience context
           ↓
4. Prompt Groq: "Using this context: [retrieved info]
                 Answer: Tell me about SmartScanner"
           ↓
5. Groq responds: Grounded, accurate answer based on real data
           ↓
6. Display: Stream response character-by-character for UX
```

**Why RAG?**
- ✅ **Accurate**: Answers grounded in real experience
- ✅ **Safe**: No hallucinations or made-up projects
- ✅ **Transparent**: Sources clearly visible
- ✅ **Educational**: Demonstrates production AI patterns
- ✅ **Maintainable**: Update by editing JSON

---

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx        # Welcome section
│   │   ├── Resume.jsx      # Skills & experience
│   │   ├── Projects.jsx    # Project showcase
│   │   ├── Chat.jsx        # AI chatbot
│   │   └── ...
│   ├── data/               # Knowledge base
│   │   ├── knowledgeBase.js # RAG context data
│   │   ├── projects.js     # Project metadata
│   │   └── resume.js       # Skills & experience
│   ├── services/           # AI services
│   │   ├── ragService.js   # Retrieval logic
│   │   └── groqService.js  # LLM API calls
│   └── App.jsx             # Main app
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── .env.example            # Env template
└── package.json            # Dependencies
```

---

## 🎓 Learning Outcomes

By building this project, you'll learn:

### React Patterns
- ✅ Functional components with hooks
- ✅ useState, useEffect for state management
- ✅ Component composition and reusability
- ✅ Conditional rendering
- ✅ List rendering with map()
- ✅ Event handling and callbacks
- ✅ Async/await patterns

### AI/LLM Integration
- ✅ RAG (Retrieval-Augmented Generation) pattern
- ✅ Calling external LLM APIs
- ✅ Streaming responses for better UX
- ✅ Embedding context in prompts
- ✅ Error handling and fallbacks
- ✅ API key management with env vars

### Production Engineering
- ✅ Build optimization (Vite)
- ✅ Responsive design (Tailwind + mobile-first)
- ✅ Performance considerations (streaming)
- ✅ Graceful degradation (fallback mode)
- ✅ Environment configuration
- ✅ Static site deployment

### Architecture
- ✅ Separation of concerns (data vs UI)
- ✅ Service layer pattern
- ✅ Reusable data structures
- ✅ Scalable component design

---

## 🔑 Key Concepts Explained

### Why Vite?
Vite is ~10x faster than webpack because:
- **esbuild**: Written in Go, instant transpilation
- **Unbundled dev**: No bundling during development
- **Fast HMR**: Hot Module Replacement < 100ms
- **Optimized prod**: One-time bundle for production

### Why Tailwind CSS?
- **Utility-first**: Compose styles from small utilities
- **No CSS files**: Classes inline in JSX
- **Built-in dark mode**: Easy theme switching
- **Consistent**: Design system in config file
- **Fast**: Unused styles removed in production

### Why Groq?
- **Speed**: Fastest LLM inference available
- **Cost**: Free tier (12,500 tokens/day)
- **Easy**: Simple REST API, no signup complexity
- **Production**: Used in real applications

### Why RAG?
- **Accuracy**: Grounded in real data
- **Safety**: No hallucinations
- **Transparency**: Sources visible
- **Maintainability**: Update without retraining

---

## 📖 Interview Talking Points

After building this, you can say:

> "I built an AI-powered portfolio that demonstrates full-stack capabilities. The frontend is React with Vite for fast builds and Tailwind for professional styling. The backend uses Groq's free LLM API with RAG to provide accurate, grounded answers about my projects and experience. The chatbot searches a knowledge base of my actual work, retrieves relevant context, and sends it to Groq to generate responses without hallucinations. This showcases both modern frontend development AND understanding of production AI patterns like RAG and safe LLM integration. It's deployed on GitHub Pages with automated builds."

This demonstrates:
- ✅ Modern React skills
- ✅ Full-stack thinking
- ✅ AI/LLM understanding
- ✅ Production mindset
- ✅ DevOps knowledge

---

## 🚀 Deployment to GitHub Pages

The project uses GitHub Actions for automatic deployment:

```yaml
# Triggers on push to main branch
# Builds with npm run build
# Deploys to gh-pages branch
# Live at: github.com/nakuldesh2/portfolio
```

**To deploy:**
1. Push to main branch
2. GitHub Actions automatically builds
3. Deployment pushed to gh-pages
4. Live at your portfolio URL

---

## 🔧 Environment Variables

Create `.env.local` from `.env.example`:

```bash
# Groq API Key (optional, but enables AI)
VITE_GROQ_API_KEY=your_key_here

# Note: This is only needed for development
# The key is NOT committed to git
```

---

## 📝 Development Notes

- **Hot Reload**: Changes update instantly in browser
- **Fast Builds**: Vite compiles in milliseconds
- **Streaming Responses**: Chatbot shows responses as they arrive
- **Fallback Mode**: Works without API key (shows sample responses)
- **Mobile Responsive**: All components work on small screens

---

## 🎯 Next Steps

1. **Setup locally**: `npm install && npm run dev`
2. **Configure Groq**: Get API key, add to `.env.local`
3. **Test chatbot**: Ask questions in chat
4. **Deploy**: Push to main branch for GitHub Pages

---

## 📚 Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Groq API Docs](https://console.groq.com/docs)
- [RAG Pattern](https://www.anthropic.com/research/rag)

---

## 📄 License

This portfolio is personal work. Feel free to use as reference but build your own!

---

**Built with ❤️ using React, Vite, and Groq LLM**
