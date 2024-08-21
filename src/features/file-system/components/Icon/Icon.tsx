import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './Icon.module.css'
import clsx from 'clsx'

interface IconProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function Icon({ children, className, ...props }: IconProps) {
  return (
    <div 
      className={clsx(styles.Icon, className)}
      {...props}
    >
      {children}
    </div>
  )
}