import { FileEntity, filesRepository } from '@/entities/files'
import { useEffect, useState } from 'react'
import { useContextFileId } from './use-context-file-id'
import { Nullable } from '@/shared/types/nullable'

export interface UseContextFileResult {
  file: Nullable<FileEntity>
  isLoading: boolean
}

export function useContextFile(onError: VoidFunction = () => {}): UseContextFileResult {
  const [file, setFile] = useState<Nullable<FileEntity>>(null)
  const [isLoading, setLoading] = useState(true)

  const fileId = useContextFileId(onError)

  useEffect(() => {
    setLoading(true)

    if (!fileId) {
      setFile(null)
      setLoading(false)
      return
    }

    filesRepository.getById(fileId)
      .then(setFile)
      .catch(() => setFile(null))
      .finally(() => setLoading(false))
  }, [fileId])

  return { file, isLoading }
}
