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
    <div className="mt-6 bg-dark-700 p-6 rounded-lg border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">System Architecture</h3>
      <div className="w-full border border-gray-600 rounded bg-dark-800 overflow-auto">
        <img
          src={diagramPath}
          alt="System Architecture Diagram"
          className="w-full h-auto"
        />
      </div>
    </div>
  )
}

export default ArchitectureDiagram
