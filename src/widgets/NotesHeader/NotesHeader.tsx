import { CreateDirectoryIcon, CreateFileIcon } from '@/features/file-system'
import { Headline } from '@/shared/components/Headline'
import styles from './NotesHeader.module.css'

interface NotesHeaderProps {
  onDirectoryIconClick?: VoidFunction
  onFileIconClick?: VoidFunction
  title: string
}

export function NotesHeader({ title, onDirectoryIconClick, onFileIconClick }: NotesHeaderProps) {
  return (
    <div className={styles.NotesHeader}>
      <Headline 
        level={2} 
        margin='small'
      >
        {title}
      </Headline>

      <div className={styles.NotesHeaderIcons}>
        <CreateDirectoryIcon onClick={onDirectoryIconClick} />
        <CreateFileIcon onClick={onFileIconClick} />
      </div>
    </div>
  )
}