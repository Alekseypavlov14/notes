import { IFileSystemItem } from '../file-system-items'
import { EntityDTO } from '@/shared/types/entity'

export interface FileEntity extends IFileSystemItem {
  content: string
}

export interface FileEntityDTO extends EntityDTO<FileEntity> {}
