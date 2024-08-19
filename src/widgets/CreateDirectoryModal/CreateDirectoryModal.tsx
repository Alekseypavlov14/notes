import { directoriesManipulator, useContextDirectoryId } from '@/features/file-system'
import { CreateDirectoryForm, CreateDirectoryFormData } from '../CreateDirectoryForm'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { Modal } from 'antd'
import styles from './CreateDirectoryModal.module.css'

interface CreateDirectoryModalProps {
  isOpened: boolean
  close: () => void
}

export function CreateDirectoryModal({ isOpened, close }: CreateDirectoryModalProps) {
  const { successMessage, errorMessage } = useNotifications()
  const directoryId = useContextDirectoryId()

  function createDirectoryHandler(formData: CreateDirectoryFormData) {
    directoriesManipulator.create({
      ...formData,
      rootId: directoryId
    })
      .then(() => {
        close()
        successMessage('Directory is created!')
      })
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        500: () => errorMessage('Something went wrong'),
        [defaultHandler]: () => errorMessage('Something went wrong'),
      }))
  }

  return (
    <Modal 
      className={styles.CreateDirectoryModal}
      title='Create directory'
      onOk={close}
      onCancel={close}
      onClose={close}
      open={isOpened}
      footer={null}
    >
      <CreateDirectoryForm 
        mode='create'
        onSubmit={createDirectoryHandler}
      />
    </Modal>
  )
}