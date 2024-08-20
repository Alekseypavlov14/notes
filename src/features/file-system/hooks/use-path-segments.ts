import { directoriesManipulator, useContextDirectoryId } from '@/features/file-system'
import { useEffect, useState } from 'react'

export function usePathSegments() {
  const [pathSegments, setPathSegments] = useState<string[]>([])
  const directoryId = useContextDirectoryId()

  useEffect(() => {
    directoriesManipulator.getPathSegments(directoryId)
      .then(pathSegments => setPathSegments(pathSegments))
      .catch(() => setPathSegments([]))
  }, [directoryId])

  return pathSegments
}
