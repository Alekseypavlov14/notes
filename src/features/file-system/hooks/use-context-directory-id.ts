import { ROOT_ROOT_ID } from '@/entities/file-system-items'
import { useParams } from 'react-router-dom'
import { Id } from '@/shared/types/id'

export function useContextDirectoryId(): Id {
  const { id } = useParams()

  return id || ROOT_ROOT_ID
}
