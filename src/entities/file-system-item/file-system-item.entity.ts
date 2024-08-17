import { FileSystemItemType } from './types/file-system-item-types'
import { Entity, EntityDTO } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface FileSystemItemEntity extends Entity {
  name: string
  type: FileSystemItemType
  userId: Id
  rootId: Id
}

export interface FileSystemItemDTO extends EntityDTO<FileSystemItemEntity> {}
