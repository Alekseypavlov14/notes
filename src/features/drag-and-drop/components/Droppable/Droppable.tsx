import { ComponentPropsWithoutRef } from 'react'
import { useDroppable } from '@dnd-kit/core'
import styles from './Droppable.module.css'
import clsx from 'clsx'

interface DroppableProps extends ComponentPropsWithoutRef<'div'> {
  droppableId: string
}

export function Droppable({ 
  droppableId, 
  className, 
  children, 
  ...props 
}: DroppableProps) {
  const { setNodeRef } = useDroppable({ 
    id: droppableId
  })

  return (
    <div 
      className={clsx(styles.Droppable, className)} 
      ref={setNodeRef}
      {...props}
    >
      {children}
    </div>
  )
}