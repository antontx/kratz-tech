import type { ArchitectureNode, ArchitectureConnection } from '@/lib/data'

type Props = {
  nodes: ArchitectureNode[]
  connections: ArchitectureConnection[]
}

const nodeColors: Record<ArchitectureNode['type'], { bg: string; border: string; text: string }> = {
  user: { bg: '#1e293b', border: '#475569', text: '#94a3b8' },
  frontend: { bg: '#0f172a', border: '#3b82f6', text: '#60a5fa' },
  backend: { bg: '#0f172a', border: '#22c55e', text: '#4ade80' },
  database: { bg: '#0f172a', border: '#f59e0b', text: '#fbbf24' },
  service: { bg: '#0f172a', border: '#8b5cf6', text: '#a78bfa' },
  cloud: { bg: '#0f172a', border: '#06b6d4', text: '#22d3ee' },
  ml: { bg: '#0f172a', border: '#ec4899', text: '#f472b6' },
}

const nodeWidth = 100
const nodeHeight = 60

function getNodeCenter(node: ArchitectureNode) {
  return {
    x: node.x + nodeWidth / 2,
    y: node.y + nodeHeight / 2,
  }
}

function calculatePath(from: ArchitectureNode, to: ArchitectureNode) {
  const fromCenter = getNodeCenter(from)
  const toCenter = getNodeCenter(to)

  // Calculate edge points (where line meets the node border)
  const dx = toCenter.x - fromCenter.x
  const dy = toCenter.y - fromCenter.y
  const angle = Math.atan2(dy, dx)

  // Start point (edge of from node)
  const startX = fromCenter.x + Math.cos(angle) * (nodeWidth / 2 + 5)
  const startY = fromCenter.y + Math.sin(angle) * (nodeHeight / 2 + 5)

  // End point (edge of to node)
  const endX = toCenter.x - Math.cos(angle) * (nodeWidth / 2 + 5)
  const endY = toCenter.y - Math.sin(angle) * (nodeHeight / 2 + 5)

  return { startX, startY, endX, endY }
}

export function ArchitectureDiagram({ nodes, connections }: Props) {
  // Calculate SVG dimensions based on node positions
  const maxX = Math.max(...nodes.map((n) => n.x)) + nodeWidth + 50
  const maxY = Math.max(...nodes.map((n) => n.y)) + nodeHeight + 50

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${maxX} ${maxY}`}
        className="w-full min-w-[700px]"
        style={{ maxHeight: '400px' }}
      >
        <defs>
          {/* Arrow marker */}
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#4b5563" />
          </marker>

          {/* Glow filter for nodes */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        <g>
          {connections.map((conn, i) => {
            const fromNode = nodeMap.get(conn.from)
            const toNode = nodeMap.get(conn.to)
            if (!fromNode || !toNode) return null

            const { startX, startY, endX, endY } = calculatePath(fromNode, toNode)
            const midX = (startX + endX) / 2
            const midY = (startY + endY) / 2

            return (
              <g key={`${conn.from}-${conn.to}-${i}`}>
                <line
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke="#374151"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
                {conn.label && (
                  <text
                    x={midX}
                    y={midY - 6}
                    textAnchor="middle"
                    className="fill-gray-600 text-[10px]"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            )
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((node) => {
            const colors = nodeColors[node.type]
            const lines = node.label.split('\n')

            return (
              <g key={node.id} filter="url(#glow)">
                {/* Node background */}
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx="8"
                  fill={colors.bg}
                  stroke={colors.border}
                  strokeWidth="2"
                  className="transition-all duration-200 hover:stroke-[3]"
                />

                {/* Node label */}
                {lines.map((line, idx) => (
                  <text
                    key={idx}
                    x={node.x + nodeWidth / 2}
                    y={node.y + nodeHeight / 2 + (idx - (lines.length - 1) / 2) * 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={colors.text}
                    className="text-[11px] font-medium pointer-events-none"
                  >
                    {line}
                  </text>
                ))}

                {/* Type indicator dot */}
                <circle
                  cx={node.x + nodeWidth - 10}
                  cy={node.y + 10}
                  r="4"
                  fill={colors.border}
                  opacity="0.6"
                />
              </g>
            )
          })}
        </g>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
        {Object.entries(nodeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: colors.border }}
            />
            <span className="capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
