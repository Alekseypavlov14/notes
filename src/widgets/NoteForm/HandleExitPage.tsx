import { useFormikContext } from 'formik'
import { useOnLeavePage } from '@/shared/hooks/use-on-leave-page'
import { NoteFormData } from './form'

export interface NoteFormHandleExitPageProps {
  onExitPage: (data: NoteFormData) => void | Promise<void>
}

export function HandleExitPage({ onExitPage }: NoteFormHandleExitPageProps) {
  const { values } = useFormikContext<NoteFormData>()

  useOnLeavePage(() => onExitPage(values))

  return null
}
