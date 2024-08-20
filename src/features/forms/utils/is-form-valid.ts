import { FormikErrors } from 'formik'
import { deepCompare } from '@oleksii-pavlov/deep-merge'

export function isFormValid<T>(errors: FormikErrors<T>): boolean {
  return deepCompare(errors, {})
}
