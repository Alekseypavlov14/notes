import { ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './NotesHeaderIcons.module.css'
import clsx from 'clsx'

interface NotesHeaderIconsProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode
}

export function NotesHeaderIcons({ className, children, ...props }: NotesHeaderIconsProps) {
  return (
    <div 
      className={clsx(styles.NotesHeaderIcons, className)}
      {...props}
    >
      {children}
    </div>
  )
}