import { useEffect, useRef, useState } from 'react'

export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value => ++value) // update the state to force render
}
