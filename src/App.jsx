import { lazy, Suspense, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Footer from './components/Footer'

// Chat (and the knowledge base it pulls in) only downloads when first opened
const Chat = lazy(() => import('./components/Chat'))

// Main App component - orchestrates all sections
// Order follows what hiring managers scan for: who → impact → work → skills → contact
function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Keyboard users can jump past the navbar */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-sky-400 focus:text-slate-950 focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Navigation bar - always visible */}
      <Navbar onChatClick={() => setShowChat(!showChat)} />

      {/* Main content sections */}
      <main id="main" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero onChatClick={() => setShowChat(true)} />
        <Experience />
        <Projects />
        <Skills />
      </main>

      {/* AI Chatbot - toggleable */}
      {showChat && (
        <Suspense fallback={null}>
          <Chat onClose={() => setShowChat(false)} />
        </Suspense>
      )}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
