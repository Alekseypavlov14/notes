import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { Icon } from '../Icon'
import styles from './CreateFileIcon.module.css'

interface CreateFileIconProps {
  onClick?: VoidFunction
}

export function CreateFileIcon({ onClick }: CreateFileIconProps) {
  return (
    <Icon 
      className={styles.CreateFileIcon}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFile} />
    </Icon>
  )
}