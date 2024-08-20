import { filesManipulator, useContextDirectoryId } from '@/features/file-system'
import { NoteForm, NoteFormData } from '@/widgets/NoteForm'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { StructureLayout } from '@/layouts/StructureLayout'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './CreateNotePage.module.css'

export function CreateNotePage() {
  const directoryId = useContextDirectoryId()
  const { navigateDirectoryPage } = useNavigation()
  const { errorMessage } = useNotifications()

  function createNote(data: NoteFormData) {
    return filesManipulator.create({
      rootId: directoryId,
      ...data,
    })
      .then(() => navigateDirectoryPage(directoryId))
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        500: () => errorMessage('Something went wrong'),
        [defaultHandler]: () => errorMessage('Something went wrong'),
      }))
  }

  function onExitPage(data: NoteFormData) {
    filesManipulator.create({
      rootId: directoryId,
      ...data,
    })
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        500: () => errorMessage('Something went wrong'),
        [defaultHandler]: () => errorMessage('Something went wrong'),
      }))
  }

  return (
    <ProtectedRoute>
      <Page className={styles.CreateNotePage}>
        <StructureLayout>
          <Container fullHeight>
            <Breadcrumbs />

            <NoteForm 
              onExitPage={onExitPage}
              onSubmit={createNote}
            />
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}