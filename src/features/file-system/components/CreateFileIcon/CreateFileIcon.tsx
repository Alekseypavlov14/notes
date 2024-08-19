import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigation } from '@/app/routing'
import { CreateIcon } from '../CreateIcon'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import styles from './CreateFileIcon.module.css'

export function CreateFileIcon() {
  const { navigateCreateFileRelativePage } = useNavigation()

  return (
    <CreateIcon 
      className={styles.CreateFileIcon}
      onClick={navigateCreateFileRelativePage}
    >
      <FontAwesomeIcon icon={faFile} />
    </CreateIcon>
  )
}