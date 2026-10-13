import { useState } from 'react'
import { SparkleIcon } from './Icons'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

// Navbar component - navigation and chat toggle
function Navbar({ onChatClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav aria-label="Main" className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#top" className="font-semibold text-slate-50 tracking-tight">
            Nakul Deshpande
          </a>

          <div className="hidden md:flex gap-8 text-sm">
            {links.map(link => (
              <a key={link.href} href={link.href} className="text-slate-400 hover:text-slate-50 transition">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onChatClick}
              className="px-3.5 py-2 text-sm font-medium rounded-lg border border-sky-400/40 text-sky-300 hover:bg-sky-400/10 hover:border-sky-400 transition flex items-center gap-2"
            >
              <SparkleIcon />
              <span>Ask my AI</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(open => !open)}
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-900"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="md:hidden pb-4 flex flex-col">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-slate-300 hover:text-slate-50 border-t border-slate-800/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
