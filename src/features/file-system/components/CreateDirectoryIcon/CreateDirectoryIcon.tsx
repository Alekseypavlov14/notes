import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CreateIcon } from '../CreateIcon'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import styles from './CreateDirectoryIcon.module.css'

interface CreateDirectoryIconProps {
  onClick?: VoidFunction
}

export function CreateDirectoryIcon({ onClick }: CreateDirectoryIconProps) {
  return (
    <CreateIcon 
      className={styles.CreateDirectoryIcon}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFolder} />
    </CreateIcon>
  )
}
