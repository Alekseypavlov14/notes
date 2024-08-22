import { ComponentPropsWithoutRef } from 'react'
import styles from './NotesHeader.module.css'

interface NotesHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export function NotesHeader({ className, children, ...props }: NotesHeaderProps) {
  return (
    <div className={styles.NotesHeader} {...props}>
      {children}
    </div>
  )
}