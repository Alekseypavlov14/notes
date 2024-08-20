import { useEffect, useRef } from 'react'

export function useOnLeavePage(callback: VoidFunction) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => callbackRef.current()
  }, [])
}
