import { useState } from 'react'

export interface UseModalResult {
  isOpened: boolean
  open: () => void
  close: () => void
}

export function useModal(defaultOpened: boolean = false): UseModalResult {
  const [isOpened, setOpened] = useState(defaultOpened)

  function open() {
    setOpened(true)
  }

  function close() {
    setOpened(false)
  }

  return { isOpened, open, close }
}
