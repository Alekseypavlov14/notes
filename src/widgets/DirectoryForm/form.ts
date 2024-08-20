import { createFormValidation, isNotEmptyString } from '@/features/forms'

export interface DirectoryFormData {
  name: string
}

export const defaultInitialValues: DirectoryFormData = {
  name: ''
}

export const validateForm = createFormValidation({
  name: isNotEmptyString,
})
