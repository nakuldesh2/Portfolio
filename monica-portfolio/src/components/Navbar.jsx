import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'

const LINKS = [
  ['Experience', '#experience'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Achievements', '#achievements'],
  ['Education', '#education'],
]

export default function Navbar({ onAsk }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition ${
        scrolled ? 'border-b border-ink-700 bg-ink-950/85 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-violet text-sm font-bold text-ink-950">
            MC
          </span>
          <span className="hidden sm:inline">{profile.name.split(' ')[0]} {profile.name.split(' ').slice(-1)}</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onAsk} className="btn-primary px-4 py-2 text-sm">
            <span aria-hidden>✦</span> Ask AI
          </button>
          <button
            className="sim-btn md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="border-t border-ink-700 bg-ink-950/95 px-4 py-3 md:hidden">
          {LINKS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block py-2 text-slate-300">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
