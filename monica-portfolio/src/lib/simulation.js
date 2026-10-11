// Shared simulation geometry. Plain JS (no JSX) so both the React components
// and the Node validation script (scripts/validate-data.mjs) use the same numbers.

export const CANVAS = { w: 1000, h: 480 }
export const NODE = { w: 164, h: 60 }
export const LABEL_MAX_CHARS = 20

export const KIND = {
  source: { color: '#38bdf8', label: 'Source' },
  compute: { color: '#a78bfa', label: 'Compute' },
  storage: { color: '#34d399', label: 'Storage' },
  ml: { color: '#f472b6', label: 'ML / AI' },
  gate: { color: '#fbbf24', label: 'Check / Gate' },
  alert: { color: '#fb7185', label: 'Monitoring' },
  consumer: { color: '#7dd3fc', label: 'Consumer' },
}
export const STATUS = { error: '#f43f5e', warn: '#f59e0b', ok: '#10b981' }

const sign = (n) => (n < 0 ? -1 : 1)

// Cubic Bézier between the facing sides of two node boxes. Also returns the
// curve's midpoint (B(0.5) = (P0 + 3·P1 + 3·P2 + P3) / 8) for the edge label,
// and the straight-line span so tiny edges can skip their label.
export function edgeGeometry(a, b) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  let p0, p1, p2, p3
  if (Math.abs(dx) >= Math.abs(dy) * 0.9) {
    p0 = [a.x + (sign(dx) * NODE.w) / 2, a.y]
    p3 = [b.x - (sign(dx) * NODE.w) / 2, b.y]
    const c = (p3[0] - p0[0]) / 2
    p1 = [p0[0] + c, p0[1]]
    p2 = [p3[0] - c, p3[1]]
  } else {
    p0 = [a.x, a.y + (sign(dy) * NODE.h) / 2]
    p3 = [b.x, b.y - (sign(dy) * NODE.h) / 2]
    const c = (p3[1] - p0[1]) / 2
    p1 = [p0[0], p0[1] + c]
    p2 = [p3[0], p3[1] - c]
  }
  const d = `M ${p0} C ${p1} ${p2} ${p3}`.replace(/,/g, ' ')
  const mid = [0, 1].map((i) => (p0[i] + 3 * p1[i] + 3 * p2[i] + p3[i]) / 8)
  const span = Math.hypot(p3[0] - p0[0], p3[1] - p0[1])
  return { d, mid, span }
}

export const labelWidth = (text) => text.length * 7.2 + 12
