import { profile } from '../data/profile.js'

export default function Footer() {
  const links = [
    ['Email', `mailto:${profile.email}`],
    ['GitHub', profile.github],
    ['LinkedIn', profile.linkedin],
  ].filter(([, href]) => href)

  return (
    <footer id="contact" className="border-t border-ink-700">
      <div className="section py-14 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Let's build something reliable together.</h2>
        <p className="mt-2 text-slate-400">{profile.email}</p>
        <div className="mt-6 flex justify-center gap-3">
          {links.map(([label, href]) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="btn-ghost px-4 py-2 text-sm">
              {label}
            </a>
          ))}
        </div>
        <p className="mt-10 text-xs text-slate-500">
          Built with React, Vite & Tailwind · AI assistant powered by RAG + Llama on Groq · Hosted free on GitHub Pages
        </p>
      </div>
    </footer>
  )
}
