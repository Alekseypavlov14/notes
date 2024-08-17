import { FileSystemItemTypeDirectory } from '../types/file-system-item-types'
import { FileSystemItemEntity } from '../file-system-item.entity'
import { EntityDTO } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface DirectoryEntity extends FileSystemItemEntity {
  type: FileSystemItemTypeDirectory
  children: Id[]
}

export interface DirectoryEntityDTO extends EntityDTO<DirectoryEntity> {}
