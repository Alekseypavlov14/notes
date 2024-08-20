import { NoteFormData } from '../form'

export function getInitialValue<T extends NoteFormData>(data: T): NoteFormData {
  return ({
    name: data.name,
    content: data.content,
  })
}
