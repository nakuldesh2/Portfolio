import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Resume from './components/Resume'
import Projects from './components/Projects'
import Chat from './components/Chat'
import Footer from './components/Footer'

// Main App component - orchestrates all sections
// This is the top-level layout that brings together all portfolio sections
function App() {
  const [showChat, setShowChat] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900">
      {/* Navigation bar - always visible */}
      <Navbar onChatClick={() => setShowChat(!showChat)} />

      {/* Main content sections */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <Resume />
        <Projects />
      </main>

      {/* AI Chatbot - toggleable */}
      {showChat && <Chat onClose={() => setShowChat(false)} />}

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
