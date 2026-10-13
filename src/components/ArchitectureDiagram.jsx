/**
 * ArchitectureDiagram Component
 * Displays professional architecture diagrams as images
 */

import { diagramPaths } from '../data/diagramPaths'

function ArchitectureDiagram({ diagram, projectId }) {
  const diagramPath = projectId ? diagramPaths[projectId] : null

  if (!diagramPath) {
    return null
  }

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">System architecture</h3>
      <div className="w-full border border-slate-800 rounded-lg bg-slate-950 overflow-auto">
        <img
          src={diagramPath}
          alt={`System architecture diagram for ${projectId}`}
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

export default ArchitectureDiagram
