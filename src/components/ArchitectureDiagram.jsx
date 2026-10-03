/**
 * ArchitectureDiagram Component
 * Renders interactive, animated system architecture diagrams
 * with hover effects, tooltips, and data flow animations
 */

import { useState } from 'react'

function ArchitectureDiagram({ diagram }) {
  const [hoveredNode, setHoveredNode] = useState(null)

  if (!diagram) {
    console.warn('ArchitectureDiagram: No diagram data provided')
    return null
  }

  console.log('ArchitectureDiagram rendering:', {
    title: diagram.title,
    nodeCount: diagram.nodes?.length,
    firstNodeColor: diagram.nodes?.[0]?.color,
    allNodeColors: diagram.nodes?.map(n => ({ label: n.label, color: n.color }))
  })

  return (
    <div className="mt-6 bg-dark-700 p-6 rounded-lg border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">System Architecture</h3>

      <svg
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        className="w-full border border-gray-600 rounded bg-dark-800"
        style={{ minHeight: '450px' }}
      >
        {/* Draw connections/arrows first (so they appear behind nodes) */}
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
          <style>{`
            .animated-line { animation: pulse 2s ease-in-out infinite; }
            @keyframes pulse { 0%, 100% { opacity: 0.8; } 50% { opacity: 0.4; } }
          `}</style>
        </defs>
        {diagram.connections?.map((conn, idx) => (
          <g key={`conn-${idx}`}>
            <line
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="#06B6D4"
              strokeWidth="2.5"
              markerEnd="url(#arrowhead)"
              strokeDasharray={conn.dashed ? "6,4" : "0"}
              className="animated-line"
            />
            {conn.label && (
              <>
                <rect
                  x={(conn.x1 + conn.x2) / 2 - 35}
                  y={(conn.y1 + conn.y2) / 2 - 18}
                  width="70"
                  height="18"
                  fill="#1F2937"
                  rx="3"
                  opacity="0.9"
                />
                <text
                  x={(conn.x1 + conn.x2) / 2}
                  y={(conn.y1 + conn.y2) / 2 - 6}
                  fill="#06B6D4"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                  pointerEvents="none"
                >
                  {conn.label}
                </text>
              </>
            )}
          </g>
        ))}

        {/* Draw nodes */}
        {diagram.nodes?.map((node, idx) => (
          <g
            key={`node-${idx}`}
            onMouseEnter={() => setHoveredNode(idx)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
            style={{
              opacity: hoveredNode === null || hoveredNode === idx ? 1 : 0.6,
              transition: 'opacity 0.2s ease',
            }}
          >
            {/* Node background - default to 'box' if type not specified */}
            {(node.type || 'box') === 'box' ? (
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                fill={node.color || '#3B82F6'}
                stroke={hoveredNode === idx ? '#60A5FA' : '#4B5563'}
                strokeWidth={hoveredNode === idx ? '3' : '2'}
                rx="8"
              />
            ) : (node.type || 'box') === 'circle' ? (
              <circle
                cx={node.x + node.width / 2}
                cy={node.y + node.height / 2}
                r={node.width / 2}
                fill={node.color || '#3B82F6'}
                stroke={hoveredNode === idx ? '#60A5FA' : '#4B5563'}
                strokeWidth={hoveredNode === idx ? '3' : '2'}
              />
            ) : null}

            {/* Node label */}
            <text
              x={node.x + node.width / 2}
              y={node.y + node.height / 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={node.textColor || '#FFFFFF'}
              fontSize={node.fontSize || '14'}
              fontWeight="bold"
              className="pointer-events-none"
            >
              {node.label}
            </text>

            {/* Icon/emoji */}
            {node.icon && (
              <text
                x={node.x + node.width / 2}
                y={node.y + 15}
                textAnchor="middle"
                fontSize="20"
                className="pointer-events-none"
              >
                {node.icon}
              </text>
            )}

            {/* Tooltip on hover */}
            {hoveredNode === idx && node.description && (
              <g>
                <rect
                  x={node.x + node.width / 2 - 80}
                  y={node.y - 60}
                  width="160"
                  height="50"
                  fill="#111827"
                  stroke="#06B6D4"
                  rx="4"
                  className="animate-fade-in"
                />
                <text
                  x={node.x + node.width / 2}
                  y={node.y - 40}
                  textAnchor="middle"
                  fill="#06B6D4"
                  fontSize="12"
                  className="pointer-events-none"
                >
                  <tspan x={node.x + node.width / 2} dy="0">
                    {node.description.split('\n')[0]}
                  </tspan>
                  {node.description.split('\n')[1] && (
                    <tspan x={node.x + node.width / 2} dy="15">
                      {node.description.split('\n')[1]}
                    </tspan>
                  )}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* Legend */}
      {diagram.legend && (
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
