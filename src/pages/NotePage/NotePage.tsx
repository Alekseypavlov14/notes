import { DeleteIcon, useContextDirectoryId, useContextFile } from '@/features/file-system'
import { getInitialValue, NoteForm, NoteFormData } from '@/widgets/NoteForm'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { StructureLayout } from '@/layouts/StructureLayout'
import { filesRepository } from '@/entities/files'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { validateForm } from '@/widgets/NoteForm'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { Breadcrumbs } from '@/widgets/Breadcrumbs'
import { isFormValid } from '@/features/forms'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './NotePage.module.css'

export function NotePage() {
  const directoryId = useContextDirectoryId()
  
  const { navigateDirectoryPage } = useNavigation()
  const { infoMessage, errorMessage } = useNotifications()

  const { file, isLoading } = useContextFile(onFileNotFound)

  const initialValue = file ? getInitialValue(file) : {}

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

  function onExitPage(data: NoteFormData) {
    if (!file?.id) return

    if (!isFormValid(validateForm(data))) return

    filesRepository.updateById(file.id, data)
      .catch(handleHTTPException({
        401: () => errorMessage('Note was not saved. You are not authorized'),
        404: () => errorMessage('Note was not saved. It is not found'),
        500: () => errorMessage('Note was not saved. Something went wrong'),
        [defaultHandler]: () => errorMessage('Note was not saved. Something went wrong'),
      }))
  }

  function deleteNoteHandler() {
    if (!file?.id) return 

    return filesRepository.deleteById(file.id)
      .then(() => navigateDirectoryPage(directoryId))
      .then(() => infoMessage('Note is deleted'))
      .catch(handleHTTPException({
        401: () => errorMessage('Note was not deleted. You are not authorized'),
        404: () => errorMessage('Note was not deleted. It is not found'),
        500: () => errorMessage('Note was not deleted. Something went wrong'),
        [defaultHandler]: () => errorMessage('Note was not deleted. Something went wrong'),
      }))
  }

  return (
    <ProtectedRoute>
      <Page className={styles.NotePage}>
        <StructureLayout>
          <Container fullHeight>
            <div className={styles.Header}>
              <Breadcrumbs />

              <DeleteIcon onClick={deleteNoteHandler} />  
            </div>
          
            {isLoading ? <LoaderScreen /> : (
              <NoteForm 
                initialValues={initialValue}
                onExitPage={onExitPage}
                onSubmit={editNote}
              />
            )}
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}
