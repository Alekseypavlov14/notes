import { useContextDirectoryId, useContextFile } from '@/features/file-system'
import { NoteForm, NoteFormData } from '@/widgets/NoteForm'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { StructureLayout } from '@/layouts/StructureLayout'
import { filesRepository } from '@/entities/files'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './NotePage.module.css'

export function NotePage() {
  const directoryId = useContextDirectoryId()
  
  const { navigateDirectoryPage } = useNavigation()
  const { errorMessage } = useNotifications()

  const { file, isLoading } = useContextFile(onFileNotFound)

  function onFileNotFound() {
    navigateDirectoryPage(directoryId)
    errorMessage('Note is not found')
  }

  function editNote(data: NoteFormData) {
    if (!file?.id) return 

    return filesRepository.updateById(file.id, data)
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
            <Breadcrumbs />
          
            {isLoading ? <LoaderScreen /> : (
              <NoteForm 
                initialValues={file ?? {}}
                onSubmit={editNote}
              />
            )}
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}
