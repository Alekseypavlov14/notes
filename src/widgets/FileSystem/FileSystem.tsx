import { useDirectoryItemsAmount } from '@/features/file-system'
import { FileSystemItemsList } from '../FileSystemItemsList'
import { formatSmartDate } from '@/shared/utils/date-time'
import { DirectoryEntity } from '@/entities/directories'
import { SettingsConfig } from '@/features/settings'
import { FileEntity } from '@/entities/files'
import { Id } from '@/shared/types/id'
import { 
  DirectoryIcon, 
  FileSystemItem, 
  FileSystemItemContentAmount, 
  FileSystemItemContentRow, 
  FileSystemItemDate, 
  FileSystemItemIcon, 
  FileSystemItemName, 
  FileSystemItemPreview, 
  getDirectoryItemsAmount 
} from '../FileSystemItem'
import styles from './FileSystem.module.css'

interface FileSystemProps {
  files: FileEntity[]
  directories: DirectoryEntity[]
  settings: SettingsConfig
  onFileClick?: (id: Id) => void
  onDirectoryClick?: (id: Id) => void
}

export function FileSystem({ 
  files, 
  directories, 
  settings, 
  onFileClick = () => {}, 
  onDirectoryClick = () => {},
}: FileSystemProps) {
  const { getAmountById, isLoading } = useDirectoryItemsAmount()
  
  return (
    <FileSystemItemsList className={styles.FileSystem}>
      {directories.map(directory => (
        <FileSystemItem 
          onClick={() => onDirectoryClick(directory.id)}
          key={directory.id}
        >
          <FileSystemItemContentRow>
            <FileSystemItemName>
              <FileSystemItemIcon icon={DirectoryIcon} />
              <span>{directory.name}</span>
            </FileSystemItemName>
          </FileSystemItemContentRow>

          {settings.showItemsLength || settings.showDateTime ? (
            <FileSystemItemContentRow>
              {settings.showItemsLength ? (
                <FileSystemItemContentAmount>
                  {isLoading ? 'Loading...' : getDirectoryItemsAmount(getAmountById(directory.id))}
                </FileSystemItemContentAmount>
              ) : null}

              {settings.showDateTime ? (
                <FileSystemItemDate>{formatSmartDate(directory.updatedAt)}</FileSystemItemDate>
              ) : null}
            </FileSystemItemContentRow>
          ) : null}
        </FileSystemItem>
      ))}

      {files.map(file => (
        <FileSystemItem
          onClick={() => onFileClick(file.id)} 
          key={file.id}
        >
          <FileSystemItemContentRow>
            <FileSystemItemName>
              <span>{file.name}</span>
            </FileSystemItemName>
          </FileSystemItemContentRow>

          {settings.showDateTime || settings.showFileContentPreview ? (
            <FileSystemItemContentRow>
              {settings.showFileContentPreview && file.content.length ? ( 
                <FileSystemItemPreview text={file.content} />
              ) : null}

              {settings.showDateTime ? (
                <FileSystemItemDate>{formatSmartDate(file.updatedAt)}</FileSystemItemDate>
              ) : null}
            </FileSystemItemContentRow>
          ) : null}
        </FileSystemItem>
      ))}
    </FileSystemItemsList>
  )
}