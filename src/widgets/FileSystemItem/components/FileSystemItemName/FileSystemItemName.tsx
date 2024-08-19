import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './FileSystemItemName.module.css'
import clsx from 'clsx'

interface FileSystemItemNameProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function FileSystemItemName({ children, className, ...props }: FileSystemItemNameProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItemName, className)}
      {...props}  
    >
      {children}
    </div>
  )
}