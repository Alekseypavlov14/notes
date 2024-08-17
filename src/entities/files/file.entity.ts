import { FileSystemItemEntity, FileSystemItemTypeFile } from '@/entities/file-system-items'
import { EntityDTO } from '@/shared/types/entity'

export interface FileEntity extends FileSystemItemEntity {
  type: FileSystemItemTypeFile
}

export interface FileEntityDTO extends Omit<EntityDTO<FileEntity>, 'type'> {}
