import { useEffect, useMemo, useState } from 'react'

/**
 * Simulation Component - step-by-step animated walkthrough of a system
 *
 * Driven entirely by data (see src/data/simulations.js):
 * - nodes: boxes placed on a 1000x520 canvas
 * - edges: connections between nodes
 * - steps: which nodes light up, which edges carry traffic, and the narration
 *
 * Packets are SVG <animateMotion> dots travelling along active edges.
 */

const STEP_MS = 6500
const NODE_W = 160
const NODE_H = 56
const VIEW_W = 1000
const VIEW_H = 520

// Colour per node kind (shown in the legend)
export const KINDS = {
  source: { label: 'Source', color: '#38bdf8' },
  compute: { label: 'Compute', color: '#a78bfa' },
  storage: { label: 'Storage', color: '#34d399' },
  queue: { label: 'Queue / Events', color: '#fbbf24' },
  check: { label: 'Check / Gate', color: '#f472b6' },
  consumer: { label: 'Consumer', color: '#22d3ee' },
  monitor: { label: 'Monitoring', color: '#fb7185' },
}

const TONES = {
  normal: '#38bdf8',
  warn: '#fbbf24',
  bad: '#f87171',
}

// Point where the line from (cx,cy) toward (tx,ty) leaves the node's box
function clipToBox(cx, cy, tx, ty) {
  const dx = tx - cx
  const dy = ty - cy
  if (dx === 0 && dy === 0) return [cx, cy]
  const scale = Math.min(
    dx === 0 ? Infinity : (NODE_W / 2 + 4) / Math.abs(dx),
    dy === 0 ? Infinity : (NODE_H / 2 + 4) / Math.abs(dy),
  )
  return [cx + dx * scale, cy + dy * scale]
}

function edgeGeometry(from, to) {
  const [x1, y1] = clipToBox(from.x, from.y, to.x, to.y)
  const [x2, y2] = clipToBox(to.x, to.y, from.x, from.y)
  return { x1, y1, x2, y2, path: `M ${x1} ${y1} L ${x2} ${y2}` }
}

const edgeKey = (a, b) => `${a}->${b}`

// Skip a label if, centred on its edge, it would cover any node
function labelFits(g, label, nodes) {
  const mx = (g.x1 + g.x2) / 2
  const my = (g.y1 + g.y2) / 2
  const halfW = label.length * 3.9 + 6
  return nodes.every(n =>
    mx + halfW < n.x - NODE_W / 2 - 2 || mx - halfW > n.x + NODE_W / 2 + 2 ||
    my + 11 < n.y - NODE_H / 2 - 2 || my - 11 > n.y + NODE_H / 2 + 2,
  )
}

function Simulation({ simulation }) {
  const { nodes, edges, steps } = simulation
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const nodeById = useMemo(() => Object.fromEntries(nodes.map(n => [n.id, n])), [nodes])
  const current = steps[step]
  const activeNodes = new Set(current.active || [])

  // Flows may be [from, to] or [from, to, tone]; they can run against an edge's drawn direction
  const flows = (current.flows || []).map(([from, to, tone = 'normal']) => ({ from, to, tone }))
  const activeEdges = new Map()
  flows.forEach(f => {
    activeEdges.set(edgeKey(f.from, f.to), f.tone)
    activeEdges.set(edgeKey(f.to, f.from), f.tone)
    activeNodes.add(f.from)
    activeNodes.add(f.to)
  })

  // Auto-advance; loops back to the start
  useEffect(() => {
    if (!playing || reducedMotion) return
    const timer = setTimeout(() => setStep(s => (s + 1) % steps.length), STEP_MS)
    return () => clearTimeout(timer)
  }, [playing, step, steps.length, reducedMotion])

  const go = (next) => setStep((next + steps.length) % steps.length)

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(step + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(step - 1) }
  }

  const usedKinds = [...new Set(nodes.map(n => n.kind))]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4" onKeyDown={onKeyDown}>
      {/* Canvas */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 flex flex-col justify-center">
        {/* Keeps node text legible on phones; the canvas scrolls sideways instead of shrinking */}
        <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full h-auto min-w-[680px]"
          role="img"
          aria-label={`Step ${step + 1}: ${current.title}`}
        >
          <defs>
            <pattern id="sim-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.6" opacity="0.6" />
            </pattern>
            <marker id="sim-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
            </marker>
            {Object.entries(TONES).map(([tone, color]) => (
              <marker key={tone} id={`sim-arrow-${tone}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
              </marker>
            ))}
            <filter id="sim-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width={VIEW_W} height={VIEW_H} fill="url(#sim-grid)" />

          {/* Edges */}
          {edges.map(edge => {
            const from = nodeById[edge.from]
            const to = nodeById[edge.to]
            const g = edgeGeometry(from, to)
            const tone = activeEdges.get(edgeKey(edge.from, edge.to))
            const active = tone !== undefined
            const color = active ? TONES[tone] : '#334155'
            return (
              <g key={edgeKey(edge.from, edge.to)} style={{ transition: 'opacity 400ms' }} opacity={active ? 1 : 0.55}>
                <path
                  d={g.path}
                  stroke={color}
                  strokeWidth={active ? 2 : 1.25}
                  strokeDasharray={edge.dashed ? '5 5' : undefined}
                  fill="none"
                  markerEnd={`url(#${active ? `sim-arrow-${tone}` : 'sim-arrow'})`}
                />
                {edge.label && labelFits(g, edge.label, nodes) && (
                  <g transform={`translate(${(g.x1 + g.x2) / 2}, ${(g.y1 + g.y2) / 2})`}>
                    <rect x={-edge.label.length * 3.9 - 6} y="-11" width={edge.label.length * 7.8 + 12} height="22" rx="4" fill="#020617" stroke={active ? color : '#1e293b'} />
                    <text textAnchor="middle" dy="4" fontSize="12" fontFamily="JetBrains Mono, monospace" fill={active ? '#e2e8f0' : '#64748b'}>
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Packets travelling along this step's flows */}
          {!reducedMotion && flows.map((flow, i) => {
            const from = nodeById[flow.from]
            const to = nodeById[flow.to]
            if (!from || !to) return null
            const g = edgeGeometry(from, to)
            return [0, 1, 2].map(n => (
              // Hidden until its (staggered) motion begins, otherwise it sits at the SVG origin
              <circle key={`${step}-${i}-${n}`} r="5" fill={TONES[flow.tone]} filter="url(#sim-glow)" opacity="0">
                <set attributeName="opacity" to="1" begin={`${n * 0.6 + i * 0.15}s`} />
                <animateMotion dur="1.8s" begin={`${n * 0.6 + i * 0.15}s`} repeatCount="indefinite" path={g.path} />
              </circle>
            ))
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const active = activeNodes.has(node.id)
            const color = node.rejected ? TONES.bad : KINDS[node.kind].color
            return (
              <g
                key={node.id}
                transform={`translate(${node.x - NODE_W / 2}, ${node.y - NODE_H / 2})`}
                opacity={active ? 1 : 0.4}
                style={{ transition: 'opacity 400ms' }}
              >
                {active && (
                  <rect x="-5" y="-5" width={NODE_W + 10} height={NODE_H + 10} rx="13" fill={color} opacity="0.14" />
                )}
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="9"
                  fill="#0f172a"
                  stroke={active ? color : '#334155'}
                  strokeWidth={active ? 1.75 : 1}
                  strokeDasharray={node.rejected ? '5 4' : undefined}
                />
                <rect x="0" y="10" width="3" height={NODE_H - 20} rx="1.5" fill={color} />
                <text x={NODE_W / 2} y={node.sub ? 24 : 33} textAnchor="middle" fontSize="14.5" fontWeight="600" fill={active ? '#f8fafc' : '#94a3b8'} fontFamily="Inter, sans-serif" textDecoration={node.rejected ? 'line-through' : undefined}>
                  {node.label}
                </text>
                {node.sub && (
                  <text x={NODE_W / 2} y="42" textAnchor="middle" fontSize="11.5" fill={active ? '#94a3b8' : '#64748b'} fontFamily="Inter, sans-serif">
                    {node.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
        </div>

        <p className="sm:hidden mt-2 px-1 text-xs text-slate-400">← Swipe the diagram to explore →</p>

        {/* Legend */}
        <div className="mt-2 px-1 flex flex-wrap gap-x-4 gap-y-1">
          {usedKinds.map(kind => (
            <span key={kind} className="flex items-center gap-1.5 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full" style={{ background: KINDS[kind].color }} />
              {KINDS[kind].label}
            </span>
          ))}
        </div>
      </div>

      {/* Narration + controls */}
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col">
        <p className="font-mono text-xs tracking-wider text-sky-400">STEP {step + 1} / {steps.length}</p>
        <h3 className="mt-1.5 text-lg font-semibold text-slate-50 leading-snug">{current.title}</h3>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">{current.body}</p>

        {current.metric && (
          <div className="mt-4 self-start px-3.5 py-2.5 rounded-lg border border-slate-800 bg-slate-900">
            <p className="text-xl font-bold text-sky-400 tracking-tight">{current.metric.value}</p>
            <p className="text-xs text-slate-400">{current.metric.label}</p>
          </div>
        )}

        {/* Progress bar restarts on each step */}
        <div className="mt-5 h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            key={`${step}-${playing}`}
            className="h-full bg-sky-400"
            style={{
              width: playing && !reducedMotion ? undefined : '100%',
              animation: playing && !reducedMotion ? `sim-progress ${STEP_MS}ms linear forwards` : 'none',
              opacity: playing && !reducedMotion ? 1 : 0.35,
            }}
          />
        </div>

        <div className="mt-3 flex gap-2">
          <button onClick={() => go(step - 1)} aria-label="Previous step" className="px-3 py-2 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-slate-50 transition">
            ‹
          </button>
          <button
            onClick={() => setPlaying(p => !p)}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-800 text-sm font-medium text-slate-200 hover:bg-slate-900 transition"
          >
            {playing && !reducedMotion ? '❚❚ Pause' : '▶ Play'}
          </button>
          <button onClick={() => go(step + 1)} aria-label="Next step" className="px-3 py-2 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-slate-50 transition">
            ›
          </button>
        </div>

        <ol className="mt-4 space-y-1">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                onClick={() => setStep(i)}
                className={`w-full text-left flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition ${
                  i === step ? 'bg-slate-800/80 text-slate-50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <span className={`w-5 h-5 shrink-0 rounded-full grid place-items-center text-[10px] font-mono ${
                  i === step ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {i + 1}
                </span>
                {s.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Simulation
