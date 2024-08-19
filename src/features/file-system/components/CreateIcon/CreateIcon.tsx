import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './CreateIcon.module.css'
import clsx from 'clsx'

interface CreateIconProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function CreateIcon({ children, className, ...props }: CreateIconProps) {
  return (
    <div 
      className={clsx(styles.CreateIcon, className)}
      {...props}
    >
      {children}
    </div>
  )
}