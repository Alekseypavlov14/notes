import { Entity, EntityDTO } from '@/shared/types/entity'
import { IFileSystemItem } from '@/entities/file-system-items'

export interface DirectoryEntity extends Entity, IFileSystemItem {}

export interface DirectoryEntityDTO extends EntityDTO<DirectoryEntity> {}
