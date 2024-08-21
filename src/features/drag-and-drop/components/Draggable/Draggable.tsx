import { ComponentPropsWithoutRef } from 'react'
import { useDraggable } from '@dnd-kit/core'
import styles from './Draggable.module.css'
import clsx from 'clsx'

interface DraggableProps extends ComponentPropsWithoutRef<'div'> {
  draggableId: string
}

export function Draggable({ 
  draggableId, 
  className, 
  children, 
  ...props 
}: DraggableProps) {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({ 
    id: draggableId
  })

  const style =  {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : ''
  }

  return (
    <div 
      className={clsx(styles.Draggable, isDragging && styles.IsDragging, className)} 
      ref={setNodeRef}
      {...props}
      {...attributes}
      {...listeners}
      style={style}
    >
      {children}
    </div>
  )
}