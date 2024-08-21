import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-regular-svg-icons'
import { Icon } from '../Icon'
import styles from './CreateDirectoryIcon.module.css'

interface CreateDirectoryIconProps {
  onClick?: VoidFunction
}

export function CreateDirectoryIcon({ onClick }: CreateDirectoryIconProps) {
  return (
    <Icon 
      className={styles.CreateDirectoryIcon}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faFolder} />
    </Icon>
  )
}
