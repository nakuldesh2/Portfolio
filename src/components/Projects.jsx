import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import { architectures } from '../data/architectures'
import ArchitectureDiagram from './ArchitectureDiagram'
import Simulation from './Simulation'
import { simulations } from '../data/simulations'
import SectionHeading from './SectionHeading'

function ProjectMeta({ project }) {
  return (
    <p className="font-mono text-xs text-slate-500">
      {project.company !== 'Personal Project' && <span>{project.company} · </span>}
      <span className="text-sky-400">{project.badge}</span>
    </p>
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  // Close the details dialog with Escape
  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e) => e.key === 'Escape' && setSelectedProject(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedProject])

  return (
    <section id="projects" className="py-20 border-t border-slate-800/80">
      <SectionHeading eyebrow="02 — Projects" title="Selected work">
        Production systems I designed or led. Each one opens as a step-by-step simulation of how it works, with the real results.
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="text-left p-6 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-sky-400/50 hover:bg-slate-900 transition group flex flex-col"
          >
            <ProjectMeta project={project} />

            <h3 className="mt-3 text-lg font-semibold text-slate-50 group-hover:text-sky-300 transition">
              {project.title}
            </h3>

            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              {project.shortDescription}
            </p>

            {/* Lead with the headline result */}
            <p className="mt-4 text-sm font-medium text-slate-200">
              {project.highlights[0]}
            </p>

            <div className="mt-auto pt-5 flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map(tech => (
                <span key={tech} className="px-2 py-0.5 rounded font-mono text-xs bg-slate-800/80 text-slate-400">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 rounded font-mono text-xs text-slate-500">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            <span className="mt-5 text-sm font-medium text-sky-400 group-hover:text-sky-300">
              {simulations[project.id] ? '▶ Watch it run' : 'Architecture & details →'}
            </span>
          </button>
        ))}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-dialog-title"
            className="bg-slate-900 rounded-xl w-full max-w-6xl border border-slate-800 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh' }}
          >
            <div className="flex justify-between items-start gap-4 p-6 border-b border-slate-800">
              <div>
                <ProjectMeta project={selectedProject} />
                <h2 id="project-dialog-title" className="mt-2 text-2xl font-bold tracking-tight text-slate-50">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-50 text-xl leading-none p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto flex-1">
              <p className="text-slate-300 leading-relaxed">{selectedProject.shortDescription}</p>

              {/* Interactive simulation (keyed so it restarts per project) */}
              {simulations[selectedProject.id] && (
                <Simulation key={selectedProject.id} simulation={simulations[selectedProject.id]} />
              )}

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Results</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedProject.highlights.map(highlight => (
                    <li key={highlight} className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-sm font-medium text-slate-200">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Challenge</h3>
                <p className="text-slate-300 leading-relaxed">{selectedProject.challenge}</p>
              </div>

              {/* Architecture Diagram */}
              {architectures[selectedProject.id] && (
                simulations[selectedProject.id] ? (
                  <details className="group/diagram">
                    <summary className="cursor-pointer text-sm font-medium text-slate-400 hover:text-slate-200 select-none">
                      Show detailed architecture diagram
                    </summary>
                    <div className="mt-4">
                      <ArchitectureDiagram diagram={architectures[selectedProject.id]} projectId={selectedProject.id} />
                    </div>
                  </details>
                ) : (
                  <ArchitectureDiagram diagram={architectures[selectedProject.id]} projectId={selectedProject.id} />
                )
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Key takeaways</h3>
                  <ul className="space-y-2">
                    {selectedProject.whatYouLearn.map(item => (
                      <li key={item} className="flex gap-3 text-slate-300">
                        <span className="mt-2.5 w-1 h-1 rounded-full bg-sky-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Impact</h3>
                  <p className="text-slate-300 leading-relaxed">{selectedProject.impact}</p>

                  <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Tech stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map(tech => (
                      <span key={tech} className="px-2 py-0.5 rounded font-mono text-xs bg-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects
