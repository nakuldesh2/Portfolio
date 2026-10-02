/**
 * ArchitectureDiagram Component
 * Renders interactive, animated system architecture diagrams
 * with hover effects, tooltips, and data flow animations
 */

import { useState } from 'react'

function ArchitectureDiagram({ diagram }) {
  const [hoveredNode, setHoveredNode] = useState(null)

  if (!diagram) return null

  return (
    <div className="mt-6 bg-dark-700 p-6 rounded-lg border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">System Architecture</h3>

      <svg
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        className="w-full border border-gray-600 rounded bg-dark-800"
        style={{ minHeight: '400px' }}
      >
        {/* Draw connections/arrows first (so they appear behind nodes) */}
        {diagram.connections?.map((conn, idx) => (
          <g key={`conn-${idx}`} style={{ animation: 'pulse-slow 3s ease-in-out infinite' }}>
            <defs>
              <marker
                id={`arrowhead-${idx}`}
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#06B6D4" />
              </marker>
            </defs>
            <line
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="#06B6D4"
              strokeWidth="2"
              markerEnd={`url(#arrowhead-${idx})`}
              strokeDasharray={conn.dashed ? "5,5" : "0"}
              className="hover:stroke-blue-400 transition"
            />
            {conn.label && (
              <text
                x={(conn.x1 + conn.x2) / 2}
                y={(conn.y1 + conn.y2) / 2 - 10}
                fill="#94E2D5"
                fontSize="12"
                textAnchor="middle"
                className="pointer-events-none"
              >
                {conn.label}
              </text>
            )}
          </g>
        ))}

        {/* Draw nodes */}
        {diagram.nodes?.map((node, idx) => (
          <g
            key={`node-${idx}`}
            onMouseEnter={() => setHoveredNode(idx)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer transition"
            style={{
              opacity: hoveredNode === null || hoveredNode === idx ? 1 : 0.5,
            }}
          >
            {/* Node background */}
            {node.type === 'box' ? (
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                fill={node.color || '#1F2937'}
                stroke={hoveredNode === idx ? '#3B82F6' : '#4B5563'}
                strokeWidth={hoveredNode === idx ? '3' : '2'}
                rx="8"
                style={{ animation: 'fadeInUp 0.6s ease-out' }}
              />
            ) : node.type === 'circle' ? (
              <circle
                cx={node.x + node.width / 2}
                cy={node.y + node.height / 2}
                r={node.width / 2}
                fill={node.color || '#1F2937'}
                stroke={hoveredNode === idx ? '#3B82F6' : '#4B5563'}
                strokeWidth={hoveredNode === idx ? '3' : '2'}
                style={{ animation: 'fadeInUp 0.6s ease-out' }}
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
