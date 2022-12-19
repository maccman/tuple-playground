import {useEffect, useRef, useState} from 'react'

export function useRerender() {
  const [_, setState] = useState(0)

  const mounted = useRef(true)
  useEffect(
    () => () => {
      mounted.current = false
    },
    [],
  )

  return () => {
    if (!mounted.current) return
    setState((x) => x + 1)
  }
}
