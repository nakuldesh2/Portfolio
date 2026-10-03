import { useState } from 'react'
import { projects } from '../data/projects'
import { architectures } from '../data/architectures'
import ArchitectureDiagram from './ArchitectureDiagram'

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="projects" className="py-20">
      <div className="space-y-12">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">Featured Projects</h2>
          <p className="text-gray-400">10+ major projects spanning distributed systems, AI/ML, and production engineering</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-dark-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-900 transition cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-blue-900 text-blue-300 text-xs font-bold rounded">
                  {project.badge}
                </span>
                {project.company !== 'Personal Project' && (
                  <span className="text-xs text-gray-500">{project.company}</span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition">
                {project.title}
              </h3>

              <p className="text-gray-300 mt-3 text-sm">
                {project.shortDescription}
              </p>

              <div className="mt-4 space-y-1">
                {project.highlights.slice(0, 2).map((highlight, idx) => (
                  <p key={idx} className="text-xs text-cyan-400">
                    ✓ {highlight}
                  </p>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <span key={idx} className="px-2 py-1 bg-dark-700 text-gray-300 text-xs rounded">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-dark-700 text-gray-400 text-xs rounded">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>

              <button className="mt-4 text-cyan-400 hover:text-cyan-300 transition text-sm font-semibold">
                View Details →
              </button>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-dark-800 rounded-lg w-full max-w-5xl border border-gray-700 flex flex-col my-8"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: '90vh' }}
            >
              <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-700 bg-dark-800 z-10">
                <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                <div>
                  <h3 className="text-cyan-400 font-bold mb-2">Challenge</h3>
                  <p className="text-gray-300">{selectedProject.challenge}</p>
                </div>

                {/* Architecture Diagram */}
                {architectures[selectedProject.id] && (
                  <ArchitectureDiagram
                    diagram={architectures[selectedProject.id]}
                    projectId={selectedProject.id}
                  />
                )}

                <div>
                  <h3 className="text-cyan-400 font-bold mb-2">What You'll Learn</h3>
                  <ul className="text-gray-300 space-y-1">
                    {selectedProject.whatYouLearn.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-cyan-400 font-bold mb-2">Impact</h3>
                  <p className="text-gray-300">{selectedProject.impact}</p>
                </div>

                <div>
                  <h3 className="text-cyan-400 font-bold mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-dark-700 text-cyan-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
