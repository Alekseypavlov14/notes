import { getFileSystemItemsByDirectoryId } from '../utils/get-file-system-items-by-directory-id'
import { directoriesManipulator } from '../directory-manipulator'
import { useContextDirectoryId } from './use-context-directory-id'
import { useEffect, useState } from 'react'
import { filesManipulator } from '../file-manipulator'
import { DirectoryEntity } from '@/entities/directories'
import { FileEntity } from '@/entities/files'

interface UseDirectoryContentResult {
  files: FileEntity[]
  directories: DirectoryEntity[]
  isLoading: boolean
  revalidate: () => void
}

export function useDirectoryContent(onError: VoidFunction = () => {}): UseDirectoryContentResult {
  const [files, setFiles] = useState<FileEntity[]>([])
  const [isFilesLoading, setFilesLoading] = useState(true)

  const [directories, setDirectories] = useState<DirectoryEntity[]>([])
  const [isDirectoriesLoading, setDirectoriesLoading] = useState(true)

  const directoryId = useContextDirectoryId()

  function getFileSystemItems() {
    if (!directoryId) return onError()

    setFilesLoading(true)
    setDirectoriesLoading(true)

    filesManipulator.getUserItems()
      .then(files => setFiles(getFileSystemItemsByDirectoryId(files, directoryId)))
      .catch(() => setFiles([]))
      .finally(() => setFilesLoading(false))

    directoriesManipulator.getUserItems()
      .then(directories => setDirectories(getFileSystemItemsByDirectoryId(directories, directoryId)))
      .catch(() => setDirectories([]))
      .finally(() => setDirectoriesLoading(false))
  }

  useEffect(getFileSystemItems, [directoryId])

  const isLoading = isFilesLoading || isDirectoriesLoading

  return { files, directories, isLoading, revalidate: getFileSystemItems }
}