import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CreateIcon } from '../CreateIcon'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import styles from './CreateFileIcon.module.css'

interface CreateFileIconProps {
  onClick?: VoidFunction
}

export function CreateFileIcon({ onClick }: CreateFileIconProps) {
  return (
    <CreateIcon 
      className={styles.CreateFileIcon}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFile} />
    </CreateIcon>
  )
}