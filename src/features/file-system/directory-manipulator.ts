import { directoriesRepository, DirectoryEntity, DirectoryEntityDTO } from '@/entities/directories'
import { FileSystemItemManipulator } from './file-system-item-manipulator'

export class DirectoriesManipulator extends FileSystemItemManipulator<DirectoryEntity, DirectoryEntityDTO> {}

export const directoriesManipulator = new DirectoriesManipulator(directoriesRepository)
