/**
 * ArchitectureDiagram Component
 * Displays a project's detailed architecture diagram image, if it has one
 */

import { diagramPaths } from '../data/diagramPaths'

function ArchitectureDiagram({ projectId, title }) {
  const diagramPath = diagramPaths[projectId]

  if (!diagramPath) {
    return null
  }

  return (
    <div className="w-full border border-slate-800 rounded-lg bg-white overflow-auto">
      <a href={diagramPath} target="_blank" rel="noreferrer" title="Open full size">
        <img
          src={diagramPath}
          alt={`Detailed architecture diagram: ${title}`}
          loading="lazy"
          className="w-full h-auto"
        />
      </a>
    </div>
  )
}

export default ArchitectureDiagram
