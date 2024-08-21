import { DndContext, DndContextProps, pointerWithin } from '@dnd-kit/core'
import { useDragAndDropSensors } from '../../hooks/use-drag-and-drop-sensors'

interface DragDropContextProps extends DndContextProps {}

export function DragDropContext({ ...props }: DragDropContextProps) {
  const sensors = useDragAndDropSensors()

  return (
    <DndContext 
      collisionDetection={pointerWithin}
      sensors={sensors} 
      {...props} 
    />
  )
}