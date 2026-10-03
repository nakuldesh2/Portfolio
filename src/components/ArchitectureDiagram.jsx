/**
 * ArchitectureDiagram Component
 * Renders professional SVG architecture diagrams from public files
 */

import { diagramPaths } from '../data/diagramPaths'

function ArchitectureDiagram({ diagram, projectId }) {
  // Check if we have a diagram file for this project
  const diagramPath = projectId ? diagramPaths[projectId] : null

  if (!diagram && !diagramPath) {
    return null
  }

  return (
    <div className="mt-6 bg-dark-700 p-6 rounded-lg border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">System Architecture</h3>

      {/* Render professional SVG diagram file if available */}
      {diagramPath ? (
        <div className="w-full border border-gray-600 rounded bg-dark-800 p-4 flex items-center justify-center" style={{ minHeight: '500px' }}>
          <img
            src={diagramPath}
            alt="System Architecture"
            className="w-full h-auto"
            style={{ maxWidth: '100%' }}
          />
        </div>
      ) : diagram ? (
        /* Fallback to simple diagram if no SVG file available */
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          className="w-full border border-gray-600 rounded bg-dark-800"
          style={{ minHeight: '450px' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="12"
              markerHeight="12"
              refX="10"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 12 4, 0 8" fill="#06B6D4" />
            </marker>
          </defs>
          {diagram.nodes?.map((node, idx) => (
            <g key={`node-${idx}`}>
              {(node.type || 'box') === 'box' ? (
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.width}
                  height={node.height}
                  fill={node.color || '#3B82F6'}
                  stroke="#4B5563"
                  strokeWidth="2"
                  rx="8"
                />
              ) : null}
              <text
                x={node.x + node.width / 2}
                y={node.y + node.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontSize="12"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      ) : null}

      {/* Legend */}
      {diagram?.legend && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          {diagram.legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-300">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ArchitectureDiagram
