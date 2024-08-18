import { Entity, EntityDTO } from '@/shared/types/entity'
import { IFileSystemItem } from '../file-system-items'

export interface FileEntity extends Entity, IFileSystemItem {
  content: string
}

export interface FileEntityDTO extends EntityDTO<FileEntity> {}
