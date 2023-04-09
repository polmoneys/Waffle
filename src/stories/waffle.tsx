import { Fragment, useState } from 'react'
import { useControls, folder } from 'leva'
import { formatNumber, useItems, waffleDataEmpty } from './utils'
import WaffleChart, { WaffleItem } from '@/Waffle'

export function WaffleStory() {
  const { size, gap, rows, columns } = useControls({
    props: folder(
      {
        size: {
          label: 'cell size',
          value: 64,
          min: 10,
          max: 140,
          step: 1,
        },
        gap: {
          label: 'gap',
          value: 6,
          min: 1,
          max: 20,
          step: 1,
        },
        rows: {
          label: 'rows',
          value: 6,
          min: 2,
          max: 40,
          step: 1,
        },
        columns: {
          label: 'columns',
          value: 6,
          min: 2,
          max: 40,
          step: 1,
        },
      },
      { color: '#007bff' },
    ),
  })

  const total = waffleDataEmpty.reduce((acc, item) => acc + item.value, 0)
  const transformedData = waffleDataEmpty.map(item => ({
    ...item,
    percentage: (item.value / total) * 100,
  }))

  const [
    selectedPoints,
    { appendItem, removeItemById, removeItemByIndex, isInList },
  ] = useItems([])

  const onChangePoint = (point: WaffleItem) => {
    if (isInList(point.id)) {
      removeItemById(point.id)
    } else {
      appendItem(point)
    }
  }

  return (
    <Fragment>
      <aside>
        <h1>
          Votes casted <b>#{total}</b>
        </h1>

        {transformedData.map(item => {
          return (
            <div
              key={item.id}
              className="hueued"
              style={{
                backgroundColor: isInList(item.id) ? item.color : 'transparent',
                color: isInList(item.id) ? '#222' : 'var(--white-200)',
              }}
            >
              <p>
                <b>{item.label}</b>
              </p>
              <p>
                {formatNumber(item.percentage, {
                  maximumFractionDigits: 0,
                })}
                %
              </p>
              <p>
                #
                {formatNumber(item.value, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          )
        })}
      </aside>

      <WaffleChart
        // onSelect={p => dispatchPoint({ type: 'add', name: p })}
        onSelectItem={p => onChangePoint(p)}
        data={waffleDataEmpty}
        rows={rows}
        columns={columns}
        cellGap={gap}
        cellSize={size}
        // canSelect
      />
    </Fragment>
  )
}
