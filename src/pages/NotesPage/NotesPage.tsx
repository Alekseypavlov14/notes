import { directoriesManipulator, filesManipulator, useContextDirectory, useDirectoryContent } from '@/features/file-system'
import { DragDropContext, Droppable } from '@/features/drag-and-drop'
import { CreateDirectoryModal } from '@/widgets/CreateDirectoryModal'
import { useSettingsStore } from '@/features/settings'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { ROOT_ROOT_ID } from '@/entities/file-system-items'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { DragEndEvent } from '@dnd-kit/core'
import { NotesHeader } from '@/widgets/NotesHeader'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { FileSystem } from '@/widgets/FileSystem'
import { Container } from '@/shared/components/Container'
import { Headline } from '@/shared/components/Headline'
import { useModal } from '@/features/modals'
import { Page } from '@/shared/components/Page'
import { Id } from '@/shared/types/id'
import styles from './NotesPage.module.css'

export function NotesPage() {
  const { directory } = useContextDirectory()

  const { files, directories, isLoading, revalidate } = useDirectoryContent()
  const settings = useSettingsStore((state) => state)

  const createDirectoryModal = useModal()

  const { 
    navigateCreateFileRelativePage,
    navigateDirectoryPage,
    navigateNotePage, 
  } = useNavigation()

  async function moveFileSystemItemHandler(e: DragEndEvent) {
    const draggedId = e.active.id as Id
    const droppedId = e.over?.id as Id | undefined

    if (!draggedId || !droppedId) return
    if (draggedId === droppedId) return

    await filesManipulator.move(draggedId, droppedId).catch(() => {})
    await directoriesManipulator.move(draggedId, droppedId).catch(() => {})

    navigateDirectoryPage(droppedId)
  }

  const parentDirectoryId = directory?.rootId ?? ROOT_ROOT_ID 

  return (
    <ProtectedRoute>
      <Page className={styles.NotesPage}>
        <StructureLayout>
          <Container fullHeight>
            <DragDropContext onDragEnd={moveFileSystemItemHandler}>
              <Droppable droppableId={parentDirectoryId}>
                <Breadcrumbs />
    
                <NotesHeader 
                  onDirectoryIconClick={createDirectoryModal.open}
                  onFileIconClick={navigateCreateFileRelativePage}
                />
              </Droppable>
  
              {isLoading ? (
                <LoaderScreen>
                  <Headline level={5}>Loading...</Headline>
                </LoaderScreen>
              ): (
                <FileSystem 
                  files={files} 
                  directories={directories} 
                  settings={settings} 
                  onDirectoryClick={navigateDirectoryPage}
                  onFileClick={navigateNotePage}
                />
              )}
    
              <CreateDirectoryModal 
                isOpened={createDirectoryModal.isOpened}
                close={createDirectoryModal.close}
                onSubmit={revalidate}
              />
            </DragDropContext>
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}