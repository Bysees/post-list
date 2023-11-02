import { useLayoutEffect } from 'react'

type UniqKey = string

//* Позволяет при переходе на другой роут и обратно вернуться на тот же scroll position
export const useScrollRestoration = (uniqKey: UniqKey) => {
  uniqKey = `scroll-position-[${uniqKey}]`

  useLayoutEffect(() => {
    const scrollPos = sessionStorage.getItem(uniqKey)

    if (scrollPos) {
      window.scrollTo(0, Number(scrollPos))
      sessionStorage.removeItem(uniqKey)
    }

    return () => {
      sessionStorage.setItem(uniqKey, String(window.scrollY))
    }
  }, [uniqKey])
}
