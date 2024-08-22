import { directoriesManipulator, useContextDirectory } from '@/features/file-system'
import { IFileSystemItem, ROOT_ROOT_ID } from '@/entities/file-system-items'
import { useEffect, useState } from 'react'

export function usePathDirectories() {
  const [pathDirectories, setPathDirectories] = useState<IFileSystemItem[]>([])
  const { directory } = useContextDirectory()

  useEffect(() => {
    const directoryId = directory?.id || ROOT_ROOT_ID

    directoriesManipulator.getPathDirectories(directoryId)
      .then(pathDirectories => setPathDirectories(pathDirectories))
      .catch(() => setPathDirectories([]))
  }, [directory])

  return pathDirectories
}
