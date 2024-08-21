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
  const { setNodeRef, active, over, isOver } = useDroppable({ 
    id: droppableId
  })

  const isOverByDraggable = isOver && active?.id !== over?.id

  return (
    <div 
      className={clsx(styles.Droppable, isOverByDraggable && styles.IsOver, className)} 
      ref={setNodeRef}
      {...props}
    >
      {children}
    </div>
  )
}