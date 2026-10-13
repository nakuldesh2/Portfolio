import { contact } from '../data/contact'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

// Footer component - contact call-to-action and links
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="border-t border-slate-800/80 mt-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <p className="font-mono text-sm text-sky-400 mb-2">04 — Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-50">Let's talk</h2>
        <p className="mt-3 text-slate-400 max-w-xl">
          I'm open to backend, distributed systems and AI/ML engineering roles. The fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="px-5 py-2.5 rounded-lg bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300 transition flex items-center gap-2"
          >
            <MailIcon className="w-4 h-4" />
            {contact.email}
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-200 font-medium hover:border-slate-500 hover:bg-slate-900 transition flex items-center gap-2"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-200 font-medium hover:border-slate-500 hover:bg-slate-900 transition flex items-center gap-2"
            >
              <LinkedInIcon className="w-4 h-4" />
              LinkedIn
            </a>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between gap-2 text-sm text-slate-400">
          <p>© {currentYear} Nakul Deshpande</p>
          <p>Built with React, Vite, Tailwind CSS and a RAG chatbot on Groq</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
