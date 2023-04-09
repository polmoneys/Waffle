export interface WaffleItem {
  label: string
  value: number
  color?: string
  id: string
}

interface WaffleChartProps {
  data: WaffleItem[]
  layout?: string[]
  columns: number
  rows?: number
  cellSize?: number
  cellGap?: number
  onSelectItem?: (point: WaffleItem) => void
  canSelect?: boolean
  onSelect?: (summary: any) => void
}

const WaffleChart = (props: WaffleChartProps): JSX.Element => {
  const {
    data,
    layout,
    columns,
    rows,
    cellSize = 20,
    cellGap = 2,
    onSelectItem,
    onSelect,
    canSelect = false,
  } = props

  const generateLayout = (columns: number, rows: number): string[] => {
    const totalCells = columns * rows
    return Array.from({ length: totalCells }, () => 'x')
  }

  const usedLayout = layout ?? (rows ? generateLayout(columns, rows) : [])
  const total = data.reduce((acc, item) => acc + item.value, 0)
  const totalCells = usedLayout.filter(cell => cell === 'x').length
  const cellData = data.flatMap(({ label, value, id, color = 'gray' }) => {
    const cellCount = Math.round((value / total) * totalCells)
    return Array.from({ length: cellCount }, (_, i) => ({
      label,
      color,
      id,
      value,
    }))
  })
  const layoutRows =
    usedLayout.join('').match(new RegExp('.{1,' + columns + '}', 'g')) || []
  const chartWidth = columns * (cellSize + cellGap)
  const chartHeight = layoutRows.length * (cellSize + cellGap)

  let cellIndex = 0

  return (
    <div style={{ position: 'relative' }}>
      <svg width={chartWidth} height={chartHeight}>
        {layoutRows.map((row, rowIndex) => {
          return row.split('').map((cell, colIndex) => {
            if (cell === 'e') return null
            const x = colIndex * (cellSize + cellGap)
            const y = rowIndex * (cellSize + cellGap)
            const cellProps = cellData[cellIndex] || { color: 'white' }
            cellIndex++
            return (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={x}
                y={y}
                width={cellSize}
                height={cellSize}
                fill={cellProps.color}
                onClick={() => onSelectItem?.(cellProps)}
                style={{ cursor: 'pointer' }}
              />
            )
          })
        })}
      </svg>
    </div>
  )
}

export default WaffleChart
