import { defaultInitialValues, DirectoryFormData } from '../form'
import { deepMerge } from '@oleksii-pavlov/deep-merge'

export function getInitialValue<T extends DirectoryFormData>(data: Partial<T>): DirectoryFormData {
  return deepMerge(defaultInitialValues, data)
}