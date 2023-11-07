import { useState, useRef, useCallback } from 'react'

type Events = {
  onIntersect?: (isIntersecting: boolean) => void
}

export const useInView = (events: Events = {}) => {
  const [isIntersect, setIsIntersect] = useState(false)
  const { onIntersect } = events

  const ioRef = useRef<IntersectionObserver | null>(null)

  const observerHandler: IntersectionObserverCallback = useCallback(
    ([entry]) => {
      const { isIntersecting } = entry
      setIsIntersect(isIntersecting)
      onIntersect?.(isIntersecting)
    },
    [onIntersect]
  )

  const attachIntersectionObserver = useCallback(
    (element: HTMLElement) => {
      const observer = new IntersectionObserver(observerHandler)
      observer.observe(element)
      ioRef.current = observer
    },
    [observerHandler]
  )

  const detachIntersectionObserver = useCallback(() => {
    ioRef.current?.disconnect()
  }, [])

  const refCb = useCallback(
    (element: HTMLElement | null) => {
      if (element) {
        attachIntersectionObserver(element)
      } else {
        detachIntersectionObserver()
      }
    },
    [attachIntersectionObserver, detachIntersectionObserver]
  )

  return { ref: refCb, isIntersect }
}
