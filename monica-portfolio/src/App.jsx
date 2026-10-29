import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import ProjectModal from './components/ProjectModal.jsx'
import Skills from './components/Skills.jsx'
import Achievements from './components/Achievements.jsx'
import Education from './components/Education.jsx'
import Footer from './components/Footer.jsx'
import Chat from './components/Chat.jsx'
import { getProject } from './data/projects.js'

export default function App() {
  const [projectId, setProjectId] = useState(null)
  // `chatRequest` lets any section open the chat with a pre-filled question.
  // The nonce makes repeated clicks on the same question still trigger.
  const [chatOpen, setChatOpen] = useState(false)
  const [chatRequest, setChatRequest] = useState(null)

  const askAI = (question) => {
    setChatOpen(true)
    if (question) setChatRequest({ question, nonce: Date.now() })
  }

  const project = projectId ? getProject(projectId) : null

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.10),transparent_50%)]" />
      <Navbar onAsk={() => askAI()} />
      <main>
        <Hero onAsk={askAI} />
        <Experience onOpenProject={setProjectId} />
        <Projects onOpenProject={setProjectId} />
        <Skills />
        <Achievements />
        <Education />
      </main>
      <Footer />
      {project && (
        <ProjectModal
          project={project}
          onClose={() => setProjectId(null)}
          onAsk={(q) => {
            setProjectId(null)
            askAI(q)
          }}
        />
      )}
      <Chat open={chatOpen} setOpen={setChatOpen} request={chatRequest} />
    </div>
  )
}
