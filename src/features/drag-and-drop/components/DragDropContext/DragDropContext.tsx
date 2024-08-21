import { DndContext, DndContextProps } from '@dnd-kit/core'

interface DragDropContextProps extends DndContextProps {}

export function DragDropContext({ ...props }: DragDropContextProps) {
  return (
    <DndContext {...props} />
  )
}