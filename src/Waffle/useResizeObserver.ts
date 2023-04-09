import { useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface Size {
  width: number | undefined
  height: number | undefined
}

const useResizeObserver = (ref: React.RefObject<HTMLElement>): Size => {
  const [size, setSize] = useState<Size>({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    if (ref.current == null) return

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        })
      }
    })

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])

  return size
}

export default useResizeObserver
