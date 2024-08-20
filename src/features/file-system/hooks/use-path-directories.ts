import { directoriesManipulator, useContextDirectoryId } from '@/features/file-system'
import { useEffect, useState } from 'react'
import { IFileSystemItem } from '@/entities/file-system-items'

export function usePathDirectories() {
  const [pathDirectories, setPathDirectories] = useState<IFileSystemItem[]>([])
  const directoryId = useContextDirectoryId()

  useEffect(() => {
    directoriesManipulator.getPathDirectories(directoryId)
      .then(pathDirectories => setPathDirectories(pathDirectories))
      .catch(() => setPathDirectories([]))
  }, [directoryId])

  return pathDirectories
}
