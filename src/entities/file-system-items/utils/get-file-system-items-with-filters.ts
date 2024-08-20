import { directoriesRepository, DirectoryEntity } from '@/entities/directories'
import { FileEntity, filesRepository } from '@/entities/files'
import { IFileSystemItem } from '../file-system-item.interface'

export interface SearchResult {
  files: FileEntity[]
  directories: DirectoryEntity[]
  items: IFileSystemItem[]
}

export async function getFileSystemItemsWithFilters(filters: Partial<IFileSystemItem>): Promise<SearchResult> {
  const files = await filesRepository.getByFilters(filters)
  const directories = await directoriesRepository.getByFilters(filters)
  const items: IFileSystemItem[] = [...files, ...directories]

  return { files, directories, items }
}
