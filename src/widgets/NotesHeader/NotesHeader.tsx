import { CreateDirectoryIcon, CreateFileIcon } from '@/features/file-system'
import { Headline } from '@/shared/components/Headline'
import styles from './NotesHeader.module.css'

interface NotesHeaderProps {}

export function NotesHeader({}: NotesHeaderProps) {
  return (
    <div className={styles.NotesHeader}>
      <Headline 
        level={2} 
        margin='small'
      >
        Notes
      </Headline>

      <div className={styles.NotesHeaderIcons}>
        <CreateDirectoryIcon />
        <CreateFileIcon />
      </div>
    </div>
  )
}