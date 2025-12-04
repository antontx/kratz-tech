import type { ArchitectureNode, ArchitectureLayer, ArchitectureConnection } from '@/lib/data'

type Props = {
  layers: ArchitectureLayer[]
  nodes: ArchitectureNode[]
  connections: ArchitectureConnection[]
}

// Monotone icons as SVG paths (16x16 viewBox)
const icons: Record<ArchitectureNode['icon'], string> = {
  user: 'M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z',
  browser: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.5h14V4a1 1 0 0 0-1-1H2Zm13 2.5H1V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5Z M2 3.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm3 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Zm3 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0Z',
  server: 'M1.333 2.667C1.333 1.194 4.318 0 8 0s6.667 1.194 6.667 2.667V5.333C14.667 6.806 11.682 8 8 8S1.333 6.806 1.333 5.333V2.667ZM8 6.667c3.14 0 5.333-.895 5.333-1.334v-1.5C12.203 4.712 10.318 5.333 8 5.333c-2.318 0-4.203-.62-5.333-1.5v1.5c0 .439 2.193 1.334 5.333 1.334Zm0-5.334c-3.14 0-5.333.895-5.333 1.334 0 .439 2.193 1.333 5.333 1.333s5.333-.894 5.333-1.333c0-.439-2.193-1.334-5.333-1.334ZM1.333 8v2.667C1.333 12.139 4.318 13.333 8 13.333s6.667-1.194 6.667-2.666V8c-1.13.879-3.015 1.5-5.333 1.5H8c-2.318 0-4.203-.621-5.333-1.5h-.001c-.044.034-.333.229-.333.667v1.5c0 .439 2.193 1.333 5.333 1.333h.334c3.14 0 5.333-.894 5.333-1.333v-1.5c0-.438-.289-.633-.333-.667Z',
  database: 'M3 2.5A2.5 2.5 0 0 1 5.5 0h5A2.5 2.5 0 0 1 13 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-5A2.5 2.5 0 0 1 3 13.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5h-5Z M5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z',
  cloud: 'M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383Zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1Z',
  ml: 'M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z',
  api: 'M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1Zm1.5-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM1 10.5A1.5 1.5 0 0 1 2.5 9h1A1.5 1.5 0 0 1 5 10.5v1A1.5 1.5 0 0 1 3.5 13h-1A1.5 1.5 0 0 1 1 11.5v-1Zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm4.5.5A1.5 1.5 0 0 1 8.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 7 11.5v-1Zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1Zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z',
  queue: 'M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3Zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2Z M3.5 5.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Z',
  file: 'M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5Zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2Z',
  email: 'M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z',
  code: 'M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146Zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146Z',
}

const nodeWidth = 100
const nodeHeight = 50
const nodeGap = 20
const layerPadding = 16
const layerGap = 24
const labelHeight = 20
const padding = 24

export function ArchitectureDiagram({ layers, nodes, connections }: Props) {
  // Sort layers by level
  const sortedLayers = [...layers].sort((a, b) => a.level - b.level)

  // Group nodes by layer
  const nodesByLayer = new Map<string, ArchitectureNode[]>()
  for (const node of nodes) {
    const layerNodes = nodesByLayer.get(node.layer) || []
    layerNodes.push(node)
    nodesByLayer.set(node.layer, layerNodes)
  }

  // Calculate layer dimensions and positions
  const layerInfo = new Map<string, { x: number; y: number; width: number; height: number }>()
  let currentY = padding

  // First pass: calculate max width
  let maxLayerWidth = 0
  for (const layer of sortedLayers) {
    const layerNodes = nodesByLayer.get(layer.id) || []
    const maxCol = Math.max(...layerNodes.map((n) => n.column), 0)
    const width = (maxCol + 1) * (nodeWidth + nodeGap) - nodeGap + layerPadding * 2
    maxLayerWidth = Math.max(maxLayerWidth, width)
  }

  // Second pass: position layers
  for (const layer of sortedLayers) {
    const layerNodes = nodesByLayer.get(layer.id) || []
    const maxCol = Math.max(...layerNodes.map((n) => n.column), 0)
    const contentWidth = (maxCol + 1) * (nodeWidth + nodeGap) - nodeGap
    const width = Math.max(contentWidth + layerPadding * 2, maxLayerWidth)
    const height = labelHeight + nodeHeight + layerPadding * 2

    layerInfo.set(layer.id, {
      x: padding,
      y: currentY,
      width,
      height,
    })

    currentY += height + layerGap
  }

  const totalWidth = maxLayerWidth + padding * 2
  const totalHeight = currentY - layerGap + padding

  // Calculate node positions
  function getNodePosition(node: ArchitectureNode) {
    const layer = layerInfo.get(node.layer)
    if (!layer) return { x: 0, y: 0 }

    const layerNodes = nodesByLayer.get(node.layer) || []
    const maxCol = Math.max(...layerNodes.map((n) => n.column), 0)
    const contentWidth = (maxCol + 1) * (nodeWidth + nodeGap) - nodeGap
    const offsetX = (layer.width - contentWidth) / 2

    return {
      x: layer.x + offsetX + node.column * (nodeWidth + nodeGap),
      y: layer.y + labelHeight + layerPadding,
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

  // Orthogonal path calculation
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
      // Horizontal connection
      const y = fromCenter.y
      const startX = from.column < to.column ? fromPos.x + nodeWidth : fromPos.x
      const endX = from.column < to.column ? toPos.x : toPos.x + nodeWidth
      return `M ${startX} ${y} L ${endX} ${y}`
    }

    // Vertical connection with step
    const goingDown = toLayer.level > fromLayer.level
    const startX = fromCenter.x
    const startY = goingDown ? fromPos.y + nodeHeight : fromPos.y
    const endX = toCenter.x
    const endY = goingDown ? toPos.y : toPos.y + nodeHeight
    const midY = (startY + endY) / 2

    return `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full"
        style={{ minWidth: '500px', maxHeight: '400px' }}
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
              <text
                x={info.x + 10}
                y={info.y + 14}
                fill="#666"
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
                stroke="#555"
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
                  fill="#141414"
                  stroke="#444"
                  strokeWidth="1"
                />

                {/* Icon */}
                <g transform={`translate(${pos.x + nodeWidth / 2 - 8}, ${pos.y + 8})`}>
                  <path d={icons[node.icon]} fill="#888" fillRule="evenodd" />
                </g>

                {/* Label */}
                <text
                  x={pos.x + nodeWidth / 2}
                  y={pos.y + nodeHeight - 8}
                  textAnchor="middle"
                  fill="#aaa"
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
