import type { ArchitectureNode, ArchitectureConnection } from '@/lib/data'

type Props = {
  nodes: ArchitectureNode[]
  connections: ArchitectureConnection[]
}

const nodeWidth = 110
const nodeHeight = 44
const horizontalGap = 140
const verticalGap = 80
const padding = 40

function getNodePosition(node: ArchitectureNode) {
  return {
    x: padding + node.column * horizontalGap,
    y: padding + node.level * verticalGap,
  }
}

function getNodeCenter(node: ArchitectureNode) {
  const pos = getNodePosition(node)
  return {
    x: pos.x + nodeWidth / 2,
    y: pos.y + nodeHeight / 2,
  }
}

export function ArchitectureDiagram({ nodes, connections }: Props) {
  const maxColumn = Math.max(...nodes.map((n) => n.column))
  const maxLevel = Math.max(...nodes.map((n) => n.level))

  const width = padding * 2 + maxColumn * horizontalGap + nodeWidth
  const height = padding * 2 + maxLevel * verticalGap + nodeHeight

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  // Calculate orthogonal path (horizontal then vertical, or with step)
  function getOrthogonalPath(from: ArchitectureNode, to: ArchitectureNode): string {
    const fromPos = getNodeCenter(from)
    const toPos = getNodeCenter(to)

    const sameLevel = from.level === to.level
    const sameColumn = from.column === to.column

    if (sameLevel) {
      // Horizontal connection
      const startX = from.column < to.column
        ? getNodePosition(from).x + nodeWidth
        : getNodePosition(from).x
      const endX = from.column < to.column
        ? getNodePosition(to).x
        : getNodePosition(to).x + nodeWidth
      const y = fromPos.y
      return `M ${startX} ${y} L ${endX} ${y}`
    }

    if (sameColumn) {
      // Vertical connection
      const startY = from.level < to.level
        ? getNodePosition(from).y + nodeHeight
        : getNodePosition(from).y
      const endY = from.level < to.level
        ? getNodePosition(to).y
        : getNodePosition(to).y + nodeHeight
      const x = fromPos.x
      return `M ${x} ${startY} L ${x} ${endY}`
    }

    // Stepped connection: go down/up first, then horizontal
    const goingDown = to.level > from.level
    const goingRight = to.column > from.column

    const startX = fromPos.x
    const startY = goingDown
      ? getNodePosition(from).y + nodeHeight
      : getNodePosition(from).y

    const endX = goingRight
      ? getNodePosition(to).x
      : getNodePosition(to).x + nodeWidth
    const endY = getNodeCenter(to).y

    const midY = goingDown
      ? getNodePosition(to).y - (verticalGap - nodeHeight) / 2
      : getNodePosition(from).y - (verticalGap - nodeHeight) / 2

    return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ minWidth: '600px', maxHeight: '300px' }}
      >
        {/* Connections */}
        <g>
          {connections.map((conn, i) => {
            const fromNode = nodeMap.get(conn.from)
            const toNode = nodeMap.get(conn.to)
            if (!fromNode || !toNode) return null

            const path = getOrthogonalPath(fromNode, toNode)

            return (
              <path
                key={`${conn.from}-${conn.to}-${i}`}
                d={path}
                fill="none"
                stroke="#525252"
                strokeWidth="1"
              />
            )
          })}
        </g>

        {/* Nodes */}
        <g>
          {nodes.map((node) => {
            const pos = getNodePosition(node)

            return (
              <g key={node.id}>
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill="#0f0f0f"
                  stroke="#404040"
                  strokeWidth="1"
                />

                <text
                  x={pos.x + nodeWidth / 2}
                  y={pos.y + nodeHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#a3a3a3"
                  className="text-[11px]"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
