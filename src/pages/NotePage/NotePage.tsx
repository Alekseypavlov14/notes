import { useContextDirectoryId, useContextFileId } from '@/features/file-system'
import { NoteForm, NoteFormData } from '@/widgets/NoteForm'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { StructureLayout } from '@/layouts/StructureLayout'
import { filesRepository } from '@/entities/files'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './NotePage.module.css'

export function NotePage() {
  const directoryId = useContextDirectoryId()
  
  const { navigateDirectoryPage } = useNavigation()
  const { errorMessage } = useNotifications()

  const fileId = useContextFileId(onFileNotFound)

  function onFileNotFound() {
    navigateDirectoryPage(directoryId)
    errorMessage('Note is not found')
  }

  function editNote(data: NoteFormData) {
    if (!fileId) return 

    return filesRepository.updateById(fileId, data)
      .then(() => navigateDirectoryPage(directoryId))
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        404: () => errorMessage('Note is not found'),
        500: () => errorMessage('Something went wrong'),
        [defaultHandler]: () => errorMessage('Something went wrong'),
      }))
  }

  return (
    <ProtectedRoute>
      <Page className={styles.NotePage}>
        <StructureLayout>
          <Container fullHeight>
            <NoteForm 
              onSubmit={editNote}
            />
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}
