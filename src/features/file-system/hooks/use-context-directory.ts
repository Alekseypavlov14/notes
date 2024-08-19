import { directoriesRepository, DirectoryEntity } from '@/entities/directories'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Nullable } from '@/shared/types/nullable'

interface UseContextDirectoryResult {
  directory: Nullable<DirectoryEntity>
  isLoading: boolean
}

export function useContextDirectory(onError: VoidFunction = () => {}): UseContextDirectoryResult {
  const [directory, setDirectory] = useState<Nullable<DirectoryEntity>>(null)
  const [isLoading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    if (!id) {
      setDirectory(null)
      setLoading(false)

      return onError()
    }

    directoriesRepository.getById(id).then(directory => {
      setDirectory(directory)
      setLoading(false)

      if (!directory) onError()
    })
  }, [])

  return { directory, isLoading }
}
