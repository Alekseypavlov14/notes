import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './FileSystemItem.module.css'
import clsx from 'clsx'

interface FileSystemItemProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function FileSystemItem({ className, children, ...props }: FileSystemItemProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItem, className)}
      {...props}
    >
      {children}
    </div>
  )
}