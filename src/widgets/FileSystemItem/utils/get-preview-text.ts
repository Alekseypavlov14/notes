import { FILE_PREVIEW_LENGTH } from '../constants'

export function getPreviewText(text: string): string {
  return text.length > FILE_PREVIEW_LENGTH
    ? text.slice(0, FILE_PREVIEW_LENGTH).concat('...')
    : text
}
