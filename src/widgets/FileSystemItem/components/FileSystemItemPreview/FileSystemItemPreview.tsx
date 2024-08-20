import { ComponentPropsWithoutRef } from 'react'
import { getPreviewText } from '../../utils/get-preview-text'
import styles from './FileSystemItemPreview.module.css'
import clsx from 'clsx'

interface FileSystemItemPreviewProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  text: string
}

export function FileSystemItemPreview({ text, className, ...props }: FileSystemItemPreviewProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItemPreview, className)} 
      {...props}
    >
      {getPreviewText(text)}
    </div>
  )
}