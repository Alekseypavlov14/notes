import { updateDirectory, useContextDirectoryStore } from '../stores/context-directory.store'
import { directoriesRepository, DirectoryEntity } from '@/entities/directories'
import { useContextDirectoryId } from './use-context-directory-id'
import { useEffect, useState } from 'react'
import { ROOT_ROOT_ID } from '@/entities/file-system-items'
import { Nullable } from '@/shared/types/nullable'

export interface UseContextDirectoryResult {
  directory: Nullable<DirectoryEntity>
  isLoading: boolean
  revalidate: VoidFunction
}

export function useContextDirectory(): UseContextDirectoryResult {
  const directory = useContextDirectoryStore((state) => state.directory)
  const [isLoading, setLoading] = useState(true)

  const directoryId = useContextDirectoryId()

  function revalidate() {
    if (directoryId === ROOT_ROOT_ID) {
      updateDirectory(null)
      setLoading(false)

      return
    }

    setLoading(true)
      
    directoriesRepository.getById(directoryId)  
      .then(updateDirectory)
      .catch(() => updateDirectory(null))
      .finally(() => setLoading(false))
  }

  useEffect(revalidate, [directoryId])

  return { isLoading, directory, revalidate }
}