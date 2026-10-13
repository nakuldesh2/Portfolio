import { resume } from '../data/resume'
import SectionHeading from './SectionHeading'

// Experience component - work history as a vertical timeline
function Experience() {
  return (
    <section id="experience" className="py-20 border-t border-slate-800/80">
      <SectionHeading eyebrow="01 — Experience" title="Where I've worked">
        6+ years building Tier-1 systems at Amazon, fintech platforms at Ostrich, and enterprise software at SM Enterprises.
      </SectionHeading>

      <ol className="relative border-l border-slate-800 ml-1.5 space-y-12">
        {resume.experience.map((job, idx) => (
          <li key={job.company} className="pl-8 relative">
            <span
              className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ring-4 ring-slate-950 ${
                idx === 0 ? 'bg-sky-400' : 'bg-slate-600'
              }`}
            />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="text-xl font-semibold text-slate-50">
                {job.role} <span className="text-sky-400">· {job.company}</span>
              </h3>
              <span className="font-mono text-xs text-slate-500">{job.duration}</span>
            </div>
            <ul className="mt-4 space-y-2.5">
              {job.highlights.slice(0, 5).map(highlight => (
                <li key={highlight} className="flex gap-3 text-slate-300 leading-relaxed">
                  <span className="mt-2.5 w-1 h-1 rounded-full bg-slate-500 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Experience
