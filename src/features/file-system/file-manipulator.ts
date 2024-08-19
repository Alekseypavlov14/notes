import { FileEntity, FileEntityDTO, filesRepository } from '@/entities/files'
import { FileSystemItemManipulator } from './file-system-item-manipulator'

export class FileManipulator extends FileSystemItemManipulator<FileEntity, FileEntityDTO> {}

export const filesManipulator = new FileManipulator(filesRepository)
