/**
 * ArchitectureDiagram Component
 * Renders interactive, animated system architecture diagrams
 * with hover effects, tooltips, and data flow animations
 */

import { useState } from 'react'

function ArchitectureDiagram({ diagram }) {
  const [hoveredNode, setHoveredNode] = useState(null)

  if (!diagram) return null

  // Gradient definitions for visual depth
  const gradients = {
    blue: 'url(#gradientBlue)',
    purple: 'url(#gradientPurple)',
    pink: 'url(#gradientPink)',
    amber: 'url(#gradientAmber)',
    emerald: 'url(#gradientEmerald)',
    cyan: 'url(#gradientCyan)',
    indigo: 'url(#gradientIndigo)',
  }

  const getGradientUrl = (color) => {
    if (color.includes('3B82F6')) return gradients.blue
    if (color.includes('8B5CF6')) return gradients.purple
    if (color.includes('EC4899')) return gradients.pink
    if (color.includes('F59E0B')) return gradients.amber
    if (color.includes('10B981')) return gradients.emerald
    if (color.includes('06B6D4')) return gradients.cyan
    if (color.includes('6366F1')) return gradients.indigo
    return gradients.blue
  }

  return (
    <div className="mt-6 bg-dark-700 p-6 rounded-lg border border-gray-700">
      <h3 className="text-cyan-400 font-bold mb-4">System Architecture</h3>

      <svg
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        className="w-full border border-gray-600 rounded bg-dark-800"
        style={{ minHeight: '450px' }}
      >
        {/* Define gradients for all colors */}
        <defs>
          <linearGradient id="gradientBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradientPurple" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="1" />
            <stop offset="100%" stopColor="#5B21B6" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradientPink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" stopOpacity="1" />
            <stop offset="100%" stopColor="#9D174D" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradientAmber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="1" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradientEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="1" />
            <stop offset="100%" stopColor="#065F46" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradientCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="1" />
            <stop offset="100%" stopColor="#0C4A6E" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="gradientIndigo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="1" />
            <stop offset="100%" stopColor="#3730A3" stopOpacity="1" />
          </linearGradient>
          <style>{`
            @keyframes pulse-animation {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.6; }
            }
            @keyframes flow-animation {
              0% { stroke-dashoffset: 10; }
              100% { stroke-dashoffset: 0; }
            }
            @keyframes scale-animation {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .animated-connection {
              animation: pulse-animation 2s ease-in-out infinite;
            }
            .flow-arrow {
              animation: flow-animation 2s linear infinite;
            }
            .pulse-node {
              animation: pulse-animation 3s ease-in-out infinite;
            }
          `}</style>
        </defs>
        {/* Draw connections/arrows first (so they appear behind nodes) */}
        {diagram.connections?.map((conn, idx) => (
          <g key={`conn-${idx}`}>
            <defs>
              <marker
                id={`arrowhead-${idx}`}
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 12 4, 0 8" fill="#06B6D4" />
              </marker>
            </defs>
            {/* Animated connection line */}
            <line
              x1={conn.x1}
              y1={conn.y1}
              x2={conn.x2}
              y2={conn.y2}
              stroke="#06B6D4"
              strokeWidth="2.5"
              markerEnd={`url(#arrowhead-${idx})`}
              strokeDasharray={conn.dashed ? "6,4" : "0"}
              className="animated-connection"
              opacity="0.8"
            />
            {/* Connection label with background for readability */}
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
                  className="pointer-events-none"
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
            {/* Shadow effect */}
            <defs>
              <filter id={`shadow-${idx}`} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Node background with gradient */}
            {node.type === 'box' ? (
              <rect
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                fill={getGradientUrl(node.color)}
                stroke={hoveredNode === idx ? '#60A5FA' : '#4B5563'}
                strokeWidth={hoveredNode === idx ? '3' : '2'}
                rx="8"
                filter={`url(#shadow-${idx})`}
                className="pulse-node"
              />
            ) : node.type === 'circle' ? (
              <circle
                cx={node.x + node.width / 2}
                cy={node.y + node.height / 2}
                r={node.width / 2}
                fill={getGradientUrl(node.color)}
                stroke={hoveredNode === idx ? '#60A5FA' : '#4B5563'}
                strokeWidth={hoveredNode === idx ? '3' : '2'}
                filter={`url(#shadow-${idx})`}
                className="pulse-node"
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
