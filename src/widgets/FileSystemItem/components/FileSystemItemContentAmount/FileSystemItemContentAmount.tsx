import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './FileSystemItemContentAmount.module.css'
import clsx from 'clsx'

interface FileSystemItemContentAmountProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function FileSystemItemContentAmount({ children, className, ...props }: FileSystemItemContentAmountProps) {
  return (
    <div 
      className={clsx(styles.FileSystemItemContentAmount, className)}
      {...props}
    >
      {children}
    </div>
  )
}