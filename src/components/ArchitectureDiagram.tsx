import type { ArchitectureNode, ArchitectureConnection } from '@/lib/data'

type Props = {
  nodes: ArchitectureNode[]
  connections: ArchitectureConnection[]
}

const nodeWidth = 100
const nodeHeight = 56

function getNodeCenter(node: ArchitectureNode) {
  return {
    x: node.x + nodeWidth / 2,
    y: node.y + nodeHeight / 2,
  }
}

function calculatePath(from: ArchitectureNode, to: ArchitectureNode) {
  const fromCenter = getNodeCenter(from)
  const toCenter = getNodeCenter(to)

  const dx = toCenter.x - fromCenter.x
  const dy = toCenter.y - fromCenter.y
  const angle = Math.atan2(dy, dx)

  const startX = fromCenter.x + Math.cos(angle) * (nodeWidth / 2 + 2)
  const startY = fromCenter.y + Math.sin(angle) * (nodeHeight / 2 + 2)

  const endX = toCenter.x - Math.cos(angle) * (nodeWidth / 2 + 8)
  const endY = toCenter.y - Math.sin(angle) * (nodeHeight / 2 + 8)

  return { startX, startY, endX, endY }
}

export function ArchitectureDiagram({ nodes, connections }: Props) {
  const maxX = Math.max(...nodes.map((n) => n.x)) + nodeWidth + 50
  const maxY = Math.max(...nodes.map((n) => n.y)) + nodeHeight + 50

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${maxX} ${maxY}`}
        className="w-full min-w-[700px]"
        style={{ maxHeight: '380px' }}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 8 3, 0 6" fill="#374151" />
          </marker>
        </defs>

        {/* Connections */}
        <g>
          {connections.map((conn, i) => {
            const fromNode = nodeMap.get(conn.from)
            const toNode = nodeMap.get(conn.to)
            if (!fromNode || !toNode) return null

            const { startX, startY, endX, endY } = calculatePath(fromNode, toNode)

            return (
              <line
                key={`${conn.from}-${conn.to}-${i}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="#262626"
                strokeWidth="1"
                markerEnd="url(#arrow)"
              />
            )
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((node) => {
            const lines = node.label.split('\n')

            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill="#0a0a0a"
                  stroke="#262626"
                  strokeWidth="1"
                />

                {lines.map((line, idx) => (
                  <text
                    key={idx}
                    x={node.x + nodeWidth / 2}
                    y={node.y + nodeHeight / 2 + (idx - (lines.length - 1) / 2) * 14}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#525252"
                    className="text-[10px] font-medium"
                  >
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
