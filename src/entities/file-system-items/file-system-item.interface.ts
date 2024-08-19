import { Entity } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface IFileSystemItem extends Entity {
  name: string
  userId: Id
  rootId: Id
}
