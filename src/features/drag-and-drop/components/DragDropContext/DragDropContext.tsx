import { DndContext, DndContextProps, pointerWithin } from '@dnd-kit/core'
import { useDragAndDropSensors } from '../../hooks/use-drag-and-drop-sensors'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'

interface DragDropContextProps extends DndContextProps {}

export function DragDropContext({ ...props }: DragDropContextProps) {
  const sensors = useDragAndDropSensors()

  return (
    <DndContext 
      modifiers={[restrictToWindowEdges]}
      collisionDetection={pointerWithin}
      sensors={sensors} 
      {...props} 
    />
  )
}