import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Chat from './components/Chat'
import Footer from './components/Footer'

// Main App component - orchestrates all sections
// Order follows what hiring managers scan for: who → impact → work → skills → contact
function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation bar - always visible */}
      <Navbar onChatClick={() => setShowChat(!showChat)} />

      {/* Main content sections */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero onChatClick={() => setShowChat(true)} />
        <Experience />
        <Projects />
        <Skills />
      </main>

      {/* AI Chatbot - toggleable */}
      {showChat && <Chat onClose={() => setShowChat(false)} />}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
