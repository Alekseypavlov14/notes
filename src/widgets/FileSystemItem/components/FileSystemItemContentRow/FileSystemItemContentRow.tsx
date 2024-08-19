import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './FileSystemItemContentRow.module.css'
import clsx from 'clsx'

interface FileSystemItemContentRowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function FileSystemItemContentRow({ children, className, ...props }: FileSystemItemContentRowProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItemContentRow, className)}
      {...props}
    >
      {children}
    </div>
  )
}
