import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Icon } from '../Icon'
import styles from './DeleteIcon.module.css'

interface DeleteIconProps {
  onClick?: VoidFunction
}

export function DeleteIcon({ onClick }: DeleteIconProps) {
  return (
    <Icon
      className={styles.DeleteIcon}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faTrashCan} />
    </Icon>
  )
}
