import type { ArchitectureNode, ArchitectureLayer, ArchitectureConnection } from '@/lib/data'

type Props = {
  layers: ArchitectureLayer[]
  nodes: ArchitectureNode[]
  connections: ArchitectureConnection[]
}

// Monotone icons as SVG paths (16x16 viewBox)
const icons: Record<ArchitectureNode['icon'], string> = {
  user: 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z',
  browser: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.5h14V4a1 1 0 0 0-1-1H2Zm13 2.5H1V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5Z',
  server: 'M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V5.333C14.667 6.806 11.682 8 8 8S1.333 6.806 1.333 5.333V2.667ZM8 6.667c3.14 0 5.333-.895 5.333-1.334v-1.5C12.203 4.712 10.318 5.333 8 5.333c-2.318 0-4.203-.62-5.333-1.5v1.5c0 .439 2.193 1.334 5.333 1.334Z',
  database: 'M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0ZM8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1Z',
  cloud: 'M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383Z',
  ml: 'M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Z M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866Z',
  api: 'M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1Z',
  queue: 'M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3Zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2Z M3.5 5.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Z',
  file: 'M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2Z',
  email: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Z',
  code: 'M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146Zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146Z',
}

const nodeWidth = 110
const nodeHeight = 56
const nodeGap = 12
const layerPadding = 16
const layerGap = 24
const labelHeight = 24
const padding = 16

export function ArchitectureDiagram({ layers, nodes, connections }: Props) {
  // Sort layers by level (horizontal: level 0 = leftmost)
  const sortedLayers = [...layers].sort((a, b) => a.level - b.level)

  // Group nodes by layer
  const nodesByLayer = new Map<string, ArchitectureNode[]>()
  for (const node of nodes) {
    const layerNodes = nodesByLayer.get(node.layer) || []
    layerNodes.push(node)
    nodesByLayer.set(node.layer, layerNodes)
  }

  // Calculate layer dimensions (horizontal layout)
  const layerInfo = new Map<string, { x: number; y: number; width: number; height: number }>()
  let currentX = padding

  // First pass: calculate max height
  let maxLayerHeight = 0
  for (const layer of sortedLayers) {
    const layerNodes = nodesByLayer.get(layer.id) || []
    const maxRow = Math.max(...layerNodes.map((n) => n.column), 0)
    const height = labelHeight + (maxRow + 1) * (nodeHeight + nodeGap) - nodeGap + layerPadding * 2
    maxLayerHeight = Math.max(maxLayerHeight, height)
  }

  // Second pass: position layers horizontally
  for (const layer of sortedLayers) {
    const layerNodes = nodesByLayer.get(layer.id) || []
    const maxRow = Math.max(...layerNodes.map((n) => n.column), 0)
    const contentHeight = labelHeight + (maxRow + 1) * (nodeHeight + nodeGap) - nodeGap
    const height = Math.max(contentHeight + layerPadding * 2, maxLayerHeight)
    const width = nodeWidth + layerPadding * 2

    layerInfo.set(layer.id, {
      x: currentX,
      y: padding,
      width,
      height,
    })

    currentX += width + layerGap
  }

  const totalWidth = currentX - layerGap + padding
  const totalHeight = maxLayerHeight + padding * 2

  // Calculate node positions (vertical stacking within horizontal layers)
  function getNodePosition(node: ArchitectureNode) {
    const layer = layerInfo.get(node.layer)
    if (!layer) return { x: 0, y: 0 }

    return {
      x: layer.x + layerPadding,
      y: layer.y + labelHeight + layerPadding + node.column * (nodeHeight + nodeGap),
    }
  }

  function getNodeCenter(node: ArchitectureNode) {
    const pos = getNodePosition(node)
    return {
      x: pos.x + nodeWidth / 2,
      y: pos.y + nodeHeight / 2,
    }
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  // Horizontal orthogonal path (left to right)
  function getOrthogonalPath(from: ArchitectureNode, to: ArchitectureNode): string {
    const fromLayer = layers.find((l) => l.id === from.layer)
    const toLayer = layers.find((l) => l.id === to.layer)
    if (!fromLayer || !toLayer) return ''

    const fromPos = getNodePosition(from)
    const toPos = getNodePosition(to)
    const fromCenter = getNodeCenter(from)
    const toCenter = getNodeCenter(to)

    const sameLayer = fromLayer.level === toLayer.level

    if (sameLayer) {
      // Vertical connection within same layer
      const x = fromCenter.x
      const startY = from.column < to.column ? fromPos.y + nodeHeight : fromPos.y
      const endY = from.column < to.column ? toPos.y : toPos.y + nodeHeight
      return `M ${x} ${startY} L ${x} ${endY}`
    }

    // Horizontal connection between layers with step
    const goingRight = toLayer.level > fromLayer.level
    const startX = goingRight ? fromPos.x + nodeWidth : fromPos.x
    const startY = fromCenter.y
    const endX = goingRight ? toPos.x : toPos.x + nodeWidth
    const endY = toCenter.y
    const midX = (startX + endX) / 2

    return `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full"
        style={{ minWidth: '700px', maxHeight: '360px' }}
      >
        {/* Layer rectangles */}
        {sortedLayers.map((layer) => {
          const info = layerInfo.get(layer.id)
          if (!info) return null

          return (
            <g key={layer.id}>
              <rect
                x={info.x}
                y={info.y}
                width={info.width}
                height={info.height}
                fill="none"
                stroke="#333"
                strokeWidth="1"
              />
              {/* Label at top */}
              <text
                x={info.x + info.width / 2}
                y={info.y + 16}
                fill="#666"
                textAnchor="middle"
                className="text-[10px] uppercase tracking-wider"
              >
                {layer.label}
              </text>
            </g>
          )
        })}

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
                stroke="#444"
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
                  fill="#111"
                  stroke="#3a3a3a"
                  strokeWidth="1"
                />

                {/* Icon */}
                <g transform={`translate(${pos.x + nodeWidth / 2 - 8}, ${pos.y + 10})`}>
                  <path d={icons[node.icon]} fill="#666" fillRule="evenodd" />
                </g>

                {/* Label */}
                <text
                  x={pos.x + nodeWidth / 2}
                  y={pos.y + nodeHeight - 8}
                  textAnchor="middle"
                  fill="#888"
                  className="text-[9px]"
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
