import { profile } from '../data/profile.js'

const SUGGESTED = [
  'What did Monica build at AWS?',
  'How did she migrate 22+ datasets to a medallion lakehouse?',
  'How did she safely delete 19 PB of data?',
  'Tell me about her agentic AI work',
]

export default function Hero({ onAsk }) {
  return (
    <section id="top" className="section flex min-h-[92vh] flex-col justify-center pt-28">
      <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-ink-600 bg-ink-900/80 px-3 py-1 text-xs text-slate-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent-mint" />
        {profile.title} · {profile.location}
      </div>
      <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-6xl">
        Hi, I'm <span className="gradient-text">{profile.shortName}</span>.
        <br />
        {profile.headline}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{profile.tagline}</p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{profile.summary}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#projects" className="btn-primary">
          ▶ Watch my projects in action
        </a>
        <button onClick={() => onAsk()} className="btn-ghost">
          ✦ Ask my AI assistant
        </button>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {profile.heroStats.map((s) => (
          <div key={s.label} className="card p-4">
            <div className="gradient-text text-3xl font-bold">{s.value}</div>
            <div className="mt-1 text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-2 text-xs uppercase tracking-wider text-slate-500">Try asking</div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              onClick={() => onAsk(q)}
              className="rounded-full border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm text-slate-300 transition hover:border-accent hover:text-white"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
