import { directoriesManipulator, useContextDirectoryId } from '@/features/file-system'
import { DirectoryForm, DirectoryFormData } from '../DirectoryForm'
import { formCreateMode, FormMode } from '@/features/forms'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { Modal } from 'antd'
import styles from './DirectoryModal.module.css'

interface DirectoryModalProps {
  onSubmit?: () => void
  close: () => void
  mode: FormMode
  isOpened: boolean
  initialValue?: Partial<DirectoryFormData>
}

export function DirectoryModal({ initialValue, mode, isOpened, close, onSubmit = () => {} }: DirectoryModalProps) {
  const { successMessage, errorMessage } = useNotifications()
  const directoryId = useContextDirectoryId()

  const successMessageText = mode === formCreateMode ? 'Directory is created' : 'Directory is edited'
  const directoryModalTitle = mode === formCreateMode ? 'Create directory' : 'Edit directory'

  const directorySubmitRequest = mode === formCreateMode 
    ? (formData: DirectoryFormData) => directoriesManipulator.create({ ...formData, rootId: directoryId }) 
    : (formData: DirectoryFormData) => directoriesManipulator.rename(directoryId, formData.name)

  function submitHandler(formData: DirectoryFormData) {
    directorySubmitRequest(formData)
      .then(() => {
        close()
        onSubmit()
        successMessage(successMessageText)
      })
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        404: () => errorMessage('Directory is not found'),
        500: () => errorMessage('Something went wrong'),
        [defaultHandler]: () => errorMessage('Something went wrong'),
      }))
  }

  return (
    <Modal 
      className={styles.DirectoryModal}
      title={directoryModalTitle}
      onOk={close}
      onCancel={close}
      onClose={close}
      open={isOpened}
      footer={null}
    >
      <DirectoryForm 
        mode={mode}
        onSubmit={submitHandler}
        initialValues={initialValue}
      />
    </Modal>
  )
}