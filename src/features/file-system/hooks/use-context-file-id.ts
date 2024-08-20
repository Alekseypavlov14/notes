import { useParams } from 'react-router-dom'
import { Nullable } from '@/shared/types/nullable'
import { Id } from '@/shared/types/id'

export function useContextFileId(onError: VoidFunction = () => {}): Nullable<Id> {
  const { noteId } = useParams()

  if (!noteId) onError()

  return noteId ?? null
}
