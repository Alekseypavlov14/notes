import { getFileSystemItemsByDirectoryId } from '../utils/get-file-system-items-by-directory-id'
import { directoriesManipulator } from '../directory-manipulator'
import { useContextDirectory } from './use-context-directory'
import { useEffect, useState } from 'react'
import { filesManipulator } from '../file-manipulator'
import { DirectoryEntity } from '@/entities/directories'
import { FileEntity } from '@/entities/files'

interface UseDirectoryContentResult {
  files: FileEntity[]
  directories: DirectoryEntity[]
  isLoading: boolean
}

export function useDirectoryContent(onError: VoidFunction = () => {}): UseDirectoryContentResult {
  const [files, setFiles] = useState<FileEntity[]>([])
  const [isFilesLoading, setFilesLoading] = useState(true)

  const [directories, setDirectories] = useState<DirectoryEntity[]>([])
  const [isDirectoriesLoading, setDirectoriesLoading] = useState(true)

  const { directory } = useContextDirectory()

  useEffect(() => {
    if (!directory) return onError()

    filesManipulator.getUserItems()
      .then(files => setFiles(getFileSystemItemsByDirectoryId(files, directory.id)))
      .catch(() => setFiles([]))
      .finally(() => setFilesLoading(false))

    directoriesManipulator.getUserItems()
      .then(directories => setDirectories(getFileSystemItemsByDirectoryId(directories, directory.id)))
      .catch(() => setDirectories([]))
      .finally(() => setDirectoriesLoading(false))
  }, [directory])

  const isLoading = isFilesLoading || isDirectoriesLoading

  return { files, directories, isLoading }
}