import { useState, useMemo, useEffect } from 'react'

interface UseVirtualSrollProps<I> {
  items: I
  itemsCount: number
  itemHeight: number
  overscan?: number
}

const DEFAULT_OVERSCAN = 3

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useVirtualScroll = <I extends any[]>(props: UseVirtualSrollProps<I>) => {
  const { itemHeight, itemsCount, overscan = DEFAULT_OVERSCAN, items } = props

  const [scrollTop, setScrollTop] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)

  useEffect(() => {
    setViewportHeight(document.documentElement.clientHeight)

    const handleScroll = () => {
      setScrollTop(window.scrollY)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const { virtualItems, startIndex, endIndex } = useMemo(() => {
    const rangeStart = scrollTop
    const rangeEnd = scrollTop + viewportHeight

    let startIndex = Math.floor(rangeStart / itemHeight)
    let endIndex = Math.ceil(rangeEnd / itemHeight)

    startIndex = Math.max(0, startIndex - overscan)
    endIndex = Math.min(itemsCount - 1, endIndex + overscan)

    const virtualItems: {
      item: I extends (infer U)[] ? U : never
      height: number
      offsetTop: number
    }[] = []

    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        item: items[index],
        height: itemHeight,
        offsetTop: index * itemHeight
      })
    }

    return { virtualItems, startIndex, endIndex }
  }, [scrollTop, viewportHeight, itemsCount, itemHeight, items, overscan])

  const totalHeight = itemHeight * itemsCount

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex
  }
}
