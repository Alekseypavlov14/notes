import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CreateIcon } from '../CreateIcon'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import styles from './CreateDirectoryIcon.module.css'

export function CreateDirectoryIcon() {
  return (
    <CreateIcon 
      className={styles.CreateDirectoryIcon}
      onClick={() => {}}
    >
      <FontAwesomeIcon icon={faFolder} />
    </CreateIcon>
  )
}
