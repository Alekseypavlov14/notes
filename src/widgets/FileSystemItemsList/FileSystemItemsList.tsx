import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './FileSystemItemsList.module.css'
import clsx from 'clsx'

export type FileSystemItemsListGap = 'small' | 'medium' | 'large'

const gaps: Record<FileSystemItemsListGap, string> = {
  small: styles.SmallGap,
  medium: styles.MediumGap,
  large: styles.LargeGap,
}

interface FileSystemItemsListProps extends ComponentPropsWithoutRef<'div'> {
  gap?: FileSystemItemsListGap
  children: ReactNode
}

export function FileSystemItemsList({ 
  children, 
  className, 
  gap = 'medium', 
  ...props 
}: FileSystemItemsListProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItemsList, className, gaps[gap])}
      {...props}
    >
      {children}
    </div>
  )
}