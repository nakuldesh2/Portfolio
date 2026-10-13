import { SparkleIcon } from './Icons'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

// Navbar component - navigation and chat toggle
function Navbar({ onChatClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800/80">
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

          <button
            onClick={onChatClick}
            className="px-3.5 py-2 text-sm font-medium rounded-lg border border-sky-400/40 text-sky-300 hover:bg-sky-400/10 hover:border-sky-400 transition flex items-center gap-2"
          >
            <SparkleIcon />
            <span>Ask my AI</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
