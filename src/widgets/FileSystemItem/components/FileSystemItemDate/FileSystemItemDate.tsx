import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './FileSystemItemDate.module.css'
import clsx from 'clsx'

interface FileSystemItemDateProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function FileSystemItemDate({ children, className, ...props }: FileSystemItemDateProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItemDate, className)}
      {...props}
    >
      {children}
    </div>
  )
}