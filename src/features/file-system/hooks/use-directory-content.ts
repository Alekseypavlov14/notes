import { getFileSystemItemsByDirectoryId } from '../utils/get-file-system-items-by-directory-id'
import { directoriesManipulator } from '../directory-manipulator'
import { useContextDirectory } from './use-context-directory'
import { useEffect, useState } from 'react'
import { filesManipulator } from '../file-manipulator'
import { DirectoryEntity } from '@/entities/directories'
import { ROOT_ROOT_ID } from '@/entities/file-system-items'
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

  const { directory } = useContextDirectory()

  const directoryId = directory?.id || ROOT_ROOT_ID

  function revalidate() {
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

  useEffect(revalidate, [directoryId])

  const isLoading = isFilesLoading || isDirectoriesLoading

  return { files, directories, isLoading, revalidate }
}