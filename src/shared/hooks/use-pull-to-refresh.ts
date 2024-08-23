import { RefObject, useEffect, useRef, useState } from 'react'
import { deepMerge } from '@oleksii-pavlov/deep-merge'

export interface PullToRefreshConfig {
  distance?: number
  maxDistance?: number
  smoothCoefficient?: number 
  transition?: number
}

export interface PullToRefreshResult<T> {
  ref: RefObject<T>
  isPulling: boolean
  isPulledToRefresh: boolean
}

const defaultConfig: Required<PullToRefreshConfig> = {
  distance: 30,
  maxDistance: 80,
  smoothCoefficient: 0.4,
  transition: 200,
}

export function usePullToRefresh<T extends HTMLElement = HTMLElement>(config: PullToRefreshConfig = defaultConfig): PullToRefreshResult<T> {
  const ref = useRef<T>(null)

  const [isPulling, setPulling] = useState(false)
  const [isPulledToRefresh, setPulledToRefresh] = useState(false)

  const normalizedConfig = deepMerge<Required<PullToRefreshConfig>>(defaultConfig, config)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    element.addEventListener("touchstart", handleTouchStart)

    function handleTouchStart(startEvent: TouchEvent) {
      const element = ref.current
      if (!element) return

      setPulling(true)

      const initialY = startEvent.touches[0].clientY

      element.addEventListener("touchmove", handleTouchMove)
      element.addEventListener("touchend", handleTouchEnd)

      function handleTouchMove(moveEvent: TouchEvent) {
        const element = ref.current
        if (!element) return

        const currentY = moveEvent.touches[0].clientY

        const dy = currentY - initialY

        element.style.transform = `translateY(${getTransformY(dy)}px)`

        setPulledToRefresh(Math.abs(dy) >= normalizedConfig.distance)
      }

      function handleTouchEnd() {
        const element = ref.current
        if (!element) return

        setPulling(false)

        element.style.transform = "translateY(0)"

        element.style.transition = `transform ${normalizedConfig.transition}ms`

        element.addEventListener("transitionend", onTransitionEnd)

        element.removeEventListener("touchmove", handleTouchMove)
        element.removeEventListener("touchend", handleTouchEnd)
      }

      function onTransitionEnd() {
        const element = ref.current
        if (!element) return
      
        element.style.transition = ""
      
        element.removeEventListener("transitionend", onTransitionEnd)
      }

      function getTransformY(distance: number) {
        return normalizedConfig.maxDistance * (1 - Math.exp((-normalizedConfig.smoothCoefficient * distance) / normalizedConfig.maxDistance))
      }
    }

    return () => {
      element.removeEventListener("touchstart", handleTouchStart)
    }
  }, [ref.current])

  return {
    ref,
    isPulling,
    isPulledToRefresh
  }
}
