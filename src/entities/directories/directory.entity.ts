import { IFileSystemItem } from '@/entities/file-system-items'
import { EntityDTO } from '@/shared/types/entity'

export interface DirectoryEntity extends IFileSystemItem {}

export interface DirectoryEntityDTO extends EntityDTO<DirectoryEntity> {}
