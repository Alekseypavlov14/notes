import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import styles from './FileSystemItemIcon.module.css'

interface FileSystemItemIconProps {
  icon: IconProp
}

export { faFolder as DirectoryIcon } from '@fortawesome/free-solid-svg-icons' 
export { faFile as FileIcon } from '@fortawesome/free-regular-svg-icons'

export function FileSystemItemIcon({ icon }: FileSystemItemIconProps) {
  return (
    <div className={styles.FileSystemItemIcon}>
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}