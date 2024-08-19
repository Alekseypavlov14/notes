import { createFormValidation, isNotEmptyString } from '@/features/forms'

export interface CreateDirectoryFormData {
  name: string
}

export const defaultInitialValues: CreateDirectoryFormData = {
  name: ''
}

export const validateForm = createFormValidation({
  name: isNotEmptyString,
})
