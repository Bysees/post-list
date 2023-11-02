import { RefObject, useState, useEffect } from 'react'

type Events = {
  onIntersect?: () => void
}

interface UseInView {
  (ref: RefObject<HTMLElement | null>, events: Events): { isIntersect: boolean }
}

export const useInView: UseInView = (ref: RefObject<HTMLElement | null>, events = {}) => {
  const [isIntersect, setIsIntersect] = useState(false)
  const { onIntersect } = events

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      const { isIntersecting } = entry
      
      setIsIntersect(isIntersecting)
    })

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref.current])

  useEffect(() => {
    if (isIntersect && onIntersect) {
      onIntersect()
      setIsIntersect(false)
    }
  }, [isIntersect, onIntersect])

  return { isIntersect }
}
