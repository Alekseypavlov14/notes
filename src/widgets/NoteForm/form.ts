import { createFormValidation, isNotEmptyString, skip } from '@/features/forms'

export interface NoteFormData {
  name: string
  content: string
}

export const defaultInitialValues: NoteFormData = {
  name: '',
  content: ''
}

export const validateForm = createFormValidation({
  name: isNotEmptyString,
  content: skip
})
