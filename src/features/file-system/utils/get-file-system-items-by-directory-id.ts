import { IFileSystemItem } from '@/entities/file-system-items'
import { Id } from '@/shared/types/id'

export function getFileSystemItemsByDirectoryId<T extends IFileSystemItem>(fileSystemItems: T[], id: Id) {
  return fileSystemItems.filter(item => item.rootId === id)
} 
