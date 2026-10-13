import { contact } from '../data/contact'
import { GitHubIcon, LinkedInIcon, MailIcon, SparkleIcon } from './Icons'

const stats = [
  { value: '2,500+', label: 'tenants migrated with zero downtime' },
  { value: '9B', label: 'records / 17 PB safely cleaned up' },
  { value: '35%', label: 'lower scan latency on a Tier-1 service' },
  { value: '6+ yrs', label: 'backend, cloud & ML engineering' },
]

// Hero component - who I am, proof in numbers, and how to reach me
function Hero({ onChatClick }) {
  return (
    <section id="top" className="pt-20 pb-16 md:pt-28 md:pb-24 animate-fade-in">
      <p className="font-mono text-sm text-sky-400 mb-5">Software Engineer · Distributed Systems & AI/ML</p>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-50 leading-tight">
        Hi, I'm Nakul Deshpande.
        <span className="block text-slate-400">I build reliable systems at scale.</span>
      </h1>

      <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">
        Software Development Engineer II at Amazon, owning Tier-1 distributed systems — from
        zero-downtime platform migrations and petabyte-scale data cleanup to ML-powered
        automation. Previously built fintech and enterprise backends with Java, Spring and AWS.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="px-5 py-2.5 rounded-lg bg-sky-400 text-slate-950 font-semibold hover:bg-sky-300 transition"
        >
          Watch my projects run
        </a>
        <button
          onClick={onChatClick}
          className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-200 font-medium hover:border-slate-500 hover:bg-slate-900 transition flex items-center gap-2"
        >
          <SparkleIcon className="w-4 h-4 text-sky-400" />
          Ask my AI assistant
        </button>
        <div className="flex items-center gap-1 ml-1">
          <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2.5 text-slate-400 hover:text-slate-50 transition">
            <GitHubIcon />
          </a>
          {contact.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2.5 text-slate-400 hover:text-slate-50 transition">
              <LinkedInIcon />
            </a>
          )}
          <a href={`mailto:${contact.email}`} aria-label="Email" className="p-2.5 text-slate-400 hover:text-slate-50 transition">
            <MailIcon />
          </a>
        </div>
      </div>

      {/* Proof points */}
      <dl className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800 rounded-xl overflow-hidden border border-slate-800">
        {stats.map(stat => (
          <div key={stat.value} className="bg-slate-950 p-5">
            <dt className="sr-only">{stat.label}</dt>
            <dd className="text-2xl md:text-3xl font-bold text-slate-50 tracking-tight">{stat.value}</dd>
            <dd className="mt-1 text-sm text-slate-400 leading-snug">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export default Hero
